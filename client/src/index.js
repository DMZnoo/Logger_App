import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConnectedRouter as Router } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import configureStore, { history } from "./store";
import { Provider } from "react-redux";

const { store, persistor } = configureStore();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
        >
          <App persistor={persistor} />
        </Auth0Provider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
