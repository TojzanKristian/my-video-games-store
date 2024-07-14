import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddNewGame.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBarAddNewGame from "../../components/NavBar/NavBarAddNewGame";
import VideoGameService from "../../services/Video game/VideoGameService";
import { IGame } from "../../interfaces/IGame";

const AddNewGame: React.FC = () => {

    const redirection = useNavigate();
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currency, setCurrency] = useState<string>('USD');
    const [videoGameName, setvideoGameName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [ytLink, setYTLink] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageInput, setImageInput] = useState<string>("");

    useEffect(() => {
        // Zaštita stranice
        /*const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }*/

        // Funkcija za dobavljanje svih postojećih valuta
        const supplyCurrencies = async () => {
            const response = await axios.get('https://open.er-api.com/v6/latest');
            const valuteAPI: string[] = Object.keys(response.data.rates);
            setCurrencies(valuteAPI);
        };
        supplyCurrencies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za obradu odjave sa sistema
    const logOut = async () => {
        try {
            localStorage.removeItem('token');
            redirection('/login');
        } catch (error) {
            console.error('Došlo je do greške:', error);
        }
    }

    // Funkcija za validaciju polja i slanje zahetva za dodavanje nove igrice na server
    const addNewVideoGame = async () => {
        if (videoGameName.length === 0) {
            alert("Polje za naziv igrice mora biti popunjeno!");
        }
        else if (category.length === 0) {
            alert("Polje za kategoriju igrice mora biti popunjeno!");
        }
        else if (price.length === 0) {
            alert("Polje za cenu igrice mora biti popunjeno!");
        }
        else if (ytLink.length === 0) {
            alert("Polje za YouTube link mora biti popunjeno!");
        }
        else if (image === null) {
            alert("Morate dodati sliku za igricu!");
        }
        else {
            try {
                const newVideoGame: IGame = {
                    name: videoGameName,
                    category: category,
                    price: price + ' ' + currency,
                    youtubeLink: ytLink,
                    image: image
                };
                const response = await VideoGameService.addNewGame(newVideoGame);
                alert(response);
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za dinamički prikaz odabrane slike
    function previewImageReg(input: any) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    const previewImg = document.getElementById('profileImage') as HTMLImageElement | null;
                    if (previewImg) {
                        previewImg.src = e.target.result as string;
                        previewImg.style.width = '120px';
                        previewImg.style.height = 'auto';
                    }
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
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
                                    <input className='inputStyle' type="text" value={videoGameName} onChange={(e) => setvideoGameName(e.target.value)} />
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
                            <tr>
                                <td className="user-detail-label">Slika:</td>
                                <td><input type="file" onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImage(e.target.files[0]);
                                        setImageInput(e.target.value);
                                        previewImageReg(e.target);
                                    }
                                }} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center" className="profileImageContainer">
                                    <img id="profileImage" src={imageInput} alt="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-outline-dark' onClick={addNewVideoGame}>Dodaj igricu</button>
                </div>
            </main>
            <footer className="footer">
                <br />
            </footer>
        </div>
    );
}

export default AddNewGame;