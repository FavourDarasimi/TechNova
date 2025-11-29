"use client";
import { useRef } from "react";
import GadgetCard from "@/components/GadgetCard";
import gadgets from "@/data/gadgets.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BestSellingCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestSellingGadgets = gadgets.filter((gadget) => gadget.best_selling);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-10">
        {" "}
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Best Selling Gadgets
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our highest-rated tech selected by thousands of happy
            customers.
          </p>
        </div>{" "}
        <div className="flex gap-3">
          {" "}
          <button
            className="  h-fit bg-[#1a1d21] text-white p-3 rounded-full"
            onClick={() => scroll(-600)}
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            className=" h-fit bg-[#1a1d21] text-white p-3 rounded-full"
            onClick={() => scroll(600)}
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        className="flex overflow-x-auto space-x-6 pb-4"
        ref={scrollContainerRef}
        style={{ scrollbarWidth: "none" }}
      >
        {bestSellingGadgets.map((gadget) => (
          <div key={gadget.id} className="flex-shrink-0 w-64">
            <GadgetCard
              id={gadget.id}
              name={gadget.name}
              rating={gadget.rating}
              price={gadget.price}
              category={gadget.category}
              imageUrl={gadget.image}
              best_selling={gadget.best_selling}
              new={gadget.new}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingCarousel;
