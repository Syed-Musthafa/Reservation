import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (

        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
            <div className="text-xl font-bold">Reservation</div>
            <div className="flex space-x-8 text-gray-700">
                <Link to="/rooms" className="hover:text-blue-600 cursor-pointer">Rooms</Link>
                <Link to="/bookings" className="hover:text-blue-600 cursor-pointer">My Bookings</Link>

            </div>
            <div className="space-x-4">
                {
                    token && (
                        <svg
                            onClick={handleLogout}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400 transition duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                            />
                        </svg>
                    )}


            </div>
        </nav>
    )
}

export default NavBar