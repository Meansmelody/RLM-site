import { useState } from 'react';
import { products } from '../data';
import { Droplet, Award, Zap, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PurificationFeaturesProps {
  currency: 'PHP' | 'USD';
  onOrderProduct: (productId: string) => void;
}

const purificationSteps = [
  {
    phase: '01',
    title: 'Dual-Sand Multi-Media Filter',
    desc: 'Traps larger physical particles, dust, clay, and sand sediments directly from the source pipeline.',
    icon: Filter
  },
  {
    phase: '02',
    title: 'Granular Activated Carbon',
    desc: 'Removes organic chemicals, chlorines, bad odors, and color compounds making the fluid fully neutral.',
    icon: Sparkles
  },
  {
    phase: '03',
    title: '0.1 Micron Micro-filtration',
    desc: 'Acts as heavy fine particle defenses, trapping rust particles and dense bacterial compounds perfectly.',
    icon: Filter
  },
  {
    phase: '04',
    title: 'Dual Reverse Osmosis (RO)',
    desc: 'The heart of RLM purity. Forces water through semi-permeable membranes keeping only 99.9% pure H2O molecules.',
    icon: Droplet
  },
  {
    phase: '05',
    title: 'Ionizing pH Balancer',
    desc: 'Reroutes streams into heavy-grade water ionizers, elevating hydrogen levels to a alkaline state between 8.5 to 9.5.',
    icon: Zap
  },
  {
    phase: '06',
    title: 'Mineral Restorage Matrix',
    desc: 'Infuses water back with micro-dosages of pure elements, including pure state calcium and potassium oxides.',
    icon: Award
  },
  {
    phase: '07',
    title: 'Ozone & UV Sterilization',
    desc: 'Keeps water clean within storing tubes by sanitizing with powerful ultraviolet lamps.',
    icon: Sparkles
  },
  {
    phase: '08',
    title: 'Sanitized Vessel Fill-Up',
    desc: 'Bottles undergo visual checks, manual wash-scours, high-pressure steam cleanings, and automatic capped sealings.',
    icon: Droplet
  }
];

export default function PurificationFeatures({ currency, onOrderProduct }: PurificationFeaturesProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Simple pricing converter (say 1 USD is ₱50 for demonstration. Rates are clean and beautiful)
  const formatPrice = (priceInPhp: number) => {
    if (currency === 'USD') {
      const converted = (priceInPhp / 50).toFixed(2);
      return `$${converted}`;
    }
    return `₱${priceInPhp}`;
  };

  const currentIcon = purificationSteps[activeStep].icon;

  return (
    <section id="purification" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: OUR CATALOGUE */}
        <div id="products" className="scroll-mt-24 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-500 font-bold mb-3">RLM Aqua Menu</h2>
            <p className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our Premium Water Selections</p>
            <p className="text-slate-500 mt-3 text-base">We provide four customized water profiles to meet your exact household, clinical, or cafe preference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="products-catalog-grid">
            {products.map((p) => {
              const IconComponent = p.category === 'alkaline' ? Zap : p.category === 'mineral' ? Award : p.category === 'bottled' ? Sparkles : Droplet;
              return (
                <div 
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="bg-sky-50/20 hover:bg-white rounded-3xl p-6 border border-sky-100/50 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    {/* Badge / Category */}
                    <div className="flex items-center justify-between">
                      <div className="bg-sky-50 text-sky-600 p-3 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-sky-100/60 text-sky-700 px-2.5 py-1 rounded-md">
                        {p.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div>
                      <h3 className="font-sans text-lg font-bold text-slate-800 tracking-tight leading-tight group-hover:text-sky-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wide">
                        {p.unit}
                      </p>
                    </div>

                    <p className="text-sm text-slate-500 font-normal leading-relaxed">
                      {p.description}
                    </p>

                    {/* Bullet features */}
                    <ul className="space-y-2 pt-2">
                      {p.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between" id={`product-actions-${p.id}`}>
                    <div>
                      <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none">Price per refill</span>
                      <span className="font-sans text-xl font-extrabold text-slate-800">{formatPrice(p.price)}</span>
                    </div>
                    
                    <button
                      onClick={() => onOrderProduct(p.id)}
                      className="bg-sky-100 group-hover:bg-sky-500 group-hover:text-white text-sky-600 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-sky-200 transition-all active:scale-95"
                    >
                      Refill Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: 16-STAGE ROADMAP */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100 scroll-mt-24" id="filtration-roadmap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Static Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                <Filter className="w-3.5 h-3.5 text-sky-500" />
                <span>Water Integrity Journey</span>
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Our Advanced 16-Stage Purifying Standard
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We believe water is the elixir of wellness. Every batch of water refilled under the RLM crest passes through multi-tier deep sediment purification layers to deliver molecular-level biological sterility.
              </p>

              {/* Step Navigation Dots */}
              <div className="flex flex-wrap gap-2.5 pt-4" id="purification-step-dots">
                {purificationSteps.map((step, idx) => (
                  <button
                    key={step.phase}
                    onClick={() => setActiveStep(idx)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      idx === activeStep 
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 scale-105' 
                        : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                  >
                    {step.phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 min-h-64 flex flex-col justify-between relative overflow-hidden group">
                {/* Floating ambient drop */}
                <span className="absolute -bottom-10 -right-10 text-sky-50 opacity-10 font-bold text-9xl">
                  {purificationSteps[activeStep].phase}
                </span>

                <div className="space-y-6 relative" id="purification-step-display">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-sky-500">
                      PHASE {purificationSteps[activeStep].phase} / 08
                    </span>
                    <div className="p-3 bg-sky-50 rounded-xl text-sky-500">
                      {purificationSteps[activeStep].icon && (
                        <Filter className="w-6 h-6 animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-xl font-bold text-slate-800 tracking-tight">
                      {purificationSteps[activeStep].title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                      {purificationSteps[activeStep].desc}
                    </p>
                  </div>
                </div>

                {/* Subtext tips */}
                <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-400 font-medium">
                    * Continuous testing logged under local water bureau compliance sheets.
                  </p>
                  <button
                    onClick={() => setActiveStep((activeStep + 1) % purificationSteps.length)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-sky-500 font-bold hover:text-sky-600 transition-colors cursor-pointer self-end"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4" />
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
