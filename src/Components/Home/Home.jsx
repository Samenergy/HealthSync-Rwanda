import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero-bg">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-64">
          <div className="text-center lg:text-left lg:-ml-60">
            <h1 className="mt-6 text-lg leading-8 text-gray-800 font-semibold uppercase">
              WELCOME TO HealthSync Rwanda
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-[#012243] sm:text-5xl lg:text-6xl">
              Revolutionalising <br />Healthcare Record <br /> Managment 
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#012243]">
              Discover how HealthSync Rwanda's intergrated electronic health <br />
              record (EHR) system streamlines processes, improve patient
              care, <br /> and enhances operational eficiency
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-[#012243] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f161d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37af65]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
