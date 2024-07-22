import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ICountry } from "../../interfaces/ICountry";
import { IUser } from "../../interfaces/IUser";
import ProfileService from "../../services/Profile/ProfileService";
import { useCart } from "../../components/Cart context/CartContext";

const EditProfile: React.FC = () => {

    const redirection = useNavigate();
    const { clearCart } = useCart();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordCheck, setNewPasswordCheck] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userData, setUserData] = useState<IUser>({
        firstName,
        lastName,
        userName,
        email,
        password: oldPassword,
        dateOfBirth,
        country,
        phoneNumber
    });

    useEffect(() => {
        // Zaštita stranice
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        // Funkcija za dobavljanje svih postojećih država
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countriesData = response.data.map((country: any) => ({
                    name: country.name.common,
                    code: country.cca3,
                    flag: country.flags.png
                })).sort((a: any, b: any) => a.name.localeCompare(b.name));
                setCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

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
                        password: '',
                        dateOfBirth: response.dateOfBirth,
                        country: response.country,
                        phoneNumber: response.phoneNumber
                    });
                }
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchUserData();
        fetchCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za podešavanje vrednosti polja za prikaz informacija o korisniku
    useEffect(() => {
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setUserName(userData.userName || '');
        setEmail(userData.email || '');
        setDateOfBirth(userData.dateOfBirth || '');
        setCountry(userData.country || '');
        setSelectedCountry(userData.country || '');
        setPhoneNumber(userData.phoneNumber || '');
    }, [userData]);

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

    // Funkcija za validaciju polja i za slanje podataka na server o izmeni profila
    const editProfile = async () => {
        var yearHelp = new Date(dateOfBirth);
        var currentYear = new Date().getFullYear();
        var year = yearHelp.getFullYear();

        if (firstName.length === 0) {
            alert("Polje za ime mora biti popunjeno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(firstName)) {
            alert("Za polje ime se moraju uneti samo slova!");
        }
        else if (lastName.length === 0) {
            alert("Polje za prezime mora biti popunjeno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(lastName)) {
            alert("Za polje prezime se moraju uneti samo slova!");
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (oldPassword !== '' && oldPassword.length < 6) {
            alert("Polje za trenutnu lozinku mora imati bar 6 karaktera!");
        }
        else if (newPassword !== '' && newPassword.length < 6) {
            alert("Polje za novu lozinku mora imati bar 6 karaktera!");
        }
        else if (newPasswordCheck !== '' && newPasswordCheck.length < 6) {
            alert("Polje za potvrdu nove lozinke mora imati bar 6 karaktera!");
        }
        else if (newPassword !== '' && oldPassword === newPassword) {
            alert("Trenutna i nova lozinka su iste!");
        }
        else if (newPasswordCheck !== newPassword) {
            alert("Polje za lozinku i proveru lozinke se ne poklapaju!");
        }
        else if (dateOfBirth.length === 0) {
            alert("Polje za datum rođenja mora biti popunjen!");
        }
        else if (year >= currentYear) {
            alert("Datum rođenja nije validan!");
        }
        else if (country.length === 0) {
            alert("Morate odabrati državu!");
        }
        else if (phoneNumber.length === 0) {
            alert("Polje za broj telefona mora biti popunjeno!");
        }
        else {
            try {
                const updatedUser: IUser = {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: oldPassword,
                    dateOfBirth,
                    country,
                    phoneNumber
                };
                const response = await ProfileService.editProfile(updatedUser, newPassword);
                if (response.responseCode === -2) {
                    alert(response.message);
                }
                else if (response.responseCode === -1) {
                    alert(response.message);
                }
                else {
                    alert(response.message);
                    redirection('/profile');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za obradu promene kod odabira države
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
        setCountry(event.target.value);
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
            <main className="main-content">
                <div className="main-container">
                    <h1>Izmena vaših ličnih podataka</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="user-detail-label">Ime:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Prezime:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Korisničko ime:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={userName} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Email:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Trenutna lozinka:</td>
                                <td>
                                    <input className='inputStyle' type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Nova lozinka:</td>
                                <td>
                                    <input className='inputStyle' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Potvrda lozinke:</td>
                                <td>
                                    <input className='inputStyle' type="password" value={newPasswordCheck} onChange={(e) => setNewPasswordCheck(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Datum rođenja:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Država:</td>
                                <td className='selectStyle'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <select id="country" value={selectedCountry} onChange={handleCountryChange} style={{ height: '30px', width: '160px' }}>
                                            <option value="">Odaberite državu</option>
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedCountry && (
                                            <img src={countries.find(c => c.name === selectedCountry)?.flag} alt={`${selectedCountry} flag`} style={{ width: '50px', marginLeft: '10px' }} />
                                        )}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Broj telefona:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button className='btn btn-outline-dark' onClick={editProfile}>Sačuvaj izmene</button>
                </div>
            </main>
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
}

export default EditProfile;