import { Link } from "react-router-dom";

export default function AddProductPage() {

    /*
    productId
    productName
    altName
    price
    lebeledPrice
    description
    images
    stock
    */
    return (
        <div className="w-full h-full relative">
            <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
            <div className="w-full flex">
                <div className="w-1/2  flex flex-col  p-6">
                    <input
                        type="text" placeholder="Product ID" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Product Name" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Alternative Names" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Price (Rs)" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Labelled Price (Rs)" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Description" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />
                    <input
                        type="text" placeholder="Stock" className="w-[100%] p-2 border border-gray-300 rounded mb-4" 
                    />

                </div>
                <div className="w-1/2 bg-blue-900">

                </div>
            </div>
            <div className="w-full h-[50px]  flex items-center justify-end p-4 space-x-4">
                <Link to="/admin/products" className="w-[150px] bg-red-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-red-600 text-center"> Cancel </Link>
                <button className="w-[150px] bg-green-500 p-[8px] rounded-lg text-white text-[20px] font-semibold cursor-pointer hover:bg-green-600 text-center"> Submit </button>
            </div>

            
            
        </div>
    );
}               