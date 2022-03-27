import axios from 'axios';
import authHeader from './auth-header';

const API_AUTH_URL = 'http://127.0.0.1:8000/api/token/';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
}

export default new AuthService();