"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import {
  StarIcon,
  ShoppingCartIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

type GadgetCardProps = {
  id: number;
  name: string;
  rating: number;
  price: number;
  category: string;
  imageUrl: string;
  best_selling?: boolean;
  new?: boolean;
  discount?: number;
};

const GadgetCard = ({
  id, // IMPORTANT: We need to destructure ID here to track the item
  name,
  rating,
  price,
  category,
  imageUrl,
  new: isNew,
  discount,
}: GadgetCardProps) => {
  const [isAdded, setIsAdded] = useState(false);

  // Check if item is in cart when component mounts (fixes reload issue)
  useEffect(() => {
    const checkCartStatus = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cartItems = JSON.parse(storedCart);
          const exists = cartItems.some((item: any) => item.id === id);
          setIsAdded(exists);
        }
      } catch (error) {
        console.error("Error reading cart:", error);
      }
    };

    checkCartStatus();

    // Listen for cart updates from other components
    window.addEventListener("cart-updated", checkCartStatus);
    return () => window.removeEventListener("cart-updated", checkCartStatus);
  }, [id]);

  const handleToggleCart = () => {
    // 1. Get the current cart from LocalStorage
    try {
      const storedCart = localStorage.getItem("cart");
      let cartItems = storedCart ? JSON.parse(storedCart) : [];

      // 2. Check if product already exists
      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id === id
      );

      if (existingItemIndex > -1) {
        // --- LOGIC CHANGE: If exists, REMOVE IT ---
        cartItems.splice(existingItemIndex, 1);
        setIsAdded(false);
      } else {
        // If not, add new item
        cartItems.push({
          id,
          name,
          price,
          imageUrl,
          quantity: 1,
        });
        setIsAdded(true);
      }

      // 3. Save back to LocalStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // 4. Dispatch custom event so Navbar updates immediately
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="group relative p-3 rounded-2xl border border-[#2A2F36] bg-[#1a1d21] transition-all duration-300 hover:border-[#3055D4] hover:shadow-lg hover:shadow-[#3055D4]/20">
      {/* "NEW" Badge Logic */}
      {isNew && (
        <span className="absolute top-5 left-5 z-10 bg-[#3055D4] text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider">
          NEW
        </span>
      )}
      {discount && (
        <span className="absolute top-5 right-5 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider">
          DEAL OF THE DAY
        </span>
      )}

      {/* Image Container with Hover Zoom */}
      <div className="overflow-hidden rounded-xl bg-[#2A2F36] relative h-[250px] w-full">
        {/* Added fixed height for consistency */}
        <Image
          src={imageUrl}
          alt={name}
          fill // improved: uses fill to cover the container
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-5 flex justify-between items-center">
        <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs tracking-wide font-medium">
          {category}
        </span>

        <div className="flex items-center gap-1 text-yellow-400">
          <StarIcon className="h-4 w-4" />
          <p className="text-xs font-semibold text-white">{rating}</p>
        </div>
      </div>

      <h3 className="mt-3 text-lg font-medium text-gray-100 truncate">
        {name}
      </h3>
      <p className="mt-1 text-xl font-bold tracking-wide text-white">
        ${price}
      </p>

      <div className="mt-5 flex gap-3">
        <Button
          type="primary"
          size="medium"
          className="flex-1 text-sm font-semibold"
        >
          Buy Now
        </Button>

        {/* Cart Button with Toggle Logic */}
        <button
          onClick={handleToggleCart}
          className={`transition-all duration-300 rounded-lg p-3 border border-gray-700 ${
            isAdded
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-[#2A2F36] hover:bg-white hover:text-black text-white"
          }`}
          aria-label={isAdded ? "Remove from Cart" : "Add to Cart"}
        >
          {isAdded ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <ShoppingCartIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GadgetCard;
