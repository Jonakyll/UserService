import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('USER_KEY');
}

export const userLogin = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/login`,
        data: authRequest
    })
}

export const fetchUserData = () => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/userinfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const saveUser = (user) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/user/save`,
        data: user
    })
}

export const getAllUsers = () => {
    return axios({
        method: "GET",
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/user/all`,
    })
}

export const deleteUser = (id) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/user/delete/${id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const promoteUser = (id) => {
    return axios({
        method: 'PUT',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/user/promote/${id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const updateUser = (user) => {
    return axios({
        method: 'PUT',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/user/update/${user.id}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: user
    })
}