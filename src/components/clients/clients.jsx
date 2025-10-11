import React, { useState, useContext, Component } from "react";
import Select, { components } from "react-select";
import { clientsContext } from "../../contexts/clientsContext";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"; */

import "./clientsStyle.css";
import { NavBar } from "../navbar/navBar";
import { NavigateButtons } from "../navigate-buttons/navigateButtons";
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

  const [nameClient, setNameClient] = useState("");
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
      <AnimatePresence>
        {showAddClient && (
          <>
            <motion.div
              className="form-add-client-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAddClient(false)}
            />
            <motion.div
              key="add-client"
              className="form-add-client"
              initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.95 }}
              animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
              exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2>Agregar nuevo cliente</h2>
              <button
                className="button-close-add-client"
                onClick={() => setShowAddClient(false)}
              >
                X
              </button>

              <form className="form-box" onSubmit={(e) => addClient(e)}>
                <label>Nombre del cliente:</label>
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={nameClient}
                  onChange={(e) => setNameClient(e.target.value)}
                />

                <label>Telefono:</label>
                <input
                  type="text"
                  placeholder="Número de teléfono"
                  value={phoneClient}
                  onChange={(e) => setPhoneClient(e.target.value)}
                />

                <label>Direccion:</label>
                <input
                  type="text"
                  placeholder="Dirección"
                  value={directionClient}
                  onChange={(e) => setDirectionClient(e.target.value)}
                />

                <button className="button-add" type="submit">
                  Agregar
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="header-clients">
        <h2>Clientes</h2>

        <AnimatePresence>
          <motion.button
            key={"client-button-back"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="button-addclient"
            onClick={() => setShowAddClient(true)}
          >
            Agregar Cliente
          </motion.button>
        </AnimatePresence>
      </div>
      <div className="app-body">
        <AnimatePresence>
          <motion.ul
            className="clients-list"
            key={"clients-list"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <li className="clients-data-columns">
              <p className="column-id">ID</p>
              <p>NOMBRE</p>
              <p>PRODUCTOS</p>
              <p>MONTO</p>
              <p>ESTADO</p>
            </li>
            {clients.length !== 0 ? (
              clients.map((client) => {
                return (
                  <li
                    className="client-item"
                    onClick={() => setSelected(client)}
                  >
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
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "black",
                          fontSize: "0.75rem",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#ffffff", // color del menú
                          borderRadius: "1rem",
                          width: "10rem",
                          textAlign: "left",
                          padding: "0.5rem",
                          left: "-75px",
                          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#ff99cc" // cuando está seleccionado
                            : state.isFocused
                            ? "#ffd6eb" // cuando se pasa el mouse
                            : "#fff", // por defecto
                          color: "#333",
                          padding: "10px 15px",
                          cursor: "pointer",
                          borderRadius: "1rem",
                        }),
                      }}
                      components={{
                        Control: CustomControl,
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      options={options}
                      isSearchable={false}
                      menuPlacement="auto"
                      value={null}
                      onChange={(e) => handleChange(client, e)}
                      placeholder={`${client.status ? client.status : ""}`}
                    />
                    {/*<div>
                    <button className="action-btn delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button className="action-btn edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div> */}
                  </li>
                );
              })
            ) : (
              <p classNae="not-results-text">No hay clientes </p>
            )}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
};
