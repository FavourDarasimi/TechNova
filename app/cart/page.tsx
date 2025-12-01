"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";

type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category?: string;
  deal?: boolean;
  discount?: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. LOAD CART ---
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  // --- 2. UPDATE LOCAL STORAGE & NAVBAR ---
  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // --- 3. HANDLERS ---
  const increaseQuantity = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQuantity = (id: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
    updateCart(updated);
  };

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // --- 4. CALCULATIONS ---
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        Loading cart...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Your Cart{" "}
            <span className="text-gray-500 text-lg sm:text-xl md:text-2xl">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div>
            {/* --- TABLE HEADERS (Desktop Only) --- */}
            <div className="hidden md:grid grid-cols-12 gap-4 lg:gap-6 pb-4 border-b border-[#2A2F36] text-xs lg:text-sm font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* --- CART ITEMS --- */}
            <div className="space-y-4 sm:space-y-6 md:space-y-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-center py-4 sm:py-6 border-b border-[#2A2F36] last:border-0 bg-[#0a0a0a] md:bg-transparent rounded-lg md:rounded-none p-3 sm:p-4 md:p-0"
                >
                  {/* ITEM DETAILS */}
                  <div className="col-span-1 md:col-span-6 flex gap-3 sm:gap-4 md:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1a1d21] rounded-lg relative overflow-hidden flex-shrink-0 border border-[#2A2F36]">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">
                        {item.name}
                      </h3>
                      {item.deal && (
                        <p className="text-xs sm:text-sm text-red-500 font-medium mt-1">
                          Deal of the day
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                        In Stock
                      </p>

                      {/* Mobile Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="md:hidden text-xs text-gray-500 hover:text-red-500 transition mt-2 flex items-center gap-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="col-span-1 md:col-span-2 md:text-center">
                    <span className="md:hidden text-gray-500 text-xs sm:text-sm mr-2">
                      Price:
                    </span>
                    {item.deal && item.discount ? (
                      <div className="inline-flex md:flex md:flex-col items-baseline md:items-center gap-1 sm:gap-2">
                        <p className="text-base sm:text-lg font-bold tracking-wide text-red-500">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-xs sm:text-sm font-light tracking-wide text-gray-400 line-through">
                          ${(item.price / (1 - item.discount)).toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p className="inline-block text-base sm:text-lg font-bold tracking-wide text-white">
                        ${item.price.toFixed(2)}
                      </p>
                    )}
                  </div>

                  {/* QUANTITY */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-[#2A2F36] rounded-md bg-[#1a1d21]">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 hover:text-[#3055D4] transition border-r border-[#2A2F36] active:bg-[#2A2F36]"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 hover:text-[#3055D4] transition border-l border-[#2A2F36] active:bg-[#2A2F36]"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL & REMOVE */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 sm:gap-4">
                    <span className="md:hidden text-gray-500 text-xs sm:text-sm">
                      Total:
                    </span>
                    <div className="font-bold text-base sm:text-lg flex-1 md:flex-none text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="hidden md:block text-gray-500 hover:text-red-500 transition p-1 hover:bg-[#2A2F36] rounded-full"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- SUMMARY SECTION --- */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-stretch md:items-end border-t border-[#2A2F36] pt-6 sm:pt-8">
              <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-3 sm:space-y-4">
                <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                  <span>Sales Tax:</span>
                  <span className="text-white font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-xs sm:text-sm pt-2 pb-3 sm:pb-4 border-b border-[#2A2F36]">
                  <span>Coupon Code:</span>
                  <button className="text-[#3055D4] hover:underline active:text-[#2044c0]">
                    Add Coupon
                  </button>
                </div>

                <div className="flex justify-between items-center text-xl sm:text-2xl font-bold pt-2">
                  <span>Grand total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <div className="pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-green-500 text-right mb-2 font-medium">
                    Congrats, you're eligible for Free Shipping
                  </p>
                  {/* Green Progress Bar Line */}
                  <div className="w-full h-1 bg-[#2A2F36] rounded-full overflow-hidden mb-4 sm:mb-6">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    className="w-full justify-center py-3 sm:py-4 text-base sm:text-lg"
                  >
                    Check out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-sm mb-6 sm:mb-8">
              Looks like you haven't added any gadgets yet.
            </p>
            <Link href="/shop">
              <Button type="primary" size="large" className="px-6 sm:px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
