import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyGames.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarMyGames from '../../components/NavBar/NavBarMyGames';

const MyGames: React.FC = () => {

    const redirection = useNavigate();

    const openHomePage = () => {
        redirection('/');
    };

    const openProfilePage = async () => {
        redirection('/profile');
    }

    const openCartPage = () => {
        alert("Korpa");
    };

    const openLoginPage = async () => {
        redirection('/login');
    }

    const logOut = async () => {
        redirection('/login');
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
                            <th scope="col" className='thStyle'>Ključ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tdStyle"><img src="/cs2.jpg" alt="image" className="image-style " /></td>
                            <td className="tdStyle">Counter Strike 2</td>
                            <td className="tdStyle">FTP</td>
                            <td className="tdStyle">ASAF4543ADASFA</td>
                        </tr>
                        <tr>
                            <td className="tdStyle"><img src="/cs2.jpg" alt="image" className="image-style " /></td>
                            <td className="tdStyle">Counter Strike 2</td>
                            <td className="tdStyle">FTP</td>
                            <td className="tdStyle">ASAF4543ADASFA</td>
                        </tr>
                        <tr>
                            <td className="tdStyle"><img src="" alt="image" className="image-style " /></td>
                            <td className="tdStyle">Counter Strike 2</td>
                            <td className="tdStyle">FTP</td>
                            <td className="tdStyle">ASAF4543ADASFA</td>
                        </tr>
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