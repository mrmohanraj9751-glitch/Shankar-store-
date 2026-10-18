import React, { useState } from 'react';
import { Tag, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface OffersBannerProps {
  products: Product[];
  onAddMultipleToCart: (itemsToAdd: { product: Product; unit: string; price: number; qty: number }[]) => void;
}

export const OffersBanner: React.FC<OffersBannerProps> = ({ products, onAddMultipleToCart }) => {
  const [addedOfferId, setAddedOfferId] = useState<string | null>(null);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const handleAddSambarKit = () => {
    const rice = getProduct('prod-ponni-rice');
    const dal = getProduct('prod-toor-dal');
    const chilli = getProduct('prod-chilli-powder');
    const turmeric = getProduct('prod-turmeric-powder');

    const items = [];
    if (rice) items.push({ product: rice, unit: '5 kg', price: 300, qty: 1 });
    if (dal) items.push({ product: dal, unit: '1 kg', price: 155, qty: 1 });
    if (chilli) items.push({ product: chilli, unit: '200 g', price: 55, qty: 1 });
    if (turmeric) items.push({ product: turmeric, unit: '200 g', price: 38, qty: 1 });

    onAddMultipleToCart(items);
    setAddedOfferId('sambar-combo');
    setTimeout(() => setAddedOfferId(null), 2200);
  };

  const handleAddTeaTimeKit = () => {
    const tea = getProduct('prod-tea');
    const sugar = getProduct('prod-sugar');
    const biscuits = getProduct('prod-biscuits');
    const mixture = getProduct('prod-mixture');

    const items = [];
    if (tea) items.push({ product: tea, unit: '250 g', price: 95, qty: 1 });
    if (sugar) items.push({ product: sugar, unit: '1 kg', price: 44, qty: 1 });
    if (biscuits) items.push({ product: biscuits, unit: 'Pack of 2', price: 30, qty: 1 });
    if (mixture) items.push({ product: mixture, unit: '250 g', price: 65, qty: 1 });

    onAddMultipleToCart(items);
    setAddedOfferId('tea-combo');
    setTimeout(() => setAddedOfferId(null), 2200);
  };

  return (
    <section id="offers" className="py-12 bg-radial from-emerald-950 via-emerald-900 to-stone-900 text-white relative overflow-hidden">
      {/* Decorative background sparks */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-900 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Village Special Combo Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Annadal Family Savings Offers
            </h2>
            <p className="text-emerald-200 text-sm mt-1">
              Popular monthly combinations packed together with fast door delivery
            </p>
          </div>
          <div className="text-xs text-stone-300 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 w-fit">
            *Demo package pricing • Confirmed by Shankar Groscery Shop on WhatsApp
          </div>
        </div>

        {/* 2 Featured Combo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Combo 1: South Indian Sambar & Rasam Essentials */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-400/50 transition-all group">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-2.5 py-1 rounded-lg">
                  Bestseller Combo
                </span>
                <span className="text-xl font-extrabold text-amber-300">
                  ₹548 <span className="text-xs text-stone-400 font-normal line-through">₹580</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold group-hover:text-emerald-300 transition-colors">
                  South Indian Daily Sambar & Rice Kit
                </h3>
                <p className="text-xs text-emerald-200 mt-0.5">
                  தினசரி சாம்பார் & சாப்பாடு காம்போ பேக்
                </p>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                  Includes: 5kg Deluxe Ponni Boiled Rice + 1kg High Protein Toor Dal + 200g Pure Red Chilli Powder + 200g Erode Turmeric Powder.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🌾 Ponni Rice (5kg)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🥣 Toor Dal (1kg)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🌶️ Chilli (200g)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">✨ Turmeric (200g)</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Save approx ₹32
              </span>
              <button
                onClick={handleAddSambarKit}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {addedOfferId === 'sambar-combo' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Combo to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Combo 2: Tea Time Refreshment Kit */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-bold px-2.5 py-1 rounded-lg">
                  Evening Snack Pack
                </span>
                <span className="text-xl font-extrabold text-amber-300">
                  ₹234 <span className="text-xs text-stone-400 font-normal line-through">₹255</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold group-hover:text-amber-300 transition-colors">
                  Village Tea-Time Snack & Kaapi Pack
                </h3>
                <p className="text-xs text-amber-200 mt-0.5">
                  சாயங்கால டீ & மொறுமொறு கார மிக்ஸர் பேக்
                </p>
                <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                  Includes: 250g Strong Hotel Dust Tea + 1kg Refined Sugar + 250g Spicy South Indian Kara Mixture + 2 Packs Fresh Tea Biscuits.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">☕ Strong Tea (250g)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🍬 Sugar (1kg)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🥨 Kara Mixture (250g)</span>
                <span className="bg-stone-800/80 text-stone-200 px-2.5 py-1 rounded-md">🍪 Biscuits (Pack of 2)</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Save approx ₹21
              </span>
              <button
                onClick={handleAddTeaTimeKit}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {addedOfferId === 'tea-combo' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Combo to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
