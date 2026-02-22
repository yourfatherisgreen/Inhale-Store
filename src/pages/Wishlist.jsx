import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <Heart size={40} />
        </div>
        <h2 className="text-2xl font-bold text-text">Your wishlist is empty</h2>
        <p className="text-slate-500 max-w-xs mx-auto">
          Save items you love to revisit them later.
        </p>
        <Link
          to="/"
          className="mt-8 bg-text text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors"
        >
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
