import axios from 'axios';
import authHeader from './auth-header';

const BASE_API_URL = process.env.REACT_APP_BASE_URL

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
}

class AuthService {
    login(email, password) {
        return axios
            .post(BASE_API_URL + 'auth/login/', {
                email,
                password
            })
            .then(response => {
                if (response.data.access) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(data) {
        return axios.post(BASE_API_URL + 'auth/register/', data);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService();