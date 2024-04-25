import AdminComp from "../AdminComp";
import React from "react";
import OfferManagement from "../OfferManagement";
import BookingPlanner from "../BookingPlanner";

export default function Admin() {
  return (
    <>
      <BookingPlanner />
      <OfferManagement />
    </>
  );
}
