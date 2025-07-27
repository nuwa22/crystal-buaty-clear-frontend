import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  function handleStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order status updated successfully!");
        setLoaded(false);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        toast.error("Failed to update order status.");
      });
  }

  return (
    <div className="w-full h-full p-4">
      {loaded ? (
        <>
          {/* Desktop Table - unchanged */}
          <table className="w-full border-collapse hidden md:table">
            <thead className="border-b-2 border-gray-300 uppercase tracking-wide">
              <tr>
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
                <tr
                  key={order.orderId}
                  className="border-b-2 border-gray-300 text-left cursor-pointer hover:bg-[#1e1e2f] hover:text-white"
                >
                  <td className="px-3 py-2">{order.orderId}</td>
                  <td className="px-3 py-2">{order.name}</td>
                  <td className="px-3 py-2">{order.email}</td>
                  <td className="px-3 py-2">{order.address}</td>
                  <td className="px-3 py-2">{order.phoneNumber}</td>
                  <td className="px-3 py-2">
                    <select
                      className="px-3 py-2 bg-[#111827] rounded"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">LKR {order.total.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                      onClick={() => {
                        setModelIsDisplaying(true);
                        setDisplayingOrder(order);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards (only visible on small screens) */}
          <div className="md:hidden flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-[#252636] rounded-md p-4 shadow-md text-white flex flex-col space-y-2"
              >
                <p>
                  <span className="font-semibold">Order ID:</span> {order.orderId}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {order.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {order.address}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <select
                    className="w-full px-3 py-2 bg-[#111827] rounded mt-1"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </p>
                <p>
                  <span className="font-semibold">Total:</span> LKR{" "}
                  {order.total.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  onClick={() => {
                    setModelIsDisplaying(true);
                    setDisplayingOrder(order);
                  }}
                >
                  Details
                </button>
              </div>
            ))}
          </div>

          {/* Modal */}
          {modelIsDisplaying && (
            <div className="fixed top-0 left-0 w-full h-full bg-[#ffffffaa] flex justify-center items-center p-4 z-50 overflow-auto">
              <div className="bg-[#111827] w-full max-w-lg max-h-[90vh] rounded-lg shadow-lg relative flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h1 className="text-lg font-bold">
                    Order ID: {displayingOrder.orderId}
                  </h1>
                  <p className="text-sm">
                    Order Date: {new Date(displayingOrder.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Status: {displayingOrder.status}</p>
                  <p className="text-sm">Total: LKR {displayingOrder.total.toFixed(2)}</p>
                </div>
                <div className="flex-1 overflow-y-auto bg-gray-900 p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                  {displayingOrder?.billItems?.length > 0 ? (
                    displayingOrder.billItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-800 p-3 rounded-md shadow"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-md border border-gray-600"
                        />
                        <div className="ml-4 flex-1 text-white">
                          <h1 className="text-md font-semibold truncate">
                            {item.productName}
                          </h1>
                          <p className="text-xs text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-xs text-gray-400">
                            Price: LKR {item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No items to display.
                    </p>
                  )}
                </div>
                <button
                  className="absolute top-2 right-2 w-10 h-10 text-2xl rounded-full bg-[#111827] shadow shadow-[#ffffff] flex justify-center items-center hover:bg-gray-700 transition"
                  onClick={() => setModelIsDisplaying(false)}
                  aria-label="Close modal"
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
