import React, { useContext } from "react";
import { Button } from "reactstrap";
import { convertToMinimalDenom } from "../../utils/etherUtils";
import { WalletContext } from "../../context/WalletContext";
import { USDT, USDC, SUBMIT_URL } from "../../utils/constants";
import axios from "axios";

export const SubmitOrder = ({
  setInProgress,
  setFromTokenInfo,
  isButtonDisabled,
  setToTokenInfo,
  toTokenInfo,
  fromTokenInfo,
}) => {
  const { address } = useContext(WalletContext);

  const handleSubmitOrder = async () => {
    const fromValue = await convertToMinimalDenom(
      fromTokenInfo.amount,
      fromTokenInfo.contractAddress
    );
    console.log(address, "=========");
    const toValue = await convertToMinimalDenom(
      toTokenInfo.amount,
      toTokenInfo.contractAddress
    );
    try {
      setInProgress(true);
      const payload = {
        trader: address,
        is_up_for_sale:
          fromTokenInfo.contractAddress === USDT.address ? true : false,
        assets: 
        fromTokenInfo.contractAddress === USDT.address ?[
          {
            virtual_token: fromTokenInfo.contractAddress,
            value: fromValue.toString(),
          },
          {
            virtual_token: toTokenInfo.contractAddress,
            value: toValue.toString(),
          },
        ]: [
          {
            virtual_token: toTokenInfo.contractAddress,
            value: fromValue.toString(),
          },
          {
            virtual_token: fromTokenInfo.contractAddress,
            value: toValue.toString(),
          },
        ],
      };

      const response = await axios.post("http://localhost:8080/orders", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      setInProgress(false);
    } catch (e) {
      console.error(e);
    } finally {
      setInProgress(false);
    }
  }

  return (
    <Button
      style={{ borderRadius: "25px", marginTop: "30px" }}
      className="btn"
      onClick={handleSubmitOrder}
      size="md"
      color="primary"
      block
      disabled={isButtonDisabled()}
    >
      Submit Order
    </Button>
  );
};
