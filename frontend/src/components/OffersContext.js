import React, { createContext, useState, useContext, useCallback } from "react";

const OffersContext = createContext();

export const useOffers = () => useContext(OffersContext);

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const fetchOffers = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/server/offer/public`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }
      const data = await response.json();
      console.log("Fetched offers:", data);
      setOffers(data); // Update context with fetched offers
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }, []);

  return (
    <OffersContext.Provider value={{ offers, fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};
