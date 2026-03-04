// ============================================================
// EDIT VEHICLE PAGE
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VehicleForm from "../../../components/vehicle/VehicleForm";
import { getMyVehicles, updateVehicle } from "../../../services/vehicleService";

const EditVehicle = () => {

    const { id } = useParams();

    const [vehicleData, setVehicleData] = useState(null);

    const navigate = useNavigate();

    // ============================================================
    // Fetch Existing Vehicle
    // ============================================================

    const fetchVehicle = async () => {

        const vehicles = await getMyVehicles();

        const vehicle = vehicles.find(v => v.vehicleId === Number(id));

        setVehicleData(vehicle);
    };

    useEffect(() => {
        fetchVehicle();
    }, []);

    // ============================================================
    // Submit Update
    // ============================================================

    const handleUpdate = async (data) => {

        await updateVehicle(id, data);

        alert("Vehicle Updated");

        navigate("/vehicles");
    };

    if (!vehicleData) return <p>Loading...</p>;

    return (
        <VehicleForm
            onSubmit={handleUpdate}
            initialData={vehicleData}
        />
    );
};

export default EditVehicle;
