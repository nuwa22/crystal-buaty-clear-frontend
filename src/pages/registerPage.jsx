import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    
    const googleLogin = useGoogleLogin({
        onSuccess: (res) => {
            setLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                accessToken: res.access_token,  
            }).then((response) => {
                console.log("Login successfully", response.data);
                toast.success("Login successfully");
                localStorage.setItem("token", response.data.token);
                
                const user = response.data.user;
                if(user.role === "admin"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
                setLoading(false);
            }).catch((error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            });
        }
    });

    function validateForm() {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    }

    function handleRegister() {
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
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
        };
        
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user", payload)
        .then(() => {
            toast.success("Registered successfully");
            navigate("/login");
        }).catch((error) => {
            console.log("Registration failed", error.response?.data);
            toast.error(error.response?.data?.message || "Registration failed");
        })
        .finally(() => setLoading(false));
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-2 sm:p-4">
            <div className="
                w-full max-w-6xl bg-white rounded-2xl sm:rounded-[30px] shadow-xl 
                flex flex-col lg:flex-row overflow-hidden
                min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]
            ">
                {/* Left Side - Hero Section */}
                <div className="
                    lg:w-1/2 w-full 
                    h-48 sm:h-60 lg:h-auto 
                    bg-gradient-to-br from-red-900 via-red-800 to-red-700
                    flex flex-col items-center justify-center 
                    p-6 sm:p-8 lg:p-12
                    relative overflow-hidden
                ">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="text-center z-10">
                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                            left side
                        </h1>
                        
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="
                    lg:w-1/2 w-full 
                    p-4 sm:p-6 lg:p-8 xl:p-12
                    flex flex-col justify-center
                    overflow-y-auto
                ">
                    {/* Header */}
                    <div className="text-center mb-6 lg:mb-8">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Please fill in the details below
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full space-y-4 sm:space-y-5">
                        {/* First Name & Last Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <input
                                    name="firstName"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="First Name"
                                    className={`
                                        w-full p-3 sm:p-4 border rounded-lg sm:rounded-xl
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition-all duration-300
                                        text-sm sm:text-base
                                        ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                    `}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    name="lastName"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Last Name"
                                    className={`
                                        w-full p-3 sm:p-4 border rounded-lg sm:rounded-xl
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition-all duration-300
                                        text-sm sm:text-base
                                        ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                    `}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                                placeholder="Email Address"
                                className={`
                                    w-full p-3 sm:p-4 border rounded-lg sm:rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-300
                                    text-sm sm:text-base
                                    ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                `}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <input
                                name="phone"
                                onChange={handleChange}
                                type="tel"
                                placeholder="Phone Number"
                                className={`
                                    w-full p-3 sm:p-4 border rounded-lg sm:rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-300
                                    text-sm sm:text-base
                                    ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                `}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                name="password"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className={`
                                    w-full p-3 sm:p-4 pr-12 border rounded-lg sm:rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-300
                                    text-sm sm:text-base
                                    ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                `}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                name="confirmPassword"
                                onChange={handleChange}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className={`
                                    w-full p-3 sm:p-4 pr-12 border rounded-lg sm:rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-300
                                    text-sm sm:text-base
                                    ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
                                `}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="
                                w-full bg-gradient-to-r from-blue-600 to-blue-700 
                                hover:from-blue-700 hover:to-blue-800
                                disabled:from-gray-400 disabled:to-gray-500
                                text-white p-3 sm:p-4 rounded-lg sm:rounded-xl 
                                font-semibold text-sm sm:text-base
                                transition-all duration-300 
                                transform hover:scale-[1.02] disabled:hover:scale-100
                                focus:outline-none focus:ring-4 focus:ring-blue-300
                                shadow-lg hover:shadow-xl
                            "
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Registering...
                                </div>
                            ) : "Create Account"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center justify-center my-6">
                            <hr className="flex-1 border-gray-300" />
                            <span className="mx-4 text-gray-500 text-sm font-medium">Or continue with</span>
                            <hr className="flex-1 border-gray-300" />
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={googleLogin}
                            disabled={loading}
                            className="
                                w-full bg-white border-2 border-gray-300 
                                hover:border-gray-400 hover:bg-gray-50
                                disabled:bg-gray-100 disabled:border-gray-200
                                text-gray-700 p-3 sm:p-4 rounded-lg sm:rounded-xl 
                                font-semibold text-sm sm:text-base
                                transition-all duration-300 
                                flex items-center justify-center
                                focus:outline-none focus:ring-4 focus:ring-gray-300
                                shadow-sm hover:shadow-md
                            "
                        >
                            <GrGoogle className="text-xl mr-3 text-gray-600" />
                            {loading ? "Loading..." : "Register with Google"}
                        </button>

                        {/* Login Link */}
                        <div className="text-center mt-6 pt-4 border-t border-gray-200">
                            <p className="text-gray-600 text-sm sm:text-base">
                                Already have an account?{" "}
                                <Link 
                                    to="/login" 
                                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-300"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}