import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close sidebar on page change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Process', path: '/process' },
    { label: 'Products', path: '/products' },
    { label: 'Customers', path: '/customers' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Sidebar Container */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-primary text-on-primary z-[70] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <span className="font-headline-md text-xl font-bold">Industrial Navigation</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors text-on-primary cursor-pointer"
            id="close-sidebar"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto py-8 px-8">
          <nav className="flex flex-col gap-6 mb-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-headline-md text-headline-md transition-colors ${
                  isActive(item.path)
                    ? 'text-molten-glow font-bold'
                    : 'text-surface-variant hover:text-molten-glow'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-8 border-t border-white/10 pt-8">
            <div>
              <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-4 uppercase tracking-widest text-xs">
                Process Details
              </h5>
              <ul className="flex flex-col gap-3 pl-4 border-l border-molten-glow">
                <li>
                  <Link
                    className="font-body-md text-surface-variant hover:text-white transition-colors"
                    to="/process#investment"
                  >
                    Investment Casting
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-body-md text-surface-variant hover:text-white transition-colors"
                    to="/process#centrifugal"
                  >
                    Centrifugal Casting
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-body-md text-surface-variant hover:text-white transition-colors"
                    to="/process#machining"
                  >
                    CNC Machining
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-4 uppercase tracking-widest text-xs">
                Compliance
              </h5>
              <ul className="flex flex-col gap-3 pl-4 border-l border-molten-glow">
                <li>
                  <Link
                    className="font-body-md text-surface-variant hover:text-white transition-colors"
                    to="/certificates"
                  >
                    ISO 9001:2015 Certs
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-body-md text-surface-variant hover:text-white transition-colors"
                    to="/certificates"
                  >
                    AS9100 Standards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/10 bg-primary-container/30">
          <Link
            to="/contact"
            className="block w-full text-center bg-molten-glow text-on-primary py-4 rounded font-bold hover:bg-tertiary transition-all"
          >
            Request Engineering Quote
          </Link>
        </div>
      </div>
    </>
  );
};
