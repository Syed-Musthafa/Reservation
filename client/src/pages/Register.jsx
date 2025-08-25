import React from 'react'
import { Link } from "react-router-dom";

function Register() {
    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg border border-gray-200">


                <h2 className="text-gray-900 text-2xl font-bold mb-2 text-center">
                    Create Account
                </h2>
                <p className="text-gray-600 text-center mb-6">Create your account</p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="sr-only">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Full Name"
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
        </div>
    );

}

export default Register
