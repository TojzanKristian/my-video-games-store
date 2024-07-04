import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle, activeLinkStyle } from './NavBarCSS';

const NavBarAllUsers: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/all-users" className="nav-link" style={activeLinkStyle}>Korisnici</Link>
                </li>
                <li className="nav-item">
                    <Link to="/all-purchases" className="nav-link" style={linkStyle}>Kupovine</Link>
                </li>
                <li className="nav-item">
                    <Link to="/all-games" className="nav-link" style={linkStyle}>Igrice</Link>
                </li>
                <li className="nav-item">
                    <Link to="/add-new-game" className="nav-link" style={linkStyle}>Dodavanje nove igrice</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarAllUsers;