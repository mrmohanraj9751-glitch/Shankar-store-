export type CategoryId =
  | 'all'
  | 'rice-grains'
  | 'dals-pulses'
  | 'cooking-oils'
  | 'masala-spices'
  | 'essentials'
  | 'snacks'
  | 'household'
  | 'personal-care'
  | 'beverages';

export interface Category {
  id: CategoryId;
  name: string;
  tamilName: string;
  iconName: string;
  description: string;
}

export interface ProductUnitOption {
  unit: string;
  price: number; // in INR (₹)
}

export interface Product {
  id: string;
  name: string;
  tamilName: string;
  categoryId: CategoryId;
  categoryName: string;
  defaultPrice: number; // Demo price in ₹
  defaultUnit: string;  // e.g. "1 kg", "1 Litre", "Pack"
  unitOptions: ProductUnitOption[];
  image: string;
  description: string;
  isPopular?: boolean;
  isOffer?: boolean;
  offerText?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique key: productId-unit
  productId: string;
  name: string;
  tamilName: string;
  unit: string;
  price: number;
  quantity: number;
  image: string;
  categoryName: string;
}

export interface CustomerOrderDetails {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  landmarkNotes: string;
  preferredTime: string;
}
