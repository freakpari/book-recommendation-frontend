import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import '/index.css';
import SignUp from "./pages/SignUp/Signup";
import NotFound from "./pages/NotFound/NotFound";
import AboutUs from "./pages/AboutUs/AboutUs";
import AuthPage from "./pages/Auth/Authpage";
import Rules from "./pages/Rules/Rules";
import Verify from "./pages/verify/verify";
import FAQ from "./pages/FAQ/FAQ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<SignUp /> } />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/landing" element={<AuthPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
