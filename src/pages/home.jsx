import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          toast.error("Invalid product data received");
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getMostDiscounted = () => {
    return [...products]
      .filter((p) => p.lebeledPrice > 0 && p.price > 0)
      .sort((a, b) => {
        const discountA = ((a.lebeledPrice - a.price) / a.lebeledPrice) * 100;
        const discountB = ((b.lebeledPrice - b.price) / b.lebeledPrice) * 100;
        return discountB - discountA;
      })
      .slice(0, 4);
  };

  const getMostSold = () => {
    return [...products]
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#970747] mb-8">
        Our Products
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : !products || products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <>
          <Section title="All Products" products={products} />
          <Section title="Most Discounted Products" products={getMostDiscounted()} />
          <Section title="Most Sold Products" products={getMostSold()} />
        </>
      )}
    </div>
  );
}

function Section({ title, products = [] }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-[#333] mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
