import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Plus } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/utils";
import clsx from "clsx";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl md:rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-[4/3] overflow-hidden bg-slate-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex justify-center bg-gradient-to-t from-black/50 to-transparent pt-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, "M"); // Default size for quick add, or open modal
            }}
            className="bg-white text-text font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-slate-50 active:scale-95 transition-all text-sm flex items-center gap-2"
          >
            <Plus size={16} /> Quick Add
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-xs text-slate-500 font-medium">
              {product.category}
            </p>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-semibold text-text leading-tight group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={clsx(
              "transition-colors",
              isWishlisted
                ? "text-primary fill-current"
                : "text-slate-300 hover:text-slate-500",
            )}
          >
            <Heart
              size={20}
              className={isWishlisted ? "fill-primary text-primary" : ""}
            />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">
            {formatCurrency(product.price)}
          </span>

          {/* Mobile Add Button */}
          <button
            onClick={() => addToCart(product, "M")}
            className="md:hidden w-8 h-8 flex items-center justify-center bg-text text-white rounded-full active:scale-90 transition-transform"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
