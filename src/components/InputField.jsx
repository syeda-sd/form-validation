import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import "./inputField.css"; 

const InputField = ({ label, type = "text", name, value, onChange, error, toggle, showPassword }) => {
  return (
    <div className="input-field-container">
      <label>{label}</label>
      <div className="input-with-icon">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? "error" : value ? "success" : ""}
        />
        {toggle && (
          <span className="eye-icon" onClick={toggle}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputField;
