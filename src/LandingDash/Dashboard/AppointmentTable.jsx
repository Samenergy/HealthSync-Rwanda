import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function AppointmentPieChart() {
  // Example data
  const appointments = [
    {
      patientName: "John Doe",
      type: "Consultation",
      appointmentDate: "04/04/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Jeffery Carter",
      type: "Consultation",
      appointmentDate: "04/05/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Leo Roberson",
      type: "Consultation",
      appointmentDate: "04/06/2024",
      account: "2550",
      status: "Not Seen",
    },
    {
      patientName: "Christina Walsh",
      type: "Consultation",
      appointmentDate: "04/07/2024",
      account: "2550",
      status: "Not Seen",
    },
  ];

  const statusCounts = appointments.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#00afee", "#00306a"], // Add more colors if more statuses are present
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} appointments`,
        },
      },
    },
  };

  return (
    <div className="w-[450px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <div className="flex items-center">
          <img
            src="" // Add the path to your icon or remove this line if not using an icon
            alt="Appointments Icon"
            className="w-6 h-6 mr-2"
          />
          <h1 className="text-[15px] font-bold">Appointments Pie Chart</h1>
        </div>
        <div className="text-2xl font-bold">4</div>
      </div>
      <div className="h-[150px] relative">
        <Pie data={data} options={options} />
        {/* Adding a gradient background to the chart */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 175, 238, 0.25), rgba(0, 175, 238, 0))",
          }}
        />
      </div>
    </div>
  );
}

export default AppointmentPieChart;
