import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to delete product");
      return;
    }
    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoaded(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
      return;
    }
  }

  return (
    <div className="w-full h-full relative p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Product List</h2>
      <Link
        to={"/admin/addProduct"}
        className="fixed md:absolute bottom-5 right-5 bg-gray-700 p-4 text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition-colors"
        aria-label="Add Product"
      >
        <FaPlus />
      </Link>

      {loaded ? (
        <>
          {/* Desktop Table */}
          <table className="hidden md:table w-full text-left border-collapse">
            <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Labeled Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-300 text-left cursor-pointer hover:bg-[#1e1e2f] hover:text-white"
                >
                  <td className="px-4 py-3">{product.productId}</td>
                  <td className="px-4 py-3">{product.productName}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.lebeledPrice}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4">
                      <FaRegTrashAlt
                        onClick={() => {
                          deleteProduct(product.productId);
                        }}
                        className="text-[25px] hover:text-red-500 cursor-pointer"
                        aria-label="Delete product"
                      />
                      <GrEdit
                        onClick={() => {
                          navigate("/admin/editProduct", {
                            state: product,
                          });
                        }}
                        className="text-[25px] hover:text-blue-500 cursor-pointer"
                        aria-label="Edit product"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-[#252636] rounded-md p-4 shadow-md text-white flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{product.productName}</span>
                  <div className="flex gap-3">
                    <FaRegTrashAlt
                      onClick={() => deleteProduct(product.productId)}
                      className="text-xl hover:text-red-500 cursor-pointer"
                      aria-label="Delete product"
                    />
                    <GrEdit
                      onClick={() =>
                        navigate("/admin/editProduct", {
                          state: product,
                        })
                      }
                      className="text-xl hover:text-blue-500 cursor-pointer"
                      aria-label="Edit product"
                    />
                  </div>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">ID: </span> {product.productId}
                  </p>
                  <p>
                    <span className="font-semibold">Price: </span> ${product.price}
                  </p>
                  <p>
                    <span className="font-semibold">Labeled Price: </span> ${product.lebeledPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Stock: </span> {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-[90%] flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
