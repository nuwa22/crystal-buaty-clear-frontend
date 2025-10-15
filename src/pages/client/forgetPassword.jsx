import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendEmail(){
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/send-mail", {
      email: email
    }).then((res) => {
      console.log(res.data);
      setEmailSend(true);
      toast.success("OTP sent to your email");
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to send OTP");
    });
  }

  function changePassword(){
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password do not match");
      return;
    }
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/change-password", {
      otp: otp,
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data);
      toast.success("Password changed successfully");
      window.location = "/login";
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to change password");
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {emailSend ? (
        // OTP and Reset Password Form
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#970747] text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Enter the OTP sent to <span className="font-semibold">{email}</span> and set your new password.
          </p>

          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970747]"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970747]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970747]"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          <button
            onClick={changePassword}
            type="submit"
            className="w-full bg-[#970747] text-white py-2 rounded-lg cursor-pointer font-semibold hover:bg-[#7e053c] transition duration-300"
          >
            Reset Password
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setEmailSend(false)}
              className="text-[#970747] font-medium hover:underline cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        // Email Send Form
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#970747] text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Enter your registered email to receive a password reset OTP.
          </p>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970747]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button
            type="button"
            onClick={sendEmail}
            className="w-full bg-[#970747] cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-[#7e053c] transition duration-300"
            
          >
            Send OTP
          </button>

          <div className="mt-6 text-center">
            <a href="/login" className="text-[#970747] cursor-pointer font-medium hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
