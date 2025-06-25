import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        role: "user",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleRegister() {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        const payload = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            password: formData.password,
            phone: formData.phone
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user", payload)
        .then(() => {
            toast.success("Registered successfully");
            navigate("/login");
        }).catch((error) => {
            console.log("Registration failed", error.response?.data);
            toast.error(error.response?.data?.message || "Registration failed");
        })
        .finally(() => 
            setLoading(false));
    }

    return (
        <div className="w-full min-h-screen bg-gray-300 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-[30px] shadow-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Side */}
                <div className="md:w-1/2 w-full h-60 md:h-auto bg-red-900 flex items-center justify-center">
                    <h1 className="text-white text-3xl font-bold">Left Side</h1>
                </div>

                {/* Right Side */}
                <div className="md:w-1/2 w-full p-6 flex flex-col items-center justify-center">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                        <p className="text-gray-600">Please fill in the details below</p>
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <input name="firstName" onChange={handleChange} type="text" placeholder="First Name" className="w-[80%] p-2 border border-gray-300 rounded mb-3" />
                        <input name="lastName" onChange={handleChange} type="text" placeholder="Last Name" className="w-[80%] p-2 border border-gray-300 rounded mb-3" />
                        <input name="email" onChange={handleChange} type="email" placeholder="Email" className="w-[80%] p-2 border border-gray-300 rounded mb-3" />
                        <input name="phone" onChange={handleChange} type="text" placeholder="Phone" className="w-[80%] p-2 border border-gray-300 rounded mb-3" />
                        <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-[80%] p-2 border border-gray-300 rounded mb-3" />
                        <input name="confirmPassword" onChange={handleChange} type="password" placeholder="Confirm Password" className="w-[80%] p-2 border border-gray-300 rounded mb-4" />

                        <button
                            onClick={handleRegister}
                            className="w-[80%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>

                    <div className="w-[80%] flex items-center justify-between mt-6">
                        <hr className="w-[35%] border-gray-300" />
                        <span className="text-gray-500 text-sm">Or Login with</span>
                        <hr className="w-[35%] border-gray-300" />
                    </div>

                    {/* Google Login */}
                    <div className="flex items-center justify-center mt-4 w-[80%]">
                        <button className="w-full bg-transparent text-black p-2 rounded border border-gray-300">
                            Google
                        </button>
                    </div>

                    <div className="mt-6 flex items-center justify-center text-sm">
                        <p className="text-gray-600">Already have an account?</p>
                        &nbsp;
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                            Login Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
