import React, { useRef, useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const VisitCard = ({ date, description, status, onClick }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      className="bg-[#DDF4FC] p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-[#ccefff]"
      onClick={onClick}
    >
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-800 font-semibold mt-2">{description}</p>
      <div className="flex justify-center mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#00afee]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c0 .6-.4 1-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h5c.6 0 1 .4 1 1v5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 19h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 11c0 .6-.4 1-1 1h-5c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h5c.6 0 1 .4 1 1v5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1h-5c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1z"
          />
        </svg>
      </div>
      <p className="text-teal-700 mt-2">{status}</p>
    </div>
  );
};

const VisitsSection = () => {
  const scrollContainerRef = useRef(null);
  const [sortOrder, setSortOrder] = useState("date-asc");
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const visits = [
    {
      date: "Wednesday, 04/06/2020",
      description: "Arm pain",
      status: "IN PROGRESS",
      disease: "Fracture",
      medication: ["Pain relievers", "Anti-inflammatory drugs"],
      images: [
        "https://images.pexels.com/photos/4225923/pexels-photo-4225923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7088828/pexels-photo-7088828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
      details:
        "Patient reported severe arm pain. Diagnosed with possible fracture.",
      notes: "Follow up in 2 weeks.",
    },
    {
      date: "Monday, 03/22/2020",
      description: "Headache",
      status: "SIGNED OFF",
      disease: "Migraine",
      medication: ["Migraine medication"],
      images: ["/path/to/scan3.jpg"],
      details: "Patient reported severe headache. Diagnosed with migraine.",
      notes: "Recommended avoiding triggers.",
    },
    {
      date: "Monday, 03/11/2020",
      description: "Hypertension",
      status: "SIGNED OFF",
      disease: "Hypertension",
      medication: ["Blood pressure medication"],
      images: [],
      details:
        "Patient diagnosed with hypertension. Advised lifestyle changes.",
      notes: "Monitor blood pressure regularly.",
      
    },
    // Add more visits as needed
  ];

  const sortedVisits = [...visits].sort((a, b) => {
    switch (sortOrder) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "status-asc":
        return a.status.localeCompare(b.status);
      case "status-desc":
        return b.status.localeCompare(a.status);
      default:
        return 0;
    }
  });

  useEffect(() => {
    const handleScroll = (event) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleCardClick = (visit) => {
    setSelectedVisit(visit);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedVisit(null);
    setFullScreenImage("");
  };

  const handleImageClick = (img) => {
    setFullScreenImage(img);
  };

  const handleCloseFullScreenImage = () => {
    setFullScreenImage("");
  };

  return (
    <div className="max-w-3xl  p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visits</h2>
        <div className="flex gap-4 items-center">
          <button className="bg-[#00afee] text-white px-4 py-2 rounded-lg">
            New Visit
          </button>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="date-asc">Sort by Date (Ascending)</option>
            <option value="date-desc">Sort by Date (Descending)</option>
            <option value="status-asc">Sort by Status (Ascending)</option>
            <option value="status-desc">Sort by Status (Descending)</option>
          </select>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth"
      >
        {sortedVisits.map((visit, index) => (
          <VisitCard
            key={index}
            date={visit.date}
            description={visit.description}
            status={visit.status}
            onClick={() => handleCardClick(visit)}
          />
        ))}
      </div>
      {showDetails && selectedVisit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Visit Details</h3>
            <p>
              <strong>Date:</strong> {selectedVisit.date}
            </p>
            <p>
              <strong>Description:</strong> {selectedVisit.description}
            </p>
            <p>
              <strong>Status:</strong> {selectedVisit.status}
            </p>
            <p>
              <strong>Disease:</strong> {selectedVisit.disease}
            </p>
            <p>
              <strong>Medication:</strong>
            </p>
            <ul className="list-disc ml-5">
              {selectedVisit.medication.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
            <p>
              <strong>Details:</strong> {selectedVisit.details}
            </p>
            <p>
              <strong>Notes:</strong> {selectedVisit.notes}
            </p>
            {selectedVisit.images.length > 0 && (
              <div className="mt-4">
                <strong>Images:</strong>
                <div className="flex flex-wrap gap-4 mt-2">
                  {selectedVisit.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Scan ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handleCloseDetails}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {fullScreenImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={handleCloseFullScreenImage}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default VisitsSection;
