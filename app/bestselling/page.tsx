"use client";
import GadgetCard from "@/components/GadgetCard";
import gadgetsData from "@/data/gadgets.json";

const BestSellingPage = () => {
  const bestSellingGadgets = gadgetsData.filter(
    (gadget) => gadget.best_selling
  );

  return (
    <section className="min-h-screen bg-[#050505] text-white py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-8">
          Best Selling Gadgets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {bestSellingGadgets.map((gadget) => (
            <GadgetCard
              key={gadget.id}
              id={gadget.id}
              name={gadget.name}
              price={gadget.price}
              rating={gadget.rating}
              category={gadget.category}
              imageUrl={gadget.image}
              new={gadget.new}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingPage;
