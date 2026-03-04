// ============================================================
// INVOICE CARD (CUSTOMER)
// ============================================================

import { downloadInvoicePdf } from "../../services/invoiceService";

const InvoiceCard = ({ invoice }) => {

  const handleDownload = async () => {
    const blob = await downloadInvoicePdf(invoice.invoiceId);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `invoice_${invoice.invoiceId}.pdf`;
    a.click();
  };

  return (
    <div className="dashboard-card mt-3">

      <h5>Invoice #{invoice.invoiceId}</h5>

      <p><strong>Amount:</strong> ₹{invoice.amount}</p>
      <p><strong>Payment Status:</strong> {invoice.paymentStatus}</p>

      <button className="btn btn-secondary" onClick={handleDownload}>
        Download PDF
      </button>

    </div>
  );
};

export default InvoiceCard;

