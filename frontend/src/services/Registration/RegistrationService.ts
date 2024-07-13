/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config';
import { IUser } from '../../interfaces/IUser';

class RegistrationService {
    async registerUser(userData: IUser) {
        try {
            const response = await axios.post(`${SERVER_URL}/api/users/registration`, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                dateOfBirth: userData.dateOfBirth,
                country: userData.country,
                phoneNumber: userData.phoneNumber
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async googleAccountLogin(name: string, email: string, familyName: string, givenName: string) {
        try {
            const response = await axios.post(`${SERVER_URL}/api/users/googleAccountLogin`, {
                userName: name,
                email: email,
                firstName: givenName,
                lastName: familyName,
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new RegistrationService();