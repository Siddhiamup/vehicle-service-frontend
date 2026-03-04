// ============================================================
// ADD SERVICE PAGE (ADMIN)
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addService } from "../../../services/serviceMasterService";

const AddService = () => {

  const navigate = useNavigate();

  // ============================================================
  // FORM STATE
  // ============================================================

  const [formData, setFormData] = useState({
    serviceName: "",
    durationHours: "",
    price: ""
  });

  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ============================================================
  // SUBMIT FORM
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addService(formData);
      alert("Service added successfully");
      navigate("/services");
    } catch (error) {
      alert("Failed to add service");
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="form-container">

      <h2 className="page-title">Add Service</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="serviceName"
          className="form-control mb-3"
          placeholder="Service Name"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="durationHours"
          className="form-control mb-3"
          placeholder="Duration (Hours)"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          placeholder="Price"
          required
          onChange={handleChange}
        />

        <button className="btn btn-theme">
          Add Service
        </button>

      </form>

    </div>
  );
};

export default AddService;
