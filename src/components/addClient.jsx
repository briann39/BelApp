import React, { useState, useContext } from "react";
import { clientsContext } from "../contexts/clientsContext";

export const CreateClient = () => {
  const { clients, setClients } = useContext(clientsContext);

  const [nameClient, setNameClient] = useState(null);

  const addClient = (e) => {
    e.preventDefault();
    if (nameClient.trim() !== "") {
      const client = [
        ...clients,
        { name: nameClient, amount: 0, status: "pendient", productsIds: [] },
      ];

      setClients(client);
      setNameClient("");
    }
  };

  return (
    <div>
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
  );
};
