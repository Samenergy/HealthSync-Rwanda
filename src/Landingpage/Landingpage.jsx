import React from "react";
import Navbar from "../Components/Navbar/Navbar.jsx";
import About from "../Components/About/about.jsx";
import Features from "../Components/features/Features.jsx";
import Team from "../Components/team/team.jsx";
import Contact from "../Components/contact/Contact.jsx";
import Footer from "../Components/footer/footer.jsx";
import Home from "../Components/Home/Home.jsx";

function Landingpage() {
  return (
    <div>
      <Navbar />
      <Home id="Home" />
      <Features id="Features" />
      <About id="About" />
      <Team id="Team" />
      <Contact id="Contact" />
      <Footer />
    </div>
  );
}

export default Landingpage;
