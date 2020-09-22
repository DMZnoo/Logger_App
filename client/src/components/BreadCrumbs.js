import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const BreadCrumbs = () => {
  const location = useLocation();
  const [isPath, SetPath] = useState(location.pathname.split("/"));
  useEffect(() => {
    SetPath(location.pathname.split("/"));
  }, [location]);
  if (location.pathname === "/exlist/weight_lifting") {
    return <Redirect to={"/exlist/weight_lifting/1"} />;
  }
  if (location.pathname === "/exlist/cardio") {
    return <Redirect to={"/exlist/cardio/1"} />;
  }
  return (
    <Breadcrumb>
      {isPath.map((el, idx) => {
        if (idx === 0) {
          return (
            <LinkContainer to={`/`}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
          );
        }
        if (idx === isPath.length - 1) {
          return (
            <LinkContainer active to={`/${location.pathname}`}>
              <Breadcrumb.Item>{el}</Breadcrumb.Item>
            </LinkContainer>
          );
        }
        return (
          <LinkContainer
            to={`${location.pathname
              .split("/")
              .slice(0, idx + 1)
              .join("/")}`}
            replace
          >
            <Breadcrumb.Item>{el}</Breadcrumb.Item>
          </LinkContainer>
        );
      })}
    </Breadcrumb>
  );
};
export default BreadCrumbs;
