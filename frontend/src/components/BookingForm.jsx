import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingForm.css";

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    offer: location.state?.selectedOffer || "",
    firstName: "",
    lastName: "",
    amountPeople: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const timeSlots = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];
  const offerSlots = ["Spacer", "Zdjęcie", "Malowanie", "Wycieczka"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.className]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/booking/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log("error dziwny");
        return;
      }
      navigate("/");
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Zarezerwuj</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <select
          className="offer"
          value={formData.offer}
          onChange={handleChange}
        >
          <option value="" disabled>
            Wybierz usługę
          </option>
          {offerSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Imię"
          className="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          className="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Liczba osób"
          className="amountPeople"
          value={formData.amountPeople}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Telefon"
          className="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          className="date"
          value={formData.date}
          onChange={handleChange}
        />
        <select className="time" value={formData.time} onChange={handleChange}>
          <option value="" disabled selected>
            Wybierz godzinę
          </option>
          {timeSlots.map((slot, index) => (
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
    </div>
  );
}

export default BookingForm;