import React, { useEffect, useState } from "react";
import "./AdminComp.css";
function AdminComp() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER}/server/booking/admin/dashboard`,
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
  }, []);

  return (
    <div className="all-bookings-container">
      <h1 className="bookings-h1">Rezerwacje użytkowników</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {bookings.map((booking) => (
          <li className="bookings-li" key={booking._id}>
            <p>Data: {booking.date}</p>
            <p>Godzina: {booking.time}</p>
            {booking.userId ? (
              <>
                <p>Użytkownik: {booking.userId.username}</p>
                <p>Email: {booking.userId.email}</p>
              </>
            ) : (
              <>
                <p>
                  Rezerwujący: {booking.firstName} {booking.lastName}
                </p>
                <p>Email: {booking.email}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminComp;
