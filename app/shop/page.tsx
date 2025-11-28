"use client";

import { useState } from "react";
import GadgetCard from "@/components/GadgetCard"; // Ensure path is correct
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import gadgets from "@/data/gadgets.json";

const categories = [
  "All",
  "Smartphone",
  "Audio",
  "Laptop",
  "Drone",
  "Camera",
  "Gaming",
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredGadgets =
    activeCategory === "All"
      ? gadgets
      : gadgets.filter((item) => item.category === activeCategory);

  return (
    <section className="min-h-screen bg-[#050505] text-white py-10 px-4 md:px-8">
      {/* --- HEADER --- */}
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-end md:items-center mb-10 border-b border-[#2A2F36] pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Shop <span className="text-[#3055D4]">Gadgets</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Showing {filteredGadgets.length} results
          </p>
        </div>

        {/* Sort Dropdown (Visual Only) */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <span className="text-sm text-gray-500">Sort by:</span>
          <button className="flex items-center gap-2 bg-[#1a1d21] border border-[#2A2F36] px-4 py-2 rounded-lg text-sm hover:border-[#3055D4] transition">
            Most Popular <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className=" mx-auto flex flex-col lg:flex-row gap-10">
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="lg:w-1/4">
          <div className="sticky top-24 space-y-8">
            {/* Mobile Filter Toggle (Visual cue for mobile) */}
            <div className="lg:hidden mb-4 flex items-center gap-2 text-[#3055D4]">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span className="font-semibold">Filter Categories</span>
            </div>

            {/* Category List */}
            <div className="bg-[#1a1d21] border border-[#2A2F36] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 border-l-4 border-[#3055D4] pl-3">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left text-sm transition-colors duration-200 flex justify-between items-center group ${
                        activeCategory === cat
                          ? "text-[#3055D4] font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {cat}
                      {/* Little dot indicator for active state */}
                      {activeCategory === cat && (
                        <span className="w-2 h-2 rounded-full bg-[#3055D4]"></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range (Visual Only) */}
            <div className="hidden lg:block bg-[#1a1d21] border border-[#2A2F36] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 border-l-4 border-[#3055D4] pl-3">
                Price Range
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full bg-black border border-[#2A2F36] rounded p-2 focus:border-[#3055D4] outline-none"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full bg-black border border-[#2A2F36] rounded p-2 focus:border-[#3055D4] outline-none"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className="lg:w-3/4">
          {filteredGadgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGadgets.map((gadget) => (
                <GadgetCard
                  key={gadget.id}
                  id={gadget.id}
                  name={gadget.name}
                  price={gadget.price}
                  rating={gadget.rating}
                  category={gadget.category}
                  imageUrl={gadget.image}
                  new={gadget.new}
                  // Add best_selling prop if you added it to GadgetCard
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl text-gray-500">
                No gadgets found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-[#3055D4] underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
