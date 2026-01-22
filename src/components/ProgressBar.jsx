import React from "react";
import "../pages/form.css"; 

const ProgressBar = ({ step }) => {
  const progressPercentage = (step / 3) * 100;

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
