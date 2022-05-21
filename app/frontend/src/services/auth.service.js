import axios from 'axios';
import authHeader from './auth-header';

const BASE_API_URL = process.env.REACT_APP_BASE_URL
const API_AUTH_URL = BASE_API_URL + 'auth/login/';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
}

class AuthService {
    login(username, password, type) {
        return axios
            .post(API_AUTH_URL, {
                username,
                password
            }, defaultConfig)
            .then(response => {
                if (response.data.access) {
                    localStorage.setItem('loggedInAs', type);
                    localStorage.setItem('user', response.data.access);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() }
        return axios.get(API_AUTH_URL + 'user', config).then(
            (response) => {
                return response.data
            }
        )
    }
}

export default new AuthService();