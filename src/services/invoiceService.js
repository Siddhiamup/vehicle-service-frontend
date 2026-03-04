// // ============================================================
// // INVOICE API SERVICE (ALIGNED WITH BACKEND)
// // ============================================================

// import api from "../api/axiosConfig";

// // ============================================================
// // SERVICE ADVISOR → GENERATE INVOICE
// // ============================================================

// export const generateInvoice = async (bookingId) => {
//   const response = await api.post(`/invoices/generate/${bookingId}`);
//   return response.data;
// };

// // ============================================================
// // CUSTOMER → VIEW INVOICE BY BOOKING
// // ============================================================

// export const viewInvoice = async (bookingId) => {
//   const response = await api.get(`/invoices/view/${bookingId}`);
//   return response.data;
// };

// // ============================================================
// // CUSTOMER / ADMIN → DOWNLOAD INVOICE PDF
// // ============================================================

// export const downloadInvoicePdf = async (invoiceId) => {
//   const response = await api.get(`/invoices/download/${invoiceId}`, {
//     responseType: "blob",
//   });
//   return response.data;
// };

// // ============================================================
// // ADMIN → MARK INVOICE AS PAID
// // ============================================================

// export const markInvoicePaid = async (invoiceId) => {
//   const response = await api.patch(`/invoices/pay/${invoiceId}`);
//   return response.data;
// };

// // ============================================================
// // ADMIN → GET ALL INVOICES
// // ============================================================
// export const getAllInvoices = async () => {
//   const response = await api.get("/invoices/all");
//   return response.data;
// };






// ============================================================
// INVOICE API SERVICE (BACKEND-ALIGNED)
// ============================================================

import api from "./api";

// ============================================================
// SERVICE ADVISOR → GENERATE INVOICE
// ============================================================
export const generateInvoice = async (bookingId) => {
  const response = await api.post(`/invoices/generate/${bookingId}`);
  return response.data;
};

// ============================================================
// CUSTOMER → VIEW INVOICE BY BOOKING
// ============================================================
export const viewInvoice = async (bookingId) => {
  const response = await api.get(`/invoices/view/${bookingId}`);
  return response.data;
};

// ============================================================
// CUSTOMER → VIEW ALL OWN INVOICES
// ============================================================
export const getMyInvoices = async () => {
  const response = await api.get("/invoices/my");
  return response.data;
};

// ============================================================
// CUSTOMER / ADMIN → DOWNLOAD INVOICE PDF
// ============================================================
export const downloadInvoicePdf = async (invoiceId) => {
  const response = await api.get(
    `/invoices/download/${invoiceId}`,
    { responseType: "blob" }
  );
  return response.data;
};

// ============================================================
// ADMIN → MARK INVOICE AS PAID
// ============================================================
export const markInvoicePaid = async (invoiceId) => {
  const response = await api.patch(`/invoices/pay/${invoiceId}`);
  return response.data;
};

// ============================================================
// CUSTOMER → GET ALL OWN INVOICES
// ============================================================

