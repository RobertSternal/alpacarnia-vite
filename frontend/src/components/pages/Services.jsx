import React from "react";
import "../../App.css";
import Footer from "../Footer";
import AlpacaInfo from "../AlpacaInfo";
import Location from "../Location";

export default function Services() {
  return (
    <>
      <h1 className="services"> O NAS </h1>
      <AlpacaInfo />
      <Location />
      <Footer />
    </>
  );
}
