import React, { useState } from "react";
import Cards from "./Cards";
import BookingForm from "./BookingForm";

function ParentComponent() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  return (
    <div>
      <Cards onSelectOffer={handleSelectOffer} />
      <BookingForm selectedOffer={selectedOffer} />
    </div>
  );
}

export default ParentComponent;
