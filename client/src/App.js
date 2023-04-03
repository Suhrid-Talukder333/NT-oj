import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProblemSet from "./components/problemset/ProblemSet";
import Problem from "./components/problem/Problem";
import AddProblem from "./components/problem/addproblem/AddProblem";
import NavBar from "./components/navbar/NavBar";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import UserSubmission from "./components/userSubmission/UserSubmission";
import Dashboard from "./components/dashboard/Dashboard";
import NoContent from "./components/userSubmission/noContent/NoContent";
import Rankings from "./components/Rankings/Rankings";

import "./App.css";
import { useTheme } from "@material-ui/core";

const App = () => {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : 'white' , height: "100%" }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/problemset" component={ProblemSet} />
          <Route exact path="/rankings" component={Rankings} />
          <Route exact path="/problem/:id" component={Problem} />
          <Route exact path="/addproblem" component={AddProblem} />
          <Route exact path="/usersubmission" component={UserSubmission} />
          <Route exact path="/nocontent" component={NoContent} />
          <Route exact path="/dashboard/:id" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect from="/" exact to="/problemset" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
