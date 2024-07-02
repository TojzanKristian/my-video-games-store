import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import { googleClientId } from './config';
import { gapi } from 'gapi-script';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Edit profile/EditProfile';

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
      </Routes>
    </Router>
  );
}

export default App;