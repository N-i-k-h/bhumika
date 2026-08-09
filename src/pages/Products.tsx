import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  category?: string;
  image: string;
  material: string;
  metalGrade?: string;
  weight: string;
  dimensions: string;
  description: string;
  applications: string;
  industry: 'automobile' | 'food' | 'textile' | 'reverse_osmosis' | 'others';
}

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState(filterParam);

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
    if (['all', 'automobile', 'food', 'textile', 'reverse_osmosis', 'others'].includes(filterParam)) {
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
    : products.filter(p => p.industry === activeFilter);

  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case 'automobile': return 'Automobile';
      case 'food': return 'Food Industry';
      case 'textile': return 'Textile';
      case 'reverse_osmosis': return 'Reverse Osmosis';
      case 'others': return 'Others';
      default: return industry;
    }
  };

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
            Filter through our high-integrity castings categorized by industrial applications, review technical specifications, and download engineering reference sheets.
          </p>
        </div>
      </section>

      {/* Product Catalog Area */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          
          {/* Filters Banner */}
          <div className="flex flex-wrap gap-3 items-center justify-between border-b border-primary/10 pb-6 mb-12">
            <div className="flex flex-wrap gap-2" id="filter-buttons">
              {[
                { value: 'all', label: 'All Components' },
                { value: 'automobile', label: 'Automobile' },
                { value: 'food', label: 'Food Industry' },
                { value: 'textile', label: 'Textile' },
                { value: 'reverse_osmosis', label: 'Reverse Osmosis' },
                { value: 'others', label: 'Others' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleFilterChange(item.value)}
                  className={`filter-btn text-xs font-label-caps border px-5 py-2.5 rounded font-bold uppercase cursor-pointer ${
                    activeFilter === item.value
                      ? 'active bg-secondary text-white border-secondary shadow-md'
                      : 'border-primary/20 hover:bg-steel-plate text-primary'
                  }`}
                >
                  {item.label}
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
                <div className="h-60 mb-4 bg-steel-plate rounded flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-w-full max-h-full object-contain w-auto h-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-label-caps text-[9px] text-secondary font-bold uppercase tracking-wider mb-1 block">
                  {getIndustryLabel(p.industry)}
                </span>
                <h4 className="font-headline-md text-base text-primary font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-on-surface-variant font-label-caps line-clamp-1 mb-3">
                  {p.material}
                </p>
                {p.metalGrade && (
                  <div className="mt-auto pt-2.5 border-t border-primary/5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-on-surface-variant/70 uppercase font-label-caps">Metal Grade:</span>
                    <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded font-label-caps uppercase tracking-wider">
                      {p.metalGrade}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
