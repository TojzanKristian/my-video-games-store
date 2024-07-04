import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import { googleClientId } from './config';
import { gapi } from 'gapi-script';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Edit profile/EditProfile';
import MyGames from './pages/My games/MyGames';
import AllUsers from './pages/All users admin/AllUsers';
import AllPurchases from './pages/All purchases admin/AllPurchases';
import AddNewGame from './pages/Add new game admin/AddNewGame';
import AllGames from './pages/All games admin/AllGames';

const App: React.FC = () => {
  // Funkcija za podešavanje za google autentifikaciju
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-games" element={<MyGames />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/all-purchases" element={<AllPurchases />} />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/add-new-game" element={<AddNewGame />} />
      </Routes>
    </Router>
  );
}

export default App;