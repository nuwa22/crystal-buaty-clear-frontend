import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";



export default function ProductPage(){
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(
        () =>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                    (res) => {
                        setProductList(res.data);
                        setProductsLoaded(true);
                    }
                )
            }
        }, [productsLoaded]
    )
    return(
        <div className="w-full h-full">
            {
                productsLoaded ?
                <div className="w-full h-full flex flex-wrap justify-center ">
                    {
                        productList.map(
                            (product)=> {
                                return (
                                    <ProductCard key={product.productId} product={product}/>
                                )
                                
                            }
                        )
                    }
                </div>
                :
                <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
                    <Loader />
                </div>

                
            }
            
        </div>
    )
}