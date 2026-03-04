// // ============================================================
// // CUSTOMER → INVOICE LIST
// // ============================================================

// import { useEffect, useState } from "react";
// import InvoiceCard from "../../../components/invoice/InvoiceCard";
// import api from "../../../services/api";

// const InvoiceList = () => {

//   const [invoices, setInvoices] = useState([]);

//   const loadInvoices = async () => {
//     const response = await api.get("/invoices/my");
//     setInvoices(response.data);
//   };

//   useEffect(() => {
//     loadInvoices();
//   }, []);

//   return (
//     <div>
//       <h2 className="page-title">My Invoices</h2>

//       {invoices.length === 0 && <p>No invoices available.</p>}

//       {invoices.map(invoice => (
//         <InvoiceCard key={invoice.invoiceId} invoice={invoice} />
//       ))}
//     </div>
//   );
// };

// export default InvoiceList;



// ============================================================
// CUSTOMER → INVOICE LIST PAGE
// ============================================================

// import { useEffect, useState } from "react";
// import InvoiceCard from "../../../components/invoice/InvoiceCard";
// import { getMyInvoices } from "../../../services/invoiceService";

// const InvoiceList = () => {

//   const [invoices, setInvoices] = useState([]);

//   // ============================================================
//   // Load customer invoices
//   // ============================================================
//   const loadInvoices = async () => {
//     try {
//       const data = await getMyInvoices();
//       setInvoices(data);
//     } catch {
//       alert("Failed to load invoices");
//     }
//   };

//   useEffect(() => {
//     loadInvoices();
//   }, []);

//   return (
//     <div>

//       <h2 className="page-title">My Invoices</h2>

//       {invoices.length === 0 && (
//         <p>No invoices available.</p>
//       )}

//       {invoices.map(invoice => (
//         <InvoiceCard
//           key={invoice.invoiceId}
//           invoice={invoice}
//         />
//       ))}

//     </div>
//   );
// };

// export default InvoiceList;




// ============================================================
// CUSTOMER → INVOICE LIST PAGE
// ============================================================

import { useEffect, useState } from "react";
import InvoiceCard from "../../../components/invoice/InvoiceCard";
import { getMyInvoices } from "../../../services/invoiceService";

const InvoiceList = () => {

  // ============================================================
  // STATE
  // ============================================================

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // LOAD INVOICES
  // ============================================================

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getMyInvoices();
      setInvoices(data);
    } catch {
      alert("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div>

      <h2 className="page-title">My Invoices</h2>

      {loading && <p>Loading invoices...</p>}

      {!loading && invoices.length === 0 && (
        <p>No invoices available yet.</p>
      )}

      {!loading && invoices.map(invoice => (
        <InvoiceCard
          key={invoice.invoiceId}
          invoice={invoice}
        />
      ))}

    </div>
  );
};

export default InvoiceList;
