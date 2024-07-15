import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoGameList.css';
import VideoGameCard from '../Card for video game/VideoGameCard';
import { IGame } from '../../interfaces/IGame';
import { ICategory } from '../../interfaces/ICategory';

interface Props {
  categories: ICategory[];
  videoGames: IGame[];
}

const VideoGameList: React.FC<Props> = ({ categories, videoGames }) => {

  // Inicijalizacija stanja za prikaz svake kategorije
  const [categoryOpenState, setCategoryOpenState] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    categories.forEach(category => {
      initialState[category.name] = true;
    });
    return initialState;
  });

  // Funkcija koja menja stanje prikaza kategorije
  const toggleCategory = (categoryName: string) => {
    setCategoryOpenState(prevState => ({
      ...prevState,
      [categoryName]: !prevState[categoryName]
    }));
  };

  return (
    <div className="container">
      {categories.map(category => (
        <div key={category.name} className="category-container">
          <div className="category-header" onClick={() => toggleCategory(category.name)}>
            <h2>{category.name}</h2>
            <button className="btn btn-outline-dark">{categoryOpenState[category.name] ? '-' : '+'}</button>
          </div>
          {categoryOpenState[category.name] && (
            <div className="card-container">
              {videoGames
                .filter(game => category.subcategories.includes(game.category))
                .map(filteredGame => (
                  <VideoGameCard key={filteredGame.name} game={filteredGame} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGameList;