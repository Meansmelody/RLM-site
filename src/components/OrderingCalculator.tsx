import { useState, useTransition, useEffect, useRef, FormEvent } from 'react';
import { products, stationInfo } from '../data';
import { Calculator, ShoppingCart, Send, RefreshCw, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { BookingState } from '../types';

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
  const [needsContainers, setNeedsContainers] = useState<boolean>(false); // needs to purchase container deposit
  
  // Client personal details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');

  // Submit states
  const [hasOrdered, setHasOrdered] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  // If a user clicks 'Refill Now' from the catalog, auto-inject or increment that product in the calculator
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
      
      // Scroll to calculator
      const calcEl = document.getElementById('calculator');
      calcEl?.scrollIntoView({ behavior: 'smooth' });
      clearSelectedProduct();
    }
  }, [selectedProductId]);

  // Handle count updates safely
  const handleQuantityChange = (id: string, amount: number) => {
    setQuantities(prev => {
      const p = products.find(prod => prod.id === id);
      const min = p ? p.minOrder : 0;
      const current = prev[id] || 0;
      const updated = current + amount;
      
      return {
        ...prev,
        // Allow it to go down to 0, except if it is selected, ensure we can fully remove/zero items too
        [id]: Math.max(0, updated)
      };
    });
  };

  // Pricing constants setup (converted between PHP/USD)
  const currencySymbol = currency === 'PHP' ? '₱' : '$';
  const exchangeRate = 50; // 1 USD = 50 PHP for demo conversion purposes

  // Helper to scale price to selected currency
  const getScaledPrice = (phpPrice: number) => {
    if (currency === 'USD') {
      return Number((phpPrice / exchangeRate).toFixed(2));
    }
    return phpPrice;
  };

  const getContainerDepositFee = () => {
    // ₱200 per standard 5-gallon bottle (excluding cases/cartons)
    return needsContainers ? 200 : 0;
  };

  // Run totals
  const total5GallonsCount = (quantities['purified'] || 0) + (quantities['mineral'] || 0) + (quantities['alkaline'] || 0);
  const casesCount = quantities['bottled-box'] || 0;
  const totalItemsCount = total5GallonsCount + casesCount;

  // Calculation Logic
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
    if (deliveryFrequency === 'weekly') return 0.10; // 10% subscription discount
    if (deliveryFrequency === 'biweekly') return 0.05; // 5% biweekly discount
    if (deliveryFrequency === 'monthly') return 0.05; // 5% monthly discount
    return 0; // standard single delivery
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
    // If ordered items >= 3, shipping is FREE! Otherwise, a tiny fee.
    if (totalItemsCount === 0) return 0;
    if (total5GallonsCount >= 3 || casesCount >= 2) return 0; // free tier
    return getScaledPrice(50); // standard shipping is 50 pesos
  };

  const calcGrandTotal = () => {
    const sub = calcSubtotal();
    const disc = calcDiscount();
    const cont = calcContainerFee();
    const ship = calcDeliveryFee();
    return Number((sub - disc + cont + ship).toFixed(2));
  };

  // Perform form order submission
  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (totalItemsCount === 0) {
      alert('Please add at least 1 refill item to your container list.');
      return;
    }
    if (!fullName || !phone || !address) {
      alert('Please complete the fullName, telephone number, and delivery destination address fields to proceed.');
      return;
    }

    startTransition(async () => {
      // Create detailed recipe receipt summary
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
        deliveryDate: deliveryDate || 'As soon as possible',
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

  // Compose dynamic WhatsApp message template text
  const getWhatsAppLink = () => {
    if (!orderSummary) return '';
    
    let text = `💧 *RLM WATER STATION DELIVERY ORDER* 💧\n`;
    text += `📅 Date Filed: ${orderSummary.timestamp}\n`;
    text += `👤 Customer: *${orderSummary.fullName}*\n`;
    text += `📞 Phone: ${orderSummary.phone}\n`;
    text += `📍 Address: ${orderSummary.address}\n`;
    text += `🚀 Schedule: ${orderSummary.deliveryDate} (${orderSummary.frequency.toUpperCase()})\n`;
    text += `🔄 Swap empty jugs? ${orderSummary.needsSwap ? 'Yes, swap ready' : 'No, need container purchases'}\n\n`;
    text += `📦 *Refill Ordered Packages:*\n`;
    
    orderSummary.items.forEach((it: any) => {
      text += `• ${it.qty}x ${it.name} (@ ${orderSummary.currency}${it.unitPrice.toFixed(2)}) = ${orderSummary.currency}${it.total.toFixed(2)}\n`;
    });

    text += `\n💵 *Financial Summary:*`;
    text += `\n- Subtotal: ${orderSummary.currency}${orderSummary.subtotal.toFixed(2)}`;
    if (orderSummary.discount > 0) {
      text += `\n- Delivery Discount: -${orderSummary.currency}${orderSummary.discount.toFixed(2)}`;
    }
    if (orderSummary.containerFees > 0) {
      text += `\n- Containers Deposit: +${orderSummary.currency}${orderSummary.containerFees.toFixed(2)}`;
    }
    if (orderSummary.deliveryFees > 0) {
      text += `\n- Delivery Fee: ${orderSummary.currency}${orderSummary.deliveryFees.toFixed(2)}`;
    } else {
      text += `\n- Delivery Fee: *FREE SHIPPING*`;
    }
    text += `\n\n⭐ *TOTAL GRAND AMOUNT: ${orderSummary.currency}${orderSummary.grandTotal.toFixed(2)}*⭐\n`;
    text += `\n_Please confirm this schedule. Thank you for choosing RLM!_`;

    return `https://wa.me/${stationInfo.phone.replace(/\s+/g, '')}?text=${encodeURIComponent(text)}`;
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
    <section id="calculator" className="py-24 bg-gradient-to-br from-white via-sky-50/10 to-blue-50/20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5 text-sky-500" />
            <span>Interactive Quote Estimator</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Calculate Cost & Reschedule Refill
          </h2>
          <p className="text-slate-500 mt-3 text-base">
            No dynamic accounts needed. Use this quick transparent price calculator to estimate costs, and file a formal instant dispatch card to our hotline.
          </p>
        </div>

        {!hasOrdered ? (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="calculator-form">
            
            {/* Column 1: Item selects & subscription triggers (8 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-8">
              
              {/* Product Counter Selection lines */}
              <div className="space-y-4" id="calculator-item-counters">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>1. Choose Delivery items</span>
                  <span className="text-xs text-slate-400 capitalize font-medium">{totalItemsCount} pieces selected</span>
                </h3>

                <div className="space-y-4">
                  {products.map((p) => {
                    const count = quantities[p.id] || 0;
                    return (
                      <div 
                        key={p.id}
                        id={`calc-row-${p.id}`}
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 rounded-2xl transition-all gap-4 border ${
                          count > 0 
                            ? 'bg-sky-50/30 border-sky-200/50 shadow-sm' 
                            : 'bg-white border-slate-100/80 hover:bg-slate-50/30'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-sans font-bold text-slate-800 text-sm">{p.name}</span>
                          <span className="block text-[11px] text-slate-400">
                            {currencySymbol}{getScaledPrice(p.price).toFixed(2)} per {p.unit.toLowerCase()}
                          </span>
                        </div>

                        {/* Decrement / Count / Increment control panel */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          {count === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(p.id, p.minOrder)}
                              className="bg-sky-50 hover:bg-sky-100 text-sky-600 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                            >
                              + Add {p.minOrder} Refills
                            </button>
                          ) : (
                            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(p.id, -1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:text-sky-500 transition-all text-sm active:scale-90"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-mono font-bold text-sm text-slate-800">
                                {count}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(p.id, 1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:text-sky-500 transition-all text-sm active:scale-90"
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

              {/* Delivery Subscriptions Options */}
              <div className="space-y-4" id="calculator-frequency-options">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3">
                  2. Choose Delivery Frequency
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'once', label: 'Single Refill', sub: 'Standard price' },
                    { key: 'weekly', label: 'Weekly Sub', sub: 'Save 10%' },
                    { key: 'biweekly', label: 'Bi-Weekly', sub: 'Save 5%' },
                    { key: 'monthly', label: 'Monthly Sub', sub: 'Save 5%' }
                  ].map((freq) => (
                    <button
                      key={freq.key}
                      type="button"
                      onClick={() => setDeliveryFrequency(freq.key as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        deliveryFrequency === freq.key 
                          ? 'border-sky-500 bg-sky-500/5 text-white shadow-sm shadow-sky-500/10' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xs font-bold ${deliveryFrequency === freq.key ? 'text-sky-600' : 'text-slate-800'}`}>
                        {freq.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none mt-1 uppercase tracking-wide">
                        {freq.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Swap empty Container Option Toggle */}
              <div className="space-y-4" id="calculator-swap-options">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3">
                  3. Empty Container Swap Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setNeedsContainers(false)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      !needsContainers 
                        ? 'border-sky-500 bg-sky-500/5' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      !needsContainers ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300'
                    }`}>
                      {!needsContainers && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-800">Straight Swap (FREE)</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        I will give empty, clean 5-Gallon round/slim bottles to your dispatcher upon delivery.
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setNeedsContainers(true)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      needsContainers 
                        ? 'border-sky-500 bg-sky-500/5' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      needsContainers ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300'
                    }`}>
                      {needsContainers && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-800 leading-tight">I need to purchase containers</span>
                      <span className="block text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Please provide brand new 5-Gallon blue bottles. Deposit: {currencySymbol}{getScaledPrice(200).toFixed(2)} / vessel.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details forms */}
              <div className="space-y-4" id="calculator-customer-details">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-3">
                  4. Your Delivery Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Juan dela Cruz" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Phone Number (Active Mobile) *</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +63 912 345 6789" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 block">Delivery Address (Floor, Street, Brgy) *</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Unit 3B, 12 Magnolia St, Pasig City" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Preferred Date (Optional)</label>
                    <input 
                      type="date" 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all text-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Aide / Guard Notes</label>
                    <input 
                      type="text" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Leave with gate keeper if out" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Sticky calculation card summary (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden lg:sticky lg:top-24">
              
              {/* background dynamic abstract drop */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative">
                
                <h3 className="font-sans text-lg font-black tracking-tight border-b border-white/10 pb-4 flex items-center justify-between">
                  <span>Order Cost Summary</span>
                  <ShoppingCart className="w-5 h-5 text-sky-400" />
                </h3>

                {/* Selected packages brief receipt items */}
                <div className="space-y-3 min-h-24">
                  {totalItemsCount === 0 ? (
                    <p className="text-xs text-slate-400 font-medium py-4 text-center">
                      Your water cart is empty. Please select quantities on the left panel.
                    </p>
                  ) : (
                    <div className="space-y-2 border-b border-white/5 pb-4">
                      {products.map((p) => {
                        const qty = quantities[p.id] || 0;
                        if (qty === 0) return null;
                        const itemPrice = getScaledPrice(p.price);
                        return (
                          <div key={p.id} className="flex items-center justify-between text-xs text-slate-350">
                            <span>{qty} x {p.name}</span>
                            <span className="font-mono">{currencySymbol}{(qty * itemPrice).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pricing dynamic calculation rows */}
                  {totalItemsCount > 0 && (
                    <div className="space-y-2.5 text-xs pt-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Water Subtotal</span>
                        <span className="font-mono">{currencySymbol}{calcSubtotal().toFixed(2)}</span>
                      </div>

                      {calcDiscount() > 0 && (
                        <div className="flex justify-between text-emerald-450 font-medium bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                          <span>Subscription Saving ({Math.round(getDiscountPercent() * 100)}%)</span>
                          <span className="font-mono">-{currencySymbol}{calcDiscount().toFixed(2)}</span>
                        </div>
                      )}

                      {calcContainerFee() > 0 && (
                        <div className="flex justify-between text-slate-300">
                          <span>Containers Deposit ({total5GallonsCount} x Refill jugs)</span>
                          <span className="font-mono">+{currencySymbol}{calcContainerFee().toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-300">
                        <span>Dispatch Shipping</span>
                        {calcDeliveryFee() === 0 ? (
                          <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] bg-sky-500/10 px-2 rounded">
                            Free Shipping
                          </span>
                        ) : (
                          <span className="font-mono">+{currencySymbol}{calcDeliveryFee().toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Grand Total Value */}
                <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-300">Estimated Total:</span>
                  <div className="text-right">
                    <span className="font-sans text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
                      {currencySymbol}{calcGrandTotal().toFixed(2)}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-medium leading-none mt-1 uppercase">
                      Payment on delivery (Cash / GCash)
                    </span>
                  </div>
                </div>

                {/* FREE shipping trigger warning */}
                {totalItemsCount > 0 && total5GallonsCount < 3 && casesCount < 2 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-300 leading-normal">
                    💡 <strong>Tip:</strong> Add <strong>{3 - total5GallonsCount} more</strong> 5-gallon refills to unlock <strong>FREE DELIVERY</strong>!
                  </div>
                )}

                {/* Trust badge */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-[11px] text-slate-400 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>No Obligations Quote</span>
                  </div>
                  <p className="leading-relaxed">
                    This order generates a visual delivery card. To confirm, click submit and route/transmit the receipt to our dispatcher over WhatsApp in a single click!
                  </p>
                </div>

                {/* Main Submit Button */}
                <button
                  type="submit"
                  disabled={isPending || totalItemsCount === 0}
                  className="w-full bg-gradient-to-r from-sky-400 to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:from-sky-500 hover:to-blue-600 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <span>{isPending ? 'Processing...' : 'Generate Deliver Receipt'}</span>
                  <Send className="w-4 h-4 ml-1 fill-slate-950" />
                </button>

              </div>
            </div>

          </form>
        ) : (
          /* SUCCESS ORDER CARD - HIGH-CONVERTING RECEIPT STAGE */
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-100/50 space-y-6 relative overflow-hidden" id="order-success-receipt">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 to-blue-500" />
            
            <div className="text-center space-y-3 pt-4">
              <div className="inline-flex bg-emerald-50 text-emerald-500 p-4 rounded-full mt-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-sans text-2xl font-black text-slate-950">Receipt Generated successfully!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Hi {orderSummary.fullName}! Your water request summary has been formatted. Click the links below to dispatch it to our mobile riders.
              </p>
            </div>

            {/* Virtual receipt items details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-105 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>SLIP ID: RLM-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span>DATE: {orderSummary.deliveryDate}</span>
              </div>

              <div className="border-t border-dashed border-slate-250 pt-3 space-y-2">
                {orderSummary.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs text-slate-700">
                    <span className="font-medium">{it.qty} x {it.name}</span>
                    <span className="font-mono text-slate-900">{orderSummary.currency}{it.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-solid border-slate-200 pt-3 space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{orderSummary.currency}{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{orderSummary.currency}{orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                {orderSummary.containerFees > 0 && (
                  <div className="flex justify-between">
                    <span>New Canisters Deposit</span>
                    <span>+{orderSummary.currency}{orderSummary.containerFees.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Delivery</span>
                  <span>{orderSummary.deliveryFees === 0 ? 'FREE' : `${orderSummary.currency}${orderSummary.deliveryFees.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm text-slate-950 font-black border-t border-slate-200 pt-3">
                  <span>Total Amount</span>
                  <span className="font-sans text-lg text-sky-600">{orderSummary.currency}{orderSummary.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery address brief */}
            <div className="text-xs text-slate-500 space-y-1 bg-sky-50/30 p-4 rounded-xl border border-sky-100 text-left">
              <span className="block font-bold text-slate-700 uppercase tracking-wide">Destination Address:</span>
              <p className="font-medium text-slate-600">{orderSummary.address}</p>
              <p className="font-medium text-slate-500 mt-1">Recipient Number: <span className="font-semibold text-slate-800">{orderSummary.phone}</span></p>
            </div>

            {/* Action dispatch buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3" id="receipt-actions">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md shadow-emerald-400/10 text-center text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Instant dispatch via WhatsApp</span>
              </a>

              <a 
                href={`tel:${stationInfo.phone}`}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-6 rounded-2xl text-center text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline: {stationInfo.phone}</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-center text-xs text-slate-400 hover:text-sky-500 transition-colors cursor-pointer block pt-2 underline"
            >
              Reset Estimates & Calculate New Order
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
