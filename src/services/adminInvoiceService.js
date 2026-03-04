// ============================================================
// ADMIN INVOICE SERVICE
// ============================================================

import api from "./api";

// ============================================================
// ADMIN → GET ALL INVOICES
// ============================================================
export const getAllInvoices = async () => {
  const response = await api.get("/invoices/all");
  return response.data;
};

// ============================================================
// ADMIN → MARK INVOICE AS PAID
// ============================================================
export const markInvoicePaid = async (invoiceId) => {
  const response = await api.patch(`/invoices/pay/${invoiceId}`);
  return response.data;
};
