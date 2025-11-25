import Image from "next/image";
import hero from "@/public/images/download.png";
import Button from "@/components/Button";

export default function Home() {
  return (
    <section className="mt-10">
      <div className="flex items-center  h-full mx-40">
        <div>
          <h1 className="text-7xl font-bold">Discover the Future of Tech</h1>
          <h3 className="text-3xl mt-5 mb-10 text-gray-600">
            Smart gadgets that elevate your everyday life.
          </h3>
          <Button>Explore</Button>
        </div>
        <Image
          src={hero}
          alt="Hero Section"
          width={1000}
          height={1000}
          className=""
        />
      </div>
    </section>
  );
}
