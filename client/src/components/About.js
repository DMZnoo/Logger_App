import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft, slideInRight, flipInX, fadeInUp } from "react-animations";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { BrowserView, MobileView } from "react-device-detect";
import TutorialConfig from "./data/TutorialData.json";
import AddLogGif from "../../src/img/add_log.gif";
import AddWorkoutGif from "../../src/img/add_workout.gif";
import EditLogGif from "../../src/img/edit_log.gif";
import EditWorkout from "../../src/img/edit_workout.gif";
import SignInImg from "../../src/img/sign_in.png";
import SignOutImg from "../../src/img/sign_out.png";
import SignUpImg from "../../src/img/sign_up.png";
import Card from "react-bootstrap/Card";
import { fade } from "@material-ui/core";

const About = () => {
  const [isHover, SetHover] = useState([]);
  const [isClicked, SetClicked] = useState([]);
  const [isDesc, SetDesc] = useState([]);
  const [isConfig, SetConfig] = useState(TutorialConfig);
  const [isAnimate, SetAnimate] = useState([]);
  const [isTutorialList, SetTutorialList] = useState([
    [{ 0: "Sign Up" }, [{ 1: SignUpImg }]],
    [
      { 1: "Create Logs" },
      [
        { 0: SignInImg },
        { 1: SignOutImg },
        { 3: AddLogGif },
        { 4: EditLogGif },
      ],
    ],
    [{ 2: "Create Exercise" }, [{ 3: AddWorkoutGif }, { 5: EditWorkout }]],
  ]);

  const SlideInLeft = styled.div`
    animation: 2s ${keyframes`${slideInLeft}`} infinite;
  `;
  const FlipInOnce = styled.div`
    animation: 1s ${keyframes`${flipInX}`} 1;
  `;
  const FadeInUp = styled.div`
    animation: 1s ${keyframes`${fadeInUp}`} 1;
  `;
  const SlideInRight = styled.div`
    animation: 2s ${keyframes`${slideInRight}`} infinite;
  `;
  useEffect(() => {
    isTutorialList.map((li, idx) => {
      SetHover((isHover) => [...isHover, false]);
      SetClicked((isClicked) => [...isClicked, false]);
      SetDesc((isDesc) => [...isDesc, isConfig[idx]]);
      SetAnimate((isAnimate) => [...isAnimate, <></>]);
    });
  }, []);

  const onMouseHover = (e, li) => {
    e.preventDefault();
    SetHover((isHover) => [
      ...isHover.slice(0, li),
      !isHover[li],
      ...isHover.slice(li + 1),
    ]);
  };

  const onMouseClick = (e, li) => {
    e.preventDefault();
    isClicked.map((el, idx) => {
      if (idx === li) {
        SetAnimate((isAnimate) => [
          ...isAnimate.slice(0, li),
          <div>
            <FlipInOnce>
              <div className={"d-flex justify-content-center"} id={"slide-in"}>
                <p>Summary: {isDesc[li].summary}</p>
              </div>
            </FlipInOnce>
            {isDesc[li].steps.map((el, index) => {
              return (
                <>
                  <div
                    className={"d-flex justify-content-center"}
                    id={"slide-in"}
                  >
                    <FlipInOnce>
                      <p>
                        {index + 1}: {el}
                      </p>
                    </FlipInOnce>
                  </div>

                  <>
                    {isTutorialList[li][1]
                      .filter(function (el, idx) {
                        if (Number(Object.keys(el)[0]) === index)
                          return Object.values(el);
                      })
                      .map((card) => {
                        console.log(card);
                        return (
                          <FadeInUp>
                            <Card
                              className="ex-type text-white justify-content-center"
                              style={{ borderRadius: "0.5vw" }}
                            >
                              <Card.Img
                                src={Object.values(card)}
                                variant="top"
                                style={{ borderRadius: "0.5vw" }}
                              />
                            </Card>
                          </FadeInUp>
                        );
                      })}
                  </>
                </>
              );
            })}
          </div>,
          ...isAnimate.slice(li + 1),
        ]);

        SetClicked((isClicked) => [
          ...isClicked.slice(0, li),
          true,
          ...isClicked.slice(li + 1),
        ]);
      } else {
        SetClicked((isClicked) => [
          ...isClicked.slice(0, idx),
          false,
          ...isClicked.slice(idx + 1),
        ]);
      }
    });
  };

  return (
    <div>
      <div
        className={"about-background-div"}
        style={{
          color: "white",
          backgroundSize: "cover",
          background: `url(https://media.giphy.com/media/l4KihuqeuJEi9qLSM/giphy.gif)`,
          borderRadius: "2vw",
        }}
      >
        <div className={"d-flex justify-content-center"}>
          <h1>
            <SlideInLeft style={{ display: "inline-block" }}>
              <BsFillCaretRightFill
                style={{ textAlign: "left", fontSize: "1em" }}
              />
            </SlideInLeft>
            About
            <SlideInRight style={{ display: "inline-block" }}>
              <BsFillCaretLeftFill
                style={{ textAlign: "right", fontSize: "1em" }}
              />
            </SlideInRight>
          </h1>
        </div>
        <h2 className={"p-2"}>Hi, Welcome!</h2>
        <h4 className={"p-2"}>
          Here, I'll walk you through how to use the website.
        </h4>
        <p
          className={"p-2"}
          style={{ fontSize: "2vh", color: "rgba(9, 15, 43 ,1)" }}
        >
          First off, a little bit about myself. I am a{" "}
          <span style={{ color: "purple" }}>developer</span> currently living in
          New Zealand and had personally built this website for the needs of
          myself and my friends.
          <br /> You are welcome to join the site, but remember that this
          website is still in a development process and may not be stable at
          times. You are welcome to submit your enquiries at the form placed at
          the bottom of my{" "}
          <a
            href="https://danieljnwlee.com"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "rgb(224,199,60)" }}
          >
            {" "}
            website
          </a>
          .
          <br /> Besides, Enjoy~
        </p>
      </div>
      <div
        style={{
          color: "white",
          backgroundSize: "cover",
          background: `url(https://media.giphy.com/media/l4KihuqeuJEi9qLSM/giphy.gif)`,
          borderRadius: "2vw",
        }}
      >
        <div className={"d-flex justify-content-center"}>
          <h4>Tutorial</h4>
          <ul style={{ listStyle: "none" }}>
            {isTutorialList.map((el, li) => {
              return (
                <>
                  <BrowserView>
                    <li
                      onMouseEnter={(e) => onMouseHover(e, li)}
                      onClick={(e) => onMouseClick(e, li)}
                      onMouseLeave={(e) => onMouseHover(e, li)}
                    >
                      <>{el[0][li]}</>
                      {isHover[li] && (
                        <>
                          <SlideInRight style={{ display: "inline-block" }}>
                            <BsFillCaretLeftFill
                              style={{ textAlign: "right", fontSize: "1em" }}
                            />
                          </SlideInRight>
                        </>
                      )}
                    </li>
                  </BrowserView>
                  <MobileView>
                    <li onClick={(e) => onMouseClick(e, li)}>
                      <>{el[0][li]}</>
                      {isClicked[li] && (
                        <>
                          <SlideInRight style={{ display: "inline-block" }}>
                            <BsFillCaretLeftFill
                              style={{ textAlign: "right", fontSize: "1em" }}
                            />
                          </SlideInRight>
                        </>
                      )}
                    </li>
                  </MobileView>
                </>
              );
            })}
          </ul>
        </div>
        <div
          className={"d-flex justify-content-center clicked"}
          id={"container"}
        >
          {isClicked.map((el, li) => {
            if (el) {
              return isAnimate[li];
            }
            return <></>;
          })}
        </div>
      </div>
    </div>
  );
};
export default About;
