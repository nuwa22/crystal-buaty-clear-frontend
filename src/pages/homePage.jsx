import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckOutPage from "./client/checkOut";
import NotFound from "../components/notFound";



export default function HomePage() {
    return (
        <div className="w-full max-h-screen  ">
            <Header />
            <div className="w-full  min-h-[100%]"> 
                <Routes path="/*">
                    <Route path="/" element={<h1 className=" text-3xl text-center mt-10">Welcome to the Home Page</h1>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/*" element={<NotFound />} />

                </Routes>
            </div>
        </div>
    )
} 