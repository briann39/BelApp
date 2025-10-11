import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./homeStyle.css";
import { NavBar } from "../navbar/navBar";
import { clientsContext } from "../../contexts/clientsContext";

import { NavigateButtons } from "../navigate-buttons/navigateButtons";

export const HomePage = () => {
  const [amountTotal, setAmountTotal] = useState(0);
  const { clients, setClients, products, setProducts } =
    useContext(clientsContext);

  useEffect(() => {
    const total = clients.reduce((acumulador, client) => {
      return acumulador + client.amount; // sumamos el amount de cada cliente
    }, 0);

    setAmountTotal(total);
  }, [clients]);

  const navigate = useNavigate();
  return (
    <div className="home-page-container">
      <div className="top-contain">
        <div className="stats-container">
          <div className="stats-item">
            <label htmlFor="">Ganancias:</label>
            <p>$900</p>
          </div>
          <div className="stats-item">
            <label htmlFor="">A Pagar:</label>
            <p>$99000</p>
          </div>
        </div>
        <div className="amount-total-container">
          <label>Total ventas:</label>
          <h3>${amountTotal}</h3>
        </div>
      </div>
    </div>
  );
};
