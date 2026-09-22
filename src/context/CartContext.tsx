import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SampleItem, Product, ProductVariant } from '../types';
import { siteConfig } from '../config/siteConfig';

interface CartContextType {
  items: CartItem[];
  sampleItems: SampleItem[];
  addToCart: (product: Product, variant?: ProductVariant, boxes?: number) => void;
  updateQuantity: (id: string, boxes: number) => void;
  removeFromCart: (id: string) => void;
  removeItem?: (id: string) => void;
  clearCart: () => void;
  // Sample Cart
  addSample: (product: Product, variant?: ProductVariant) => boolean;
  removeSample: (id: string) => void;
  clearSamples: () => void;
  // Installation & Pricing
  includeInstallation: boolean;
  setIncludeInstallation: (include: boolean) => void;
  appliedCoupon: string | null;
  discountAmount: number;
  discount?: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  // Computed values
  totalBoxes: number;
  totalSqFt: number;
  subtotal: number;
  installationFee: number;
  shippingFee: number;
  grandTotal: number;
  total?: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fff_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [sampleItems, setSampleItems] = useState<SampleItem[]>(() => {
    try {
      const saved = localStorage.getItem('fff_sample_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [includeInstallation, setIncludeInstallation] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('fff_cart_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('fff_sample_items', JSON.stringify(sampleItems));
  }, [sampleItems]);

  const addToCart = (product: Product, variant?: ProductVariant, boxes: number = 1) => {
    if (boxes <= 0) return;
    const effectiveVariant: ProductVariant = variant || product.variants?.[0] || {
      id: `v-${product.id}`,
      name: 'Standard Plank',
      colorName: 'Standard',
      colorHex: '#333333',
      thickness: product.thickness,
      pricePerSqFt: product.pricePerSqFt,
      pricePerBox: product.pricePerBox,
      coveragePerBox: product.coveragePerBox,
      sku: product.sku,
      stockBoxes: product.stockBoxes,
      image: product.thumbnail
    };
    const compositeId = `${product.id}-${effectiveVariant.id}`;

    setItems(prev => {
      const existing = prev.find(item => item.id === compositeId);
      if (existing) {
        const newQty = Math.min(existing.quantity + boxes, effectiveVariant.stockBoxes || product.stockBoxes);
        return prev.map(item =>
          item.id === compositeId
            ? {
                ...item,
                quantity: newQty,
                totalSqFt: Number((newQty * effectiveVariant.coveragePerBox).toFixed(2))
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: compositeId,
          productId: product.id,
          variantId: effectiveVariant.id,
          title: `${product.title} (${effectiveVariant.name})`,
          slug: product.slug,
          materialType: product.materialType,
          finish: product.finish,
          image: effectiveVariant.image || product.thumbnail,
          pricePerBox: effectiveVariant.pricePerBox,
          pricePerSqFt: effectiveVariant.pricePerSqFt,
          coveragePerBox: effectiveVariant.coveragePerBox,
          quantity: boxes,
          totalSqFt: Number((boxes * effectiveVariant.coveragePerBox).toFixed(2)),
          maxStock: effectiveVariant.stockBoxes || product.stockBoxes
        };
        return [...prev, newItem];
      }
    });
  };

  const updateQuantity = (id: string, boxes: number) => {
    if (boxes <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const qty = Math.min(boxes, item.maxStock);
          return {
            ...item,
            quantity: qty,
            totalSqFt: Number((qty * item.coveragePerBox).toFixed(2))
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  // Samples
  const addSample = (product: Product, variant?: ProductVariant): boolean => {
    const sampleId = `smp-${product.id}-${variant ? variant.id : 'default'}`;
    if (sampleItems.some(s => s.id === sampleId)) {
      return false; // already added
    }
    if (sampleItems.length >= 5) {
      alert('You can select up to 5 material sample swatches per order.');
      return false;
    }

    const newSample: SampleItem = {
      id: sampleId,
      productId: product.id,
      variantId: variant?.id,
      title: variant ? `${product.title} - ${variant.name}` : product.title,
      slug: product.slug,
      materialType: product.materialType,
      finish: product.finish,
      image: variant?.swatchImage || variant?.image || product.thumbnail,
      price: 0,
      sku: variant?.sku || product.sku
    };

    setSampleItems(prev => [...prev, newSample]);
    return true;
  };

  const removeSample = (id: string) => {
    setSampleItems(prev => prev.filter(s => s.id !== id));
  };

  const clearSamples = () => {
    setSampleItems([]);
  };

  // Calculations
  const totalBoxes = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalSqFt = Number(items.reduce((acc, i) => acc + i.totalSqFt, 0).toFixed(2));
  const subtotal = items.reduce((acc, i) => acc + (i.pricePerBox * i.quantity), 0);

  const installationFee = includeInstallation
    ? Math.round(totalSqFt * siteConfig.standardInstallationRateSqFt)
    : 0;

  const shippingFee = subtotal === 0 || subtotal >= siteConfig.freeShippingThreshold ? 0 : 1200;
  const grandTotal = Math.max(0, subtotal - discountAmount + installationFee + shippingFee);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, orderAmount: subtotal })
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon.code);
        setDiscountAmount(data.coupon.discountAmount);
        return { success: true, message: `Coupon ${data.coupon.code} applied! Saved Rs. ${data.coupon.discountAmount.toLocaleString('en-PK')}` };
      } else {
        return { success: false, message: data.message || 'Invalid coupon' };
      }
    } catch {
      return { success: false, message: 'Failed to validate coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        sampleItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        removeItem: removeFromCart,
        clearCart,
        addSample,
        removeSample,
        clearSamples,
        includeInstallation,
        setIncludeInstallation,
        appliedCoupon,
        discountAmount,
        discount: discountAmount,
        applyCoupon,
        removeCoupon,
        totalBoxes,
        totalSqFt,
        subtotal,
        installationFee,
        shippingFee,
        grandTotal,
        total: grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
