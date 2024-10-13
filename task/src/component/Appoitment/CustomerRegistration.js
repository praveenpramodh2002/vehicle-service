import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerRegistration.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
  },
  nic: "",
  birthday: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {};

function CustomerRegistration() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");

    // Restrict phone number input to 10 digits
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    // Restrict NIC input to 12 digits or 9 digits followed by 'V' or 'v'
    if (name === "nic") {
      if (!/^\d{0,12}$|^\d{0,9}[vV]?$/.test(value)) return;
    }

    // Restrict street and city to only letters and spaces
    if (name === "address.street" || name === "address.city") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (subfield) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [subfield]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (/^[A-Za-z]*$/.test(value)) {
      handleChange(e);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) return `${name} can only contain letters.`;
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) return "Phone number must be exactly 10 digits.";
        break;

      case "nic":
        if (!/^\d{12}$|^\d{9}[vV]$/.test(value)) {
          return 'NIC must be 12 digits or 9 digits followed by "V" or "v".';
        }
        break;

      case "password":
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(value))
          return "Password must include one uppercase letter, one number, and one special character.";
        break;

      case "confirmPassword":
        if (value !== formData.password) return "Passwords do not match.";
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "object") {
        Object.keys(formData[key]).forEach((subKey) => {
          const error = validateField(`${key}.${subKey}`, formData[key][subKey]);
          if (error) newErrors[`${key}.${subKey}`] = error;
        });
      } else {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      const { confirmPassword, ...dataToSubmit } = formData;

      axios
        .post("http://localhost:3001/customer", dataToSubmit)
        .then(() => {
          alert("Customer registered successfully!");
          resetForm();
          navigate("/login");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
          alert("Error: " + errorMessage);
        });
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  const renderField = (label, name, type = "text", placeholder = "", additionalProps = {}) => (
    <label>
      {label}:
      <input
        type={type}
        name={name}
        value={name.includes(".") ? formData[name.split(".")[0]][name.split(".")[1]] : formData[name]}
        onChange={name === "firstName" || name === "lastName" ? handleNameChange : handleChange}
        placeholder={placeholder}
        required
        {...additionalProps} // Spread additional props for max and min
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </label>
  );

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  return (
    <div className="customer-registration">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        {renderField("First Name", "firstName")}
        {renderField("Last Name", "lastName")}
        {renderField("Email", "email", "email")}
        {renderField("Phone", "phone")}
        {renderField("NIC", "nic")}
        {renderField("Birthday", "birthday", "date", "", { max: maxDate })} {/* Set max date for birthday */}
        <fieldset>
          <legend>Address</legend>
          {renderField("Street", "address.street")}
          {renderField("City", "address.city")}
        </fieldset>
        {renderField("Password", "password", "password")}
        {renderField("Confirm Password", "confirmPassword", "password")}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CustomerRegistration;
