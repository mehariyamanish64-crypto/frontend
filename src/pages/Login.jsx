import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/Login.css";
import Logo from "../assets/Logo.png";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {

    e.preventDefault();

    try {

      const res = await axiosInstance.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");

      navigate("/products");

    } catch (error) {

      alert("Login Failed ❌");

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <img src={Logo} alt="logo" className="auth-logo"/>

        <h2>Login</h2>

        <form onSubmit={submit}>

          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
          />

          <button type="submit">Login</button>

        </form>

        <div className="login-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>

      </div>

    </div>
  );
}