import React, { useEffect, useState } from "react";
import "./BookingPlanner.css";
import { useSelector } from "react-redux";

function ReservationSystem() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: currentUser?.username || "",
    lastName: "",
    amountPeople: 1,
    email: currentUser?.email || "",
    phone: "",
    date: "",
    time: ""
  });

  const startOfWeek = (date) => {
    const diff =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );

  const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/server/booking/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Something went wrong!');
        return;
      }

      setFormData({
        firstName: currentUser?.username || "",
        lastName: "",
        amountPeople: 1,
        email: currentUser?.email || "",
        phone: "",
        date: "",
        time: ""
      });
      setError(null);
      alert('Booking successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const startDate = getFormattedDate(currentWeekStart);
        const endDate = getFormattedDate(
          new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
        );

        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/server/booking/admin/dashboard?startDate=${startDate}&endDate=${endDate}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookings();
  }, [currentWeekStart]);

  const previousWeek = () => {
    setCurrentWeekStart(
      new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7))
    );
  };

  const nextWeek = () => {
    setCurrentWeekStart(
      new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7))
    );
  };

  const getDayOfWeekIndex = (dateString) => {
    const date = new Date(dateString);
    return date.getDay();
  };

  const weekDays = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const weekDates = weekDays.map((_, index) => {
    const day = new Date(currentWeekStart);
    day.setDate(day.getDate() + index);
    return getFormattedDate(day);
  });

  const bookingsByDay = weekDates.map((date) => {
    return bookings.filter(
      (booking) => getFormattedDate(new Date(booking.date)) === date
    );
  });

  useEffect(() => {
    const checkAvailability = async () => {
      if (formData.date) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_SERVER}/server/booking/available-slots/${formData.date}`,
            {
              credentials: 'include'
            }
          );
          const data = await res.json();
          setAvailableSlots(data.availableSlots || []);
        } catch (err) {
          console.error('Error checking availability:', err);
        }
      }
    };

    checkAvailability();
  }, [formData.date]);

  return (
    <div className="reservation-system">
      <h1 className="booking-planner-title">Dokonane rezerwacje</h1>
      <div className="week-navigation">
        <button onClick={previousWeek}>Poprzedni tydzień</button>
        <button onClick={nextWeek}>Następny tydzień</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="week-grid">
        {weekDays.map((day, index) => {
          const date = weekDates[index];
          const isToday = date === getFormattedDate(new Date());
          return (
            <div key={day} className={`day-column ${isToday ? 'today' : ''}`}>
              <div className="day-header">
                <div className="day-name">{day}</div>
                <div className="day-date">{date}</div>
              </div>
              <div className="bookings-container">
                {bookingsByDay[index].map((booking) => (
                  <div key={booking._id} className="booking-entry">
                    <div className="booking-time">{booking.time}</div>
                    <div className="booking-name">
                      {booking.firstName} {booking.lastName}
                    </div>
                    <div className="booking-email">{booking.email}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="reservation-container">
        <h2>Make a Reservation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="amountPeople"
            placeholder="Number of People"
            value={formData.amountPeople}
            onChange={handleInputChange}
            min="1"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <select
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Time</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          
          <button type="submit">Make Reservation</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationSystem;
