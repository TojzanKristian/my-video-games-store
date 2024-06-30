import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { ILoginModel } from '../../interfaces/ILoginModel';
import { GoogleLogin } from 'react-google-login';
import { googleClientId } from '../../config'

const Login = () => {

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
                console.log(loggedUser);
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za obradu uspešne prijave sa google nalogom
    const handleGoogleLoginSuccess = async (response: any) => {
        if (response.profileObj) {
            console.log('Google !')
            const { name, email, familyName, givenName } = response.profileObj;
            try {
                //const response = await RegistrationService.googleAccountLogin(name, email, familyName, givenName);
                if (response.message === '2') {
                    alert('Uspešno ste se registrovali!');
                }
                else if (response.message === '1') {
                    alert('Uspešno ste se prijavili!');
                }
                else {
                    alert('Google !');
                    //alert('Registracija je neuspešna. Došlo je do greške tokom obrade podataka!');
                }
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