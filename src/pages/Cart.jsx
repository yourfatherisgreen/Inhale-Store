import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckSquare,
  Square,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/utils";
import clsx from "clsx";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, checkout } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  // State for selected items (Set of "id-variant" strings)
  const [selectedItems, setSelectedItems] = useState(() => {
    const selectedKey = location.state?.selectedKey;
    return selectedKey ? new Set([selectedKey]) : new Set();
  });

  // Update selection if items are removed
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedItems((prev) => {
      const next = new Set(prev);
      // Remove any IDs that are no longer in the cart
      const currentIds = new Set(
        cart.map((item) => `${item.id}-${item.variant}`),
      );
      for (const id of next) {
        if (!currentIds.has(id)) {
          next.delete(id);
        }
      }
      return next;
    });
  }, [cart]);

  const toggleItem = (id, variant) => {
    const key = `${id}-${variant}`;
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedItems.size === cart.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(
        new Set(cart.map((item) => `${item.id}-${item.variant}`)),
      );
    }
  };

  const selectedCartItems = cart.filter((item) =>
    selectedItems.has(`${item.id}-${item.variant}`),
  );
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 300000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const trxId = checkout(selectedItems); // Pass selected items Set
    if (trxId) {
      navigate("/success", { state: { trxId } });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBagIcon className="text-slate-400" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-text">Your bag is empty</h2>
        <p className="text-slate-500 max-w-xs mx-auto">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-8 bg-text text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 md:py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <button
              onClick={toggleAll}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {selectedItems.size === cart.length ? (
                <CheckSquare className="text-primary" size={20} />
              ) : (
                <Square className="text-slate-300" size={20} />
              )}
              Select All ({cart.length})
            </button>
          </div>

          <div className="space-y-6">
            {cart.map((item) => {
              const key = `${item.id}-${item.variant}`;
              const isSelected = selectedItems.has(key);

              return (
                <div
                  key={key}
                  className={clsx(
                    "flex gap-3 p-3 sm:gap-4 sm:p-4 bg-white rounded-2xl border transition-all duration-300 shadow-sm relative group max-w-full",
                    isSelected
                      ? "border-primary/30 ring-1 ring-primary/10"
                      : "border-slate-100",
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleItem(item.id, item.variant)}
                    className="self-center p-1 text-slate-300 hover:text-primary transition-colors shrink-0"
                  >
                    {isSelected ? (
                      <CheckSquare className="text-primary" size={24} />
                    ) : (
                      <Square size={24} />
                    )}
                  </button>

                  <Link
                    to={`/product/${item.id}`}
                    className="w-20 h-20 sm:w-32 sm:h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-text line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {item.category} • Size {item.variant}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.variant, -1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-white rounded-md transition-colors disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.variant, 1)
                            }
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-lg ml-2">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary - Sticky on Desktop */}
        <div className="lg:w-96 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Selected Items</span>
                <span>{selectedItems.size}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </span>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.size === 0}
              className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-all hover:bg-red-600 disabled:bg-slate-300 disabled:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
            >
              Checkout ({selectedItems.size}) <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon({ className, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
