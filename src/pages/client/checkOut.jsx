import {  useState } from "react"

import { BiTrash } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { BsDash } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckOutPage(){
    const location = useLocation();
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cart, setCart] = useState(location.state.items);
    const navigate = useNavigate();

    /*
    {
    "orderId": "ORD0006",
    "date": "2024-03-09T14:30:00.000Z",
    "name": "Emily Jones",
    "address": "456 Maple Street, Los Angeles, CA",
    "status": "shipped",
    "phoneNumber": "+1 987-654-3210",
    "billItems": [
        {
            "productId": "B004",
            "quantity": 2
        },
        {
            "productId": "B003",
            "quantity": 3
        }
    ]
}

*/
function placeOrder(){
    const orderData = {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        billItems : []
    }

    for (let i = 0; i< cart.length; i++){
        orderData.billItems[i] = {
            productId: cart[i].productId,
            quantity : cart[i].quantity
        }
    }
    
    const token = localStorage.getItem("token");
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        toast.success("Order placed successfully");
        navigate("/");
    }).catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
    });   
}



    function getTotal(){
        let total = 0;
        cart.forEach((item)=> {
            total += item.price * item.quantity;
        })
        return total;
    }

    function getTotalForLabelledPrice() {
		let total = 0; 
		cart.forEach((item) => {
			total += item.lebeledPrice * item.quantity;
            console.log(item);
		});
		return total;
        
	}
    

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
                                        const newCart = cart.filter((product)=> product.productId !== item.productId);
                                        setCart(newCart);
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
                                        const newCart = cart;
                                        console.log(newCart);
                                        newCart[index].quantity -= 1;
                                        if(newCart[index].quantity <= 0) newCart[index].quantity = 1;
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
                                        
                                    }
                                    }><BsDash /></button>
                                    <h2 className="text-lg font-bold text-green-600">{item.quantity}</h2>
                                    <button className="text-xl w-8 h-8 bg-black text-white rounded-full flex justify-center items-center hover:bg-gray-800 transition"
                                    onClick={() =>
                                    {
                                        const newCart = cart;
                                        newCart[index].quantity += 1;
                                        setCart(newCart);
                                        setCartRefresh(!cartRefresh);
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
                        <h1 className="text-xl md:text-2xl font-bold text-red-500 w-[120px] text-right border-b-2 border-dashed mr-4">
                            {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
                        </h1>

                    </div>

                    <div className="flex justify-end items-center mb-6">
                        <h1 className="ttext-xl md:text-2xl font-semibold text-gray-700 w-[150px] text-right pr-4">Net Total:</h1>
                        <h1 className="text-xl md:text-2xl font-bold text-green-600 w-[120px] text-right border-b-4 border-double mr-4">{getTotal().toFixed(2)}</h1>

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                        value={name} onChange={(e) => setName(e.target.value)} />

                        <label className="block text-gray-700 text-sm font-semibold mt-4 mb-2">Address</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={address} onChange={(e) => setAddress(e.target.value)} />

                        <label className="block text-gray-700 text-sm font-semibold mt-4 mb-2">Phone Number</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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
                        onClick={(placeOrder)}
                       >Place Order</button>
                    </div>
                </div>
            </div>

        </div>
    )
}