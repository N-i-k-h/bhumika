import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: 'centrifugal' | 'investment' | 'sand';
  image: string;
  material: string;
  weight: string;
  dimensions: string;
  description: string;
  applications: string;
}

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState(filterParam);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch from server:', err);
      });
  }, []);

  useEffect(() => {
    if (['all', 'centrifugal', 'investment', 'sand'].includes(filterParam)) {
      setActiveFilter(filterParam);
    } else {
      setActiveFilter('all');
    }
  }, [filterParam]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="page-transition">
      {/* Inner Page Hero */}
      <section className="bg-primary py-20 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            PRODUCT PORTFOLIO
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2">
            Precision Component Catalog
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            Filter through our high-integrity castings, review technical dimensions, and download metallurgy reference logs.
          </p>
        </div>
      </section>

      {/* Product Catalog Area */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          
          {/* Filters Banner */}
          <div className="flex flex-wrap gap-3 items-center justify-between border-b border-primary/10 pb-6 mb-12">
            <div className="flex flex-wrap gap-2" id="filter-buttons">
              {['all', 'centrifugal', 'investment', 'sand'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`filter-btn text-xs font-label-caps border px-5 py-2.5 rounded font-bold uppercase cursor-pointer ${
                    activeFilter === category
                      ? 'active bg-secondary text-white border-secondary shadow-md'
                      : 'border-primary/20 hover:bg-steel-plate text-primary'
                  }`}
                >
                  {category === 'all' ? 'All Components' : `${category} castings`}
                </button>
              ))}
            </div>
            <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">
              Showing {filteredProducts.length} Component{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-lg border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col premium-card group"
              >
                <div className="h-48 overflow-hidden mb-4 bg-steel-plate rounded">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="font-label-caps text-[9px] text-secondary font-bold uppercase tracking-wider mb-1 block">
                  {p.category} casting
                </span>
                <h4 className="font-headline-md text-base text-primary font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-on-surface-variant font-label-caps line-clamp-1 mb-4">
                  {p.material}
                </p>
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="w-full mt-auto bg-steel-plate hover:bg-primary hover:text-white text-primary text-xs font-bold py-2.5 rounded transition-all cursor-pointer"
                >
                  View Technical Specs
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4 transition-all"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary/10 flex flex-col page-transition"
          >
            <div className="p-6 border-b border-primary/10 flex items-center justify-between bg-primary text-on-primary">
              <h3 className="font-headline-md text-xl font-bold">
                {selectedProduct.title} Specs
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-white/10 rounded transition-colors text-on-primary cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6 flex-grow">
              <div className="grid grid-cols-2 gap-4 text-xs font-label-caps border-b border-primary/10 pb-6">
                <div>
                  <span className="text-secondary block font-bold mb-1">CASTING PROCESS</span>
                  <span>{selectedProduct.category.toUpperCase()} CASTING</span>
                </div>
                <div>
                  <span className="text-secondary block font-bold mb-1">MATERIAL GRADE</span>
                  <span>{selectedProduct.material}</span>
                </div>
                <div className="mt-4">
                  <span className="text-secondary block font-bold mb-1">WEIGHT RANGE</span>
                  <span>{selectedProduct.weight}</span>
                </div>
                <div className="mt-4">
                  <span className="text-secondary block font-bold mb-1">DIMENSIONAL RANGE</span>
                  <span>{selectedProduct.dimensions}</span>
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-primary mb-2">Technical Description</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-primary mb-2">Primary Industrial Applications</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedProduct.applications}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-primary/10 bg-steel-plate/50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-white hover:bg-steel-plate text-primary border border-primary/20 px-5 py-2.5 rounded font-bold text-xs cursor-pointer"
              >
                Close Details
              </button>
              <Link
                to="/contact"
                className="bg-molten-glow hover:bg-tertiary text-on-primary px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2"
              >
                Request Engineering Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
