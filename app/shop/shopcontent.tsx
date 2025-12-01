"use client";

import { useState, useMemo } from "react";
import GadgetCard from "@/components/GadgetCard";
import SideBarFilter from "@/components/SideBarFilter";
import SortDropdown from "@/components/SortDropdown";
import gadgetsData from "@/data/gadgets.json";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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

const ShopContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("popularity");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();
  const dealGadget = gadgetsData[dayOfYear % gadgetsData.length];

  const processedGadgets = useMemo(() => {
    let result = gadgetsData.filter((gadget) => {
      const categoryMatch =
        activeCategory === "All" || gadget.category === activeCategory;

      const price = gadget.price;
      const minMatch = minPrice === "" || price >= Number(minPrice);
      const maxMatch = maxPrice === "" || price <= Number(maxPrice);

      const ratingMatch = minRating === null || gadget.rating >= minRating;

      const searchMatch =
        !searchQuery ||
        gadget.name.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        categoryMatch && minMatch && maxMatch && ratingMatch && searchMatch
      );
    });

    result.sort((a, b) => {
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "newest") return a.new === b.new ? 0 : a.new ? -1 : 1;
      return 0;
    });

    return result;
  }, [activeCategory, minPrice, maxPrice, minRating, sortOption, searchQuery]);

  const handleClearFilters = () => {
    setActiveCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white py-6 sm:py-8 lg:py-10 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        {/* Sidebar Filter */}
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

        {/* Main Content */}
        <main className="flex-1 lg:w-0">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-[#2A2F36] pb-4 sm:pb-6"
          >
            <div className="w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                {activeCategory} Gadgets
              </h1>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm">
                {searchQuery && (
                  <span className="inline-block mr-2">
                    Search:{" "}
                    <span className="text-[#3055D4] font-medium">
                      "{searchQuery}"
                    </span>{" "}
                    •
                  </span>
                )}
                Showing {processedGadgets.length} result
                {processedGadgets.length !== 1 && "s"}
              </p>
            </div>

            <div className="w-full sm:w-auto">
              <SortDropdown
                currentSort={sortOption}
                onSortChange={setSortOption}
              />
            </div>
          </motion.div>

          {/* Products Grid or Empty State */}
          {processedGadgets.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {processedGadgets.map((gadget) => (
                <motion.div key={gadget.id} variants={itemVariants}>
                  <GadgetCard
                    id={gadget.id}
                    name={gadget.name}
                    price={gadget.price}
                    rating={gadget.rating}
                    category={gadget.category}
                    imageUrl={gadget.image}
                    new={gadget.new}
                    deal={gadget.id === dealGadget.id}
                    discount={0.2}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 px-4 text-center bg-[#1a1d21] rounded-xl border border-[#2A2F36]"
            >
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-2">
                No gadgets found
              </p>
              <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md">
                {searchQuery
                  ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                  : "No gadgets match your current filters. Try adjusting your criteria."}
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#3055D4] hover:bg-[#2544b8] text-white font-medium px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ShopContent;
