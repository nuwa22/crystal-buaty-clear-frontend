import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                (response) => {
                    console.log(response.data);
                    setProducts(response.data);
                }
            )
        },
        []
    )

    

    return (
        <div className="w-full h-full relative">
            <h2 className="text-2xl font-semibold mb-6">Product List</h2>
            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
                <FaPlus  />
            </Link>
            <table className="w-full text-left border-collapse">
                <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
                    <tr>
                        {/* productId, Name, price, lebeledPrice, stock */}
                        <th className="px-4 py-3">Product ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Labeled Price</th>
                        <th className="px-4 py-3">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    products.map(
                        (product, index) => {
                            console.log("mapping product", product.productId);

                            return (
                                    <tr key={index} className="border-b-2 border-gray-300 text-left cursor-pointer hover:bg-gray-700 hover:text-white">
                                        <td className="px-4 py-3">{product.productId}</td>
                                        <td className="px-4 py-3">{product.productName}</td>
                                        <td className="px-4 py-3">{product.price}</td>
                                        <td className="px-4 py-3">{product.lebeledPrice}</td>
                                        <td className="px-4 py-3">{product.stock}</td>
                                    </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            
        </div>
    );
} 