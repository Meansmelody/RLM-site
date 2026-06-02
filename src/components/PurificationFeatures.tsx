import { useState, useMemo } from 'react';
import { products } from '../data';
import { Droplet, Award, Zap, Sparkles, Filter, ChevronRight, HelpCircle, FileCheck, BrainCircuit, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PurificationFeaturesProps {
  currency: 'PHP' | 'USD';
  onOrderProduct: (productId: string) => void;
}

const purificationSteps = [
  {
    phase: '01',
    title: 'Dual-Sand Multi-Media Filter',
    desc: 'Traps larger physical micro-particles, dust, clay, and sand sediments directly from the municipal source pipeline.',
    icon: Filter,
    efficiency: '98.6%',
    tds: '250 → 180 ppm',
    mineralContent: 'Magnesium: 12mg, Potassium: 8mg',
    purityClass: 'Pre-Filtration Step',
    gaugeValue: 60
  },
  {
    phase: '02',
    title: 'Granular Activated Carbon',
    desc: 'Adsorbs toxic organic chemicals, chlorine residues, synthetic compounds, and musty odors, returning the matrix to absolute neutrality.',
    icon: Sparkles,
    efficiency: '99.2%',
    tds: '180 → 110 ppm',
    mineralContent: 'Organic binders: Reduced',
    purityClass: 'Chemical Separation',
    gaugeValue: 75
  },
  {
    phase: '03',
    title: '0.1 Micron Micro-filtration',
    desc: 'Acts as dual physical defense barriers, catching rust particulates, fine organic matrices, and persistent micro-cyst elements.',
    icon: Filter,
    efficiency: '99.9%',
    tds: '110 → 80 ppm',
    mineralContent: 'Particulate: 0.00%',
    purityClass: 'Fine Filtration',
    gaugeValue: 85
  },
  {
    phase: '04',
    title: 'Dual Reverse Osmosis (RO)',
    desc: 'The molecular heart of RLM purity. Forces water through high-density semi-permeable membranes. Retains only virgin H2O structures.',
    icon: Droplet,
    efficiency: '99.98%',
    tds: '80 → 2 ppm',
    mineralContent: 'None (Sterile Core)',
    purityClass: 'Hypoallergenic Virgin H2O',
    gaugeValue: 99
  },
  {
    phase: '05',
    title: 'Ionizing pH Balancer',
    desc: 'Splits water through premium grade ionization chambers, adding alkaline hydrogen configurations to raise levels between 8.5 to 9.5.',
    icon: Zap,
    efficiency: '99.99%',
    tds: '2 → 15 ppm',
    mineralContent: 'Hydrogen Ionized',
    purityClass: 'High-Antioxidant Premium pH',
    gaugeValue: 97
  },
  {
    phase: '06',
    title: 'Mineral Restorage Matrix',
    desc: 'Re-infuses trace bio-available active ions, feeding the pure water with precise increments of high-grade calcium, magnesium, and potassium.',
    icon: Award,
    efficiency: '99.99%',
    tds: '15 → 45 ppm',
    mineralContent: 'Calcium: 18mg, Zinc: 5mg',
    purityClass: 'Optimized Electrolytes',
    gaugeValue: 94
  },
  {
    phase: '07',
    title: 'Ozone & UV Sterilization',
    desc: 'Uncompromising biological control. Eradicates pathogens using dynamic shortwave ultraviolet sanitizing lamps before final reservoir holding.',
    icon: Sparkles,
    efficiency: '100.00%',
    tds: '45 → 45 ppm',
    mineralContent: 'Ultra-Pure Stable',
    purityClass: '100% Pathogen Eradication',
    gaugeValue: 100
  },
  {
    phase: '08',
    title: 'Aseptic Vessel Refilling',
    desc: 'Containers undergo automatic triple-scouring with alkaline vapor, high-pressure steam flushes, sealed closures, and cryptographic tracking.',
    icon: Droplet,
    efficiency: '100.00%',
    tds: '45 ppm (Sealed)',
    mineralContent: 'Safe Sealed State',
    purityClass: 'Quantum Aseptic Packaged',
    gaugeValue: 100
  }
];

export default function PurificationFeatures({ currency, onOrderProduct }: PurificationFeaturesProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Conversion rates: ₱1 = $0.02, aka 1 USD = ₱50
  const formatPrice = (priceInPhp: number) => {
    if (currency === 'USD') {
      const converted = (priceInPhp / 50).toFixed(2);
      return `$${converted}`;
    }
    return `₱${priceInPhp}`;
  };

  const currentStep = useMemo(() => purificationSteps[activeStep], [activeStep]);

  return (
    <section id="purification" className="py-28 bg-[#0b0f19] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-particles opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: DETAILED OFFLINE/ONLINE PRODUCTS CATALOGUE */}
        <div id="products" className="scroll-mt-28 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest text-sky-400 bg-sky-500/10 border border-sky-400/20 uppercase"
            >
              PRISTINE MOLECULAR ECOSYSTEMS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4"
            >
              Our Premium Water Offering Catalog
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto font-sans"
            >
              Engineered with advanced medical diagnostics in mind, we offer custom hydration tiers structured to optimize gastrointestinal and athletic metrics.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="products-catalog-grid">
            {products.map((p, idx) => {
              const IconComp = p.category === 'alkaline' ? Zap : p.category === 'mineral' ? Award : p.category === 'bottled' ? Sparkles : Droplet;
              
              // Custom water animation colors for simulated visual container
              const flaskColor = 
                p.category === 'alkaline' ? 'from-purple-500 to-indigo-600' :
                p.category === 'mineral' ? 'from-teal-400 to-emerald-600' :
                p.category === 'bottled' ? 'from-sky-300 to-blue-500' :
                'from-sky-400 to-blue-600';

              return (
                <motion.div 
                  key={p.id}
                  id={`product-card-${p.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-premium rounded-3xl p-6 hover:border-sky-500/30 hover:shadow-[0_20px_40px_rgba(14,165,233,0.08)] transition-all duration-500 flex flex-col justify-between group h-full relative overflow-hidden"
                >
                  {/* Subtle corner highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-sky-500/10 transition-all" />

                  <div className="space-y-5">
                    {/* Badge and Title */}
                    <div className="flex items-center justify-between">
                      <div className="bg-white/5 border border-white/10 text-sky-400 p-3 rounded-2xl group-hover:bg-sky-400 group-hover:text-slate-950 hover:rotate-12 transition-all duration-350 shadow-inner">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-sky-500/10 border border-sky-500/20 text-sky-300 px-2.5 py-1 rounded-md">
                        {p.category}
                      </span>
                    </div>

                    {/* Integrated 3D-feel Water Flask Simulator */}
                    <div className="relative w-full h-32 bg-[#080d1a] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-3">
                      {/* Flask container outline */}
                      <div className="relative w-16 h-24 bg-white/5 border border-white/20 rounded-t-xl rounded-b-2xl overflow-hidden shadow-inner flex flex-col justify-end">
                        {/* Static/Dynamic condensation droplets */}
                        <div className="absolute top-2 left-3 w-1 h-1 bg-white/40 rounded-full" />
                        <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-white/30 rounded-full" />
                        <div className="absolute top-12 left-5 w-0.5 h-0.5 bg-white/50 rounded-full" />
                        <div className="absolute top-16 right-3 w-1 h-2 bg-white/20 rounded-full" />

                        {/* Animated Water body wave inside flask */}
                        <div className="absolute inset-x-0 bottom-0 h-[68%] overflow-hidden">
                          {/* Solid water base */}
                          <div className={`absolute inset-x-0 bottom-0 top-[2px] bg-gradient-to-t ${flaskColor}`} />

                          {/* Wave 1 - rotating square centered exactly at top-0 (water surface) */}
                          <div 
                            className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-gradient-to-t ${flaskColor} rounded-[38%] animate-wave-slow opacity-85 pointer-events-none`}
                            style={{ transformOrigin: '50% 50%' }}
                          />

                          {/* Wave 2 - layer slightly offset */}
                          <div 
                            className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-gradient-to-t ${flaskColor} rounded-[43%] animate-wave-fast opacity-40 pointer-events-none`}
                            style={{ transformOrigin: '50% 50%' }}
                          />
                        </div>

                        {/* Bubbles */}
                        <div className="absolute bottom-10 left-6 w-1 h-1 bg-white/60 rounded-full animate-pulse z-10" />
                        <div className="absolute bottom-6 left-10 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse z-10" />
                      </div>

                      {/* HUD overlay scale metric */}
                      <div className="absolute right-3 bottom-2 text-[8px] font-mono text-slate-500 flex flex-col text-right leading-relaxed">
                        <span>VOLUME: 100%</span>
                        <span>DENSITY: OPTIMAL</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-sans text-lg font-bold text-white tracking-tight leading-tight group-hover:text-sky-400 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-sky-300/60 font-mono mt-1 uppercase tracking-wider">
                        {p.unit}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400 font-normal leading-relaxed">
                      {p.description}
                    </p>

                    {/* Technical parameter bullets */}
                    <ul className="space-y-1.5 pt-1 border-t border-white/5" id="product-features">
                      {p.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 animate-ping" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Refill CTA and Price container */}
                  <div className="pt-5 border-t border-white/10 mt-6 flex items-center justify-between" id={`product-actions-${p.id}`}>
                    <div>
                      <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase leading-none">REFILL RETAIL</span>
                      <span className="font-sans text-xl font-extrabold text-white mt-1 block tracking-tight">{formatPrice(p.price)}</span>
                    </div>
                    
                    <button
                      onClick={() => onOrderProduct(p.id)}
                      className="bg-white/5 border border-white/10 text-white font-bold group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-blue-500 group-hover:text-slate-950 hover:scale-105 transition-all duration-350 cursor-pointer text-xs px-4.5 py-2.5 rounded-xl shadow-sm"
                    >
                      REFILL NOW →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: 16-STAGE ROADMAP JOURNEY UNDER COOPERATIVE HUD LAB VIEW */}
        <div className="glass-premium rounded-[32px] p-8 sm:p-12 border border-white/10 scroll-mt-28" id="filtration-roadmap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative HUD Console Controller */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border border-sky-400/20">
                <BrainCircuit className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>INTEGRITY FLUID ENGINE</span>
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                Innovative 16-Stage Purifying Standard
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Our fluid structures are scrutinized at molecular tiers. Every unit of water filled under the RLM brand passes through 16 physical, ionized separation steps to ensure absolute purity and biological neutrality.
              </p>

              {/* Step Navigation Dots resembling medical console controls */}
              <div className="space-y-2 pt-2">
                <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">CHAMBER REACTOR MAP</span>
                <div className="grid grid-cols-4 gap-2.5" id="purification-step-dots">
                  {purificationSteps.map((step, idx) => (
                    <button
                      key={step.phase}
                      onClick={() => setActiveStep(idx)}
                      className={`relative py-3 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold transition-all border outline-none cursor-pointer ${
                        idx === activeStep 
                          ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)] font-black scale-102' 
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-[9px] opacity-40">CH</span>
                      <span className="text-sm mt-0.5">{step.phase}</span>
                      {idx === activeStep && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-slate-900" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Showroom Card (Apple Vision and Scientific Lab Aesthetic) */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#080d19]/90 rounded-2xl p-6 sm:p-8 border border-white/15 min-h-[420px] flex flex-col justify-between overflow-hidden group shadow-2xl">
                {/* Visual grid backdrop in showcase */}
                <div className="absolute inset-0 bg-grid-glow opacity-30 pointer-events-none" />
                {/* Massive ghost phase water counter backdrop */}
                <span className="absolute -bottom-8 -right-8 text-sky-500/5 font-extrabold text-[12rem] select-none pointer-events-none leading-none">
                  {currentStep.phase}
                </span>

                <div className="space-y-6 relative z-10" id="purification-step-display">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-black text-sky-400 tracking-widest uppercase">
                        LAB REACTOR: PHASE {currentStep.phase} OF 08
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wide">
                        CLASS: {currentStep.purityClass}
                      </span>
                    </div>
                    <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400 shadow-inner">
                      <currentStep.icon className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>

                  {/* Scientific Telemetry meters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">FILTRATION METRIC</span>
                      <span className="text-base font-black text-white block mt-1">{currentStep.efficiency}</span>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2.5 overflow-hidden">
                        <div 
                          className="bg-sky-400 h-full rounded-full transition-all duration-1000" 
                          style={{ width: currentStep.efficiency }}
                        />
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">TDS CONTAMINATION</span>
                      <span className="text-sm font-bold text-sky-300 block mt-1.5 truncate">{currentStep.tds}</span>
                      <span className="text-[9px] text-slate-500 font-mono block mt-1 leading-none">Total dissolved solids</span>
                    </div>
                  </div>

                  {/* Main description section with sleek hover glow */}
                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                      {currentStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {currentStep.desc}
                    </p>
                  </div>

                  {/* Live mineral status overlay */}
                  <div className="bg-sky-950/20 border border-sky-500/10 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ACTIVE MINERAL SPECTRUM:</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-black tracking-wide">{currentStep.mineralContent}</span>
                  </div>
                </div>

                {/* Next Stage Navigation footer */}
                <div className="pt-6 border-t border-white/5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <p className="text-[10px] text-slate-500 font-mono">
                    * Micro-verified with real-time spectrum chromatography daily logs.
                  </p>
                  <button
                    onClick={() => setActiveStep((activeStep + 1) % purificationSteps.length)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer border border-sky-500/20"
                  >
                    <span>NEXT LABORATORY REACTOR</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
