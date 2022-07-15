import axios from 'axios';
import authHeader from './auth-header';

const API_PROFILE_URL = 'http://test-api-zamow-jedzenie.herokuapp.com/swagger/auth/register';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
};

class ProfileService {
    // getProfile(selectedOption, profile) {
    //     const config = JSON.parse(JSON.stringify(defaultConfig));
    //     config.headers = { ...config.headers, ...authHeader() };
    //     config.params = { option: selectedOption };
    //     return axios.get(`${API_PROFILE_URL}/${profile.id}/`, config).then(
    //         response => response.data
    //     );
    // }

    updateProfile(profile) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = { ...config.headers, ...authHeader() };
        return axios.put(`${API_PROFILE_URL}/${profile.id}/`, profile, config).then(
            response => response.data
        );
    }
}

export default new ProfileService();