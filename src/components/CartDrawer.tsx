import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  MapPin, 
  User, 
  Clock, 
  AlertCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { CartItem, CustomerOrderDetails } from '../types';
import { SHOP_INFO } from '../data/products';
import { createWhatsAppOrderUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  customerInfo: CustomerOrderDetails;
  onUpdateCustomerInfo: (info: CustomerOrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customerInfo,
  onUpdateCustomerInfo,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof CustomerOrderDetails, value: string) => {
    onUpdateCustomerInfo({
      ...customerInfo,
      [field]: value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handlePlaceWhatsAppOrder = () => {
    if (cart.length === 0) {
      setErrorMessage('Your basket is empty. Please add items first.');
      return;
    }

    if (!customerInfo.customerName.trim()) {
      setErrorMessage('Please enter your Name before placing the order.');
      return;
    }

    if (!customerInfo.phoneNumber.trim() || customerInfo.phoneNumber.trim().length < 8) {
      setErrorMessage('Please enter a valid Phone / Mobile Number for delivery contact.');
      return;
    }

    if (!customerInfo.deliveryAddress.trim()) {
      setErrorMessage('Please enter your Delivery Address or Street name in Annadal / Tiruvannamalai.');
      return;
    }

    setIsOrdering(true);
    const orderUrl = createWhatsAppOrderUrl(cart, customerInfo, subtotal);
    
    // Open WhatsApp
    window.open(orderUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsOrdering(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 bg-emerald-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-700/80 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg leading-tight">
                  Your Grocery Basket
                </h2>
                <p className="text-xs text-emerald-200">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items • {SHOP_INFO.name}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-14 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-800 text-lg">
                    Your basket is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
                    Add fresh Ponni rice, dals, oils, spices, tea & snacks to begin ordering!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Product List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Selected Items
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-stone-400 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                    >
                      Empty Basket
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-stone-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate">
                          {item.tamilName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                            {item.unit}
                          </span>
                          <span className="text-xs font-extrabold text-stone-800">
                            ₹{item.price * item.quantity}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            (₹{item.price} each)
                          </span>
                        </div>
                      </div>

                      {/* Stepper & Delete */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center bg-white border border-stone-300 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div className="flex justify-between text-xs text-stone-600 font-medium">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600 font-medium items-center">
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      Village Doorstep Delivery
                    </span>
                    <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded">
                      FREE in Annadal
                    </span>
                  </div>
                  <div className="border-t border-emerald-200/80 pt-2 flex justify-between items-baseline">
                    <span className="font-extrabold text-stone-900 text-sm">
                      Estimated Order Value
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-emerald-900">
                        ₹{subtotal}
                      </span>
                      <p className="text-[10px] text-stone-500">
                        *Demo prices subject to shop confirmation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkout Details Form */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-700" />
                      Delivery Details for WhatsApp
                    </h3>
                    <span className="text-[10px] text-stone-500">
                      Required for WhatsApp bill
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="e.g. Ramesh / Priya"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Village / Street Delivery Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={customerInfo.deliveryAddress}
                      onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      placeholder="e.g. Annadal Village, Main Road / South Street, Tiruvannamalai"
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Landmark / Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Landmark / Special Requests (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerInfo.landmarkNotes}
                      onChange={(e) => handleInputChange('landmarkNotes', e.target.value)}
                      placeholder="e.g. Near Pillayar Temple / Call when starting"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Preferred Delivery Time */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" />
                      Preferred Delivery Time
                    </label>
                    <select
                      value={customerInfo.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white text-stone-800"
                    >
                      <option value="As soon as possible (Same Day)">As soon as possible (Same Day)</option>
                      <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Important Notice Pill */}
                <div className="bg-stone-100 rounded-xl p-3 text-[11px] text-stone-600 space-y-1">
                  <p className="font-bold text-stone-800">
                    💡 How ordering works at Shankar Groscery:
                  </p>
                  <p>
                    1. Click below to format your order and open WhatsApp directly with <span className="font-semibold text-emerald-800">+91 97516 05350</span>.
                  </p>
                  <p>
                    2. Shankar Groscery Shop will review current stocks and confirm your bill amount.
                  </p>
                  <p>
                    3. Pay directly by Cash or UPI on arrival.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/90 space-y-2.5">
              {/* WhatsApp Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceWhatsAppOrder}
                disabled={isOrdering}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-700/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Place Order on WhatsApp (₹{subtotal})</span>
              </button>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                <a
                  href={SHOP_INFO.telLink}
                  className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store: {SHOP_INFO.formattedPhone}</span>
                </a>
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Pay on delivery
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
