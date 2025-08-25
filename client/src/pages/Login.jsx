import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.accessToken);
            toast.success("Login Success!", { autoClose: 3000 });

            navigate('/rooms');
        } catch (err) {
            setError(err.message);
            toast.error(`${err.message}`, { autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg border border-gray-200">


                <h2 className="text-gray-900 text-2xl font-bold mb-2 text-center">
                    Login
                </h2>
                <p className="text-gray-600 text-center mb-6">Welcome back, please login</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />



                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-3 font-semibold hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/" className="underline text-blue-600 hover:text-blue-800">
                        Create one
                    </Link>
                </p>

            </div>
            <ToastContainer />
        </div>
    );
}


export default Login
