import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/hero-section.webp";
import Button from "@/components/Button";
import gadgets from "@/data/gadgets.json";
import GadgetCard from "@/components/GadgetCard";
import CountdownTimer from "@/components/CountdownTimer";
import CustomerReviews from "@/components/CustomerReviews";
import BestSellingCarousel from "@/components/BestSellingCarousel";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";

export default function Home() {
  const dealGadget =
    gadgets.filter((gadget) => gadget.best_selling)[
      Math.floor(Math.random() * gadgets.filter((gadget) => gadget.best_selling).length)
    ];

  return (
    <section>
      <div className="flex justify-center items-center bg-linear-to-r from-black to-[#3055D4]">
        <div className=" text-white text-left">
          <p className="text-[19px] text-[#3055D4] tracking-widest font-semibold">
            WELCOME TO TECHNOVA
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl ">
            Upgrade Your World
          </h1>

          <p className="mt-14 max-w-2xl text-xl text-gray-300 ">
            From smart home essentials to the latest wearables—find everything
            you need to stay connected and ahead of the curve.
          </p>
          <div className="flex gap-4 mt-14">
            <Link href="/shop">
              <Button type="primary" size="large">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {/* You can replace these with user avatars later */}
              <div className="w-8 h-8 rounded-full bg-gray-700 border border-black"></div>
              <div className="w-8 h-8 rounded-full bg-gray-600 border border-black"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border border-black"></div>
            </div>
            <p>Trusted by 2,000+ Tech Enthusiasts</p>
          </div>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <Image
            src={hero}
            alt="Hero Section"
            className="h-[600px] rounded-xl "
          />
        </div>
      </div>

      <div className="mx-28 mt-20">
        <BestSellingCarousel />
      </div>
      <div className=" my-20 max-w-5xl mx-auto  p-8 rounded-2xl shadow-lg border border-[#3055D4]">
        <div className="flex justify-center items-center">
          <div className="w-1/2 flex justify-center">
            <Image
              src={dealGadget.image}
              alt={dealGadget.name}
              width={400}
              height={400}
              className="rounded-xl"
            />
          </div>
          <div className="w-1/2 text-white pl-10 relative">
            <div className="absolute top-0 left-0 bg-[#F7C300] text-[#1F1F1F] px-4 py-1 rounded-tr-lg rounded-bl-lg font-bold text-sm uppercase">
              Deal of the Day
            </div>
            <h2 className="text-3xl font-bold mt-12">{dealGadget.name}</h2>
            <div className="flex items-baseline mt-6">
              <p className="text-4xl font-bold text-[#3055D4]">
                ${(dealGadget.price * 0.8).toFixed(2)}
              </p>
              <p className="text-xl text-gray-400 line-through ml-4">
                ${dealGadget.price}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <div className="text-[#F7C300] text-lg mr-2">★★★★☆</div>
              <span className="text-gray-400">18,248 customer reviews</span>
            </div>

            <div className="mt-8">
              <Button
                type="primary"
                size="large"
                className="w-full bg-[#3055D4] hover:bg-[#2542A3] text-white font-bold py-4 rounded-full transition-colors"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CustomerReviews />
    </section>
  );
}
