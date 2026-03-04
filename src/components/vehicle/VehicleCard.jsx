// ============================================================
// VEHICLE CARD COMPONENT
// Displays vehicle details with actions
// ============================================================

const VehicleCard = ({ vehicle, onDelete, onEdit }) => {

    return (

        <div className="dashboard-card mb-3">

            <h5>{vehicle.vehicleNumber}</h5>

            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
            <p><strong>Year:</strong> {vehicle.year}</p>

            <button
                className="btn btn-warning me-2"
                onClick={() => onEdit(vehicle.vehicleId)}
            >
                Edit
            </button>

            <button
                className="btn btn-danger"
                onClick={() => onDelete(vehicle.vehicleId)}
            >
                Delete
            </button>

        </div>
    );
};

export default VehicleCard;
