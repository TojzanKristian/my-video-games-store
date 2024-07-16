/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config';
import { IGame } from '../../interfaces/IGame';

class VideoGameService {
    async getAllGames() {
        try {
            const response = await axios.get(`${SERVER_URL}/api/games/allGames`, {});
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async getGameByName(name: any): Promise<any> {
        try {
            const response = await axios.get(`${SERVER_URL}/api/games/name/${name}`);
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async addNewGame(newGame: IGame) {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', newGame.name);
            formData.append('category', newGame.category);
            formData.append('price', newGame.price);
            formData.append('youtubeLink', newGame.youtubeLink);
            if (newGame.image) {
                formData.append('image', newGame.image);
            }

            const response = await axios.post(`${SERVER_URL}/api/games/addNewVideoGame`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Hiba történt a kérés során: ' + (error as AxiosError).message);
        }
    }
}

export default new VideoGameService();