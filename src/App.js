import logo from "./logo.svg";
import "./App.css";
import { ClientList } from "./components/clientList";
import { ClientProvider } from "./contexts/clientsContext";
import { useState } from "react";
import { HomePage } from "./components/home/home.jsx";

function App() {
  return (
    <ClientProvider>
      <div className="App">
        <HomePage />
      </div>
    </ClientProvider>
  );
}

export default App;
