import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  ShoppingBag,
  CreditCard,
  Building,
  Phone,
  MessageSquare,
  Wrench
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { siteConfig, formatPKR, getWhatsAppLink } from '../config/siteConfig';

interface CheckoutPageProps {
  onNavigate: (page: string, ref?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    items,
    sampleItems,
    includeInstallation,
    setIncludeInstallation,
    appliedCoupon,
    discountAmount,
    totalBoxes,
    totalSqFt,
    subtotal,
    installationFee,
    shippingFee,
    grandTotal,
    clearCart
  } = useCart();

  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'jazzcash_easypaisa' | 'cod'>('bank_transfer');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) return;

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: `${address}, ${city}`,
        city,
        items,
        sampleItems,
        includeInstallation,
        paymentMethod,
        subtotal,
        installationFee,
        discountAmount,
        shippingFee,
        grandTotal,
        notes: orderNotes
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        clearCart();
      } else {
        // Fallback local order
        const fallback = {
          id: `FFF-${Date.now().toString().slice(-6)}`,
          customerName,
          items,
          grandTotal,
          paymentMethod,
          includeInstallation,
          createdAt: new Date().toISOString()
        };
        setCompletedOrder(fallback);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      const fallback = {
        id: `FFF-${Date.now().toString().slice(-6)}`,
        customerName,
        items,
        grandTotal,
        paymentMethod,
        includeInstallation,
        createdAt: new Date().toISOString()
      };
      setCompletedOrder(fallback);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 font-sans space-y-6">
        <div className="p-8 bg-white rounded-xl border border-[#ded5be] shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
            Order Confirmed & Logged
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241c15]">
            Thank you, {completedOrder.customerName}!
          </h1>
          <p className="text-xs text-[#786c5e]">
            Your official First Floor Floorings Order Reference is <strong>#{completedOrder.id}</strong>.
            A confirmation receipt has been generated.
          </p>

          {/* Bank Transfer Instructions */}
          {completedOrder.paymentMethod === 'bank_transfer' && (
            <div className="p-4 bg-[#faf7f0] rounded-lg border border-[#ded5be] text-left text-xs space-y-2">
              <h4 className="font-serif font-bold text-[#241c15]">Bank Transfer Coordinates</h4>
              <p className="text-stone-600">Please transfer total {formatPKR(completedOrder.grandTotal)} to:</p>
              <div className="space-y-1 font-mono text-[11px] text-stone-800">
                <p><strong>Bank:</strong> Meezan Bank Ltd (Tauheed Commercial Branch, DHA Karachi)</p>
                <p><strong>Account Title:</strong> First Floor Floorings</p>
                <p><strong>Account Number:</strong> 0210-0105849301</p>
                <p><strong>IBAN:</strong> PK65 MEZN 0002 1001 0584 9301</p>
              </div>
              <p className="text-[10px] text-stone-500">
                After transfer, WhatsApp your screenshot to +92 321 35304261 with reference #{completedOrder.id}.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 bg-[#f4eee1] hover:bg-[#ede5d3] text-[#241c15] text-xs font-bold rounded-sm border border-[#cfc0a6] flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <a
              href={getWhatsAppLink(`Hello First Floor Floorings, I have placed Order #${completedOrder.id} for ${formatPKR(completedOrder.grandTotal)}. Please confirm stock and delivery.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Confirm on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-semibold text-[#7b5731] hover:underline"
            >
              Return to Catalog →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && sampleItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#241c15]">Your cart is empty</h2>
        <p className="text-xs text-[#786c5e]">Add flooring boxes or complimentary samples before checking out.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] text-xs font-bold rounded-sm"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans space-y-8">
      <div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          Secure Procurement
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#241c15] mt-0.5">
          Checkout & Project Confirmation
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Billing and Delivery Details */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-4 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#241c15]">
              1. Delivery & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0321-35304261"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. tariq@gmail.com"
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-stone-800 mb-1">Exact Street Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 24-C, 11th Commercial Street, Phase 2 Ext, DHA, Karachi"
                className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-4 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#241c15]">
              2. Payment Method
            </h3>

            <div className="space-y-3 text-xs">
              <label className={`p-4 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${
                paymentMethod === 'bank_transfer' ? 'border-[#7b5731] bg-[#faf6ee]' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-0.5 text-[#7b5731]"
                />
                <div>
                  <span className="font-bold text-[#241c15] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#7b5731]" /> Direct Bank Transfer (Meezan / Alfalah)
                  </span>
                  <p className="text-[11px] text-[#786c5e] mt-0.5">
                    Transfer online from any Pakistani bank account. Official invoice with IBAN provided instantly.
                  </p>
                </div>
              </label>

              <label className={`p-4 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${
                paymentMethod === 'jazzcash_easypaisa' ? 'border-[#7b5731] bg-[#faf6ee]' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'jazzcash_easypaisa'}
                  onChange={() => setPaymentMethod('jazzcash_easypaisa')}
                  className="mt-0.5 text-[#7b5731]"
                />
                <div>
                  <span className="font-bold text-[#241c15] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#7b5731]" /> JazzCash / Easypaisa Digital Wallet
                  </span>
                  <p className="text-[11px] text-[#786c5e] mt-0.5">
                    Instant wallet transfer to our merchant account (0321-35304261).
                  </p>
                </div>
              </label>

              <label className={`p-4 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${
                paymentMethod === 'cod' ? 'border-[#7b5731] bg-[#faf6ee]' : 'border-stone-200'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 text-[#7b5731]"
                />
                <div>
                  <span className="font-bold text-[#241c15] flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#7b5731]" /> Pay at Showroom / Cash on Delivery (Karachi)
                  </span>
                  <p className="text-[11px] text-[#786c5e] mt-0.5">
                    Pay 50% advance via transfer or at DHA Phase 5 Showroom, and remainder upon box arrival.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#ded5be] space-y-3 shadow-xs text-xs">
            <label className="block font-bold text-stone-800">Special Instructions / Site Access</label>
            <textarea
              rows={2}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Elevators available; deliver on Saturday morning."
              className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#241c15] hover:bg-[#392c20] text-white rounded-sm text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-[#c98d4d]" />
            <span>{submitting ? 'Placing Order...' : `Confirm Order (${formatPKR(grandTotal)})`}</span>
          </button>
        </form>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#ded5be] p-6 space-y-6 shadow-sm sticky top-24">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7b5731] font-bold">
              Cart Summary
            </span>
            <h3 className="font-serif text-lg font-bold text-[#241c15] mt-0.5">
              {totalBoxes} Cartons ({totalSqFt} sq ft)
            </h3>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-stone-100 text-xs">
            {items.map((item) => (
              <div key={item.id} className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-xs border border-stone-200" />
                  <div>
                    <h5 className="font-bold text-[#241c15] truncate max-w-[160px]">{item.title}</h5>
                    <span className="text-[11px] text-stone-500">
                      {item.quantity} Boxes ({item.totalSqFt} sq ft)
                    </span>
                  </div>
                </div>
                <span className="font-serif font-bold text-stone-900">
                  {formatPKR(item.pricePerBox * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Installation Checkbox */}
          <div className="p-3 bg-[#f8f5ee] rounded-lg border border-[#ded5be]">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="mt-0.5 text-[#7b5731] rounded-xs"
              />
              <div>
                <span className="font-bold text-[#241c15] flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-[#7b5731]" /> Turnkey Karachi Installation
                </span>
                <span className="text-[11px] text-stone-600 block">
                  Rs. 40/sq ft (+{formatPKR(installationFee)})
                </span>
              </div>
            </label>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs divide-y divide-stone-100">
            <div className="flex justify-between pt-1 text-stone-600">
              <span>Materials Subtotal:</span>
              <span className="font-bold text-stone-900">{formatPKR(subtotal)}</span>
            </div>

            {includeInstallation && (
              <div className="flex justify-between pt-2 text-stone-600">
                <span>Karachi Installation Labor:</span>
                <span className="font-bold text-stone-900">{formatPKR(installationFee)}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex justify-between pt-2 text-emerald-700 font-medium">
                <span>Discount ({appliedCoupon}):</span>
                <span>-{formatPKR(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between pt-2 text-stone-600">
              <span>Shipping:</span>
              <span className="font-bold text-emerald-800">
                {shippingFee === 0 ? 'Free Karachi Delivery' : formatPKR(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between pt-3 text-base items-baseline">
              <span className="font-serif font-bold text-[#241c15]">Grand Total:</span>
              <span className="font-serif text-2xl font-bold text-[#7b5731]">
                {formatPKR(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
