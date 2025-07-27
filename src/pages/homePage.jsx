import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckOutPage from "./client/checkOut";
import NotFound from "../components/notFound";
import Home from "./home";
import Contact from "./client/contactUs";
import Review from "./client/review";




export default function HomePage() {
    return (
        <div className="w-full max-h-screen mt-[100px]">
            <Header />
            <div className="w-full  min-h-[100%]"> 
                <Routes path="/*">
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reviews" element={<Review />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/*" element={<NotFound />} />

                </Routes>
            </div>
        </div>
    )
} 