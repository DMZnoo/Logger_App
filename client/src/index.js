import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ContextProvider } from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <ContextProvider>
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Router>
  </ContextProvider>,
  document.getElementById("root")
);
