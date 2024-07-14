import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllGames.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarAllGames from '../../components/NavBar/NavBarAllGames';
import { IGame } from "../../interfaces/IGame";
import AdminService from "../../services/Admin/AdminService";

const AllGames: React.FC = () => {

    const redirection = useNavigate();
    const [allGames, setAllGames] = useState<IGame[]>([]);

    useEffect(() => {
        // Zaštita stranice
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        // Funkcija za dobavljanje podataka o svim igricama u sistemu sa servera
        const fetchAllGamesData = async () => {
            try {
                const response = await AdminService.getAllGames();
                console.log(response.data)
                if (response !== undefined) {
                    if (response.email === 'kristiantojzan@gmail.com') {
                        const gamesWithDefaults: IGame[] = response.data.map((game: any) => ({
                            ...game,
                            youtubeLink: '',
                            image: null
                        }));
                        gamesWithDefaults.sort((a, b) => a.name.localeCompare(b.name));
                        setAllGames(gamesWithDefaults);
                    }
                    else {
                        redirection('/login');
                    }
                }
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchAllGamesData();
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

    return (
        <div className="container">
            <header className="header">
                <div className="store-name">TK Store</div>
                <div className="icons">
                    <FaSignOutAlt className="icon" onClick={logOut} />
                </div>
            </header>
            <NavBarAllGames />
            <main className='main-content-allGames'>
                <h1 className='titleStyle'>Prikaz svih igrica u sistemu</h1>
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
                        {allGames.map((game, index) => (
                            <tr key={index}>
                                <td className="tdStyle"><img src="/cs2.jpg" alt="image" className="image-style" /></td>
                                <td className="tdStyle">{game.name}</td>
                                <td className="tdStyle">{game.price}</td>
                                <td className="tdStyle">{game.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer className="footer">
                <br />
            </footer>
        </div>
    );
}

export default AllGames;