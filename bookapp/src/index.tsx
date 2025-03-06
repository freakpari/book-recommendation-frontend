import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import AuthPage from './pages/Auth/Authpage';
import SignUp from './pages/SignUp/Signup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <AuthPage /> */}
    <SignUp />
  </React.StrictMode>
);


reportWebVitals();
