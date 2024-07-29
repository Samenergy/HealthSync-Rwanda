// src/api.js

import axios from "axios";

const API_URL = "https://healthsync.up.railway.app/api/report";

export const fetchDailyReport = () => axios.get(`${API_URL}/generate`);
export const fetchDoctorPerformanceReport = () =>
  axios.get(`${API_URL}/doctor-performance`);
export const fetchServiceUtilizationReport = () =>
  axios.get(`${API_URL}/service-utilization`);
export const fetchFinancialReport = () => axios.get(`${API_URL}/financial`);
export const fetchQueueManagementReport = () =>
  axios.get(`${API_URL}/queue-management`);
export const fetchPatientDemographicsReport = () =>
  axios.get(`${API_URL}/patient-demographics`);
