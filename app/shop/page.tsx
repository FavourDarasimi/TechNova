"use client";

import { useState, useMemo } from "react";
import GadgetCard from "@/components/GadgetCard";
import SideBarFilter from "@/components/SideBarFilter";
import SortDropdown from "@/components/SortDropdown";
import gadgetsData from "@/data/gadgets.json";

const categories = [
  "All",
  "Audio",
  "Camera",
  "Drone",
  "Laptop",
  "Smartphone",
  "Smartwatch",
  "Tablet",
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("popularity");

  const processedGadgets = useMemo(() => {
    let result = gadgetsData.filter((gadget) => {
      const categoryMatch =
        activeCategory === "All" || gadget.category === activeCategory;

      const price = gadget.price;
      const minMatch = minPrice === "" || price >= Number(minPrice);
      const maxMatch = maxPrice === "" || price <= Number(maxPrice);

      const ratingMatch = minRating === null || gadget.rating >= minRating;

      return categoryMatch && minMatch && maxMatch && ratingMatch;
    });

    result.sort((a, b) => {
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "newest") return a.new === b.new ? 0 : a.new ? -1 : 1;
      return 0;
    });

    return result;
  }, [activeCategory, minPrice, maxPrice, minRating, sortOption]);

  return (
    <section className="min-h-screen bg-[#050505] text-white py-10 px-4 md:px-8">
      <div className=" mx-auto flex flex-col lg:flex-row gap-10">
        <SideBarFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
        />

        <main className="lg:w-7/8">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 border-b border-[#2A2F36] pb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {activeCategory} Gadgets
              </h1>
              <p className="text-gray-400 mt-1 text-sm">
                Showing {processedGadgets.length} results
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <SortDropdown
                currentSort={sortOption}
                onSortChange={setSortOption}
              />
            </div>
          </div>

          {processedGadgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {processedGadgets.map((gadget) => (
                <GadgetCard
                  key={gadget.id}
                  id={gadget.id}
                  name={gadget.name}
                  price={gadget.price}
                  rating={gadget.rating}
                  category={gadget.category}
                  imageUrl={gadget.image}
                  new={gadget.new}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1a1d21] rounded-xl border border-[#2A2F36]">
              <p className="text-xl text-gray-400 font-medium">
                No gadgets found matching your filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setMinPrice("");
                  setMaxPrice("");
                  setMinRating(null);
                }}
                className="mt-4 text-[#3055D4] hover:text-white underline transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ShopPage;
