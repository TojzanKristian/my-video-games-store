import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import { IUser } from "../../interfaces/IUser";
import { ICountry } from "../../interfaces/ICountry";
import { GoogleLogin } from 'react-google-login';
import { googleClientId } from '../../config'
import RegistrationService from "../../services/Registration/RegistrationService";
import NavBarRegistration from "../../components/NavBar/NavBarRegistration";

const Registration: React.FC = () => {

    const redirection = useNavigate();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const user: IUser = {
        firstName,
        lastName,
        userName,
        email,
        password,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za validaciju polja i slanje podataka na server za registraciju
    const userRegistration = async () => {
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
        else if (password.length === 0 || password.length < 6) {
            alert("Lozinka mora biti popunjena!");
        }
        else if (passwordCheck.length === 0 || passwordCheck.length < 6) {
            alert("Polje za proveru lozinke mora biti popunjeno!");
        }
        else if (passwordCheck !== password) {
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
                const response = await RegistrationService.registerUser(user);
                if (response.responseCode === -2) {
                    alert(response.message);
                }
                else if (response.responseCode === -1) {
                    alert(response.message);
                }
                else {
                    alert(response.message);
                    redirection('/login');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za obradu uspešne prijave sa google nalogom
    const handleGoogleLoginSuccess = async (response: any) => {
        if (response.profileObj) {
            const { name, email, familyName, givenName } = response.profileObj;
            try {
                const response = await RegistrationService.googleAccountLogin(name, email, familyName, givenName);
                const token = response.token;
                localStorage.setItem('token', token);
                alert(response.message);
                redirection('/');
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        } else {
            console.error('Došlo je do greške!');
        }
    };

    // Funkcija za obradu greške pri prijavi sa google nalogom
    const handleGoogleLoginFailure = (error: any) => {
        alert("Došlo je do greške!");
        console.error('Došlo je do greške pri prijavi na Google nalog:', error);
    };

    // Funkcija za obradu promene kod odabira države
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
        setCountry(event.target.value);
    };

    return (
        <div className="regPageStyle">
            <NavBarRegistration />
            <div className="regContainerStyle">
                <div className="regFormStyle">
                    <h1 className="regTitleStyle">Registracija</h1>
                    <table className="regTableStyle">
                        <tbody>
                            <tr>
                                <td className="regFirstColumnStyle">Ime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Prezime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Korisničko ime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Email:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Lozinka:</td>
                                <td className="regSecondColumnStyle"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Provera lozinke:</td>
                                <td className="regSecondColumnStyle"><input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Datum rođenja:</td>
                                <td className="regSecondColumnStyle"><input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Država:</td>
                                <td>
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
                                <td className="regFirstColumnStyle">Broj telefona:</td>
                                <td className="regSecondColumnStyle"><input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <button className="btn btn-outline-dark" onClick={userRegistration}>Registruj se</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <GoogleLogin
                                        clientId={googleClientId}
                                        buttonText="Koristi Google nalog"
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={handleGoogleLoginFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Registration;