"use client";
import { useRef } from "react";
import GadgetCard from "@/components/GadgetCard";
import gadgets from "@/data/gadgets.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const BestSellingCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();
  const dealGadget = gadgets[dayOfYear % gadgets.length];

  const bestSellingGadgets = gadgets.filter((gadget) => gadget.best_selling);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-4">
        <div className="max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
            Best Selling Gadgets
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Explore our highest-rated tech selected by thousands of happy
            customers.
          </p>
        </div>

        {/* Navigation buttons - hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex gap-2 md:gap-3 flex-shrink-0">
          <button
            className="bg-[#1a1d21] text-white p-2 md:p-3 rounded-full hover:bg-[#2a2d31] transition-colors"
            onClick={() => scroll(-400)}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            className="bg-[#1a1d21] text-white p-2 md:p-3 rounded-full hover:bg-[#2a2d31] transition-colors"
            onClick={() => scroll(400)}
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <motion.div
        className="flex overflow-x-auto space-x-3 sm:space-x-4 md:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        ref={scrollContainerRef}
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bestSellingGadgets.map((gadget) => (
          <motion.div
            key={gadget.id}
            className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-84"
            variants={itemVariants}
          >
            <GadgetCard
              id={gadget.id}
              name={gadget.name}
              rating={gadget.rating}
              price={gadget.price}
              category={gadget.category}
              imageUrl={gadget.image}
              best_selling={gadget.best_selling}
              new={gadget.new}
              deal={gadget.id === dealGadget.id}
              discount={0.2}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden text-center mt-2 text-xs text-gray-500">
        Swipe to see more →
      </div>
    </motion.div>
  );
};

export default BestSellingCarousel;
