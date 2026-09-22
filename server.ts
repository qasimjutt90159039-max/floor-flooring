import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  initialProducts,
  initialCategories,
  sampleReviews,
  sampleQuestions,
  sampleCoupons,
  sampleBlogPosts,
  faqs,
  sampleOrders,
  sampleSiteVisits,
  sampleQuotes,
  sampleSampleOrders
} from './src/data/seedData';
import { siteConfig, calculateCoverage } from './src/config/siteConfig';
import {
  Product,
  Category,
  Order,
  SampleOrder,
  SiteVisitRequest,
  QuoteRequest,
  Review,
  Question,
  Coupon,
  ContactMessage,
  BlogPost,
  FAQ,
  SiteSettings,
  User
} from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// File-backed persistent DB State
interface DBState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  sampleOrders: SampleOrder[];
  siteVisits: SiteVisitRequest[];
  quotes: QuoteRequest[];
  reviews: Review[];
  questions: Question[];
  coupons: Coupon[];
  messages: ContactMessage[];
  blogs: BlogPost[];
  faqs: FAQ[];
  settings: SiteSettings;
  users: User[];
  counters: {
    orderNumber: number;
    siteVisitTicket: number;
    quoteNumber: number;
    sampleOrderNumber: number;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

const defaultState: DBState = {
  products: initialProducts,
  categories: initialCategories,
  orders: sampleOrders,
  sampleOrders: sampleSampleOrders,
  siteVisits: sampleSiteVisits,
  quotes: sampleQuotes,
  reviews: sampleReviews,
  questions: sampleQuestions,
  coupons: sampleCoupons,
  messages: [
    {
      id: 'msg-1',
      createdAt: '2026-09-18T12:00:00Z',
      fullName: 'Ar. Danish Raza',
      phone: '0300-3456789',
      email: 'danish@studiolinea.pk',
      subject: 'Architectural Trade Program Inquiry',
      message: 'Hello, we are specifying 6,000 sq ft of herringbone SPC and carpet tiles for an upcoming corporate HQ on Khayaban-e-Iqbal. Could you send your master spec sheet?',
      status: 'replied'
    }
  ],
  blogs: sampleBlogPosts,
  faqs: faqs,
  settings: {
    businessName: siteConfig.businessName,
    phoneRaw: siteConfig.phoneRaw,
    phoneFormatted: siteConfig.phoneFormatted,
    whatsappNumber: siteConfig.whatsappNumber,
    address: siteConfig.address.fullAddress,
    currency: siteConfig.currency,
    freeShippingThreshold: siteConfig.freeShippingThreshold,
    standardInstallationRateSqFt: siteConfig.standardInstallationRateSqFt,
    bankDetails: siteConfig.bankDetails,
    jazzCashDetails: siteConfig.jazzCashDetails,
    easypaisaDetails: siteConfig.easypaisaDetails,
    socialLinks: siteConfig.socialLinks,
    openingHours: siteConfig.openingHours
  },
  users: [
    {
      id: 'usr-admin',
      name: 'Showroom Admin',
      email: 'admin@firstfloorfloorings.pk',
      phone: '0321-35304261',
      role: 'admin'
    },
    {
      id: 'usr-contractor',
      name: 'Studio Linea (Trade Partner)',
      email: 'contractor@studiolinea.pk',
      phone: '0300-3456789',
      role: 'contractor',
      companyName: 'Studio Linea Architects'
    },
    {
      id: 'usr-cust-1',
      name: 'Dr. Tariq Mansoor',
      email: 'tariq.mansoor@gmail.com',
      phone: '0300-8241920',
      role: 'customer',
      city: 'Karachi',
      address: 'House 45/B, Street 18, Khayaban-e-Muhafiz, DHA Phase 6'
    }
  ],
  counters: {
    orderNumber: 102,
    siteVisitTicket: 47,
    quoteNumber: 13,
    sampleOrderNumber: 22
  }
};

function loadDB(): DBState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // verify it has flooring products
      if (parsed.products && parsed.products.length > 0 && (parsed.products[0].sku?.startsWith('SPC-') || parsed.products[0]?.categorySlug?.includes('flooring'))) {
        // Ensure any new products from seedData are merged
        let hasNew = false;
        for (const p of initialProducts) {
          if (!parsed.products.some((existing: Product) => existing.id === p.id)) {
            parsed.products.push(p);
            hasNew = true;
          }
        }
        if (hasNew) {
          saveDB(parsed);
        }
        return parsed;
      }
    }
    saveDB(defaultState);
    return defaultState;
  } catch (err) {
    console.error('Error loading db.json, using defaults', err);
    return defaultState;
  }
}

function saveDB(state: DBState) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json', err);
  }
}

let db = loadDB();

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    store: 'First Floor Floorings',
    showroom: '20 C, 26th Street, DHA Phase 5, Karachi',
    productsCount: db.products.length,
    ordersCount: db.orders.length
  });
});

// 1. PRODUCTS API
app.get('/api/products', (req: Request, res: Response) => {
  try {
    const {
      category,
      materialType,
      room,
      waterResistance,
      finish,
      thickness,
      minPrice,
      maxPrice,
      search,
      sort,
      inStock,
      onSale,
      featured,
      limit,
      page
    } = req.query;

    let filtered = [...db.products];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.categorySlug === category || p.category === category);
    }
    if (materialType && materialType !== 'all') {
      filtered = filtered.filter(p => p.materialType.toLowerCase() === (materialType as string).toLowerCase());
    }
    if (room && room !== 'all') {
      filtered = filtered.filter(p => p.roomSuitability.some(r => r.toLowerCase().includes((room as string).toLowerCase())));
    }
    if (waterResistance && waterResistance !== 'all') {
      filtered = filtered.filter(p => p.waterResistance === waterResistance);
    }
    if (finish && finish !== 'all') {
      filtered = filtered.filter(p => p.finish.toLowerCase() === (finish as string).toLowerCase());
    }
    if (thickness && thickness !== 'all') {
      filtered = filtered.filter(p => p.thickness.toLowerCase().includes((thickness as string).toLowerCase()));
    }
    if (minPrice) {
      filtered = filtered.filter(p => p.pricePerSqFt >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.pricePerSqFt <= Number(maxPrice));
    }
    if (inStock === 'true') {
      filtered = filtered.filter(p => p.inStock && p.stockBoxes > 0);
    }
    if (onSale === 'true') {
      filtered = filtered.filter(p => p.onSale);
    }
    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }
    if (search && typeof search === 'string' && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materialType.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === 'newest') {
      filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    const total = filtered.length;
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Number(limit) || 50);
    const start = (p - 1) * l;
    const paginated = filtered.slice(start, start + l);

    res.json({
      success: true,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
      products: paginated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Autocomplete search
app.get('/api/products/search/autocomplete', (req: Request, res: Response) => {
  const q = ((req.query.q as string) || '').trim().toLowerCase();
  if (!q) {
    return res.json({ success: true, suggestions: [] });
  }
  const matches = db.products
    .filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materialType.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
    .slice(0, 6)
    .map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      materialType: p.materialType,
      pricePerSqFt: p.pricePerSqFt,
      pricePerBox: p.pricePerBox,
      thumbnail: p.thumbnail
    }));

  res.json({ success: true, suggestions: matches });
});

// Single product
app.get('/api/products/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = db.products.find(p => p.slug === slug || p.id === slug);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Flooring product not found' });
  }
  const related = db.products
    .filter(p => p.id !== product.id && (p.categorySlug === product.categorySlug || p.materialType === product.materialType))
    .slice(0, 4);

  const reviews = db.reviews.filter(r => r.productId === product.id);
  const questions = db.questions.filter(q => q.productId === product.id);

  res.json({
    success: true,
    product,
    related,
    reviews,
    questions
  });
});

// Admin Product CRUD
app.post('/api/products', (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: data.sku || `FFF-${Math.floor(1000 + Math.random() * 9000)}`,
      stockBoxes: Number(data.stockBoxes) || 50,
      pricePerSqFt: Number(data.pricePerSqFt) || 150,
      pricePerBox: Number(data.pricePerBox) || (Number(data.pricePerSqFt) * (Number(data.coveragePerBox) || 20)),
      coveragePerBox: Number(data.coveragePerBox) || 20,
      inStock: true,
      rating: 5.0,
      reviewCount: 0,
      images: data.images && data.images.length > 0 ? data.images : [data.thumbnail || 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800'],
      thumbnail: data.thumbnail || (data.images && data.images[0]) || 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800'
    };
    db.products.unshift(newProduct);
    saveDB(db);
    res.json({ success: true, product: newProduct });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  db.products[index] = { ...db.products[index], ...req.body };
  saveDB(db);
  res.json({ success: true, product: db.products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.products = db.products.filter(p => p.id !== id);
  saveDB(db);
  res.json({ success: true, message: 'Product deleted' });
});

// 2. CATEGORIES API
app.get('/api/categories', (req: Request, res: Response) => {
  res.json({
    success: true,
    categories: db.categories
  });
});

// 3. SERVER-SIDE FLOORING COVERAGE CALCULATOR
app.post('/api/calculator/calculate', (req: Request, res: Response) => {
  try {
    const {
      roomLength,
      roomWidth,
      coveragePerBox,
      unit = 'ft',
      pattern = 'straight', // straight = 10%, herringbone = 15%
      wastagePercent,
      includeInstallation = false,
      installationRateSqFt = siteConfig.standardInstallationRateSqFt,
      pricePerBox = 0,
      pricePerSqFt = 0
    } = req.body;

    const length = Number(roomLength) || 0;
    const width = Number(roomWidth) || 0;
    const boxCoverage = Number(coveragePerBox) || 20.0;

    let netAreaSqFt = length * width;
    if (unit === 'm') {
      netAreaSqFt = netAreaSqFt * 10.7639; // convert m2 to sq ft
    }

    const wastePct = wastagePercent !== undefined
      ? Number(wastagePercent)
      : (pattern === 'herringbone' ? 15 : 10);

    const calc = calculateCoverage(length, width, boxCoverage, wastePct);

    const actualPricePerBox = pricePerBox || (pricePerSqFt * boxCoverage);
    const materialCost = calc.boxesNeeded * actualPricePerBox;
    const installationCost = includeInstallation ? (calc.totalCoveredSqFt * Number(installationRateSqFt)) : 0;
    const grandTotal = materialCost + installationCost;

    res.json({
      success: true,
      calculation: {
        ...calc,
        unit,
        pattern,
        wastagePercent: wastePct,
        materialCost,
        installationCost,
        grandTotal,
        boxCoverage
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. ORDERS API
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const {
      customer,
      items,
      deliveryMethod,
      installationRequested,
      preferredInstallationDate,
      paymentMethod,
      appliedCoupon,
      paymentProofUrl,
      notes
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }
    if (!customer || !customer.fullName || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'Please provide complete delivery details' });
    }

    // Verify stock and calculate exact server pricing
    let subtotal = 0;
    let totalCoveredSqFt = 0;

    const validatedItems = items.map((item: any) => {
      const prod = db.products.find(p => p.id === item.productId);
      const boxPrice = prod ? prod.pricePerBox : item.pricePerBox;
      const sqftPrice = prod ? prod.pricePerSqFt : item.pricePerSqFt;
      const coverage = prod ? prod.coveragePerBox : item.coveragePerBox;
      const itemSubtotal = boxPrice * item.quantity;
      subtotal += itemSubtotal;
      totalCoveredSqFt += (coverage * item.quantity);

      // Decrement inventory in boxes
      if (prod) {
        prod.stockBoxes = Math.max(0, prod.stockBoxes - item.quantity);
        if (prod.stockBoxes === 0) {
          prod.inStock = false;
        }
      }

      return {
        ...item,
        pricePerBox: boxPrice,
        pricePerSqFt: sqftPrice,
        coveragePerBox: coverage,
        totalSqFt: coverage * item.quantity
      };
    });

    // Discount
    let discount = 0;
    if (appliedCoupon) {
      const coup = db.coupons.find(c => c.code.toUpperCase() === appliedCoupon.toUpperCase());
      if (coup && subtotal >= coup.minOrderAmount) {
        discount = coup.discountType === 'percentage'
          ? Math.round((subtotal * coup.discountValue) / 100)
          : coup.discountValue;
      }
    }

    // Shipping fee
    let shippingFee = 0;
    if (deliveryMethod === 'karachi_showroom_pickup') {
      shippingFee = 0;
    } else if (subtotal >= siteConfig.freeShippingThreshold) {
      shippingFee = 0;
    } else {
      shippingFee = deliveryMethod === 'nationwide_freight' ? 2500 : 1200;
    }

    // Installation fee
    let installationFee = 0;
    if (installationRequested) {
      installationFee = Math.round(totalCoveredSqFt * siteConfig.standardInstallationRateSqFt);
    }

    const total = Math.max(0, subtotal - discount + shippingFee + installationFee);

    // Order number generation FFF-2026-000XXX
    db.counters.orderNumber += 1;
    const formattedNum = String(db.counters.orderNumber).padStart(6, '0');
    const orderNumber = `FFF-2026-${formattedNum}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      items: validatedItems,
      customer,
      deliveryMethod,
      installationRequested: Boolean(installationRequested),
      preferredInstallationDate,
      subtotal,
      discount,
      appliedCoupon,
      shippingFee,
      installationFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'bank_transfer' ? (paymentProofUrl ? 'verified' : 'pending') : (paymentMethod === 'cod' ? 'pending' : 'paid'),
      paymentProofUrl,
      notes
    };

    db.orders.unshift(newOrder);
    saveDB(db);

    console.log(`[Order Placed] ${orderNumber} - Rs. ${total} for ${customer.fullName}`);

    res.json({
      success: true,
      order: newOrder
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Track Order
app.get('/api/orders/:orderNumber', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const phone = (req.query.phone as string) || '';

  const order = db.orders.find(o =>
    o.orderNumber.toLowerCase() === orderNumber.toLowerCase() ||
    o.id === orderNumber
  );

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found with this reference number' });
  }

  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const cleanCustPhone = order.customer.phone.replace(/[^0-9]/g, '');
    if (!cleanCustPhone.includes(cleanPhone) && !cleanPhone.includes(cleanCustPhone)) {
      return res.status(401).json({ success: false, message: 'Phone number does not match order record' });
    }
  }

  res.json({ success: true, order });
});

// Admin Orders
app.get('/api/admin/orders', (req: Request, res: Response) => {
  res.json({
    success: true,
    orders: db.orders
  });
});

app.put('/api/admin/orders/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, trackingNumber, paymentStatus } = req.body;

  const order = db.orders.find(o => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const oldStatus = order.status;
  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  // Restore inventory if cancelled
  if (status === 'Cancelled' && oldStatus !== 'Cancelled') {
    order.items.forEach(item => {
      const prod = db.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stockBoxes += item.quantity;
        prod.inStock = true;
      }
    });
  }

  saveDB(db);
  res.json({ success: true, order });
});

// 5. SAMPLE ORDERS API
app.post('/api/samples', (req: Request, res: Response) => {
  try {
    const { customer, samples, paymentMethod = 'cod' } = req.body;
    if (!samples || samples.length === 0) {
      return res.status(400).json({ success: false, message: 'Select at least 1 sample swatch' });
    }
    if (samples.length > 5) {
      return res.status(400).json({ success: false, message: 'Maximum 5 samples per order' });
    }

    db.counters.sampleOrderNumber += 1;
    const sampleOrderNumber = `SMP-2026-${String(db.counters.sampleOrderNumber).padStart(6, '0')}`;

    const isKarachi = customer.city?.toLowerCase().includes('karachi');
    const shippingFee = (samples.length <= siteConfig.freeSampleThreshold && isKarachi) ? 0 : 250;

    const newSampleOrder: SampleOrder = {
      id: `smp-${Date.now()}`,
      sampleOrderNumber,
      createdAt: new Date().toISOString(),
      status: 'Received',
      samples,
      customer,
      shippingFee,
      total: shippingFee,
      paymentMethod,
      notes: 'Sample swatch dispatch request'
    };

    db.sampleOrders.unshift(newSampleOrder);
    saveDB(db);

    res.json({ success: true, sampleOrder: newSampleOrder });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/samples', (req: Request, res: Response) => {
  res.json({ success: true, sampleOrders: db.sampleOrders });
});

app.put('/api/admin/samples/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, trackingNumber } = req.body;
  const smp = db.sampleOrders.find(s => s.id === id || s.sampleOrderNumber === id);
  if (!smp) return res.status(404).json({ success: false, message: 'Sample order not found' });
  if (status) smp.status = status;
  if (trackingNumber) smp.trackingNumber = trackingNumber;
  saveDB(db);
  res.json({ success: true, sampleOrder: smp });
});

// 6. SITE VISITS & INSTALLATION BOOKING API
app.post('/api/site-visits', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      areaInKarachi,
      fullAddress,
      preferredDate,
      preferredTimeSlot,
      roomType,
      estimatedSqFt,
      materialOfInterest,
      swatchesRequested
    } = req.body;

    if (!fullName || !phone || !fullAddress) {
      return res.status(400).json({ success: false, message: 'Please provide your full name, phone number, and address in Karachi' });
    }

    db.counters.siteVisitTicket += 1;
    const ticketNumber = `SV-2026-${String(db.counters.siteVisitTicket).padStart(6, '0')}`;

    const newVisit: SiteVisitRequest = {
      id: `sv-${Date.now()}`,
      ticketNumber,
      createdAt: new Date().toISOString(),
      fullName,
      phone,
      email,
      areaInKarachi: areaInKarachi || 'DHA Karachi',
      fullAddress,
      preferredDate: preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTimeSlot: preferredTimeSlot || 'Afternoon (2:00 PM – 5:00 PM)',
      roomType: roomType || 'Residential Living Room',
      estimatedSqFt: Number(estimatedSqFt) || 500,
      materialOfInterest: materialOfInterest || 'SPC Vinyl Flooring',
      swatchesRequested: swatchesRequested || [],
      status: 'Requested',
      technicianNotes: 'New online Karachi site visit booking'
    };

    db.siteVisits.unshift(newVisit);
    saveDB(db);

    console.log(`[Site Visit Booked] ${ticketNumber} - ${fullName} at ${areaInKarachi}`);
    res.json({ success: true, siteVisit: newVisit });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/site-visits/:ticketNumber', (req: Request, res: Response) => {
  const { ticketNumber } = req.params;
  const visit = db.siteVisits.find(v => v.ticketNumber.toLowerCase() === ticketNumber.toLowerCase() || v.id === ticketNumber);
  if (!visit) {
    return res.status(404).json({ success: false, message: 'Site visit ticket not found' });
  }
  res.json({ success: true, siteVisit: visit });
});

app.get('/api/admin/site-visits', (req: Request, res: Response) => {
  res.json({ success: true, siteVisits: db.siteVisits });
});

app.put('/api/admin/site-visits/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, assignedEstimator, technicianNotes } = req.body;
  const visit = db.siteVisits.find(v => v.id === id || v.ticketNumber === id);
  if (!visit) return res.status(404).json({ success: false, message: 'Ticket not found' });
  if (status) visit.status = status;
  if (assignedEstimator) visit.assignedEstimator = assignedEstimator;
  if (technicianNotes) visit.technicianNotes = technicianNotes;
  saveDB(db);
  res.json({ success: true, siteVisit: visit });
});

// 7. B2B & CONTRACTOR QUOTE REQUESTS API
app.post('/api/quotes', (req: Request, res: Response) => {
  try {
    const {
      companyName,
      fullName,
      phone,
      email,
      city,
      projectType,
      areaSqFt,
      materialPreferences,
      estimatedBudget,
      timeline,
      notes,
      fileAttachment
    } = req.body;

    if (!fullName || !phone || !email || !areaSqFt) {
      return res.status(400).json({ success: false, message: 'Please provide full contact details and estimated project area' });
    }

    db.counters.quoteNumber += 1;
    const quoteNumber = `QT-2026-${String(db.counters.quoteNumber).padStart(6, '0')}`;

    const newQuote: QuoteRequest = {
      id: `qt-${Date.now()}`,
      quoteNumber,
      createdAt: new Date().toISOString(),
      companyName,
      fullName,
      phone,
      email,
      city: city || 'Karachi',
      projectType: projectType || 'Commercial Office',
      areaSqFt: Number(areaSqFt),
      materialPreferences: Array.isArray(materialPreferences) ? materialPreferences : [materialPreferences || 'SPC Vinyl'],
      estimatedBudget,
      timeline: timeline || 'Within 30 Days',
      notes: notes || '',
      fileAttachment,
      status: 'New'
    };

    db.quotes.unshift(newQuote);
    saveDB(db);

    res.json({ success: true, quote: newQuote });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/quotes/:quoteNumber', (req: Request, res: Response) => {
  const { quoteNumber } = req.params;
  const quote = db.quotes.find(q => q.quoteNumber.toLowerCase() === quoteNumber.toLowerCase() || q.id === quoteNumber);
  if (!quote) return res.status(404).json({ success: false, message: 'Quote request not found' });
  res.json({ success: true, quote });
});

app.get('/api/admin/quotes', (req: Request, res: Response) => {
  res.json({ success: true, quotes: db.quotes });
});

app.put('/api/admin/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, proposedQuoteAmount, quotationNotes } = req.body;
  const quote = db.quotes.find(q => q.id === id || q.quoteNumber === id);
  if (!quote) return res.status(404).json({ success: false, message: 'Quote request not found' });
  if (status) quote.status = status;
  if (proposedQuoteAmount !== undefined) quote.proposedQuoteAmount = Number(proposedQuoteAmount);
  if (quotationNotes) quote.quotationNotes = quotationNotes;
  saveDB(db);
  res.json({ success: true, quote });
});

// 8. COUPONS API
app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, orderAmount } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Please enter a coupon code' });

  const coupon = db.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid coupon code. Try NEWFLOOR10 for 10% off.' });
  }

  const amt = Number(orderAmount) || 0;
  if (amt < coupon.minOrderAmount) {
    return res.status(400).json({
      success: false,
      message: `This coupon requires a minimum flooring order of Rs. ${coupon.minOrderAmount.toLocaleString('en-PK')}`
    });
  }

  const discount = coupon.discountType === 'percentage'
    ? Math.round((amt * coupon.discountValue) / 100)
    : coupon.discountValue;

  res.json({
    success: true,
    coupon: {
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discount,
      description: coupon.description
    }
  });
});

app.get('/api/admin/coupons', (req: Request, res: Response) => {
  res.json({ success: true, coupons: db.coupons });
});

app.post('/api/admin/coupons', (req: Request, res: Response) => {
  const newCoup: Coupon = {
    ...req.body,
    id: `coup-${Date.now()}`,
    code: req.body.code.toUpperCase()
  };
  db.coupons.push(newCoup);
  saveDB(db);
  res.json({ success: true, coupon: newCoup });
});

app.delete('/api/admin/coupons/:id', (req: Request, res: Response) => {
  db.coupons = db.coupons.filter(c => c.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// 9. REVIEWS API
app.get('/api/reviews/:productId', (req: Request, res: Response) => {
  const reviews = db.reviews.filter(r => r.productId === req.params.productId);
  res.json({ success: true, reviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { productId, productTitle, author, location, rating, comment, projectPhotoUrl } = req.body;
  if (!productId || !author || !comment) {
    return res.status(400).json({ success: false, message: 'All review fields are required' });
  }
  const newRev: Review = {
    id: `rev-${Date.now()}`,
    productId,
    productTitle: productTitle || 'Flooring Collection',
    author,
    location: location || 'Karachi, Pakistan',
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    comment,
    verifiedPurchase: true,
    projectPhotoUrl
  };
  db.reviews.unshift(newRev);

  // Update product average rating
  const p = db.products.find(prod => prod.id === productId);
  if (p) {
    p.reviewCount += 1;
    const allProdReviews = db.reviews.filter(r => r.productId === productId);
    const avg = allProdReviews.reduce((acc, curr) => acc + curr.rating, 0) / allProdReviews.length;
    p.rating = Number(avg.toFixed(1));
  }

  saveDB(db);
  res.json({ success: true, review: newRev });
});

// 10. BLOG & FAQS
app.get('/api/blog', (req: Request, res: Response) => {
  res.json({ success: true, blogs: db.blogs });
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const post = db.blogs.find(b => b.slug === req.params.slug || b.id === req.params.slug);
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, post });
});

app.get('/api/faqs', (req: Request, res: Response) => {
  res.json({ success: true, faqs: db.faqs });
});

// 11. CONTACT MESSAGES
app.post('/api/contact', (req: Request, res: Response) => {
  const { fullName, phone, email, subject, message } = req.body;
  if (!fullName || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone, and message are required' });
  }
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    fullName,
    phone,
    email: email || '',
    subject: subject || 'General Showroom Inquiry',
    message,
    status: 'new'
  };
  db.messages.unshift(newMsg);
  saveDB(db);
  res.json({ success: true, message: 'Inquiry received. Our DHA showroom team will contact you shortly.' });
});

app.get('/api/admin/messages', (req: Request, res: Response) => {
  res.json({ success: true, messages: db.messages });
});

// 12. ADMIN STATS
app.get('/api/admin/stats', (req: Request, res: Response) => {
  const totalRevenue = db.orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' || o.paymentStatus === 'verified' ? o.total : 0), 0);
  const totalOrders = db.orders.length;
  const pendingOrders = db.orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const pendingSiteVisits = db.siteVisits.filter(v => v.status === 'Requested' || v.status === 'Scheduled').length;
  const pendingQuotes = db.quotes.filter(q => q.status === 'New' || q.status === 'Under Review').length;
  const pendingSamples = db.sampleOrders.filter(s => s.status === 'Received').length;

  const lowStockProducts = db.products
    .filter(p => p.stockBoxes <= 45)
    .map(p => ({
      id: p.id,
      title: p.title,
      sku: p.sku,
      stockBoxes: p.stockBoxes,
      coveragePerBox: p.coveragePerBox,
      totalRemainingSqFt: p.stockBoxes * p.coveragePerBox
    }));

  const totalBoxesInStock = db.products.reduce((acc, p) => acc + p.stockBoxes, 0);
  const totalSqFtValuation = db.products.reduce((acc, p) => acc + (p.stockBoxes * p.coveragePerBox * p.pricePerSqFt), 0);

  res.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders,
      pendingOrders,
      pendingSiteVisits,
      pendingQuotes,
      pendingSamples,
      totalBoxesInStock,
      totalSqFtValuation,
      lowStockProducts,
      recentOrders: db.orders.slice(0, 5),
      recentSiteVisits: db.siteVisits.slice(0, 5),
      recentQuotes: db.quotes.slice(0, 5)
    }
  });
});

// 13. SETTINGS API
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, settings: db.settings });
});

app.put('/api/settings', (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDB(db);
  res.json({ success: true, settings: db.settings });
});

// 14. AUTH (Simple session / role simulation)
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());

  if (user) {
    return res.json({
      success: true,
      token: `jwt-token-${user.id}-${Date.now()}`,
      user
    });
  }

  // fallback demo admin
  if (email === 'admin@firstfloorfloorings.pk' || email === 'admin') {
    const adminUser = db.users[0];
    return res.json({
      success: true,
      token: `jwt-token-admin-${Date.now()}`,
      user: adminUser
    });
  }

  // fallback customer login
  const newCust: User = {
    id: `usr-${Date.now()}`,
    name: email.split('@')[0],
    email,
    phone: '0321-0000000',
    role: 'customer'
  };
  db.users.push(newCust);
  saveDB(db);

  res.json({
    success: true,
    token: `jwt-token-${newCust.id}-${Date.now()}`,
    user: newCust
  });
});

// Mount Vite middleware for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`First Floor Floorings Architectural Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
