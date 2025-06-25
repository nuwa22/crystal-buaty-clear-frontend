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

    useEffect(
        ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                (response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setLoaded(true);
                    }
                )
            }
            
        },
        [loaded]
    )

    async function deleteProduct(id){
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login to delete product");
            return
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
        setLoaded(false);
        toast.success("Product deleted successfully");
        }catch(error) {
            console.error(error);
            toast.error("Failed to delete product");
            return;
        }
            
    }
    

    return (
        <div className="w-full h-full relative">
            <h2 className="text-2xl font-semibold mb-6">Product List</h2>
            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
                <FaPlus  />
            </Link>
            {loaded &&<table className="w-full text-left border-collapse">
                <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
                    <tr>
                        {/* productId, Name, price, lebeledPrice, stock */}
                        <th className="px-4 py-3">Product ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Labeled Price</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    products.map(
                        (product, index) => {
                            return (
                                    <tr key={index} className="border-b-2 border-gray-300 text-left cursor-pointer hover:bg-[#1e1e2f] hover:text-white">
                                        <td className="px-4 py-3">{product.productId}</td>
                                        <td className="px-4 py-3">{product.productName}</td>
                                        <td className="px-4 py-3">{product.price}</td>
                                        <td className="px-4 py-3">{product.lebeledPrice}</td>
                                        <td className="px-4 py-3">{product.stock}</td>
                                        <td className="px-4 py-3">
                                            <div className="w-full h-full flex">
                                               <FaRegTrashAlt onClick={() =>{
                                                    deleteProduct(product.productId);
                                               }} className="text-[25px] m-[10px] hover:text-red-500" />
                                               <GrEdit onClick={
                                                () => {
                                                    // Load edit product page
                                                    navigate("/admin/editProduct", {
                                                        state: product
                                                    })
                                                }
                                               } className="text-[25px] m-[10px] hover:text-blue-500"/>
                                            </div>
                                        </td>
                                    </tr>
                            )
                        }
                    )}
                </tbody>
            </table>}
            {
                !loaded && 
                <div className="w-full h-[90%] flex justify-center items-center">
                    <Loader />
                </div>
            }
            
        </div>
    );
} 