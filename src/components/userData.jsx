import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);

    return (
        user == null ?(
            <div className="h-full flex justify-center items-center flex-row">
                <Link to="/login" className="bg-white text-[#970747] px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-300">Login</Link>
                <Link to="/register" className="ml-4 border border-white border-2 text-white px-4 py-2 rounded-md hover:border-gray-300 transition-all duration-300">Register</Link>
            </div>
        ) : (
            
            <div className="h-full flex justify-center items-center flex-row">
                <button className="border border-white border-2 text-white px-4 py-2 rounded-md hover:border-gray-300 transition-all duration-300" onClick={() => {
                   localStorage.removeItem("token")
                   setUser(null);
                   window.location = "/login"; 
                }}>Logout</button>
            </div>
        )
    )
}