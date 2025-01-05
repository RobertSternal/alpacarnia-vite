import React, { useEffect, useState } from "react";
import "./OfferManagement.css";

function OfferManagement() {
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState({
    src: "",
    text: "",
    label: "",
    offer: "",
    description1: "",
    description2: "",
    description3: "",
    bestSeller: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setCurrentOffer({
      src: "",
      text: "",
      label: "",
      offer: "",
      description1: "",
      description2: "",
      description3: "",
      bestSeller: false,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode
        ? `${process.env.REACT_APP_SERVER}/server/offer/edit/${editId}`
        : `${process.env.REACT_APP_SERVER}/server/offer/add`;
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOffer),
      });

      if (!res.ok) {
        setError(`Failed to ${editMode ? "edit" : "add"} offer`);
        return;
      }

      await fetchOffers();
      resetForm();
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error during operation: ", error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę ofertę?")) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/delete/${offerId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setError("Failed to delete offer");
        return;
      }

      await fetchOffers();
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error during deletion: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentOffer({
      ...currentOffer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (offer) => {
    setCurrentOffer({
      src: offer.src,
      text: offer.text,
      label: offer.label,
      offer: offer.offer,
      description1: offer.description1,
      description2: offer.description2,
      description3: offer.description3,
      bestSeller: offer.bestSeller,
    });
    setEditMode(true);
    setEditId(offer._id);
  };

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
      setError("Error fetching offers");
      console.error("Error fetching offers: ", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="offer-management-container">
      <h1 className="offer-mg-title">Zarządzanie ofertą</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form className="profile-form profile-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="src"
          value={currentOffer.src}
          onChange={handleChange}
          placeholder="URL zdjęcia"
        />
        <input
          type="text"
          name="text"
          value={currentOffer.text}
          onChange={handleChange}
          placeholder="Opis"
        />
        <input
          type="text"
          name="label"
          value={currentOffer.label}
          onChange={handleChange}
          placeholder="Etykieta"
        />
        <input
          type="text"
          name="offer"
          value={currentOffer.offer}
          onChange={handleChange}
          placeholder="Oferta"
        />
        <input
          type="text"
          name="description1"
          value={currentOffer.description1}
          onChange={handleChange}
          placeholder="Opis 1"
        />
        <input
          type="text"
          name="description2"
          value={currentOffer.description2}
          onChange={handleChange}
          placeholder="Opis 2"
        />
        <input
          type="text"
          name="description3"
          value={currentOffer.description3}
          onChange={handleChange}
          placeholder="Opis 3"
        />
        <label>
          <input
            type="checkbox"
            name="bestSeller"
            checked={currentOffer.bestSeller}
            onChange={handleChange}
          />
          Bestseller
        </label>
        <div className="form-buttons">
          <button type="submit" className="offer-action-button">
            {editMode ? "Zapisz zmiany" : "Dodaj ofertę"}
          </button>
          {editMode && (
            <button
              type="button"
              className="offer-action-button cancel"
              onClick={resetForm}
            >
              Anuluj edycję
            </button>
          )}
        </div>
      </form>

      <div className="offers-table-container">
        <table>
          <thead>
            <tr>
              <th className="col-image">Zdjęcie</th>
              <th className="col-text">Opis</th>
              <th className="col-label">Etykieta</th>
              <th className="col-offer">Oferta</th>
              <th className="col-description">Opis 1</th>
              <th className="col-description">Opis 2</th>
              <th className="col-description">Opis 3</th>
              <th className="col-bestseller">Bestseller</th>
              <th className="col-actions">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td data-label="Zdjęcie">
                  <div className="cell-content">
                    <img
                      className="offer-management-img"
                      src={offer.src}
                      alt="Offer"
                    />
                  </div>
                </td>
                <td data-label="Opis">
                  <div className="cell-content">{offer.text}</div>
                </td>
                <td data-label="Etykieta">
                  <div className="cell-content">{offer.label}</div>
                </td>
                <td data-label="Oferta">
                  <div className="cell-content">{offer.offer}</div>
                </td>
                <td data-label="Opis 1">
                  <div className="cell-content">{offer.description1}</div>
                </td>
                <td data-label="Opis 2">
                  <div className="cell-content">{offer.description2}</div>
                </td>
                <td data-label="Opis 3">
                  <div className="cell-content">{offer.description3}</div>
                </td>
                <td data-label="Bestseller">
                  <div className="cell-content">
                    {offer.bestSeller ? "Tak" : "Nie"}
                  </div>
                </td>
                <td data-label="Akcje">
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => handleEditClick(offer)}
                    >
                      Edytuj
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteOffer(offer._id)}
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfferManagement;
