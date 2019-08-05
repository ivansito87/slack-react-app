import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// import Register from './components/Register/Register.jsx';
// import Main from "./components/Main/Main";
// import "./App.css";
import Login from "./views/examples/Login"
/*import "./assets/styles/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard-react.css";
import "./assets//font-awesome/css/font-awesome.css";*/
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
// import MultplayerMain2 from "./components/socketIOClient/Multiplayer-Main2";
// import MainSocket from "./components/Main/MainSocket";

/*
function ProtectedRoute({component: Component, ...outerProps}) {
  return <Route {...outerProps} render={props => {
    let usrId = localStorage.getItem('id');
    if (!usrId) {
      return <Redirect to={`/login?referrer=${outerProps.location.pathname}`}/>;
    } else {
      return <Component {...props} />;
    }
  }}/>
}
*/

export default function APP() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          {/*<Route exact path="/register" component={Register}/>
          <ProtectedRoute exact path="/singleplayer" component={Main}/>
          <ProtectedRoute exact path="/multiplayer/:roomId?" component={MultplayerMain2}/>
          <ProtectedRoute path="/rooms/:id" component={MainSocket}/>
          <Route exact path="*" component={Login}/>*/}
        </Switch>
      </Router>
    </React.Fragment>
  );
}
