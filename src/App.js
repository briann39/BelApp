import logo from "./logo.svg";
import "./App.css";
import { ClientProvider } from "./contexts/clientsContext";
import { useContext, useEffect } from "react";
import { HomePage } from "./components/home/home.jsx";
import { ClientsPage } from "./components/clients/clients.jsx";
import { NavBar } from "./components/navbar/navBar.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavigateButtons } from "./components/navigate-buttons/navigateButtons.jsx";
import { pageContext, PageProvider } from "./contexts/pageContext.js";
function App() {
  const { page, setPage } = useContext(pageContext);

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <Router>
      <ClientProvider>
        <div className="App">
          <NavBar />
          <div className="app-body-container">
            {page === "Clients" ? <ClientsPage /> : <div></div>}
            {page === "Home" ? <HomePage /> : <div></div>}
          </div>
          <NavigateButtons />
        </div>
      </ClientProvider>
    </Router>
  );
}

export default App;
