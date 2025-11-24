import Image from "next/image";
import hero from "@/public/images/hero-section.png";

export default function Home() {
  return (
    <section className="h-screen">
      <div className="flex">
        <div>
          <h1 className="text-6xl font-bold">Discover the Future of Tech</h1>
          <h3 className="text-xl">
            Smart gadgets that elevate your everyday life.
          </h3>
        </div>
        <Image src={hero} alt="Hero Section" />
      </div>
    </section>
  );
}
