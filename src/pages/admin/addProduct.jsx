import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/meadiaUpload";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [altName, setAltName] = useState("");
  const [price, setPrice] = useState("");
  const [lebeledPrice, setLebeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      const promise = mediaUpload(images[i]);
      promisesArray[i] = promise;
    }
    try {
      const result = await Promise.all(promisesArray);

      const altNameInArray = altName.split(",");
      const product = {
        productId: productId,
        productName: productName,
        altName: altNameInArray,
        price: price,
        lebeledPrice: lebeledPrice,
        description: description,
        stock: stock,
        images: result,
      };

      const tocken = localStorage.getItem("token");

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
        headers: {
          Authorization: `Bearer ${tocken}`,
        },
      });
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Product added failed");
    }
  }

  return (
    <div className="w-full h-full px-4 py-6 flex justify-center">
      {/* Make this container max width 100% on mobile and 50% on md+ screens */}
      <div className="w-full md:w-1/2 flex flex-col p-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center">Add Product</h2>
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          placeholder="Product ID"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={altName}
          onChange={(e) => setAltName(e.target.value)}
          type="text"
          placeholder="Alternative Names"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price (Rs)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={lebeledPrice}
          onChange={(e) => setLebeledPrice(e.target.value)}
          type="number"
          placeholder="Labelled Price (Rs)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full min-h-[120px] p-3 mb-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 text-white"
        />
        <input
          onChange={(e) => setImages(e.target.files)}
          multiple
          type="file"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          placeholder="Stock"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
          <Link
            to="/admin/products"
            className="w-full sm:w-[180px] bg-red-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-red-600 text-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-[180px] bg-green-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-green-600 text-center"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
