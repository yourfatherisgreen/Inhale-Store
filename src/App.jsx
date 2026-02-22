import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "@/context/ShopContext";
import { NotificationProvider } from "@/context/NotificationContext"; // Import NotificationProvider
import ToastContainer from "@/components/Toast"; // Import ToastContainer
import AdaptiveLayout from "@/layouts/AdaptiveLayout";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Success from "@/pages/Success";
import PlaceholderPage from "@/pages/Placeholder";
import Collections from "@/pages/Collections";
import OrderHistory from "@/pages/OrderHistory";
import Wishlist from "@/pages/Wishlist";
import Search from "@/pages/Search";

function App() {
  return (
    <NotificationProvider>
      {" "}
      {}
      <ShopProvider>
        <BrowserRouter>
          <ToastContainer /> {}
          <Routes>
            <Route path="/" element={<AdaptiveLayout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="collections" element={<Collections />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="search" element={<Search />} />
              <Route path="cart" element={<Cart />} />
              <Route path="success" element={<Success />} />

              <Route
                path="new-arrivals"
                element={<PlaceholderPage title="New Arrivals" />}
              />
              <Route
                path="accessories"
                element={<PlaceholderPage title="Accessories" />}
              />
              <Route path="sale" element={<PlaceholderPage title="Sale" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopProvider>
    </NotificationProvider>
  );
}

export default App;
