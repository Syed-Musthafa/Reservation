import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (

        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
            <div className="text-xl font-bold">Comcast</div>
            <div className="flex space-x-8 text-gray-700">
                {/* <li className="hover:text-blue-600 cursor-pointer">Rooms</li>
                <li className="hover:text-blue-600 cursor-pointer">My Bookings</li> */}
                <Link to="/rooms" className="hover:text-blue-600 cursor-pointer">Rooms</Link>
                <Link to="/bookings" className="hover:text-blue-600 cursor-pointer">My Bookings</Link>

            </div>
            <div className="space-x-4">

            </div>
        </nav>
    )
}

export default NavBar