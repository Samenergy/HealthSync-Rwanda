// src/App.jsx
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import PatientForm from './PatientForm';
import Modal from './Modal';

const AddPatient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className=" p-4 absolute right-16 bottom-5">
      <button
        className="bg-[#00aeee] text-white p-2 rounded-full hover:bg-[#36799e] focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={openModal}
      >
        <FaPlusCircle size={40} />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PatientForm />
      </Modal>
    </div>
  );
};

export default AddPatient;
