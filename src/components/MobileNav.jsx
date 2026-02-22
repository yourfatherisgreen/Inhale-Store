
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Collections', path: '/collections' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: ShoppingBag, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Order History', path: '/order-history' },
];

export default function MobileNav() {
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
            <Icon size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
