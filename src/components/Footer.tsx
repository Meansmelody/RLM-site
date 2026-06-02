import { Droplet, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { stationInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070a13] text-slate-400 border-t border-white/5" id="main-footer">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-sky-400 to-blue-500 text-slate-950 p-2.5 rounded-xl shadow-md">
                <Droplet className="w-5 h-5" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                RLM <span className="text-sky-400 font-extrabold">Water</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              We process every fluid container through multi-stage Reverse Osmosis filters and ultraviolet sanitization blocks to provide high-alkalinity drinking water solutions for home, clinical, and workspace environments.
            </p>
            <div className="flex items-center gap-2 bg-sky-500/5 border border-sky-500/10 rounded-xl p-3 max-w-xs text-[10px] text-sky-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>BUREAU CERTIFICATE: RLM-2026-QA-815</span>
            </div>
          </div>

          {/* Working hours Col */}
          <div className="md:col-span-3 space-y-5" id="footer-hours">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#0ea5e9] font-bold">
              REFILL OPERATING SCHEDULES
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200">Monday - Friday Refills:</span>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{stationInfo.workingHours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-450 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200">Saturday Dispatch:</span>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{stationInfo.workingHours.saturday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-450">Sunday Schedule:</span>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">{stationInfo.workingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Col */}
          <div className="md:col-span-4 space-y-5" id="footer-contacts">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#0ea5e9] font-bold">
              QUANTUM REFILL DISPATCH OUTLET
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{stationInfo.address}</span>
              </div>
              
              <a 
                href={`tel:${stationInfo.phone}`}
                className="flex items-center gap-3 hover:text-sky-305 transition-colors block text-slate-300 font-semibold"
              >
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>HOTLINE: {stationInfo.phone}</span>
              </a>

              <a 
                href={`mailto:${stationInfo.email}`}
                className="flex items-center gap-3 hover:text-sky-305 transition-colors block text-slate-350"
              >
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>SUPPORT: {stationInfo.email}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright bar */}
      <div className="border-t border-white/5 bg-[#03060c] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} RLM high Integrity Refill Lab. Built with certified, sterile standard parameters.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Back to orbit</a>
            <span>•</span>
            <span>Safety ISO-9001 Protocol certified</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
