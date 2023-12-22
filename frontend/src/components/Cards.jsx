import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Szef kuchni Robert poleca:</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/alp1.jpg"
              text="Spacer (zdjęcie poglądowe)"
              label="Najlepsza cena"
              path="/services"
            />
            <CardItem
              src="images/alp2.jpg"
              text="Spacer z Alpaką"
              label="Najlepsza cena"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/alp3.jpg"
              text="Możliwość pomalowania nam ogrodzenia"
              label="Popularne"
              path="/services"
            />

            <CardItem
              src="images/alpDuo.jpg"
              text="Spacer z para Alpak"
              label="Popularne"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
