import React from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  Wheat, 
  Flame, 
  Sparkles, 
  PackageCheck, 
  Cookie, 
  Home, 
  Smile, 
  CupSoda, 
  Layers,
  CircleDot
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  productsCountByCategory: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  productsCountByCategory,
}) => {
  const getCategoryIcon = (iconName: string, id: string) => {
    switch (id) {
      case 'rice-grains':
        return <Wheat className="w-4 h-4" />;
      case 'dals-pulses':
        return <CircleDot className="w-4 h-4" />;
      case 'cooking-oils':
        return <Flame className="w-4 h-4" />;
      case 'masala-spices':
        return <Sparkles className="w-4 h-4" />;
      case 'essentials':
        return <PackageCheck className="w-4 h-4" />;
      case 'snacks':
        return <Cookie className="w-4 h-4" />;
      case 'household':
        return <Home className="w-4 h-4" />;
      case 'personal-care':
        return <Smile className="w-4 h-4" />;
      case 'beverages':
        return <CupSoda className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const totalAllCount = Object.values(productsCountByCategory).reduce((a, b) => a + b, 0);

  return (
    <div id="categories" className="py-6 border-b border-stone-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Browse Grocery Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              அரிசி, பருப்பு, எண்ணெய் & அத்தியாவசிய மளிகைப் பொருட்கள்
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
            9 Fresh Categories Available
          </span>
        </div>

        {/* Scrollable pill container with modern gradient fade hints */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-200 no-scrollbar">
            {/* All Category Pill */}
            <button
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20 ring-2 ring-emerald-700 ring-offset-1'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-stone-200/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Products</span>
              <span
                className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-800/90 text-emerald-100'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {totalAllCount}
              </span>
            </button>

            {/* Individual categories */}
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              const count = productsCountByCategory[category.id] || 0;

              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-800/20 ring-2 ring-emerald-700 ring-offset-1'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-stone-200/60'
                  }`}
                >
                  <span className={isSelected ? 'text-emerald-200' : 'text-emerald-600'}>
                    {getCategoryIcon(category.iconName, category.id)}
                  </span>
                  <span>{category.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-emerald-800/90 text-emerald-100'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
