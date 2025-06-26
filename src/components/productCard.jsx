import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/product/${product.productId}`}
            className="w-[250px] h-[350px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 m-4"
        >
            <img
                className="w-full h-[220px] object-cover"
                src={product.images[0]}
                alt={product.productName}
            />
            <div className="p-3 flex flex-col h-[130px] px-4">
                <p className="text-xs text-gray-500">ID: {product.productId}</p>
                <p className="text-lg font-semibold text-gray-800">{product.productName}</p>
                <p className="mt-1">
                    <span className="text-lg font-bold text-red-600 mr-2">
                        Rs. {product.price.toFixed(2)}
                    </span>
                    {product.price < product.lebeledPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            Rs. {product.lebeledPrice.toFixed(2)}
                        </span>
                    )}
                </p>
            </div>
        </Link>
    );
}
