// components/CustomerReviews.tsx
import React from "react";

const reviews = [
  {
    name: "John Doe",
    review:
      "Blazing fast delivery! I ordered my new laptop and it arrived the next day. The packaging was secure and the product was in perfect condition.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review:
      "I was a bit skeptical about ordering a high-value item online, but the authenticity of the product was guaranteed. I am very happy with my purchase.",
    rating: 4,
  },
  {
    name: "Peter Jones",
    review:
      "Excellent customer service and speedy delivery. I had a question about my order and the support team was very helpful. I will definitely be shopping here again.",
    rating: 5,
  },
  {
    name: "Alice Williams",
    review:
      "The product is 100% authentic and the delivery was incredibly fast. I am very impressed with the service and will recommend it to my friends.",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <div className="bg-[#050505] text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#1a1d21] p-8 rounded-xl border border-[#2A2F36]"
            >
              <p className="text-gray-400 mb-4">{review.review}</p>
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 7.09l6.572-.955L10 0l2.939 6.135 6.572.955-4.756 4.455 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-white font-bold">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
