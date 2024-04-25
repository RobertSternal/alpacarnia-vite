import React from "react";
import "./Location.css";

function Location() {
  return (
    <div className="location">
      <h1>Nasza lokalizacja</h1>
      <h4>Sosnowiec, ul. Stare Maczki</h4>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4289.954801161663!2d19.27887015390476!3d50.2579014734193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ddda461538c1%3A0xd5c27a3e9208bbd6!2sK%C5%82adka%20im.%20Jakuba%20Galicy%20na%20Bia%C5%82ej%20Przemszy!5e0!3m2!1spl!2spl!4v1708450351219!5m2!1spl!2spl"
        width="100%"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Location;
