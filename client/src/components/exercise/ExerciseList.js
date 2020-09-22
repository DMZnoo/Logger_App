import React from "react";
import Card from "react-bootstrap/Card";
import CardioImg from "../../img/cardio.jpg";
import WeightLIftingImg from "../../img/weightlifting.jpg";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
const ExerciseList = () => {
  return (
    <div className="container">
      <div className="row justify-content-around" id="ex-types">
        <Card
          className="ex-type text-white col-sm-4"
          style={{ borderRadius: "2vw" }}
        >
          <Card.Img
            className="col mt-4"
            src={CardioImg}
            variant="top"
            style={{ borderRadius: "2vw" }}
          />
          <Card.Body>
            <Card.Title>Cardio</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <LinkContainer to="exlist/cardio/1/">
              <Button variant="outline-info">Read More</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
        {/* <hr/> */}

        <Card
          className="ex-type text-white col-sm-4"
          style={{ borderRadius: "2vw" }}
        >
          <Card.Img
            className="col mt-4"
            src={WeightLIftingImg}
            variant="top"
            style={{ borderRadius: "2vw" }}
          />
          <Card.Body>
            <Card.Title>Weight Lifting</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <LinkContainer to="exlist/weight_lifting/1">
              <Button variant="outline-info">Read More</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default ExerciseList;
