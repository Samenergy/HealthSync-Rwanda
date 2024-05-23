import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landingpage from "./Landingpage/Landingpage";
import HospitalSignup from "./pages/HospitalSignup";
import LandingDashboard from "./LandingDash/LandingDashboard";
import Schedulingpage from "./Scheduling/Schedulingpage";
import "./App.css";
import LandingPatientlist from "./LandingPatientList/LandingPatientlist";
import LandingRecdash from "./LandingDash/LandingRecDash/LandingRecdash";
import LandingPatientlistRec from "./LandingPatientList/LandingPatientlistRec";
import AdminDashboard from "./Admin/LandingpageAdmin/AdminDashboard";
import Userpage from "./Admin/Users/LandingUsers/Userpage";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<HospitalSignup />} />
        <Route path="/Dashboard" element={<LandingDashboard />} />
        <Route path="/Scheduling" element={<Schedulingpage />} />
        <Route path="PatientList" element={<LandingPatientlist />} />
        <Route path="Reception" element={<LandingRecdash />} />
        <Route path="PatientlistReception" element={<LandingPatientlistRec />} />
        <Route path="Admin" element={<AdminDashboard />} />
        <Route path="Users" element={<Userpage />} />
      </Routes>

    </div>
  );
};

export default App;
