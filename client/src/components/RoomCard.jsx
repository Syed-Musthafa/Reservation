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
                src={"https://png.pngtree.com/background/20230626/original/pngtree-a-stunning-3d-visualization-of-a-luxurious-blue-bedroom-suite-featuring-picture-image_4054942.jpg"}
                alt={room.name}
                className="w-48 h-36 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.description}</p>
                    <p className="text-sm font-semibold">{room.room_type}</p>


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
                        className="w-1/3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-3 font-semibold hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        See booking options
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RoomCard