import React, { useState, useEffect } from 'react';
import { Quote, ShieldCheck, Award, Users } from 'lucide-react';
import technoVisionLogo from '../assets/techno_vision_tools_logo.png';
import automotiveAxlesLogo from '../assets/automotive_axles_logo.png';
import weirMineralsLogo from '../assets/weir_minerals_logo.png';

const defaultCustomers = [
  {
    company: "Pentair",
    logo: "/assets/products/image copy.png",
    quote: "Consistently delivering high-precision valve bodies with zero defect tolerance and excellent consistency."
  },
  {
    company: "ProMinent",
    logo: "/assets/products/image copy 2.png",
    quote: "Outstanding casting quality for critical pump housings with highly reliable lead times since 2018."
  },
  {
    company: "Bruker",
    logo: "/assets/products/image copy 3.png",
    quote: "Excellent dimensional accuracy and sub-micron machining tolerances for our analytical chambers."
  },
  {
    company: "Trelleborg",
    logo: "/assets/products/image copy 4.png",
    quote: "Exceptional metallurgical density and uniform crystallization structure across all our centrifugal sleeves."
  },
  {
    company: "Indo-MIM",
    logo: "/assets/products/indo_logo.png",
    quote: "High-quality casting products and sub-assemblies for our demanding defense and automotive lines."
  },
  {
    company: "Astrotech Steels Private Limited",
    logo: "/assets/products/astrotech_logo.png",
    quote: "Reliable high-quality casting products with exceptional metallurgical conformity and timely deliveries."
  },
  {
    company: "LMW (Lakshmi Machine Works)",
    logo: "/assets/products/lmw_logo.png",
    quote: "High-grade precision components meeting our exacting textile machinery tolerances for long life."
  },
  {
    company: "TMS India",
    logo: "/assets/products/tms_logo.png",
    quote: "Dense, defect-free casting components for our specialized industrial machinery with full traceability."
  },
  {
    company: "Techno Vision Tools",
    logo: technoVisionLogo,
    quote: "High-precision investment casting components delivering superior dimensional accuracy and tooling reliability."
  },
  {
    company: "Automotive Axles Limited",
    logo: automotiveAxlesLogo,
    quote: "Trusted supplier for heavy-duty automotive axle casting assemblies with zero porosity and strict tolerances."
  },
  {
    company: "Weir Minerals",
    logo: weirMineralsLogo,
    quote: "Robust centrifugal and investment alloys tailored for demanding slurry pumps and mineral processing equipment."
  }
];

export const Customers: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>(defaultCustomers);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch from server:', err);
      });
  }, []);

  return (
    <div className="bg-surface flex-grow page-transition">
      {/* Hero Section */}
      <section className="relative py-24 bg-alloy-dark text-on-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-alloy-dark to-primary opacity-90 z-0" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <div className="max-w-3xl">
            <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-widest block mb-3">
              GLOBAL PARTNERSHIPS
            </span>
            <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Our Trusted Customers
            </h1>
            <p className="font-body-lg text-lg text-surface-variant/80 max-w-2xl leading-relaxed">
              From water infrastructure and scientific instrumentation to heavy flow-control valves, we deliver high-integrity castings for global industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Trust Stats */}
      <section className="py-12 bg-white border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center text-secondary">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-primary">25+</h3>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Global OEM Clients</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center text-secondary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-primary">99.8%</h3>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Quality Pass Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center text-secondary">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-primary">10+ Yrs</h3>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Avg Partnership Span</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center text-secondary">
                <Quote className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-primary">100%</h3>
              <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Traceable Alloys</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-steel-plate/30">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider block mb-2">
              VOICES OF SATISFACTION
            </span>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-black text-primary">
              Metallurgical Excellence in Action
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-4">
              Here is what our global partners say about their engineering collaboration with Bhumika Alloy Castings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col premium-card h-72 group"
              >
                {/* 50% Top: Logo */}
                <div className="h-1/2 bg-steel-plate flex items-center justify-center p-6 border-b border-primary/5">
                  <img
                    src={t.logo}
                    alt={`${t.company} Logo`}
                    className="h-full max-h-12 w-full object-contain"
                  />
                </div>
                {/* 50% Bottom: Content */}
                <div className="h-1/2 p-6 flex flex-col gap-2">
                  <h4 className="font-headline-md text-xs font-black text-secondary uppercase tracking-wider">
                    {t.company}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Supply & RFQ section */}
      <section className="py-20 bg-primary text-on-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold mb-6">
            Ready to Partner with Bhumika?
          </h2>
          <p className="font-body-lg text-sm text-surface-variant/80 max-w-xl mx-auto mb-8 leading-relaxed">
            From design prototyping to full-scale automated manufacturing batches, find out why leading multinational manufacturers rely on our casting division.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-secondary text-white hover:bg-opacity-95 px-8 py-3.5 rounded font-bold text-sm transition-all shadow-lg"
            >
              Initiate RFQ / Project Scope
            </a>
            <a
              href="/process"
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-3.5 rounded font-bold text-sm transition-all"
            >
              Explore Our Capabilities
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
