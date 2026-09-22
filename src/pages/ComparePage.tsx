import React from 'react';
import {
  Compass,
  Trash2,
  Check,
  X,
  Droplets,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/siteConfig';

interface ComparePageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigate }) => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart, addSample } = useCart();

  if (compareList.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <Compass className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#241c15]">No Surfaces in Comparison</h2>
        <p className="text-xs text-[#786c5e]">
          Click the compass icon on any flooring collection to compare specs, thicknesses, and water ratings side by side.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] text-xs font-bold rounded-sm uppercase tracking-wider"
        >
          Browse Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#ded5be]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
            Architectural Specification Matrix
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241c15] mt-0.5">
            Compare Flooring Materials ({compareList.length}/4)
          </h1>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full text-xs text-left bg-white rounded-xl border border-[#ded5be] overflow-hidden shadow-xs">
          <thead>
            <tr className="border-b border-[#ded5be] bg-[#faf7f0]">
              <th className="p-4 w-44 font-serif text-xs font-bold uppercase tracking-wider text-[#7b5731]">
                Attribute
              </th>
              {compareList.map((p) => (
                <th key={p.id} className="p-4 min-w-[220px] align-top">
                  <div className="space-y-2">
                    <div className="relative aspect-4/3 rounded-sm overflow-hidden border border-stone-200">
                      <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-white text-stone-700 rounded-full"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="font-serif text-xs font-bold text-[#241c15] line-clamp-1">{p.title}</h3>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => addSample(p)}
                        className="flex-1 py-1 px-2 bg-[#f4eee1] hover:bg-[#ede5d3] text-[#241c15] text-[10px] font-bold rounded-xs border border-[#cfc0a6]"
                      >
                        Free Sample
                      </button>
                      <button
                        onClick={() => addToCart(p, undefined, 1)}
                        className="flex-1 py-1 px-2 bg-[#241c15] hover:bg-[#382b20] text-white text-[10px] font-bold rounded-xs"
                      >
                        Add Box
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            <tr>
              <td className="p-4 font-bold text-stone-700">Material Core</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-semibold text-[#241c15]">{p.materialType}</td>
              ))}
            </tr>

            <tr className="bg-[#fbf9f5]">
              <td className="p-4 font-bold text-stone-700">Price / Sq Ft</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-serif text-sm font-bold text-[#7b5731]">
                  {formatPKR(p.pricePerSqFt)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-stone-700">Box Coverage & Price</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 text-stone-800">
                  <strong>{formatPKR(p.pricePerBox)}</strong> / box ({p.coveragePerBox} sq ft)
                </td>
              ))}
            </tr>

            <tr className="bg-[#fbf9f5]">
              <td className="p-4 font-bold text-stone-700">Total Thickness</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-semibold text-stone-900">{p.thickness}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-stone-700">Water Resistance</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4">
                  <span className={`px-2 py-0.5 rounded-xs font-semibold ${
                    p.waterResistance === '100% Waterproof'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-800'
                  }`}>
                    {p.waterResistance}
                  </span>
                </td>
              ))}
            </tr>

            <tr className="bg-[#fbf9f5]">
              <td className="p-4 font-bold text-stone-700">Installation Joint</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 text-stone-800">{p.specs.installationMethod}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-stone-700">Warranty</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 font-semibold text-stone-900">{p.specs.warrantyYears} Years</td>
              ))}
            </tr>

            <tr className="bg-[#fbf9f5]">
              <td className="p-4 font-bold text-stone-700">Sound Insulation</td>
              {compareList.map((p) => (
                <td key={p.id} className="p-4 text-stone-800">{p.specs.soundInsulation || 'Standard'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
