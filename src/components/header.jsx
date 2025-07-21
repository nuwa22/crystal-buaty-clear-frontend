import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="fixed top-0 left-0 z-50 h-[70px]  w-full flex justify-center items-center bg-[#970747] shadow-md">
            <div className="w-[500px] h-full flex items-center justify-evenly text-[#FFFFFF] text-xl">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact us</Link>
                <Link to="/reviews">Reviews</Link>
                <div className="absolute right-[30px] flex items-center justify-between gap-4 ">
                    <Link to="/login" className=" border border-[2px] border-[#ffffff] w-[100px] h-[40px] flex justify-center items-center rounded-md">Login</Link>  
                    <Link to="/cart" className=" text-3xl"><BsCart4 className="text-[#ffffff]" /></Link>
                </div>
                
            </div>
        </header>
    )
}