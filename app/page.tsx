import Image from "next/image";
import hero from "@/public/images/hero-section.webp";
import Button from "@/components/Button";
import gadgets from "@/data/gadgets.json";
import GadgetCard from "@/components/GadgetCard";

export default function Home() {
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
            <Button type="primary" size="large">
              Shop Now
            </Button>
            <Button type="white-outline" size="large">
              View Categories
            </Button>
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
      <div className="grid grid-cols-5 gap-10 mx-28 mt-20">
        {gadgets.map((gadget) => (
          <GadgetCard
            key={gadget.id}
            id={gadget.id}
            name={gadget.name}
            rating={gadget.rating}
            price={gadget.price}
            category={gadget.category}
            imageUrl={gadget.image}
            best_selling={gadget.best_selling}
            new={gadget.new}
          />
        ))}
      </div>
    </section>
  );
}
