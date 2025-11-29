"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

type SideBarFilterProps = {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minRating: number | null;
  setMinRating: (rating: number | null) => void;
};

const SideBarFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
}: SideBarFilterProps) => {
  // Helper to toggle rating (if clicked again, unselect it)
  const toggleRating = (rating: number) => {
    if (minRating === rating) {
      setMinRating(null);
    } else {
      setMinRating(rating);
    }
  };

  return (
    <aside className="lg:w-1/8">
      <div className="sticky top-24 space-y-8">
        {/* Mobile Visual Header */}
        <div className="lg:hidden mb-4 flex items-center gap-2 text-[#3055D4]">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <span className="font-semibold">Filter Categories</span>
        </div>

        {/* 1. CATEGORIES */}
        <div className="bg-[#1a1d21] border border-[#2A2F36] rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 ">Categories</h3>
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
                  {activeCategory === cat && (
                    <span className="w-2 h-2 rounded-full bg-[#3055D4]"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. PRICE RANGE */}
        <div className="bg-[#1a1d21] border border-[#2A2F36] rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 ">Price Range</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-black border border-[#2A2F36] rounded p-2 focus:border-[#3055D4] outline-none text-white"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-black border border-[#2A2F36] rounded p-2 focus:border-[#3055D4] outline-none text-white"
            />
          </div>
        </div>

        {/* 3. PRODUCT RATING */}
        <div className="bg-[#1a1d21] border border-[#2A2F36] rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 ">Product Rating</h3>
          <ul className="space-y-3">
            {[4, 3, 2, 1].map((starCount) => (
              <li key={starCount}>
                <button
                  onClick={() => toggleRating(starCount)}
                  className="flex items-center gap-3 w-full group"
                >
                  {/* Radio Circle UI */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      minRating === starCount
                        ? "border-[#3055D4]"
                        : "border-gray-500 group-hover:border-gray-300"
                    }`}
                  >
                    {minRating === starCount && (
                      <div className="w-2.5 h-2.5 bg-[#3055D4] rounded-full" />
                    )}
                  </div>

                  {/* Stars Display */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) =>
                      i < starCount ? (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <StarIconOutline
                          key={i}
                          className="w-4 h-4 text-gray-600"
                        />
                      )
                    )}
                  </div>

                  <span
                    className={`text-sm ${
                      minRating === starCount ? "text-white" : "text-gray-400"
                    }`}
                  >
                    & Up
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Clear Filters Button */}
        {(minPrice || maxPrice || minRating) && (
          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setMinRating(null);
            }}
            className="w-full text-sm text-red-500 hover:text-red-400 underline text-center block"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideBarFilter;
