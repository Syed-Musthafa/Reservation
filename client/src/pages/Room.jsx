import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking, fetchRoomById } from "../api/room";
import { toast, ToastContainer } from "react-toastify";

function Room() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [slotLoading, setSlotLoading] = useState(false);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // returns 'YYYY-MM-DD'
    };

    const [date, setDate] = useState(getTodayDate());


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        (async () => {
            try {
                const response = await fetchRoomById(id);
                setRoom(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigate]);

    const handleBooking = async () => {
        setSlotLoading(true);

        try {
            const data = await createBooking(parseInt(id), fromTime, toTime, date);
            toast.success("Booking successful!", { autoClose: 3000 });
            navigate(`/rooms`);
        } catch (err) {
            toast.error(`${err.message}`, { autoClose: 3000 });
        } finally {
            setSlotLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading room details...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg  p-6 my-10">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-1/2 rounded-lg overflow-hidden shadow-md">
                    <img
                        src="https://png.pngtree.com/background/20230626/original/pngtree-a-stunning-3d-visualization-of-a-luxurious-blue-bedroom-suite-featuring-picture-image_4054942.jpg"
                        alt="Presidential suite"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 flex items-center">
                            {room.name}
                        </h2>

                        <div className="mb-6 text-gray-600">
                            <p className="flex items-center gap-2 mb-1">{room.description}</p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="mt-6 border-t pt-4">
                        <p className="font-semibold mb-2">Facilities:</p>
                        <div className="flex gap-4 text-gray-700">
                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h2l3 6h8l3-6h2"
                                    />
                                </svg>
                                Transfer
                            </span>

                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m4-4V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6m0 0l3 3m-3-3h12"
                                    />
                                </svg>
                                Televison
                            </span>

                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 17l6-6m0 0l-6-6m6 6H3"
                                    />
                                </svg>
                                customer care
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Replaced left side with input boxes */}
                <div className="flex items-center gap-4 text-gray-700">
                    <div>
                        <label className="block text-sm font-medium mb-1">From time</label>
                        <input
                            type="time"
                            step="1"
                            value={fromTime}
                            onChange={(e) => setFromTime(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">To time</label>
                        <input
                            type="time"
                            step="1"
                            value={toTime}
                            onChange={(e) => setToTime(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                    </div>
                </div>

                {/* Price + Reserve Button */}
                <div className="flex items-center gap-6">
                    <div>
                        <span className="text-2xl font-bold">$390,00</span>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={slotLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-3 px-3 font-semibold hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        {slotLoading ? "Reserving..." : "Reserve"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Room;
