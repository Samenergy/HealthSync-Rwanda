import React, { useState } from "react";
import SignupAdmin from "./AdminSignup";
import SignupHospital from "./HospitalSignup";

const SignupAdminAndHospital = () => {
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState({});
  const [error, setError] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitData = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "logo") {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      // Handle successful signup (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error signing up admin and hospital:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div>
      {step === 1 && <SignupAdmin nextStep={nextStep} setAdminData={setAdminData} />}
      {step === 2 && <SignupHospital prevStep={prevStep} adminData={adminData} submitData={submitData} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignupAdminAndHospital;
