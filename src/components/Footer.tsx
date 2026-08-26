import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-on-primary border-t-4 border-molten-glow mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <img src="/assets/images/logo.png" alt="Bhumika Alloy Castings" className="h-12 md:h-16 w-auto object-contain" />
          </div>
          <p className="font-body-md text-surface-variant/80 text-sm leading-relaxed max-w-xs">
            Shimoga's premier engineering casting facility. Delivering metallurgical excellence and certified components since 1997.
          </p>
          <div className="flex gap-4 mt-2">
            <a href=" " className="text-surface-variant hover:text-molten-glow transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href=" " className="text-surface-variant hover:text-molten-glow transition-colors" aria-label="X (Twitter)">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href=" " className="text-surface-variant hover:text-molten-glow transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
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
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/quality">
                Quality Control
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
              <Link className="font-body-md text-surface-variant hover:text-molten-glow transition-colors duration-200" to="/careers">
                Careers &amp; Openings
              </Link>
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
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-molten-glow flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <p>+91 98805 30102</p>
                <p>+91 98805 30105</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-molten-glow flex-shrink-0" />
              <a
                href="mailto:bhumikacastings@gmail.com"
                className="hover:text-white transition-colors"
              >
                bhumikacastings@gmail.com
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
