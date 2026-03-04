// ============================================================
// VEHICLE LIST PAGE
// Fetch and display customer vehicles
// ============================================================

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VehicleCard from "../../../components/vehicle/VehicleCard";
import { deleteVehicle, getMyVehicles } from "../../../services/vehicleService";

const VehicleList = () => {

    const [vehicles, setVehicles] = useState([]);

    const navigate = useNavigate();

    // ============================================================
    // Fetch Vehicles
    // ============================================================

    const fetchVehicles = async () => {

        try {

            const data = await getMyVehicles();
            setVehicles(data);

        }
        catch (error) {
            alert("Failed to load vehicles");
        }
    };

    // Load vehicles on page load
    useEffect(() => {
        fetchVehicles();
    }, []);

    // ============================================================
    // Delete Vehicle
    // ============================================================

    const handleDelete = async (vehicleId) => {

        if (!window.confirm("Delete this vehicle?")) return;

        await deleteVehicle(vehicleId);

        fetchVehicles(); // Refresh list
    };

    // ============================================================
    // Edit Vehicle Navigation
    // ============================================================

    const handleEdit = (vehicleId) => {

        navigate(`/vehicles/edit/${vehicleId}`);
    };

    return (

        <div>

            <h2 className="page-title">My Vehicles</h2>

            <Link to="/vehicles/add" className="btn btn-theme mb-3">
                Add Vehicle
            </Link>

            {/* Vehicle Cards */}
            {vehicles.length === 0 ? (
                <p>No vehicles added yet.</p>
            ) : (
                vehicles.map(vehicle => (
                    <VehicleCard
                        key={vehicle.vehicleId}
                        vehicle={vehicle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))
            )}

        </div>
    );
};

export default VehicleList;
