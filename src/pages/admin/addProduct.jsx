import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
        for(let i = 0; i<images.length; i++) {
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise;
        
        }
        try{
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
                images : result
            }
        
            const tocken = localStorage.getItem("token");
            
            await axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
                    headers: {
                        Authorization: `Bearer ${tocken}`
                    }
                })
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch(error) {
            console.error(error);
            toast.error("Product added failed");  
        }
    }

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center">Add Product</h2>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-1/2  flex flex-col p-4">
                    <input
                        value={productId}
                        onChange={
                            (e) => {
                                console.log("Product ID changed", e.target.value);
                                setProductId(e.target.value);
                            }
                        }
                        type="text" placeholder="Product ID" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        value={productName}
                        onChange={
                            (e) => {
                                setProductName(e.target.value);
                            }
                        }
                        type="text" placeholder="Product Name" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        value={altName}
                        onChange={
                            (e) => {
                                setAltName(e.target.value);
                            }
                        }
                        type="text" placeholder="Alternative Names" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        value={price}
                        onChange={
                            (e) => {
                                setPrice(e.target.value);
                            }
                        }
                        type="number" placeholder="Price (Rs)" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        value={lebeledPrice}
                        onChange={
                            (e) => {
                                setLebeledPrice(e.target.value);
                            }
                        }
                        type="number" placeholder="Labelled Price (Rs)" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <textarea
                        value={description}
                        onChange={
                            (e) => {
                                setDescription(e.target.value);
                            }
                        }
                        placeholder="Description" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    {/* Product Images */}
                    <input
                        onChange={
                            (e) => {
                                setImages(e.target.files);
                            }
                        }
                        multiple
                        type="file" placeholder="Product Images" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        value={stock}
                        onChange={
                            (e) => {
                                setStock(e.target.value);
                            }
                        }
                        type="number" placeholder="Stock" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    
                    <div className="w-full h-[50px]  flex items-center justify-between ">
                        <Link to="/admin/products" className="w-[180px] bg-red-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-red-600 text-center"> Cancel </Link>
                        <button onClick={handleSubmit} className="w-[180px] bg-green-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-green-600 text-center"> Add Product </button>
                </div>
                </div>
                

            </div>
            

            
            
        </div>
    );
}               