import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview(){
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
                <div className="w-full h-full flex">
                    <div className="w-[50%] h-full">
                        
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-[50%] h-full">
                        <h1 className="text-3xl font-bold text-center">{product.productName}</h1>
                        <h2 className="text-3xl font-semibold text-center text-gray-500">{product.altName.join(" | ")}</h2>
                        <div className="w-full flex">
                            {
                                product.lebeledPrice > product.price ? (
                                    <>
                                        <h2>LKR: {product.price.toFixed(2)}</h2>
                                        <h2>LKR: {product.lebeledPrice.toFixed(2)}</h2>
                                    </>  
                                ) : (
                                    <h2>LKR: {product.price.toFixed(2)}</h2>
                                )
                            }
                            
                          
						</div>

                        <p className="text-lg text-center mt-2">{product.description}</p>
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