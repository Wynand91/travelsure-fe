import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar";

function App() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/policies" element={<div>Policies Page</div>} />
        <Route path="/claims" element={<div>Claims Page</div>} />
      </Routes>
    </>
  );
}

export default App;
