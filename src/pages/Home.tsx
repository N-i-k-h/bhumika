import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ShieldCheck, ArrowRight, Settings, Activity, Globe, Flame, Cpu, Users, Award, Layers } from 'lucide-react';
import creatorsImg from '../assets/DSC02681.JPG';
import whyBhumikaImg from '../assets/why_bhumika_products.jpg';
import investmentCastingImg from '../assets/investment_casting_patterns.jpg';
import centrifugalCastingImg from '../assets/centrifugal_casting_process.png';
import machiningImg from '../assets/image copy 8.png';
import whoWeAreImg from '../assets/pouring_main.png';

// Marquee logos
import technoVisionLogo from '../assets/techno_vision_tools_logo.png';
import automotiveAxlesLogo from '../assets/automotive_axles_logo.png';
import weirMineralsLogo from '../assets/weir_minerals_logo.png';

const partnerLogos = [
  { name: 'Trelleborg', src: '/assets/products/image copy 4.png' },
  { name: 'Indo-MIM', src: '/assets/products/indo_logo.png' },
  { name: 'TMS India', src: '/assets/products/tms_logo.png' },
  { name: 'Pentair', src: '/assets/products/image copy.png' },
  { name: 'LMW', src: '/assets/products/lmw_logo.png' },
  { name: 'Techno Vision Tools', src: technoVisionLogo },
  { name: 'Automotive Axles Limited', src: automotiveAxlesLogo },
  { name: 'Bruker', src: '/assets/products/image copy 3.png' },
  { name: 'ProMinent', src: '/assets/products/image copy 2.png' },
  { name: 'Weir Minerals', src: weirMineralsLogo },
  { name: 'Astrotech Steels Private Limited', src: '/assets/products/astrotech_logo.png' },
];

const marqueeItems = [...partnerLogos, ...partnerLogos];

export const Home: React.FC = () => {
  return (
    <div className="page-transition bg-surface">
      {/* Hero Section */}
      <Hero />

      {/* Partners Infinite Marquee Belt */}
      <section className="py-12 bg-white border-b border-primary/5 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 mb-4">
          <p className="font-label-caps text-[10px] text-secondary tracking-widest uppercase text-center font-black">
            TRUSTED BY GLOBAL OEM LEADERS
          </p>
        </div>
        <div className="relative w-full flex items-center">
          <div className="animate-marquee flex items-center gap-16 py-2">
            {marqueeItems.map((partner, idx) => (
              <div
                key={idx}
                className="h-12 w-32 flex items-center justify-center flex-shrink-0 opacity-90 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Identity Highlights Section */}
      <section className="py-20 bg-surface border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Manufacturing Facilities Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="premium-card bg-white p-8 rounded-2xl border border-primary/5 flex flex-col justify-between h-full group cursor-pointer shadow-sm"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center mb-6 border border-secondary/15">
                  <svg className="premium-icon w-10 h-10 transition-transform duration-500" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 21H2V3l7 4 7-4 6 4v14z" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M9 21v-8h6v8" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M6 11h2v2H6z" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M16 11h2v2h-2z" style={{ stroke: 'url(#orange-gradient)' }} />
                  </svg>
                </div>
                <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-primary mb-4 leading-none">
                  Manufacturing Facilities
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Our Manufacturing Facilities include in house CNC machining, induction hardening, Surface Hardening (Sursulf), Electroplating etc.
                </p>
              </div>
              <Link
                to="/about#facility"
                className="mt-8 font-condensed text-xs font-bold text-secondary uppercase tracking-widest border-b border-secondary/20 hover:border-secondary transition-all w-fit"
              >
                Read Manufacturing Facilities
              </Link>
            </motion.div>

            {/* Technology Leader Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="premium-card bg-white p-8 rounded-2xl border border-primary/5 flex flex-col justify-between h-full group cursor-pointer shadow-sm"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center mb-6 border border-secondary/15">
                  <svg className="premium-icon w-10 h-10 transition-transform duration-500" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" style={{ stroke: 'url(#orange-gradient)' }} />
                  </svg>
                </div>
                <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-primary mb-4 leading-none">
                  Technology Leader
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  We are capable of producing high grade very complex, thin walled, pressure-tight investment casting in a variety of material specifications.
                </p>
              </div>
              <Link
                to="/process#investment"
                className="mt-8 font-condensed text-xs font-bold text-secondary uppercase tracking-widest border-b border-secondary/20 hover:border-secondary transition-all w-fit"
              >
                Read Technology Leader
              </Link>
            </motion.div>

            {/* Customer Focus Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="premium-card bg-white p-8 rounded-2xl border border-primary/5 flex flex-col justify-between h-full group cursor-pointer shadow-sm"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center mb-6 border border-secondary/15">
                  <svg className="premium-icon w-10 h-10 transition-transform duration-500" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" style={{ stroke: 'url(#orange-gradient)' }} />
                    <circle cx="9" cy="7" r="4" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" style={{ stroke: 'url(#orange-gradient)' }} />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" style={{ stroke: 'url(#orange-gradient)' }} />
                  </svg>
                </div>
                <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-primary mb-4 leading-none">
                  Customer Focus
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  We are capable of supplying large volume, fully machined, ready to assemble parts to automotive and other customer.
                </p>
              </div>
              <Link
                to="/customers"
                className="mt-8 font-condensed text-xs font-bold text-secondary uppercase tracking-widest border-b border-secondary/20 hover:border-secondary transition-all w-fit"
              >
                Read Customer Focus
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Linear Gradient SVG Definition for the icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C15C26" />
              <stop offset="100%" stopColor="#8E2D17" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="bg-steel-plate overflow-hidden rounded-2xl shadow-md flex items-center justify-center p-2 border border-primary/5">
              <img
                className="w-full h-auto max-h-[480px] object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-700"
                alt="Bhumika Alloy Castings facility in Shimoga"
                src={whoWeAreImg}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 text-on-primary hidden lg:block shadow-xl border-l-4 border-secondary rounded-r-2xl">
              <p className="font-headline-lg text-3xl font-black">29 Years</p>
              <p className="font-label-caps text-[10px] opacity-80 uppercase tracking-widest">
                Of Metallurgical Rigor
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-5xl font-black mb-3 leading-tight tracking-wide uppercase">
              <span className="text-primary">Who We </span>
              <span className="text-secondary">Are</span>
            </h2>
            <h3 className="font-headline-md text-lg text-secondary mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-secondary after:rounded font-extrabold leading-tight">
              Leading the Way from the Heart of Shimoga
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">
              Established in 1997 by the visionary engineer <strong>Late Mr. H. S. Diwakar</strong> (who was also one of the founders of Perfect Alloy Components), Bhumika Alloy Castings has grown into a trusted investment casting manufacturer.
            </p>
            <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">
              For over 29 years we have combined skilled craftsmanship with a combination of modern technology to produce high quality precision castings for customers across diverse industries.
            </p>
            <p className="font-body-md text-xs text-on-surface-variant mb-6 leading-relaxed">
              Our expertise lies in manufacturing complex cast components with tight dimensional tolerances and consistent quality. Every product is backed by a rigorous quality management system and a commitment to continuous improvement, ensuring reliability from development to final delivery.
            </p>
            <div className="flex items-center gap-4 p-4 border border-outline-variant/30 bg-steel-plate/60 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h4 className="font-headline-md text-sm font-bold text-primary">ISO 9001:2015 Certified System</h4>
                <p className="text-[10px] text-on-surface-variant">
                  Stringent process standards conforming to global manufacturing requirements.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engineering Leadership & Creators Section */}
      <section className="py-20 bg-white border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-5xl font-black mb-3 leading-tight tracking-wide uppercase">
              <span className="text-primary">Creators &amp; </span>
              <span className="text-secondary">Leaders</span>
            </h2>
            <h3 className="font-headline-md text-lg text-secondary mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-secondary after:rounded font-extrabold leading-tight">
              The Driving Force Behind Bhumika Alloy Castings
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">
              Our operations are led by Director (MD) <strong>Mr. H.D. Deepak</strong>, Technical Director <strong>Mr. Sai Sriniketh</strong>, and General Manager <strong>Mr. Chandrashekar K</strong>. Together, our leadership guides a team of skilled metallurgists, foundry operators, and CNC engineers.
            </p>
            <p className="font-body-md text-xs text-on-surface-variant mb-6 leading-relaxed">
              By investing in human expertise alongside automated manufacturing technologies, we maintain our commitment to zero-defect casting production and custom material development for global heavy industries.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-steel-plate/60 rounded-xl border-l-4 border-secondary">
                  <p className="font-headline-md text-xs font-bold text-primary">Mr. H.D. Deepak (MD)</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mt-0.5">Director</p>
                </div>
                <div className="p-4 bg-steel-plate/60 rounded-xl border-l-4 border-primary">
                  <p className="font-headline-md text-xs font-bold text-primary">Mr. Chandrashekar K</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mt-0.5">General Manager</p>
                </div>
                <div className="p-4 bg-steel-plate/60 rounded-xl border-l-4 border-secondary/50">
                  <p className="font-headline-md text-xs font-bold text-primary">Mr. Sai Sriniketh</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider mt-0.5">Technical Director</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 md:order-2 relative group"
          >
            <div className="relative aspect-[4/3] bg-steel-plate overflow-hidden rounded-2xl shadow-md border border-primary/5">
              <img
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                alt="Bhumika Alloy Castings leadership team"
                src={creatorsImg}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Bhumika Section */}
      <section className="py-20 bg-white border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="relative aspect-[4/3] bg-steel-plate overflow-hidden rounded-2xl shadow-md border border-primary/5">
              <img
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                alt="Bhumika Alloy Castings high-precision casting components"
                src={whyBhumikaImg}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-headline-xl text-3xl sm:text-5xl font-black mb-3 leading-tight tracking-wide uppercase">
              <span className="text-primary">Why </span>
              <span className="text-secondary">Bhumika</span>
            </h2>
            <h3 className="font-headline-md text-lg text-secondary mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-secondary after:rounded font-extrabold leading-tight">
              Uncompromising Quality, Certified Metallurgy &amp; Complete Traceability
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Bhumika Alloy Castings stands as a trusted manufacturing partner for high-integrity components. Our specialized dual-induction melting furnace infrastructure, coupled with on-site optical emission spectrometry, guarantees that every single batch tapped conforms precisely to requested chemical specifications.
            </p>

            {/* Feature Highlights Grid with Vibrant Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 shadow-sm">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-primary">Advanced Melting</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    Dual-induction furnace infrastructure with capacity up to 500kg batch melt.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 shadow-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-primary">Spectrometry Lab</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    On-site chemical verification ensures absolute conformity to all metal grades.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-primary">Zero Defect Target</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    Rigorous testing including chemical analysis and final visual metrics inspection.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-primary">Global Deliveries</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    Proven logistics pipeline supplying cast components to over 15 countries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-steel-plate">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop text-center mb-16 flex flex-col items-center">
          <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider block mb-2">
            OUR CAPABILITIES
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-5xl font-black uppercase">
            <span className="text-primary">What We </span>
            <span className="text-secondary">Do</span>
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-4 max-w-xl mx-auto leading-relaxed">
            From lost-wax precision castings to heavy centrifugal alloys, we operate fully-integrated production lines supporting custom requirements.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-3 gap-8">
          {/* Card 1: Investment Casting */}
          <motion.div
            className="premium-card bg-white p-6 rounded-2xl group shadow-sm border border-primary/5 flex flex-col h-full cursor-pointer"
          >
            <div className="h-60 overflow-hidden mb-6 rounded-xl">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Lost-wax investment casting patterns"
                src={investmentCastingImg}
              />
            </div>
            <span className="font-label-caps text-[10px] text-secondary mb-2 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-secondary premium-icon" />
              PROCESS 01
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">Investment Casting</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-xs">
              Utilizing the Lost-Wax Process to create complex, net-shape parts with superior surface finishes and tight tolerances. Ranging from 10g to 20kg, ideal for high-alloy steels and superalloys.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-xs hover:gap-2 transition-all mt-auto uppercase tracking-wider font-label-caps"
              to="/process#investment"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Card 2: Centrifugal Casting */}
          <motion.div
            className="premium-card bg-white p-6 rounded-2xl group shadow-sm border border-primary/5 flex flex-col h-full cursor-pointer"
          >
            <div className="h-60 overflow-hidden mb-6 rounded-xl">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Centrifugal casting machine spinning mold"
                src={centrifugalCastingImg}
              />
            </div>
            <span className="font-label-caps text-[10px] text-secondary mb-2 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-secondary premium-icon" />
              PROCESS 02
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">Centrifugal Casting</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-xs">
              Operating 8 horizontal molding lines to produce cylindrical components, rings, and tubes with exceptional metallurgical density. Eliminates internal voids and gas pockets.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-xs hover:gap-2 transition-all mt-auto uppercase tracking-wider font-label-caps"
              to="/process#centrifugal"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Card 3: CNC & VMC Precision Machining */}
          <motion.div
            className="premium-card bg-white p-6 rounded-2xl group shadow-sm border border-primary/5 flex flex-col h-full cursor-pointer"
          >
            <div className="h-60 overflow-hidden mb-6 rounded-xl">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="CNC and VMC precision turning and machining center"
                src={machiningImg}
              />
            </div>
            <span className="font-label-caps text-[10px] text-secondary mb-2 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-secondary premium-icon" />
              MACHINING
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">CNC &amp; VMC Machining</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-xs">
              Our fully-equipped machine shop provides secondary finishing to micron-level tolerances. We do both CNC as well as VMC machining to deliver high-precision components tailored to your needs.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-xs hover:gap-2 transition-all mt-auto uppercase tracking-wider font-label-caps"
              to="/process#machining"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators Banner */}
      <div className="bg-primary py-16 text-on-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
            <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[9px] tracking-wider text-secondary uppercase font-bold">CERTIFIED QUALITY</p>
              <p className="font-headline-md text-base font-bold text-white">ISO 9001:2015</p>
              <p className="text-[10px] text-white/60">Approved plant system</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
            <Settings className="w-8 h-8 text-secondary flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[9px] tracking-wider text-secondary uppercase font-bold">MELT CAPACITY</p>
              <p className="font-headline-md text-base font-bold text-white">Induction Furnaces</p>
              <p className="text-[10px] text-white/60">Up to 500kg batch melt</p>
            </div>
          </div>
          <div className="flex items-center gap-4 last:border-0 pr-4">
            <Activity className="w-8 h-8 text-secondary flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[9px] tracking-wider text-secondary uppercase font-bold">METALLURGY</p>
              <p className="font-headline-md text-base font-bold text-white">Spectrometer Lab</p>
              <p className="text-[10px] text-white/60">100% chemical verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <section className="bg-white py-20 border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-3xl font-black text-primary mb-4">
            Ready to Engineer Your Component?
          </h2>
          <p className="font-body-md text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed text-sm">
            Provide us your CAD drawings or metallurgical specifications, and our engineering team will assist you in preparing a comprehensive RFQ layout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="bg-secondary text-white px-8 py-4 rounded-lg font-bold transition-all shadow-md inline-block uppercase text-xs tracking-wider font-label-caps"
              >
                Get RFQ Form
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/about"
                className="bg-white text-primary border border-primary/20 px-8 py-4 rounded-lg font-bold transition-all inline-block uppercase text-xs tracking-wider font-label-caps"
              >
                Learn About Facility
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
