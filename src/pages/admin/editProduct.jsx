import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/meadiaUpload";



export default function EditProductPage() {
    const locationData = useLocation();
    const navigate = useNavigate();
    if(locationData.state == null){
        toast.error("Please select a product to edit");
        window.location.href = "/admin/products";
    }
    const [productId, setProductId] = useState(locationData.state.productId);
    const [productName, setProductName] = useState(locationData.state.productName);
    const [altName, setAltName] = useState(locationData.state.altName.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [lebeledPrice, setLebeledPrice] = useState(locationData.state.lebeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);

       

    async function handleSubmit() {
        
        const promisesArray = [];
        for(let i = 0; i<images.length; i++) {
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise;
        
        }
        try{
            let result = await Promise.all(promisesArray);
            if(images.length == 0){
                result = locationData.state.images;
            }
            
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
                .put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
                    headers: {
                        Authorization: `Bearer ${tocken}`
                    }
                })
            toast.success("Product updated successfully");
            navigate("/admin/products");
        } catch(error) {
            console.error(error);
            toast.error("Product updating failed");  
        }
    }

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center">Edit Product</h2>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-1/2  flex flex-col p-4">
                    <input
                        disabled
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
                        <button onClick={handleSubmit} className="w-[180px] bg-green-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-green-600 text-center"> Edit Product </button>
                </div>
                </div>
                

            </div>
            

            
            
        </div>
    );
}               