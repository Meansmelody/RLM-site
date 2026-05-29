import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PurificationFeatures from './components/PurificationFeatures';
import OrderingCalculator from './components/OrderingCalculator';
import HydrationTracker from './components/HydrationTracker';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Trigger scroll to order calculator with specific product preset
  const handleOrderProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const clearSelectedProduct = () => {
    setSelectedProductId(null);
  };

  const handleHeroOrderClick = () => {
    const el = document.getElementById('calculator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-50 font-sans tracking-tight antialiased selection:bg-sky-550 selection:text-white">
      {/* Dynamic Navigation Header */}
      <Header currency={currency} setCurrency={setCurrency} />

      <main>
        {/* Modern high performance Hero banner */}
        <Hero onOrderClick={handleHeroOrderClick} />

        {/* Premium Water selection list and filtration timeline */}
        <PurificationFeatures currency={currency} onOrderProduct={handleOrderProduct} />

        {/* Dynamic Subscription order volume quote estimator */}
        <OrderingCalculator 
          currency={currency} 
          selectedProductId={selectedProductId} 
          clearSelectedProduct={clearSelectedProduct} 
        />

        {/* Gamified Hydration Tracking tool */}
        <HydrationTracker />

        {/* Real organic testimonials reviews */}
        <Testimonials />

        {/* Helpful accordion general FAQ blocks */}
        <FAQ />
      </main>

      {/* Corporate compliance physical schedule Footer */}
      <Footer />
    </div>
  );
}
