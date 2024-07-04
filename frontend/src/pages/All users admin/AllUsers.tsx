import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllUsers.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarAllUsers from '../../components/NavBar/NavBarAllUsers';

const AllUsers: React.FC = () => {

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
            <NavBarAllUsers />
            <main className='main-content-allUsers'>
                <h1 className='titleStyle'>Prikaz svih korisnika u sistemu</h1>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className='thStyle'>Ime</th>
                            <th scope="col" className='thStyle'>Prezime</th>
                            <th scope="col" className='thStyle'>Korisničko ime</th>
                            <th scope="col" className='thStyle'>Email</th>
                            <th scope="col" className='thStyle'>Datum rođenja</th>
                            <th scope="col" className='thStyle'>Država</th>
                            <th scope="col" className='thStyle'>Broj telefona</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
                        </tr>
                        <tr>
                            <td className="tdStyle">Marko</td>
                            <td className="tdStyle">Markovic</td>
                            <td className="tdStyle">marko23</td>
                            <td className="tdStyle">marko@gmail.com</td>
                            <td className="tdStyle">01.01.1990</td>
                            <td className="tdStyle">Srbija</td>
                            <td className="tdStyle">+381 64 123 4567</td>
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

export default AllUsers;