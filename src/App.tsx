import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/NavBar/NavBar';
import { useState } from 'react';
import PolicyPage from './pages/PolicyPage/PolicyPage';
import ClaimsPage from './pages/ClaimsPage/ClaimsPage';
import NewClaimsPage from './pages/NewClaimsPage/NewClaimsPage';
import NewPolicyPage from './pages/NewPolicyPage/NewPolicyPage';
import PolicySuccessPage from './pages/PolicySuccessPage/PolicySuccessPage';
import ClaimSuccessPage from './pages/ClaimSuccessPage/ClaimSuccessPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  return (
    <>
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/policies" element={<PolicyPage />} />
        <Route path="/policies/new" element={<NewPolicyPage />} />
        <Route path="/policies/success" element={<PolicySuccessPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/claims/new" element={<NewClaimsPage />} />
        <Route path="/claims/success" element={<ClaimSuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
