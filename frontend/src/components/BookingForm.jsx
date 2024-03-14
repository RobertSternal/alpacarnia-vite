import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingForm.css";
import { useOffers } from "./OffersContext";

function BookingForm() {
  const { offers } = useOffers();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    offer: location.state?.selectedOffer?.text || "",
    firstName: "",
    lastName: "",
    amountPeople: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    /*setFormData({
      ...formData,
      [e.target.className]: e.target.value,
    });
    */
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData,
      [name]: value, //name attribute to update the corresponding key in state
    });
  };

  const fetchAvailableSlots = async (selectedDate) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/booking/available-slots/${selectedDate}`
      );
      const data = await res.json();
      console.log("Fetched slots:", data.availableSlots);
      setAvailableTimeSlots(data.availableSlots);
    } catch (error) {
      console.error("Error fetching available data: ", error);
      setError("Error fetching available slots");
    }
  };

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/booking/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        console.log("error niepoprawne dane");
        return;
      }
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error podczas przesyłania: ", error);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Zarezerwuj</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <select
          name="offer" // using name
          value={formData.offer}
          onChange={handleChange}
        >
          <option value="" disabled>
            Wybierz usługę
          </option>
          {offers.map((offer, index) => (
            <option key={index} value={offer.offer}>
              {offer.offer}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Imię"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Liczba osób"
          name="amountPeople"
          value={formData.amountPeople}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Telefon"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <select name="time" value={formData.time} onChange={handleChange}>
          <option value="" disabled selected>
            Wybierz godzinę
          </option>
          {availableTimeSlots &&
            availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
        </select>
        <button className="booking-button">
          Zarezerwuj
          <span className="button-span">
            <HiOutlineArrowNarrowRight />
          </span>
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default BookingForm;
