import { Droplet, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { stationInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800" id="main-footer">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-sky-500 text-white p-2 rounded-xl">
                <Droplet className="w-5 h-5" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-white">
                RLM <span className="text-sky-400">Water</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              We process every fluid container through multi-stage Reverse Osmosis filters and ultraviolet sanitization blocks to provide high-alkalinity drinking water solutions for home and business environments.
            </p>
            <p className="text-xs text-slate-550 leading-loose">
              Bureau of Water Quality Standard Compliance Certificate: RLM-2026-6815
            </p>
          </div>

          {/* Working hours Col */}
          <div className="md:col-span-3 space-y-4" id="footer-hours">
            <h4 className="font-sans text-xs uppercase tracking-widest text-sky-450 font-bold">
              Refill Operating Hours
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200">Monday - Friday:</span>
                  <p className="mt-0.5">{stationInfo.workingHours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200">Saturday:</span>
                  <p className="mt-0.5">{stationInfo.workingHours.saturday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-400">Sunday:</span>
                  <p className="mt-0.5">{stationInfo.workingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Col */}
          <div className="md:col-span-4 space-y-4" id="footer-contacts">
            <h4 className="font-sans text-xs uppercase tracking-widest text-sky-450 font-bold">
              Quick Delivery Outlets
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>{stationInfo.address}</span>
              </div>
              <a 
                href={`tel:${stationInfo.phone}`}
                className="flex items-center gap-2.5 hover:text-sky-400 transition-colors block"
              >
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{stationInfo.phone}</span>
              </a>
              <a 
                href={`mailto:${stationInfo.email}`}
                className="flex items-center gap-2.5 hover:text-sky-400 transition-colors block"
              >
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{stationInfo.email}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} RLM Water Station. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Back to top</a>
            <span>•</span>
            <span>Safety First Standard ISO-9001</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
