export default function ForgetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#970747] text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Enter your registered email to reset your password.
        </p>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970747]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#970747] text-white py-2 rounded-lg font-semibold hover:bg-[#7e053c] transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-[#970747] font-medium hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
