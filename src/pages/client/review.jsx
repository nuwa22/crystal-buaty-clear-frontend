import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 0 });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setRating = (value) => {
    setForm({ ...form, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.review || form.rating === 0) {
      toast.error("Please complete all fields and give a rating.");
      return;
    }

    try {
      setLoading(true);

      // Optional: Send to backend
      // await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/review", form);

      // Add to local list
      setReviews([...reviews, form]);
      toast.success("Review submitted!");

      setForm({ name: "", review: "", rating: 0 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 mb-10">
        <h2 className="text-3xl font-bold text-[#970747] mb-6 text-center">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-[#970747] focus:border-[#970747]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-[#970747] focus:border-[#970747]"
              placeholder="Write your thoughts..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <AiFillStar
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    form.rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#970747] text-white py-2 rounded hover:bg-[#7b053b] transition"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-[#970747] mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg text-[#333]">{rev.name}</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <AiFillStar
                      key={s}
                      className={`text-sm ${
                        s <= rev.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{rev.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
