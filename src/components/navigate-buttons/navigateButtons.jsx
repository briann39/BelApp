import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHome } from "@fortawesome/free-solid-svg-icons";

import "./navigateButtonsStyle.css";
import { useContext } from "react";
import { pageContext } from "../../contexts/pageContext";

export const NavigateButtons = () => {
  const navigate = useNavigate();

  const { page, setPage } = useContext(pageContext);

  return (
    <div className="buttons-container">
      <button
        onClick={() => setPage("Clients")}
        className="button-navigate button-active "
      >
        <FontAwesomeIcon icon={faUsers} />
      </button>
      <button
        onClick={() => setPage("Home")}
        className="button-navigate button-active "
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
      <div className="button-navigate"></div>
      <div className="button-navigate"></div>
    </div>
  );
};
