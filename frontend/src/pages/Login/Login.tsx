import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { ILoginModel } from '../../interfaces/ILoginModel';
import { GoogleLogin } from 'react-google-login';
import { googleClientId } from '../../config'
import LoginService from '../../services/Login/LoginService';
import RegistrationService from '../../services/Registration/RegistrationService';
import NavBarLogin from '../../components/NavBar/NavBarLogin';

const Login = () => {

    const redirection = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loggedUser: ILoginModel = {
        email,
        password,
    };

    // Funkcija za validaciju polja i slanje podataka na server za prijavu
    const userLoggingin = async () => {
        if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (password.length === 0 || password.length < 6) {
            alert("Lozinka mora biti popunjena!");
        }
        else {
            try {
                const response = await LoginService.loginUser(loggedUser);
                if (response.responseCode === -2) {
                    alert(response.message);
                }
                else if (response.responseCode === -1) {
                    alert(response.message);
                }
                else {
                    alert(response.message);
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za obradu uspešne prijave sa google nalogom
    const handleGoogleLoginSuccess = async (response: any) => {
        if (response.profileObj) {
            const { name, email, familyName, givenName } = response.profileObj;
            try {
                const response = await RegistrationService.googleAccountLogin(name, email, familyName, givenName);
                const token = response.token;
                localStorage.setItem('token', token);
                alert(response.message);
                redirection('/');
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        } else {
            console.error('Došlo je do greške!');
        }
    };

    // Funkcija za obradu greške pri prijavi sa google nalogom
    const handleGoogleLoginFailure = (error: any) => {
        alert("Došlo je do greške!");
        console.error('Došlo je do greške pri prijavi na Google nalog:', error);
    };

    return (
        <div className='logPageStyle'>
            <NavBarLogin />
            <div className='logContainerStyle'>
                <div className='logFormStyle'>
                    <h1 className='logTitleStyle'>Prijava</h1>
                    <table className='logTableStyle'>
                        <tbody>
                            <tr>
                                <td className='logFirstColumnStyle'>Email:</td>
                                <td className='logSecondColumnStyle'>
                                    <input
                                        type="email"
                                        id="email"
                                        className="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='logFirstColumnStyle'>Lozinka:</td>
                                <td className='logSecondColumnStyle'>
                                    <input
                                        type="password"
                                        id="lozinka"
                                        className="lozinka"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <input
                                        className="btn btn-outline-dark"
                                        id="prijavaDugme"
                                        type="submit"
                                        value="Prijavi se"
                                        onClick={userLoggingin}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <GoogleLogin
                                        clientId={googleClientId}
                                        buttonText="Koristi Google nalog"
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={handleGoogleLoginFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Login;