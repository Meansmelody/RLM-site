import { useState, useTransition, useEffect, FormEvent } from 'react';
import { products, stationInfo } from '../data';
import { Calculator, ShoppingCart, Send, Phone, Sparkles, CheckCircle2, RefreshCw, Layers, ShieldCheck, Landmark, HelpCircle } from 'lucide-react';

interface OrderingCalculatorProps {
  currency: 'PHP' | 'USD';
  selectedProductId: string | null;
  clearSelectedProduct: () => void;
}

export default function OrderingCalculator({ currency, selectedProductId, clearSelectedProduct }: OrderingCalculatorProps) {
  const [isPending, startTransition] = useTransition();
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({
    purified: 3,
    mineral: 0,
    alkaline: 0,
    'bottled-box': 0
  });

  const [deliveryFrequency, setDeliveryFrequency] = useState<'once' | 'weekly' | 'biweekly' | 'monthly'>('once');
  const [needsContainers, setNeedsContainers] = useState<boolean>(false);

  // Client personal details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');

  // Submit states
  const [hasOrdered, setHasOrdered] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  // Auto-fill selected product if clicked from catalog
  useEffect(() => {
    if (selectedProductId) {
      setQuantities(prev => {
        const currentQty = prev[selectedProductId] || 0;
        const productDef = products.find(p => p.id === selectedProductId);
        const minVal = productDef ? productDef.minOrder : 1;
        
        return {
          ...prev,
          [selectedProductId]: Math.max(currentQty + 1, minVal)
        };
      });
      
      const calcEl = document.getElementById('calculator');
      calcEl?.scrollIntoView({ behavior: 'smooth' });
      clearSelectedProduct();
    }
  }, [selectedProductId]);

  const handleQuantityChange = (id: string, amount: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const updated = current + amount;
      return {
        ...prev,
        [id]: Math.max(0, updated)
      };
    });
  };

  const currencySymbol = currency === 'PHP' ? '₱' : '$';
  const exchangeRate = 50; // 1 USD = 50 PHP

  const getScaledPrice = (phpPrice: number) => {
    if (currency === 'USD') {
      return Number((phpPrice / exchangeRate).toFixed(2));
    }
    return phpPrice;
  };

  const getContainerDepositFee = () => {
    return needsContainers ? 200 : 0;
  };

  const total5GallonsCount = (quantities['purified'] || 0) + (quantities['mineral'] || 0) + (quantities['alkaline'] || 0);
  const casesCount = quantities['bottled-box'] || 0;
  const totalItemsCount = total5GallonsCount + casesCount;

  const calcSubtotal = () => {
    let sub = 0;
    products.forEach(p => {
      const qty = quantities[p.id] || 0;
      const unitPrice = getScaledPrice(p.price);
      sub += qty * unitPrice;
    });
    return Number(sub.toFixed(2));
  };

  const getDiscountPercent = () => {
    if (deliveryFrequency === 'weekly') return 0.10;
    if (deliveryFrequency === 'biweekly') return 0.05;
    if (deliveryFrequency === 'monthly') return 0.05;
    return 0;
  };

  const calcDiscount = () => {
    const sub = calcSubtotal();
    const pct = getDiscountPercent();
    return Number((sub * pct).toFixed(2));
  };

  const calcContainerFee = () => {
    const scaleDeposit = getScaledPrice(getContainerDepositFee());
    return Number((total5GallonsCount * scaleDeposit).toFixed(2));
  };

  const calcDeliveryFee = () => {
    if (totalItemsCount === 0) return 0;
    if (total5GallonsCount >= 3 || casesCount >= 2) return 0;
    return getScaledPrice(50);
  };

  const calcGrandTotal = () => {
    const sub = calcSubtotal();
    const disc = calcDiscount();
    const cont = calcContainerFee();
    const ship = calcDeliveryFee();
    return Number((sub - disc + cont + ship).toFixed(2));
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (totalItemsCount === 0) {
      alert('Please add at least 1 refill item to your container list.');
      return;
    }
    if (!fullName || !phone || !address) {
      alert('Please complete the fullName, phone, and delivery address fields to proceed.');
      return;
    }

    startTransition(async () => {
      const itemsList = products
        .filter(p => (quantities[p.id] || 0) > 0)
        .map(p => ({
          name: p.name,
          qty: quantities[p.id],
          unitPrice: getScaledPrice(p.price),
          total: Number((quantities[p.id] * getScaledPrice(p.price)).toFixed(2))
        }));

      const summary = {
        fullName,
        phone,
        address,
        deliveryDate: deliveryDate || 'Immediate dispatch',
        frequency: deliveryFrequency,
        needsSwap: !needsContainers,
        items: itemsList,
        subtotal: calcSubtotal(),
        discount: calcDiscount(),
        containerFees: calcContainerFee(),
        deliveryFees: calcDeliveryFee(),
        grandTotal: calcGrandTotal(),
        currency: currencySymbol,
        timestamp: new Date().toLocaleDateString()
      };

      setOrderSummary(summary);
      setHasOrdered(true);
    });
  };

  const getWhatsAppLink = () => {
    if (!orderSummary) return '';
    
    let text = `💧 *RLM QUANTUM WATER STATION RESERVATION* 💧\n`;
    text += `📅 Date Filed: ${orderSummary.timestamp}\n`;
    text += `👤 Recipient: *${orderSummary.fullName}*\n`;
    text += `📞 Active Contact: ${orderSummary.phone}\n`;
    text += `📍 Destination: ${orderSummary.address}\n`;
    text += `🚀 Schedule: ${orderSummary.deliveryDate} (${orderSummary.frequency.toUpperCase()})\n`;
    text += `🔄 Empty swapping? ${orderSummary.needsSwap ? 'Yes, ready for physical swap' : 'No, container deposit paid'}\n\n`;
    text += `📦 *Consignment Matrix:*\n`;
    
    orderSummary.items.forEach((it: any) => {
      text += `• ${it.qty}x ${it.name} = ${orderSummary.currency}${it.total.toFixed(2)}\n`;
    });

    text += `\n💵 *Financial Specifications:*`;
    text += `\n- Subtotal: ${orderSummary.currency}${orderSummary.subtotal.toFixed(2)}`;
    if (orderSummary.discount > 0) {
      text += `\n- Subscription Saving: -${orderSummary.currency}${orderSummary.discount.toFixed(2)}`;
    }
    if (orderSummary.containerFees > 0) {
      text += `\n- Bottle Deposits: +${orderSummary.currency}${orderSummary.containerFees.toFixed(2)}`;
    }
    if (orderSummary.deliveryFees > 0) {
      text += `\n- Mobile Dispatch: +${orderSummary.currency}${orderSummary.deliveryFees.toFixed(2)}`;
    } else {
      text += `\n- Mobile Dispatch: *FREE SHIPPING*`;
    }
    text += `\n\n⭐ *TOTAL EXPENDITURE: ${orderSummary.currency}${orderSummary.grandTotal.toFixed(2)}* ⭐\n`;
    text += `\n_Please confirm our delivery parameters. Thank you for utilizing RLM High Integrity Water._`;

    return `https://wa.me/${stationInfo.phone.replace(/\s+/g, '').replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setQuantities({
      purified: 3,
      mineral: 0,
      alkaline: 0,
      'bottled-box': 0
    });
    setDeliveryFrequency('once');
    setNeedsContainers(false);
    setHasOrdered(false);
    setOrderSummary(null);
  };

  return (
    <section id="calculator" className="py-28 bg-[#090c15] relative overflow-hidden scroll-mt-28">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-glow opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 text-[#0ea5e9] font-mono font-bold px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase border border-sky-400/20">
            <Calculator className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>QUANTUM COST CALCULATOR</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">
            Interactive Quotation Console
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Instantly formulate physical refills, adjust recurring scheduling tiers, toggles, and generate a secure hotline booking receipt without accounts.
          </p>
        </div>

        {!hasOrdered ? (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="calculator-form">
            
            {/* Left Hologram Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-8 backdrop-blur-xl">
              
              {/* Quantities row */}
              <div className="space-y-4" id="calculator-item-counters">
                <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>🚀 1. SPECIFY HYDRO MATRIX PORTFOLIO</span>
                  <span className="text-[10px] text-slate-400 font-medium font-sans">{totalItemsCount} units in line</span>
                </h3>

                <div className="space-y-3">
                  {products.map((p) => {
                    const count = quantities[p.id] || 0;
                    return (
                      <div 
                        key={p.id}
                        id={`calc-row-${p.id}`}
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4.5 rounded-2xl transition-all gap-4 border ${
                          count > 0 
                            ? 'bg-sky-500/5 border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.05)]' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Premium interactive water vessel */}
                          <div className="relative w-12 h-16 bg-[#040812] border border-white/10 rounded-xl overflow-hidden shadow-inner flex flex-col justify-end p-0.5 flex-shrink-0">
                            <div className="relative w-full h-full bg-white/5 border border-white/5 rounded-lg overflow-hidden flex flex-col justify-end">
                              {/* Condensation droplets */}
                              <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white/30 rounded-full" />
                              <div className="absolute top-3 right-1 w-0.5 h-0.5 bg-white/30 rounded-full" />
                              <div className="absolute top-7 left-1.5 w-0.25 h-1 bg-white/15 rounded-full" />

                              {/* Interactive liquid body waves */}
                              <div className="absolute inset-x-0 bottom-0 h-[70%] overflow-hidden">
                                {/* Solid water base */}
                                <div className={`absolute inset-x-0 bottom-0 top-[1px] bg-gradient-to-t ${
                                  p.id === 'alkaline' ? 'from-purple-500 to-indigo-650' :
                                  p.id === 'mineral' ? 'from-teal-400 to-emerald-600' :
                                  p.id === 'bottled-box' ? 'from-sky-300 to-blue-500' :
                                  'from-sky-450 to-blue-600'
                                }`} />

                                {/* Wave 1 */}
                                <div 
                                  className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] bg-gradient-to-t ${
                                    p.id === 'alkaline' ? 'from-purple-500 to-indigo-650' :
                                    p.id === 'mineral' ? 'from-teal-400 to-emerald-600' :
                                    p.id === 'bottled-box' ? 'from-sky-300 to-blue-500' :
                                    'from-sky-450 to-blue-600'
                                  } rounded-[38%] animate-wave-slow opacity-85 pointer-events-none`}
                                  style={{ transformOrigin: '50% 50%' }}
                                />

                                {/* Wave 2 */}
                                <div 
                                  className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-gradient-to-t ${
                                    p.id === 'alkaline' ? 'from-purple-500 to-indigo-650' :
                                    p.id === 'mineral' ? 'from-teal-400 to-emerald-600' :
                                    p.id === 'bottled-box' ? 'from-sky-300 to-blue-500' :
                                    'from-sky-450 to-blue-600'
                                  } rounded-[43%] animate-wave-fast opacity-40 pointer-events-none`}
                                  style={{ transformOrigin: '50% 50%' }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="font-sans font-bold text-white text-sm block">{p.name}</span>
                            <span className="block text-[11px] text-sky-300/60 font-mono">
                              {currencySymbol}{getScaledPrice(p.price).toFixed(2)} Refill / {p.unit}
                            </span>
                          </div>
                        </div>

                        {/* Interactive counters */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          {count === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(p.id, p.minOrder)}
                              className="bg-white/5 border border-white/10 text-white hover:bg-sky-500 hover:text-slate-950 px-4 py-2 rounded-xl text-[11px] font-bold transition-all"
                            >
                              + ADD REFILLS (Min: {p.minOrder})
                            </button>
                          ) : (
                            <div className="flex items-center bg-[#06080e] p-1.5 rounded-xl border border-white/10">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(p.id, -1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-300 hover:bg-white hover:text-slate-900 transition-all text-sm outline-none"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-mono font-bold text-sm text-sky-400">
                                {count}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(p.id, 1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-300 hover:bg-white hover:text-slate-900 transition-all text-sm outline-none"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Frequency */}
              <div className="space-y-4" id="calculator-frequency-options">
                <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-3">
                  ⚙️ 2. AUTOMATED REPEATING SCHEDULES
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'once', label: 'One Time Dispatch', sub: 'Standard rate' },
                    { key: 'weekly', label: 'Weekly refilling', sub: 'Save 10%' },
                    { key: 'biweekly', label: 'Bi-Weekly refilling', sub: 'Save 5%' },
                    { key: 'monthly', label: 'Monthly refilling', sub: 'Save 5%' }
                  ].map((freq) => (
                    <button
                      key={freq.key}
                      type="button"
                      onClick={() => setDeliveryFrequency(freq.key as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer outline-none ${
                        deliveryFrequency === freq.key 
                          ? 'border-sky-500 bg-sky-500/10 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]' 
                          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className={`text-[11px] font-bold block ${deliveryFrequency === freq.key ? 'text-sky-300' : 'text-slate-300'}`}>
                        {freq.label}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono block mt-1 uppercase">
                        {freq.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Container Swap Prefs */}
              <div className="space-y-4" id="calculator-swap-options">
                <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-3">
                  📦 3. EMPTY VESSEL REPLACEMENT OPTIONS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setNeedsContainers(false)}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      !needsContainers 
                        ? 'border-sky-500 bg-sky-500/10' 
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      !needsContainers ? 'border-sky-400 bg-sky-500 text-slate-900' : 'border-white/20'
                    }`}>
                      {!needsContainers && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-white">Direct Vessel Swap (FREE)</span>
                      <span className="block text-xs text-slate-400 mt-1.5 leading-relaxed">
                        I will give equivalent clean empty 5-gallon containers to RLM dispatchers upon arrival.
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setNeedsContainers(true)}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      needsContainers 
                        ? 'border-sky-500 bg-sky-500/10' 
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      needsContainers ? 'border-sky-400 bg-sky-500 text-slate-900' : 'border-white/20'
                    }`}>
                      {needsContainers && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-white">Purchase Initial Jugs</span>
                      <span className="block text-xs text-slate-400 mt-1.5 leading-relaxed">
                        No containers? We provide pristine certified blue canisters. Deposit: {currencySymbol}{getScaledPrice(200).toFixed(2)} each.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery info fields */}
              <div className="space-y-4" id="calculator-customer-details">
                <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-3">
                  👤 4. DISPATCH LOGISTICS ADDRESS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block font-semibold">User Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maria Santos" 
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block font-semibold">Primary Telephone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +63 912 345 6789" 
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400 block font-semibold">Specific Street, Building, Floor Address *</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Villa 12, Crystal Creek Subdivision, Pasig" 
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block font-semibold">Preferred Delivery Calendar Date</label>
                    <input 
                      type="date" 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block font-semibold">Gate Guard / Lobby Notes</label>
                    <input 
                      type="text" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Leave flat with front reception" 
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Interactive Holographic Receipt console (5 Cols) */}
            <div className="lg:col-span-12 xl:col-span-5 bg-[#080c16]/90 border border-[#0ea5e9]/25 text-white rounded-[32px] p-6 sm:p-8 shadow-[0_0_40px_rgba(14,165,233,0.1)] relative overflow-hidden lg:sticky lg:top-24">
              {/* Energy lines visualization */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-[80px]" />
              
              <div className="space-y-6 relative">
                
                <h3 className="font-sans text-lg font-black tracking-tight border-b border-white/10 pb-4 flex items-center justify-between">
                  <span className="shimmer-text font-mono tracking-widest text-[#0ea5e9]">LAB CONSOLE: SUMMARY</span>
                  <ShoppingCart className="w-5 h-5 text-sky-400 animate-pulse" />
                </h3>

                {/* Energy connections flow display */}
                <div className="space-y-3 min-h-24">
                  {totalItemsCount === 0 ? (
                    <div className="text-center py-6">
                      <HelpCircle className="w-8 h-8 text-slate-500 mx-auto animate-bounce" />
                      <p className="text-[11px] text-slate-400 font-mono mt-3">
                        CART STATE: INERT. SELECT METRICS TO START FLUID CONDUITS.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 border-b border-white/15 pb-4">
                      {products.map((p) => {
                        const qty = quantities[p.id] || 0;
                        if (qty === 0) return null;
                        const itemPrice = getScaledPrice(p.price);
                        return (
                          <div key={p.id} className="flex items-center justify-between text-xs text-slate-350 bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="font-semibold">{qty} x {p.name}</span>
                            <span className="font-mono text-sky-300 font-bold">{currencySymbol}{(qty * itemPrice).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {totalItemsCount > 0 && (
                    <div className="space-y-2.5 text-xs pt-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Consignment Value</span>
                        <span className="font-mono">{currencySymbol}{calcSubtotal().toFixed(2)}</span>
                      </div>

                      {calcDiscount() > 0 && (
                        <div className="flex justify-between text-emerald-450 font-bold bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20">
                          <span>Recurring Discount ({Math.round(getDiscountPercent() * 100)}%)</span>
                          <span className="font-mono">-{currencySymbol}{calcDiscount().toFixed(2)}</span>
                        </div>
                      )}

                      {calcContainerFee() > 0 && (
                        <div className="flex justify-between text-slate-300">
                          <span>Bottle Canisters Deposit</span>
                          <span className="font-mono">+{currencySymbol}{calcContainerFee().toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-300">
                        <span>Dispatch Shipping</span>
                        {calcDeliveryFee() === 0 ? (
                          <span className="text-emerald-400 font-black uppercase tracking-wider text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            FREE SHIPPING ACTIVATED
                          </span>
                        ) : (
                          <span className="font-mono">+{currencySymbol}{calcDeliveryFee().toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Grand Total Cost overlayed professionally */}
                <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-300">TALLY GRAND SUM:</span>
                  <div className="text-right">
                    <span className="font-sans text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-teal-200 block text-glow">
                      {currencySymbol}{calcGrandTotal().toFixed(2)}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block mt-1 uppercase">
                      Cod (cash/gcash) upon dispatch inspection
                    </span>
                  </div>
                </div>

                {/* FREE shipping triggers parameters */}
                {totalItemsCount > 0 && total5GallonsCount < 3 && casesCount < 2 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-300 leading-normal font-mono">
                    ⚠️ PROMO: Dispatch <strong>{3 - total5GallonsCount} more</strong> refills to trigger FREE SHIPPING parameters.
                  </div>
                )}

                {/* Secure certificate reassurance */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-[11px] text-slate-400 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ShieldCheck className="w-4 h-4 text-sky-400 animate-pulse" />
                    <span>SECURE DIRECT-TRANSMIT CHANNEL</span>
                  </div>
                  <p className="leading-relaxed font-sans text-xs">
                    Upon submitting, your specifications compile into a cryptographic WhatsApp format dispatchable to our mobile station dispatch teams instantly.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isPending || totalItemsCount === 0}
                  className="w-full bg-gradient-to-r from-sky-400 to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)] duration-300 transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>TRANSMIT REFILL REQUEST SUMMARY</span>
                </button>

              </div>
            </div>

          </form>
        ) : (
          /* SUCCESS STAGE OR RECEIPT FORMAT */
          <div className="max-w-xl mx-auto bg-white/5 border border-[#0ea5e9]/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden text-white" id="order-success-receipt">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 to-blue-400" />
            
            <div className="text-center space-y-4 pt-4">
              <div className="inline-flex bg-emerald-500/10 text-emerald-400 p-4 rounded-full border border-emerald-500/20 shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="font-sans text-2xl font-black text-white">Consignment Script Formatted</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Hi {orderSummary.fullName}! Your water request summary has been securely compiled. Fire the buttons below to dispatch it instantly to our active hotline riders.
              </p>
            </div>

            {/* Virtual invoice */}
            <div className="bg-[#050912] border border-white/5 rounded-2xl p-5 space-y-4 font-mono">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>CONSIGNMENT ID: RLM-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span>DESPATCH: {orderSummary.deliveryDate}</span>
              </div>

              <div className="border-t border-dashed border-white/20 pt-3 space-y-2">
                {orderSummary.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs text-slate-300">
                    <span>{it.qty}x {it.name}</span>
                    <span className="text-sky-300 font-bold">{orderSummary.currency}{it.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-solid border-white/10 pt-3 space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal Matrix</span>
                  <span>{orderSummary.currency}{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Recurring discount</span>
                    <span>-{orderSummary.currency}{orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                {orderSummary.containerFees > 0 && (
                  <div className="flex justify-between">
                    <span>Deposit on Bottles</span>
                    <span>+{orderSummary.currency}{orderSummary.containerFees.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Station Delivery</span>
                  <span>{orderSummary.deliveryFees === 0 ? 'FREE' : `${orderSummary.currency}${orderSummary.deliveryFees.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm text-white font-black border-t border-white/10 pt-3">
                  <span className="font-sans">TALLIED GRAND AMOUNT</span>
                  <span className="text-sky-400 text-glow">{orderSummary.currency}{orderSummary.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Logistics address summary capsule */}
            <div className="text-xs text-slate-300 space-y-1.5 bg-[#0a152d]/80 p-4 rounded-xl border border-[#0ea5e9]/20 text-left">
              <span className="block font-bold text-[#0ea5e9] tracking-wider uppercase text-[10px] font-mono">DELIVERY STATION DESTINATION:</span>
              <p className="font-semibold text-white leading-relaxed">{orderSummary.address}</p>
              <p className="text-slate-400 text-[11px] mt-1">Direct Recipient Mobile Contact: <span className="font-bold text-sky-300 font-mono">{orderSummary.phone}</span></p>
            </div>

            {/* Transmit action items */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3" id="receipt-actions">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-white font-black py-4 px-6 rounded-xl shadow-md text-center text-xs tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Transmit to Dispatch WhatsApp</span>
              </a>

              <a 
                href={`tel:${stationInfo.phone}`}
                className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold py-4 px-6 rounded-xl text-center text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all border border-sky-450/40"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Call Dispatch Now</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-center text-[11px] text-slate-500 hover:text-sky-300 transition-colors cursor-pointer block pt-2 underline outline-none"
            >
              Reset Terminal & Frame New Estimates
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
