import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllPurchases.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import NavBarAllPurchases from '../../components/NavBar/NavBarAllPurchases';
import { IPurchase } from "../../interfaces/IPurchase";
import AdminService from "../../services/Admin/AdminService";

const AllPurchases: React.FC = () => {

    const redirection = useNavigate();
    const [allPurchases, setAllPurchases] = useState<IPurchase[]>([]);

    useEffect(() => {
        // Zaštita stranice
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        // Funkcija za dobavljanje podataka o svim kupovinama u sistemu sa servera
        const fetchAllPurchasesData = async () => {
            try {
                const response = await AdminService.getAllPurchases();
                if (response !== undefined) {
                    if (response.email === 'kristiantojzan@gmail.com') {
                        setAllPurchases(response.data);
                    }
                    else {
                        redirection('/login');
                    }
                }
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchAllPurchasesData();
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
            <NavBarAllPurchases />
            <main className='main-content-allPurchases'>
                <h1 className='titleStyle'>Prikaz svih kupovina u sistemu</h1>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className='thStyle'>Spisak kupljenih igrica</th>
                            <th scope="col" className='thStyle'>Cena</th>
                            <th scope="col" className='thStyle'>Korisničko ime kupca</th>
                            <th scope="col" className='thStyle'>Datum kupovine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPurchases.map((purchase, index) => (
                            <tr key={index}>
                                <td className="tdStyle">{purchase.listOfPurchasedGames}</td>
                                <td className="tdStyle">{purchase.price}</td>
                                <td className="tdStyle">{purchase.buyerUsername}</td>
                                <td className="tdStyle">{purchase.dateOfPurchase}</td>
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

export default AllPurchases;