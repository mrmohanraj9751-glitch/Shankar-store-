import React, { useState } from 'react';
import { Product, ProductUnitOption } from '../types';
import { X, Check, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (
    productId: string,
    updates: {
      defaultPrice: number;
      defaultUnit?: string;
      unitOptions?: ProductUnitOption[];
      inStock: boolean;
      name?: string;
      tamilName?: string;
    }
  ) => void;
  onReset: (productId: string) => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  onClose,
  onSave,
  onReset,
}) => {
  const [name, setName] = useState(product.name);
  const [tamilName, setTamilName] = useState(product.tamilName);
  const [inStock, setInStock] = useState(product.inStock);
  const [unitOptions, setUnitOptions] = useState<ProductUnitOption[]>(
    product.unitOptions.map((u) => ({ ...u }))
  );

  const handleUnitOptionPriceChange = (index: number, newPrice: number) => {
    setUnitOptions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], price: Math.max(0, newPrice) };
      return next;
    });
  };

  const handleUnitOptionLabelChange = (index: number, newUnit: string) => {
    setUnitOptions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], unit: newUnit };
      return next;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const primaryOption = unitOptions[0] || { unit: '1 Unit', price: product.defaultPrice };
    onSave(product.id, {
      name,
      tamilName,
      inStock,
      unitOptions,
      defaultPrice: primaryOption.price,
      defaultUnit: primaryOption.unit,
    });
    onClose();
  };

  const handleReset = () => {
    if (window.confirm(`Reset "${product.name}" back to default shop price & settings?`)) {
      onReset(product.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              Edit Product Details
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
            aria-label="Close edit window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Transparent Storage Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Transparent Client Update Notice:</p>
              <p className="text-amber-800 leading-relaxed">
                Changes are saved directly to this device's browser memory so you can customize sample rates. Official final bill amount and daily item availability are always confirmed via WhatsApp by Shankar Groscery Shop.
              </p>
            </div>
          </div>

          {/* Product Name (English & Tamil) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Tamil Name (தமிழ் பெயர்)
              </label>
              <input
                type="text"
                value={tamilName}
                onChange={(e) => setTamilName(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div>
              <p className="text-sm font-bold text-stone-900">Stock Availability</p>
              <p className="text-xs text-stone-500">
                {inStock ? 'Item is currently in stock at the shop' : 'Marked as out of stock'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Unit Options & Demo Prices Table */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              Unit Options & Demo Prices (in ₹ Indian Rupees)
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {unitOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200"
                >
                  <div className="flex-1">
                    <span className="text-[10px] text-stone-500 font-semibold block">
                      Unit / Pack Size
                    </span>
                    <input
                      type="text"
                      value={opt.unit}
                      onChange={(e) => handleUnitOptionLabelChange(idx, e.target.value)}
                      className="w-full text-xs font-semibold px-2 py-1 rounded-md border border-stone-300 bg-white"
                      placeholder="e.g. 1 kg, 5 kg"
                      required
                    />
                  </div>
                  <div className="w-28">
                    <span className="text-[10px] text-stone-500 font-semibold block">
                      Demo Price (₹)
                    </span>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={opt.price}
                        onChange={(e) =>
                          handleUnitOptionPriceChange(idx, Number(e.target.value))
                        }
                        className="w-full text-xs font-bold pl-6 pr-2 py-1 rounded-md border border-stone-300 bg-white text-stone-900"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 px-4 py-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save to Device</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
