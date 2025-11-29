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
    <section className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-12 relative">
          <Link
            href="/shop"
            className="absolute left-0 top-1 p-2 text-gray-400 hover:text-white transition hidden md:block"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Your Cart{" "}
            <span className="text-gray-500 text-2xl">
              ({cartItems.length} items)
            </span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div>
            {/* --- TABLE HEADERS (Desktop Only) --- */}
            <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-[#2A2F36] text-sm font-semibold text-gray-400 uppercase tracking-wider">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* --- CART ITEMS --- */}
            <div className="space-y-6 md:space-y-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-[#2A2F36] last:border-0"
                >
                  {/* ITEM DETAILS */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="w-24 h-24 bg-[#1a1d21] rounded-lg relative overflow-hidden flex-shrink-0 border border-[#2A2F36]">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {item.name}
                      </h3>
                      {item.category && (
                        <p className="text-sm text-[#3055D4] font-medium mt-1">
                          {item.category}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">In Stock</p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="col-span-1 md:col-span-2 md:text-center text-gray-300 font-medium">
                    <span className="md:hidden text-gray-500 text-sm mr-2">
                      Price:
                    </span>
                    ${item.price.toFixed(2)}
                  </div>

                  {/* QUANTITY */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-[#2A2F36] rounded-md bg-[#1a1d21]">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 hover:text-[#3055D4] transition border-r border-[#2A2F36]"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 hover:text-[#3055D4] transition border-l border-[#2A2F36]"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL & REMOVE */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                    <span className="md:hidden text-gray-500 text-sm">
                      Total:
                    </span>
                    <div className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500 transition p-1 hover:bg-[#2A2F36] rounded-full"
                      title="Remove item"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- SUMMARY SECTION --- */}
            <div className="mt-12 flex flex-col items-end border-t border-[#2A2F36] pt-8">
              <div className="w-full md:w-1/2 lg:w-1/3 space-y-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Sales Tax:</span>
                  <span className="text-white font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-sm pt-2 pb-4 border-b border-[#2A2F36]">
                  <span>Coupon Code:</span>
                  <button className="text-[#3055D4] hover:underline">
                    Add Coupon
                  </button>
                </div>

                <div className="flex justify-between items-center text-2xl font-bold pt-2">
                  <span>Grand total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-green-500 text-right mb-2 font-medium">
                    Congrats, you're eligible for Free Shipping
                  </p>
                  {/* Green Progress Bar Line */}
                  <div className="w-full h-1 bg-[#2A2F36] rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    className="w-full justify-center py-4 text-lg"
                  >
                    Check out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 max-w-sm mb-8">
              Looks like you haven't added any gadgets yet.
            </p>
            <Link href="/shop">
              <Button type="primary" size="large">
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
