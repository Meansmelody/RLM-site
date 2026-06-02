import { useState } from 'react';
import { Droplet, Trophy, Sparkles, Plus, RefreshCw, Activity, Heart, ShieldEllipsis, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HydrationTracker() {
  const [weight, setWeight] = useState<number>(65); // kg
  const [exercise, setExercise] = useState<number>(30); // minutes of exercise per day
  const [loggedAmount, setLoggedAmount] = useState<number>(0); // ml

  // daily goal calculation: base weight * 35 ml + workout mins * 10 ml
  const calculateGoal = () => {
    const base = weight * 35;
    const additional = exercise * 10;
    return Math.round(base + additional);
  };

  const dailyGoal = calculateGoal();
  const progressPercent = Math.min(100, Math.round((loggedAmount / dailyGoal) * 100));

  const handleLoggedDrink = (amount: number) => {
    setLoggedAmount(prev => prev + amount);
  };

  const getCheerMessage = () => {
    if (progressPercent === 0) return 'READY FOR INGESTION DEPOSITION';
    if (progressPercent < 30) return '🚀 ACTIVATING CELLULAR MEMBRANES';
    if (progressPercent < 60) return '💧 BALANCING GASTRIC SECRETIONS';
    if (progressPercent < 90) return '💎 TRANSCENDING HYDRATION BENCHMARKS';
    if (progressPercent >= 100) return '🏆 OPTIMAL INTENSITY METRICS UNLOCKED!';
    return 'FLUID SATURATION COMPLETE';
  };

  return (
    <section id="hydration" className="py-28 bg-[#0b0f19] relative overflow-hidden border-t border-white/5">
      {/* Background neon ambient */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-particles opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400/10 to-blue-500/10 text-sky-400 font-mono font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase border border-sky-400/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>WELLNESS & HYDRATION COACH SYSTEM</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">
            Interactive Cellular Fluid Monitor
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Fine-tune metabolic parameters. Input body configurations below to chart customized biological water coefficients and monitor intake using responsive glassware logs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="hydration-grid">
          
          {/* Left Config Panel (6 Cols) */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
            
            <div className="space-y-8">
              <h3 className="text-xs font-mono font-bold text-sky-450 uppercase tracking-widest border-b border-white/10 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>SPECIFY METRIC COEFFICIENTS</span>
              </h3>

              {/* Weight selection slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 block">Your Body Weight:</label>
                  <span className="font-mono text-xs font-black text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                    {weight} kg ({Math.round(weight * 2.204)} lbs)
                  </span>
                </div>
                <input 
                  type="range"
                  min="40"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-sky-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>40 KG</span>
                  <span>80 KG</span>
                  <span>120 KG</span>
                </div>
              </div>

              {/* Exercise duration slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 block">Daily Caloric Activity / Workout:</label>
                  <span className="font-mono text-xs font-black text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                    {exercise} Minutes
                  </span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="120"
                  step="10"
                  value={exercise}
                  onChange={(e) => setExercise(Number(e.target.value))}
                  className="w-full accent-sky-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>0 MIN (SEDENTARY)</span>
                  <span>60 MINS</span>
                  <span>120 MINS (INTENSE ATHLETICS)</span>
                </div>
              </div>

              {/* Dynamic target result summary card */}
              <div className="bg-[#080d19] border border-white/5 rounded-2xl p-5 flex items-center justify-between mt-4">
                <div>
                  <span className="block text-[8px] font-mono tracking-widest text-[#0ea5e9] uppercase leading-none font-bold">SUGGESTED OPTIMAL TARGET</span>
                  <span className="font-sans text-3xl font-black text-white mt-1.5 block">
                    {(dailyGoal / 1000).toFixed(2)} <span className="text-sky-300 text-sm font-normal">Liters / Day</span>
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-white/10" />
                <div className="text-right">
                  <span className="block text-[8px] font-mono tracking-widest text-slate-400 uppercase leading-none font-bold">STANDARD GLASS COUNT</span>
                  <span className="font-sans text-xl font-bold text-slate-200 mt-1.5 block tracking-tight">
                    {Math.round(dailyGoal / 250)} <span className="text-slate-500 text-xs font-normal font-mono">cups (250ml)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Scientific health guidance banner */}
            <div className="text-xs text-slate-400 mt-8 leading-relaxed bg-[#0a142c]/50 p-4 rounded-xl border border-sky-500/10 flex items-start gap-3">
              <Heart className="w-5 h-5 text-sky-400 flex-shrink-0 animate-pulse mt-0.5" />
              <p className="font-sans">
                <strong>Clinically Proven:</strong> Consuming active ionized alkaline solutions 30 minutes before high-intensity sprints improves intracellular hydration by 14% and reduces lactic acid accumulation.
              </p>
            </div>

          </div>

          {/* Right Hologram Glass Container Cylinder Gauge Panel (6 Cols) */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden text-white shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            <div className="text-center space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                PRISTINE GLASSMETER RECOVERY CHART
              </h3>
              
              {/* Premium Flask Cylinder liquid simulation */}
              <div className="flex justify-center py-6">
                <div className="relative w-32 h-52 bg-white/5 rounded-b-[40px] rounded-t-xl border-4 border-slate-700 overflow-hidden flex flex-col justify-end shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
                  
                  {/* Subtle glass container side reflections and scales */}
                  <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20 z-20" />
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-white/20 z-20" />
                  <div className="absolute top-8 left-2 text-[7px] font-mono text-white/30 z-20 leading-none">--- ML max</div>
                  <div className="absolute top-20 left-2 text-[7px] font-mono text-white/20 z-20 leading-none">--- 1500</div>
                  <div className="absolute top-32 left-2 text-[7px] font-mono text-white/20 z-20 leading-none">--- 750</div>

                  {/* Level text */}
                  <div className="absolute inset-x-0 bottom-12 text-center pointer-events-none z-20 flex flex-col items-center">
                    <span className="font-mono text-lg font-black text-white text-glow">
                      {progressPercent}%
                    </span>
                    <span className="text-[10px] text-sky-200 mt-1 font-mono font-medium tracking-wider">
                      {loggedAmount}ml / {dailyGoal}ml
                    </span>
                  </div>

                  {/* Interactive liquid level body waves */}
                  <div 
                    className="absolute inset-x-0 bottom-0 overflow-hidden transition-all duration-1000 ease-in-out"
                    style={{ height: `${progressPercent}%`, minHeight: progressPercent > 0 ? '6px' : '0px' }}
                  >
                    {/* Solid water body */}
                    <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 shadow-[inset_0_10px_20px_rgba(255,255,255,0.2)]" />

                    {/* Wave 1: Rotating surface wave */}
                    <div 
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-gradient-to-t from-sky-400 to-cyan-300 rounded-[38%] animate-wave-slow opacity-85 pointer-events-none"
                      style={{ transformOrigin: '50% 50%' }}
                    />

                    {/* Wave 2: Slower offset surface wave */}
                    <div 
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/40 rounded-[44%] animate-wave-fast pointer-events-none"
                      style={{ transformOrigin: '50% 50%' }}
                    />
                  </div>
                  
                </div>
              </div>

              {/* Status Message */}
              <p className="text-xs font-mono font-black tracking-widest text-sky-300 uppercase animate-pulse">
                STATUS: {getCheerMessage()}
              </p>
            </div>

            {/* Log inputs registry */}
            <div className="space-y-5 mt-6 border-t border-white/5 pt-6">
              <span className="block text-center text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">
                REGISTER FLUID DEPOSIT
              </span>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleLoggedDrink(250)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3.5 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-sans font-bold">Cup (250ml)</span>
                </button>
                <button
                  onClick={() => handleLoggedDrink(500)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3.5 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-sans font-bold">Flask (500ml)</span>
                </button>
                <button
                  onClick={() => handleLoggedDrink(1000)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3.5 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-sans font-bold">Jug (1.0L)</span>
                </button>
              </div>

              <button
                onClick={() => setLoggedAmount(0)}
                className="w-full text-center text-slate-500 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase tracking-widest pt-2 flex items-center justify-center gap-1.5 cursor-pointer outline-none"
              >
                <RefreshCw className="w-3 h-3" />
                <span>FLUSH WORKSPACE TRANSACTION HISTORY</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
