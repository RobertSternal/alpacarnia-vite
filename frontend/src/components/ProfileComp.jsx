import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProfileComp.css";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function ProfileComp() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [bookings, setBookings] = useState([]);
  //console.log(formData);

  //firebase storage rules
  /*
  allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches("image/.*")
    */
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (currentUser) {
        // Only fetch bookings if there's a logged-in user
        try {
          console.log('Fetching bookings for user:', currentUser._id);
          console.log('Server URL:', process.env.REACT_APP_SERVER);
          const response = await fetch(
            `${process.env.REACT_APP_SERVER}/server/booking/user/${currentUser._id}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log('Response status:', response.status);
          if (!response.ok) {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`Failed to fetch bookings: ${errorData}`);
          }
          const data = await response.json();
          console.log('Fetched bookings:', data);
          setBookings(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    fetchUserBookings();
  }, [currentUser]); // Rerun when currentUser changes

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("Wgrano już " + progress + " % pliku");
        setFilePer(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, pfpicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(
    `${process.env.REACT_APP_SERVER}/server/user/update/${currentUser._id}`
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/user/update/${currentUser._id}`,
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
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      //`${process.env.REACT_APP_SERVER}/server/auth/signin`
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/auth/signout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      console.log("Sign out error:", error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="profile-container">
      <h1 className="profile-title">Profil</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.pfpicture || currentUser.pfpicture}
          alt="profil"
          className="profile-img"
        />
        <p>
          {uploadError ? (
            <span>Wystąpił error w trakcie dodawania obrazka</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span>{`Ładowanie ${filePer}`}</span>
          ) : filePer === 100 ? (
            <span>Obrazek dodany pomyślnie</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="nazwa użytkownika"
          defaultValue={currentUser.username}
          className="username"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="hasło"
          className="password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="update-button">
          {loading ? "Ładowanie..." : "Zaktualizuj dane"}
        </button>
      </form>
      <div className="red-buttons">
        <span onClick={handleDelete} className="delete">
          Usuń konto
        </span>
        <span onClick={handleSignOut} className="logout">
          Wyloguj się
        </span>
      </div>
      <p className="profile-message-error">{error ? error : ""}</p>
      <p className="profile-message-success">
        {updateSuccess ? "Użytkownik został zaktualizowany" : ""}
      </p>

      <div className="bookings-container">
        <h2 className="bookings-h2">Twoje rezerwacje</h2>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="profile-booking">
              <p>Data: {booking.date}</p>
              <p>Godzina: {booking.time}</p>
              {/* Display other booking details as needed */}
            </div>
          ))
        ) : (
          <p>Nie dokonałeś jeszcze rezerwacji</p>
        )}
      </div>
    </div>
  );
}
