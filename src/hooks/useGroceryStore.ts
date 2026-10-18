import { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, CategoryId, CustomerOrderDetails, ProductUnitOption } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEYS = {
  CART: 'shankar_grocery_cart_v1',
  OVERRIDDEN_PRODUCTS: 'shankar_grocery_custom_products_v1',
  CUSTOMER_INFO: 'shankar_grocery_customer_info_v1',
};

export function useGroceryStore() {
  // Load products with any local device overrides
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OVERRIDDEN_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with initial products so any new initial products still appear
          const map = new Map<string, Product>();
          parsed.forEach((p: Product) => map.set(p.id, p));
          return INITIAL_PRODUCTS.map((initProd) => {
            const override = map.get(initProd.id);
            return override ? { ...initProd, ...override } : initProd;
          });
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer checkout info
  const [customerInfo, setCustomerInfo] = useState<CustomerOrderDetails>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMER_INFO);
      return saved
        ? JSON.parse(saved)
        : {
            customerName: '',
            phoneNumber: '',
            deliveryAddress: '',
            landmarkNotes: '',
            preferredTime: 'As soon as possible',
          };
    } catch {
      return {
        customerName: '',
        phoneNumber: '',
        deliveryAddress: '',
        landmarkNotes: '',
        preferredTime: 'As soon as possible',
      };
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync custom products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OVERRIDDEN_PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync customer info
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER_INFO, JSON.stringify(customerInfo));
    } catch {
      // ignore
    }
  }, [customerInfo]);

  // Cart operations
  const addToCart = (product: Product, selectedUnit: ProductUnitOption, quantity = 1) => {
    const cartItemId = `${product.id}__${selectedUnit.unit}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          tamilName: product.tamilName,
          unit: selectedUnit.unit,
          price: selectedUnit.price,
          quantity,
          image: product.image,
          categoryName: product.categoryName,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Product edit operations (saved locally on device)
  const updateProductDetails = (
    productId: string,
    updates: {
      defaultPrice: number;
      defaultUnit?: string;
      unitOptions?: ProductUnitOption[];
      inStock: boolean;
      name?: string;
      tamilName?: string;
    }
  ) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        return {
          ...prod,
          ...updates,
          unitOptions: updates.unitOptions || prod.unitOptions,
        };
      })
    );

    // Also update any matching items currently in the cart
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        // Check if there's a matching unit
        const updatedUnit = updates.unitOptions?.find((u) => u.unit === item.unit);
        const newPrice = updatedUnit ? updatedUnit.price : updates.defaultPrice;
        return {
          ...item,
          price: newPrice,
          name: updates.name || item.name,
          tamilName: updates.tamilName || item.tamilName,
        };
      })
    );
  };

  const resetAllProductsToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.OVERRIDDEN_PRODUCTS);
  };

  const resetSingleProduct = (productId: string) => {
    const original = INITIAL_PRODUCTS.find((p) => p.id === productId);
    if (!original) return;
    setProducts((prev) => prev.map((p) => (p.id === productId ? original : p)));
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTamil = product.tamilName.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesTamil || matchesCategory || matchesDesc;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery, onlyInStock]);

  // Derived cart totals
  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return {
    products,
    filteredProducts,
    cart,
    totalItemsCount,
    subtotal,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    onlyInStock,
    setOnlyInStock,
    isCartOpen,
    setIsCartOpen,
    editingProduct,
    setEditingProduct,
    customerInfo,
    setCustomerInfo,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateProductDetails,
    resetAllProductsToDefaults,
    resetSingleProduct,
  };
}
