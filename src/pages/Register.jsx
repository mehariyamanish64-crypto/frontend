import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/Register.css";
import Logo from "../assets/Logo.png";

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <img src={Logo} alt="logo" className="auth-logo"/>

        <h1>Register</h1>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            required
          />

          <button type="submit">Register</button>

        </form>

      </div>

    </div>
  );
}