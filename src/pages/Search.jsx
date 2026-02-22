
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '@/utils';
import ProductCard from '@/components/ProductCard';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const results = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <p className="text-slate-500">
                Found {results.length} results for "{query}"
            </p>
        </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <SearchIcon size={32} />
            </div>
            <p className="text-slate-500">No products found matching your search.</p>
            <Link to="/collections" className="text-primary font-medium hover:underline">
                Browse all collections
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
