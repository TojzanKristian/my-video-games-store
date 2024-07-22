import React, { createContext, useContext, useState, useEffect } from 'react';
import { IGameDetails } from '../../interfaces/IGameDetails';

interface CartContextProps {
  cart: IGameDetails[];
  addToCart: (game: IGameDetails) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  // Inicijalizacija stanja korpe
  const [cart, setCart] = useState<IGameDetails[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Čuvanje stanja korpe u lokalnom skladištu svaki put kad se sadržaj korpe promeni
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Funkcija za dodavanje igrice u korpu
  const addToCart = (game: IGameDetails) => {
    const isGameInCart = cart.some((cartItem) => cartItem.name === game.name);
    if (isGameInCart) {
      alert(`Igrica ${game.name} je već dodata u korpu!`);
      return;
    }
    alert('Dodali ste ' + game.name + ' u korpu!');
    setCart((prevCart) => [...prevCart, game]);
  };

  // Funkcija za uklanjanje igrice iz korpe
  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((game) => game.name !== name));
    alert('Izbacili ste igricu ' + name + ' iz korpe!');
  };

  // Funkcija za pražnjenje korpe
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};