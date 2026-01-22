import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import ProgressBar from "../components/ProgressBar";
import { validateField, validateForm } from "../utils/validation";
import "./form.css";

const Form = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Cities list
  const cities = [
    "Abbottabad", "Bahawalpur", "Chakwal", "Dera Ghazi Khan", "Faisalabad", "Gujranwala",
    "Hyderabad", "Islamabad", "Jhang", "Karachi", "Lahore", "Multan", "Quetta", "Rawalpindi",
    "Sialkot", "Sukkur"
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNext = () => {
    const stepErrors = validateForm(formData, currentStep);
    if (Object.keys(stepErrors).length === 0) setCurrentStep((prev) => prev + 1);
    else setErrors(stepErrors);
  };
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateForm(formData, currentStep);
    if (Object.keys(stepErrors).length === 0) {
      console.log("Form Submitted (Fake API):", formData);
      localStorage.removeItem("formData"); // Clear saved data
      navigate("/success");
    } else setErrors(stepErrors);
  };

  const isStepValid = () => {
    const stepErrors = validateForm(formData, currentStep);
    if (Object.keys(stepErrors).length > 0) return false;

    if (currentStep === 1)
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    if (currentStep === 2)
      return formData.dob && formData.password && formData.confirmPassword;
    if (currentStep === 3)
      return formData.city && formData.message;
    return false;
  };

  return (
    <div className="form-container gradient-theme">
      {/* Heading + paragraph */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "5px" }}>
          Form-Validation-App
        </h1>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          This is a modern, multi-step React Form-Validation App client-ready design, built by Sidra Gillani as part   of a 12-day React project series.</p>
      </div>

      <ProgressBar step={currentStep} />

      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="fade-in">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="fade-in">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? "" : formData.dob ? "success" : ""}
            />
            {errors.dob && <p className="error-text">{errors.dob}</p>}

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              toggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            />
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="fade-in">
            <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "" : formData.city ? "success" : ""}
            >
              <option value="">Select City</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            {errors.city && <p className="error-text">{errors.city}</p>}

            <TextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="btn-group">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrev} className="hover-btn">
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="hover-btn"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isStepValid()}
              className="hover-btn"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;

