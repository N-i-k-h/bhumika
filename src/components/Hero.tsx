import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Zap } from 'lucide-react';
import facilityImg from '../assets/DSC00691.JPG';
import whyBhumikaImg from '../assets/why_bhumika_products.jpg';
import centrifugalCastingHeroImg from '../assets/centrifugal_casting_hero.jpg';
import investmentCastingHeroImg from '../assets/investment_casting_hero.jpg';

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
    image: investmentCastingHeroImg,
    tagline: 'HIGH-INTEGRITY METALLURGY',
    title: 'Get the Best Investment Casting Solutions from Us',
    subtitle: 'Precision lost-wax molding engineered for aerospace, defense, valve & heavy engineering domains.',
    ctaText: 'Explore Capabilities',
    ctaLink: '/process',
  },
  {
    id: 3,
    image: centrifugalCastingHeroImg,
    tagline: 'HEAVY-DUTY CENTRIFUGAL ALLOYS',
    title: 'High-Density Centrifugal Alloy Castings',
    subtitle: 'Horizontal rotational casting for dense, void-free rings, tubes & decanter shells.',
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

const renderHeadline = (title: string) => {
  const words = title.split(' ');
  if (words.length <= 3) {
    return (
      <>
        <span className="text-white">{words[0]}</span>{' '}
        <span className="text-secondary">{words.slice(1).join(' ')}</span>
      </>
    );
  }
  const midIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, midIndex).join(' ');
  const secondHalf = words.slice(midIndex).join(' ');
  return (
    <>
      <span className="text-white">{firstHalf}</span>{' '}
      <span className="text-secondary block sm:inline">{secondHalf}</span>
    </>
  );
};

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds auto-transition
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative bg-[#1A1A1A] overflow-hidden select-none" style={{ height: '620px' }}>
      
      {/* Background Image Carousel with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="Bhumika Alloy Castings facility background"
              className="w-full h-full object-cover object-center brightness-[0.7] contrast-[1.05]"
            />
            {/* Gradient Overlay for high text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Radial Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop h-full relative z-20 flex items-center justify-start text-left">
        <div className="max-w-4xl space-y-6 flex flex-col items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="space-y-4 sm:space-y-6 flex flex-col items-start text-left"
            >
              {/* Tech Tag / Accents */}
              <motion.div
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } }
                }}
                className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 backdrop-blur-md"
              >
                <span className="font-label-caps text-[10px] sm:text-xs font-black uppercase tracking-widest text-secondary">
                  {heroSlides[currentSlide].tagline}
                </span>
              </motion.div>

              {/* Giant Headline in Orange Stroke Only */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="space-y-1"
              >
                <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] tracking-tight max-w-4xl text-left">
                  {renderHeadline(heroSlides[currentSlide].title)}
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                className="font-body-lg text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed text-left"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                className="pt-2 flex flex-wrap justify-start gap-4"
              >
                {heroSlides[currentSlide].isDownload ? (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/Bhumika_Alloy_Castings_Brochure.pdf"
                    download="Bhumika_Alloy_Castings_Brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-secondary hover:bg-opacity-95 text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold text-xs uppercase font-label-caps tracking-wider cursor-pointer shadow-lg shadow-secondary/25"
                  >
                    <Download className="w-4 h-4" />
                    {heroSlides[currentSlide].ctaText}
                  </motion.a>
                ) : (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={heroSlides[currentSlide].ctaLink || '/process'}
                    className="inline-flex items-center gap-2.5 bg-secondary hover:bg-opacity-95 text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold text-xs uppercase font-label-caps tracking-wider cursor-pointer shadow-lg shadow-secondary/25"
                  >
                    {heroSlides[currentSlide].ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                )}

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 sm:px-8 py-3.5 rounded-lg font-bold text-xs uppercase font-label-caps tracking-wider cursor-pointer backdrop-blur-md transition-colors"
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>



      {/* announcement belt */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary text-white py-2.5 px-4 z-20 border-t border-white/10 flex items-center justify-center">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-2 text-center text-xs">
          <Zap className="w-3.5 h-3.5 text-white flex-shrink-0 animate-bounce" />
          <p className="font-label-caps font-black uppercase tracking-wider text-white">
            Severe Quality Control Applied at all Levels — From Liquid Metal to Final CNC Component.
          </p>
        </div>
      </div>

    </div>
  );
};
