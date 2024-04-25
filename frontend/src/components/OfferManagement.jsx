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
    description1: "",
    description2: "",
    description3: "",
    bestSeller: "",
  });
  const [updatedOffer, setUpdatedOffer] = useState({
    src: "",
    text: "",
    label: "",
    offer: "",
    description1: "",
    description2: "",
    description3: "",
    bestSeller: "",
  });
  const [editedOfferId, setEditedOfferId] = useState(null);
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
      setNewOffer({
        src: "",
        text: "",
        label: "",
        offer: "",
        description1: "",
        description2: "",
        description3: "",
      });
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error w trakcie przesyłania: ", error);
    }
  };
  //EDIT
  const handleEditOffer = async (offerId, updatedOffer) => {
    try {
      console.log("Updated Offer before PUT request łaa:", updatedOffer);
      console.log("Offer ID before PUT request:", offerId);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/edit/${offerId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOffer),
        }
      );

      if (!res.ok) {
        setError("Failed to edit offer");
        return;
      }

      // Fetch the updated offers after editing
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

      console.log("Updated Offers po:", updatedOffers);
      setOffers(updatedOffers);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error during offer editing: ", error);
    }
  };

  //DELETE
  const handleDeleteOffer = async (offerId) => {
    try {
      // Perform the logic to delete an offer, e.g., make a DELETE request
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/delete/${offerId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setError("Failed to delete offer");
        return;
      }

      // Fetch the updated offers after deleting
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

      console.log("Updated Offers (before setting):", updatedOffers);

      setOffers(updatedOffers);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error during offer deletion: ", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddOffer();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewOffer({ ...newOffer, [name]: checked });
    } else {
      setNewOffer({ ...newOffer, [name]: value });
    }
  };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUpdatedOffer({ ...updatedOffer, [name]: checked });
    } else {
      setUpdatedOffer({ ...updatedOffer, [name]: value });
    }
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

  useEffect(() => {}, [offers]);

  return (
    <div className="offer-management-container">
      <h1 className="offer-mg-title">Zarządzanie ofertą</h1>
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
        <input
          type="text"
          name="description1"
          value={newOffer.description1}
          onChange={handleChange}
          placeholder="Opis 1"
        />
        <input
          type="text"
          name="description2"
          value={newOffer.description2}
          onChange={handleChange}
          placeholder="Opis 2"
        />
        <input
          type="text"
          name="description3"
          value={newOffer.description3}
          onChange={handleChange}
          placeholder="Opis 3"
        />
        <input
          type="checkbox"
          name="bestSeller"
          checked={newOffer.bestSeller}
          onChange={handleChange}
        />
        <button type="submit" className="offer-action-button">
          Dodaj ofertę
        </button>
      </form>
      <form className="profile-form profile-container">
        {/* New form fields for editing an offer */}
        <input
          type="text"
          name="src"
          defaultValue={updatedOffer.src}
          onChange={handleEditChange}
          placeholder="Updated URL zdjęcia"
        />
        <input
          type="text"
          name="text"
          defaultValue={updatedOffer.text}
          onChange={handleEditChange}
          placeholder="Updated Opis"
        />
        <input
          type="text"
          name="label"
          defaultValue={updatedOffer.label}
          onChange={handleEditChange}
          placeholder="Updated Etykieta"
        />
        <input
          type="text"
          name="offer"
          defaultValue={updatedOffer.offer}
          onChange={handleEditChange}
          placeholder="Updated Oferta"
        />
        <input
          type="text"
          name="description1"
          defaultValue={updatedOffer.description1}
          onChange={handleEditChange}
          placeholder="Updated Opis 1"
        />
        <input
          type="text"
          name="description2"
          defaultValue={updatedOffer.description2}
          onChange={handleEditChange}
          placeholder="Updated Opis 2"
        />
        <input
          type="text"
          name="description3"
          defaultValue={updatedOffer.description3}
          onChange={handleEditChange}
          placeholder="Updated Opis 3"
        />
        <input
          type="checkbox"
          name="bestSeller"
          checked={updatedOffer.bestSeller}
          onChange={handleEditChange}
        />
        <button
          className="offer-action-button"
          type="button"
          onClick={() => handleEditOffer(editedOfferId, updatedOffer)}
        >
          Edytuj ofertę
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th>Opis</th>
            <th>Etykieta</th>
            <th>Oferta</th>
            <th className="description-cell">description1</th>
            <th className="description-cell">description2</th>
            <th className="description-cell">description3</th>
            <th>Bestseller</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="content-div">
                    <img
                      className="offer-management-img"
                      src={offer.src}
                      alt="Offer"
                    />
                  </div>
                </td>
                <td>
                  <div className="content-div">{offer.text}</div>
                </td>
                <td>
                  <div className="content-div">{offer.label}</div>
                </td>
                <td>
                  <div className="content-div">{offer.offer}</div>
                </td>
                <td>
                  <div className="description-cell">{offer.description1}</div>
                </td>
                <td>
                  <div className="description-cell">{offer.description2}</div>
                </td>
                <td>
                  <div className="description-cell">{offer.description3}</div>
                </td>
                <td>
                  <div className="content-div">
                    {offer.bestSeller ? "Tak" : "Nie"}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => {
                        setEditedOfferId(offer._id);
                        setUpdatedOffer({
                          src: offer.src,
                          text: offer.text,
                          label: offer.label,
                          offer: offer.offer,
                          description1: offer.description1,
                          description2: offer.description2,
                          description3: offer.description3,
                          bestSeller: offer.bestSeller,
                        });
                      }}
                    >
                      Edytuj
                    </button>
                    <button onClick={() => handleDeleteOffer(offer._id)}>
                      Usuń
                    </button>
                  </div>
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
