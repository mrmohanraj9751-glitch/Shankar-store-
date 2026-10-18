import React, { useState } from 'react';
import { ShoppingBag, Phone, MessageCircle, Search, Menu, X, MapPin } from 'lucide-react';
import { ShopLogo } from './ShopLogo';
import { SHOP_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top village announcement ticker */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center justify-center bg-emerald-700/80 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-100 tracking-wide">
              ANNADAL VILLAGE
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="font-medium text-emerald-100">
              Fresh Daily Groceries & Spices • Free Village Delivery on WhatsApp Orders
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100 font-medium">
            <a
              href={SHOP_INFO.telLink}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5"
              title="Call store directly"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>Call: {SHOP_INFO.formattedPhone}</span>
            </a>
            <span className="hidden md:inline text-emerald-600">|</span>
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-emerald-200 hover:text-white text-[11px] transition-colors"
              title="Open shop in Google Maps"
            >
              <MapPin className="w-3 h-3 text-emerald-300" />
              <span>Tiruvannamalai - 606804 (Map)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => handleNavClick('hero')}
          >
            <ShopLogo size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  Shankar Groscery
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Shop
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                <span className="text-emerald-600 font-semibold">{SHOP_INFO.tamilName}</span>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <span className="hidden sm:inline">Annadal</span>
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Ponni rice, Toor dal, Groundnut oil, Spices..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100/90 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className="hover:text-emerald-700 transition-colors cursor-pointer relative"
            >
              Offers
              <span className="absolute -top-2 -right-3 px-1.5 py-0.2 bg-rose-500 text-[10px] text-white rounded-full font-bold">
                Hot
              </span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Actions: Call, WhatsApp, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`https://wa.me/${SHOP_INFO.whatsappNumber}?text=Vanakkam%20Shankar%20Groscery%20Shop%21%20I%20would%20like%20to%20order%20groceries.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs hover:border-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
              aria-label="View shopping basket"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-stone-900 text-xs font-extrabold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xs:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider">
                  Basket
                </span>
                <span className="text-xs sm:text-sm font-extrabold">
                  {cartSubtotal > 0 ? `₹${cartSubtotal}` : 'Empty'}
                </span>
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible under header on small screens) */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Ponni rice, Toor dal, spices..."
              className="w-full pl-10 pr-8 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-stone-900 placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('hero')}
              className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800"
            >
              🏡 Home
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800"
            >
              📑 Categories
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800"
            >
              🌾 All Products
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className="p-2.5 text-left rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold"
            >
              🔥 Hot Offers
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 col-span-2"
            >
              📞 Shop Address & Phone
            </button>
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={SHOP_INFO.telLink}
              className="flex items-center justify-center gap-2 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm rounded-xl"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Call: {SHOP_INFO.formattedPhone}</span>
            </a>
            <a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-sm rounded-xl"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>View Shop Location (Google Maps)</span>
            </a>
            <a
              href={`https://wa.me/${SHOP_INFO.whatsappNumber}?text=Vanakkam%20Shankar%20Groscery%20Shop%21`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Shankar on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
