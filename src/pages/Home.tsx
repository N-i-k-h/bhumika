import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ShieldCheck, ArrowRight, Settings, Activity, Globe, MenuSquare } from 'lucide-react';
import creatorsImg from '../assets/DSC02681.JPG';
import whyBhumikaImg from '../assets/image copy 6.png';
import investmentCastingImg from '../assets/image copy 7.png';
import centrifugalCastingImg from '../assets/Screenshot 2026-07-09 122649.png';
import machiningImg from '../assets/image copy 8.png';
import decanterShellImg from '../assets/DSC01066.JPG';
import pistonRingsImg from '../assets/DSC01053.JPG';
import bronzeBushesImg from '../assets/DSC01064.JPG';
import valveCoversImg from '../assets/DSC01068.JPG';
import whoWeAreImg from '../assets/who_we_are_casting.png';

export const Home: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <Hero />

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-square bg-steel-plate overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Bhumika Alloy Castings facility in Shimoga"
                src={whoWeAreImg}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 text-on-primary hidden lg:block shadow-xl border-l-4 border-molten-glow">
              <p className="font-headline-lg text-3xl font-bold">29 Years</p>
              <p className="font-label-caps text-[10px] opacity-80 uppercase tracking-widest">
                Of Metallurgical Rigor
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl text-primary mb-3 font-black leading-tight tracking-wide uppercase">
              Who We Are
            </h2>
            <h3 className="font-headline-md text-lg sm:text-xl text-secondary mb-6 molten-border pb-4 font-extrabold leading-tight">
              Leading the Way from the Heart of Shimoga
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              Established in 1997 by the visionary engineer <strong>Mr. H.S. Diwakar</strong>, who is also one of the founders of Perfect Alloy Components, has grown into a trusted investment casting manufacturer.
            </p>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              For over 29 years we have combined skilled craftsmanship with a combination of modern technology to produce high quality precision castings for customers across diverse industries.
            </p>
            <p className="font-body-md text-sm text-on-surface-variant mb-8 leading-relaxed">
              Our expertise lies in manufacturing complex cast components with tight dimensional tolerances and consistent quality. Every product is backed by a rigorous quality management system and a commitment to continuous improvement, ensuring reliability from development to final delivery.
            </p>
            <div className="flex items-center gap-4 p-4 border border-outline-variant/30 bg-steel-plate/60 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h4 className="font-headline-md text-sm font-bold text-primary">ISO 9001:2015 Certified System</h4>
                <p className="text-xs text-on-surface-variant">
                  Stringent process standards conforming to global manufacturing requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Leadership & Creators Section */}
      <section className="py-20 bg-white border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl text-primary mb-3 font-black leading-tight tracking-wide uppercase">
              Creators &amp; Leaders
            </h2>
            <h3 className="font-headline-md text-lg sm:text-xl text-secondary mb-6 molten-border pb-4 font-extrabold leading-tight">
              The Driving Force Behind Bhumika Alloy Castings
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              Our operations are led by our Founder, <strong>Mr. H.S. Diwakar</strong>, alongside Director (MD) <strong>Mr. H.D. Deepak</strong>, Assistant Director <strong>Mr. Sai Sriniketan</strong>, and General Manager <strong>Mr. V. Chandrashekar</strong>. Together, our leadership guides a team of skilled metallurgists, foundry operators, and CNC engineers.
            </p>
            <p className="font-body-md text-sm text-on-surface-variant mb-8 leading-relaxed">
              By investing in human expertise alongside automated manufacturing technologies, we maintain our commitment to zero-defect casting production and custom material development for global heavy industries.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-steel-plate/60 rounded border-l-4 border-molten-glow">
                <p className="font-headline-md text-xs font-bold text-primary">Mr. H.S. Diwakar</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">Founder</p>
              </div>
              <div className="p-4 bg-steel-plate/60 rounded border-l-4 border-secondary">
                <p className="font-headline-md text-xs font-bold text-primary">Mr. H.D. Deepak (MD)</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">Director</p>
              </div>
              <div className="p-4 bg-steel-plate/60 rounded border-l-4 border-tertiary">
                <p className="font-headline-md text-xs font-bold text-primary">Mr. Sai Sriniketan</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">Assistant Director</p>
              </div>
              <div className="p-4 bg-steel-plate/60 rounded border-l-4 border-primary-container">
                <p className="font-headline-md text-xs font-bold text-primary">Mr. V. Chandrashekar</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">General Manager</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-molten-glow to-secondary rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative aspect-[4/3] bg-steel-plate overflow-hidden rounded-lg shadow-lg border border-primary/5">
              <img
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                alt="Bhumika Alloy Castings leadership team"
                src={creatorsImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Bhumika Section */}
      <section className="py-20 bg-white border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-molten-glow to-secondary rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative aspect-[4/3] bg-steel-plate overflow-hidden rounded-lg shadow-lg border border-primary/5">
              <img
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                alt="Bhumika Alloy Castings testing laboratory"
                src={whyBhumikaImg}
              />
            </div>
          </div>
          <div>
            <h2 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl text-primary mb-3 font-black leading-tight tracking-wide uppercase">
              Why Bhumika
            </h2>
            <h3 className="font-headline-md text-lg sm:text-xl text-secondary mb-6 molten-border pb-4 font-extrabold leading-tight">
              Uncompromising Quality, Certified Metallurgy &amp; Complete Traceability
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
              Bhumika Alloy Castings stands as a trusted manufacturing partner for high-integrity components. Our specialized dual-induction melting furnace infrastructure, coupled with on-site optical emission spectrometry, guarantees that every single batch tapped conforms precisely to requested chemical specifications.
            </p>
            <p className="font-body-md text-sm text-on-surface-variant mb-8 leading-relaxed">
              By integrating in-house CAD tooling design, solidification simulations, horizontal centrifugal spinning lines, and high-precision CNC machining centers, we control the entire lifecycle of your casting. This end-to-end oversight ensures zero porosity, strict dimensional tolerances, and absolute batch traceability.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-steel-plate">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop text-center mb-16 flex flex-col items-center">
          <h2 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl text-primary mb-3 font-black leading-tight tracking-wide uppercase">
            What We Do
          </h2>
          <h3 className="font-headline-md text-lg sm:text-xl text-secondary mb-6 font-extrabold leading-tight relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[4px] after:bg-gradient-to-r after:from-secondary after:to-molten-glow after:rounded-sm">
            Advanced Casting &amp; Precision Machining Processes
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant mt-4 max-w-xl mx-auto leading-relaxed">
            From lost-wax precision castings to heavy centrifugal alloys, we operate fully-integrated production lines supporting custom requirements.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-3 gap-8">
          {/* Card 1: Investment Casting */}
          <div className="bg-white p-6 rounded-lg group hover:shadow-2xl transition-all duration-500 flex flex-col premium-card border border-primary/5">
            <div className="h-60 overflow-hidden mb-6 rounded">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Lost-wax investment casting patterns"
                src={investmentCastingImg}
              />
            </div>
            <span className="font-label-caps text-xs text-secondary mb-2 uppercase font-bold tracking-wider">
              PROCESS 01
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">Investment Casting</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-sm">
              Utilizing the Lost-Wax Process to create complex, net-shape parts with superior surface finishes and tight tolerances. Ranging from 5g to 10kg, ideal for high-alloy steels and superalloys.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-sm hover:text-molten-glow hover:gap-2 transition-all mt-auto"
              to="/process#investment"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Card 2: Centrifugal Casting */}
          <div className="bg-white p-6 rounded-lg group hover:shadow-2xl transition-all duration-500 flex flex-col premium-card border border-primary/5">
            <div className="h-60 overflow-hidden mb-6 rounded">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Centrifugal casting machine spinning mold"
                src={centrifugalCastingImg}
              />
            </div>
            <span className="font-label-caps text-xs text-secondary mb-2 uppercase font-bold tracking-wider">
              PROCESS 02
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">Centrifugal Casting</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-sm">
              Operating 8 horizontal molding lines to produce cylindrical components, bushes, and sleeves with exceptional metallurgical density. Eliminates internal voids and gas pockets.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-sm hover:text-molten-glow hover:gap-2 transition-all mt-auto"
              to="/process#centrifugal"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Card 3: CNC & VMC Precision Machining */}
          <div className="bg-white p-6 rounded-lg group hover:shadow-2xl transition-all duration-500 flex flex-col premium-card border border-primary/5">
            <div className="h-60 overflow-hidden mb-6 rounded">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="CNC and VMC precision turning and machining center"
                src={machiningImg}
              />
            </div>
            <span className="font-label-caps text-xs text-secondary mb-2 uppercase font-bold tracking-wider">
              MACHINING
            </span>
            <h3 className="font-headline-md text-xl text-primary mb-4 font-bold">CNC &amp; VMC Machining</h3>
            <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed text-sm">
              Our fully-equipped machine shop provides secondary finishing to micron-level tolerances. We do both CNC as well as VMC machining to deliver high-precision components tailored to your needs.
            </p>
            <Link
              className="inline-flex items-center text-secondary font-bold text-sm hover:text-molten-glow hover:gap-2 transition-all mt-auto"
              to="/process#machining"
            >
              View Specifications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators Banner */}
      <div className="bg-primary py-16 text-on-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
            <ShieldCheck className="w-10 h-10 text-molten-glow flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[10px] tracking-wider text-secondary-fixed">CERTIFIED QUALITY</p>
              <p className="font-headline-md text-lg font-bold">ISO 9001:2015</p>
              <p className="text-xs text-surface-variant/80">Approved plant system</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
            <Settings className="w-10 h-10 text-molten-glow flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[10px] tracking-wider text-secondary-fixed">MELT CAPACITY</p>
              <p className="font-headline-md text-lg font-bold">Induction Furnaces</p>
              <p className="text-xs text-surface-variant/80">Up to 500kg batch melt</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
            <Activity className="w-10 h-10 text-molten-glow flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[10px] tracking-wider text-secondary-fixed">METALLURGY</p>
              <p className="font-headline-md text-lg font-bold">Spectrometer Lab</p>
              <p className="text-xs text-surface-variant/80">100% chemical verification</p>
            </div>
          </div>
          <div className="flex items-center gap-4 last:border-0">
            <Globe className="w-10 h-10 text-molten-glow flex-shrink-0" />
            <div>
              <p className="font-label-caps text-[10px] tracking-wider text-secondary-fixed">GLOBAL DELIVERY</p>
              <p className="font-headline-md text-lg font-bold">15+ Countries</p>
              <p className="text-xs text-surface-variant/80">Supplying parts worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid: Applications / Product Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-wider text-xs">
                PRODUCT HIGHLIGHTS
              </span>
              <h2 className="font-headline-lg text-3xl md:text-headline-lg text-primary font-black">
                Engineered Industrial Components
              </h2>
              <p className="text-on-surface-variant text-sm mt-3">
                Our castings are engineered to withstand extreme pressures, speeds, and aggressive chemical environments across major engineering domains.
              </p>
            </div>
            <Link
              to="/products"
              className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 hover:text-secondary hover:border-secondary transition-all text-sm whitespace-nowrap"
            >
              View Full Product Catalog <MenuSquare className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[650px]">
            {/* Large Item: RO & Food Processing */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-lg shadow-md border border-primary/5 flex flex-col justify-end min-h-[350px]">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.8] group-hover:brightness-[0.6]"
                alt="Stainless steel decanter bowl shells"
                src={decanterShellImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
              <div className="relative p-8 z-10 text-white">
                <span className="bg-molten-glow text-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block rounded-sm">
                  RO &amp; FOOD PROCESSING
                </span>
                <h4 className="font-headline-md text-2xl mb-2 font-bold">High-Pressure &amp; Sanitary Components</h4>
                <p className="font-body-md text-white/80 text-sm leading-relaxed max-w-md">
                  Duplex and CF8M stainless steel castings engineered for Reverse Osmosis high-pressure pumps, decanter separator shells, and corrosion-free food process systems.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm font-bold text-molten-glow hover:text-white transition-all mt-4"
                >
                  Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Long Item: Automotive Components */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-lg shadow-md border border-primary/5 flex flex-col justify-end min-h-[280px]">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.8] group-hover:brightness-[0.6]"
                alt="Automotive piston inserts and sleeves"
                src={pistonRingsImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
              <div className="relative p-6 z-10 text-white">
                <span className="bg-secondary text-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block rounded-sm">
                  AUTOMOTIVE
                </span>
                <h4 className="font-headline-md text-xl mb-1 font-bold">Piston Inserts, Sleeves &amp; Rings</h4>
                <p className="font-body-md text-white/80 text-xs leading-relaxed max-w-md">
                  High-precision Ni-Resist insert rings, cylinder sleeves, and wear bushes machined to sub-micron tolerances for engine performance.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center text-xs font-bold text-secondary-fixed-dim hover:text-white transition-all mt-2"
                >
                  Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Small Item 1: Textile */}
            <div className="relative group overflow-hidden rounded-lg shadow-md border border-primary/5 flex flex-col justify-end min-h-[220px]">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.85] group-hover:brightness-[0.6]"
                alt="Textile machinery cast guides"
                src={bronzeBushesImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
              <div className="relative p-5 z-10 text-white">
                <span className="bg-secondary text-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block rounded-sm">
                  TEXTILE
                </span>
                <h4 className="font-headline-md text-md mb-1 font-bold text-sm sm:text-base">Precision Guides &amp; Loops</h4>
                <p className="text-white/70 text-[11px] line-clamp-1">Highly polished, low-friction wear components.</p>
                <Link
                  to="/products"
                  className="inline-flex items-center text-[10px] font-bold text-molten-glow hover:text-white transition-all mt-2"
                >
                  View specs
                </Link>
              </div>
            </div>

            {/* Small Item 2: Others */}
            <div className="relative group overflow-hidden rounded-lg shadow-md border border-primary/5 flex flex-col justify-end min-h-[220px]">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-[0.85] group-hover:brightness-[0.6]"
                alt="Custom industrial castings"
                src={valveCoversImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
              <div className="relative p-5 z-10 text-white">
                <span className="bg-secondary text-white px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 inline-block rounded-sm">
                  OTHER SECTORS
                </span>
                <h4 className="font-headline-md text-md mb-1 font-bold text-sm sm:text-base">Valves, Pumps &amp; Minerals</h4>
                <p className="text-white/70 text-[11px] line-clamp-1">Custom metallurgical casts for diverse heavy industries.</p>
                <Link
                  to="/products"
                  className="inline-flex items-center text-[10px] font-bold text-molten-glow hover:text-white transition-all mt-2"
                >
                  View specs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-steel-plate py-20 border-t border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-3xl font-black text-primary mb-4">
            Ready to Engineer Your Component?
          </h2>
          <p className="font-body-md text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
            Provide us your CAD drawings or metallurgical specifications, and our engineering team will assist you in preparing a comprehensive RFQ layout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-secondary hover:bg-opacity-90 text-white px-8 py-4 rounded font-bold transition-all shadow-md"
            >
              Get RFQ Form
            </Link>
            <Link
              to="/about"
              className="bg-white hover:bg-steel-plate text-primary border border-primary/20 px-8 py-4 rounded font-bold transition-all"
            >
              Learn About Facility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
