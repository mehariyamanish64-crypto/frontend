import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const checkLogin = (e, path) => {

    const token = localStorage.getItem("token");

    if (!token) {

      e.preventDefault();

      alert("⚠️ Please login first");

      navigate("/login");

    } else {

      navigate(path);

    }

  };

  return (

    <nav className="navbar">

      <div className="logo">🎁 GiftShop</div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products" onClick={(e)=>checkLogin(e,"/products")}>
          Products
        </Link>

        <Link to="/cart" onClick={(e)=>checkLogin(e,"/cart")}>
          Cart
        </Link>

        <Link to="/profile" onClick={(e)=>checkLogin(e,"/profile")}>
          Profile
        </Link>

        <Link to="/admin" onClick={(e)=>checkLogin(e,"/admin")}>
          Admin
        </Link>

      </div>

    </nav>

  );

}