import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-on-primary border-t-4 border-molten-glow mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="inline-block bg-white p-2 rounded-lg mb-4 max-w-[200px]">
            <img src="/assets/images/logo.png" alt="Bhumika Alloy Castings" className="h-10 w-auto" />
          </div>
          <p className="font-body-md text-surface-variant/80 text-sm leading-relaxed max-w-xs">
            Shimoga's premier engineering casting facility. Delivering metallurgical excellence and certified components since 1997.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Link
                aria-label="Find Location"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-on-primary hover:bg-molten-glow transition-colors"
                to="/contact"
              >
                <MapPin className="w-5 h-5" />
              </Link>
              <a
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-on-primary hover:bg-molten-glow transition-colors"
                href="mailto:marketing@bhumikacastings.com"
                aria-label="Email Us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div>
              <a
                href="/Bhumika_Alloy_Castings_Brochure.pdf"
                download="Bhumika_Alloy_Castings_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-molten-glow hover:bg-opacity-90 text-white text-xs px-4 py-2.5 rounded font-bold transition-all shadow-md uppercase font-label-caps tracking-wider cursor-pointer mt-2"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </a>
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div>
          <h5 className="font-label-caps text-xs text-tertiary-fixed mb-6 uppercase tracking-wider font-bold">
            Company
          </h5>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/about">
                About Founder
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/about#facility">
                Shimoga Facility
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/certificates">
                Quality Standards
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/process">
                Metallurgy Grades
              </Link>
            </li>
            <li>
              <a
                href="/Bhumika_Alloy_Castings_Brochure.pdf"
                download="Bhumika_Alloy_Castings_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-md text-tertiary-fixed hover:text-molten-glow transition-colors duration-200 inline-flex items-center gap-1.5 font-bold"
              >
                <Download className="w-3.5 h-3.5" /> Company Brochure (PDF)
              </a>
            </li>
          </ul>
        </div>
        
        {/* Resources Links */}
        <div>
          <h5 className="font-label-caps text-xs text-tertiary-fixed mb-6 uppercase tracking-wider font-bold">
            Processes
          </h5>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/process#investment">
                Investment Casting
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/process#centrifugal">
                Centrifugal Casting
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/process#machining">
                CNC Machining
              </Link>
            </li>
            <li>
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/contact">
                Request Quote
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Contact Information */}
        <div>
          <h5 className="font-label-caps text-xs text-tertiary-fixed mb-6 uppercase tracking-wider font-bold">
            Contact Engineering
          </h5>
          <div className="flex flex-col gap-4 text-sm text-surface-variant">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-molten-glow flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Srirampura Village, Sagar Road,
                <br />
                Shimoga – 577204, Karnataka, India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-molten-glow flex-shrink-0" />
              <p>+91 8182 600600</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-molten-glow flex-shrink-0" />
              <a
                href="mailto:marketing@bhumikacastings.com"
                className="hover:text-white transition-colors"
              >
                marketing@bhumikacastings.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-variant/60">
        <p>Handcrafted for Engineering Precision &amp; Metallurgical Integrity.</p>
      </div>
    </footer>
  );
};
