import React from 'react';
import { ShopLogo } from './ShopLogo';
import { SHOP_INFO } from '../data/products';
import { Phone, MessageCircle, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShopLogo size="md" />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Shankar Groscery
                </span>
                <p className="text-xs text-emerald-400 font-semibold">
                  {SHOP_INFO.tamilName}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted neighbourhood grocery store in Annadal Village, Tiruvannamalai. Fresh Ponni rice, unpolished pulses, pure oils, spices, and everyday household essentials delivered to your doorstep.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="p-2 rounded-xl bg-stone-800 hover:bg-emerald-700 text-stone-200 hover:text-white transition-colors"
                title="Call Shankar Groscery"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SHOP_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-800 hover:bg-emerald-700 text-stone-200 hover:text-white transition-colors"
                title="WhatsApp Shankar Groscery"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categories')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Grocery Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('products')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Featured Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('offers')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Family Combo Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Contact & Timings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Store Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-300 font-medium">
                    {SHOP_INFO.address}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={SHOP_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline font-semibold text-[11px]"
                    >
                      View on Google Maps
                    </a>
                    <span className="text-stone-600">•</span>
                    <a
                      href={SHOP_INFO.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline font-semibold text-[11px]"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SHOP_INFO.telLink}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {SHOP_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${SHOP_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-semibold"
                >
                  WhatsApp: +91 {SHOP_INFO.phone}
                </a>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Open Daily: 7:00 AM – 9:30 PM (All 7 Days)
              </p>
            </div>
          </div>

          {/* Column 4: Tamil Culture & Ordering Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              வாடிக்கையாளர் அறிவிப்பு
            </h4>
            <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/60 text-xs space-y-2 text-stone-300">
              <p className="font-semibold text-emerald-300">
                நன்றி! மீண்டும் வருக!
              </p>
              <p className="text-[11px] leading-relaxed text-stone-400">
                பொருட்களின் மாதிரி விலைகள் தினசரி சந்தை விலைக்கு ஏற்ப மாறக்கூடும். வாட்ஸ்அப்பில் உறுதி செய்யப்பட்ட பின் நேரடியாக வீட்டிற்கு அனுப்பப்படும்.
              </p>
            </div>
            <p className="text-[11px] text-stone-500">
              No online card payments needed. Pay directly by Cash or UPI on delivery.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Shankar Groscery Shop. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Annadal Village, Tiruvannamalai District.
          </p>
        </div>
      </div>
    </footer>
  );
};
