import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoGameDetails.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import { IGame } from "../../interfaces/IGame";
import VideoGameService from "../../services/Video game/VideoGameService";

const VideoGameDetails: React.FC = () => {

    const redirection = useNavigate();
    const [game, setGame] = useState<IGame>();
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        // Funkcija za dobavljanje podataka o igrici sa servera
        const fetchGameDetails = async () => {
            try {
                const response = await VideoGameService.getGameByName(name);
                setGame(response.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };
        fetchGameDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    // Funkcija za prelaz na početnu stranicu
    const openHomePage = () => {
        redirection('/');
    };

    // Funkcija za prelaz na stranicu za profil
    const openProfilePage = async () => {
        redirection('/profile');
    };

    // Funkcija za prelaz na stranicu za prikaz korpe
    const openCartPage = () => {
        redirection('/cart');
    };

    // Funkcija za prelaz na stranicu za prijavu
    const openLoginPage = async () => {
        redirection('/login');
    };

    // Funkcija za obradu odjave sa sistema
    const logOut = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            redirection('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

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
            {game && (
                <div className="details-container">
                    <div className="game-details">
                        <div className="game-image">
                            <img src='/cs2.jpg' alt={game.name} />
                        </div>
                        <div className="game-info">
                            <h2>{game.name}</h2>
                            <p className="category">Kategorija: <span>{game.category}</span></p>
                            <p className="price">Cena: <span>{game.price}</span></p>
                        </div>
                    </div>
                    <div className="video-section">
                        <div className="game-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${game.youtubeLink.split('v=')[1]}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
};

export default VideoGameDetails;