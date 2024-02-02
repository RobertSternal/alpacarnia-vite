import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import SignUp from "./components/pages/SignUp";
import Products from "./components/pages/Products";
import SignIn from "./components/pages/SignIn";
import Profile from "./components/pages/Profile";
import Private from "./components/Private";
import Booking from "./components/pages/Booking";
import PrivateAdmin from "./components/PrivateAdmin";
import Admin from "./components/pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/booking" exact element={<Booking />} />
          <Route exact element={<Private />}>
            <Route path="/profile" exact element={<Profile />} />
          </Route>
          <Route exact element={<PrivateAdmin />}>
            <Route path="/admin/dashboard" exact element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
