"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/shop?search=${searchQuery}`);
      setIsOpen(false); // Close mobile menu after search
    }
  };

  // Cart count logic
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
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

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2A2F36]"
    >
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="shrink-0 cursor-pointer">
            <Link
              href="/"
              className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-white"
              onClick={() => setIsOpen(false)}
            >
              Tech<span className="text-[#3055D4]">Nova</span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 mx-6 lg:mx-10 max-w-md lg:max-w-lg">
            <div className="relative w-full text-gray-400 focus-within:text-[#3055D4]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <input
                type="text"
                className="block w-full bg-[#1a1d21] border border-[#2A2F36] rounded-full py-1.5 lg:py-2 pl-9 lg:pl-10 pr-3 text-xs lg:text-sm placeholder-gray-500 focus:outline-none focus:border-[#3055D4] focus:ring-1 focus:ring-[#3055D4] text-white transition-all"
                placeholder="Search gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              href="/shop"
              className="text-gray-300 hover:text-white text-xs lg:text-sm font-medium transition whitespace-nowrap"
            >
              Shop
            </Link>

            <div className="h-5 lg:h-6 w-px bg-[#2A2F36]"></div>

            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="group relative text-gray-300 hover:text-white transition"
            >
              <ShoppingCartIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 lg:-top-2 -right-1.5 lg:-right-2 bg-[#3055D4] text-white text-[9px] lg:text-[10px] font-bold h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center rounded-full border-2 border-[#0a0a0a] group-hover:scale-110 transition-transform">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="group relative text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#3055D4] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#0a0a0a] group-hover:scale-110 transition-transform">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-1.5 sm:p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Bars3Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-[#2A2F36] shadow-xl"
            >
              <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-5 sm:pb-6 space-y-3 sm:space-y-4 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative text-gray-400">
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Search gadgets..."
                    className="w-full bg-[#1a1d21] rounded-lg py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3055D4] border border-[#2A2F36] transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>

                {/* Mobile Links */}
                <Link
                  href="/shop"
                  className="block text-gray-300 hover:text-white text-sm sm:text-base font-medium py-2 px-3 rounded-lg hover:bg-[#1a1d21] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center justify-between text-[#3055D4] hover:text-[#4066e6] font-medium py-2 px-3 rounded-lg hover:bg-[#1a1d21] transition-all text-sm sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <span>View Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-[#3055D4] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
