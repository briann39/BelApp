import React, { useState, useContext, Component } from "react";
import Select, { components } from "react-select";
import { clientsContext } from "../../contexts/clientsContext";

import { useNavigate } from "react-router-dom";

import "./clientsStyle.css";
import { NavBar } from "../navbar/navBar";
export const ClientsPage = () => {
  const navigate = useNavigate();

  const { clients, setClients, products, setProducts } =
    useContext(clientsContext);
  const options = [
    { value: "pend", label: "Pendiente", color: "yellow" },
    { value: "pag", label: "Pago", color: "green" },
    { value: "ent", label: "Entregado", color: "blue" },
  ];
  const [option, setOption] = useState(null);

  const [nameClient, setNameClient] = useState(null);
  const [phoneClient, setPhoneClient] = useState(null);
  const [directionClient, setDirectionClient] = useState(null);

  const [selectedClient, setSelectedClient] = useState({
    name: "",
    amount: 0,
    status: "",
    productsIds: [0, 0],
  });
  const [showAddClient, setShowAddClient] = useState(false);

  const setSelected = (query) => {
    setSelectedClient(query);
    setOption("info");
  };

  const handleChange = (query, selectedOption) => {
    setClients((prev) =>
      prev.map(
        (client) =>
          client.name === query.name
            ? { ...client, status: selectedOption.value } // actualiza solo el cliente que coincide
            : client // deja los demás igual
      )
    );
    console.log(clients);
  };

  const CustomControl = (props) => {
    const { selectProps } = props;
    const status = selectProps.placeholder;
    return (
      <components.Control {...props}>
        <div className={`select-client-status ${status}`}>
          <div className="select-client-status-icon"></div>
          {props.children}
        </div>
      </components.Control>
    );
  };

  const addClient = (e) => {
    e.preventDefault();
    if (nameClient.trim() !== "") {
      const client = [
        ...clients,
        {
          id: clients.length + 1,
          name: nameClient,
          phone: phoneClient,
          direction: directionClient,
          amount: 0,
          status: "pend",
          productsIds: [],
        },
      ];

      setClients(client);
      setNameClient("");
      setShowAddClient(false);
    }
  };

  return (
    <div className="clients-page">
      <div
        style={{ display: `${!showAddClient ? "none" : ""}` }}
        className="form-add-client"
      >
        <h2>Agregar nuevo cliente</h2>
        <form className="form-box" onSubmit={(e) => addClient(e)}>
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Numero de telefono"
            value={phoneClient}
            onChange={(e) => setPhoneClient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Direccion"
            value={directionClient}
            onChange={(e) => setDirectionClient(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
      <NavBar />
      <div className="header-clients">
        <h2>Clientes</h2>
        <button
          className="button-addclient"
          onClick={() => setShowAddClient(true)}
        >
          Agregar Cliente
        </button>
      </div>
      <div className="app-body">
        <ul className="clients-list">
          <li className="clients-data-columns">
            <p className="column-id">ID</p>
            <p>NOMBRE</p>
            <p>PRODUCTOS</p>
            <p>MONTO</p>
            <p>ESTADO</p>
          </li>

          {clients.map((client) => {
            return (
              <li className="client-item" onClick={() => setSelected(client)}>
                <p className="column-id">{client.id}</p>
                <p>{client.name}</p>
                <p>{client.productsIds.length}</p>

                <p>$ {client.amount}</p>
                <Select
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "transparent", // ❌ elimina el fondo gris/blanco
                      border: "none", // ❌ elimina el borde
                      boxShadow: "none", // ❌ elimina el efecto de foco
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "black",
                    }),
                  }}
                  components={{
                    Control: CustomControl,
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  options={options}
                  isSearchable={false}
                  value={null}
                  onChange={(e) => handleChange(client, e)}
                  placeholder={`${client.status ? client.status : ""}`}
                />
              </li>
            );
          })}
        </ul>
        <div className="client-button-back-container">
          <button className="client-button-back" onClick={() => navigate("/")}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
