import { Sparkles, ArrowRight, ShieldCheck, Truck, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 bg-gradient-to-b from-sky-50 via-white to-sky-50/20 overflow-hidden flex items-center"
    >
      {/* Structural Ambient Waves */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8" id="hero-left-container">
            
            {/* Tagline Indicator badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 font-semibold px-3 py-1.5 rounded-full text-xs tracking-wider uppercase border border-sky-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Certified Pristine Drinking Water</span>
            </motion.div>

            {/* Title Display typography */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]"
              >
                Pristine <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Purity</span>. <br />
                Prompt Delivery. <br />
                For Your <span className="underline decoration-sky-400 decoration-wavy decoration-2 underline-offset-4">Whole Family</span>.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
              >
                At <strong>RLM Water Station</strong>, we process every bottle through our rigorous 16-stage sanitization chamber, delivering healthy alkaline, mineral, and ultra-purified drinking solutions straight to your doorstep.
              </motion.p>
            </div>

            {/* Big Action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              id="hero-ctas"
            >
              <button 
                onClick={onOrderClick}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-xl text-base font-semibold hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 active:scale-98 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-order-cta"
              >
                <span>Calculate & Order Refills</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('purification');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white border hover:bg-slate-50 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Learn Our Process</span>
              </button>
            </motion.div>

            {/* Quick trust assurances */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8"
              id="hero-mini-badges"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="text-sky-600 bg-sky-50 p-1.5 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm leading-tight mt-1">16-Stage Purified</span>
                <span className="text-xs text-slate-400">Physically-filtered purity</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="text-cyan-600 bg-cyan-50 p-1.5 rounded-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm leading-tight mt-1">Same-Day Deliver</span>
                <span className="text-xs text-slate-400">Pre-booked quick dispatch</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="text-teal-600 bg-teal-50 p-1.5 rounded-lg">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-sm leading-tight mt-1">Squeaky Clean</span>
                <span className="text-xs text-slate-400">Double-sanitized vessels</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Media (Asset Showcase) */}
          <div className="lg:col-span-5 relative flex justify-center" id="hero-right-container">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl rotate-3 scale-102 opacity-10 blur-xl" />
              <div className="relative bg-white p-3 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group">
                <img 
                  src="/src/assets/images/water_station_hero_1780025125353.png" 
                  alt="RLM Pristine Water Purification Showcase" 
                  className="rounded-2xl w-full h-80 sm:h-96 object-cover shadow-inner group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded trust stat overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-sky-50/50 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-none">Daily Refill Volume</span>
                    <span className="font-sans text-2xl font-black text-slate-800">1,200+ <span className="text-sky-500 text-base font-normal">Gals</span></span>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <div className="text-right">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-none">Local Customers</span>
                    <span className="font-sans text-lg font-bold text-slate-800">4.9 ★★★★★</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
