import { BsCart4 } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/products", label: "Products" },
        { path: "/contact", label: "Contact us" },
        { path: "/reviews", label: "Reviews" }
    ];

    return (
        <header className="fixed top-0 left-0 z-50 h-[70px] w-full flex justify-center items-center bg-[#970747] shadow-md">
            <div className="w-full max-w-7xl h-full flex items-center justify-between px-4 md:px-8 text-[#FFFFFF]">
                
               
                <div className="flex-shrink-0">
                    <Link to="/" className="text-xl font-bold">
                        CBC
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative py-2 transition-colors duration-300 hover:text-gray-200 ${
                                isActiveLink(link.path) ? "text-white" : "text-gray-100"
                            }`}
                        >
                            {link.label}
                            
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                                    isActiveLink(link.path) 
                                        ? "w-full" 
                                        : "w-0 group-hover:w-full"
                                }`}
                            ></span>
                            
                            <span className="absolute bottom-0 left-0 h-0.5 bg-white w-0 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        to="/login"
                        className="border-2 border-white w-[100px] h-[40px] flex justify-center items-center rounded-md hover:bg-white hover:text-[#970747] transition-all duration-300"
                    >
                        Login
                    </Link>
                    <Link to="/cart" className="text-3xl hover:text-gray-200 transition-colors duration-300">
                        <BsCart4 />
                    </Link>
                </div>

                
                <div className="flex md:hidden items-center space-x-4">
                    <Link to="/cart" className="text-2xl hover:text-gray-200 transition-colors duration-300">
                        <BsCart4 />
                    </Link>
                    
                    <button
                        onClick={toggleMenu}
                        className="text-2xl hover:text-gray-200 transition-colors duration-300 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 opacity-50 bg-black z-40 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}

            
            <div
                className={`fixed top-[70px] right-0 h-[calc(100vh-70px)] w-64 bg-[#970747] transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="flex flex-col p-6 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={toggleMenu}
                            className={`text-xl py-3 border-b border-pink-400 border-opacity-30 transition-colors duration-300 hover:text-gray-200 ${
                                isActiveLink(link.path) 
                                    ? "text-white font-semibold border-white" 
                                    : "text-gray-100"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    
                    <Link
                        to="/login"
                        onClick={toggleMenu}
                        className="mt-6 border-2 border-white w-full h-[45px] flex justify-center items-center rounded-md hover:bg-white hover:text-[#970747] transition-all duration-300 text-lg"
                    >
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}