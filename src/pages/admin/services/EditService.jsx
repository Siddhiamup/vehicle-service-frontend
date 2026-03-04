// ============================================================
// EDIT SERVICE PAGE (ADMIN)
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllServices, updateService } from "../../../services/serviceMasterService";

const EditService = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceId: "",
    serviceName: "",
    durationHours: "",
    price: ""
  });

  // ============================================================
  // LOAD SERVICE DETAILS
  // ============================================================

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const services = await getAllServices();
    const service = services.find(s => s.serviceId === Number(id));
    setFormData(service);
  };

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
  // UPDATE SERVICE
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateService(formData);
      alert("Service updated successfully");
      navigate("/services");
    } catch {
      alert("Update failed");
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="form-container">

      <h2 className="page-title">Edit Service</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="serviceName"
          className="form-control mb-3"
          value={formData.serviceName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="durationHours"
          className="form-control mb-3"
          value={formData.durationHours}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          value={formData.price}
          onChange={handleChange}
        />

        <button className="btn btn-theme">
          Update Service
        </button>

      </form>

    </div>
  );
};

export default EditService;
