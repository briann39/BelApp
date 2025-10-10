import { createContext, useEffect, useState } from "react";

export const clientsContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      value: "Caja",
      label: "Caja",
      product: "Caja",
      price: 180,
      color: "green",
    },
    {
      id: 2,
      value: "Tapper",
      label: "Tapper",
      product: "tapper",
      price: 180,
      color: "green",
    },
    {
      value: "Add",
      label: "Agregar Producto...",
    },
  ]);

  useEffect(() => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        const totalProducts = client.productsIds?.reduce((sum, id) => {
          const product = products.find((p) => p.id === id);
          return sum + (product?.price || 0);
        }, 0);

        return { ...client, amount: totalProducts };
      })
    );
  }, [products]);

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  return (
    <clientsContext.Provider
      value={{ clients, setClients, products, setProducts }}
    >
      {children}
    </clientsContext.Provider>
  );
};
