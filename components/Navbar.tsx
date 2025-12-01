"use client"; // Required for handling the Mobile Menu state

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/shop?search=${searchQuery}`);
    }
  };

  // --- CART COUNT LOGIC ---
  useEffect(() => {
    // Function to calculate total items
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
          // Calculate total quantity (not just number of unique items)
          const total = cartItems.length;
          setCartCount(total);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Failed to parse cart", error);
        setCartCount(0);
      }
    };

    // 1. Run on initial mount
    updateCartCount();

    // 2. Listen for the custom event dispatched by GadgetCard
    window.addEventListener("cart-updated", updateCartCount);

    // 3. Cleanup listener
    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#2A2F36]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. LOGO */}
          <div className="shrink-0 cursor-pointer">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tighter text-white"
            >
              Tech<span className="text-[#3055D4]">Nova</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 mx-10 max-w-lg">
            <div className="relative w-full text-gray-400 focus-within:text-[#3055D4]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="block w-full bg-[#1a1d21] border border-[#2A2F36] rounded-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#3055D4] focus:ring-1 focus:ring-[#3055D4] text-white transition-all"
                placeholder="Search gadgets (e.g. Headphones, PS5)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/shop"
              className="text-gray-300 hover:text-white text-sm font-medium transition"
            >
              Shop
            </Link>
            <div className="h-6 w-px bg-[#2A2F36]"></div> {/* Divider */}
            <div className="flex items-center gap-4">
              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="group relative text-gray-300 hover:text-white transition"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#3055D4] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#2A2F36] ">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className="relative text-gray-400">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1a1d21] rounded-lg py-2 pl-10 text-white focus:outline-none border border-[#2A2F36]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            <Link
              href="/shop"
              className="block text-gray-300 hover:text-white text-base font-medium"
            >
              Shop
            </Link>

            <Link href="/cart" className="block text-[#3055D4] font-medium">
              View Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
