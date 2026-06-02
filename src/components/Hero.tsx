import { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Droplets, Zap, ShieldAlert, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOrderClick: () => void;
}

export default function Hero({ onOrderClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Setup live background canvas water particle physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Represent water bubble particles floating gracefully
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const pCount = Math.min(60, Math.floor(width / 20));
      for (let i = 0; i < pCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height + height, // start from bottom
          radius: Math.random() * 3 + 1,
          speedY: -(Math.random() * 0.8 + 0.3),
          speedX: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render a subtle volumetric gradient beam
      const beamGrd = ctx.createLinearGradient(0, 0, width, height);
      beamGrd.addColorStop(0, 'rgba(14, 165, 233, 0.02)');
      beamGrd.addColorStop(0.5, 'rgba(2, 132, 199, 0.05)');
      beamGrd.addColorStop(1, 'rgba(14, 165, 233, 0.01)');
      ctx.fillStyle = beamGrd;
      ctx.fillRect(0, 0, width, height);

      // Draw active particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.shadowColor = '#0ea5e9';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Update coordinates
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset particle if it goes off top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-32 pb-20 bg-[#070a13] overflow-hidden flex items-center"
    >
      {/* HTML5 Interactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Volumetric light beam shaders */}
      <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] animate-beam pointer-events-none" />
      <div className="absolute bottom-[-10%] right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid line layer */}
      <div className="absolute inset-0 bg-grid-glow opacity-30 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-8" id="hero-left-container">
            
            {/* Liquid Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-sky-400 font-bold px-4 py-2 rounded-full text-xs tracking-widest uppercase border border-sky-400/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Certified Quantum Sterile Water Refill</span>
            </motion.div>

            {/* Display Typography */}
            <div className="space-y-5">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-sans text-4xl sm:text-5xl lg:text-7xl font-sans tracking-tight leading-[1.05] text-white"
              >
                Pristine <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-black animate-pulse">Purity</span>. <br />
                Prompt Delivery. <br />
                For Your <span className="underline decoration-sky-500/50 decoration-wavy decoration-3 underline-offset-6">Whole Family</span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
              >
                At <strong className="text-sky-300 font-semibold">RLM Water Station</strong>, we elevate hydration parameters. Ingest molecules purified through our ultra-modern 16-stage sand-carbon, reverse osmosis, and ionized pH reactors, dispatched clean straight to your dwelling.
              </motion.p>
            </div>

            {/* Glass Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
              id="hero-ctas"
            >
              <button 
                onClick={onOrderClick}
                className="relative overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 px-8 py-4.5 rounded-full text-sm font-extrabold shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-95 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-sky-300/30 font-sans tracking-wide"
                id="hero-order-cta"
              >
                <span>CALCULATE & ORDER REFILLS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('purification');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:scale-103"
              >
                <span>EXPLORE QUANTUM TECH</span>
              </button>
            </motion.div>

            {/* Assurances and mini indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
              id="hero-mini-badges"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="text-sky-400 bg-sky-500/10 p-2 rounded-xl border border-sky-400/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-100 text-sm leading-tight mt-1.5">16-Stage Purified</span>
                <span className="text-[11px] text-slate-400">Physical & Ozone sterile</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="text-cyan-400 bg-cyan-500/10 p-2 rounded-xl border border-cyan-400/20">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-100 text-sm leading-tight mt-1.5">Same-Day Dispatch</span>
                <span className="text-[11px] text-slate-400">Direct mobile refilling fleet</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-400/20">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-100 text-sm leading-tight mt-1.5">Refractive Clarity</span>
                <span className="text-[11px] text-slate-400">Sterilized, dual-scoured jugs</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Media (Asset Showcase with interactive reflection) */}
          <div className="lg:col-span-5 relative flex justify-center z-10" id="hero-right-container">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              {/* Outer Neon Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-[32px] rotate-2 scale-102 opacity-20 blur-2xl animate-pulse" />
              
              <div className="relative bg-white/5 p-3 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden group backdrop-blur-md">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-auto">
                  <img 
                    src="/src/assets/images/water_station_hero_1780025125353.png" 
                    alt="RLM Quantum Water Purification Facility" 
                    className="rounded-2xl w-full h-[400px] sm:h-[480px] object-cover shadow-inner group-hover:scale-105 transition-transform duration-1000 filter brightness-110 saturate-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent opacity-60" />
                </div>

                {/* Cyber HUD Floating statistics */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0c1223]/90 backdrop-blur-md rounded-2xl p-4.5 border border-white/10 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="block text-[9px] font-mono uppercase tracking-widest text-[#0ea5e9] leading-none">QUANTUM LAB FLOW</span>
                    <span className="font-sans text-2xl font-black text-white mt-1.5 block">116k+ <span className="text-sky-300 text-xs font-normal font-mono">L/Day</span></span>
                  </div>
                  <div className="h-10 w-[1px] bg-white/10" />
                  <div className="text-right">
                    <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-400 leading-none">CERTIFIED OUTLETS</span>
                    <span className="font-sans text-sm font-extrabold text-white mt-1.5 flex items-center gap-1 justify-end">
                      <span className="text-emerald-400">4.9</span> 
                      <span className="text-amber-400 text-xs text-glow">★★★★★</span>
                    </span>
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
