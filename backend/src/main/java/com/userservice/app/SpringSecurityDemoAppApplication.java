package com.userservice.app;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.userservice.app.entities.Authority;
import com.userservice.app.entities.User;
import com.userservice.app.repository.UserDetailsRepository;

@SpringBootApplication
public class SpringSecurityDemoAppApplication {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityDemoAppApplication.class, args);
    }

    @PostConstruct
    protected void init() {

        List<Authority> list1 = new ArrayList<>();
        list1.add(createAuthority("USER", "User role"));
        list1.add(createAuthority("ADMIN", "Admin role"));
        User user1 = new User();
        user1.setUserName("luffygang");
        user1.setFirstName("ailton");
        user1.setLastName("lopes-mendes");
        user1.setPassword(passwordEncoder.encode("azertyuiop"));
        user1.setEnabled(true);
        user1.setAuthorities(list1);

        List<Authority> list2 = new ArrayList<>();
        list2.add(createAuthority("USER", "User role"));
//        list2.add(createAuthority("ADMIN", "Admin role"));
        User user2 = new User();
        user2.setUserName("whitewolf");
        user2.setFirstName("violaine");
        user2.setLastName("huynh");
        user2.setPassword(passwordEncoder.encode("azertyuiop"));
        user2.setEnabled(true);
        user2.setAuthorities(list2);

        List<Authority> list3 = new ArrayList<>();
        list3.add(createAuthority("USER", "User role"));
        list3.add(createAuthority("ADMIN", "Admin role"));
        User user3 = new User();
        user3.setUserName("DBHayner");
        user3.setFirstName("fabien");
        user3.setLastName("lambert--delavaquerie");
        user3.setPassword(passwordEncoder.encode("azertyuiop"));
        user3.setEnabled(true);
        user3.setAuthorities(list3);

        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);
        users.add(user3);

        userDetailsRepository.saveAll(users);
    }


    private Authority createAuthority(String roleCode, String roleDescription) {
        Authority authority = new Authority();
        authority.setRoleCode(roleCode);
        authority.setRoleDescription(roleDescription);
        return authority;
    }


}
