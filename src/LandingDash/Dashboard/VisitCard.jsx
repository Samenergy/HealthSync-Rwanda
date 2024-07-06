import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const VisitCard = ({ date, description, status, pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="bg-teal-100 p-6 rounded-lg shadow-md text-center">
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-800 font-semibold mt-2">{description}</p>
      <div className="flex justify-center mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-teal-500"
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
      <div className="mt-4">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
          <div
            style={{
              height: '500px',
            }}
          >
            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
          </div>
        </Worker>
      </div>
    </div>
  );
};

const VisitsSection = () => (
  <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Visits</h2>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">New Visit</button>
    </div>
    <div className="flex gap-6">
      <VisitCard 
        date="Wednesday, 04/06/2020" 
        description="Arm pain" 
        status="IN PROGRESS" 
        pdfUrl="path/to/arm-pain.pdf"
      />
      <VisitCard 
        date="Monday, 03/22/2020" 
        description="Headache" 
        status="SIGNED OFF" 
        pdfUrl="path/to/headache.pdf"
      />
      <VisitCard 
        date="Monday, 03/11/2020" 
        description="Hypertension" 
        status="SIGNED OFF" 
        pdfUrl="path/to/hypertension.pdf"
      />
    </div>
  </div>
);

export default VisitsSection;
