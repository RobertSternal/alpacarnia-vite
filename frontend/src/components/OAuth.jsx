import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const authProvider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, authProvider);
      console.log(result);
      console.log(process.env.REACT_APP_FIREBASE_API);

      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/server/auth/oauth`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
      console.log("POLACY NIC SIE NIE STAAAAŁOOOO");
    } catch (error) {
      console.log("Nie można zalogować się na konto Google", error);
    }
  };
  return (
    <button onClick={handleClick} type="button">
      Continue with Google
    </button>
  );
}
