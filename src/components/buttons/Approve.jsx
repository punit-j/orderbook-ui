import React, { useContext } from "react";
import { Button } from "reactstrap";
import { approve } from "../../utils/etherUtils";
import { WalletContext } from "../../context/WalletContext";
import { APPROVAL_ADDRESS } from "../../utils/constants";

export const Approve = ({
  setInProgress,
  setIsApproved,
  isButtonDisabled,
  fromTokenInfo,
}) => {
  const { balance } = useContext(WalletContext);
  console.log(fromTokenInfo, "=========");

  const handleApproval = async () => {
    try {
      setInProgress(true);
      await approve(
        fromTokenInfo,
        APPROVAL_ADDRESS //spender address here
      );
      setIsApproved(true);
      setInProgress(false);
    } catch (e) {
      console.error(e);
      setIsApproved(false);
      setInProgress(false);
    }
  };

  return (
    <Button
      style={{ borderRadius: "25px", marginTop: "30px" }}
      className="btn"
      onClick={handleApproval}
      size="md"
      color="primary"
      block
      disabled={isButtonDisabled()}
    >
      Approve Token
    </Button>
  );
};
