import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import HomeBackground from "../img/rogue.jpg";
const Home = () => {
  return (
    <Jumbotron
      style={{
        background: `url(${HomeBackground}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <h1>Just Focus on your training</h1>
      <h1>Log your workouts online</h1>
      <p>
        <LinkContainer to="/about">
          <Button variant="primary">Learn more</Button>
        </LinkContainer>
      </p>
    </Jumbotron>
  );
};
export default Home;
