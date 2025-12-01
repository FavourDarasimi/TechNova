"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import hero from "@/public/images/hero-section.webp";
import Button from "@/components/Button";
import gadgets from "@/data/gadgets.json";
import CustomerReviews from "@/components/CustomerReviews";
import BestSellingCarousel from "@/components/BestSellingCarousel";

export default function Home() {
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();
  const dealGadget = gadgets[dayOfYear % gadgets.length];

  return (
    <section>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse lg:flex-row justify-center items-center bg-linear-to-r from-black to-[#3055D4] px-4 sm:px-6 lg:px-12 py-8 lg:py-12"
      >
        <div className="text-white text-left w-full lg:w-1/2 mt-8 lg:mt-0">
          <p className="text-sm sm:text-base md:text-[19px] text-[#3055D4] tracking-widest font-semibold">
            WELCOME TO TECHNOVA
          </p>
          <h1 className="mt-3 sm:mt-4 lg:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight">
            Upgrade Your World
          </h1>

          <p className="mt-6 sm:mt-8 lg:mt-14 max-w-2xl text-base sm:text-lg lg:text-xl text-gray-300">
            From smart home essentials to the latest wearables—find everything
            you need to stay connected and ahead of the curve.
          </p>

          <div className="flex gap-4 mt-6 sm:mt-8 lg:mt-14">
            <Link href="/shop">
              <Button type="primary" size="large">
                Shop Now
              </Button>
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-12  flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex -space-x-2">
              <Image
                src="https://i.pravatar.cc/150?img=69"
                alt="Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <Image
                src="https://i.pravatar.cc/150?img=3"
                alt="Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <Image
                src="https://i.pravatar.cc/150?img=33"
                alt="Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
            </div>
            <p>Trusted by 2,000+ Tech Enthusiasts</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src={hero}
            alt="Hero Section"
            className="w-full max-w-md lg:max-w-none h-auto lg:h-[600px] rounded-xl object-contain"
          />
        </div>
      </motion.div>

      {/* Best Selling Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-4 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-28 mt-12 sm:mt-16 lg:mt-20"
      >
        <BestSellingCarousel />
      </motion.div>

      {/* Deal of the Day Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="my-12 sm:my-16 lg:my-20 max-w-5xl mx-4 sm:mx-6 lg:mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-[#3055D4]"
      >
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-0">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={dealGadget.image}
              alt={dealGadget.name}
              width={400}
              height={400}
              className="rounded-xl w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
            />
          </div>

          <div className="w-full lg:w-1/2 text-white lg:pl-10 relative">
            <div className="absolute -top-4 sm:top-0 left-0 bg-[#F7C300] text-[#1F1F1F] px-3 sm:px-4 py-1 rounded-tr-lg rounded-bl-lg font-bold text-xs sm:text-sm uppercase">
              Deal of the Day
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-12">
              {dealGadget.name}
            </h2>

            <div className="flex items-baseline mt-4 sm:mt-6">
              <p className="text-3xl sm:text-4xl font-bold text-[#3055D4]">
                ${(dealGadget.price * 0.8).toFixed(2)}
              </p>
              <p className="text-lg sm:text-xl text-gray-400 line-through ml-3 sm:ml-4">
                ${dealGadget.price}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-1 sm:gap-0">
              <div className="text-[#F7C300] text-base sm:text-lg sm:mr-2">
                ★★★★☆
              </div>
              <span className="text-gray-400 text-sm sm:text-base">
                18,248 customer reviews
              </span>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button
                type="primary"
                size="large"
                className="w-full bg-[#3055D4] hover:bg-[#2542A3] text-white font-bold py-3 sm:py-4 rounded-full transition-colors"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customer Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <CustomerReviews />
      </motion.div>
    </section>
  );
}
