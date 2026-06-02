import { testimonials } from '../data';
import { Quote, Star, Award, ShieldAlert, BadgeCheck, Users, FlameKindling, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-[#090c15] relative overflow-hidden scroll-mt-28 border-t border-white/5">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-particles opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-405 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border border-sky-400/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>CONSUMER ENDORSEMENTS & METRICS</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">
            Trusted by Connoisseurs & Clínics
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Hear why premium cafes, athletic laboratories, and medical practitioners recommend RLM Quantum Water for daily cell hydration.
          </p>
        </div>

        {/* Carousel/Grid container with luxury floating properties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ rotateY: 3, rotateX: 2, y: -6 }}
              id={`testimonial-card-${index}`}
              className="glass-premium rounded-3xl p-6.5 relative flex flex-col justify-between hover:border-sky-500/20 hover:shadow-[0_15px_35px_rgba(14,165,233,0.06)] transition-all duration-500 group overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-sky-500/10 transition-all" />
              
              <Quote className="absolute top-6 right-6 w-8 h-8 text-sky-500/10 group-hover:text-sky-500/25 transition-all duration-300 transform group-hover:rotate-12" />

              <div className="space-y-4">
                {/* Visual stars rating */}
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-glow" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author profiles details */}
              <div className="border-t border-white/10 flex items-center gap-3.5 pt-5 mt-6 relative z-10">
                
                {/* Circular gradient profile placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow-[0_4px_10px_rgba(14,165,233,0.2)]">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold text-white tracking-tight">
                    {t.name}
                  </h4>
                  <span className="block text-[9px] uppercase font-mono tracking-widest text-sky-300/60 mt-1">
                    {t.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Corporate bottom trust banner badge (Refined to be sleek healthcare badge) */}
        <div className="bg-gradient-to-r from-sky-950/20 via-[#0d152c]/50 to-blue-950/20 border border-white/10 rounded-2xl p-6.5 mt-16 flex flex-col md:flex-row items-center justify-between gap-6" id="trust-bottom-bar">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-sky-500/15 rounded-xl border border-sky-500/25 text-sky-400 flex-shrink-0 animate-pulse">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-sans text-xs font-extrabold tracking-wider text-white uppercase flex items-center gap-2">
                100% PHYSIOCHEMICAL & BACTERIOLOGICAL STERILITY ASSURED
              </span>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Regular direct specimen water swabs filed under the local DOH Sanitary Division protocols catalog.
              </p>
            </div>
          </div>
          <a
            href="#calculator"
            className="w-full md:w-auto bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black py-3 px-6 rounded-full text-xs transition-all cursor-pointer text-center duration-300 tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-103"
          >
            CALCULATE & ARRANGE REFILL NOW
          </a>
        </div>

      </div>
    </section>
  );
}
