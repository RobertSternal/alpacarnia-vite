import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOffers } from "./OffersContext";
import "./OfferDetails.css";

function OfferDetails() {
  const { id } = useParams();
  const { offers } = useOffers();
  const navigate = useNavigate();
  const offer = offers.find((offer) => offer._id === id);

  const offersWithCardComparison = [
    "65f2df01221c7a35599dff0b",
    "66018d7977f5a3dabb1db908",
  ];

  const showCardComparision = offersWithCardComparison.includes(offer._id);
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
      <img src={offer.src} alt={offer.text} />
      <h3>{offer.description1}</h3>
      {showCardComparision ? (
        <>
          <h2>Porównanie ofert:</h2>
          <div
            style={{ display: "flex", gap: "4rem" }}
            className="offer-comparison"
          >
            <div className="offer-details">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                className="offer1"
              >
                <h3>Oferta 1</h3>
                <p>Cena: 30$</p>
                <p>Opis: {offer.description2}</p>
              </div>
              {/* <div className="offer2">
                <h3>Oferta 2</h3>
                <p>Cena: {offer2.price}</p>
                <p>Opis: {offer2.description}</p>
              </div> */}
            </div>
            <div className="offer-details">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                className="offer1"
              >
                <h3>Oferta 2</h3>
                <p>Cena: 60$</p>
                <p>Opis: {offer.description3}</p>
              </div>
              {/* <div className="offer2">
                <h3>Oferta 2</h3>
                <p>Cena: {offer2.price}</p>
                <p>Opis: {offer2.description}</p>
              </div> */}
            </div>
          </div>
          {/* 
          <p>{offer.description2}</p>
          <p>{offer.description3}</p> */}
        </>
      ) : (
        <>
          <p>{offer.description2}</p>
          <p>{offer.description3}</p>
        </>
      )}

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
