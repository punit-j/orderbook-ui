import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ConnectWallet from "./components/main/ConnectWallet";
import { MainCard } from "./components/main/MainCard";
import { WalletContext } from "./context/WalletContext";

const App = () => {
  const { address } = useContext(WalletContext);

  return (
    <Router>
      <div className="app">
        {!address ? (
          <Switch>
            <Route exact path="/" component={ConnectWallet} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={MainCard} />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
