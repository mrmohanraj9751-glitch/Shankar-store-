import React, { useMemo } from 'react';
import { useGroceryStore } from './hooks/useGroceryStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { OffersBanner } from './components/OffersBanner';
import { ProductCard } from './components/ProductCard';
import { ProductEditModal } from './components/ProductEditModal';
import { CartDrawer } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { 
  ShoppingBag, 
  MessageCircle, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SHOP_INFO } from './data/products';

export default function App() {
  const {
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
  } = useGroceryStore();

  // Scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product counts per category
  const productsCountByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.categoryId] = (map[p.categoryId] || 0) + 1;
    });
    return map;
  }, [products]);

  // Handler for multiple combo additions from OffersBanner
  const handleAddMultipleToCart = (
    itemsToAdd: { product: any; unit: string; price: number; qty: number }[]
  ) => {
    itemsToAdd.forEach((item) => {
      addToCart(item.product, { unit: item.unit, price: item.price }, item.qty);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        cartCount={totalItemsCount}
        cartSubtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onShopNowClick={() => scrollToSection('products')} />

        {/* Categories Filter Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            scrollToSection('products');
          }}
          productsCountByCategory={productsCountByCategory}
        />

        {/* Offers & Combo Bundles */}
        <OffersBanner
          products={products}
          onAddMultipleToCart={handleAddMultipleToCart}
        />

        {/* Products Catalog Section */}
        <section id="products" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          {/* Section Toolbar & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Grocery Store Catalog
                </h2>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {filteredProducts.length} Items
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Order by pack size • Instant WhatsApp delivery dispatch to Annadal
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Only in-stock toggle */}
              <button
                type="button"
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  onlyInStock
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>In-Stock Only</span>
              </button>

              {/* Reset Category / Search if active */}
              {(selectedCategory !== 'all' || searchQuery.trim() || onlyInStock) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setOnlyInStock(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl text-stone-600 bg-stone-200/80 hover:bg-stone-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Search & Category Notice */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="py-3 flex items-center justify-between text-xs text-stone-600 bg-emerald-50/60 px-4 rounded-xl my-4 border border-emerald-100">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  Filtering by: {selectedCategory !== 'all' ? `Category "${selectedCategory}"` : ''}{' '}
                  {searchQuery ? `Search query: "${searchQuery}"` : ''}
                </span>
              </div>
              <span className="font-semibold text-emerald-900">
                Found {filteredProducts.length} products
              </span>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 my-8 p-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-800">
                  No products found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                  We couldn't find items matching your search. Try another grocery keyword or reset your category filters.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setOnlyInStock(false);
                }}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onOpenEditModal={(prod) => setEditingProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Contact & Map Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Edit Product Modal (Transparent client-side test tool) */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={updateProductDetails}
          onReset={resetSingleProduct}
        />
      )}

      {/* Cart Drawer & Checkout Form */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        customerInfo={customerInfo}
        onUpdateCustomerInfo={setCustomerInfo}
      />

      {/* Sticky Mobile Bottom Checkout Bar */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="leading-tight pl-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} in basket
              </span>
              <p className="text-base font-extrabold text-stone-900">
                ₹{subtotal}
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-emerald-700/25 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Basket & Order</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
