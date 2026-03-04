// ============================================================
// BOOKING FORM COMPONENT
// ============================================================

import { useEffect, useState } from "react";
import { getAllServices } from "../../services/bookingService";
import { getMyVehicles } from "../../services/vehicleService";

const BookingForm = ({ onSubmit }) => {

    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);

    const [formData, setFormData] = useState({
        vehicleId: "",
        serviceId: "",
        bookingDate: "",
        slot: ""
    });

    // ============================================================
    // Load Vehicles & Services
    // ============================================================

    useEffect(() => {

        loadVehicles();
        loadServices();

    }, []);

    const loadVehicles = async () => {
        const data = await getMyVehicles();
        setVehicles(data);
    };

    const loadServices = async () => {
        const data = await getAllServices();
        setServices(data);
    };

    // ============================================================
    // Handle Change
    // ============================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ============================================================
    // Submit
    // ============================================================

    const handleSubmit = (e) => {

        e.preventDefault();
        onSubmit(formData);
    };

    return (

        <form onSubmit={handleSubmit} className="dashboard-card">

            <h4 className="page-title">Create Booking</h4>

            {/* Vehicle Dropdown */}
            <select
                name="vehicleId"
                className="form-control mb-3"
                onChange={handleChange}
                required
            >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                    <option key={v.vehicleId} value={v.vehicleId}>
                        {v.vehicleNumber}
                    </option>
                ))}
            </select>

            {/* Service Dropdown */}
            <select
                name="serviceId"
                className="form-control mb-3"
                onChange={handleChange}
                required
            >
                <option value="">Select Service</option>
                {services.map(s => (
                    <option key={s.serviceId} value={s.serviceId}>
                        {s.serviceName} - ₹{s.price}
                    </option>
                ))}
            </select>

            {/* Date */}
            <input
                type="date"
                name="bookingDate"
                className="form-control mb-3"
                onChange={handleChange}
                required
            />

            {/* Slot */}
            <select
                name="slot"
                className="form-control mb-3"
                onChange={handleChange}
                required
            >
                <option value="">Select Slot</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
            </select>

            <button className="btn btn-theme">
                Book Service
            </button>

        </form>
    );
};

export default BookingForm;
