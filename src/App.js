import logo from "./logo.svg";
import "./App.css";
import { ClientList } from "./components/clientList";
import { ClientProvider } from "./contexts/clientsContext";
import { CreateClient } from "./components/addClient";

function App() {
  return (
    <ClientProvider>
      <div className="App">
        <CreateClient />
        <ClientList />
      </div>
    </ClientProvider>
  );
}

export default App;
