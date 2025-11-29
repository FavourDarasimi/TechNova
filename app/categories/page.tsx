import Link from "next/link";
import {
  SpeakerWaveIcon, // For Audio
  CameraIcon, // For Camera
  PaperAirplaneIcon, // For Drone (Metaphor for flight)
  ComputerDesktopIcon, // For Laptop
  DevicePhoneMobileIcon, // For Smartphone
  ClockIcon, // For Smartwatch
  DeviceTabletIcon, // For Tablet
  ArrowUpRightIcon, // For the hover arrow
} from "@heroicons/react/24/outline";
import gadgets from "@/data/gadgets.json";

const categories = [
  {
    name: "Audio",
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    count: "12 Items",
    link: "/shop?category=audio",
  },
  {
    name: "Camera",
    icon: <CameraIcon className="w-8 h-8" />,
    count: "8 Items",
    link: "/shop?category=camera",
  },
  {
    name: "Drone",
    icon: <PaperAirplaneIcon className="w-8 h-8" />,
    count: "5 Items",
    link: "/shop?category=drone",
  },
  {
    name: "Laptop",
    icon: <ComputerDesktopIcon className="w-8 h-8" />,
    count: "15 Items",
    link: "/shop?category=laptop",
  },
  {
    name: "Smartphone",
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    count: "24 Items",
    link: "/shop?category=smartphone",
  },
  {
    name: "Smartwatch",
    icon: <ClockIcon className="w-8 h-8" />,
    count: "9 Items",
    link: "/shop?category=smartwatch",
  },
  {
    name: "Tablet",
    icon: <DeviceTabletIcon className="w-8 h-8" />,
    count: "7 Items",
    link: "/shop?category=tablet",
  },
];

const getgadgetcount = (categoryName: string) => {
  return gadgets.filter(
    (gadget) => gadget.category.toLowerCase() === categoryName.toLowerCase()
  ).length;
};

export default function CategoriesPage() {
  return (
    <section className="min-h-screen bg-[#050505] py-20 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Browse by <span className="text-[#3055D4]">Category</span>
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Explore our wide range of premium gadgets tailored to your needs.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link
            href={cat.link}
            key={index}
            className="group relative bg-[#1a1d21] border border-[#2A2F36] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:border-[#3055D4] hover:shadow-[0_0_30px_rgba(48,85,212,0.15)]"
          >
            {/* Icon Container with Glow Effect */}
            <div className="h-20 w-20 bg-[#2A2F36] rounded-full flex items-center justify-center text-gray-300 group-hover:bg-[#3055D4] group-hover:text-white transition-colors duration-300">
              {cat.icon}
            </div>

            {/* Text */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white group-hover:text-[#3055D4] transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-300">
                {getgadgetcount(cat.name)} Items
              </p>
            </div>

            {/* Arrow Icon that appears on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRightIcon className="w-5 h-5 text-[#3055D4]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
