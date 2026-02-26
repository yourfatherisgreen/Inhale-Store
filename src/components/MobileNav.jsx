
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useShop } from '../context/ShopContext';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Collections', path: '/collections' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: ShoppingBag, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Order History', path: '/order-history' },
];

export default function MobileNav() {
  const { wishlist, cart } = useShop();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-t border-slate-100 pb-safe">
      <div className="flex justify-around items-center h-16">
        {/* eslint-disable-next-line no-unused-vars */}
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )
            }
          >
            <div className="relative">
              <Icon size={24} strokeWidth={2} />
              {label === 'Wishlist' && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
              {label === 'Cart' && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
