import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

interface Slide {
  image: string;
  tagline: string;
  title: string;
  desc: string;
}

const slides: Slide[] = [
  {
    image: '/assets/images/hero_background.png',
    tagline: 'ESTABLISHED 1997 • SHIMOGA, INDIA',
    title: 'Precision Casting. Engineered Excellence.',
    desc: 'Specializing in high-integrity Investment and Centrifugal Casting. We supply custom metallurgical solutions and precision-machined alloys for Aerospace, Oil & Gas, Defense, and Global Heavy Industries.',
  },
  {
    image: '/assets/images/investment_lost_wax.png',
    tagline: 'HIGH-INTEGRITY PROCESSES',
    title: 'Precision Investment Casting.',
    desc: 'Utilizing lost-wax molding to produce complex, net-shape metal components with exceptional surface finishes and tight dimensional tolerances.',
  },
  {
    image: '/assets/images/centrifugal_casting.png',
    tagline: 'HEAVY-DUTY METALLURGY',
    title: 'High-Density Centrifugal Alloys.',
    desc: 'Horizontal centrifugal rotational processes delivering dense, cavity-free cylinder wear sleeves, bushes, and decanter structures.',
  },
  {
    image: '/assets/images/cnc_precision_machining.png',
    tagline: 'INTEGRATED MACHINE SHOP',
    title: 'Advanced CNC Precision Machining.',
    desc: 'Providing in-house post-cast turning, milling, and grinding to micron-level tolerances, delivering ready-to-assemble components.',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6s

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-primary">
      {/* Carousel Slides Container */}
      <div className="absolute inset-0 z-0" id="hero-slider">
        {slides.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              className="w-full h-full object-cover brightness-[0.35]"
              alt={slide.title}
              src={slide.image}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-primary/30" />
          </div>
        ))}
      </div>

      {/* Slide Content Wrapper (key resets animation) */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-20 w-full">
        <div className="max-w-3xl" key={currentSlide}>
          <span className="font-label-caps text-label-caps text-molten-glow mb-4 block tracking-widest uppercase slide-up-animation text-sm">
            {slides[currentSlide].tagline}
          </span>
          <h1 
            className="font-headline-xl text-4xl md:text-headline-xl text-white mb-6 leading-tight font-black slide-up-animation"
            dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
          />
          <p className="font-body-lg text-lg text-white/95 mb-10 leading-relaxed max-w-2xl font-light slide-up-animation">
            {slides[currentSlide].desc}
          </p>
          <div className="flex flex-wrap gap-4 slide-up-animation">
            <Link
              to="/contact"
              className="bg-molten-glow text-white px-8 py-4 rounded font-bold hover:bg-opacity-90 transition-all text-center shadow-lg shadow-molten-glow/20 glow-pulse"
            >
              Request Engineering Quote
            </Link>
            <a
              href="/Bhumika_Alloy_Castings_Brochure.pdf"
              download="Bhumika_Alloy_Castings_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/80 bg-white/10 text-white px-7 py-4 rounded font-bold hover:bg-white/20 transition-all text-center"
            >
              <Download className="w-5 h-5" /> Download Brochure
            </a>
            <Link
              to="/capabilities"
              className="border border-white/60 text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition-all text-center"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Dots (Bottom Indicators) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              idx === currentSlide ? 'bg-molten-glow scale-125' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
