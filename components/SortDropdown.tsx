"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SortDropdownProps = {
  currentSort: string;
  onSortChange: (value: string) => void;
};

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Product Rating", value: "rating" },
];

const SortDropdown = ({ currentSort, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  // Find the label for the current selection to display on the button
  const currentLabel = sortOptions.find(
    (opt) => opt.value === currentSort
  )?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1a1d21] border border-[#2A2F36] px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:border-[#3055D4] hover:text-white transition-all min-w-[200px] justify-between"
      >
        <span>
          <span className="text-gray-500">Sort by: </span>
          <span className="font-medium text-white">{currentLabel}</span>
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-[#1a1d21] border border-[#2A2F36] rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          <ul className="py-2">
            {sortOptions.map((option) => {
              const isSelected = currentSort === option.value;

              return (
                <li key={option.value}>
                  <button
                    onClick={() => handleSelect(option.value)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-[#2A2F36]/50 transition-colors"
                  >
                    {/* Radio Circle UI */}
                    <div
                      className={`flex justify-center items-center w-5 h-5 rounded-full border-2 transition-all ${
                        isSelected ? "border-[#3055D4]" : "border-gray-500"
                      }`}
                    >
                      {/* Inner Dot */}
                      {isSelected && (
                        <div className="w-2.5 h-2.5 bg-[#3055D4] rounded-full" />
                      )}
                    </div>

                    <span
                      className={
                        isSelected ? "text-white font-medium" : "text-gray-400"
                      }
                    >
                      {option.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
