import React, { useEffect } from "react";
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
import { useOffers } from "./components/OffersContext";
import OfferDetails from "./components/OfferDetails";

function App() {
  const { offers, fetchOffers } = useOffers();
  useEffect(() => {
    fetchOffers(); // Call the fetchOffers method from context
  }, []);

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
          <Route path="/offer/:id" element={<OfferDetails />} />
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
