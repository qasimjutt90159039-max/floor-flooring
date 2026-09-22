import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Shield,
  Droplets,
  Calculator,
  Calendar,
  Compass,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Star,
  Quote,
  Eye,
  ExternalLink
} from 'lucide-react';
import { Product, Category } from '../types';
import { initialProducts, initialCategories } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';
import { UniqueFloorStylesExplorer } from '../components/UniqueFloorStylesExplorer';
import { siteConfig, formatPKR, getWhatsAppLink, calculateCoverage } from '../config/siteConfig';

interface HomePageProps {
  products?: Product[];
  categories?: Category[];
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products = initialProducts,
  categories = initialCategories,
  onNavigate,
  onQuickView
}) => {
  // Mini Homepage Calculator State
  const [calcLength, setCalcLength] = useState<number>(16);
  const [calcWidth, setCalcWidth] = useState<number>(14);
  const [calcPattern, setCalcPattern] = useState<'straight' | 'herringbone'>('straight');
  const [calcIncludeInstall, setCalcIncludeInstall] = useState<boolean>(true);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const sampleProduct = products[0] || null;

  const quickCalcResult = calculateCoverage(
    calcLength,
    calcWidth,
    sampleProduct ? sampleProduct.coveragePerBox : 24.0,
    calcPattern === 'herringbone' ? 15 : 10
  );

  const estimatedMaterialCost = quickCalcResult.boxesNeeded * (sampleProduct ? sampleProduct.pricePerBox : 5880);
  const estimatedInstallCost = calcIncludeInstall ? quickCalcResult.totalCoveredSqFt * siteConfig.standardInstallationRateSqFt : 0;
  const estimatedGrandTotal = estimatedMaterialCost + estimatedInstallCost;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* 1. Architectural Bento Hero Section */}
      <section className="relative bg-[#201812] text-[#f4eee1] overflow-hidden">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c98d4d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Typography & Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#32251a] border border-[#523d2b] text-xs text-[#d8cdb8]">
                <span className="w-2 h-2 rounded-full bg-[#c98d4d] animate-pulse"></span>
                <span className="font-medium">20 C, 26th Street • DHA Phase 5, Karachi</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Architectural surfaces for spaces built to inspire.
              </h1>

              <p className="text-sm sm:text-base text-[#a49684] max-w-xl leading-relaxed">
                Discover 100% waterproof SPC vinyl, heavy AC5 German laminate, and authentic European engineered hardwoods. Curated for Karachi coastal homes, architectural residences, and distinguished commercial suites.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-3.5 bg-[#f4eee1] text-[#241c15] font-serif text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all flex items-center gap-2 shadow-md hover:translate-x-0.5"
                >
                  <span>Explore Surfaces</span>
                  <ArrowRight className="w-4 h-4 text-[#7b5731]" />
                </button>

                <button
                  onClick={() => onNavigate('site-visit')}
                  className="px-6 py-3.5 bg-[#32261c] hover:bg-[#433326] text-white border border-[#523e2d] font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#c98d4d]" />
                  <span>Book Karachi Site Visit</span>
                </button>

                <button
                  onClick={() => onNavigate('visualizer')}
                  className="px-4 py-3.5 text-xs text-[#d8cdb8] hover:text-white transition-colors flex items-center gap-1.5 underline underline-offset-4"
                >
                  <Eye className="w-4 h-4 text-[#c98d4d]" />
                  <span>Interactive Room Visualizer</span>
                </button>
              </div>

              {/* Key Architectural Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#3a2c20] text-xs">
                <div>
                  <span className="block font-serif text-lg font-bold text-white">100%</span>
                  <span className="text-[11px] text-[#a49684]">Waterproof SPC Core</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-bold text-white">25 Years</span>
                  <span className="text-[11px] text-[#a49684]">Durability Warranty</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-bold text-white">Turnkey</span>
                  <span className="text-[11px] text-[#a49684]">In-House Karachi Fitting</span>
                </div>
              </div>
            </div>

            {/* Right Bento Visual Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div
                  onClick={() => onNavigate('product-detail', 'smoked-walnut-herringbone-spc-luxury-vinyl')}
                  className="group relative rounded-lg overflow-hidden border border-[#4a3a2d] cursor-pointer aspect-4/5 bg-stone-900"
                >
                  <img
                    src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop"
                    alt="Smoked Walnut Herringbone"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c98d4d]">Herringbone Parquet</span>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-white">Smoked Walnut SPC</h3>
                    <p className="text-[11px] text-stone-300">Rs. 295 / sq ft</p>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('calculator')}
                  className="p-4 rounded-lg bg-[#2c2017] border border-[#4a3a2d] hover:border-[#c98d4d] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[#c98d4d] mb-1">
                    <Calculator className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Tool</span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#c98d4d] transition-colors">
                    Flooring Cost Calculator
                  </h4>
                  <p className="text-[11px] text-[#a49684] mt-0.5">Calculate boxes and installation for your exact room dimensions.</p>
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <div
                  onClick={() => onNavigate('product-detail', 'nordic-oak-5-5mm-waterproof-spc-vinyl')}
                  className="group relative rounded-lg overflow-hidden border border-[#4a3a2d] cursor-pointer aspect-4/5 bg-stone-900"
                >
                  <img
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop"
                    alt="Nordic Oak SPC"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">100% Waterproof</span>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-white">Nordic Blonde Oak</h3>
                    <p className="text-[11px] text-stone-300">Rs. 245 / sq ft</p>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('samples')}
                  className="p-4 rounded-lg bg-[#2c2017] border border-[#4a3a2d] hover:border-[#c98d4d] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-emerald-400 mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Complimentary</span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#c98d4d] transition-colors">
                    Order Swatch Box
                  </h4>
                  <p className="text-[11px] text-[#a49684] mt-0.5">Up to 3 free physical samples delivered anywhere in Karachi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Unique & Original Floor Styles Atelier Showcase */}
      <UniqueFloorStylesExplorer
        products={products}
        onNavigate={onNavigate}
      />

      {/* 3. Material Categories Palette & Swatch Showcase */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#ded5be]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
              Architectural Materials
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] mt-1">
              Curated Surface Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#7b5731] hover:text-[#241c15] flex items-center gap-1 transition-colors mt-2 md:mt-0"
          >
            <span>View All Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop')}
              className="group bg-white rounded-lg border border-[#e5dec9] hover:border-[#7b5731] p-4 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 rounded-sm overflow-hidden mb-3 bg-[#f2ece0]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-[#241c15] group-hover:text-[#7b5731] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#786c5e] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#f0ead8] flex items-center justify-between text-xs">
                <span className="text-[#a0471d] font-bold">From {formatPKR(cat.startingPriceSqFt)}/sq ft</span>
                <span className="text-[11px] text-[#8c7f6f] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Master Collections (Live Product Cards) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#ded5be]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
              In Stock in Karachi Showroom
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] mt-1">
              Signature Architectural Planks
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#7b5731] hover:text-[#241c15] flex items-center gap-1 transition-colors mt-2 md:mt-0"
          >
            <span>Explore Complete Shop ({products.length} Designs)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* 4. Quick Interactive Flooring Cost & Box Calculator Teaser */}
      <section className="bg-[#f2ece0] border-y border-[#ded5be] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> Instant Estimation Engine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] leading-tight">
                Calculate your room coverage, box requirement & turnkey budget.
              </h2>
              <p className="text-xs sm:text-sm text-[#665a4c] leading-relaxed">
                Flooring is sold in sealed factory cartons to safeguard precision click-locks during transit. Enter your room dimensions to see exact boxes needed, cutting wastage buffer, and optional Karachi installation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('calculator')}
                  className="px-5 py-2.5 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#382b20] transition-colors"
                >
                  Open Full Screen Calculator →
                </button>
              </div>
            </div>

            {/* Right Interactive Mini Tool Card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-[#ded5be] p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Room Length (Feet)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={calcLength}
                    onChange={(e) => setCalcLength(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#faf7f0] border border-stone-300 rounded-sm px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:border-[#7b5731]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Room Width (Feet)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#faf7f0] border border-stone-300 rounded-sm px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:border-[#7b5731]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Installation Pattern
                  </label>
                  <select
                    value={calcPattern}
                    onChange={(e) => setCalcPattern(e.target.value as any)}
                    className="w-full bg-[#faf7f0] border border-stone-300 rounded-sm px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#7b5731]"
                  >
                    <option value="straight">Straight Plank (+10% Waste Buffer)</option>
                    <option value="herringbone">Herringbone / Chevron (+15% Angle Cuts)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#241c15]">
                    <input
                      type="checkbox"
                      checked={calcIncludeInstall}
                      onChange={(e) => setCalcIncludeInstall(e.target.checked)}
                      className="w-4 h-4 text-[#7b5731] rounded-xs border-stone-300 focus:ring-[#7b5731]"
                    />
                    <span>Include Karachi Master Labor (Rs. 40/sq ft)</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Results Box */}
              <div className="p-4 bg-[#f8f5ee] rounded-lg border border-[#e5dec9] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase tracking-wider block">Net Area</span>
                  <span className="font-serif text-lg font-bold text-[#241c15]">
                    {quickCalcResult.netAreaSqFt} sq ft
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase tracking-wider block">Gross with Waste</span>
                  <span className="font-serif text-lg font-bold text-[#241c15]">
                    {quickCalcResult.grossAreaSqFt} sq ft
                  </span>
                </div>

                <div className="bg-[#241c15] text-white p-2 rounded-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#c98d4d] uppercase tracking-wider block font-bold">Boxes Needed</span>
                  <span className="font-serif text-xl font-bold text-white">
                    {quickCalcResult.boxesNeeded} Boxes
                  </span>
                  <span className="text-[9px] text-stone-300 block">({quickCalcResult.totalCoveredSqFt} sq ft)</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase tracking-wider block">Estimated Total</span>
                  <span className="font-serif text-lg font-bold text-[#7b5731]">
                    {formatPKR(estimatedGrandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The First Floor Flooring Process */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
            White Glove Atelier Service
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] mt-1">
            From Swatch to Finished Floor in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-[#786c5e] mt-2">
            We handle everything from precision moisture readings on your subfloor to seamless click-lock installation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg border border-[#e5dec9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#ded5be]">01</span>
            <h3 className="font-serif text-base font-bold text-[#241c15]">Select & Order Swatches</h3>
            <p className="text-xs text-[#786c5e] leading-relaxed">
              Order up to 3 complimentary samples online or visit our 26th Street Tauheed Commercial showroom in DHA Karachi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#e5dec9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#ded5be]">02</span>
            <h3 className="font-serif text-base font-bold text-[#241c15]">Free Laser Site Measurement</h3>
            <p className="text-xs text-[#786c5e] leading-relaxed">
              Our technician inspects subfloor levelness, moisture content, and door clearances across DHA, Clifton, and Karachi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#e5dec9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#ded5be]">03</span>
            <h3 className="font-serif text-base font-bold text-[#241c15]">Direct Box Delivery</h3>
            <p className="text-xs text-[#786c5e] leading-relaxed">
              Sealed factory cartons dispatched directly to your residence with underlayment and matching skirting boards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#e5dec9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#ded5be]">04</span>
            <h3 className="font-serif text-base font-bold text-[#241c15]">Master Turnkey Fitting</h3>
            <p className="text-xs text-[#786c5e] leading-relaxed">
              Clean, dust-free click-lock fitting completed in 1-3 days with a 25-year structural durability guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Real Client Projects Gallery in DHA Karachi */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#ded5be]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
              Project Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] mt-1">
              Completed Installations Across Karachi
            </h2>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-semibold text-[#7b5731] hover:text-[#241c15] flex items-center gap-1 transition-colors mt-2 md:mt-0"
          >
            <span>Visit Showroom to Inspect Mockups →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-lg overflow-hidden border border-[#e5dec9] bg-white">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop"
                alt="DHA Phase 6 Villa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
                DHA Phase 6 • 2,400 sq ft
              </span>
              <h3 className="font-serif text-sm font-bold text-[#241c15] mt-1">
                Contemporary Coastal Residence
              </h3>
              <p className="text-xs text-[#786c5e] mt-1">
                Specified with 5.5mm Nordic Oak SPC Vinyl Plank laid directly over aged ceramic tiles.
              </p>
            </div>
          </div>

          <div className="group rounded-lg overflow-hidden border border-[#e5dec9] bg-white">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop"
                alt="Clifton Penthouse"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
                Clifton Block 4 • 1,850 sq ft
              </span>
              <h3 className="font-serif text-sm font-bold text-[#241c15] mt-1">
                Marine Drive Luxury Penthouse
              </h3>
              <p className="text-xs text-[#786c5e] mt-1">
                Featuring Smoked Walnut Herringbone SPC with painted V-grooves in main reception salon.
              </p>
            </div>
          </div>

          <div className="group rounded-lg overflow-hidden border border-[#e5dec9] bg-white">
            <div className="aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                alt="DHA Phase 5 Architecture Office"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
                DHA Phase 5 • 3,200 sq ft
              </span>
              <h3 className="font-serif text-sm font-bold text-[#241c15] mt-1">
                Studio Linea Design Chambers
              </h3>
              <p className="text-xs text-[#786c5e] mt-1">
                Custom pairing of European White Oak 15mm engineered timber with acoustic underlayment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Showroom & Atelier Invitation Banner */}
      <section className="bg-[#241c15] text-[#f4eee1] py-14 border-t border-[#3c3024]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#c98d4d] font-bold">
                Physical Experience Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Visit our Showroom on 26th Street, DHA Phase 5
              </h2>
              <p className="text-xs sm:text-sm text-[#a49684] leading-relaxed">
                Step onto full-room displays, feel wire-brushed European timber grains under bare feet, and consult with our senior flooring architects over tea.
              </p>
              <div className="space-y-2 text-xs text-[#d8cdb8] pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c98d4d]" />
                  <span>20 C, 26th Street, DHA Phase 5, Tauheed Commercial Area, Karachi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c98d4d]" />
                  <span>Mon – Sat: 10:30 AM – 09:30 PM • Sunday by Appointment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c98d4d]" />
                  <span>Direct Hotline: +92 321 35304261</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <button
                onClick={() => onNavigate('site-visit')}
                className="px-6 py-3.5 bg-[#f4eee1] text-[#241c15] font-serif text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors"
              >
                Schedule Site Visit Instead
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25d366]/20 border border-emerald-500/40 text-emerald-300 font-serif text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#25d366]/30 transition-colors text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
