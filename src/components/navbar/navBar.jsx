import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import "./navBarStyle.css";

export const NavBar = () => {
  return (
    <div className="nav-bar-top">
      <img
        className="home-perfil-img"
        src="https://i.pinimg.com/736x/9f/2e/3f/9f2e3f8dd79fb6008e93a781ba1df009.jpg"
        alt=""
      />
      <h2>BELAPP</h2>
      <button className="button-configuration-home">
        <FontAwesomeIcon icon={faGear} />
      </button>
    </div>
  );
};
