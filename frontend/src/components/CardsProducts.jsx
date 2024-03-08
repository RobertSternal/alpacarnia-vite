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
              text="Spacer z Alpaką (1H)"
              label="Popularne"
              path="/services"
            />
            <CardItem
              src="images/alpDuo.jpg"
              text="Spacer z Alpakami (2H)"
              label="Popularne"
              path="/services"
            />
            <CardItem
              src="images/alp3.jpg"
              text="Malowanie z alpakami"
              label="Popularne"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/alp2.jpg"
              text="Zdjęcia ze zwierzętami"
              label="Nowość"
              path="/services"
            />
            <CardItem
              src="images/alp5.jpg"
              text="Opowiadania"
              label="Nowość"
              path="/services"
            />
            <CardItem
              src="images/wild.jpg"
              text="Wycieczka z Panią Kasią"
              label="Nowość"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardsProducts;
