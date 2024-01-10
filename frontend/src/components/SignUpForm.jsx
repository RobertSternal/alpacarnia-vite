import React, { useState } from "react";
import "../App.css";
import "./SignUpForm.css";
import "./OAuth.css";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "./OAuth";

function SignUpForm() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.className]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/auth/signup`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    // console.log(data);
  };

  console.log(formData);
  return (
    <div className="signup-container">
      <h1 className="signup-title"> Zarejestruj się </h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="username"
          className="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="signup-button">
          {loading ? "Ładowanie..." : "Utwórz konto"}
        </button>
        <OAuth />
      </form>
      <div className="signin-link-div">
        <p>Masz konto?</p>
        <Link to={"/sign-in"}>
          <span className="signin-link-span">Zaloguj się</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUpForm;
