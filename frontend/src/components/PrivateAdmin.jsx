import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateAdmin() {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user is logged in and is an admin
  return currentUser && currentUser.isAdmin ? (
    <Outlet /> // Render the child routes if the user is an admin
  ) : (
    <Navigate to="/sign-in" /> // Redirect to sign-in page otherwise
  );
}
