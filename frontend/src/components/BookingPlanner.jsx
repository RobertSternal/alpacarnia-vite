import React, { useEffect, useState } from "react";
import "./BookingPlanner.css";

function ReservationSystem() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

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
    </div>
  );
}

export default ReservationSystem;
