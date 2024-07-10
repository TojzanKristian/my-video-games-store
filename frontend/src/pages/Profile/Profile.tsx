import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarProfile from '../../components/NavBar/NavBarProfile';
import ProfileService from "../../services/Profile/ProfileService";
import { IUser } from "../../interfaces/IUser";

const Profile: React.FC = () => {

    const redirection = useNavigate();
    const [userData, setUserData] = useState<IUser>();

    useEffect(() => {
        // Zaštita stranice
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        // Funkcija za dobavljanje podataka o korisniku sa servera
        const fetchUserData = async () => {
            try {
                const response = await ProfileService.getProfileData();
                if (response !== undefined) {
                    setUserData({
                        firstName: response.firstName,
                        lastName: response.lastName,
                        userName: response.userName,
                        email: response.email,
                        password: '******',
                        dateOfBirth: response.dateOfBirth,
                        country: response.country,
                        phoneNumber: response.phoneNumber
                    });
                }
                else {
                    console.error('Došlo je do greške!');
                }
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchUserData();
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
            redirection('/login');
        } catch (error) {
            console.error('Došlo je do greške:', error);
        }
    }

    // Funkcija za prelaz na stranicu za ažuriranje profila
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
                                <td className="user-detail-data">{userData?.firstName} {userData?.lastName} </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Korisničko ime:</td>
                                <td className="user-detail-data">{userData?.userName}</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Email:</td>
                                <td className="user-detail-data">{userData?.email}</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Lozinka:</td>
                                <td className="user-detail-data">{userData?.password}</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Datum rođenja:</td>
                                <td className="user-detail-data">{userData?.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Država:</td>
                                <td className="user-detail-data">{userData?.country}</td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Broj telefona:</td>
                                <td className="user-detail-data">{userData?.phoneNumber}</td>
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