import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import logoImg from "../assets/logo.webp";
import { useShop } from "../context/ShopContext";

const categories = [
  { label: "Home", path: "/" },
  { label: "Collections", path: "/collections" },
  { label: "Order History", path: "/order-history" },
];

export default function DesktopNav() {
  const { wishlist, cart } = useShop();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="h-20 w-20 mt-2">
          <img src={logoImg} alt="logo"></img>
        </Link>

        {/* Center: Search Bar */}
        <form
          className="relative hidden sm:block flex-1 max-w-lg mx-auto pr-5"
          onSubmit={(e) => {
            e.preventDefault();
            const query = e.currentTarget.elements.search.value;
            if (query.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
          }}
        >
          <input
            name="search"
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-primary w-full transition-all"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
        </form>

        {/* Right: Nav Links + Actions */}
        <div className="flex items-center space-x-6 shrink-0">
          {/* Categories */}
          <nav className="hidden lg:flex items-center space-x-6 mr-2">
            {categories.map((cat) => (
              <NavLink
                key={cat.path}
                to={cat.path}
                className={({ isActive }) =>
                  clsx(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-slate-600",
                  )
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/wishlist"
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-700 hover:text-primary relative"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-700 hover:text-primary relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
