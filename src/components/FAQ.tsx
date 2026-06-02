import { useState } from 'react';
import { faqItems } from '../data';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-[#0b0f19] relative overflow-hidden boarder-t border-b border-white/5 scroll-mt-28">
      {/* Background neon elements */}
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-particles opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border border-sky-400/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>KNOWLEDGE REPOSITORY</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4 animate-pulse">
            Inquiry & Support Matrix
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            All necessary parameters regarding canister swapping, sanitization loops, commercial discount tiers, and localized Pasadena/Manila courier loops.
          </p>
        </div>

        {/* Accordions stream */}
        <div className="space-y-4" id="faq-accordions-group">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                id={`faq-item-${index}`}
                className={`glass-premium rounded-2xl border transition-all duration-350 overflow-hidden ${
                  isOpen 
                    ? 'border-sky-500/30 shadow-[0_4px_25px_rgba(14,165,233,0.05)] bg-white/5' 
                    : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                }`}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5.5 flex items-center justify-between gap-4 font-sans font-extrabold text-white text-sm sm:text-base focus:outline-none cursor-pointer"
                >
                  <span className="group-hover:text-sky-305 transition-colors">{item.question}</span>
                  <span className={`p-1.5 rounded-xl transition-colors shrink-0 ${isOpen ? 'bg-sky-500 text-slate-950' : 'bg-white/5 text-slate-405'}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Grow collapse text body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-2 border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to action footer */}
        <div className="text-center mt-12 text-xs sm:text-sm text-slate-500 font-medium">
          Still have inquiry questions? Call our office dispatcher directly at{' '}
          <a
            href="tel:+639123456789"
            className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors"
          >
            +63 912 345 6789
          </a>{' '}
          for helpful live answers.
        </div>

      </div>
    </section>
  );
}
