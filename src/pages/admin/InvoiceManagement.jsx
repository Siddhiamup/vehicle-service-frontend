// ============================================================
// ADMIN → INVOICE MANAGEMENT
// ============================================================

import { useEffect, useState } from "react";
import api from "../../services/api";
import { markInvoicePaid } from "../../services/invoiceService";

const InvoiceManagement = () => {

  const [invoices, setInvoices] = useState([]);

  const loadInvoices = async () => {
    const response = await api.get("/invoices/all");
    setInvoices(response.data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handlePay = async (invoiceId) => {
    await markInvoicePaid(invoiceId);
    loadInvoices();
  };

  return (
    <div>
      <h2 className="page-title">Invoice Management</h2>

      {invoices.map(inv => (
        <div key={inv.invoiceId} className="dashboard-card mb-3">

          <p>Invoice #{inv.invoiceId}</p>
          <p>Amount: ₹{inv.amount}</p>
          <p>Status: {inv.paymentStatus}</p>

          {inv.paymentStatus === "UNPAID" && (
            <button
              className="btn btn-success"
              onClick={() => handlePay(inv.invoiceId)}
            >
              Mark as Paid
            </button>
          )}

        </div>
      ))}
    </div>
  );
};

export default InvoiceManagement;
