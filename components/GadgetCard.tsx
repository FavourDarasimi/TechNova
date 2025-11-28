import Image from "next/image";
import Button from "./Button";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

type GadgetCardProps = {
  id: number;
  name: string;
  rating: number;
  price: number;
  category: string;
  imageUrl: string;
  best_selling?: boolean; // Made optional
  new?: boolean; // Made optional
};

const GadgetCard = ({
  name,
  rating,
  price,
  category,
  imageUrl,
  new: isNew,
}: GadgetCardProps) => {
  return (
    <div className="group relative p-3 rounded-2xl border border-[#2A2F36] bg-[#1a1d21] transition-all duration-300 hover:border-[#3055D4] hover:shadow-lg hover:shadow-[#3055D4]/20">
      {/* "NEW" Badge Logic */}
      {isNew && (
        <span className="absolute top-5 left-5 z-10 bg-[#3055D4] text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider">
          NEW
        </span>
      )}

      {/* Image Container with Hover Zoom */}
      <div className="overflow-hidden rounded-xl bg-[#2A2F36]">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={600}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-5 flex justify-between items-center">
        <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs tracking-wide font-medium">
          {category}
        </span>

        <div className="flex items-center gap-1 text-yellow-400">
          <StarIcon className="h-4 w-4" />
          <p className="text-xs font-semibold text-white">{rating}</p>
        </div>
      </div>

      <h3 className="mt-3 text-lg font-medium text-gray-100 truncate">
        {name}
      </h3>
      <p className="mt-1 text-xl font-bold tracking-wide text-white">
        ${price}
      </p>

      <div className="mt-5 flex gap-3">
        <Button
          type="primary"
          size="medium"
          className="flex-1 text-sm font-semibold"
        >
          Buy Now
        </Button>

        {/* Cart Button */}
        <button className="bg-[#2A2F36] hover:bg-white hover:text-black transition-colors rounded-lg p-3 text-white border border-gray-700">
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default GadgetCard;
