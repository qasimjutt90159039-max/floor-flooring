import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wrench,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig, formatPKR, getWhatsAppLink } from '../config/siteConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const {
    items,
    sampleItems,
    updateQuantity,
    removeFromCart,
    removeSample,
    includeInstallation,
    setIncludeInstallation,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    totalBoxes,
    totalSqFt,
    subtotal,
    installationFee,
    shippingFee,
    grandTotal
  } = useCart();

  const [couponInput, setCouponInput] = React.useState('');
  const [couponMessage, setCouponMessage] = React.useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput.trim());
    setCouponMessage(res.message);
  };

  const handleWhatsAppCheckout = () => {
    let msg = `*First Floor Floorings Order Inquiry*\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.title}*\n   ${item.quantity} Boxes (${item.totalSqFt} sq ft) @ ${formatPKR(item.pricePerBox)}/box = ${formatPKR(item.quantity * item.pricePerBox)}\n\n`;
    });
    if (sampleItems.length > 0) {
      msg += `*Requested Free Samples:*\n`;
      sampleItems.forEach(s => {
        msg += `• ${s.title}\n`;
      });
      msg += `\n`;
    }
    msg += `Subtotal: ${formatPKR(subtotal)}\n`;
    if (includeInstallation) {
      msg += `Karachi Installation: ${formatPKR(installationFee)} (Requested)\n`;
    }
    msg += `*Estimated Grand Total: ${formatPKR(grandTotal)}*\n\n`;
    msg += `Please confirm availability and delivery to Karachi.`;

    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] border-l border-[#ded5be] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 bg-[#241c15] text-[#f4eee1] flex items-center justify-between border-b border-[#3d3023]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c98d4d]" />
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                Project Cart ({totalBoxes} Boxes)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-sm text-[#d8cdb8] hover:text-white hover:bg-[#34271c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Free Samples Basket Section */}
            {sampleItems.length > 0 && (
              <div className="p-3 rounded-lg bg-[#efe8d8] border border-[#ded5be]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b5731] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Sample Swatches ({sampleItems.length}/5)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Complimentary
                  </span>
                </div>
                <div className="space-y-1.5">
                  {sampleItems.map((sample) => (
                    <div
                      key={sample.id}
                      className="flex items-center justify-between text-xs bg-white p-2 rounded-sm border border-stone-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img
                          src={sample.image}
                          alt={sample.title}
                          className="w-7 h-7 object-cover rounded-xs"
                        />
                        <span className="font-medium text-stone-800 truncate">{sample.title}</span>
                      </div>
                      <button
                        onClick={() => removeSample(sample.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Flooring Box Items */}
            {items.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#f0ead8] text-[#8c7f6f] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#241c15]">Your cart is empty</h3>
                <p className="text-xs text-[#786c5e] max-w-xs mx-auto">
                  Browse our architectural flooring collections, use our coverage calculator, or order free sample swatches!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-semibold hover:bg-[#382b20] transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-lg border border-[#e5dec9] flex gap-3 shadow-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-sm border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-xs font-bold text-[#241c15] line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#786c5e]">
                        {formatPKR(item.pricePerSqFt)} / sq ft • {item.coveragePerBox} sq ft / box
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-stone-300 rounded-xs overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-stone-900 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-serif text-xs font-bold text-[#241c15]">
                            {formatPKR(item.pricePerBox * item.quantity)}
                          </span>
                          <span className="text-[10px] text-[#786c5e] block">
                            ({item.totalSqFt} sq ft total)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Turnkey Karachi Installation Add-on */}
            {items.length > 0 && (
              <div className="p-3 rounded-lg bg-[#f2ece0] border border-[#ded5be]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded-xs text-[#7b5731] border-stone-400 focus:ring-[#7b5731]"
                  />
                  <div>
                    <span className="font-serif text-xs font-bold text-[#241c15] flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#7b5731]" /> Include Karachi Master Installation?
                    </span>
                    <p className="text-[11px] text-[#786c5e] mt-0.5 leading-snug">
                      Laser subfloor leveling, expansion gap protocol, and turnkey plank fitting @ Rs. {siteConfig.standardInstallationRateSqFt}/sq ft (+{formatPKR(installationFee)} for {totalSqFt} sq ft).
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Coupon Code Section */}
            {items.length > 0 && (
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-sm bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Coupon: <strong>{appliedCoupon}</strong> (-{formatPKR(discountAmount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-800 text-[11px] font-medium underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. NEWFLOOR10)"
                      className="flex-1 bg-white text-xs px-3 py-2 rounded-xs border border-stone-300 focus:outline-none focus:border-[#7b5731]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#241c15] text-[#f4eee1] rounded-xs text-xs font-medium hover:bg-[#34271c] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className="text-[11px] text-stone-600 mt-1">{couponMessage}</p>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer - Totals & Actions */}
          <div className="p-4 bg-white border-t border-[#ded5be] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#786c5e]">
                <span>Material Subtotal ({totalBoxes} boxes / {totalSqFt} sq ft):</span>
                <span className="font-semibold text-[#241c15]">{formatPKR(subtotal)}</span>
              </div>

              {includeInstallation && (
                <div className="flex justify-between text-[#786c5e]">
                  <span>Karachi Installation Labor:</span>
                  <span className="font-semibold text-[#241c15]">{formatPKR(installationFee)}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Discount:</span>
                  <span>-{formatPKR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#786c5e]">
                <span>Shipping & Delivery:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">Free Karachi Delivery</strong>
                  ) : (
                    formatPKR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#241c15]">Grand Total:</span>
                <span className="font-serif text-xl font-bold text-[#7b5731]">
                  {formatPKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                disabled={items.length === 0 && sampleItems.length === 0}
                onClick={() => {
                  onClose();
                  onNavigate('checkout');
                }}
                className="w-full py-3 bg-[#241c15] hover:bg-[#392c21] disabled:opacity-50 text-white rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#c98d4d]" />
              </button>

              <button
                disabled={items.length === 0}
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#136630] rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/30"
              >
                <span className="font-bold">●</span> Chat & Confirm on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
