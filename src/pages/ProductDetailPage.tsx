import React, { useState, useEffect } from 'react';
import {
  Heart,
  Compass,
  Check,
  Droplets,
  Shield,
  Layers,
  Wrench,
  Calculator,
  Calendar,
  Share2,
  Clock,
  ArrowRight,
  Star,
  MessageSquare,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Product, ProductVariant, Review, Question } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { formatPKR, siteConfig, calculateCoverage, getWhatsAppLink } from '../config/siteConfig';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, slug?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate
}) => {
  const { addToCart, addSample, sampleItems } = useCart();
  const { wishlist, toggleWishlist } = useAuth();
  const { isInCompare, toggleCompare } = useCompare();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantityBoxes, setQuantityBoxes] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'calculator' | 'mockups' | 'reviews' | 'qa'>('calculator');

  // Integrated Product Coverage Calculator
  const [roomL, setRoomL] = useState<number>(16);
  const [roomW, setRoomW] = useState<number>(14);
  const [wastePct, setWastePct] = useState<number>(10);
  const [includeInstall, setIncludeInstall] = useState<boolean>(true);

  // Review & Question form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newLoc, setNewLoc] = useState('DHA Karachi');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [newQuestionText, setNewQuestionText] = useState('');
  const [questionAuthor, setQuestionAuthor] = useState('');
  const [questionSuccess, setQuestionSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
          setRelated(data.related || []);
          setReviews(data.reviews || []);
          setQuestions(data.questions || []);

          const defaultVar = data.product.variants && data.product.variants.length > 0
            ? data.product.variants[0]
            : {
                id: 'default',
                name: 'Standard',
                colorName: 'Standard',
                colorHex: '#c79c6e',
                thickness: data.product.thickness,
                pricePerSqFt: data.product.pricePerSqFt,
                pricePerBox: data.product.pricePerBox,
                coveragePerBox: data.product.coveragePerBox,
                sku: data.product.sku,
                stockBoxes: data.product.stockBoxes,
                image: data.product.thumbnail
              };

          setSelectedVariant(defaultVar);
          setActiveImage(defaultVar.image || data.product.thumbnail);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-2 border-[#7b5731] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#786c5e]">Loading Architectural Surface...</p>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#241c15]">Surface Not Found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] text-xs font-semibold rounded-sm"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Calculator computations
  const coveragePerBox = selectedVariant.coveragePerBox || product.coveragePerBox;
  const calcResult = calculateCoverage(roomL, roomW, coveragePerBox, wastePct);
  const calculatedMaterialPrice = calcResult.boxesNeeded * selectedVariant.pricePerBox;
  const calculatedInstallPrice = includeInstall ? (calcResult.totalCoveredSqFt * siteConfig.standardInstallationRateSqFt) : 0;
  const calculatedGrandTotal = calculatedMaterialPrice + calculatedInstallPrice;

  const handleApplyCalculatedBoxes = () => {
    setQuantityBoxes(calcResult.boxesNeeded);
    addToCart(product, selectedVariant, calcResult.boxesNeeded);
  };

  const handleAddSample = () => {
    addSample(product, selectedVariant);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productTitle: product.title,
          author: newAuthor,
          location: newLoc,
          rating: newRating,
          comment: newComment
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setReviewSuccess(true);
        setNewComment('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !questionAuthor) return;
    const newQ: Question = {
      id: `q-${Date.now()}`,
      productId: product.id,
      author: questionAuthor,
      question: newQuestionText,
      date: new Date().toISOString().split('T')[0]
    };
    setQuestions([newQ, ...questions]);
    setQuestionSuccess(true);
    setNewQuestionText('');
  };

  const isFavorited = wishlist.includes(product.id);
  const compared = isInCompare(product.id);
  const isSampleSelected = sampleItems.some(s => s.productId === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#786c5e]">
        <button onClick={() => onNavigate('home')} className="hover:text-[#241c15]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#241c15]">Collections</button>
        <span>/</span>
        <span className="text-[#241c15] font-semibold truncate">{product.title}</span>
      </div>

      {/* Primary Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery & Room Mockups */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#f4eee1] border border-[#e5dec9]">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#241c15] text-[#f4eee1]">
                {product.materialType}
              </span>
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-semibold bg-[#1e4620] text-emerald-100 flex items-center gap-1">
                <Droplets className="w-3 h-3" /> {product.waterResistance}
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-xs shadow-md transition-colors ${
                  isFavorited ? 'bg-red-50 text-red-600' : 'bg-white/80 text-stone-700 hover:bg-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => toggleCompare(product)}
                className={`p-2.5 rounded-full backdrop-blur-xs shadow-md transition-colors ${
                  compared ? 'bg-[#7b5731] text-white' : 'bg-white/80 text-stone-700 hover:bg-white'
                }`}
                title="Compare"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition-transform ${
                  activeImage === img ? 'border-[#7b5731] scale-105 shadow-sm' : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Karachi Showroom Acclimatization Notice */}
          <div className="p-4 bg-[#f2ece0] rounded-lg border border-[#ded5be] text-xs text-[#5c5043] flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#7b5731] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#241c15] block mb-0.5">Engineered for Karachi Coastal Climate:</strong>
              This product is dimensionally tested against coastal humidity and marine air in DHA & Clifton. Zero warping or swelling under proper installation conditions.
            </div>
          </div>
        </div>

        {/* Right: Technical Dual Pricing & Purchasing Box */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
              {product.category} • SKU: {selectedVariant.sku}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241c15] mt-1 leading-snug">
              {product.title}
            </h1>
            <p className="text-xs text-[#786c5e] mt-1">
              Finish: {product.finish} • Thickness: {product.thickness}
            </p>
          </div>

          {/* Dual Pricing Display */}
          <div className="p-5 bg-white rounded-lg border border-[#ded5be] space-y-3 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-[#241c15]">
                  {formatPKR(selectedVariant.pricePerSqFt)}
                </span>
                <span className="text-xs text-[#786c5e]"> / sq ft</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-lg font-bold text-[#7b5731]">
                  {formatPKR(selectedVariant.pricePerBox)}
                </span>
                <span className="text-xs text-[#786c5e] block">
                  per carton ({selectedVariant.coveragePerBox} sq ft)
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#786c5e]">
              <span>Planks per Carton: <strong>{product.planksPerBox || 10} pieces</strong></span>
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {selectedVariant.stockBoxes} Boxes In Stock
              </span>
            </div>
          </div>

          {/* Swatch & Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#241c15] uppercase tracking-wider text-[11px]">
                Selected Tone: <span className="font-serif normal-case text-sm text-[#7b5731]">{selectedVariant.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariant(v);
                      if (v.image) setActiveImage(v.image);
                    }}
                    className={`px-3 py-2 rounded-sm border text-xs font-medium flex items-center gap-2 transition-all ${
                      selectedVariant.id === v.id
                        ? 'border-[#7b5731] bg-[#faf6ee] text-[#241c15] shadow-xs'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300"
                      style={{ backgroundColor: v.colorHex }}
                    />
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Box Quantity Selector & Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-sm bg-white overflow-hidden">
                <button
                  onClick={() => setQuantityBoxes(Math.max(1, quantityBoxes - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={selectedVariant.stockBoxes}
                  value={quantityBoxes}
                  onChange={(e) => setQuantityBoxes(Math.max(1, Number(e.target.value)))}
                  className="w-14 text-center font-bold text-stone-900 text-xs focus:outline-none"
                />
                <button
                  onClick={() => setQuantityBoxes(Math.min(selectedVariant.stockBoxes, quantityBoxes + 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-[#786c5e]">
                <span>Total Coverage: </span>
                <strong className="text-[#241c15]">
                  {(quantityBoxes * selectedVariant.coveragePerBox).toFixed(1)} sq ft
                </strong>
                <span className="block text-[11px] font-semibold text-[#7b5731]">
                  Total: {formatPKR(quantityBoxes * selectedVariant.pricePerBox)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, selectedVariant, quantityBoxes)}
                className="py-3.5 px-4 bg-[#241c15] hover:bg-[#3d3126] text-white font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Add {quantityBoxes} Boxes to Cart</span>
              </button>

              <button
                onClick={handleAddSample}
                className={`py-3.5 px-4 rounded-sm font-serif text-xs font-bold uppercase tracking-wider transition-colors border flex items-center justify-center gap-2 ${
                  isSampleSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-[#faf7f0] border-[#cfc0a6] text-[#241c15] hover:bg-[#ede5d3]'
                }`}
              >
                <Layers className="w-4 h-4 text-[#7b5731]" />
                <span>{isSampleSelected ? 'Sample in Basket' : 'Order Free Sample'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Consultation */}
            <a
              href={getWhatsAppLink(`Hello First Floor Floorings, I am interested in ${product.title} (${selectedVariant.name}). Please advise on stock and Karachi installation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#116930] rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Inquire / Get Quote on WhatsApp</span>
            </a>
          </div>

          {/* Quick Consultation Badge */}
          <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-[#786c5e]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7b5731]" />
              <button onClick={() => onNavigate('site-visit')} className="underline hover:text-[#241c15]">
                Book Free Site Visit
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7b5731]" />
              <span>Same-Day Karachi Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Integrated Calculator, Specs, Mockups, Reviews, Q&A */}
      <div className="bg-white rounded-xl border border-[#ded5be] overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-[#ded5be] bg-[#fbf9f5] overflow-x-auto text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'calculator'
                ? 'border-[#7b5731] text-[#7b5731] bg-white'
                : 'border-transparent text-[#786c5e] hover:text-[#241c15]'
            }`}
          >
            <Calculator className="w-4 h-4" /> Room Coverage Calculator
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-[#7b5731] text-[#7b5731] bg-white'
                : 'border-transparent text-[#786c5e] hover:text-[#241c15]'
            }`}
          >
            <FileText className="w-4 h-4" /> Technical Specifications
          </button>

          <button
            onClick={() => setActiveTab('mockups')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'mockups'
                ? 'border-[#7b5731] text-[#7b5731] bg-white'
                : 'border-transparent text-[#786c5e] hover:text-[#241c15]'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Room Mockups
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#7b5731] text-[#7b5731] bg-white'
                : 'border-transparent text-[#786c5e] hover:text-[#241c15]'
            }`}
          >
            <Star className="w-4 h-4" /> Reviews ({reviews.length})
          </button>

          <button
            onClick={() => setActiveTab('qa')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'qa'
                ? 'border-[#7b5731] text-[#7b5731] bg-white'
                : 'border-transparent text-[#786c5e] hover:text-[#241c15]'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Q&A ({questions.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {/* 1. Integrated Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241c15]">
                  Calculate Exact Cartons for {product.title}
                </h3>
                <p className="text-xs text-[#786c5e] mt-1">
                  Box coverage: {coveragePerBox} sq ft per carton. Enter your room dimensions to see exact requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Room Length (Feet)
                  </label>
                  <input
                    type="number"
                    value={roomL}
                    onChange={(e) => setRoomL(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs font-bold p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Room Width (Feet)
                  </label>
                  <input
                    type="number"
                    value={roomW}
                    onChange={(e) => setRoomW(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs font-bold p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#241c15] mb-1">
                    Wastage Cut Allowance
                  </label>
                  <select
                    value={wastePct}
                    onChange={(e) => setWastePct(Number(e.target.value))}
                    className="w-full text-xs font-bold p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm"
                  >
                    <option value={10}>10% Standard Straight Planks</option>
                    <option value={15}>15% Herringbone / Diagonal Cuts</option>
                    <option value={8}>8% Simple Rectangular Room</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#241c15]">
                <input
                  type="checkbox"
                  checked={includeInstall}
                  onChange={(e) => setIncludeInstall(e.target.checked)}
                  className="w-4 h-4 rounded-xs text-[#7b5731]"
                />
                <span>Include Karachi Installation Labor @ Rs. {siteConfig.standardInstallationRateSqFt}/sq ft</span>
              </label>

              {/* Breakdown Grid */}
              <div className="p-4 bg-[#f8f5ee] rounded-lg border border-[#ded5be] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase">Net Area</span>
                  <span className="font-serif text-lg font-bold text-[#241c15] block">{calcResult.netAreaSqFt} sq ft</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase">Cartons Needed</span>
                  <span className="font-serif text-xl font-bold text-[#7b5731] block">
                    {calcResult.boxesNeeded} Boxes
                  </span>
                  <span className="text-[10px] text-stone-500">({calcResult.totalCoveredSqFt} sq ft total)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase">Material Cost</span>
                  <span className="font-serif text-lg font-bold text-[#241c15] block">
                    {formatPKR(calculatedMaterialPrice)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786c5e] uppercase">Grand Total</span>
                  <span className="font-serif text-xl font-bold text-[#241c15] block">
                    {formatPKR(calculatedGrandTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleApplyCalculatedBoxes}
                className="px-6 py-3 bg-[#241c15] hover:bg-[#3a2d21] text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Add {calcResult.boxesNeeded} Calculated Boxes to Cart →
              </button>
            </div>
          )}

          {/* 2. Technical Specifications Tab */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#241c15] uppercase tracking-wider">
                  Material & Dimensions
                </h4>
                <div className="space-y-2 divide-y divide-stone-100">
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Core Material:</span>
                    <span className="font-semibold text-stone-900">{product.specs.material}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Total Thickness:</span>
                    <span className="font-semibold text-stone-900">{product.specs.thickness}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Plank Dimensions:</span>
                    <span className="font-semibold text-stone-900">{product.specs.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Wear Layer:</span>
                    <span className="font-semibold text-stone-900">{product.specs.wearLayer || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Underlayment:</span>
                    <span className="font-semibold text-stone-900">
                      {product.specs.underlaymentAttached ? 'Pre-attached IXPE Acoustic Pad' : 'Requires separate underlay'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#241c15] uppercase tracking-wider">
                  Performance & Warranty
                </h4>
                <div className="space-y-2 divide-y divide-stone-100">
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Water Resistance:</span>
                    <span className="font-semibold text-emerald-800">{product.specs.waterResistance}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Installation Joint:</span>
                    <span className="font-semibold text-stone-900">{product.specs.installationMethod}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Sound Insulation:</span>
                    <span className="font-semibold text-stone-900">{product.specs.soundInsulation || '19dB - 22dB'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Residential Warranty:</span>
                    <span className="font-semibold text-stone-900">{product.specs.warrantyYears} Years</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Manufacturing Standard:</span>
                    <span className="font-semibold text-stone-900">{product.specs.origin || 'European Tech Spec'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Room Mockups Tab */}
          {activeTab === 'mockups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.roomMockups && product.roomMockups.length > 0 ? (
                product.roomMockups.map((m, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                    <img src={m.imageUrl} alt={m.roomType} className="w-full h-56 object-cover" />
                    <div className="p-3">
                      <span className="font-bold text-xs text-[#241c15]">{m.roomType}</span>
                      <p className="text-[11px] text-[#786c5e]">{m.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-xs text-stone-500">
                  Room mockups available for viewing at our DHA Phase 5 Showroom.
                </div>
              )}
            </div>
          )}

          {/* 4. Customer Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                        <span className="text-[10px] text-stone-500 font-sans">• {rev.location}</span>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-5 bg-[#faf7f0] rounded-lg border border-[#ded5be] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#241c15]">Write an Architectural Review</h4>
                {reviewSuccess && (
                  <p className="text-xs text-emerald-800 font-semibold">Thank you! Your review has been published.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Ar. Tariq Mansoor"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Area / City</label>
                    <input
                      type="text"
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      placeholder="e.g. DHA Phase 5, Karachi"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - High Quality</option>
                      <option value={3}>3 Stars - Satisfactory</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Your Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe how the flooring performed, appearance, and installation experience..."
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#241c15] text-[#f4eee1] rounded-xs text-xs font-bold"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* 5. Q&A Tab */}
          {activeTab === 'qa' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <p className="text-xs font-bold text-[#241c15] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#7b5731]" />
                      <span>{q.question}</span>
                    </p>
                    {q.answer ? (
                      <p className="text-xs text-stone-700 pl-5 border-l-2 border-[#7b5731] leading-relaxed">
                        <strong className="text-[#7b5731]">Atelier Answer:</strong> {q.answer}
                      </p>
                    ) : (
                      <p className="text-[11px] text-stone-400 pl-5 italic">Pending answer from showroom technician</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Question Form */}
              <form onSubmit={handleQuestionSubmit} className="p-4 bg-[#faf7f0] rounded-lg border border-[#ded5be] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#241c15]">Ask a Technical Question</h4>
                {questionSuccess && (
                  <p className="text-xs text-emerald-800 font-semibold">Your question has been submitted to our Karachi engineering team.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={questionAuthor}
                      onChange={(e) => setQuestionAuthor(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Question (e.g. Can this be installed over marble?)"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#241c15] text-[#f4eee1] rounded-xs text-xs font-bold"
                >
                  Submit Question
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
