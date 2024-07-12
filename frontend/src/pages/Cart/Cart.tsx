import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaHome, FaSignInAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import PayPalButton from "../../components/PayPal button/PayPalButton";
import { useCart } from "../../components/Cart context/CartContext";

const Cart: React.FC = () => {

    const redirection = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalAmount = cart.reduce((total, game) => total + parseFloat(game.price.replace('$', '')), 0);

    useEffect(() => {
        // Zaštita stranice
        /*const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prelaz na početnu stranicu
    const openHomePage = () => {
        redirection('/');
    };

    // Funkcija za prelaz na stranicu za profil
    const openProfilePage = async () => {
        redirection('/profile');
    }

    // Funkcija za prelaz na stranicu za prikaz korpe
    const openCartPage = () => {
        redirection('/cart');
    };

    // Funkcija za prelaz na stranicu za prijavu
    const openLoginPage = async () => {
        redirection('/login');
    }

    // Funkcija za obradu odjave sa sistema
    const logOut = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
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
                    <FaHome className="icon" onClick={openHomePage} />
                    <FaUser className="icon" onClick={openProfilePage} />
                    <FaShoppingCart className="icon" onClick={openCartPage} />
                    <FaSignInAlt className="icon" onClick={openLoginPage} />
                    <FaSignOutAlt className="icon" onClick={logOut} />
                </div>
            </header>
            <div className="main-container-cart">
                <div className="product-section">
                    <h2>Igrice u korpi</h2>
                    {cart.map((game) => (
                        <div key={game.name} className="card">
                            <div className="card-container">
                                <div className="card-trash-container">
                                    <FaTrash className="trash-icon" onClick={() => removeFromCart(game.name)} />
                                </div>
                                <div className="card-image">
                                    <img src="/cs2.jpg" alt={game.name} />
                                </div>
                                <div className="card-content">
                                    <p className="card-title">{game.name}</p>
                                    <p className="card-category">{game.category}</p>
                                    <p className="card-price">Cena: {game.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="payment-section">
                    <h2>Plaćanje</h2>
                    <div className="totalPrice-div">
                        <h4>Ukupan iznos:</h4>
                        <p>{totalAmount.toFixed(2)} USD</p>
                    </div>
                    {totalAmount > 0 && (
                        <div className="payPalButton-div">
                            <PayPalButton amount={totalAmount} onSuccess={(details) => console.log(details)} />
                        </div>
                    )}
                </div>
            </div>
            <footer className="footer">
                <p>Support: kristiantojzan@gmail.com</p>
            </footer>
        </div>
    );
}

export default Cart;