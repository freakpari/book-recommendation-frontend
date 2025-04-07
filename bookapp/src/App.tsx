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
import HomePage from "./pages/Homepage/Homepage";
import EditProfile from "./pages/EditProfile/EditProfile";
import BookNotFound from "./pages/BookNotFound/BookNotFound";
import PopularBooks from "./pages/PopularBook/PopularBook";
import MyBookHistory from "./pages/MyBookHistory/MyBookHistory";
import MyFavoriteBook from "./pages/MyFavoriteBook/MyFavoriteBook";
import SuggestionBook from "./pages/SuggestionBook/SuggestionBook";
import MbtiResult from "./pages/MbtiResult/MbtiResult";
// import Test from "./pages/test/test";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<SignUp /> } />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/questions" element={<FAQ />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/booknotfound" element={<BookNotFound />} />
        <Route path="/popularbook" element={<PopularBooks />} />
        <Route path="/myBookHistory" element={<MyBookHistory/>} />
        <Route path="/myFavoriteBook" element={<MyFavoriteBook/>} />
        <Route path="/suggestionBook" element={<SuggestionBook/>} />
        <Route path="/mbtiresult" element={<MbtiResult/>} />
        {/*<Route path="/test" element={<Test/>} />*/}

      </Routes>
    </Router>
  );
}

export default App;
