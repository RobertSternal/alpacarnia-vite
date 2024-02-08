import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

function Cards({ onSelectOffer }) {
  const [cards, setCards] = useState([]); // Initialize cards as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/server/offer/public`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const offers = await response.json();
        setCards(offers); // Update state with fetched offers
      } catch (error) {
        console.error("Error fetching offers:", error);
        // Optionally handle error state here
      }
    };

    fetchOffers();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCardSelect = (card) => {
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
