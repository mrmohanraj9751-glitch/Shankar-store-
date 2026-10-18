import React from 'react';
import { ArrowRight, MessageCircle, Phone, Truck, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../data/products';

interface HeroProps {
  onShopNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-white pt-8 pb-14 sm:py-16 border-b border-stone-200/60">
      {/* Decorative background radial glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Village & Location Badge */}
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-100/90 hover:bg-emerald-200 text-emerald-900 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs transition-all w-fit mx-auto lg:mx-0 group"
              title="View Shankar Groscery Shop on Google Maps"
            >
              <MapPin className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform shrink-0" />
              <span>Annadal Village, Tiruvannamalai - 606804, India</span>
              <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-full font-bold">
                Map 📍
              </span>
            </a>

            {/* Hero Headings */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Your Neighbourhood <br className="hidden sm:inline" />
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Grocery Store
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-stone-700">
                Fresh Essentials, Everyday Savings!
              </p>
              <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to <strong className="text-emerald-900">Shankar Groscery Shop</strong>. Order your daily Ponni rice, unpolished pulses, pure groundnut oils, spices, and snacks with easy <strong className="text-stone-800">WhatsApp checkout</strong>. Enjoy door-step convenience right here in Annadal.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-800/25 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${SHOP_INFO.whatsappNumber}?text=Vanakkam%20Shankar%20Groscery%20Shop%21%20I%20want%20to%20order%20groceries.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-600/70 font-bold text-base px-6 py-3.5 rounded-xl shadow-xs active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={SHOP_INFO.telLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm px-4 py-3.5 rounded-xl transition-all"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call {SHOP_INFO.formattedPhone}</span>
              </a>
            </div>

            {/* Disclaimer pill */}
            <div className="pt-2">
              <p className="text-xs text-stone-600 bg-amber-50/90 border border-amber-200/90 rounded-lg p-2.5 max-w-xl mx-auto lg:mx-0">
                <span className="font-bold text-amber-800">Village Store Notice:</span> No online payment required! Place your order online or via WhatsApp, and pay via Cash / UPI on delivery. Sample rates are demo prices until confirmed.
              </p>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card with store showcase */}
              <div className="relative rounded-3xl bg-white p-5 sm:p-6 shadow-xl border border-stone-200/80 overflow-hidden">
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh groceries at Shankar Groscery Shop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open Today 7 AM - 9:30 PM
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-emerald-300">Shankar Groscery Shop • Annadal</p>
                    <p className="text-base sm:text-lg font-bold">100% Quality Daily Provision Items</p>
                  </div>
                </div>

                {/* 3 Key Trust Highlights */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-stone-100">
                  <div className="p-2 rounded-xl bg-stone-50">
                    <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800">Village Delivery</p>
                    <p className="text-[10px] text-stone-500">Annadal & nearby</p>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800">Clean & Fresh</p>
                    <p className="text-[10px] text-stone-500">Selected staples</p>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <HeartHandshake className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800">Pay on Delivery</p>
                    <p className="text-[10px] text-stone-500">Cash or GPay/UPI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
