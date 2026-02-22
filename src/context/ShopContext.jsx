import { createContext, useContext, useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const { showNotification } = useNotification();

  // Load initial state from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Actions
  const addToCart = (product, variant) => {
    setCart((prev) => {
      // Check if item with same ID and variant exists
      const existing = prev.find(
        (item) => item.id === product.id && item.variant === variant,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, variant, quantity: 1 }];
    });
    showNotification(`Added ${product.name} to cart`, "success");
  };

  const removeFromCart = (productId, variant) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.variant === variant),
      ),
    );
    showNotification("Item removed from cart", "info");
  };

  const updateQuantity = (productId, variant, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.variant === variant) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const addToWishlist = (product) => {
    // Check if already in wishlist to avoid double notifications/state updates
    if (wishlist.some((item) => item.id === product.id)) {
      showNotification("Item already in wishlist", "info");
      return;
    }

    setWishlist((prev) => [...prev, product]);
    showNotification("Added to wishlist", "success");
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showNotification("Removed from wishlist", "info");
  };

  const checkout = (selectedItemIds = null) => {
    if (cart.length === 0) return;

    // Filter items to checkout
    const itemsToCheckout = selectedItemIds
      ? cart.filter((item) => selectedItemIds.has(`${item.id}-${item.variant}`))
      : cart;

    if (itemsToCheckout.length === 0) return;

    const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newTransaction = {
      id: transactionId,
      date: new Date().toISOString(),
      items: [...itemsToCheckout],
      total: itemsToCheckout.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    };

    setHistory((prev) => [newTransaction, ...prev]);

    // Order-Clear Rule:
    const purchasedIds = new Set(itemsToCheckout.map((item) => item.id));
    setWishlist((prev) => prev.filter((item) => !purchasedIds.has(item.id)));

    // Remove only checked out items from cart
    if (selectedItemIds) {
      setCart((prev) =>
        prev.filter(
          (item) => !selectedItemIds.has(`${item.id}-${item.variant}`),
        ),
      );
    } else {
      setCart([]); // Clear all if no selection passed (fallback)
    }

    return transactionId;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        history,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        checkout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  return useContext(ShopContext);
}
