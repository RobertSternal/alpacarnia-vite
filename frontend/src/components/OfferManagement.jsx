import React, { useEffect, useState } from "react";
import "./OfferManagement.css";

function OfferManagement() {
  const initialCards = [
    {
      src: "/images/alp1.jpg",
      text: "Spacer (zdjęcie poglądowe)",
      label: "Najlepsza cena",
      offer: "Spacer",
    },
    {
      src: "/images/alp2.jpg",
      text: "Zdjęcie",
      label: "Najlepsza cena",
      offer: "Zdjęcie",
    },
    {
      src: "/images/alp3.jpg",
      text: "Możliwość pomalowania nam ogrodzenia",
      label: "Popularne",
      offer: "Malowanie",
    },
    {
      src: "/images/alpDuo.jpg",
      text: "Spacer z para Alpak",
      label: "Popularne",
      offer: "Wycieczka",
    },
  ];
  const [offers, setOffers] = useState(initialCards);
  const [newOffer, setNewOffer] = useState({
    src: "",
    text: "",
    label: "",
    offer: "",
  });
  const [error, setError] = useState(null);

  const handleAddOffer = async () => {
    //setOffers([...offers, newOffer]);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOffer),
        }
      );

      if (!res.ok) {
        setError("Failed to add offer");
        return;
      }
      //
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }

      //Po dodaniu
      const updatedOffersRes = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/admin/management`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!updatedOffersRes.ok) {
        setError("Failed to fetch updated offers");
        return;
      }
      const updatedOffers = await updatedOffersRes.json();

      setOffers(updatedOffers);
      setNewOffer({ src: "", text: "", label: "", offer: "" });
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error w trakcie przesyłania: ", error);
    }
  };

  const handleEditOffer = (offerId, updatedOffer) => {
    // Logic to update an offer
  };

  const handleDeleteOffer = (offerId) => {
    setOffers(offers.filter((offer) => offer.id !== offerId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddOffer();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({ ...newOffer, [name]: value });
  };

  useEffect(() => {
    // Fetch offers when the component mounts
    const fetchOffers = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/server/offer/admin/management`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          setError("Failed to fetch offers");
          return;
        }
        const data = await res.json();

        if (Array.isArray(data)) {
          setOffers(data);
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        setError("Error w trakcie fetchowania oferty");
        console.error("Error w trakcie fetchowania oferty: ", error.message);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="offer-management-container">
      <h1>Zarządzanie ofertą</h1>
      <form
        className="profile-form profile-container"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="src"
          value={newOffer.src}
          onChange={handleChange}
          placeholder="URL zdjęcia"
        />
        <input
          type="text"
          name="text"
          value={newOffer.text}
          onChange={handleChange}
          placeholder="Opis"
        />
        <input
          type="text"
          name="label"
          value={newOffer.label}
          onChange={handleChange}
          placeholder="Etykieta"
        />
        <input
          type="text"
          name="offer"
          value={newOffer.offer}
          onChange={handleChange}
          placeholder="Oferta"
        />
        <button type="submit">Dodaj ofertę</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th>Opis</th>
            <th>Etykieta</th>
            <th>Oferta</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => {
            console.log("To jest offers map", offer.src);
            return (
              <tr key={index}>
                <td>
                  <img src={offer.src} alt="Offer" style={{ width: "50px" }} />
                </td>
                <td>{offer.text}</td>
                <td>{offer.label}</td>
                <td>{offer.offer}</td>
                <td>
                  <button onClick={() => handleEditOffer(offer.id)}>
                    Edytuj
                  </button>
                  <button onClick={() => handleDeleteOffer(offer.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OfferManagement;
