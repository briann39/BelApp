import React, { useContext, useState } from "react";
import { clientsContext } from "../contexts/clientsContext";
import Select from "react-select";

import "../styles/styleList.css";

export const ClientList = () => {
  const { clients, setClients, products, setProducts } =
    useContext(clientsContext);
  const options = [
    { value: "Pendiente", label: "Pendiente", color: "yellow" },
    { value: "Pago", label: "Pago", color: "green" },
    { value: "Entregado", label: "Entregado", color: "blue" },
  ];

  const [productName, setProductName] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productId, setProductId] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [selectedClient, setSelectedClient] = useState({
    name: "",
    amount: 0,
    status: "",
    productsIds: [0, 0],
  });

  const [option, setOption] = useState(null);

  const [nameClient, setNameClient] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);

  const addClient = (e) => {
    e.preventDefault();
    if (nameClient.trim() !== "") {
      const client = [
        ...clients,
        { name: nameClient, amount: 0, status: "pendient", productsIds: [] },
      ];

      setClients(client);
      setNameClient("");
      setShowAddClient(false);
    }
  };

  const handleOption = (query) => {
    setOption(query);
    console.log("a");
  };

  const newProduct = (e) => {
    e.preventDefault();
    if (
      productName.trim() !== "" &&
      productColor !== "" &&
      productPrice !== ""
    ) {
      setProducts((prev) => [
        ...prev,
        {
          id: productId,
          value: productName,
          label: productName,
          product: productName,
          price: parseInt(productPrice),
          color: productColor,
        },
      ]);
      setShowAddProduct(false);
    }
  };

  const addProduct = (e) => {
    setClients((prev) =>
      prev.map((client) =>
        client.name === selectedClient.name
          ? {
              ...client,
              productsIds: [
                ...client.productsIds,
                products.find((product) => product.value === e.value)?.id,
              ],
            }
          : client
      )
    );
    updateAmountClients();
    console.log(clients);
  };

  const updateAmountClients = () => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        // calcular el total de productos del cliente
        const totalProducts = client.productsIds?.reduce((sum, id) => {
          const product = products.find((p) => p.id === id);
          return sum + (product?.price || 0);
        }, 0);

        // devolver el cliente actualizado
        return { ...client, amount: totalProducts };
      })
    );
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

  const setSelected = (query) => {
    setSelectedClient(query);
    setOption("info");
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="app-container">
        <form
          style={{ display: `${!showAddProduct ? "none" : ""}` }}
          className="form-add-product"
          onSubmit={(e) => newProduct(e)}
        >
          <input
            type="text"
            placeholder="Id del Producto"
            onChange={(e) => setProductId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre del Producto"
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Precio"
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Color"
            onChange={(e) => setProductColor(e.target.value)}
          />
          <button type="submit">Agregar...</button>
        </form>
        <div
          style={{ display: `${option !== "info" ? "none" : ""}` }}
          className="client-info"
        >
          <h2>Editar Cliente</h2>
          <div className="client-info-text">
            <p>Nombre: {selectedClient.name}</p>
            <p>Monto: {selectedClient.amount}</p>
            <p>Estado: {selectedClient.status}</p>
          </div>
          <div className="products-list">
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  width: "100%",
                  borderColor: "#00bfff",
                }),
              }}
              options={products}
              value={null}
              onChange={(e) => {
                {
                  if (e.value === "Add") {
                    setShowAddProduct(true);
                  } else {
                    addProduct(e);
                  }
                }
              }}
              placeholder={"Agregar Producto"}
            />
            <ul>
              {selectedClient.productsIds.map((id) => {
                return products.map((product) => {
                  return id === product.id ? (
                    <li key={product.id}>
                      <p>{product.id}</p> <p>{product.product}</p>
                      <p> {product.color}</p>
                    </li>
                  ) : null;
                });
              })}
            </ul>
          </div>
        </div>
        <ul
          style={{ display: `${option !== "list" ? "none" : ""}` }}
          className="client-list"
        >
          <button onClick={() => setShowAddClient(true)}>
            Agregar Cliente
          </button>
          {clients.map((client) => {
            return (
              <li className="client-item" onClick={() => setSelected(client)}>
                <p className="item-name">{client.name}</p>
                <div className="item-right">
                  <Select
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "10rem",
                        borderColor: "#00bfff",
                      }),
                    }}
                    options={options}
                    value={null}
                    onChange={(e) => handleChange(client, e)}
                    placeholder={`${client.status ? client.status : ""}`}
                  />
                  <p className="item-amount">$ {client.amount}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="menu-container">
        <button onClick={() => handleOption("list")}>list</button>
        <button onClick={() => handleOption("info")}>Info</button>
      </div>
      <div
        style={{ display: `${!showAddClient ? "none" : ""}` }}
        className="form-add-client"
      >
        <form onSubmit={(e) => addClient(e)}>
          <input
            type="text"
            placeholder="Nombre..."
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};
