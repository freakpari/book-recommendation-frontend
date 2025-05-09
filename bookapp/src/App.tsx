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
import BookTalkMain from "./pages/BookTalkMain/BookTalkMain";
import BookTalkPerson from "./pages/BookTalkPerson/BookTalkPerson";
import Bookdetail from "./pages/BookDetail/Bookdetail";
import Listofbooks from "./pages/ListofBooks/ListofBooks";
import Recommendbook from "./pages/recommendbook/recommendbook";
import Recommendhistory from "./pages/Recommendhistory/Recommendhistory";
import MyBookList from "./pages/MyBookList/MyBookList";
import Chatpage from "./pages/chatpage/chatpage";
import NotificationList from "./pages/Notification/Notification";
import ReplyComment from "./pages/ReplyComment/ReplyComment";
import SetNewPassword from "./pages/SetNewPassword/SetNewPassword";
import VerifyForgetPasswordCode from "./pages/VerifyForgetPasswordCode/VerifyForgetPasswordCode";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import BookInMyList from "./pages/BooksInMyList/BooksInMyList";
import BooksInUserList from "./pages/BooksInUserList/BooksInUserList";

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
        <Route path="/bookTalkMain" element={<BookTalkMain/>} />
        <Route path="/bookTalkPerson" element={<BookTalkPerson/>} />
        <Route path="/bookdetail" element={<Bookdetail />}></Route>
        <Route path="/listofbooks" element={<Listofbooks />}></Route>
        <Route path="/recommendbooks" element={<Recommendbook />}></Route>
        <Route path="/recommendhistory" element={<Recommendhistory />}></Route>
        <Route path="/myBookList" element={<MyBookList/>} />
        <Route path="/chat"  element={<Chatpage />}></Route>
        <Route path="/notification" element={<NotificationList />}></Route>
        <Route path="/replyComment" element={<ReplyComment/>} />
        <Route path="/setNewPass" element={<SetNewPassword/>} />
        <Route path="/verifyPass" element={<VerifyForgetPasswordCode/>} />
        <Route path="/verifyEmail" element={<VerifyEmail/>} />
        <Route path="/bookInList" element={<BookInMyList/>} />
        <Route path="/bookInListUser" element={<BooksInUserList/>} />

      </Routes>
    </Router>
  );
}

export default App;
