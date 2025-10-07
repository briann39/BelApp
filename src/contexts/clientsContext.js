import { createContext, useEffect, useState } from "react";

export const clientsContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([
    { name: "Naty", amount: 500, status: "Pendient", productsIds: [1, 2] },
    { name: "Rocio", amount: 500, status: "Pendient", productsIds: [2] },
  ]);

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

  return (
    <clientsContext.Provider
      value={{ clients, setClients, products, setProducts }}
    >
      {children}
    </clientsContext.Provider>
  );
};
