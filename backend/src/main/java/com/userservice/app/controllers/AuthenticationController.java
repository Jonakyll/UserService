package com.userservice.app.controllers;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.userservice.app.entities.Authority;
import com.userservice.app.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.userservice.app.config.JWTTokenHelper;
import com.userservice.app.entities.User;
import com.userservice.app.requests.AuthenticationRequest;
import com.userservice.app.responses.LoginResponse;
import com.userservice.app.responses.UserInfo;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @PostMapping(path = "/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {

        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUserName(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwtToken = jWTTokenHelper.generateToken(user.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user) {
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());

        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(userObj.getFirstName());
        userInfo.setLastName(userObj.getLastName());
        userInfo.setRoles(userObj.getAuthorities().toArray());
        userInfo.setUserName(userObj.getUsername());
        userInfo.setId(userObj.getId());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping(path = "/user/save")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        User newUser = new User();
        List<Authority> authorityList = new ArrayList<>();
        Authority authority = new Authority();

        authority.setRoleCode("USER");
        authority.setRoleDescription("User role");
//        authority.setRoleCode("ADMIN");
//        authority.setRoleDescription("Admin role");
        authorityList.add(authority);

        newUser.setUserName(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setEnabled(true);
        newUser.setAuthorities(authorityList);

        userDetailsRepository.save(newUser);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping(path = "/user/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userDetailsRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping(path = "/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userDetailsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/user/promote/{id}")
    public ResponseEntity<?> promoteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userDetailsRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            List<Authority> authorityList = (List<Authority>) user.getAuthorities();
            Authority authority = new Authority();
            authority.setRoleCode("ADMIN");
            authority.setRoleDescription("Admin role");
            user.getAuthorities();
            authorityList.add(authority);

            user.setAuthorities(authorityList);
            userDetailsRepository.save(user);

            return ResponseEntity.ok(authority);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping(path = "/user/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserInfo userInfo) {
        Optional<User> optionalUser = userDetailsRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setFirstName(userInfo.getFirstName());
            user.setLastName(userInfo.getLastName());

            userDetailsRepository.save(user);

            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
