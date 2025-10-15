import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";



export default function ProductPage(){
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(
        () =>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then(
                    (res) => {
                        setProductList(res.data);
                        setProductsLoaded(true);
                    }
                )
            }
        }, [productsLoaded]
    )

    function searchProducts(){
        if(search.length > 0){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search).then(
                (res) => {
                    setProductList(res.data.products);
                }
            )
        }

    }
    return(
        <div className="w-full h-full">
            <div className="w-full p-4 flex justify-center items-center">
                <input 
                    type="text" 
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={() => 
                    {
                        searchProducts()
                        setProductsLoaded(false);
                    }
                    }
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
                >
                    Search
                </button>
                <button
                    onClick={() => 
                    {
                        setProductsLoaded(false);
                    }
                    }
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition"
                >
                    Reset
                </button>
            </div>
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