import React from "react";
import "./Home.css"

function Home() {
  return (
    <div id="b-image" className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-left filter-none">
          <h1 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-6xl filter-none">
            Revolutionalising healthcare record managment in Rwanda
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-50">
            Discover how HealthSync Rwanda's intergrated electronic health
            record (EHR) system streamlines processes, improve patient care,and
            enhances operational eficiency
          </p>
          <div className="mt-10 flex items-center justify-start gap-x-9 text-xl">
            <a
              href="/Signup"
              className="rounded-md bg-[#011c36] px-3.5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get started
            </a>
            <a href="#" className=" font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
