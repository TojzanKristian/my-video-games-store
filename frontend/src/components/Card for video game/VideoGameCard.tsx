import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoGameCard.css';
import { useCart } from '../Cart context/CartContext';
import { IGame } from '../../interfaces/IGame';

interface Props {
  game: IGame
}

const VideoGameCard: React.FC<Props> = ({ game }) => {

  const redirection = useNavigate();
  const { addToCart } = useCart();

  // Funkcija za obradu dodavanja igrice u korpu
  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      addToCart(game);
    } else {
      alert('Morate se prijaviti da bi mogli da koristite korpu!');
      redirection('/login');
    }
  };

  return (
    <div className="card video-game-card">
      <img src={'/cs2.jpg'} className="card-img-top" alt={game.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{game.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-end">{game.price}</li>
      </ul>
      <div className="card-body text-center">
        <Link to={`/video-game-details/${game.name}`} className="card-link">Detalji</Link>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item centered-button">
          <button className='btn btn-outline-dark' onClick={handleAddToCart}>Dodaj u korpu</button>
        </li>
      </ul>
    </div>
  );
};

export default VideoGameCard;