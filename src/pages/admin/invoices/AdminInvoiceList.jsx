// // ============================================================
// // ADMIN INVOICE LIST PAGE
// // ============================================================

// import { useEffect, useState } from "react";
// import AdminInvoiceCard from "../../../components/invoice/AdminInvoiceCard";
// import {
//   getAllInvoices,
//   markInvoicePaid
// } from "../../../services/invoiceService";

// const AdminInvoiceList = () => {

//   const [invoices, setInvoices] = useState([]);

//   const loadInvoices = async () => {
//     const data = await getAllInvoices();
//     setInvoices(data);
//   };

//   useEffect(() => {
//     loadInvoices();
//   }, []);

// const handleMarkPaid = async (invoiceId) => {
//   if (!window.confirm("Confirm payment received?")) return;
//   await markInvoicePaid(invoiceId);
//   loadInvoices();
// };


//   return (
//     <div>
//       <h2 className="page-title">Invoice Management</h2>

//       {invoices.length === 0 && (
//         <p>No invoices available</p>
//       )}

//       {invoices.map(invoice => (
//         <AdminInvoiceCard
//           key={invoice.invoiceId}
//           invoice={invoice}
//           onMarkPaid={handleMarkPaid}
//         />
//       ))}
//     </div>
//   );
// };

// export default AdminInvoiceList;



// ============================================================
// ADMIN → INVOICE LIST PAGE
// ============================================================

import { useEffect, useState } from "react";
import {
  getAllInvoices,
  markInvoicePaid
} from "../../../services/adminInvoiceService";

const AdminInvoiceList = () => {

  const [invoices, setInvoices] = useState([]);

  // ============================================================
  // LOAD ALL INVOICES
  // ============================================================
  const loadInvoices = async () => {
    const data = await getAllInvoices();
    setInvoices(data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  // ============================================================
  // MARK AS PAID
  // ============================================================
  const handleMarkPaid = async (invoiceId) => {
    if (!window.confirm("Mark invoice as PAID?")) return;

    await markInvoicePaid(invoiceId);
    loadInvoices();
  };

  return (
    <div>

      <h2 className="page-title">All Invoices</h2>

      {invoices.length === 0 && (
        <p>No invoices found</p>
      )}

      {invoices.map(invoice => (
        <div
          key={invoice.invoiceId}
          className="dashboard-card mb-3"
        >

          <h5>Invoice #{invoice.invoiceId}</h5>

          <p>
            <strong>Customer:</strong>{" "}
            {invoice.booking.vehicle.user.name}
          </p>

          <p>
            <strong>Amount:</strong> ₹{invoice.amount}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {invoice.paymentStatus}
          </p>

          {invoice.paymentStatus === "PENDING" && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleMarkPaid(invoice.invoiceId)}
            >
              Mark as Paid
            </button>
          )}

        </div>
      ))}

    </div>
  );
};

export default AdminInvoiceList;
