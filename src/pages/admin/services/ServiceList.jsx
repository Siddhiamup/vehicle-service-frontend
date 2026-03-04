// ============================================================
// SERVICE MASTER LIST PAGE (ADMIN)
// Displays all available services
// ============================================================

import { useEffect, useState } from "react";
import {
    deleteService,
    getAllServices
} from "../../../services/serviceMasterService";

const ServiceList = () => {

    // ============================================================
    // STATE
    // ============================================================

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // LOAD SERVICES ON PAGE LOAD
    // ============================================================

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (error) {
            alert("Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
// DELETE SERVICE HANDLER (WITH PROPER ERROR MESSAGE)
// ============================================================

const handleDelete = async (serviceId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
        await deleteService(serviceId);
        alert("Service deleted successfully");
        loadServices(); // refresh list

    } catch (error) {

        // ✅ Extract backend error message properly
        const message =
            error.response?.data ||
            "Service cannot be deleted. It may already be used in bookings.";

        alert(message);
    }
};


    // ============================================================
    // UI
    // ============================================================

    return (
        <div>

            <h2 className="page-title">Service Master</h2>

            {/* ADD SERVICE BUTTON */}
            <button
                className="btn btn-theme mb-3"
                onClick={() => window.location.href = "/services/add"}
            >
                Add New Service
            </button>

            {/* LOADING STATE */}
            {loading && <p>Loading services...</p>}

            {/* EMPTY STATE */}
            {!loading && services.length === 0 && (
                <p>No services available</p>
            )}

            {/* SERVICE LIST */}
            {!loading && services.map(service => (

                <div key={service.serviceId} className="dashboard-card mb-3">

                    <h5>{service.serviceName}</h5>

                    <p>
                        <strong>Duration:</strong> {service.durationHours} hours
                    </p>

                    <p>
                        <strong>Price:</strong> ₹ {service.price}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="mt-2">

                        <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() =>
                                window.location.href =
                                `/services/edit/${service.serviceId}`
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(service.serviceId)}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default ServiceList;
