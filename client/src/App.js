import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Footer from "./components/Footer";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./css/app.css";

const App = () => {
  return (
    <React.Fragment>
      <div id="main-content">
        <BrowserRouter>
          <Route component={NavBar}/>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={Main} />
            <ProtectedRoute path="/create" component={CreateForm} />
            <ProtectedRoute path="/edit" component={EditForm} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const NoMatch = props => {
  let location = useLocation();

  return <div>404 - Path to {location.pathname} Not Found</div>;
};

export default App;
