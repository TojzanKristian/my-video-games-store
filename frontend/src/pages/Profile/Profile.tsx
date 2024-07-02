import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarProfile from '../../components/NavBar/NavBarProfile';

const Profile: React.FC = () => {

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

    const openEditProfile = async () => {
        redirection('/edit-profile');
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
            <NavBarProfile />
            <main className="main-content">
                <div className='main-container'>
                    <h1>Vaši lični podaci</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="user-detail-label">Ime i Prezime:</td>
                                <td className="user-detail-data">Marko Petrović</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Korisničko ime:</td>
                                <td className="user-detail-data">marko123</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Email:</td>
                                <td className="user-detail-data">marko@example.com</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Lozinka:</td>
                                <td className="user-detail-data">********</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Datum rođenja:</td>
                                <td className="user-detail-data">01.01.1990</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Država:</td>
                                <td className="user-detail-data">Srbija</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Broj telefona:</td>
                                <td className="user-detail-data">+381 64 123 4567</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button className='btn btn-outline-dark' onClick={openEditProfile}>Izmena profila</button>
                </div>
            </main>
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
}

export default Profile;