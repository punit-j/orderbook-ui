import React, { useContext, useState } from "react";
import { Button, CardBody, Input, Label } from "reactstrap";
import { WalletContext } from "../../context/WalletContext";
import { formatAddress, formatBalance } from "../../utils/formats";
import { LoadingCard } from "../LoadingCard";
import { Approve } from "../buttons/Approve";
import { SubmitOrder } from "../buttons/SubmitOrder";

export const MainCard = () => {
  const { address, disconnectWallet, balance } = useContext(WalletContext);
  const [isApproved, setIsApproved] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const [toTokenInfo, setToTokenInfo] = useState({
    contractAddress: "",
    amount: 0,
  });
  const [fromTokenInfo, setFromTokenInfo] = useState({
    contractAddress: "",
    amount: 0,
  });

  const updateToTokenInfo = (field, value) => {
    setToTokenInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateFromTokenInfo = (field, value) => {
    setFromTokenInfo((prev) => ({ ...prev, [field]: value }));
  };

  const isButtonDisabled = () => {
    return (
      !toTokenInfo.contractAddress ||
      !toTokenInfo.amount ||
      !fromTokenInfo.contractAddress ||
      !fromTokenInfo.amount ||
      balance == 0.0
    );
  };
  return (
    <div>
      <div
        className="Card"
        style={{
          left: "10px",
          width: "250px",
          color: "#6d5ee7",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          {address !== null && `Connected to: ${formatAddress(address)}`}
        </div>
        <div>Balance: {balance && formatBalance(balance)} ETH</div>
      </div>
      <div className="Card" style={{ width: "400px", margin: "auto" }}>
        <CardBody>
          <Label className="label">From Token:</Label>
          <Input
            placeholder="Enter Contract Address"
            style={{ marginBottom: "20px" }}
            onChange={(e) =>
              updateFromTokenInfo("contractAddress", e.target.value)
            }
          />
          <Input
            placeholder="Enter Amount"
            style={{ marginBottom: "20px" }}
            onChange={(e) => updateFromTokenInfo("amount", e.target.value)}
          />
          <Label className="label">To Token:</Label>
          <Input
            placeholder="Enter Contract Address"
            style={{ marginBottom: "20px" }}
            onChange={(e) =>
              updateToTokenInfo("contractAddress", e.target.value)
            }
          />
          <Input
            placeholder="Enter Amount"
            style={{ marginBottom: "20px" }}
            onChange={(e) => updateToTokenInfo("amount", e.target.value)}
          />
          {!isApproved ? (
            <div className="mainButton">
              <Approve
                isButtonDisabled={isButtonDisabled}
                setInProgress={setInProgress}
                setIsApproved={setIsApproved}
                fromTokenInfo={fromTokenInfo}
              />
              <Button
                className="btn"
                style={{ borderRadius: "25px", marginTop: "30px" }}
                onClick={() => {
                  setIsApproved(!isApproved);
                }}
              >
                Skip Approval
              </Button>
            </div>
          ) : (
            <SubmitOrder
              isButtonDisabled={isButtonDisabled}
              setFromTokenInfo={setFromTokenInfo}
              setInProgress={setInProgress}
              setToTokenInfo={setToTokenInfo}
              fromTokenInfo={fromTokenInfo}
              toTokenInfo={toTokenInfo}
            />
          )}
        </CardBody>
      </div>
      <div
        style={{
          width: "170px",
          top: "600px",
          right: "20px",
          position: "absolute",
        }}
      >
        <Button
          style={{ borderRadius: "25px" }}
          className="btn"
          onClick={disconnectWallet}
          size="md"
          color="danger"
          block
        >
          Disconnect
        </Button>
      </div>
      <LoadingCard inprogress={inProgress} />
    </div>
  );
};