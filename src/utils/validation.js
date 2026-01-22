const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isStrongPassword = (password) => password && password.length >= 8;

export const validateField = (name, value, formData) => {
  value = value || ""; // <-- THIS FIXES undefined.trim()
  switch (name) {
    case "firstName":
      return value.trim() ? "" : "First Name is required";

    case "lastName":
      return value.trim() ? "" : "Last Name is required";

    case "email":
      if (!value.trim()) return "Email is required";
      if (!emailRegex.test(value)) return "Invalid email format";
      return "";

    case "phone":
      if (!value.trim()) return "Phone number is required";
      if (value.length < 11) return "Phone number must be 11 digits";
      return "";

    case "dob":
      return value ? "" : "Date of Birth is required";

    case "password":
      if (!value) return "Password is required";
      if (!isStrongPassword(value))
        return "Password must be at least 8 characters";
      return "";

    case "confirmPassword":
      if (!value) return "Confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";

    case "city":
      return value ? "" : "Please select a city";

    case "message":
      if (!value.trim()) return "Message is required";
      if (value.length < 10) return "Message must be at least 10 characters";
      return "";

    default:
      return "";
  }
};

export const validateForm = (formData, step) => {
  let errors = {};

  if (step === 1) {
    errors.firstName = validateField("firstName", formData.firstName, formData);
    errors.lastName = validateField("lastName", formData.lastName, formData);
    errors.email = validateField("email", formData.email, formData);
    errors.phone = validateField("phone", formData.phone, formData);
  }

  if (step === 2) {
    errors.dob = validateField("dob", formData.dob, formData);
    errors.password = validateField("password", formData.password, formData);
    errors.confirmPassword = validateField(
      "confirmPassword",
      formData.confirmPassword,
      formData
    );
  }

  if (step === 3) {
    errors.city = validateField("city", formData.city, formData);
    errors.message = validateField("message", formData.message, formData);
  }

  // Remove empty errors
  Object.keys(errors).forEach((key) => errors[key] === "" && delete errors[key]);
  return errors;
};
