import React, { useState } from "react";
import "../App.css";
import "./SignInForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "./OAuth";
function SignInForm() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.className]: e.target.value,
    });
  };

  //const a2nce = `${process.env.REACT_APP_SERVER}/auth/signin`;
  //console.log(a2nce);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/auth/signin`,
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
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    // console.log(data);
  };

  console.log(formData);
  return (
    <div className="signup-container">
      <h1 className="signup-title"> Zaloguj się </h1>
      <form onSubmit={handleSubmit} className="signin-form">
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
        <button disabled={loading}>
          {loading ? "Ładowanie..." : "Zaloguj się"}
        </button>
        <OAuth />
      </form>
      <div className="signin-link">
        <p>Nie masz konta?</p>
        <Link to={"/sign-up"}>
          <span className="signin-link-span">Zarejestruj się</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignInForm;
