// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

    const token = localStorage.getItem("token");


    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                {
                    token ? "you're not authorized please login or create account" :
                        "Oops! The page you're looking for doesn't exist."
                }

            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >

                Go to Main
            </Link>
        </div>
    );
}


export default NotFound
