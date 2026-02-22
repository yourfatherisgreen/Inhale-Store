import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/utils";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";

const CAMPAIGNS = [
  {
    id: 1,
    mobileImg: "/asset/herosec2.webp",
    desktopImg: "/asset/herosec2.webp",
    title: "RUN FASTER",
    subtitle: "The new Inhale Flash Quantum.",
    cta: "View In Collection",
  },
  {
    id: 2,
    mobileImg: "/asset/herosec1.webp",
    desktopImg: "/asset/herosec1.webp",
    title: "ZERO DISTRACTION",
    subtitle:
      "Inhale Vision can protect your eyes from dust while being stylish",
    cta: "Check It Out",
  },
  {
    id: 3,
    mobileImg: "/asset/herosecc3.webp",
    desktopImg: "/asset/herosecc3.webp",
    title: "NEVER WORRY",
    subtitle:
      "Inhale's Traction providing safety and endless mobility with its vibram outsole",
    cta: "View In Collection",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % CAMPAIGNS.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Carousel */}
      <section className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group">
        {CAMPAIGNS.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Mobile Portrait Image */}
            <div className="block md:hidden aspect-[3/4] relative h-full">
              <img
                src={slide.mobileImg}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h2 className="text-4xl font-black mb-2 leading-none text-white">
                  {slide.title.replace(" ", "\n")}
                </h2>
                <p className="text-sm text-slate-200 mb-4 opacity-90">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => navigate("/Collections")}
                  className="bg-white text-black font-bold py-3 px-6 rounded-full w-full active:scale-95 transition-transform"
                >
                  {slide.cta}
                </button>
              </div>
            </div>

            {/* Desktop Landscape Image */}
            <div className="hidden md:block aspect-[21/9] relative h-full">
              <img
                src={slide.desktopImg}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-12 lg:px-24">
                <div className="max-w-xl text-white space-y-6">
                  <h2 className="text-6xl lg:text-7xl font-black leading-none tracking-tight text-white">
                    {slide.title.replace(" ", "\n")}
                  </h2>
                  <p className="text-lg text-slate-100 max-w-md">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={() => navigate("/Collections")}
                    className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition-colors transform hover:-translate-y-1 shadow-xl"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Aspect Ratio Spacers to maintain height */}
        <div className="block md:hidden aspect-[3/4] Pointer-events-none opacity-0"></div>
        <div className="hidden md:block aspect-[21/9] Pointer-events-none opacity-0"></div>

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {CAMPAIGNS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-white w-6" : "bg-white/50"}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors hidden md:flex"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Mobile Search Button (Persistent) */}
        {/* Mobile Search Input (Persistent) */}
        <form
          className="absolute top-4 left-4 right-4 z-30 md:hidden"
          onSubmit={(e) => {
            e.preventDefault();
            const query = e.currentTarget.elements.mobileSearch.value;
            if (query.trim()) {
              window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
          }}
        >
          <div className="relative">
            <input
              name="mobileSearch"
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-sm text-white placeholder-white/70 focus:outline-none focus:bg-black/50 transition-all shadow-lg ml-2"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80"
              size={18}
            />
          </div>
        </form>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors hidden md:flex"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold tracking-tight">Trending Now</h3>
          <button
            onClick={() => navigate("/Collections")}
            className="text-sm font-medium text-primary hover:underline bg-none border-none cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Scrollable on mobile, grid on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
