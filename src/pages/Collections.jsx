import { useState } from 'react';
import { PRODUCTS } from '@/utils';
import ProductCard from '@/components/ProductCard';
import clsx from 'clsx';

const CATEGORIES = ["All", "Running Shoes", "Apparel", "Accessories"];

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = PRODUCTS.filter(product => {
    if (selectedCategory === "All") return true;
    return product.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <div>
            <h1 className="text-3xl font-bold mb-2">All Collections</h1>
            <p className="text-slate-500">Explore our premium selection of performance gear.</p>
        </div>
        
        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all active:scale-95",
                selectedCategory === category
                  ? "bg-text text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
