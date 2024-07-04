import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllGames.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarAllGames from '../../components/NavBar/NavBarAllGames';

const AllGames: React.FC = () => {

    const redirection = useNavigate();

    const logOut = async () => {
        redirection('/login');
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
                            <th scope="col" className='thStyle'>Ključ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tdStyle"><img src="/cs2.jpg" alt="image" className="image-style " /></td>
                            <td className="tdStyle">Counter Strike 2</td>
                            <td className="tdStyle">50</td>
                            <td className="tdStyle">FPS</td>
                            <td className="tdStyle">ADA7ADAAHA6751AD</td>
                        </tr>
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