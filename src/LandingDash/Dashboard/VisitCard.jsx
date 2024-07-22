import React, { useRef, useEffect, useState } from "react";

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
        "https://images.pexels.com/photos/7088828/pexels-photo-7088828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
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
      case "status-asc":
        return a.status.localeCompare(b.status);
      case "status-desc":
        return b.status.localeCompare(a.status);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
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
    if (container) {
      container.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const handleRowClick = (visit) => {
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
    <div className="max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-10">
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
      <div ref={scrollContainerRef} className="overflow-x-auto scroll-smooth">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedVisits.map((visit, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(visit)}
              >
                <td className="py-2 px-4">{visit.date}</td>
                <td className="py-2 px-4">{visit.description}</td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-sm  rounded-full text-white ${
                      visit.status === "IN PROGRESS"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {visit.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(visit);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
                        d="M6 19h5c.6 0 1-.4 1-1v-5a1 1 0 00-1-1H6a1 1 0 00-1 1v5c0 .6.4 1 1 1z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12h6a1 1 0 001-1v-5a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                      alt={`Visit image ${index + 1}`}
                      className="w-32 h-32 object-cover cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {fullScreenImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={fullScreenImage}
              alt="Full screen"
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2"
              onClick={handleCloseFullScreenImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitsSection;
