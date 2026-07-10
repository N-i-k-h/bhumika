import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import prod2 from '../assets/image.png';
import prod3 from '../assets/DSC01046.JPG';
import prod4 from '../assets/DSC01049.JPG';
import prod5 from '../assets/DSC01053.JPG';
import prod6 from '../assets/DSC01056.JPG';
import prod7 from '../assets/DSC01059.JPG';
import prod8 from '../assets/DSC01062.JPG';
import prod9 from '../assets/DSC01064.JPG';
import prod10 from '../assets/DSC01066.JPG';
import prod11 from '../assets/DSC01068.JPG';
import prod12 from '../assets/DSC01070.JPG';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: 'processes' | 'facility' | 'products';
  categoryLabel: string;
  desc: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/assets/images/gallery/photo_1.jpg",
    title: "Induction Furnace Pouring",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Molten metal being poured into precision casting molds at 1600°C."
  },
  {
    id: 2,
    src: "/assets/images/gallery/photo_2.jpg",
    title: "Casting Simulation Analysis",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "CAD solidification simulations ensuring zero gas pockets and shrinkage defects."
  },
  {
    id: 3,
    src: "/assets/images/gallery/photo_3.jpg",
    title: "Engineering Design Station",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "Precision molding and die designs mapped out by our technical directors."
  },
  {
    id: 4,
    src: "/assets/images/gallery/photo_4.jpg",
    title: "Investment Casting Shells",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Ceramic slurry coating on wax patterns for lost-wax casting."
  },
  {
    id: 5,
    src: "/assets/images/gallery/photo_5.jpg",
    title: "Shimoga Plant Entrance",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "Exterior view of our ISO 9001:2015 certified production facility."
  },
  {
    id: 6,
    src: "/assets/images/gallery/photo_6.jpg",
    title: "Centrifugal Spinning Molds",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Rotational casting line producing high-density cylinder sleeves."
  },
  {
    id: 7,
    src: "/assets/images/gallery/photo_7.jpg",
    title: "Ceramic Mold Preheating",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Preheating ceramic shells to ensure optimal liquid metal flow."
  },
  {
    id: 8,
    src: "/assets/images/gallery/photo_8.jpg",
    title: "Induction Power Control",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Melt temperature regulation console for consistent metallurgical quality."
  },
  {
    id: 9,
    src: "/assets/images/gallery/photo_9.jpg",
    title: "Spectrometer Lab Analysis",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Optical emission spectrometer verifying chemical composition before pouring."
  },
  {
    id: 10,
    src: "/assets/images/gallery/photo_10.jpg",
    title: "Foundry Operations Floor",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "Main workspace holding our dual-induction crucible installations."
  },
  {
    id: 11,
    src: "/assets/images/gallery/photo_11.jpg",
    title: "Facility Exterior Yard",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "Raw material yard and power substation at the Sagar Road premises."
  },
  {
    id: 12,
    src: "/assets/images/gallery/photo_12.jpg",
    title: "Finished Castings Storage",
    category: "facility",
    categoryLabel: "Plant & Facility",
    desc: "Post-heat-treatment castings ready for precision machining."
  },
  {
    id: 13,
    src: "/assets/images/gallery/photo_13.jpg",
    title: "Lost-Wax De-waxing Autoclave",
    category: "processes",
    categoryLabel: "Melt & Casting",
    desc: "Steam autoclave removing wax to form the ceramic casting cavity."
  },
  {
    id: 15,
    src: prod2,
    title: "Centrifugal Cylinder Sleeves",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Centrifugally cast structural sleeves showing uniform grain structure and slag-free internal bores."
  },
  {
    id: 16,
    src: prod3,
    title: "Machined Outlet Rings",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Robust heavy-duty outlet ring cast in sand mold, normalized and finish-machined to final drawings."
  },
  {
    id: 17,
    src: prod4,
    title: "Centrifugal Rotor Hubs",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Centrifugally cast heavy rotor hubs offering high fatigue life and microstructural density."
  },
  {
    id: 18,
    src: prod5,
    title: "Austenitic Piston Insert Rings",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Precision investment-cast high-nickel insert rings designed for optimal thermal expansion matching."
  },
  {
    id: 19,
    src: prod6,
    title: "Flanged Meter Bodies",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Flow meter bodies cast via lost-wax process, offering smooth internal flow channels and fine surface finishes."
  },
  {
    id: 20,
    src: prod7,
    title: "High-Manganese Wear Plates",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Impact wear plate designed to work-harden continuously under rock crushing impacts."
  },
  {
    id: 21,
    src: prod8,
    title: "Aerospace Bracket Fittings",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Critical aircraft structural fittings produced under AS9100 quality control."
  },
  {
    id: 22,
    src: prod9,
    title: "Precision Machined Bronze Bushes",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "High-density bronze bushing centrifugally cast to prevent microscopic voids."
  },
  {
    id: 23,
    src: prod10,
    title: "Centrifugal Decanter Separator Bowls",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Heavy decanter bowls centrifugally cast for chemical separators."
  },
  {
    id: 24,
    src: prod11,
    title: "Flanged Valve Covers",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "Sand-cast flanged covers for industrial pipeline control valves."
  },
  {
    id: 25,
    src: prod12,
    title: "Threaded Exhaust Nuts",
    category: "products",
    categoryLabel: "Precision Products",
    desc: "High-temperature threaded components cast and precision tapped."
  }
];

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facility' | 'processes' | 'products'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const showNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
  };

  const showPrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx, filteredItems]);

  return (
    <div className="page-transition">
      {/* Inner Page Hero */}
      <section className="bg-primary py-20 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            REAL FOOTAGE & MEDIA
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2">
            Shimoga Facility & Product Gallery
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            Real photos detailing our automated foundry floor, CNC machinery, and high-performance casting components supplied worldwide.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          
          {/* Filters Header */}
          <div className="flex flex-wrap gap-4 items-center justify-between border-b border-primary/10 pb-6 mb-12">
            <div className="flex flex-wrap gap-2" id="gallery-filters">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'facility', label: 'Plant & Facility' },
                { id: 'processes', label: 'Melt & Casting' },
                { id: 'products', label: 'Precision Products' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setActiveFilter(btn.id as any);
                    setLightboxIdx(null);
                  }}
                  className={`filter-btn text-xs font-label-caps border px-5 py-2.5 rounded font-bold uppercase cursor-pointer ${
                    activeFilter === btn.id
                      ? 'active bg-secondary text-white border-secondary shadow-md'
                      : 'border-primary/20 hover:bg-steel-plate text-primary'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">
              Showing {filteredItems.length} Photo{filteredItems.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIdx(index)}
                className="group relative bg-steel-plate overflow-hidden rounded shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] border border-primary/5"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Dark Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[9px] font-label-caps uppercase text-molten-glow tracking-wider mb-1">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-headline-md text-base font-bold line-clamp-1 mb-1">{item.title}</h4>
                  <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 bg-alloy-dark/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all duration-300"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200 z-[110] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-6 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all duration-200 z-[110] cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-6 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all duration-200 z-[110] cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Content area */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center relative p-2"
          >
            <img
              className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl border border-white/10"
              src={filteredItems[lightboxIdx].src}
              alt={filteredItems[lightboxIdx].title}
            />
            <div className="text-center mt-6 text-white max-w-2xl px-4">
              <h4 className="font-headline-md text-xl font-bold mb-2 text-molten-glow">
                {filteredItems[lightboxIdx].title}
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {filteredItems[lightboxIdx].desc}
              </p>
              <div className="inline-block mt-4 px-3 py-1 bg-white/10 text-white/60 rounded-full text-[10px] font-label-caps uppercase">
                {filteredItems[lightboxIdx].categoryLabel}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
