import React, { useContext } from "react";
import { Button } from "reactstrap";
import { WalletContext } from "../../context/WalletContext";

const ConnectWallet = () => {
  const { connectWallet } = useContext(WalletContext);

  return (
    <div
      className="Card"
      style={{ width: "400px", margin: "auto", borderRadius: "45px" }}
    >
      <Button
        className="btn"
        style={{ borderRadius: "25px" }}
        onClick={connectWallet}
        size="md"
        color="primary"
        block
      >
        Connect Wallet
      </Button>
    </div>
  );
};

export default ConnectWallet;
