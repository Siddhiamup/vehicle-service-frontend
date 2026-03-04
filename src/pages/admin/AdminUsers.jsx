import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    const loadUsers = async (pageNumber = 0, searchTerm = search) => {
        try {
            const res = await api.get(
                `/users?page=${pageNumber}&size=5&search=${searchTerm}`
            );

            setUsers(res.data.content);
            setTotalPages(res.data.totalPages);
            setPage(pageNumber);
        } catch {
            alert("Failed to load users");
        }
    };

    useEffect(() => {
        loadUsers(0);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadUsers(0, search);
    };

    return (
        <div>

            <h2 className="page-title">User Management</h2>

            <div className="dashboard-card">

                {/* ================= SEARCH BAR ================= */}
                <form
                    className="d-flex mb-4 gap-2"
                    onSubmit={handleSearch}
                >

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email..."
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
                            loadUsers(0, "");
                        }}
                    >
                        Clear
                    </button>

                </form>

                {/* ================= TABLE ================= */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle">

                        <thead style={{ backgroundColor: "#1E3A5F", color: "white" }}>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted py-4">
                                        No users found
                                    </td>
                                </tr>
                            )}

                            {users.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td className="fw-semibold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor:
                                                    user.role === "ROLE_ADMIN"
                                                        ? "#dc3545"
                                                        : user.role === "ROLE_SERVICE_ADVISOR"
                                                            ? "#ffc107"
                                                            : user.role === "ROLE_CUSTOMER"
                                                                ? "#0d6efd"
                                                                : "#6c757d"
                                            }}
                                        >
                                            {user.role ? user.role.replace("ROLE_", "") : "N/A"}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* ================= PAGINATION ================= */}
                <div className="d-flex justify-content-between align-items-center mt-4">

                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === 0}
                        onClick={() => loadUsers(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="fw-semibold">
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page + 1 === totalPages}
                        onClick={() => loadUsers(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AdminUsers;