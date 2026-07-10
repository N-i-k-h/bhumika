import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onLoginSuccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLoginSuccess }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Secret login states
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 3000) {
      const clicks = logoClicks + 1;
      setLogoClicks(clicks);
      if (clicks >= 5) {
        e.preventDefault();
        setIsLoginOpen(true);
        setLogoClicks(0);
      }
    } else {
      setLogoClicks(1);
    }
    setLastClickTime(currentTime);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'bhumikaalloy@gmail.com' && password.trim() === 'adminbac') {
      onLoginSuccess();
      setIsLoginOpen(false);
      setEmail('');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Process', path: '/process' },
    { label: 'Products', path: '/products' },
    { label: 'Customers', path: '/customers' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`w-full top-0 sticky bg-white border-b border-primary/10 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'shadow-lg h-20' : 'h-24'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop flex items-center justify-between h-full">
          <Link to="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="/assets/images/logo.png"
              alt="Bhumika Alloy Castings"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
              }`}
              id="main-logo"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body-md text-body-md transition-colors duration-200 pb-1 ${
                  isActive(item.path)
                    ? 'text-secondary border-b-2 border-secondary font-semibold'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden lg:inline-flex bg-secondary hover:bg-opacity-90 text-white px-5 py-2 rounded font-bold text-sm transition-all shadow-md"
            >
              Get RFQ
            </Link>
            <button
              onClick={onMenuToggle}
              className="p-2 text-primary hover:bg-steel-plate rounded transition-all flex items-center gap-2 group cursor-pointer md:hidden"
              id="menu-toggle"
              aria-label="Open menu"
            >
              <span className="font-label-caps text-xs group-hover:text-secondary transition-colors hidden sm:inline">
                MENU
              </span>
              <Menu className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Secret Admin Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 border border-primary/10 relative page-transition"
          >
            <button 
              onClick={() => {
                setIsLoginOpen(false);
                setLoginError('');
              }}
              className="absolute top-4 right-4 p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="font-headline-lg text-xl font-black text-primary">Admin Authentication</h3>
              <p className="font-body-md text-xs text-on-surface-variant mt-2">
                Provide secure administrative credentials to unlock system customization tools.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded">
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-primary font-label-caps mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border border-primary/10 rounded text-sm rfq-input"
                  placeholder="admin@bhumikacastings.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary font-label-caps mb-1.5">Security Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 border border-primary/10 rounded text-sm rfq-input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-95 text-white font-bold py-3 rounded text-sm shadow cursor-pointer transition-all"
              >
                Access Control Panel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
