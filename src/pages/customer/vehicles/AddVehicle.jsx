// ============================================================
// ADD VEHICLE PAGE
// ============================================================

import { useNavigate } from "react-router-dom";
import VehicleForm from "../../../components/vehicle/VehicleForm";
import { addVehicle } from "../../../services/vehicleService";

const AddVehicle = () => {

    const navigate = useNavigate();

    // ============================================================
    // Submit Vehicle
    // ============================================================

    const handleAddVehicle = async (vehicleData) => {

        try {

            await addVehicle(vehicleData);

            alert("Vehicle Added Successfully");

            navigate("/vehicles");

        }
        catch (error) {
            alert("Failed to add vehicle");
        }
    };

    return (
        <VehicleForm onSubmit={handleAddVehicle} />
    );
};

export default AddVehicle;
