// ============================================================
// CREATE BOOKING PAGE
// ============================================================

import { useNavigate } from "react-router-dom";
import BookingForm from "../../../components/booking/BookingForm";
import { createBooking } from "../../../services/bookingService";

const CreateBooking = () => {

    const navigate = useNavigate();

    const handleCreateBooking = async (formData) => {

        try {

            await createBooking(
                formData.vehicleId,
                formData.serviceId,
                {
                    bookingDate: formData.bookingDate,
                    slot: formData.slot
                }
            );

            alert("Booking Created Successfully");

            navigate("/bookings");

        }
        catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Booking failed";

            alert(message);
        }

    };

    return (
        <BookingForm onSubmit={handleCreateBooking} />
    );
};
console.log("BookingForm import working");


export default CreateBooking;
