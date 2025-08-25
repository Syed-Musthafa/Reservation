import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import RoomCard from '../components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { fetchRooms } from '../api/room';

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
                console.log("data", response)
                setRooms(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    console.log("rooms", rooms)


    if (loading) return <div className="p-6">Loading rooms...</div>;


    // const hotels = [
    //     {
    //         id: 1,
    //         name: "Hotel Norrebro",
    //         distance: "0.4 km from city centre",
    //         cancellation: "Free cancellation",
    //         breakfast: "Breakfast included",
    //         roomType: "Comfort room",
    //         bed: "1x king size bed",
    //         bathroom: "1x bathroom",
    //         ratingText: "Excellent",
    //         ratingScore: 9.6,
    //         ratingCount: 1920,
    //         price: 180,
    //         nights: 3,
    //         guests: 2,
    //         tags: ["#Hot deal", "#Popular"],
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1560448072-748a1f6d0d0b?auto=format&fit=crop&w=800&q=80",
    //     },
    //     {
    //         id: 2,
    //         name: "Hotel Apple",
    //         distance: "0.6 km from city centre",
    //         cancellation: "Free airport shuttle",
    //         breakfast: "Breakfast included",
    //         roomType: "Standard room",
    //         bed: "1x queen size bed",
    //         bathroom: "1x bathroom",
    //         ratingText: "Good",
    //         ratingScore: 8.3,
    //         ratingCount: 792,
    //         price: 260,
    //         nights: 3,
    //         guests: 2,
    //         tags: ["#Hot deal"],
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1501183638714-3c2723f1f4e2?auto=format&fit=crop&w=800&q=80",
    //     },
    //     {
    //         id: 3,
    //         name: "Hotel Little Mermaid",
    //         distance: "2.0 km from city centre",
    //         cancellation: "Breakfast included",
    //         breakfast: "Breakfast included",
    //         roomType: "Premium room",
    //         bed: "1x king size bed",
    //         bathroom: "1x bathroom",
    //         ratingText: "Excellent",
    //         ratingScore: 9.5,
    //         ratingCount: 2000,
    //         price: 420,
    //         nights: 3,
    //         guests: 2,
    //         tags: [],
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    //     },
    // ];

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

export default Rooms
