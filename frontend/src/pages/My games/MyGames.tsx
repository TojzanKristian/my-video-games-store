import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyGames.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarMyGames from '../../components/NavBar/NavBarMyGames';
import { useCart } from "../../components/Cart context/CartContext";
import { IGameDetails } from "../../interfaces/IGameDetails";
import PurchaseService from "../../services/Purchase/PurchaseService";

const MyGames: React.FC = () => {

    const redirection = useNavigate();
    const { clearCart } = useCart();
    const [myGames, setMyGames] = useState<IGameDetails[]>([]);

    useEffect(() => {
        // Zaštita stranice
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        // Funkcija za dobavljanje podataka o svim kupljenim igricama za korisnika sa servera
        const fetchMyGamesData = async () => {
            try {
                const response = await PurchaseService.getMyGames();
                const games: IGameDetails[] = response.data.map((game: any) => ({
                    name: game.name,
                    category: game.category,
                    price: game.price,
                    youtubeLink: game.youtubeLink,
                    image: game.imageUrl
                }));
                setMyGames(games);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchMyGamesData();
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
            clearCart();
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
            <NavBarMyGames />
            <main className='main-content-myGames'>
                <h1 className='titleStyle'>Prikaz vaših igrica</h1>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className='thStyle'>Slika</th>
                            <th scope="col" className='thStyle'>Naziv igrice</th>
                            <th scope="col" className='thStyle'>Cena</th>
                            <th scope="col" className='thStyle'>Kategorija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myGames.map((game, index) => (
                            <tr key={index}>
                                <td className="tdStyle"><img src={game.image} alt={game.name} className="image-style" /></td>
                                <td className="tdStyle">{game.name}</td>
                                <td className="tdStyle">{game.price}</td>
                                <td className="tdStyle">{game.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
}

export default MyGames;