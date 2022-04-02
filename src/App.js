import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEntry from "./components/add";
import Entry from "./components/entry-component";
import EntrysList from "./components/list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Entrys"} className="navbar-brand">
            CA1 APP
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Entrys"} className="nav-link">
                Entrys
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Entrys"]} component={EntrysList} />
            <Route exact path="/add" component={AddEntry} />
            <Route path="/Entrys/:id" component={Entry} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
