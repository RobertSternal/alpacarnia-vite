import React, { useEffect } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
import { useOffers } from "./OffersContext";

function Cards({ onSelectOffer }) {
  const { offers, fetchOffers } = useOffers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers(); // Call the fetchOffers method from context
  }, [fetchOffers]);

  const handleCardSelect = (card) => {
    navigate(`/offer/${card._id}`);
  };

  return (
    <div className="cards">
      <h1>Szef kuchni Robert poleca:</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {offers.map((card, index) => (
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
