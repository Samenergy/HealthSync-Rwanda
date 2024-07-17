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
import PrivateRoute from "./PrivateRoute";
import ProfileDoctor from "./LandingDash/Dashboard/ProfileDoctor";
import ProfileReception from "./LandingDash/DashboardReception/Profilereceptionist";

const App = () => {
  return (
    <div className="overflow-x-hidden bg-[#DDF4FC]">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupProcess />} />

        <Route
          path="/Dashboard"
          element={<PrivateRoute component={LandingDashboard} />}
        />
        <Route
          path="/Scheduling"
          element={<PrivateRoute component={Schedulingpage} />}
        />
        <Route
          path="/Patientlist"
          element={<PrivateRoute component={LandingPatientlist} />}
        />
        <Route
          path="/Reception"
          element={<PrivateRoute component={LandingRecdash} />}
        />
        <Route
          path="/PatientlistReception"
          element={<PrivateRoute component={LandingPatientlistRec} />}
        />
        <Route
          path="/Admin"
          element={<PrivateRoute component={AdminDashboard} />}
        />
        <Route path="/Users" element={<PrivateRoute component={Userpage} />} />
        <Route path="/Profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/doctor/info" element={<PrivateRoute component={ProfileDoctor} />} />
        <Route path="/reception/info" element={<PrivateRoute component={ProfileReception } />} />
        <Route
          path="/Patientinfo"
          element={<PrivateRoute component={Patientinfo} />}
        />
      </Routes>
    </div>
  );
};

export default App;
