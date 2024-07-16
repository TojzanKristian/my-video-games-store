/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config';

class PurchaseService {
    async getMyGames() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/api/purchases/myGames`,
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

    async processingPurchase(listOfPurchasedGames: string, price: string) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${SERVER_URL}/api/purchases/newPurchase`, {
                listOfPurchasedGames: listOfPurchasedGames,
                price: price
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

export default new PurchaseService();