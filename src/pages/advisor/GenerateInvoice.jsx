// ============================================================
// ADVISOR → GENERATE INVOICE
// ============================================================

import { generateInvoice } from "../../services/invoiceService";

const GenerateInvoice = ({ bookingId }) => {

  const handleGenerate = async () => {
    try {
      await generateInvoice(bookingId);
      alert("Invoice generated successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Invoice generation failed"
      );
    }
  };

  return (
    <button className="btn btn-theme" onClick={handleGenerate}>
      Generate Invoice
    </button>
  );
};

export default GenerateInvoice;
