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
  deal?: boolean;
  discount?: number;
};

const GadgetCard = ({
  id,
  name,
  rating,
  price,
  category,
  imageUrl,
  new: isNew,
  deal,
  discount,
}: GadgetCardProps) => {
  const [isAdded, setIsAdded] = useState(false);

  // Check if item is in cart when component mounts
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
    try {
      const storedCart = localStorage.getItem("cart");
      let cartItems = storedCart ? JSON.parse(storedCart) : [];

      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id === id
      );

      if (existingItemIndex > -1) {
        // If exists, remove it
        cartItems.splice(existingItemIndex, 1);
        setIsAdded(false);
      } else {
        // If not, add new item
        const itemToAdd = {
          id,
          name,
          price: deal && discount ? price - price * discount : price,
          imageUrl,
          quantity: 1,
          deal,
          discount,
        };
        cartItems.push(itemToAdd);
        setIsAdded(true);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="group relative p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl border border-[#2A2F36] bg-[#1a1d21] transition-all duration-300 hover:border-[#3055D4] hover:shadow-lg hover:shadow-[#3055D4]/20">
      {/* "NEW" Badge */}
      {isNew && (
        <span className="absolute top-3 sm:top-4 lg:top-5 left-3 sm:left-4 lg:left-5 z-10 bg-[#3055D4] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full tracking-wider">
          NEW
        </span>
      )}

      {/* "DEAL OF THE DAY" Badge */}
      {deal && (
        <span className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 z-10 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full tracking-wider">
          DEAL
        </span>
      )}

      {/* Image Container with Hover Zoom */}
      <div className="overflow-hidden rounded-lg sm:rounded-xl bg-[#2A2F36] relative h-[180px] sm:h-[220px] lg:h-[250px] w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110 p-2 sm:p-3"
        />
      </div>

      {/* Category and Rating */}
      <div className="mt-3 sm:mt-4 lg:mt-5 flex justify-between items-center gap-2">
        <span className="bg-white/10 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs tracking-wide font-medium truncate">
          {category}
        </span>

        <div className="flex items-center gap-0.5 sm:gap-1 text-yellow-400 flex-shrink-0">
          <StarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <p className="text-[10px] sm:text-xs font-semibold text-white">
            {rating}
          </p>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-medium text-gray-100 truncate">
        {name}
      </h3>

      {/* Price */}
      {deal && discount ? (
        <div className="mt-1 sm:mt-1.5 flex items-baseline gap-1.5 sm:gap-2">
          <p className="text-lg sm:text-xl font-bold tracking-wide text-red-500">
            ${(price - price * discount).toFixed(2)}
          </p>
          <p className="text-sm sm:text-base font-light tracking-wide text-gray-400 line-through">
            ${price.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="mt-1 sm:mt-1.5 text-lg sm:text-xl font-bold tracking-wide text-white">
          ${price.toFixed(2)}
        </p>
      )}

      {/* Action Buttons */}
      <div className="mt-3 sm:mt-4 lg:mt-5 flex gap-2 sm:gap-3">
        <Button
          type="primary"
          size="medium"
          className="flex-1 text-xs sm:text-sm font-semibold !py-2 sm:!py-2.5"
        >
          Buy Now
        </Button>

        {/* Cart Button with Toggle Logic */}
        <button
          onClick={handleToggleCart}
          className={`transition-all duration-300 rounded-md sm:rounded-lg p-2 sm:p-2.5 lg:p-3 border border-gray-700 flex-shrink-0 ${
            isAdded
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-[#2A2F36] hover:bg-white hover:text-black text-white"
          }`}
          aria-label={isAdded ? "Remove from Cart" : "Add to Cart"}
        >
          {isAdded ? (
            <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GadgetCard;
