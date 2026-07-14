import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Eye, Send, Clock, Settings, Flame, Layers } from 'lucide-react';
import heritageImg from '../assets/DSC02681.JPG';

export const About: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="page-transition">
      {/* Inner Page Hero */}
      <section className="bg-primary py-20 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            ABOUT BHUMIKA
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2">
            Our Story &amp; Infrastructure
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            An inside look at our 27+ years history, our founder's mission, and the metallurgical testing infrastructure of our Shimoga facility.
          </p>
        </div>
      </section>

      {/* Company Heritage & Founder */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-wider text-xs">
              HERITAGE FOUNDATION
            </span>
            <h2 className="font-headline-lg text-3xl font-extrabold text-primary mb-6 leading-tight">
              Established 1997 by Mr. H.S. Diwakar
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Bhumika Alloy Castings Pvt Ltd (BAC) was established in 1997 by <strong>Mr. H.S. Diwakar</strong>, who is also one of the founders of Perfect Alloy Components. With a vision to deliver premium metallurgical products that match strict international standards, the firm set out to fill the gap in high-precision castings for the growing heavy industrial markets.
            </p>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Built on a strong foundation of metallurgical expertise and manufacturing excellence, the company was established to deliver castings that meet the evolving needs of global industries.
            </p>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              What began as a modest foundry with a single furnace has grown into a modern manufacturing facility in Shimoga, Karnataka.
            </p>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              The facility is equipped with unique furnaces like rollover furnaces and also high induction furnaces capable of up to 500 kgs, and a supporting laboratory for international standards and for customer preferences worldwide.
            </p>
            <blockquote className="border-l-4 border-molten-glow pl-4 py-2 my-6 bg-steel-plate/60 rounded-r-md">
              <p className="italic text-primary text-sm font-medium">
                "Precision is not an option; it is our foundation. When casting components for high-risk domains like aerospace or oil and gas, there is absolutely zero margin for metallurgical deviations."
              </p>
              <cite className="block font-label-caps text-[10px] mt-2 text-on-surface-variant">
                — MR. H.S. DIWAKAR, FOUNDER
              </cite>
            </blockquote>
          </div>
          <div className="relative">
            <div className="aspect-video bg-steel-plate rounded-lg overflow-hidden shadow-lg border border-primary/5">
              <img
                className="w-full h-full object-cover"
                alt="Bhumika Alloy Castings office facility on Sagar Road, Shimoga"
                src={heritageImg}
              />
            </div>
            <div className="mt-6 bg-surface-container p-6 rounded-lg border-t-2 border-secondary">
              <h4 className="font-headline-md text-sm font-bold text-primary mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" /> Facility Operational Hours
              </h4>
              <ul className="text-xs text-on-surface-variant space-y-2">
                <li className="flex justify-between">
                  <span>Monday – Friday</span> <span>10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday &amp; Sunday</span> <span>By appointment only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-steel-plate/30 border-t border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-secondary flex gap-4">
            <Eye className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-headline-md text-xl font-bold text-primary mb-3">Our Vision</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                To be a globally recognized benchmark in precision casting technology, renowned for our metallurgical integrity, sustainable practices, and engineering solutions that empower advanced industrial sectors worldwide.
              </p>
            </div>
          </div>
          {/* Mission */}
          <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-molten-glow flex gap-4">
            <Send className="w-8 h-8 text-molten-glow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-headline-md text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                To deliver zero-defect castings and precision-machined alloys that meet the most rigorous international standards, creating value for our partners through human expertise, process innovation, and absolute traceability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Deep Dive */}
      <section className="py-20 bg-steel-plate" id="facility">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <span className="font-label-caps text-label-caps text-secondary block mb-2 uppercase tracking-widest text-xs">
              PRODUCTION POWER
            </span>
            <h2 className="font-headline-lg text-3xl font-black text-primary">
              Foundry &amp; Machining Infrastructure
            </h2>
            <p className="text-sm text-on-surface-variant mt-3">
              Our plant houses vertically integrated facilities, allowing us to execute and control the process from design analysis to final custom-machined products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Furnace Capacities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/5">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-headline-md text-lg text-primary font-bold mb-4">
                Furnace &amp; Melting Facilities
              </h3>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Capable of melting diverse alloy elements under rigorous temperature surveillance. Features high-purity systems for specialty metal structures.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-label-caps border-collapse">
                  <thead>
                    <tr className="border-b border-primary/10 text-primary">
                      <th className="text-left pb-2">FURNACE TYPE</th>
                      <th className="text-right pb-2">BATCH CAPACITY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 text-on-surface-variant">

                    <tr>
                      <td className="py-2">Induction Furnace 1</td>
                      <td className="text-right py-2">150 kg</td>
                    </tr>
                    <tr>
                      <td className="py-2">Induction Furnace 2</td>
                      <td className="text-right py-2">350 kg</td>
                    </tr>
                    <tr>
                      <td className="py-2">Induction Furnace 3</td>
                      <td className="text-right py-2">500 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CNC Machine Shop */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/5">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-headline-md text-lg text-primary font-bold mb-4">In-House Machining</h3>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Most castings require final machining tolerances. Our machine shop handles complex components directly, avoiding third-party overhead.
              </p>
              <ul className="space-y-3 text-xs text-on-surface-variant pl-4 list-disc">
                <li>CNC &amp; VMC (Vertical Machining Center) machining</li>
                <li>High-performance CNC lathes for rotational turning</li>
                <li>Conventional lathes, milling, and shaping rigs</li>
                <li>Profile Projector for dimensional validation</li>
              </ul>
            </div>

            {/* Design & Simulation */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/5">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-headline-md text-lg text-primary font-bold mb-4">Design &amp; Engineering</h3>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Our New Product Development (NPD) team has expertise in SolidWorks and CAD softwares, combined with in-house design to optimize every component before production. We validate 3D models and refine casting parameters early to reduce delays in development time, improve manufacturability, and ensure consistent quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
