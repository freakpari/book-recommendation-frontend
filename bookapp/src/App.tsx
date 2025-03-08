import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import '/index.css';
import SignUp from './pages/SignUp/Signup';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notfound" element={<NotFound />} />
        </Routes>

    </Router>
  );
}

export default App;
