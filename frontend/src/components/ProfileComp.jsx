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
  console.log(formData);
  //console.log(filePer);
  //console.log(file);

  //firebase storage rules
  /*
  allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches("image/.*")
    */
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
      updateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div>
      <h1>Profile</h1>
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
        <button disabled={loading}>
          {loading ? "Ładowanie..." : "Zaktualizuj dane"}
        </button>
      </form>
      <div className="red-buttons">
        <span className="delete">Usuń konto</span>
        <span className="logout">Wyloguj się</span>
      </div>
      <p className="profile-message-error">{error ? error : ""}</p>
      <p className="profile-message-success">
        {updateSuccess ? "Użytkownik został zaktualizowany" : ""}
      </p>
    </div>
  );
}
