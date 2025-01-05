import React from "react";
import "../../App.css";
import Footer from "../Footer";
import AlpacaInfo from "../AlpacaInfo";
import Location from "../Location";
import AboutUs from "../AboutUs";

export default function Services() {
  return (
    <>
      <h1 className="services"> O NAS </h1>
      <AlpacaInfo />
      <AboutUs />
      <Location />
      <Footer />
    </>
  );
}
