import React, { useState } from 'react';
import { Product, ProductUnitOption } from '../types';
import { Plus, Minus, ShoppingBag, Check, Edit2, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, unitOption: ProductUnitOption, quantity: number) => void;
  onOpenEditModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenEditModal,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<ProductUnitOption>(
    product.unitOptions[0] || { unit: product.defaultUnit, price: product.defaultPrice }
  );
  const [quantity, setQuantity] = useState(1);
  const [showAddedCheck, setShowAddedCheck] = useState(false);

  // If unitOptions changed dynamically (e.g. from an edit), update selectedUnit
  React.useEffect(() => {
    const matched = product.unitOptions.find((u) => u.unit === selectedUnit.unit);
    if (matched) {
      setSelectedUnit(matched);
    } else if (product.unitOptions[0]) {
      setSelectedUnit(product.unitOptions[0]);
    }
  }, [product.unitOptions]);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product, selectedUnit, quantity);
    setShowAddedCheck(true);
    setTimeout(() => {
      setShowAddedCheck(false);
    }, 1400);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
      product.inStock
        ? 'border-stone-200/90 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-900/5'
        : 'border-stone-200 bg-stone-50/60 opacity-80'
    }`}>
      {/* Top Media & Badges */}
      <div>
        <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback placeholder if image load fails
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Badges on image */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.isOffer && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                {product.offerText || 'Special Offer'}
              </span>
            )}
            {product.isPopular && (
              <span className="bg-emerald-700 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                Village Favourite
              </span>
            )}
          </div>

          {/* Edit product trigger (honest client edit for store manager / testing) */}
          <button
            onClick={() => onOpenEditModal(product)}
            className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white text-stone-600 hover:text-emerald-700 rounded-lg shadow-sm backdrop-blur-xs transition-all cursor-pointer opacity-90 hover:opacity-100"
            title="Update demo price / availability on this device"
            aria-label={`Edit ${product.name} details`}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* In Stock status */}
          <div className="absolute bottom-2 left-2">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 bg-white/95 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                <AlertCircle className="w-3 h-3 text-red-600" />
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 space-y-2">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
            {product.categoryName}
          </div>

          <div>
            <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-800 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs font-semibold text-stone-500 mt-0.5 font-sans">
              {product.tamilName}
            </p>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pack size selection */}
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Select Pack Size / Unit:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.unitOptions.map((opt) => {
                const isCurrent = opt.unit === selectedUnit.unit;
                return (
                  <button
                    key={opt.unit}
                    type="button"
                    onClick={() => setSelectedUnit(opt)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-700 text-white font-bold shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {opt.unit}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Action Area */}
      <div className="p-4 pt-1 bg-stone-50/70 border-t border-stone-100 space-y-3">
        {/* Price display with Demo indicator */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-stone-900">
              ₹{selectedUnit.price}
            </span>
            <span className="text-xs font-medium text-stone-500">
              / {selectedUnit.unit}
            </span>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded font-semibold" title="Sample shop price. Confirmed by Shankar Groscery on WhatsApp.">
            Demo Price
          </span>
        </div>

        {/* Stepper + Add Button */}
        <div className="flex items-center gap-2">
          {/* Stepper */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={!product.inStock}
              className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-bold text-stone-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={!product.inStock}
              className="p-1.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
              showAddedCheck
                ? 'bg-emerald-800 text-white'
                : product.inStock
                ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {showAddedCheck ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added</span>
              </>
            ) : product.inStock ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket</span>
              </>
            ) : (
              <span>Unavailable</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
