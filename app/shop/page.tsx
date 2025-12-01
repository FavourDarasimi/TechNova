import { Suspense } from "react";
import ShopContent from "./shopcontent";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3055D4] mx-auto mb-4"></div>
            <p>Loading products...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
