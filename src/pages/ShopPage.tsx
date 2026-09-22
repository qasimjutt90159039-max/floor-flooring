import React, { useState, useMemo } from 'react';
import {
  Filter,
  X,
  SlidersHorizontal,
  Search,
  Droplets,
  Layers,
  ArrowUpDown,
  Check,
  RotateCcw
} from 'lucide-react';
import { Product, Category, MaterialType, RoomSuitability, WaterResistance } from '../types';
import { initialProducts, initialCategories } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';
import { formatPKR } from '../config/siteConfig';

interface ShopPageProps {
  products?: Product[];
  categories?: Category[];
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products = initialProducts,
  categories = initialCategories,
  onNavigate,
  onQuickView,
  initialCategory
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialCategory || 'all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedWaterproof, setSelectedWaterproof] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMode, setPriceMode] = useState<'sqft' | 'box'>('sqft');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const materials: MaterialType[] = [
    'SPC Vinyl',
    'Laminate',
    'Engineered Wood',
    'Solid Hardwood',
    'Carpet Tiles',
    'Artificial Grass',
    'Outdoor Decking',
    'Wall Panels',
    'Skirting & Accessories'
  ];

  const rooms: RoomSuitability[] = [
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Bathroom',
    'Office & Commercial',
    'Outdoor / Terrace'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedMaterial !== 'all') {
        const matchesCategory = p.categorySlug === selectedMaterial || p.materialType.toLowerCase() === selectedMaterial.toLowerCase();
        if (!matchesCategory) return false;
      }
      if (selectedRoom !== 'all') {
        if (!p.roomSuitability.includes(selectedRoom as RoomSuitability)) return false;
      }
      if (selectedWaterproof !== 'all') {
        if (p.waterResistance !== selectedWaterproof) return false;
      }
      if (selectedFinish !== 'all') {
        if (p.finish.toLowerCase() !== selectedFinish.toLowerCase()) return false;
      }
      if (p.pricePerSqFt < minPrice || p.pricePerSqFt > maxPrice) {
        return false;
      }
      if (inStockOnly && (!p.inStock || p.stockBoxes <= 0)) {
        return false;
      }
      if (onSaleOnly && !p.onSale) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.materialType.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerSqFt - b.pricePerSqFt;
      if (sortBy === 'price_desc') return b.pricePerSqFt - a.pricePerSqFt;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    selectedMaterial,
    selectedRoom,
    selectedWaterproof,
    selectedFinish,
    minPrice,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    searchQuery,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedMaterial('all');
    setSelectedRoom('all');
    setSelectedWaterproof('all');
    setSelectedFinish('all');
    setMinPrice(0);
    setMaxPrice(1000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedMaterial !== 'all' ||
    selectedRoom !== 'all' ||
    selectedWaterproof !== 'all' ||
    selectedFinish !== 'all' ||
    minPrice > 0 ||
    maxPrice < 1000 ||
    inStockOnly ||
    onSaleOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Header & Breadcrumb */}
      <div className="mb-6 pb-4 border-b border-[#ded5be]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
              Architectural Showroom Catalog
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#241c15] mt-0.5">
              Flooring & Surface Collections
            </h1>
            <p className="text-xs text-[#786c5e] mt-1">
              Showing {filteredProducts.length} of {products.length} architectural surfaces in Karachi stock
            </p>
          </div>

          {/* Price Mode Toggle (Sq Ft vs Box) */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#786c5e] font-semibold hidden md:inline">Price Unit:</span>
            <div className="bg-[#f0ead8] p-1 rounded-sm border border-[#ded5be] flex items-center">
              <button
                onClick={() => setPriceMode('sqft')}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                  priceMode === 'sqft'
                    ? 'bg-[#241c15] text-white shadow-xs'
                    : 'text-[#594d40] hover:text-[#241c15]'
                }`}
              >
                PKR / Sq Ft
              </button>
              <button
                onClick={() => setPriceMode('box')}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                  priceMode === 'box'
                    ? 'bg-[#241c15] text-white shadow-xs'
                    : 'text-[#594d40] hover:text-[#241c15]'
                }`}
              >
                PKR / Box
              </button>
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 rounded-sm bg-[#241c15] text-white flex items-center gap-1.5 text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5 text-[#c98d4d]" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block bg-white rounded-lg border border-[#e5dec9] p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#7b5731]" />
              <h3 className="font-serif text-sm font-bold text-[#241c15]">Filter Surfaces</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#7b5731] hover:text-[#241c15] font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Search inside catalog */}
          <div>
            <label className="block text-xs font-bold text-[#241c15] mb-1.5 uppercase tracking-wider text-[11px]">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Oak, walnut, grey, herringbone..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-[#faf7f0] border border-stone-300 rounded-sm focus:outline-none focus:border-[#7b5731]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Material Type Filter */}
          <div>
            <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase tracking-wider text-[11px]">
              Material Type
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedMaterial('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex items-center justify-between ${
                  selectedMaterial === 'all'
                    ? 'bg-[#241c15] text-white font-semibold'
                    : 'text-[#594d40] hover:bg-[#f2ece0]'
                }`}
              >
                <span>All Materials</span>
                <span className="text-[10px] opacity-70">{products.length}</span>
              </button>

              {materials.map((m) => {
                const count = products.filter(p => p.materialType === m).length;
                return (
                  <button
                    key={m}
                    onClick={() => setSelectedMaterial(m)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex items-center justify-between ${
                      selectedMaterial === m
                        ? 'bg-[#241c15] text-white font-semibold'
                        : 'text-[#594d40] hover:bg-[#f2ece0]'
                    }`}
                  >
                    <span>{m}</span>
                    <span className="text-[10px] opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Room Suitability */}
          <div>
            <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase tracking-wider text-[11px]">
              Room Suitability
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedRoom('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex items-center justify-between ${
                  selectedRoom === 'all'
                    ? 'bg-[#7b5731] text-white font-semibold'
                    : 'text-[#594d40] hover:bg-[#f2ece0]'
                }`}
              >
                <span>All Rooms</span>
              </button>
              {rooms.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRoom(r)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors flex items-center justify-between ${
                    selectedRoom === r
                      ? 'bg-[#7b5731] text-white font-semibold'
                      : 'text-[#594d40] hover:bg-[#f2ece0]'
                  }`}
                >
                  <span>{r}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Water Resistance Filter */}
          <div>
            <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-emerald-600" /> Water Resistance
            </label>
            <div className="space-y-1 text-xs">
              {['all', '100% Waterproof', 'Water Resistant 72hr', 'Moisture Resistant', 'Weatherproof Outdoor'].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWaterproof(w)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-sm transition-colors text-xs ${
                    selectedWaterproof === w
                      ? 'bg-emerald-900 text-white font-semibold'
                      : 'text-[#594d40] hover:bg-[#f2ece0]'
                  }`}
                >
                  {w === 'all' ? 'Any Water Resistance' : w}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase tracking-wider text-[11px]">
              Max Price / Sq Ft ({formatPKR(maxPrice)})
            </label>
            <input
              type="range"
              min="80"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#7b5731] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#786c5e] mt-1">
              <span>Rs. 80</span>
              <span>Rs. 1,000+</span>
            </div>
          </div>

          {/* Stock & Sale Checkboxes */}
          <div className="pt-2 border-t border-stone-200 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded-xs text-[#7b5731] border-stone-300 focus:ring-[#7b5731]"
              />
              <span className="text-[#241c15] font-medium">In Karachi Stock Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="w-4 h-4 rounded-xs text-[#7b5731] border-stone-300 focus:ring-[#7b5731]"
              />
              <span className="text-[#241c15] font-medium">Promotional Sale Only</span>
            </label>
          </div>
        </aside>

        {/* Products Grid & Sorting Header */}
        <main className="lg:col-span-3 space-y-4">
          {/* Sorting and View Toolbar */}
          <div className="p-3 bg-white rounded-lg border border-[#e5dec9] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#786c5e]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#faf7f0] border border-stone-300 rounded-sm px-2.5 py-1 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#7b5731]"
              >
                <option value="featured">Featured Atelier Picks</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#786c5e]">Active Filters:</span>
                {selectedMaterial !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#f2ece0] text-[#7b5731] text-[10px] font-bold flex items-center gap-1">
                    {selectedMaterial}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedMaterial('all')} />
                  </span>
                )}
                {selectedRoom !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#f2ece0] text-[#7b5731] text-[10px] font-bold flex items-center gap-1">
                    {selectedRoom}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedRoom('all')} />
                  </span>
                )}
                {selectedWaterproof !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    {selectedWaterproof}
                    <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedWaterproof('all')} />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#e5dec9] space-y-3">
              <Layers className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#241c15]">No matching surfaces found</h3>
              <p className="text-xs text-[#786c5e] max-w-sm mx-auto">
                Try loosening your filters or resetting the search query to view our complete collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-semibold hover:bg-[#34271c] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  priceDisplayMode={priceMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-5 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-serif text-base font-bold text-[#241c15]">Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-stone-500" />
                  </button>
                </div>

                {/* Mobile Materials */}
                <div>
                  <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase">
                    Material Type
                  </label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full text-xs p-2 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  >
                    <option value="all">All Materials</option>
                    {materials.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Rooms */}
                <div>
                  <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase">
                    Room Suitability
                  </label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full text-xs p-2 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  >
                    <option value="all">All Rooms</option>
                    {rooms.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Waterproof */}
                <div>
                  <label className="block text-xs font-bold text-[#241c15] mb-2 uppercase">
                    Water Resistance
                  </label>
                  <select
                    value={selectedWaterproof}
                    onChange={(e) => setSelectedWaterproof(e.target.value)}
                    className="w-full text-xs p-2 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  >
                    <option value="all">Any Water Resistance</option>
                    <option value="100% Waterproof">100% Waterproof</option>
                    <option value="Water Resistant 72hr">Water Resistant 72hr</option>
                    <option value="Moisture Resistant">Moisture Resistant</option>
                    <option value="Weatherproof Outdoor">Weatherproof Outdoor</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#241c15] text-white text-xs font-bold uppercase rounded-sm"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
