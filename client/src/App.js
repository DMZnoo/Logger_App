import React, { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ExerciseList from "./components/exercise/ExerciseList";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ExerciseResults from "./components/exercise/ExerciseResults";
import ViewLogList from "./components/log/ViewLogList";
import Loading from "./components/Loading";
import Profile from "./components/user/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateRoute from "./components/user/PrivateRoute";
import CardioResults from "./components/exercise/CardioResults";
import About from "./components/About";
import Breadcrumbs from "./components/BreadCrumbs";
import ViewLogDescription from "./components/log/ViewLogDescription";
const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div id="page-container">
        <div id="content-wrap">
          <Navigation />
          <br />
          <Route>
            <Breadcrumbs />
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/exlist" component={ExerciseList} />
          <Route path="/exlist/cardio" component={CardioResults} />
          <Route path="/exlist/weight_lifting" component={ExerciseResults} />
          <PrivateRoute exact path={"/logs"} component={ViewLogList} />
          <PrivateRoute
            exact
            path={"/logs/description"}
            component={ViewLogDescription}
          />
          <PrivateRoute path="/profile" component={Profile} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
