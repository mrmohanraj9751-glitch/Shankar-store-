import { CartItem, CustomerOrderDetails } from '../types';
import { SHOP_INFO } from '../data/products';

export function createWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerOrderDetails,
  subtotal: number
): string {
  let text = `🛒 *NEW GROCERY ORDER - ${SHOP_INFO.name.toUpperCase()}*\n`;
  text += `📍 ${SHOP_INFO.address}\n`;
  text += `───────────────────────\n`;
  text += `👤 *CUSTOMER DETAILS:*\n`;
  text += `• Name: ${customer.customerName.trim()}\n`;
  text += `• Mobile: ${customer.phoneNumber.trim()}\n`;
  text += `• Delivery Address: ${customer.deliveryAddress.trim()}\n`;
  if (customer.landmarkNotes.trim()) {
    text += `• Landmark / Instructions: ${customer.landmarkNotes.trim()}\n`;
  }
  if (customer.preferredTime.trim()) {
    text += `• Preferred Delivery Time: ${customer.preferredTime.trim()}\n`;
  }
  text += `───────────────────────\n`;
  text += `📦 *ORDER ITEMS (${items.reduce((acc, i) => acc + i.quantity, 0)} items):*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    text += `${index + 1}. *${item.name}* [${item.unit}]\n`;
    text += `   ↳ ${item.quantity} × ₹${item.price} = *₹${itemTotal}*\n`;
  });

  text += `───────────────────────\n`;
  text += `💰 *Estimated Order Value: ₹${subtotal}*\n`;
  text += `*(Note: Indicative demo prices. Kindly confirm exact billing & stock)*\n\n`;
  text += `🙏 *Vanakkam Shankar Annachi! Please confirm my grocery order & delivery time.*`;

  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function createGeneralInquiryUrl(customMessage?: string): string {
  const defaultText = `Vanakkam Shankar Groscery Shop! I am contacting you from Annadal Village / Tiruvannamalai regarding groceries.`;
  const text = customMessage || defaultText;
  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
