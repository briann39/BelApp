import React from "react";
import clientsIcono from "../../assets/iconsButtons/clientes-icon-button.svg";
import productsIcono from "../../assets/iconsButtons/products-icon-button.svg";
import campaignIcono from "../../assets/iconsButtons/campaign-icon-button.svg";
import configurationIcono from "../../assets/iconsButtons/configuration-icon-button.svg";

import "./homeStyle.css";

export const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="nav-bar-top">
        <img
          className="home-perfil-img"
          src="https://i.pinimg.com/736x/9f/2e/3f/9f2e3f8dd79fb6008e93a781ba1df009.jpg"
          alt=""
        />
      </div>
      <div className="home-buttons-container">
        <button className="button-home btn-clients">
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
