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
import SignupProcess from "./pages/SignupAdminAndHospital";
import Patientinfo from "./LandingDash/Dashboard/Patientdata";
import Profile from "./Admin/Dashboard/Profile";

const App = () => {
  return (
    <div className="overflow-x-hidden bg-[#DDF4FC]">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupProcess />} />

        <Route path="/Dashboard" element={<LandingDashboard />} />
        <Route path="/Scheduling" element={<Schedulingpage />} />
        <Route path="/Patientlist" element={<LandingPatientlist />} />
        <Route path="/Reception" element={<LandingRecdash />} />
        <Route
          path="/PatientlistReception"
          element={<LandingPatientlistRec />}
        />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/Users" element={<Userpage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Patientinfo" element={<Patientinfo />} />

      </Routes>
    </div>
  );
};

export default App;
