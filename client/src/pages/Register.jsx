import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { register } from '../api/auth';
import { toast } from 'react-toastify';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await register(name, email, password);
            localStorage.setItem("token", data.data.accessToken);
            toast.success("Account Created Success!", { autoClose: 3000 });
            navigate("/rooms");
        } catch (err) {
            setError(err.message);
            toast.error(`${err.message}`, { autoClose: 3000 });
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg border border-gray-200">


                <h2 className="text-gray-900 text-2xl font-bold mb-2 text-center">
                    Create Account
                </h2>
                <p className="text-gray-600 text-center mb-6">Create your account</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="sr-only">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email id
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-3 font-semibold hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="underline text-blue-600 hover:text-blue-800">
                        Login here
                    </Link>
                </p>
            </div>

            <ToastContainer />
        </div>
    );

}

export default Register
