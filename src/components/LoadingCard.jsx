import React from "react";

export const LoadingCard = ({inprogress}) => {
  return (
    <div className="overlay" style={{ display: inprogress ? "flex" : "none" }}>
      <div className="popup">Loading...</div>
    </div>
  );
};
