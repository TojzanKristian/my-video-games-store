import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ICountry } from "../../interfaces/ICountry";
import { IUser } from "../../interfaces/IUser";

const EditProfile: React.FC = () => {

    const redirection = useNavigate();
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
    const editedUser: IUser = {
        firstName,
        lastName,
        userName,
        email,
        password: newPassword,
        dateOfBirth,
        country,
        phoneNumber
    };

    useEffect(() => {
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

        fetchCountries();
    }, []);

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
        else if (userName.length === 0) {
            alert("Polje za korisničko ime mora biti popunjeno!");
        }
        else if (!/[a-zA-Z0-9]/.test(userName)) {
            alert("Korisničko ime sme sadržavati samo slova i brojeve!");
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (oldPassword.length === 0 || oldPassword.length < 6) {
            alert("Stara lozinka mora biti popunjena!");
        }
        else if (newPassword.length === 0 || newPassword.length < 6) {
            alert("Nova lozinka mora biti popunjena!");
        }
        else if (newPasswordCheck.length === 0 || newPasswordCheck.length < 6) {
            alert("Polje za proveru nove lozinke mora biti popunjeno!");
        }
        else if (newPassword !== newPasswordCheck) {
            alert("Polje za novu lozinku i proveru lozinke se ne poklapaju!");
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
                console.log(editedUser);
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

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
                                    <input className='inputStyle' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
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