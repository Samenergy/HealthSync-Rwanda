import React, { useState } from 'react';
import servicesList from './services';

const BillingSection = () => {
  const [billDetails, setBillDetails] = useState({
    patientName: '',
    services: [],
    totalAmount: 0,
    status: 'Pending',
  });

  const [sampleData] = useState([
    {
      patientName: 'John Doe',
      services: [
        { name: 'Consultation', cost: 50 },
        { name: 'X-Ray', cost: 200 },
      ],
      totalAmount: 250,
      status: 'Paid',
    },
    {
      patientName: 'Jane Smith',
      services: [
        { name: 'Blood Tests', cost: 100 },
        { name: 'MRI', cost: 1000 },
      ],
      totalAmount: 1100,
      status: 'Pending',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillDetails({ ...billDetails, [name]: value });
  };

  const addService = () => {
    setBillDetails({
      ...billDetails,
      services: [...billDetails.services, { name: '', cost: 0 }],
    });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = billDetails.services.map((service, i) => {
      if (i === index) {
        return { ...service, [name]: value };
      }
      return service;
    });
    setBillDetails({ ...billDetails, services: newServices });
  };

  const calculateTotal = () => {
    const total = billDetails.services.reduce((sum, service) => sum + parseFloat(service.cost || 0), 0);
    setBillDetails({ ...billDetails, totalAmount: total });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTotal();
    // Save bill details to backend
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Billing Section</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={billDetails.patientName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Services</label>
          {billDetails.services.map((service, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                name="name"
                value={service.name}
                onChange={(e) => handleServiceChange(index, e)}
                className="mr-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Service</option>
                {servicesList.map((serviceItem, idx) => (
                  <option key={idx} value={serviceItem.name}>{serviceItem.name}</option>
                ))}
              </select>
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={service.cost}
                onChange={(e) => handleServiceChange(index, e)}
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button type="button" onClick={addService} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Add Service
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={billDetails.totalAmount}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={billDetails.status}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Save Bill
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Sample Data</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Patient Name</th>
            <th className="px-4 py-2 border-b">Services</th>
            <th className="px-4 py-2 border-b">Total Amount</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((record, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{record.patientName}</td>
              <td className="px-4 py-2 border-b">
                {record.services.map((service, idx) => (
                  <div key={idx}>
                    {service.name} (${service.cost})
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border-b">${record.totalAmount}</td>
              <td className="px-4 py-2 border-b">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingSection;
