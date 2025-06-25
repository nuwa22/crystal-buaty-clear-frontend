import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogin(){
        setLoading(true);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password
        }).then(
            (response) => {
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
            }
        ).catch(
            (error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            }
            
        )

    }
    return (
        <div className= "w-full h-screen bg-gray-300 bg-cover bg-center flex items-center justify-center">
            <div className="w-[70%] h-[90%] bg-white rounded-[30px] shadow-lg  flex ">
                {/* Left Side */}
                <div className="w-[50%] h-full bg-red-900 rounded-l-[30px] flex items-center justify-center ">
                    <h1 className="text-white text-3xl font-bold">Left Side</h1>
                </div>
                {/* Right Side */}
                <div className="w-[50%] h-full rounded-r-[30px] flex flex-col items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
                        <p className="text-gray-600 mb-6">Please login to your account</p>
                    </div>
                    {/*Input Section */}
                    <div className="flex flex-col items-center w-full">
                        <input onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }
                        type="email" placeholder="Email" className="w-[80%] p-2 border border-gray-300 rounded mb-4" />
                        <input onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        } type="password" placeholder="Password" className="w-[80%] p-2 border border-gray-300 rounded mb-4" />
                        <div className="w-[80%] flex justify-end mb-4">
                            <a href="#" className="text-gray-500 text-sm">Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin}
                        className="w-[80%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 cursor-pointer">
                            {
                                loading? "Loading...": "Login"
                            }
                        </button>
                        
                    </div>
                    <div className="w-[80%] flex items-center justify-between mt-4">
                        <hr className="w-[35%] border-gray-300" />
                        <span className="text-gray-500">Or Login with</span>
                        <hr className="w-[35%] border-gray-300" />
                    </div>
                    {/* Goodle Login */}
                    <div className="flex items-center justify-center mt-4 w-[80%]">
                        <button className=" w-full bg-transparent text-black p-2 rounded ml-2 border border-gray-300">Google</button>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                        <p className="text-gray-600">Don't have an account?</p>
                        &nbsp;
                        <span className="text-blue-500 cursor-pointer hover:text-blue-700">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
}