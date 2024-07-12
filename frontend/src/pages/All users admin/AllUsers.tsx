import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllUsers.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarAllUsers from '../../components/NavBar/NavBarAllUsers';
import axios from 'axios';
import { ICountry } from "../../interfaces/ICountry";
import { IUser } from "../../interfaces/IUser";
import AdminService from "../../services/Admin/AdminService";

const AllUsers: React.FC = () => {

    const redirection = useNavigate();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);

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

        // Funkcija za dobavljanje podataka o svim korisnicima u sistemu sa servera
        const fetchAllUsersData = async () => {
            try {
                const response = await AdminService.getAllUsers();
                if (response !== undefined) {
                    if (response.email === 'kristiantojzan@gmail.com') {
                        setAllUsers(response.data);
                    }
                    else {
                        redirection('/login');
                    }
                }
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchAllUsersData();
        fetchCountries();
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
                        {allUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="tdStyle">{user.firstName}</td>
                                <td className="tdStyle">{user.lastName}</td>
                                <td className="tdStyle">{user.userName}</td>
                                <td className="tdStyle">{user.email}</td>
                                <td className="tdStyle">{user.dateOfBirth}</td>
                                <td className="tdStyle">
                                    {user.country}
                                    <img src={countries.find(country => country.name === user.country)?.flag} alt={user.country} className="flagImage" />
                                </td>
                                <td className="tdStyle">{user.phoneNumber}</td>
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

export default AllUsers;