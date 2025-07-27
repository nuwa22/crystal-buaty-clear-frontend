import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();

  if (params.id == null) {
    window.location.href = "/products";
  }

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id)
        .then((res) => {
          setProduct(res.data.product);
          setStatus("loaded");
        })
        .catch(() => {
          toast.error("Product is not available");
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {status === "loading" && (
        <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {status === "loaded" && (
        <div className="p-4 sm:p-6 md:p-8">
          <div className="w-full flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg p-4 md:p-6">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <ImageSlider images={product.images} />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 mt-4 lg:mt-0">
              {/* Title & Alt Name */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                  {product.productName}
                </h1>
                {product.altName && product.altName.length > 0 && (
                  <h2 className="text-base sm:text-lg text-gray-500">
                    {product.altName.join(" | ")}
                  </h2>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-3">
                {product.lebeledPrice > product.price ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold text-green-600">
                      LKR: {product.price.toFixed(2)}
                    </h2>
                    <h2 className="text-lg sm:text-xl line-through text-gray-400">
                      LKR: {product.lebeledPrice.toFixed(2)}
                    </h2>
                  </>
                ) : (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    LKR: {product.price.toFixed(2)}
                  </h2>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="w-full sm:w-1/2 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Product added to cart");
                    console.log(getCart());
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        items: [
                          {
                            productId: product.productId,
                            name: product.productName,
                            altName: product.altName,
                            price: product.price,
                            lebeledPrice: product.lebeledPrice,
                            image: product.images[0],
                            quantity: 1,
                          },
                        ],
                      },
                    });
                  }}
                  className="w-full sm:w-1/2 h-12 border-2 border-green-600 text-green-600 rounded-lg hover:border-green-700 hover:text-green-700 transition font-semibold text-sm sm:text-base"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full mt-8 bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600">The requested product could not be loaded.</p>
          </div>
        </div>
      )}
    </div>
  );
}
