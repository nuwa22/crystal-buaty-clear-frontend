import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      // OPTIONAL: Replace this with your backend endpoint
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("not implemented yet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-[#970747] mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#970747] focus:border-[#970747]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#970747] focus:border-[#970747]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#970747] focus:border-[#970747]"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#970747] text-white py-2 px-4 rounded-md hover:bg-[#7b053b] transition duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
