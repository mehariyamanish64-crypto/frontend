import { Link } from "react-router-dom";
import "../styles/Home.css";
import Logo from "../assets/Logo.png";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">

        {/* Small Logo */}
        <img src={Logo} alt="logo" className="small-logo" />

        <h1>GiftShop</h1>

        <p>Find the perfect gift for every occasion!</p>

        <div className="hero-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>

      </div>
    </div>
  );
}