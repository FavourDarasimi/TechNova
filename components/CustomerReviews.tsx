import Image from "next/image";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Olivia Harper",
    role: "Marketing Specialist",
    review:
      "The noise cancellation on the headphones I bought here is a game changer. It has boosted my focus in the open office tenfold!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Software Engineer",
    review:
      "Finally found a store that stocks the latest mechanical keyboards. The delivery was super fast and the packaging was premium.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Digital Artist",
    review:
      "I was skeptical about buying a drawing tablet online, but TechNova's customer support guided me to the perfect model. precise and responsive!",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Marcus Reid",
    role: "Tech Vlogger",
    review:
      "I review gadgets for a living, and this is now my go-to spot for gear. The prices are competitive and the 'Deal of the Day' is legit.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=59",
  },
];

const CustomerReviews = () => {
  return (
    <div className="bg-[#050505] text-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1a1d21] p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl flex flex-col justify-between hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-4 sm:mb-5 lg:mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-white text-base sm:text-lg"
                    />
                  ))}
                  {/* Empty stars for ratings less than 5 */}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-gray-600 text-base sm:text-lg"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-white text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-6 sm:mb-7 lg:mb-8">
                  "{review.review}"
                </p>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* User Image */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="rounded-full object-cover border-2 border-white/20"
                  />
                </div>

                {/* Name and Role */}
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-sm sm:text-base leading-tight">
                    {review.name}
                  </span>
                  <span className="text-purple-200 text-xs sm:text-sm">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
