import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers, FaFileInvoice, FaBars, FaTimes } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import AdminProductsPage from "./admin/products";
import AddProductPage from "./admin/addProduct";
import EditProductPage from "./admin/editProduct";
import AdminOrderPage from "./admin/adminOrder";
import AdminUsersPage from "./admin/getUser";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to access this page.");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.user.role == "admin") {
            setUserValidated(true);
        }else {
          toast.error("You do not have permission to access this page.");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error validating user:", error);
        toast.error("Failed to validate user.");
        navigate("/login");
      });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      {userValidated ? (
        <div className="flex flex-col md:flex-row h-screen bg-[#1e1e2f] text-white overflow-x-hidden">
          {/* Mobile Topbar */}
          <div className="md:hidden flex items-center justify-between bg-[#111827] px-4 py-3 shadow-lg">
            <div className="text-2xl font-bold">CBC</div>
            <button
              onClick={toggleSidebar}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Sidebar */}
          <aside
            className={`
              fixed top-0 left-0 z-50 h-full w-64 bg-[#111827] p-6 space-y-6 shadow-lg
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 md:static md:flex md:flex-col md:w-[180px]
              md:shrink-0
            `}
          >
            <div className="hidden md:block text-2xl font-bold text-white">CBC</div>
            <nav className="space-y-4 mt-4">
              <Link
                to="/admin/users"
                className="flex items-center text-gray-300 hover:text-white transition"
                onClick={() => setSidebarOpen(false)}
              >
                <FaUsers className="mr-3 text-lg" /> Users
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center text-gray-300 hover:text-white transition"
                onClick={() => setSidebarOpen(false)}
              >
                <MdWarehouse className="mr-3 text-lg" /> Products
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center text-gray-300 hover:text-white transition"
                onClick={() => setSidebarOpen(false)}
              >
                <FaFileInvoice className="mr-3 text-lg" /> Orders
              </Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-[#252636] min-w-0">
            {/* min-w-0 prevents flex overflow on smaller widths */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#2c2d3f]">
              <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
              <button
                className="text-sm text-gray-400 hover:text-black transition bg-white py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 text-white max-w-full">
              <Routes>
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/products" element={<AdminProductsPage />} />
                <Route path="/orders" element={<AdminOrderPage />} />
                <Route path="/addProduct" element={<AddProductPage />} />
                <Route path="/editProduct" element={<EditProductPage />} />
              </Routes>
            </main>
          </div>

          {/* Overlay for mobile sidebar when open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            ></div>
          )}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center bg-[#1e1e2f]">
          <Loader />
        </div>
      )}
    </>
  );
}