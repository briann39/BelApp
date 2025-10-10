import React from "react";
import clientsIcono from "../../assets/iconsButtons/clientes-icon-button.svg";
import productsIcono from "../../assets/iconsButtons/products-icon-button.svg";
import campaignIcono from "../../assets/iconsButtons/campaign-icon-button.svg";
import configurationIcono from "../../assets/iconsButtons/configuration-icon-button.svg";
import { useNavigate } from "react-router-dom";

import "./homeStyle.css";
import { NavBar } from "../navbar/navBar";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page-container">
      <NavBar />
      <div className="home-buttons-container">
        <button
          onClick={() => navigate("/clients")}
          className="button-home btn-clients"
        >
          <img
            className="img-icon-home-button"
            src={clientsIcono}
            alt="Icon-clients"
          />
          <p>CLIENTES</p>
        </button>
        <button className="button-home btn-products">
          <img
            className="img-icon-home-button"
            src={productsIcono}
            alt="Icon-clients"
          />
          <p>PRODUCTOS</p>
        </button>
        <button className="button-home btn-campaign">
          <img
            className="img-icon-home-button"
            src={campaignIcono}
            alt="Icon-clients"
          />
          <p>CAMPAÑAS</p>
        </button>
        <button className="button-home btn-configuration">
          <img
            className="img-icon-home-button"
            src={configurationIcono}
            alt="Icon-clients"
          />
          <p>CONFIGURACION</p>
        </button>
      </div>
    </div>
  );
};
