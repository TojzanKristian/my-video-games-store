/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config'

class ProfileService {
    async getProfileData() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/api/users/profile`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async editProfile(profileData: any, newPassword: any) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${SERVER_URL}/api/users/editProfile`, {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                userName: profileData.userName,
                email: profileData.email,
                oldPassword: profileData.password,
                newPassword: newPassword,
                dateOfBirth: profileData.dateOfBirth,
                country: profileData.country,
                phoneNumber: profileData.phoneNumber
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new ProfileService();