import React from "react";
import CardItem from "./CardItem";
import "./CardsProducts.css";

function CardsProducts() {
  return (
    <div className="cards">
      <h1>Sprawdź naszą ofertę!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/alp1.jpg"
              text="Spacer z Alpaką"
              label="Popular"
              path="/services"
            />
            <CardItem
              src="images/alp4.jpg"
              text="Spacer z Alpaką"
              label="Popular"
              path="/services"
            />
            <CardItem
              src="images/alp1.jpg"
              text="Spacer z Alpaką"
              label="Popular"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/alp1.jpg"
              text="Spacer z Alpaką"
              label="Popular"
              path="/services"
            />
            <CardItem
              src="images/alp4.jpg"
              text="Spacer z Alpaką"
              label="Popular"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsProducts;
