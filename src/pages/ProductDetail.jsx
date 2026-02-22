import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  X,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS, formatCurrency } from "@/utils";
import ProductCard from "@/components/ProductCard";
import clsx from "clsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();

  const product = PRODUCTS.find((p) => p.id === id);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  const isShoe = product.type === "shoes";

  // Apparel State
  const [selectedApparelSize, setSelectedApparelSize] = useState("M");
  const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Shoe State
  const [selectedShoeSize, setSelectedShoeSize] = useState("42");
  const shoeSizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];

  // Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsImageModalOpen(false);
      }
    };
    if (isImageModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isImageModalOpen]);

  const currentSize = isShoe ? selectedShoeSize : selectedApparelSize;
  const currentSizeOptions = isShoe ? shoeSizes : apparelSizes;
  const setSize = isShoe ? setSelectedShoeSize : setSelectedApparelSize;

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* Image Modal */}
      {isImageModalOpen &&
        document.body &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-fade-in">
            {/* Mobile Modal Header */}
            <div className="md:hidden flex items-center justify-between py-4 px-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h1 className="font-bold text-lg text-slate-800 truncate pr-4">
                {product.name}
              </h1>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 -mr-2 text-slate-600 active:scale-50 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            {/* Desktop Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="hidden md:flex absolute top-8 right-8 bg-white/80 hover:bg-white shadow-sm border border-slate-200 backdrop-blur-md p-3 rounded-full text-slate-800 transition-all z-[110] hover:scale-105 active:scale-95"
            >
              <X size={28} />
            </button>

            {/* Image Container */}
            <div className="flex-1 overflow-hidden flex items-start md:items-center justify-center p-4 md:p-12">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto md:h-full object-contain md:object-center mt-4 md:mt-0"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body,
        )}
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between py-4 mb-4 sticky top-0 bg-white/80 backdrop-blur-md z-10 -mx-4 px-4 border-b border-slate-100">
        <button
          onClick={() => navigate("/collections")}
          className="p-2 -ml-2 text-slate-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg truncate px-4">{product.name}</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div
            className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => setIsImageModalOpen(true)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="hidden md:block text-4xl font-black tracking-tight text-text leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(product.price)}
            </p>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Size Selector */}
          <div>
            <h3 className="font-semibold mb-3">Select Size</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {currentSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSize(size)}
                  className={clsx(
                    "py-3 rounded-xl border text-sm font-medium transition-all active:scale-95",
                    currentSize === size
                      ? "border-text bg-text text-white shadow-md"
                      : "border-slate-200 hover:border-text text-slate-600",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-stretch gap-4 pt-4 border-t border-slate-100">
            <div className="flex-1 flex flex-col gap-4">
              <button
                onClick={() => addToCart(product, currentSize)}
                className="w-full border-2 border-primary text-primary font-bold h-16 rounded-full active:scale-95 transition-all hover:bg-primary/5 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={24} />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product, currentSize);
                  navigate("/cart", {
                    state: { selectedKey: `${product.id}-${currentSize}` },
                  });
                }}
                className="w-full bg-primary text-white font-bold h-16 rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-all hover:bg-red-600 flex items-center justify-center gap-1"
              >
                Order Now
              </button>
            </div>
            <button
              onClick={toggleWishlist}
              className={clsx(
                "w-14 min-h-full rounded-full border border-slate-200 flex items-center justify-center transition-all active:scale-95 hover:border-primary shrink-0",
                isWishlisted
                  ? "text-primary bg-primary/5 border-primary"
                  : "text-slate-400",
              )}
            >
              <Heart size={28} className={isWishlisted ? "fill-current" : ""} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="space-y-4 pt-6 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <Truck size={20} />
              <span>Free delivery on orders over {formatCurrency(300000)}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <span>1-year warranty on all products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
