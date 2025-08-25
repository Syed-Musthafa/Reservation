import { useEffect, useState } from "react";
import { cancelBooking, getUserBookings } from "../api/room";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Bookings = () => {


    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getUserBookings();
                setBookings(response.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {


        try {
            await cancelBooking(bookingId);
            toast.success("Booking cancelled successfully!", { autoClose: 3000 });
            setBookings(bookings.map(booking => booking.booking_id === bookingId ? { ...booking, status: 0 } : booking))

        } catch (err) {
            setError(err.message);
            toast.error(`${err.message}`, { autoClose: 3000 });
        }
    };

    if (loading) return <div className="p-6">Loading your bookings...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    if (bookings.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-semibold text-gray-700">No Bookings Found</h2>
                <p className="text-gray-500 mt-2">You haven’t made any bookings yet.</p>
            </div>
        );
    }

    return (

        <div className="bg-white rounded-lg  max-w-2xl mx-auto p-4">
            {bookings.map((item, idx) => (
                <div key={idx} className="flex items-center py-4 border-b last:border-b-0">
                    <img src={"https://png.pngtree.com/background/20230626/original/pngtree-a-stunning-3d-visualization-of-a-luxurious-blue-bedroom-suite-featuring-picture-image_4054942.jpg"} alt={item.name} className="w-24 h-20 rounded-lg object-cover mr-4" />
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center">
                            <span className="font-semibold">{item.room_name}</span>

                        </div>
                        <span className="text-sm text-gray-500">{item.description}</span>
                        <span className="text-sm">
                            From: <span className="text-blue-600">{item.from_time}</span>, To: <span className="text-purple-600">{item.to_time}</span>
                        </span>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <div>Booking date</div>
                        <span className="font-semibold text-gray-700 mt-2">{(item.booking_date).split("T")[0]}</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <span
                            className={`flex items-center text-sm ${item.status === 1 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="10" />
                            </svg>
                            {item.status === 1 ? "Confirmed" : "Canceled"}
                        </span>
                        <div className="flex space-x-2 text-gray-400">

                            <button
                                // onClick={() => navigate(`/room/${room.id}`)}
                                className="hover:text-yellow-600" title="Edit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536-10.036 10.036a2 2 0 0 1-1.071.553l-4.243.707a1 1 0 0 1-1.179-1.179l.707-4.243a2 2 0 0 1 .553-1.071l10.036-10.036zm5.303-2.119a1.5 1.5 0 1 1 2.121 2.121l-1.5 1.5-2.121-2.121 1.5-1.5z" /></svg></button>

                            <button
                                disabled={item.status === 0}
                                onClick={() => handleCancel(item.booking_id)}
                                className="hover:text-red-600" title="Delete"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5 0V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg></button>
                        </div>
                    </div>
                </div>

            ))}
            <ToastContainer />
        </div>
    );
}




export default Bookings
