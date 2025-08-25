import React from 'react'
import { useNavigate } from 'react-router-dom';

function RoomCard({ room }) {

    const navigate = useNavigate();

    const ratingScore = 9.5

    return (
        <div
            key={room.id}
            className="flex gap-6 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
            <img
                src={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"}
                alt={room.name}
                className="w-48 h-36 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.description}</p>
                    {/* <p className="text-xs text-gray-400 mb-2">
                        data
                    </p> */}
                    <p className="text-sm font-semibold">{room.room_type}</p>
                    {/* <p className="text-sm text-gray-600">{room.bed}</p>
                    <p className="text-sm text-gray-600">{room.bathroom}</p> */}


                </div>

                <div className="flex justify-between items-center mt-4">

                    <div className="flex items-center gap-3">
                        <div
                            className={`text-sm font-semibold rounded-full px-3 py-1 ${ratingScore >= 9
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {ratingScore}
                        </div>
                        <div className="text-xs text-gray-600">Excellent</div>
                        <div className="text-xs text-gray-400">
                            (200 reviews)
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(`/room/${room.id}`)}
                        className="ml-6 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                        See booking options
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoomCard