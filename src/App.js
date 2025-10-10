import logo from "./logo.svg";
import "./App.css";
import { ClientList } from "./components/clientList";
import { ClientProvider } from "./contexts/clientsContext";
import { useState } from "react";
import { HomePage } from "./components/home/home.jsx";
import { ClientsPage } from "./components/clients/clients.jsx";
import { NavBar } from "./components/navbar/navBar.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <ClientProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Routes>
        </div>
      </ClientProvider>
    </Router>
  );
}

export default App;
