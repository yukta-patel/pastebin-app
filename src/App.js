import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./view/Home";
import { Dashboard } from "./components";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
