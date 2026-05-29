import { useState, useEffect } from 'react';
import { Droplet, Phone, Clock, Menu, X, Check, Globe } from 'lucide-react';
import { stationInfo } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currency: 'PHP' | 'USD';
  setCurrency: (currency: 'PHP' | 'USD') => void;
}

export default function Header({ currency, setCurrency }: HeaderProps) {
  const [isOpenToday, setIsOpenToday] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if open now based on real-time hours
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
      const day = phTime.getDay(); // 0 is Sunday, 1-5 Mon-Fri, 6 Saturday
      const hour = phTime.getHours();
      const min = phTime.getMinutes();
      const decimalTime = hour + min / 60;

      if (day === 0) {
        // Sunday is Closed
        setIsOpenToday(false);
      } else if (day === 6) {
        // Saturday 8am - 5pm
        setIsOpenToday(decimalTime >= 8 && decimalTime < 17);
      } else {
        // Weekdays 7am - 7pm
        setIsOpenToday(decimalTime >= 7 && decimalTime < 19);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Monitor page scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100 py-3' 
          : 'bg-white/40 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo"
          >
            <div className="bg-sky-500 text-white p-2 rounded-xl group-hover:bg-sky-600 transition-colors shadow-sm shadow-sky-400/20">
              <Droplet className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-slate-800">
                RLM <span className="text-sky-500">Water</span>
              </span>
              <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none">
                Station & Refill
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors text-left"
              id="nav-products"
            >
              Water Products
            </button>
            <button 
              onClick={() => scrollToSection('purification')} 
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors text-left"
              id="nav-purification"
            >
              Our Process
            </button>
            <button 
              onClick={() => scrollToSection('calculator')} 
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors text-left"
              id="nav-calculator"
            >
              Cost Calculator
            </button>
            <button 
              onClick={() => scrollToSection('hydration')} 
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors text-left"
              id="nav-hydration"
            >
              Hydration Tool
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors text-left"
              id="nav-reviews"
            >
              Reviews
            </button>
          </nav>

          {/* Right Interactions */}
          <div className="flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="bg-slate-100 hover:bg-slate-200 p-0.5 rounded-lg flex items-center transition-all">
              <button
                onClick={() => setCurrency('PHP')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'PHP' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Swith to Pesos"
                id="currency-php"
              >
                ₱ PHP
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  currency === 'USD' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Switch to Dollars"
                id="currency-usd"
              >
                $ USD
              </button>
            </div>

            {/* Dynamic Working Hours Tag */}
            <div className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isOpenToday 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{isOpenToday ? 'Open Now (Delivering)' : 'Closed Now (Pre-orders)'}</span>
            </div>

            {/* Phone Button */}
            <a 
              href={`tel:${stationInfo.phone}`}
              className="hidden sm:inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-sky-500/10 hover:shadow-sky-500/20 active:scale-95 transition-all"
              id="call-now-button"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {stationInfo.phone}</span>
            </a>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-sky-500 md:hidden rounded-lg hover:bg-slate-50"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <button 
                onClick={() => scrollToSection('products')} 
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-sky-50/50 hover:text-sky-500 transition-colors"
              >
                Water Products
              </button>
              <button 
                onClick={() => scrollToSection('purification')} 
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-sky-50/50 hover:text-sky-500 transition-colors"
              >
                Purification Process
              </button>
              <button 
                onClick={() => scrollToSection('calculator')} 
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-sky-50/50 hover:text-sky-500 transition-colors"
              >
                Cost Calculator
              </button>
              <button 
                onClick={() => scrollToSection('hydration')} 
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-sky-50/50 hover:text-sky-500 transition-colors"
              >
                Hydration Calculator
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-700 font-medium hover:bg-sky-50/50 hover:text-sky-500 transition-colors"
              >
                Client Reviews
              </button>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-3">
                  <span>Current Delivery Status:</span>
                  <span className={`font-bold ${isOpenToday ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {isOpenToday ? 'Delivering' : 'Taking Pre-orders'}
                  </span>
                </div>
                <a 
                  href={`tel:${stationInfo.phone}`}
                  className="flex items-center justify-center gap-2 bg-sky-500 text-white py-3.5 rounded-xl font-semibold shadow-md shadow-sky-400/15"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {stationInfo.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
