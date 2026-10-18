import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  Store, 
  Truck, 
  CheckCircle2,
  Navigation,
  ExternalLink,
  Compass
} from 'lucide-react';
import { SHOP_INFO } from '../data/products';
import { createGeneralInquiryUrl } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [inquiryText, setInquiryText] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const message = inquiryText.trim()
      ? `Vanakkam Shankar Groscery Shop! ${inquiryText.trim()}`
      : undefined;
    window.open(createGeneralInquiryUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Store Location & Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Visit Our Shop or Order for Delivery
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Locate Shankar Groscery Shop on Google Maps in Annadal Village, Tiruvannamalai District.
          </p>
        </div>

        {/* 1. Dedicated Google Maps Integration Card */}
        <div className="bg-white rounded-3xl shadow-md border border-stone-200/90 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Shop Details Beside the Map */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white via-stone-50/50 to-emerald-50/20">
              <div className="space-y-4">
                {/* Verified badge */}
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-lg text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authoritative Shop Location</span>
                </div>

                {/* Shop Name & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {SHOP_INFO.name}
                  </h3>
                  <p className="text-emerald-700 font-bold text-sm mt-0.5">
                    {SHOP_INFO.tamilName} • அண்ணாதல் கிராமம்
                  </p>
                </div>

                {/* Complete Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Complete Address
                    </p>
                    <p className="text-sm font-semibold text-stone-800 leading-snug">
                      {SHOP_INFO.address}
                    </p>
                    <p className="text-xs text-stone-500">
                      Landmark: {SHOP_INFO.landmark}
                    </p>
                  </div>
                </div>

                {/* Clickable Phone Number */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Phone Number (Click to Call)
                    </p>
                    <a
                      href={SHOP_INFO.telLink}
                      className="text-base sm:text-lg font-black text-emerald-800 hover:text-emerald-950 hover:underline transition-colors block"
                      title="Call Shankar Groscery Shop directly"
                    >
                      {SHOP_INFO.formattedPhone}
                    </a>
                    <p className="text-[11px] text-stone-500">
                      Direct voice assistance for product availability & orders
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-stone-100/80 text-stone-700 text-xs font-medium">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{SHOP_INFO.timing} (Open 7 Days)</span>
                </div>
              </div>

              {/* Action Buttons: View Shop Location & Get Directions */}
              <div className="space-y-2.5 pt-2 border-t border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Button 1: View Shop Location */}
                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-emerald-800/20 transition-all text-center cursor-pointer"
                    title="Open Shankar Groscery Shop in Google Maps"
                  >
                    <MapPin className="w-4 h-4 text-emerald-200 shrink-0" />
                    <span>View Shop Location</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  </a>

                  {/* Button 2: Get Directions */}
                  <a
                    href={SHOP_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 active:scale-98 text-emerald-900 border-2 border-emerald-700 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all text-center shadow-2xs cursor-pointer"
                    title="Get turn-by-turn driving or walking directions to the shop"
                  >
                    <Navigation className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Get Directions</span>
                  </a>
                </div>

                {/* Call & WhatsApp secondary triggers */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <a
                    href={SHOP_INFO.telLink}
                    className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 py-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: +91 {SHOP_INFO.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${SHOP_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 py-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Responsive Interactive Google Maps Embed */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-stone-100 border-t lg:border-t-0 lg:border-l border-stone-200 overflow-hidden flex flex-col">
              {/* Top floating overlay card */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-md border border-stone-200/80 flex items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  <div>
                    <p className="text-xs font-extrabold text-stone-900 leading-tight">
                      Shankar Groscery Shop
                    </p>
                    <p className="text-[10px] text-stone-500 font-medium">
                      Annadal Village, Tiruvannamalai - 606804
                    </p>
                  </div>
                </div>
                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Google Maps Embed iframe */}
              <iframe
                title="Shankar Groscery Shop Location in Annadal Village, Tiruvannamalai"
                src="https://maps.google.com/maps?q=Annadal+Village,+Tiruvannamalai+District,+Tamil+Nadu+606804&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full flex-1 border-0 min-h-[380px] sm:min-h-[460px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Bottom Quick Guide Bar */}
              <div className="bg-stone-900/90 backdrop-blur-md text-stone-200 px-4 py-2.5 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-stone-800">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Authoritative Link: <strong className="text-white">maps.app.goo.gl/gPi3xd1VeBxQM5xN8</strong></span>
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline text-[11px]"
                  >
                    View in Google Maps App
                  </a>
                  <span className="text-stone-600">•</span>
                  <a
                    href={SHOP_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline text-[11px]"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Secondary Support Cards: Quick Inquiry & Delivery Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick WhatsApp Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200/80">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  Quick WhatsApp Inquiry
                </h3>
                <p className="text-xs text-stone-500">
                  Send a direct question to Shankar on WhatsApp
                </p>
              </div>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-3">
              <textarea
                rows={3}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="e.g. Do you have 25 kg Ponni rice bag in stock? What is today's coconut oil price?"
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none placeholder-stone-400"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp (+91 {SHOP_INFO.phone})</span>
              </button>
            </form>
          </div>

          {/* Delivery & Village Landmark Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Doorstep Delivery Guarantee</span>
              </div>
              <h4 className="font-bold text-lg text-stone-900">
                Annadal Village Fast Delivery
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enjoy free home delivery in Annadal Village and surrounding Tiruvannamalai areas. No card payment required; pay conveniently by Cash or UPI on arrival.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-600 border-t border-stone-100">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Same-day delivery
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Freshly packed staples
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>Directions & Landmark</span>
              </div>
              <h4 className="font-bold text-lg text-white">
                Annadal Village • Tiruvannamalai - 606804
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Conveniently located near Annadal Main Road / Bus Stop in Tiruvannamalai District. Easily accessible by two-wheelers, auto-rickshaws, and cars.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-emerald-300">
                <span>PIN Code: 606804, India</span>
                <a
                  href={SHOP_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white underline hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>Open Route</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
