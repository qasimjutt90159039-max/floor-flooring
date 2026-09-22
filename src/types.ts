// First Floor Floorings - Domain TypeScript Definitions

export type MaterialType =
  | 'SPC Vinyl'
  | 'Laminate'
  | 'Engineered Wood'
  | 'Solid Hardwood'
  | 'Carpet Tiles'
  | 'Artificial Grass'
  | 'Outdoor Decking'
  | 'Wall Panels'
  | 'Skirting & Accessories';

export type RoomSuitability =
  | 'Living Room'
  | 'Bedroom'
  | 'Kitchen'
  | 'Bathroom'
  | 'Office & Commercial'
  | 'Outdoor / Terrace';

export type WaterResistance =
  | '100% Waterproof'
  | 'Water Resistant 72hr'
  | 'Moisture Resistant'
  | 'Weatherproof Outdoor'
  | 'Natural Oil Moisture Resistance'
  | 'Stain & Spill Guard'
  | 'Rapid Perforated Drainage 60 Liters/min/sqm'
  | '100% Weather & Rot Proof'
  | '100% Waterproof & Termite Proof'
  | '100% Moisture Barrier (Zero Permeability)'
  | string;

export type FinishType =
  | 'Matte'
  | 'Embossed in Register (EIR)'
  | 'Deep Woodgrain'
  | 'Smooth Silk'
  | 'Brushed Oil'
  | 'Handscraped'
  | 'Stone Textured'
  | string;

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Shipped'
  | 'Installing'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'installing'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type SiteVisitStatus =
  | 'Requested'
  | 'Scheduled'
  | 'Visited'
  | 'Quoted'
  | 'Installing'
  | 'Completed'
  | 'Cancelled';

export type QuoteStatus =
  | 'New'
  | 'Under Review'
  | 'Quoted'
  | 'Negotiating'
  | 'Accepted'
  | 'Declined';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Natural Oak 8mm", "Smoked Walnut 12mm"
  colorName: string;
  colorHex: string;
  thickness: string;
  pricePerSqFt: number;
  pricePerBox: number;
  coveragePerBox: number; // in sq ft
  sku: string;
  stockBoxes: number;
  image: string;
  swatchImage?: string;
  roomMockupImage?: string;
}

export interface ProductSpecs {
  material: string;
  thickness: string;
  wearLayer?: string;
  waterResistance: WaterResistance;
  installationMethod: 'Click-Lock' | 'Tongue & Groove' | 'Glue-Down' | 'Interlocking';
  dimensions: string; // e.g. "1220mm x 180mm x 5mm"
  warrantyYears: number;
  fireRating?: string;
  soundInsulation?: string;
  underlaymentAttached?: boolean;
  edgeProfile?: 'Micro-Bevel 4V' | 'Square Edge' | 'Painted Bevel' | 'Painted Bevel 4V' | 'Hidden Clip Side Grooves' | string;
  origin?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  brand?: string;
  category: string;
  categorySlug: string;
  materialType: MaterialType;
  finish: FinishType;
  thickness: string;
  wearLayer?: string;
  waterResistance: WaterResistance;
  warrantyYears: number;
  roomSuitability: RoomSuitability[];
  pricePerSqFt: number;
  pricePerBox: number;
  coveragePerBox: number; // in sq ft
  planksPerBox: number;
  stockBoxes: number;
  inStock: boolean;
  onSale?: boolean;
  salePricePerSqFt?: number;
  salePricePerBox?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  thumbnail: string;
  images: string[];
  swatchImages?: string[];
  roomMockups?: {
    roomType: string;
    imageUrl: string;
    description?: string;
  }[];
  specs: ProductSpecs;
  features: string[];
  description: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  materialType: MaterialType;
  iconName: string;
  image: string;
  description: string;
  itemCount: number;
  productCount?: number;
  startingPriceSqFt: number;
}

export interface CartItem {
  id: string; // composite `${productId}-${variantId}`
  productId: string;
  variantId: string;
  title: string;
  slug: string;
  materialType: string;
  finish: string;
  image: string;
  pricePerBox: number;
  pricePerSqFt: number;
  coveragePerBox: number;
  quantity: number; // in boxes
  totalSqFt: number;
  maxStock: number;
}

export interface SampleItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  slug: string;
  materialType: string;
  finish: string;
  thickness?: string;
  image: string;
  price: number; // 0 or nominal PKR
  sku: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area?: string; // e.g. DHA Phase 5, Clifton
  province: string;
  postalCode?: string;
  orderNotes?: string;
}

export type DeliveryMethod =
  | 'karachi_express'
  | 'karachi_showroom_pickup'
  | 'nationwide_freight'
  | 'multan_express'
  | 'multan_shop_pickup'
  | 'tcs_nationwide'
  | 'home_delivery';

export type PaymentMethod =
  | 'cod'
  | 'bank_transfer'
  | 'jazzcash'
  | 'easypaisa'
  | 'pay_at_showroom'
  | 'pay_at_shop';

export interface Order {
  id: string;
  orderNumber: string; // FFF-2026-000123
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  customer: CustomerDetails;
  deliveryMethod: DeliveryMethod;
  installationRequested: boolean;
  preferredInstallationDate?: string;
  subtotal: number;
  discount: number;
  appliedCoupon?: string;
  shippingFee: number;
  installationFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified' | 'paid' | 'failed';
  paymentProofUrl?: string;
  trackingNumber?: string;
  courierName?: string;
  courierPartner?: string;
  notes?: string;
}

export interface SampleOrder {
  id: string;
  sampleOrderNumber: string; // SMP-2026-000045
  createdAt: string;
  status: 'Received' | 'Dispatched' | 'Delivered' | 'Converted to Order';
  samples: SampleItem[];
  customer: CustomerDetails;
  shippingFee: number;
  total: number;
  paymentMethod: 'free' | 'cod' | 'online';
  trackingNumber?: string;
  notes?: string;
}

export interface SiteVisitRequest {
  id: string;
  ticketNumber: string; // SV-2026-000045
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  areaInKarachi: string; // DHA Phase 5, Clifton, etc.
  fullAddress: string;
  preferredDate: string;
  preferredTimeSlot: string; // Morning (11am-2pm), Afternoon (2pm-6pm), Evening (6pm-9pm)
  roomType: string;
  estimatedSqFt: number;
  materialOfInterest: string;
  swatchesRequested?: string[];
  status: SiteVisitStatus;
  assignedEstimator?: string;
  technicianNotes?: string;
}

export interface QuoteRequest {
  id: string;
  quoteNumber: string; // QT-2026-000012
  createdAt: string;
  companyName?: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  projectType: 'Residential Villa' | 'Apartment Complex' | 'Commercial Office' | 'Retail Boutique' | 'Architect / Interior Firm';
  areaSqFt: number;
  materialPreferences: string[];
  estimatedBudget?: string;
  timeline: string;
  notes: string;
  fileAttachment?: string;
  status: QuoteStatus;
  proposedQuoteAmount?: number;
  quotationNotes?: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  location: string; // e.g. "DHA Phase 6, Karachi"
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  projectPhotoUrl?: string;
}

export interface Question {
  id: string;
  productId: string;
  author: string;
  question: string;
  date: string;
  answer?: string;
  answeredAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  validUntil: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt?: string;
  date?: string;
  readTime: string;
  coverImage: string;
  tags?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'materials' | 'installation' | 'site_visit' | 'samples' | 'pricing_delivery';
}

export interface SiteSettings {
  businessName: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsappNumber: string;
  address: string;
  currency: string;
  freeShippingThreshold: number;
  standardInstallationRateSqFt: number;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch?: string;
  };
  jazzCashDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  easypaisaDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  socialLinks?: {
    facebook: string;
    instagram?: string;
    youtube?: string;
  };
  openingHours?: {
    weekdays: string;
    sunday: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'contractor';
  city?: string;
  address?: string;
  companyName?: string;
  savedAddresses?: CustomerDetails[];
}

export interface CalculatorState {
  roomLength: number;
  roomWidth: number;
  unit: 'ft' | 'm';
  pattern: 'straight' | 'herringbone';
  wastagePercent: number;
  includeInstallation: boolean;
  selectedProductId?: string;
}
