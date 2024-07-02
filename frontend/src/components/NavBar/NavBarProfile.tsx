import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle, activeLinkStyle } from './NavBarCSS';

const NavBarProfile: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={activeLinkStyle}>Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link" style={linkStyle}>Kupljene igrice</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarProfile;