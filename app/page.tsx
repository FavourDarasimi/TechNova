import Image from "next/image";
import hero from "@/public/images/hero-section2.png";
import hero2 from "@/public/images/hero-section.png";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center">
      <div className="w-[95%] relative flex justify-center items-center">
        <Image
          src={hero}
          alt="Hero Section"
          className="h-[700px] rounded-xl  bg-black/50"
        />
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

        <div className="absolute text-white z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Upgrade Your World
          </h1>

          <p className="mt-4 max-w-2xl text-xl text-gray-300 mb-10">
            From smart home essentials to the latest wearables—find everything
            you need to stay connected and ahead of the curve.
          </p>

          <div className="flex gap-4">
            <Button type="primary">Shop Now</Button>
            <Button type="white-outline">View Categories</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
