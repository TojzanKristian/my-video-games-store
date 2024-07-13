/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config';
import { ILoginModel } from '../../interfaces/ILoginModel';

class LoginService {
    async loginUser(logindata: ILoginModel) {
        try {
            const response = await axios.post(`${SERVER_URL}/api/users/login`, {
                email: logindata.email,
                password: logindata.password
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new LoginService();