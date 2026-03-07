// ============================================================
// VEHICLE FORM COMPONENT
// Supports Add & Edit Vehicle
// ============================================================

import { useEffect, useState } from "react";

const VehicleForm = ({ onSubmit, initialData }) => {

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        model: "",
        fuelType: "",
        year: ""
    });

    // ============================================================
    // Prefill Data For Edit
    // ============================================================

    useEffect(() => {

        if (initialData) {
            setFormData(initialData);
        }

    }, [initialData]);

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
    // Submit Form
    // ============================================================

    const handleSubmit = (e) => {

        e.preventDefault();
        onSubmit(formData);
    };

    return (

        <form onSubmit={handleSubmit} className="dashboard-card">

            <h4 className="page-title">
                {initialData ? "Edit Vehicle" : "Add Vehicle"}
            </h4>

            <input
                name="vehicleNumber"
                placeholder="vehicleNumber"
                className="form-control mb-3"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
            />

            <input
                name="model"
                placeholder="model"
                className="form-control mb-3"
                value={formData.model}
                onChange={handleChange}
                required
            />

            <select
                name="fuelType"
                className="form-control mb-3"
                value={formData.fuelType}
                onChange={handleChange}
                required
            >
                <option value="">Select Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
            </select>

            <input
                type="number"
                placeholder="Year"
                name="year"
                className="form-control mb-3"
                value={formData.year}
                onChange={handleChange}
                required
            />

            <button className="btn btn-theme">
                Save Vehicle
            </button>

        </form>
    );
};

export default VehicleForm;
