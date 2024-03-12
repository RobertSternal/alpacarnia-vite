import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOffers } from "./OffersContext";
import "./OfferDetails.css";

function OfferDetails() {
  const { id } = useParams();
  const { offers } = useOffers();
  const navigate = useNavigate();
  const offer = offers.find((offer) => offer._id === id);

  // If the offers have not been loaded yet or the specific offer can't be found
  if (!offer) {
    return <div>Loading offer details...</div>;
  }

  const handleReservationClick = () => {
    navigate("/booking", { state: { selectedOffer: offer } });
  };

  return (
    <div className="offer-details">
      <h2>{offer.text}</h2>
      {/* Display more details here */}
      <img src={offer.src} alt={offer.text} />
      <p>
        {offer.description} {/* Assuming there's a description field */}
      </p>
      {/* Add more offer details as needed */}
      <div className="button-container">
        <button
          type="button"
          className="reserve-button"
          onClick={handleReservationClick}
        >
          Rezerwuj
        </button>
      </div>
    </div>
  );
}

export default OfferDetails;
