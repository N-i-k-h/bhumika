import React from 'react';
import { Download } from 'lucide-react';
import facilityImg from '../assets/DSC00691.JPG';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[650px] md:h-[750px] flex items-center overflow-hidden bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover brightness-[0.6] scale-110 object-[center_40%]"
          alt="Bhumika Alloy Castings Shimoga Facility"
          src={facilityImg}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-20 w-full">
        <div className="max-w-4xl space-y-8 slide-up-animation">
          
          {/* Framed Heading with the white "[" bracket styling */}
          <div className="relative pl-8 sm:pl-12 py-4">
            {/* Left border line */}
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-white" />
            {/* Top border line */}
            <div className="absolute top-0 left-0 w-32 sm:w-48 h-[4px] bg-white" />
            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-[4px] bg-white" />

            <h1 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl text-white font-black leading-tight tracking-wide uppercase select-none">
              Welcome to Bhumika <br className="hidden sm:inline" />
              Alloy Castings <br className="hidden sm:inline" />
              Private Limited
            </h1>
          </div>

          {/* Subheading text */}
          <p className="font-body-lg text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-light">
            Manufacturer of high quality investment &amp; centrifugal castings in as-cast and machined condition.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/Bhumika_Alloy_Castings_Brochure.pdf"
              download="Bhumika_Alloy_Castings_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-molten-glow hover:bg-opacity-90 text-white px-7 py-3.5 rounded font-bold transition-all text-sm shadow-lg shadow-molten-glow/30 uppercase font-label-caps tracking-wider cursor-pointer"
            >
              <Download className="w-5 h-5" /> Download Company Brochure
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
