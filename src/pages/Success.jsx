import React from "react";
import { useNavigate } from "react-router-dom";
import "./form.css"; 

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container gradient-theme glass-effect" style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
        Form-Validation-App
      </h1>
      <p style={{ fontSize: "14px", marginBottom: "25px" }}>
        This is a modern, multi-step React Form-Validation App client-ready design, built by Sidra Gillani as part of a 12-day React project series.
      </p>

      <h2 style={{ color: "#09ff15", fontSize: "28px", marginBottom: "10px" }}>
        Form Submitted Successfully!
      </h2>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        Thank you for contacting us. We will reach out shortly.
      </p>

      <button
        onClick={() => navigate("/")}
        className="hover-btn"
        style={{ marginTop: "10px" }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Success;
