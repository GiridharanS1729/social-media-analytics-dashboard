import React from 'react';
import { Routes, Route, Router, Navigate,  useLocation  } from 'react-router-dom';
import Dashboard from './components/Dashboard';  
import YouTube from './components/YouTube';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import About from './components/About';
import Twitter from './components/Twitter';


const App = () => {
  const location = useLocation();

  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!isAuthPage && <Navbar />}
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/youtube" element={<YouTube />} />
        <Route path="/twitter" element={<Twitter />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;