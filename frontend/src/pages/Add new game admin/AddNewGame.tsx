import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddNewGame.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBarAddNewGame from "../../components/NavBar/NavBarAddNewGame";

const AddNewGame: React.FC = () => {

    const redirection = useNavigate();
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currency, setCurrency] = useState<string>('');
    const [videoGamesName, setvideoGamesName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [ytLink, setYTLink] = useState<string>("");

    useEffect(() => {
        // Funkcija za dobavljanje svih postojećih valuta
        const supplyCurrencies = async () => {
            const response = await axios.get('https://open.er-api.com/v6/latest');
            const valuteAPI: string[] = Object.keys(response.data.rates);
            setCurrencies(valuteAPI);
        };

        supplyCurrencies();
    }, []);

    const logOut = async () => {
        redirection('/login');
    }

    const editProfile = async () => {
        /*var yearHelp = new Date(dateOfBirth);
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
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }*/
    }

    return (
        <div className="container">
            <header className="header">
                <div className="store-name">TK Store</div>
                <div className="icons">
                    <FaSignOutAlt className="icon" onClick={logOut} />
                </div>
            </header>
            <NavBarAddNewGame />
            <main className="main-content">
                <div className="main-container">
                    <h1>Forma za dodavanje</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="user-detail-label">Naziv igrice:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={videoGamesName} onChange={(e) => setvideoGamesName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Cena:</td>
                                <td>
                                    <input className='inputStyleSpecial' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <select className="selectStyle-addNewGame " value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                        {currencies.map((valuta, index) => (
                                            <option key={index} value={valuta}>
                                                {valuta}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">Kategorija:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="user-detail-label">YouTube link:</td>
                                <td>
                                    <input className='inputStyle' type="text" value={ytLink} onChange={(e) => setYTLink(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button className='btn btn-outline-dark' onClick={editProfile}>Dodaj igricu</button>
                </div>
            </main>
            <footer className="footer">
                <br />
            </footer>
        </div>
    );
}

export default AddNewGame;