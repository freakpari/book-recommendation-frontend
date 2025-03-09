import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import '/index.css';
import SignUp from "./pages/SignUp/Signup";
import NotFound from "./pages/NotFound/NotFound";
import AboutUs from "./pages/AboutUs/AboutUs";
import AuthPage from "./pages/Auth/Authpage";
import RulesAndRegulations from "./pages/RulesAndRegulations/RulesAndRegulations";

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
          <Route path="/rulesandregulations" element={<RulesAndRegulations />} />

      </Routes>
    </Router>
  );
}

export default App;
