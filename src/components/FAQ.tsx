import { useState } from 'react';
import { faqItems } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-b border-slate-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>Got Questions?</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            Everything you need to know about bottle sizes, sanitization practices, subscription plans, and neighborhood delivery ranges.
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
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen 
                    ? 'border-sky-200 shadow-sm shadow-sky-500/5' 
                    : 'border-slate-150 hover:border-slate-300'
                }`}
              >
                {/* Accordion header clicker */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-sans font-bold text-slate-800 text-sm sm:text-base focus:outline-none cursor-pointer"
                >
                  <span>{item.question}</span>
                  <span className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-sky-50 text-sky-500' : 'bg-slate-50 text-slate-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                      <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed font-normal pt-2 border-t border-slate-50">
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
        <div className="text-center mt-12 text-xs text-slate-400 font-medium">
          Still have inquiry questions? Call our office dispatcher directly at{' '}
          <a
            href="tel:+639123456789"
            className="text-sky-500 hover:text-sky-600 font-bold underline"
          >
            +63 912 345 6789
          </a>{' '}
          for helpful live answers.
        </div>

      </div>
    </section>
  );
}
