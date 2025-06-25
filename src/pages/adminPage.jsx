import { Link, Route, Routes } from "react-router-dom";
import { FaUsers, FaFileInvoice } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import AdminProductsPage from "./admin/products";
import AddProductPage from "./admin/addProduct";
import EditProductPage from "./admin/editProduct";

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-[#1e1e2f] text-white">
        <div className="w-[260px] bg-[#111827] p-6 flex flex-col space-y-6 shadow-lg">
            <div className="text-2xl font-bold text-white">CBC</div>
                <div className="space-y-4 mt-4">
                    <Link to="/admin/users" className="flex items-center text-gray-300 hover:text-white transition">
                    <FaUsers className="mr-3 text-lg" /> Users </Link>
                    <Link to="/admin/products" className="flex items-center text-gray-300 hover:text-white transition">
                    <MdWarehouse className="mr-3 text-lg" /> Products </Link>
                    <Link to="/admin/orders" className="flex items-center text-gray-300 hover:text-white transition">
                    <FaFileInvoice className="mr-3 text-lg" /> Orders </Link>
                </div>
            </div>

            <div className="flex-1 flex flex-col bg-[#252636]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#2c2d3f]">
                    <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <BiBell className="text-2xl text-gray-400 hover:text-white cursor-pointer" />
                        <div className="text-left">
                            <p className="text-sm font-medium text-white">Suresh Nuwan</p>
                            <p className="text-xs text-gray-400">Admin</p>
                        </div>
                    </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 text-white">
                <Routes>
                    <Route path="/users" element={<h1 className="text-lg">Users</h1>} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/orders" element={<h1 className="text-lg">Orders</h1>} />
                    <Route path="/addProduct" element={<AddProductPage />} />
                    <Route path="/editProduct" element={<EditProductPage />} />
                </Routes>
            </div>
        </div>
    </div>
  );
}
