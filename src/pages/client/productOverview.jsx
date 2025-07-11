import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview(){
    const navigate = useNavigate();
    const params =useParams();
    console.log(params.id);
    if(params.id == null){
        window.location.href = "/products";
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); // loaded, error

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                    (res)=>{
                        console.log(res);
                        setProduct(res.data.product);
                        
                        setStatus("loaded");
                        
                    }
                ).catch(
                    () => {
                        toast.error("Product is not available");
                        setStatus("error");
                    }
                );
            }
        },[status]
    )

    return(
        <div className="w-full h-full">
            {
                status == "loading"  && 
                <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
                    <Loader />
                </div>  
            }
            {
                status == "loaded" &&
                <div className="m-5">
                <div className="w-full h-full flex flex-col lg:flex-row gap-10 p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-[50%] h-full mt-10">
                        
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-[50%] h-full mt-10 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.productName}{" | "}<span className="text-4xl mr-[20px] text-gray-500">{product.altName.join(" | ")}</span></h1>
                        <h2 className="ext-xl font-medium text-gray-500 mb-6">{product.altName.join(" | ")}</h2>
                        <div className="flex items-center gap-4 mb-6">
                            {
                                product.lebeledPrice > product.price ? (
                                    <>
                                        <h2 className="text-2xl font-bold text-green-600">LKR: {product.price.toFixed(2)}</h2>
                                        <h2 className="text-xl line-through text-gray-400">LKR: {product.lebeledPrice.toFixed(2)}</h2>
                                    </>  
                                ) : (
                                    <h2 className="text-2xl font-bold text-gray-800">LKR: {product.price.toFixed(2)}</h2>
                                )
                            }
                            
                          
						</div>
                        <div className="flex items-center gap-4 mb-6">
                            <button className="w-[180px] h-[50px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer font-semibold" onClick={
                                () => {
                                    addToCart(product, 1);
                                    toast.success("Product added to cart");
                                    console.log(getCart());
                                }
                            }>
                                Add to Cart
                            </button>
                            <button
                            onClick={() => {
                                navigate("/checkout", {
                                    state: {
                                        items: [
                                            {
                                                productId : product.productId,
                                                name : product.productName,
                                                altName : product.altName,
                                                price : product.price,
                                                lebeledPrice : product.lebeledPrice,
                                                image : product.images[0],
                                                quantity : 1
                                            }
                                        ]
                                    }
                                });
                            }}
                            className="w-[180px] h-[50px] px-4 py-2 border-2 border-green-600 font-semibold text-green-600 rounded-lg hover:border-green-700 hover:text-green-700 hover:animate- transition duration-200 corsor-pointer">
                                Buy Now
                            </button>
                        </div>

                        
                    </div>
                </div>
                <div className="w-full mt-10 p-6 bg-white rounded-xl shadow-sm ">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 pl-25">Description</h2>
                    <p className="text-base text-gray-700 leading-relaxed pl-25">{product.description}</p>
                </div>
                </div>
                
            }
            {
                status == "error" && 
                <div>
                    Error
                </div>
            }
        </div>
    )
}