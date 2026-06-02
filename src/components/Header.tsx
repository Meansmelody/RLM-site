import { useState, useEffect } from 'react';
import { Droplet, Phone, Clock, Menu, X, Check, Eye } from 'lucide-react';
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
        setIsOpenToday(false);
      } else if (day === 6) {
        setIsOpenToday(decimalTime >= 8 && decimalTime < 17);
      } else {
        setIsOpenToday(decimalTime >= 7 && decimalTime < 19);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0b0f19]/85 backdrop-blur-xl border-b border-sky-500/10 py-3 shadow-[0_10px_30px_rgba(2,132,199,0.05)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with soft neon pulse */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 text-white p-2.5 rounded-xl group-hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                RLM <span className="text-sky-400 font-black">Water</span>
              </span>
              <p className="text-[9px] font-mono tracking-widest text-sky-300/60 uppercase leading-none mt-0.5">
                Quantum Refill Lab
              </p>
            </div>
          </div>

          {/* Desktop Glass Navigation Container */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full p-1.5 p-y-1 backdrop-blur-md">
            {[
              { id: 'products', label: 'Offerings' },
              { id: 'purification', label: 'Quantum Tech' },
              { id: 'calculator', label: 'Estimations' },
              { id: 'hydration', label: 'Water Monitor' },
              { id: 'testimonials', label: 'Client Feedback' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => scrollToSection(tab.id)} 
                className="text-xs font-semibold px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative text-left outline-none cursor-pointer"
                id={`nav-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Area: Interactive currency switches and micro glass buttons */}
          <div className="flex items-center gap-3">
            
            {/* Currency switcher inside dynamic transparent capsules */}
            <div className="bg-slate-850/85 border border-white/10 p-1 rounded-full flex items-center shadow-inner">
              <button
                onClick={() => setCurrency('PHP')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-300 cursor-pointer ${
                  currency === 'PHP' 
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black shadow-md shadow-sky-400/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Refill pricing in Philippine Pesos"
                id="currency-php"
              >
                ₱ PHP
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-300 cursor-pointer ${
                  currency === 'USD' 
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black shadow-md shadow-sky-400/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Refill pricing in United States Dollars"
                id="currency-usd"
              >
                $ USD
              </button>
            </div>

            {/* Pulsing delivery radar indicator */}
            <div className={`hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold border ${
              isOpenToday 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpenToday ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
              <span>{isOpenToday ? 'RADAR: DELIVERING NOW' : 'RADAR: PRE-ORDER ONLY'}</span>
            </div>

            {/* Interactive Luxury CALL BUTTON showcasing number directly */}
            <a 
              href={`tel:${stationInfo.phone}`}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] active:scale-95 border border-sky-400/20 hover:scale-103"
              id="call-now-button"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              <span>CALL: {stationInfo.phone}</span>
            </a>

            {/* Mobile Navigation controls */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white md:hidden transition-all duration-300 cursor-pointer"
              aria-label="Toggle navigation drawer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glass Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="px-4 pt-4 pb-8 space-y-3.5">
              {[
                { id: 'products', label: 'Premium Selections' },
                { id: 'purification', label: '16-Stage Tech Journey' },
                { id: 'calculator', label: 'Cost & Refill Calculator' },
                { id: 'hydration', label: 'Wellness Coach' },
                { id: 'testimonials', label: 'Client Testimonials' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="block w-full text-left py-2.5 px-4 rounded-xl text-slate-300 font-semibold hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-400 px-4">
                  <span>Dispenser Operations:</span>
                  <span className={`font-black tracking-widest ${isOpenToday ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isOpenToday ? 'ACTIVERefilling' : 'TAKING ENHANCED QUEUES'}
                  </span>
                </div>
                
                <a 
                  href={`tel:${stationInfo.phone}`}
                  className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3.5 rounded-xl font-bold tracking-wide text-xs shadow-lg shadow-sky-500/15"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>CALL DIRECT: {stationInfo.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
