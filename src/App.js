import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import firebase from "./utils/firebase";
import Login from "./components/pages/Login";
import Trips from "./components/pages/Trips";
import Wishlists from "./components/pages/Wishlists";
import ProductDetail from "./components/pages/ProductDetail";
import Backstage from "./components/pages/Backstage";
import Order from "./components/pages/Order";
import Search from "./components/pages/Search";
import BackstageLogin from "./components/pages/BackstageLogin";
import Loading from "./imge/giphy.gif";

function App() {
  const [currentUser, setCurrentUser] = useState();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/backstage" exact component={Backstage} />
        <Route path="/backstage/log-in" exact component={BackstageLogin} />
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:itemID" exact component={ProductDetail} />
        <Route path="/products/search/:inputValue" exact component={Search} />
        <Route path="/log-in" component={Login} />
        {currentUser !== null ? (
          currentUser !== undefined ? (
            <>
              <Route path="/trips" component={Trips} />
              <Route path="/wishlists" component={Wishlists} />
              <Route
                path="/products/:itemID/order/:orderID"
                exact
                component={Order}
              />
            </>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <Redirect to="/log-in" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
