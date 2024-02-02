import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

function Cards({ onSelectOffer }) {
  const navigate = useNavigate();

  const cards = [
    {
      src: "images/alp1.jpg",
      text: "Spacer (zdjęcie poglądowe)",
      label: "Najlepsza cena",
      offer: "Spacer",
    },
    {
      src: "images/alp2.jpg",
      text: "Zdjęcie",
      label: "Najlepsza cena",
      offer: "Zdjęcie",
    },
    {
      src: "images/alp3.jpg",
      text: "Możliwość pomalowania nam ogrodzenia",
      label: "Popularne",
      offer: "Malowanie",
    },
    {
      src: "images/alpDuo.jpg",
      text: "Spacer z para Alpak",
      label: "Popularne",
      offer: "Wycieczka",
    },
  ];

  const handleCardSelect = (card) => {
    // Przekazuje wybraną ofertę do komponentu nadrzędnego
    navigate("/booking", { state: { selectedOffer: card.offer } });
  };

  return (
    <div className="cards">
      <h1>Szef kuchni Robert poleca:</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {cards.map((card, index) => (
              <CardItem
                key={index}
                src={card.src}
                text={card.text}
                label={card.label}
                path="/services"
                onCardSelect={() => handleCardSelect(card)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
