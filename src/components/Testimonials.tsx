import { testimonials } from '../data';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-sky-700 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase border border-sky-100">
            <span>Customer Testimonials</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Trusted by Households & Cafés
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            See why Pasig, Manila, and surrounding cities trust RLM Water Station for extreme daily health hygiene and rapid deliveries.
          </p>
        </div>

        {/* Carousel/Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              id={`testimonial-card-${index}`}
              className="bg-sky-50/15 border border-sky-100/50 hover:border-sky-300 rounded-3xl p-6 relative flex flex-col justify-between hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 group"
            >
              {/* background icon quote bubble */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-sky-500/10 group-hover:text-sky-500/20 transition-colors" />

              <div className="space-y-4">
                {/* Visual stars rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Content body description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  "{t.content}"
                </p>
              </div>

              {/* Author profiles details */}
              <div className="border-t border-slate-100 flex items-center gap-3 pt-4 mt-6">
                
                {/* Circular Initial avatar block */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center font-bold text-sm text-white capitalize shadow-sm">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-800 leading-tight">
                    {t.name}
                  </h4>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Corporate bottom trust banner badge */}
        <div className="bg-sky-500/5 border border-sky-100 rounded-2xl p-6 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6" id="trust-bottom-bar">
          <div className="flex items-center gap-3 text-left">
            <span className="font-sans text-3xl font-black text-sky-500">100%</span>
            <div>
              <span className="block font-bold text-sm text-slate-800">Bacteriologically Sterile Guarantee</span>
              <span className="block text-xs text-slate-400">Regular double-swab quality checks in local healthcare bureaus.</span>
            </div>
          </div>
          <a
            href="#calculator"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Refill Your Bottle Today
          </a>
        </div>

      </div>
    </section>
  );
}
