import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link
            to={"/overview/" + product.productId}
            className="
                /* Base mobile styles (320px+) */
                w-full max-w-[280px] min-h-[320px] 
                
                /* Small mobile (375px+) */
                sm:max-w-[300px] sm:min-h-[340px]
                
                /* Tablet (768px+) */
                md:max-w-[250px] md:min-h-[350px]
                
                /* Large tablet/Small desktop (1024px+) */
                lg:max-w-[260px] lg:min-h-[360px]
                
                /* Desktop (1280px+) */
                xl:max-w-[280px] xl:min-h-[380px]
                
                /* Common styles */
                bg-white rounded-xl shadow-lg overflow-hidden 
                hover:shadow-xl hover:scale-105 
                transition-all duration-300 ease-in-out
                mx-auto mb-4
                
                /* Responsive margins */
                m-2 sm:m-3 md:m-4
                
                /* Flex for consistent height */
                flex flex-col
            "
        >
            <div className="flex-shrink-0">
                <img
                    className="
                        w-full object-cover
                        /* Responsive image heights */
                        h-[180px] 
                        sm:h-[200px] 
                        md:h-[220px] 
                        lg:h-[230px] 
                        xl:h-[240px]
                        
                        /* Hover effect */
                        hover:scale-105 transition-transform duration-300
                    "
                    src={product.images[0]}
                    alt={product.productName}
                    loading="lazy"
                />
            </div>
            
            <div className="
                flex-1 flex flex-col justify-between
                /* Responsive padding */
                p-3 sm:p-4 md:p-3 lg:p-4
            ">
                {/* Product ID */}
                <p className="
                    text-xs text-gray-500 mb-1
                    /* Hide on very small screens if needed */
                    hidden xs:block
                ">
                    ID: {product.productId}
                </p>
                
           
                <h3 className="
                    font-semibold text-gray-800 mb-2 flex-1
                    /* Responsive font sizes */
                    text-sm sm:text-base md:text-lg
                    
                    /* Line clamping for long names */
                    line-clamp-2 leading-tight
                ">
                    {product.productName}
                </h3>
                
                
                <div className="mt-auto">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between">
                        
                        <span className="
                            font-bold text-red-600
                            /* Responsive font sizes */
                            text-base sm:text-lg md:text-lg lg:text-xl
                            mb-1 xs:mb-0
                        ">
                            LKR. {product.price.toFixed(2)}
                        </span>
                        
                       
                        {product.price < product.lebeledPrice && (
                            <span className="
                                text-gray-500 line-through
                                /* Responsive font sizes */
                                text-xs sm:text-sm
                            ">
                                LKR. {product.lebeledPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    
                   
                    {product.price < product.lebeledPrice && (
                        <div className="mt-2">
                            <span className="
                                inline-block px-2 py-1 
                                bg-red-100 text-red-600 
                                text-xs font-medium rounded-full
                            ">
                                {Math.round(((product.lebeledPrice - product.price) / product.lebeledPrice) * 100)}% OFF
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}