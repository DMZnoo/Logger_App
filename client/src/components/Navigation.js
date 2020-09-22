import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";

const Navigation = ({ persistor }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isExpanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        expanded={isExpanded}
        style={{ borderRadius: "0.5vw" }}
      >
        <LinkContainer to="/">
          <Navbar.Brand className="mt-2" onClick={() => setExpanded(false)}>
            Exercise Tracker
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="mt-2"
          onClick={() => setExpanded(isExpanded ? false : "expanded")}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/exlist" className="mt-2">
              <Nav.Link onClick={() => setExpanded(false)}>
                List of Exercises
              </Nav.Link>
            </LinkContainer>
            {isAuthenticated && (
              <LinkContainer to="/logs" className="mt-2">
                <Nav.Link onClick={() => setExpanded(false)}>Logs</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/about" className="mt-2">
              <Nav.Link onClick={() => setExpanded(false)}>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="mt-2">
            {isAuthenticated ? (
              <LinkContainer to="/profile" className="mt-2">
                <Nav.Link onClick={() => setExpanded(false)}>
                  My Account
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link
                onClick={() =>
                  loginWithRedirect({
                    screen_hint: "signup",
                  })
                }
              >
                No Account?
              </Nav.Link>
            )}{" "}
            {isAuthenticated ? (
              <Button
                variant="danger"
                onClick={() => {
                  persistor.purge();
                  logout({
                    returnTo: window.location.origin,
                  });
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline-success"
                onClick={() => {
                  loginWithRedirect().then(() => {
                    dispatch(signIn(user.sub));
                  });
                }}
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Navigation;
