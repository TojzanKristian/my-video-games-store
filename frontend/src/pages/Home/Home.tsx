import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import VideoGameList from "../../components/Video games list/VideoGameList";
import { IGame } from "../../interfaces/IGame";
import VideoGameService from "../../services/Video game/VideoGameService";
import { categories } from "../../components/Video game categories/GameCategories";

const Home: React.FC = () => {

    const redirection = useNavigate();
    const [allGames, setAllGames] = useState<IGame[]>([]);

    useEffect(() => {
        // Funkcija za dobavljanje svih video igrica sa servera
        const fetchAllGamesData = async () => {
            try {
                const response = await VideoGameService.getAllGames();
                const gamesWithDefaults: IGame[] = response.data.map((game: any) => ({
                    ...game,
                    youtubeLink: '',
                    image: null
                }));
                setAllGames(gamesWithDefaults);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchAllGamesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prelaz na početnu stranicu
    const openHomePage = () => {
        redirection('/');
    };

    // Funkcija za prelaz na stranicu za profil
    const openProfilePage = async () => {
        redirection('/profile');
    }

    // Funkcija za prelaz na stranicu za prikaz korpe
    const openCartPage = () => {
        redirection('/cart');
    };

    // Funkcija za prelaz na stranicu za prijavu
    const openLoginPage = async () => {
        redirection('/login');
    }

    // Funkcija za obradu odjave sa sistema
    const logOut = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            redirection('/login');
        } catch (error) {
            console.error('Došlo je do greške:', error);
        }
    }

    return (
        <div className="container">
            <header className="header">
                <div className="store-name">TK Store</div>
                <div className="icons">
                    <FaHome className="icon" onClick={openHomePage} />
                    <FaUser className="icon" onClick={openProfilePage} />
                    <FaShoppingCart className="icon" onClick={openCartPage} />
                    <FaSignInAlt className="icon" onClick={openLoginPage} />
                    <FaSignOutAlt className="icon" onClick={logOut} />
                </div>
            </header>
            <div className="container">
                <div className="content">
                    <VideoGameList categories={categories} videoGames={allGames} />
                </div>
            </div>
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
}

export default Home;