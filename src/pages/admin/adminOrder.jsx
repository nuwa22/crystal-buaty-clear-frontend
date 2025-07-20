import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrderPage(){

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);

    useEffect(
        () => {
            if(!loaded){
                const token = localStorage.getItem("token");
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(
                    (response) => {
                        setOrders(response.data);
                        console.log(response.data);
                        setLoaded(true);
                    }
                )
            }
        }, [loaded]
)

function handleStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+ orderId,{
        status: status
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(
        toast.success("Order status updated successfully!"),
        setLoaded(false)
    ).catch(
        (error) => {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status.");
        }
    );

}



/*
{
    "_id": "6879df67a23caaab103f5f7d",
    "orderId": "ORD0015",
    "email": "snt4800nuwa@gmail.com",
    "name": "Suresh Nuwan",
    "address": "Makeliya",
    "status": "pending",
    "phoneNumber": "0782020514",
    "billItems": [
        {
            "productId": "B005",
            "productName": "Silky Smooth Foundation",
            "image": "https://iysgivrfihhmwgjcatka.supabase.co/storage/v1/object/public/images/17509306336934.jpg",
            "quantity": 2,
            "price": 1990,
            "_id": "6879df67a23caaab103f5f7e"
        }
    ],
    "total": 3980,
    "date": "2025-07-18T05:45:11.180Z",
    "__v": 0
}

*/
    return (
        <div className="w-full h-full">
            {
                loaded ?
                <div className="w-full h-full flex flex-wrap justify-center ">
                    <table className="w-full">
                        <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
                        <tr>
                            {/* */}
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer Name</th>
                            <th className="px-4 py-3">Customer Email</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Phone Number</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId}
                                className="border-b-2 border-gray-300 text-left cursor-pointer hover:bg-[#1e1e2f] hover:text-white">
                                    <td className="px-3 py-2">{order.orderId}</td>
                                    <td className="px-3 py-2">{order.name}</td>
                                    <td className="px-3 py-2">{order.email}</td>
                                    <td className="px-3 py-2">{order.address}</td>
                                    <td className="px-3 py-2">{order.phoneNumber}</td>
                                    <td className="px-3 py-2">
                                        <select className="px-3 py-2 bg-[#111827]" value={order.status} onChange={
                                            (e)=> {
                                                handleStatusChange(order.orderId, e.target.value);
                                            }
                                        }>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-2">{order.total.toFixed(2)}</td>
                                    <td className="px-3 py-2">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-3 py-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                        onClick={() => {
                                            setModelIsDisplaying(true)
                                            setDisplayingOrder(order);
                                        }}>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        modelIsDisplaying && (
                            <div className="fixed top-0 left-0 w-full h-full bg-[#ffffff70] flex justify-center items-center">
                               <div className="bg-[#111827] w-[600px] h-[600px] max-[600px] w-[600px] rounded-lg shadow-lg relative">
                                <div className="w-full h-[150px] rounded-t-lg">
                                    <h1 className="text-sm font-bold p-2">Order ID: {displayingOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Dat {new Date(displayingOrder.date).toLocaleDateString()}</h1>
                                    <h1 className="text-sm font-bold p-2">Status: {displayingOrder.status}</h1>
                                    <h1 className="text-sm font-bold p-2">Total: LKR. {displayingOrder.total.toFixed(2)}</h1>
                                    
                                </div>
                                <div className="w-full h-[450px] overflow-y-scroll rounded-b-lg bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                                    {displayingOrder?.billItems?.length > 0 ? (
                                        displayingOrder.billItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="w-full h-[100px] flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition duration-200 p-4 border-b border-gray-700"
                                        >
                                            <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="w-[80px] h-[80px] object-cover rounded-md border border-gray-600"
                                            />
                                            <div className="flex-1 px-4 text-white">
                                            <h1 className="text-md font-semibold truncate">{item.productName}</h1>
                                            <h2 className="text-xs text-gray-400 mt-1">Quantity: {item.quantity}</h2>
                                            <h2 className="text-xs text-gray-400">Price: LKR. {item.price.toFixed(2)}</h2>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm text-center p-4">No items to display.</p>
                                    )}
                                </div>

                                <button className="w-[40px] h-[40px] text-2xl absolute right-[-20px] top-[-10px] rounded-full bg-[#111827] shadow shadow-[#ffffff] flex justify-center items-center"
                                onClick={() => setModelIsDisplaying(false)}>
                                    <IoCloseSharp />
                                </button>

                               </div>
                            </div>
                        )
                    }
                </div>
                :
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>


            } 
            
        </div>
    )
}

