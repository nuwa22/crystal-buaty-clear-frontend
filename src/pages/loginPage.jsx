export default function LoginPage() {
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
                    <div className="w-[80%] flex flex-col items-center w-full">
                        <input type="email" placeholder="Email" className="w-[80%] p-2 border border-gray-300 rounded mb-4" />
                        <input type="password" placeholder="Password" className="w-[80%] p-2 border border-gray-300 rounded mb-4" />
                        <div className="w-[80%] flex justify-end mb-4">
                            <a href="#" className="text-gray-500 text-sm">Forgot Password?</a>
                        </div>
                        <button className="w-[80%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">Login</button>
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
                    <div className="mt-6">
                        <p className="text-gray-600">Don't have an account? <a href="#" className="text-blue-600">Sign Up</a></p>
                    </div>

                </div>

            </div>
        </div>
    );
}