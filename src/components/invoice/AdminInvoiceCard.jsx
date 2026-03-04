// ============================================================
// ADMIN INVOICE CARD
// ============================================================

const AdminInvoiceCard = ({ invoice, onMarkPaid }) => {

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">

        <h5>Invoice #{invoice.invoiceId}</h5>

        <p><strong>Customer:</strong> {invoice.booking.vehicle.user.name}</p>
        <p><strong>Vehicle:</strong> {invoice.booking.vehicle.model}</p>
        <p><strong>Service:</strong> {invoice.booking.service.serviceName}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={
            invoice.paymentStatus === "PAID"
              ? "badge bg-success"
              : "badge bg-warning text-dark"
          }>
            {invoice.paymentStatus}
          </span>
        </p>

        <p><strong>Amount:</strong> ₹{invoice.amount}</p>

        {invoice.paymentStatus === "PENDING" && (
          <button
            className="btn btn-success"
            onClick={() => onMarkPaid(invoice.invoiceId)}
          >
            Mark as Paid
          </button>
        )}

      </div>
    </div>
  );
};

export default AdminInvoiceCard;
