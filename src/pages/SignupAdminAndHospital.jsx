import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SignupAdmin from "./AdminSignup";
import SignupHospital from "./HospitalSignup";

const SignupProcess = () => {
  const [step, setStep] = useState(1);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitData = (data) => {
    fetch("http://localhost:5000/api/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/login"); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  switch (step) {
    case 1:
      return <SignupAdmin nextStep={nextStep} setAdminData={setAdminData} />;
    case 2:
      return (
        <SignupHospital
          prevStep={prevStep}
          adminData={adminData}
          submitData={submitData}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default SignupProcess;
