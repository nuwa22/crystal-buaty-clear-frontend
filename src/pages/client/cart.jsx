import { useEffect, useState } from "react"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { BiTrash } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage(){
    
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(cartLoaded === false){
            const cart = getCart();
            setCart(cart);
            setCartLoaded(true);
        }
    },[cartLoaded]);

    return(
        <div className="w-full min-h-[calc(100vh-70px)] flex justify-center pb-6">
            <div className="w-full max-w-[900px]">
                {
                    cart.map((item, index)=> {
                        return (
                            <div key={index} className="w-full min-h-[150px] bg-white shadow-lg my-6 flex flex-col md:flex-row justify-between items-center p-4 md:p-6 rounded-xl relative">
                                <button className="absolute right-[-50px] bg-red-500 text-white text-xl rounded-full w-[35px] h-[35px] flex justify-center items-center shadow-md hover:bg-red-600 transition-all duration-300"
                                onClick={
                                    () => {
                                        removeFromCart(item.productId)
                                        setCartLoaded(false);

                                    }
                                }>
                                    <BiTrash />
                                </button>
                                <img src={item.image} className="h-[120px] w-[120px] object-cover rounded-md mb-4 md:mb-0" />
                                <div className="flex-1 px-4 text-center md:text-left">
                                    <h1 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h1>
                                    <h2 className="text-sm text-gray-500">{item.altName.join(" | ")}</h2>
                                    <p className="text-sm text-gray-600 mt-1">LKR: {item.price}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-4 md:mt-0">
                                    <button className="text-xl w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800 transition"
                                    onClick={() =>
                                    {
                                        addToCart(item, -1);
                                        setCartLoaded(false);
                                    }
                                    }><BsDash /></button>
                                    <h2 className="text-lg font-bold text-green-600">{item.quantity}</h2>
                                    <button className="text-xl w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800 transition"
                                    onClick={() =>
                                    {
                                        addToCart(item, 1);
                                        setCartLoaded(false);
                                    }
                                    }><PiPlus /></button>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 text-green-700 font-semibold text-lg">
                                {(item.price * item.quantity).toFixed(2)}
                                </div>
                                
                            </div>
                        )
                    })
                }
                <div className="w-full mt-10 border-t pt-6">
                    <div className="flex justify-end items-center mb-3">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 w-[150px] text-right pr-4">Total:</h1>
                        <h1 className="text-xl md:text-2xl font-bold text-red-500 w-[120px] text-right mr-4 ">{getTotalForLabelledPrice().toFixed(2)}</h1>

                    </div>
                    <div className="flex justify-end items-center mb-3">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 w-[150px] text-right pr-4">Discount</h1>
                        <h1 className="text-xl md:text-2xl font-bold text-red-500 w-[120px] text-right border-b-2 border-dashed mr-4">{(getTotalForLabelledPrice() - getTotal().toFixed(2))}</h1>

                    </div>

                    <div className="flex justify-end items-center mb-6">
                        <h1 className="ttext-xl md:text-2xl font-semibold text-gray-700 w-[150px] text-right pr-4">Net Total:</h1>
                        <h1 className="text-xl md:text-2xl font-bold text-green-600 w-[120px] text-right border-b-4 border-double mr-4">{getTotal().toFixed(2)}</h1>

                    </div>
                    <div className="flex justify-end">
                        <button
                        disabled={cart.length === 0}
                        className={`text-lg font-medium px-6 py-3 rounded-lg shadow-xl transition duration-300 
                            ${
                            cart.length === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        }`}
                        onClick={() => {
                            navigate("/checkout", {
                                state: {
                                    items: cart
                                    
                                }
                            })
                        }}>Checkout</button>
                    </div>
                </div>
            </div>

        </div>
    )
}