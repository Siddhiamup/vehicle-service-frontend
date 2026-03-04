import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminBookings = () => {

  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const loadBookings = async (pageNumber = 0, searchTerm = search) => {
    try {
      const res = await api.get(
        `/bookings/admin/all?page=${pageNumber}&size=5&search=${searchTerm}`
      );

      setBookings(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
    } catch {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    loadBookings(0);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadBookings(0, search);
  };

  return (
    <div>

      <h2 className="page-title">Booking Management</h2>

      <div className="dashboard-card">

        {/* SEARCH */}
        <form
          className="d-flex mb-4 gap-2"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle number or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn btn-theme">
            Search
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setSearch("");
              loadBookings(0, "");
            }}
          >
            Clear
          </button>
        </form>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">

            <thead style={{ backgroundColor: "#1E3A5F", color: "white" }}>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No bookings found
                  </td>
                </tr>
              )}

              {bookings.map(b => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.vehicle?.vehicleNumber || "N/A"}</td>
                  <td>{b.service?.serviceName || "N/A"}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {b.status}
                    </span>
                  </td>
                  <td>{b.bookingDate}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="d-flex justify-content-between align-items-center mt-4">

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 0}
            onClick={() => loadBookings(page - 1)}
          >
            Previous
          </button>

          <span className="fw-semibold">
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page + 1 === totalPages}
            onClick={() => loadBookings(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminBookings;