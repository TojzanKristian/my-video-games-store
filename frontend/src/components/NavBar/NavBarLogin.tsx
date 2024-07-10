import React from 'react';
import { Link } from 'react-router-dom';
import { navBarLogRegStyle, linkLogRegStyle, activeLinkLogRegStyle  } from './NavBarLogRegCSS';

const NavBarLogin: React.FC = () => {
    return (
        <div style={navBarLogRegStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" style={activeLinkLogRegStyle}>Prijava</Link>
                </li>
                <li className="nav-item">
                    <Link to="/registration" className="nav-link" style={linkLogRegStyle}>Registracija</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarLogin;