import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
          accessToken: res.access_token,
        })
        .then((response) => {
          console.log("Login successfully", response.data);
          toast.success("Login successfully");
          localStorage.setItem("token", response.data.token);

          const user = response.data.user;
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("Login failed", error.response.data);
          toast.error(error.response.data.message || "Login failed");
          setLoading(false);
        });
    },
  });

  function handleLogin() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login successfully", response.data);
        toast.success("Login successfully");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Login failed", error.response.data);
        toast.error(error.response.data.message || "Login failed");
        setLoading(false);
      });
  }

  return (
    <div className="w-full min-h-screen bg-gray-300 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-5xl bg-white rounded-[30px] shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-[50%] h-[200px] md:h-auto bg-red-900 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Welcome to CBC</h1>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[50%] p-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Please login to your account</p>
          </div>

          <div className="flex flex-col items-center w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full md:w-[80%] p-2 border border-gray-300 rounded mb-4"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full md:w-[80%] p-2 border border-gray-300 rounded mb-4"
            />
            <div className="w-full md:w-[80%] flex justify-end mb-4">
              <a href="#" className="text-gray-500 text-sm">
                Forgot Password?
              </a>
            </div>
            <button
              onClick={handleLogin}
              className="w-full md:w-[80%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <div className="w-full md:w-[80%] flex items-center justify-between mt-4">
            <hr className="w-[35%] border-gray-300" />
            <span className="text-gray-500">Or Login with</span>
            <hr className="w-[35%] border-gray-300" />
          </div>

          {/* Google Login */}
          <div className="flex items-center justify-center mt-4 w-full md:w-[80%]">
            <button
              className="w-full bg-transparent text-black p-2 border border-gray-300 flex items-center justify-center rounded"
              onClick={googleLogin}
            >
              <GrGoogle className="text-xl mr-2 text-gray-600" />
              {loading ? "Loading..." : "Login with Google"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <p className="text-gray-600">Don't have an account?</p>
            &nbsp;
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
