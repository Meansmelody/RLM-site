import { useState } from 'react';
import { Droplet, HelpCircle, Trophy, Sparkles, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function HydrationTracker() {
  const [weight, setWeight] = useState<number>(65); // default kg
  const [exercise, setExercise] = useState<number>(30); // minutes of exercise per day
  const [loggedAmount, setLoggedAmount] = useState<number>(0); // in ml

  // Calculations: Base water intake = weight (kg) * 35 ml
  // Plus additional water for workouts: exercise mins * 10 ml
  const calculateGoal = () => {
    const base = weight * 35;
    const additional = exercise * 10;
    return Math.round(base + additional); // daily intake in ml
  };

  const dailyGoal = calculateGoal();
  const progressPercent = Math.min(100, Math.round((loggedAmount / dailyGoal) * 100));

  const handleLoggedDrink = (amount: number) => {
    setLoggedAmount(prev => prev + amount);
  };

  const getCheerMessage = () => {
    if (progressPercent === 0) return 'Start logging your water intake today!';
    if (progressPercent < 30) return '🥤 Good start! Keep drinking to nourish your body.';
    if (progressPercent < 60) return '💧 Halfway there! You are doing great.';
    if (progressPercent < 90) return '✨ Fantastic hydration consistency! Nearly at the peak.';
    if (progressPercent >= 100) return '🏆 Hydration Goal Met! You are fully energized!';
    return 'Cheers to health!';
  };

  return (
    <section id="hydration" className="py-24 bg-sky-50/40 relative border-t border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase">
            <Droplet className="w-3.5 h-3.5 text-sky-500" />
            <span>Interactive Hydration Tool</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Your Personal Hydration Coach
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            Maintaining dynamic body water percentages promotes cellular recovery. Fill in your stats below, calculate your target volume, and tract your daily mugs using our digital glassware.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="hydration-grid">
          
          {/* Card left: Inputs & configs */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-sm flex flex-col justify-between">
            
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Adjust Weight & Exercise Tiers</span>
              </h3>

              {/* Weight selector slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 block">Your Body Weight:</label>
                  <span className="font-mono text-sm font-bold text-sky-600">{weight} kg ({Math.round(weight * 2.204)} lbs)</span>
                </div>
                <input 
                  type="range"
                  min="40"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>40 kg</span>
                  <span>80 kg</span>
                  <span>120 kg</span>
                </div>
              </div>

              {/* Exercise duration slider */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 block">Daily Active Workout:</label>
                  <span className="font-mono text-sm font-bold text-sky-600">{exercise} Minutes</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="120"
                  step="10"
                  value={exercise}
                  onChange={(e) => setExercise(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 Mins (Sedentary)</span>
                  <span>60 Mins</span>
                  <span>120 Mins (Athletic)</span>
                </div>
              </div>

              {/* Dynamic intake result summary */}
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100/50 flex items-center justify-between mt-4">
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none">Suggested Daily Intake</span>
                  <span className="font-sans text-3xl font-black text-slate-800 mt-1 block">
                    {(dailyGoal / 1000).toFixed(1)} <span className="text-sky-500 text-sm font-normal">Liters</span>
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-sky-100" />
                <div className="text-right">
                  <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none text-right">Standard Cups</span>
                  <span className="font-sans text-xl font-bold text-slate-700 mt-1 block">
                    {Math.round(dailyGoal / 250)} <span className="text-slate-400 text-xs font-normal">cups (255ml)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* General advice */}
            <p className="text-xs text-slate-400 mt-6 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              💡 <strong>RLM Health Tip:</strong> Drink a full cup of alkaline water 30 minutes before your meal to assist gastric secretion and promote cellular base metabolisms.
            </p>

          </div>

          {/* Card right: Gamified progress tracker & cup loggers */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-850 shadow-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual background ripple overlay */}
            <div className="absolute inset-0 bg-sky-500/5 -z-10" />

            <div className="text-center space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                Daily Tracker & Cup Dispenser
              </h3>
              
              {/* Thermometer / Jug Filling Animation */}
              <div className="flex justify-center py-6">
                <div className="relative w-28 h-40 bg-slate-800 rounded-b-3xl rounded-t-xl border-4 border-slate-700 overflow-hidden flex flex-col justify-end shadow-inner">
                  
                  {/* Fluid visual filler */}
                  <motion.div 
                    animate={{ height: `${progressPercent}%` }}
                    transition={{ duration: 0.6, type: 'spring', damping: 15 }}
                    className="w-full bg-gradient-to-t from-sky-400 via-sky-300 to-cyan-200 relative"
                    style={{ minHeight: '4px' }}
                  >
                    {/* Bubbles effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse" />
                  </motion.div>

                  {/* Absolute Center Stats */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-mono text-sm font-black text-white drop-shadow-md">
                      {progressPercent}%
                    </span>
                    <span className="text-[9px] text-slate-300 font-medium tracking-wide drop-shadow-sm">
                      {loggedAmount}ml / {dailyGoal}ml
                    </span>
                  </div>
                </div>
              </div>

              {/* Motivator message */}
              <p className="text-sm font-bold text-sky-200">
                {getCheerMessage()}
              </p>
            </div>

            {/* Click logging buttons */}
            <div className="space-y-4 mt-8">
              <span className="block text-center text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                Register a drink
              </span>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleLoggedDrink(250)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>Glass (250ml)</span>
                </button>
                <button
                  onClick={() => handleLoggedDrink(500)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>Bottle (500ml)</span>
                </button>
                <button
                  onClick={() => handleLoggedDrink(1000)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3 px-2 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer hover:border-sky-400/50"
                >
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>Flask (1.0L)</span>
                </button>
              </div>

              <button
                onClick={() => setLoggedAmount(0)}
                className="w-full text-center text-slate-400 hover:text-white transition-colors text-xs font-medium pt-2 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Water Progress Logs</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
