import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import facilityImg from '../assets/DSC00691.JPG';
import pouringImg from '../assets/pouring_process_new.png';
import centrifugalImg from '../assets/centrifugal_casting_process.png';
import whyBhumikaImg from '../assets/why_bhumika_products.jpg';

interface HeroSlide {
  id: number;
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  isDownload?: boolean;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: facilityImg,
    tagline: 'ESTABLISHED 1997 • SHIMOGA, INDIA',
    title: 'Welcome to Bhumika Alloy Castings Private Limited',
    subtitle: 'Manufacturer of high quality investment & centrifugal castings in as-cast and machined condition.',
    ctaText: 'Download Company Brochure',
    isDownload: true,
  },
  {
    id: 2,
    image: pouringImg,
    tagline: 'HIGH-INTEGRITY METALLURGY',
    title: 'Get the Best Investment Casting Solutions from Us',
    subtitle: 'Precision lost-wax molding engineered for aerospace, defense, valve & heavy engineering domains.',
    ctaText: 'Explore Capabilities',
    ctaLink: '/process',
  },
  {
    id: 3,
    image: centrifugalImg,
    tagline: 'HEAVY-DUTY CENTRIFUGAL ALLOYS',
    title: 'High-Density Centrifugal Alloy Castings',
    subtitle: 'Horizontal rotational casting for dense, void-free cylinder wear sleeves, bushes & decanter shells.',
    ctaText: 'View Product Catalog',
    ctaLink: '/products',
  },
  {
    id: 4,
    image: whyBhumikaImg,
    tagline: 'ISO 9001:2015 CERTIFIED FACILITY',
    title: 'Where We Believe that Complete Service Means Excellence',
    subtitle: 'Over 29 years of metallurgical rigor, custom alloy development & state-of-the-art metrology.',
    ctaText: 'Download Company Brochure',
    isDownload: true,
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500); // Continuous infinite loop auto-change every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Full-Width Hero Slider Container */}
      <section 
        className="relative w-full h-[460px] sm:h-[520px] md:h-[600px] lg:h-[640px] flex items-center justify-center overflow-hidden bg-black select-none"
        aria-label="Hero Slider"
      >
        {/* Background Images with Fade Transition */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center brightness-[1.05] transition-transform duration-[6500ms] ease-out transform ${
                idx === currentSlide ? 'scale-110' : 'scale-100'
              }`}
            />
            {/* Light/Subtle Dark Overlay for High Image Brightness & Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/35" />
          </div>
        ))}

        {/* Left Navigation Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/35 hover:bg-molten-glow text-white p-2.5 sm:p-3.5 rounded-lg border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/35 hover:bg-molten-glow text-white p-2.5 sm:p-3.5 rounded-lg border border-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Hero Content (Centered) */}
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 md:px-margin-desktop relative z-20 w-full text-center">
          <div 
            key={currentSlide} 
            className="max-w-4xl mx-auto flex flex-col items-center animate-fadeIn space-y-4 sm:space-y-6"
          >
            {/* Tagline */}
            <span className="font-label-caps text-xs sm:text-sm text-molten-glow font-bold tracking-widest uppercase bg-black/40 px-3.5 py-1 rounded-full border border-molten-glow/30 backdrop-blur-sm">
              {heroSlides[currentSlide].tagline}
            </span>

            {/* Main Heading */}
            <h1 className="font-headline-xl text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black leading-tight tracking-tight uppercase [text-shadow:_0_3px_12px_rgba(0,0,0,0.9)] max-w-3xl">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="font-body-lg text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl font-light [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              {heroSlides[currentSlide].isDownload ? (
                <a
                  href="/Bhumika_Alloy_Castings_Brochure.pdf"
                  download="Bhumika_Alloy_Castings_Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-molten-glow hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded font-bold transition-all text-xs sm:text-sm shadow-xl shadow-molten-glow/30 uppercase font-label-caps tracking-wider cursor-pointer hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  {heroSlides[currentSlide].ctaText}
                </a>
              ) : (
                <a
                  href={heroSlides[currentSlide].ctaLink || '/process'}
                  className="inline-flex items-center gap-2.5 bg-molten-glow hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded font-bold transition-all text-xs sm:text-sm shadow-xl shadow-molten-glow/30 uppercase font-label-caps tracking-wider cursor-pointer hover:scale-[1.02]"
                >
                  {heroSlides[currentSlide].ctaText}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-molten-glow rounded-full shadow-md'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/80 rounded-full'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Bottom Information Bar */}
      <div className="w-full bg-molten-glow text-white py-3 sm:py-3.5 px-4 shadow-md z-20 border-t border-white/10 flex items-center justify-center">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 hidden xs:inline-block" />
          <p className="font-label-caps text-xs sm:text-sm font-black uppercase tracking-wider text-white">
            Get Products to Perfection with Severe Quality Control Applied at all Levels!
          </p>
        </div>
      </div>
    </div>
  );
};
