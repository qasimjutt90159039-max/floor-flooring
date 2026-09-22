import React, { useState } from 'react';
import {
  Calculator,
  Layers,
  Wrench,
  Check,
  Plus,
  Trash2,
  Share2,
  FileText,
  Printer,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPKR, siteConfig, getWhatsAppLink } from '../config/siteConfig';

interface RoomSpec {
  id: string;
  name: string;
  length: number;
  width: number;
  pattern: 'straight' | 'herringbone';
  doorsCount: number;
}

interface CalculatorPageProps {
  products: Product[];
  onNavigate: (page: string, slug?: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  products,
  onNavigate
}) => {
  const { addToCart } = useCart();
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || ''
  );

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [rooms, setRooms] = useState<RoomSpec[]>([
    { id: '1', name: 'Master Bedroom', length: 18, width: 14, pattern: 'straight', doorsCount: 2 },
    { id: '2', name: 'Living / Drawing Lounge', length: 22, width: 16, pattern: 'herringbone', doorsCount: 3 }
  ]);

  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [includeSkirting, setIncludeSkirting] = useState<boolean>(true);
  const [includeMoistureBarrier, setIncludeMoistureBarrier] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Conversion helper
  const toFeet = (val: number) => (unit === 'm' ? val * 3.28084 : val);

  // Calculations
  const boxCoverage = selectedProduct ? selectedProduct.coveragePerBox : 24.0;
  const pricePerBox = selectedProduct ? selectedProduct.pricePerBox : 5880;
  const pricePerSqFt = selectedProduct ? selectedProduct.pricePerSqFt : 245;

  let totalNetSqFt = 0;
  let totalGrossSqFt = 0;
  let totalPerimeterLinearFt = 0;

  rooms.forEach(r => {
    const lFt = toFeet(r.length);
    const wFt = toFeet(r.width);
    const netArea = lFt * wFt;
    const wasteFactor = r.pattern === 'herringbone' ? 1.15 : 1.10;
    const grossArea = netArea * wasteFactor;

    totalNetSqFt += netArea;
    totalGrossSqFt += grossArea;

    // Perimeter for skirting minus 3 feet per door
    const perimeter = 2 * (lFt + wFt) - (r.doorsCount * 3);
    totalPerimeterLinearFt += Math.max(0, perimeter);
  });

  const totalBoxesNeeded = Math.ceil(totalGrossSqFt / boxCoverage);
  const actualCoveredSqFt = totalBoxesNeeded * boxCoverage;

  const materialCost = totalBoxesNeeded * pricePerBox;
  const installCost = includeInstallation ? actualCoveredSqFt * siteConfig.standardInstallationRateSqFt : 0;
  const skirtingCost = includeSkirting ? totalPerimeterLinearFt * 65 : 0; // Rs. 65 per linear ft
  const barrierCost = includeMoistureBarrier ? actualCoveredSqFt * 15 : 0; // Rs. 15 per sq ft

  const grandTotal = materialCost + installCost + skirtingCost + barrierCost;

  const addRoom = () => {
    setRooms(prev => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Room ${prev.length + 1}`,
        length: unit === 'ft' ? 14 : 4.5,
        width: unit === 'ft' ? 12 : 3.8,
        pattern: 'straight',
        doorsCount: 1
      }
    ]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms(rooms.filter(r => r.id !== id));
  };

  const updateRoom = (id: string, updates: Partial<RoomSpec>) => {
    setRooms(rooms.map(r => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleAddProjectToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, undefined, totalBoxesNeeded);
    alert(`Successfully added ${totalBoxesNeeded} boxes of ${selectedProduct.title} for ${actualCoveredSqFt.toFixed(1)} sq ft to your Cart!`);
  };

  const handleShareQuoteWhatsApp = () => {
    let msg = `*First Floor Floorings - Project Cost Estimate*\n\n`;
    msg += `*Surface:* ${selectedProduct?.title}\n`;
    msg += `*Rooms Count:* ${rooms.length}\n`;
    msg += `*Net Area:* ${totalNetSqFt.toFixed(1)} sq ft\n`;
    msg += `*Gross Area (w/ cut allowance):* ${totalGrossSqFt.toFixed(1)} sq ft\n`;
    msg += `*Cartons Required:* ${totalBoxesNeeded} Boxes (${actualCoveredSqFt.toFixed(1)} sq ft)\n`;
    msg += `*Material Total:* ${formatPKR(materialCost)}\n`;
    if (includeInstallation) msg += `*Karachi Installation:* ${formatPKR(installCost)}\n`;
    if (includeSkirting) msg += `*Skirting & Trims:* ${formatPKR(skirtingCost)}\n`;
    msg += `\n*Estimated Grand Total: ${formatPKR(grandTotal)}*\n\n`;
    msg += `Please book a technician to verify measurements at my residence in Karachi.`;

    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold flex items-center justify-center gap-1.5">
          <Calculator className="w-4 h-4" /> Multi-Room Estimation Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Architectural Flooring & Carton Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e]">
          Accurately calculate factory box quantities, cut waste allowance, skirting perimeters, and turnkey Karachi installation labor.
        </p>
      </div>

      {/* Main Grid: Controls vs Live Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Room Builders & Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Surface Selection Card */}
          <div className="p-5 bg-white rounded-lg border border-[#e5dec9] space-y-3">
            <label className="block text-xs font-bold text-[#241c15] uppercase tracking-wider text-[11px]">
              Select Flooring Surface
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#7b5731]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} — {formatPKR(p.pricePerSqFt)}/sq ft ({p.coveragePerBox} sq ft/box)
                </option>
              ))}
            </select>

            {selectedProduct && (
              <div className="flex items-center gap-3 pt-2 text-xs text-[#786c5e]">
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="w-12 h-12 object-cover rounded-sm border border-stone-200"
                />
                <div>
                  <span className="font-bold text-[#241c15] block">{selectedProduct.title}</span>
                  <span>{formatPKR(selectedProduct.pricePerBox)} / box • {selectedProduct.waterResistance}</span>
                </div>
              </div>
            )}
          </div>

          {/* Unit Toggle and Room Adder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#241c15]">Unit:</span>
              <div className="bg-[#f0ead8] p-1 rounded-sm border border-[#ded5be] flex">
                <button
                  onClick={() => setUnit('ft')}
                  className={`px-3 py-1 text-xs font-semibold rounded-xs ${
                    unit === 'ft' ? 'bg-[#241c15] text-white' : 'text-[#594d40]'
                  }`}
                >
                  Feet
                </button>
                <button
                  onClick={() => setUnit('m')}
                  className={`px-3 py-1 text-xs font-semibold rounded-xs ${
                    unit === 'm' ? 'bg-[#241c15] text-white' : 'text-[#594d40]'
                  }`}
                >
                  Meters
                </button>
              </div>
            </div>

            <button
              onClick={addRoom}
              className="px-3.5 py-1.5 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold flex items-center gap-1.5 hover:bg-[#392c20]"
            >
              <Plus className="w-3.5 h-3.5 text-[#c98d4d]" />
              <span>Add Another Room</span>
            </button>
          </div>

          {/* Rooms List */}
          <div className="space-y-4">
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="p-5 bg-white rounded-lg border border-[#e5dec9] space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#f2ece0] text-[#7b5731] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                      className="font-serif text-sm font-bold text-[#241c15] bg-transparent border-b border-transparent hover:border-stone-300 focus:border-[#7b5731] focus:outline-none"
                    />
                  </div>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={room.length}
                      onChange={(e) => updateRoom(room.id, { length: Math.max(1, Number(e.target.value)) })}
                      className="w-full p-2 bg-[#faf7f0] border border-stone-300 rounded-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={room.width}
                      onChange={(e) => updateRoom(room.id, { width: Math.max(1, Number(e.target.value)) })}
                      className="w-full p-2 bg-[#faf7f0] border border-stone-300 rounded-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Layout Pattern
                    </label>
                    <select
                      value={room.pattern}
                      onChange={(e) => updateRoom(room.id, { pattern: e.target.value as any })}
                      className="w-full p-2 bg-[#faf7f0] border border-stone-300 rounded-sm font-bold"
                    >
                      <option value="straight">Straight (+10% Waste)</option>
                      <option value="herringbone">Herringbone (+15% Waste)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Doorways
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={room.doorsCount}
                      onChange={(e) => updateRoom(room.id, { doorsCount: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 bg-[#faf7f0] border border-stone-300 rounded-sm font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 text-[11px] text-[#786c5e] border-t border-stone-100">
                  <span>
                    Net Area: <strong>{(toFeet(room.length) * toFeet(room.width)).toFixed(1)} sq ft</strong>
                  </span>
                  <span>
                    With {room.pattern === 'herringbone' ? '15%' : '10%'} Cut Buffer:{' '}
                    <strong>
                      {((toFeet(room.length) * toFeet(room.width)) * (room.pattern === 'herringbone' ? 1.15 : 1.10)).toFixed(1)} sq ft
                    </strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add-on Services Checkboxes */}
          <div className="p-5 bg-[#f4eee1] rounded-lg border border-[#ded5be] space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#241c15] uppercase tracking-wider">
              Installation & Ancillary Services (Karachi)
            </h4>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#7b5731] rounded-xs"
              />
              <div className="text-xs">
                <span className="font-bold text-[#241c15]">
                  Turnkey Karachi Master Installation (Rs. {siteConfig.standardInstallationRateSqFt}/sq ft)
                </span>
                <p className="text-[11px] text-[#786c5e]">
                  Includes subfloor moisture check, expansion joints, laser alignment, and click-lock assembly.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSkirting}
                onChange={(e) => setIncludeSkirting(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#7b5731] rounded-xs"
              />
              <div className="text-xs">
                <span className="font-bold text-[#241c15]">
                  Matching Color-Matched Skirting Boards (Rs. 65 / linear ft)
                </span>
                <p className="text-[11px] text-[#786c5e]">
                  Estimated perimeter for your rooms: {totalPerimeterLinearFt.toFixed(0)} linear feet.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMoistureBarrier}
                onChange={(e) => setIncludeMoistureBarrier(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#7b5731] rounded-xs"
              />
              <div className="text-xs">
                <span className="font-bold text-[#241c15]">
                  Heavy-Duty Vapour Moisture Barrier (Rs. 15 / sq ft)
                </span>
                <p className="text-[11px] text-[#786c5e]">
                  Recommended for Karachi ground floors and concrete slabs to block marine vapor.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Live Project Estimate Summary */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-6 shadow-md">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7b5731] font-bold">
                Project Summary
              </span>
              <h3 className="font-serif text-xl font-bold text-[#241c15] mt-0.5">
                Carton & Cost Estimation
              </h3>
            </div>

            {/* Coverage Math Specs */}
            <div className="p-4 bg-[#f8f5ee] rounded-lg space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Total Net Floor Area:</span>
                <span className="font-semibold text-stone-900">{totalNetSqFt.toFixed(1)} sq ft</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Gross Area with Waste Buffer:</span>
                <span className="font-semibold text-stone-900">{totalGrossSqFt.toFixed(1)} sq ft</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Box Packaging Yield:</span>
                <span className="font-semibold text-stone-900">{boxCoverage} sq ft / carton</span>
              </div>
              <div className="pt-2 border-t border-[#ded5be] flex justify-between items-center text-sm">
                <span className="font-serif font-bold text-[#241c15]">Cartons Required:</span>
                <span className="font-serif text-lg font-bold text-[#7b5731]">
                  {totalBoxesNeeded} Boxes ({actualCoveredSqFt.toFixed(1)} sq ft)
                </span>
              </div>
            </div>

            {/* Financial Line Items */}
            <div className="space-y-2 text-xs divide-y divide-stone-100">
              <div className="flex justify-between pt-1 text-stone-600">
                <span>Material Cost ({totalBoxesNeeded} boxes @ {formatPKR(pricePerBox)}):</span>
                <span className="font-bold text-stone-900">{formatPKR(materialCost)}</span>
              </div>

              {includeInstallation && (
                <div className="flex justify-between pt-2 text-stone-600">
                  <span>Karachi Turnkey Installation:</span>
                  <span className="font-bold text-stone-900">{formatPKR(installCost)}</span>
                </div>
              )}

              {includeSkirting && (
                <div className="flex justify-between pt-2 text-stone-600">
                  <span>Skirting Trims ({totalPerimeterLinearFt.toFixed(0)} ft):</span>
                  <span className="font-bold text-stone-900">{formatPKR(skirtingCost)}</span>
                </div>
              )}

              {includeMoistureBarrier && (
                <div className="flex justify-between pt-2 text-stone-600">
                  <span>Vapour Moisture Underlay:</span>
                  <span className="font-bold text-stone-900">{formatPKR(barrierCost)}</span>
                </div>
              )}

              <div className="flex justify-between pt-3 text-base items-baseline">
                <span className="font-serif font-bold text-[#241c15]">Estimated Grand Total:</span>
                <span className="font-serif text-2xl font-bold text-[#7b5731]">
                  {formatPKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddProjectToCart}
                className="w-full py-3.5 bg-[#241c15] hover:bg-[#392c20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Add {totalBoxesNeeded} Boxes to Cart</span>
                <ArrowRight className="w-4 h-4 text-[#c98d4d]" />
              </button>

              <button
                onClick={handleShareQuoteWhatsApp}
                className="w-full py-2.5 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#116930] rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Estimate via WhatsApp</span>
              </button>

              <button
                onClick={() => onNavigate('site-visit')}
                className="w-full py-2.5 bg-[#faf7f0] hover:bg-[#ede5d3] text-[#241c15] rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-[#ded5be]"
              >
                <Calendar className="w-4 h-4 text-[#7b5731]" />
                <span>Book Technician for Laser Measurement</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
