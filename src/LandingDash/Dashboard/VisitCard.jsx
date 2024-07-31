import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaEye, FaEdit } from "react-icons/fa";
import NewVisitForm from "./NewVisitForm";
import EditVisitForm from "./EditVisitForm";

const VisitsSection = ({ patientId }) => {
  const scrollContainerRef = useRef(null);
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [visits, setVisits] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [visitToEdit, setVisitToEdit] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch visits data from the backend
  const fetchVisits = async () => {
    try {
      const response = await axios.get(
        `https://healthsync.up.railway.app/api/user/records/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVisits(response.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  useEffect(() => {
    fetchVisits(); // Fetch data when the component mounts

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
  }, [patientId]);

  const sortedVisits = [...visits].sort((a, b) => {
    // Prioritize "IN PROGRESS" visits first
    if (a.status === "In Progress" && b.status !== "In Progress") {
      return -1;
    }
    if (a.status !== "In Progress" && b.status === "In Progress") {
      return 1;
    }

    // Then sort by date within the same status group
    const dateA = new Date(a.date); // Assuming `date` is a field
    const dateB = new Date(b.date); // Adjust as needed

    switch (sortOrder) {
      case "date-asc":
        return dateA - dateB;
      case "date-desc":
        return dateB - dateA;
      case "status-asc":
        return a.status.localeCompare(b.status);
      case "status-desc":
        return b.status.localeCompare(a.status);
      default:
        return 0;
    }
  });

  const handleRowClick = (visit) => {
    if (visit.status !== "In Progress") {
      setSelectedVisit(visit);
      setShowDetails(true);
    } else {
      setVisitToEdit(visit);
      setEditFormVisible(true);
    }
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

  const handleAddVisit = (newVisit) => {
    console.log("New Visit Added:", newVisit);
  };

  const handleToggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleSaveEdit = () => {
    fetchVisits(); // Refresh the visit list after saving changes
    setEditFormVisible(false);
  };

  const handleCloseEditForm = () => {
    setEditFormVisible(false);
    setVisitToEdit(null);
  };

  return (
    <div className="max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visits</h2>
        <div className="flex gap-4 items-center">
          <button
            className="bg-[#00afee] text-white px-4 py-2 rounded-lg"
            onClick={handleToggleForm}
          >
            New Visit
          </button>

          {isFormVisible && (
            <NewVisitForm
              patientId={patientId}
              onAddVisit={handleAddVisit}
              onClose={handleCloseForm}
            />
          )}

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
            <tr className="text-left text-[11px] font-sans border-b">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Disease</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedVisits.map((visit, index) => (
              <tr
                key={visit.id}
                className={`text-[11px] h-[34px] ${
                  index % 2 === 0 ? "bg-[#ddf4fc]" : ""
                } border-b cursor-pointer`}
                onClick={() => handleRowClick(visit)}
              >
                <td className="py-2 px-4">{visit.date}</td>
                <td className="py-2 px-4">{visit.description}</td>
                <td className="py-2 px-4">{visit.disease}</td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded-full text-white ${
                      visit.status === "IN PROGRESS"
                        ? "bg-green-600"
                        : "bg-red-400"
                    }`}
                  >
                    {visit.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-5 text-lg">
                  {visit.status !== "In Progress" && (
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleRowClick(visit)}
                    />
                  )}
                  {visit.status === "In Progress" && (
                    <FaEdit
                      className="text-yellow-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVisitToEdit(visit);
                        setEditFormVisible(true);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && selectedVisit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Visit Details</h2>
            <p>
              <strong>Date:</strong> {selectedVisit.date}
            </p>
            <p>
              <strong>Description:</strong> {selectedVisit.description}
            </p>

            <p>
              <strong>Disease:</strong> {selectedVisit.disease}
            </p>
            <p>
              <strong>Details:</strong> {selectedVisit.details}
            </p>
            <p>
              <strong>Notes:</strong> {selectedVisit.notes}
            </p>
            <p>
              <strong>Height:</strong> {selectedVisit.height} cm
            </p>
            <p>
              <strong>Weight:</strong> {selectedVisit.weight} kg
            </p>
            <p>
              <strong>BMI:</strong> {selectedVisit.bmi}
            </p>
            <p>
              <strong>Blood Pressure:</strong> {selectedVisit.bloodPressure}
            </p>
            <p>
              <strong>Immunizations:</strong> {selectedVisit.immunizations}
            </p>
            <p>
              <strong>Insurance:</strong> {selectedVisit.insurance}
            </p>
            <p>
              <strong>Social History:</strong> {selectedVisit.socialHistory}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedVisit.doctorname}
            </p>
            <p>
              <strong>Hospital:</strong> {selectedVisit.Hospitalname}
            </p>

            {selectedVisit.images && (
              <div>
                <strong>Images:</strong>
                <div className="flex gap-2 flex-wrap">
                  {selectedVisit.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Visit Image ${idx + 1}`}
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              className="bg-[#00afee] text-white px-4 py-2 rounded-lg mt-4"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {fullScreenImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseFullScreenImage}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen"
            className="max-w-full max-h-full"
          />
        </div>
      )}

      {isEditFormVisible && visitToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditVisitForm
            visit={visitToEdit}
            onClose={handleCloseEditForm}
            onSave={handleSaveEdit}
          />
        </div>
      )}
    </div>
  );
};

VisitsSection.propTypes = {
  patientId: PropTypes.string.isRequired,
};

export default VisitsSection;
