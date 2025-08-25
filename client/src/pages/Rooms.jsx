import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RoomCard from "../components/RoomCard";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRooms } from "../api/room";
import { toast } from "react-toastify";

function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        setLoading(true);

        (async () => {
            try {
                const response = await fetchRooms();
                setRooms(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);

            // Optionally clear the state so toast doesn't show on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    if (loading) return <div className="p-6">Loading rooms...</div>;

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-6xl mx-auto px-8 py-10">
                {/* Hotels list */}
                <div className="space-y-8">
                    {rooms?.map((item) => (
                        <RoomCard room={item} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Rooms;
