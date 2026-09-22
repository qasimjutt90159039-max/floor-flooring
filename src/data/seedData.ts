import {
  Category,
  Product,
  Review,
  Question,
  Coupon,
  BlogPost,
  FAQ,
  Order,
  SiteVisitRequest,
  QuoteRequest,
  SampleOrder
} from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-spc',
    name: 'Vinyl (SPC/WPC) Flooring',
    slug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    iconName: 'Droplets',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
    description: '100% waterproof Stone Plastic Composite with attached IXPE acoustic pad. Ideal for kitchens, bathrooms, and high-traffic Karachi homes.',
    itemCount: 8,
    productCount: 8,
    startingPriceSqFt: 185
  },
  {
    id: 'cat-laminate',
    name: 'Laminate Flooring',
    slug: 'laminate-flooring',
    materialType: 'Laminate',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop',
    description: 'High-density German & Swiss technology AC4/AC5 laminate with scratch-resistant overlay and EIR textured woodgrain.',
    itemCount: 6,
    productCount: 6,
    startingPriceSqFt: 125
  },
  {
    id: 'cat-eng-wood',
    name: 'Engineered Wood',
    slug: 'engineered-wood',
    materialType: 'Engineered Wood',
    iconName: 'TreePine',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    description: 'Multi-ply cross-engineered stability with real European Oak or American Walnut veneer. Dimensionally stable for Karachi humidity.',
    itemCount: 5,
    productCount: 5,
    startingPriceSqFt: 450
  },
  {
    id: 'cat-hardwood',
    name: 'Solid Hardwood',
    slug: 'solid-hardwood',
    materialType: 'Solid Hardwood',
    iconName: 'Shield',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
    description: 'Precious solid timber including Burmese Teak, Sheesham, and White Oak. Sandable and refinishable for generations.',
    itemCount: 4,
    productCount: 4,
    startingPriceSqFt: 750
  },
  {
    id: 'cat-wooden',
    name: 'Wooden Flooring',
    slug: 'wooden-flooring',
    materialType: 'Laminate',
    iconName: 'Square',
    image: 'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=800&auto=format&fit=crop',
    description: 'Architectural plank designs in chevron, herringbone, and straight natural grain palettes.',
    itemCount: 4,
    productCount: 4,
    startingPriceSqFt: 145
  },
  {
    id: 'cat-carpet-tiles',
    name: 'Carpet Tiles & Rugs',
    slug: 'carpet-tiles-rugs',
    materialType: 'Carpet Tiles',
    iconName: 'Grid',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    description: 'Commercial 50x50cm modular carpet tiles with bitumen backing for corporate suites, offices, and study spaces.',
    itemCount: 3,
    productCount: 3,
    startingPriceSqFt: 110
  },
  {
    id: 'cat-grass',
    name: 'Artificial Grass',
    slug: 'artificial-grass',
    materialType: 'Artificial Grass',
    iconName: 'Flower2',
    image: 'https://images.unsplash.com/photo-1533460004989-acf29222453b?q=80&w=800&auto=format&fit=crop',
    description: 'Lush 30mm & 40mm 4-tone UV-stabilised landscape turf for DHA rooftops, balconies, terraces, and lawn perimeters.',
    itemCount: 3,
    productCount: 3,
    startingPriceSqFt: 95
  },
  {
    id: 'cat-decking',
    name: 'Outdoor Decking',
    slug: 'outdoor-decking',
    materialType: 'Outdoor Decking',
    iconName: 'Sun',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    description: 'Weatherproof Wood Plastic Composite (WPC) decking tiles and hollow/solid profile planks for poolside & patios.',
    itemCount: 3,
    productCount: 3,
    startingPriceSqFt: 380
  },
  {
    id: 'cat-wall-panels',
    name: 'Wall Panels',
    slug: 'wall-panels',
    materialType: 'Wall Panels',
    iconName: 'LayoutTemplate',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    description: 'Fluted WPC and acoustic wooden slat panels for TV feature walls, bed backdrops, and executive boardrooms.',
    itemCount: 3,
    productCount: 3,
    startingPriceSqFt: 220
  },
  {
    id: 'cat-skirting',
    name: 'PVC Skirting & Beading',
    slug: 'pvc-skirting-beading',
    materialType: 'Skirting & Accessories',
    iconName: 'Maximize2',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    description: 'Moisture-proof 70mm & 100mm skirtings with integrated wire management channel, T-moldings, and reducer profiles.',
    itemCount: 3,
    productCount: 3,
    startingPriceSqFt: 85
  },
  {
    id: 'cat-underlayment',
    name: 'Underlayment & Accessories',
    slug: 'underlayment-accessories',
    materialType: 'Skirting & Accessories',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    description: 'High-density 2mm/3mm IXPE acoustic moisture barrier, aluminum stair nosing, and transition thresholds.',
    itemCount: 2,
    productCount: 2,
    startingPriceSqFt: 35
  }
];

export const initialProducts: Product[] = [
  // 1. SPC Vinyl
  {
    id: 'prod-spc-1',
    title: 'Nordic Oak 5.5mm Waterproof SPC Vinyl Plank',
    slug: 'nordic-oak-5-5mm-waterproof-spc-vinyl',
    sku: 'SPC-ND-001',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Embossed in Register (EIR)',
    thickness: '5.5mm (4.5mm Core + 1mm IXPE Pad)',
    wearLayer: '0.5mm Commercial Grade',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office & Commercial'],
    pricePerSqFt: 245,
    pricePerBox: 5880,
    coveragePerBox: 24.0,
    planksPerBox: 10,
    stockBoxes: 180,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
    ],
    swatchImages: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=300&auto=format&fit=crop'
    ],
    roomMockups: [
      {
        roomType: 'Living Room',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
        description: 'Bright coastal salon with Nordic Oak SPC'
      },
      {
        roomType: 'Kitchen',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
        description: '100% waterproof installation in open kitchen'
      }
    ],
    specs: {
      material: 'Virgin Limestone & PVC Rigid Core (SPC)',
      thickness: '5.5mm',
      wearLayer: '0.50mm with UV Ceramic Coating',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '1220mm x 180mm x 5.5mm',
      warrantyYears: 25,
      soundInsulation: '21dB with pre-attached IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'German Tech Licensed Manufacturing'
    },
    features: [
      '100% waterproof for Karachi kitchens & washroom vanities',
      'Uniclic locking system for seamless glue-free fitting',
      'Pre-attached IXPE underlay dampens footstep echo',
      'Scratch & pet resistant ceramic bead wear layer'
    ],
    description: 'The Nordic Oak SPC vinyl plank pairs serene Scandinavian blonde tones with unmatched heavy-traffic durability. Built from virgin limestone composite, it will not swell, buckle, or warp under Karachi humid coastal summers.',
    variants: [
      {
        id: 'var-no-light',
        name: 'Nordic Oak - Natural Blonde',
        colorName: 'Natural Blonde',
        colorHex: '#dfd2bc',
        thickness: '5.5mm',
        pricePerSqFt: 245,
        pricePerBox: 5880,
        coveragePerBox: 24.0,
        sku: 'SPC-ND-001-BLD',
        stockBoxes: 120,
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
        roomMockupImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'var-no-grey',
        name: 'Nordic Oak - Bleached Ash Grey',
        colorName: 'Bleached Ash Grey',
        colorHex: '#c2bcb3',
        thickness: '5.5mm',
        pricePerSqFt: 250,
        pricePerBox: 6000,
        coveragePerBox: 24.0,
        sku: 'SPC-ND-001-GRY',
        stockBoxes: 60,
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop',
        roomMockupImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 38,
    tags: ['waterproof', 'spc vinyl', 'nordic oak', 'kitchen', 'dha karachi']
  },

  // 2. SPC Herringbone
  {
    id: 'prod-spc-2',
    title: 'Smoked Walnut Herringbone SPC Luxury Vinyl',
    slug: 'smoked-walnut-herringbone-spc-luxury-vinyl',
    sku: 'SPC-HB-002',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Deep Woodgrain',
    thickness: '6.0mm (5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.55mm Ultra Shield',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 295,
    pricePerBox: 5310,
    coveragePerBox: 18.0,
    planksPerBox: 24,
    stockBoxes: 95,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Precision Left & Right Click SPC Herringbone',
      thickness: '6.0mm',
      wearLayer: '0.55mm Commercial',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '600mm x 125mm x 6.0mm',
      warrantyYears: 25,
      soundInsulation: '22dB',
      underlaymentAttached: true,
      edgeProfile: 'Painted Bevel 4V',
      origin: 'European Design Standards'
    },
    features: [
      'Classical 90-degree Parisian herringbone parquet aesthetic',
      'No messy adhesives needed — engineered click-lock joint',
      'Deep walnut grain with natural color variance',
      'Recommended 15% wastage allowance for precision diagonal cuts'
    ],
    description: 'Elevate your drawing room or executive suite with the timeless grandeur of herringbone parquet. Our Smoked Walnut SPC provides the rich visual depth of aged timber with zero moisture vulnerability.',
    variants: [
      {
        id: 'var-hb-walnut',
        name: 'Smoked Walnut Herringbone',
        colorName: 'Smoked Walnut',
        colorHex: '#483526',
        thickness: '6.0mm',
        pricePerSqFt: 295,
        pricePerBox: 5310,
        coveragePerBox: 18.0,
        sku: 'SPC-HB-002-SMK',
        stockBoxes: 95,
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 22,
    tags: ['herringbone', 'spc vinyl', 'walnut', 'luxury living room']
  },

  // 3. German Laminate
  {
    id: 'prod-lam-1',
    title: 'Bavarian Oak 12mm AC5 Commercial Laminate',
    slug: 'bavarian-oak-12mm-ac5-commercial-laminate',
    sku: 'LAM-BV-003',
    category: 'Laminate Flooring',
    categorySlug: 'laminate-flooring',
    materialType: 'Laminate',
    finish: 'Embossed in Register (EIR)',
    thickness: '12mm High Density HDF',
    wearLayer: 'AC5 Commercial Heavy Traffic',
    waterResistance: 'Water Resistant 72hr',
    warrantyYears: 20,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 185,
    pricePerBox: 4070,
    coveragePerBox: 22.0,
    planksPerBox: 8,
    stockBoxes: 240,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Swell-Resistant HydroPlus High-Density Fiberboard (HDF)',
      thickness: '12mm',
      wearLayer: 'AC5 (Commercial Rating EN 13329)',
      waterResistance: 'Water Resistant 72hr',
      installationMethod: 'Click-Lock',
      dimensions: '1215mm x 195mm x 12mm',
      warrantyYears: 20,
      soundInsulation: 'Solid footstep sensation like real timber',
      underlaymentAttached: false,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'German Technology'
    },
    features: [
      'Solid 12mm heft creates authentic underfoot timber feel',
      'AC5 rating withstands heavy furniture, stiletto heels, and pets',
      'Wax-impregnated V-grooves resist standing spillages up to 72 hours',
      'Authentic Synchronized Woodgrain texture aligns with visual knots'
    ],
    description: 'Engineered for high-end residential projects and bustling boutique offices. The 12mm Bavarian Oak delivers unmatched solid acoustic feedback with an AC5 commercial resistance rating.',
    variants: [
      {
        id: 'var-bv-honey',
        name: 'Bavarian Oak - Honey Amber',
        colorName: 'Honey Amber',
        colorHex: '#c79c6e',
        thickness: '12mm',
        pricePerSqFt: 185,
        pricePerBox: 4070,
        coveragePerBox: 22.0,
        sku: 'LAM-BV-003-HNY',
        stockBoxes: 140,
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-bv-espresso',
        name: 'Bavarian Oak - Roasted Espresso',
        colorName: 'Roasted Espresso',
        colorHex: '#3a2d25',
        thickness: '12mm',
        pricePerSqFt: 190,
        pricePerBox: 4180,
        coveragePerBox: 22.0,
        sku: 'LAM-BV-003-ESP',
        stockBoxes: 100,
        image: 'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.8,
    reviewCount: 45,
    tags: ['german laminate', '12mm', 'ac5', 'durable', 'office']
  },

  // 4. Engineered Hardwood
  {
    id: 'prod-eng-1',
    title: 'European White Oak 15mm Engineered Plank',
    slug: 'european-white-oak-15mm-engineered-plank',
    sku: 'ENG-EWO-004',
    category: 'Engineered Wood',
    categorySlug: 'engineered-wood',
    materialType: 'Engineered Wood',
    finish: 'Brushed Oil',
    thickness: '15mm (4mm Real Oak Top Layer + Multi-Ply Birch Core)',
    wearLayer: '4mm European White Oak Veneer',
    waterResistance: 'Moisture Resistant',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 620,
    pricePerBox: 12400,
    coveragePerBox: 20.0,
    planksPerBox: 6,
    stockBoxes: 70,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: '11-ply Cross-Glued Russian Birch Core with Select European Oak',
      thickness: '15mm (1800mm Long Planks)',
      wearLayer: '4mm Solid Oak Wear Layer (Can be sanded 3 times)',
      waterResistance: 'Moisture Resistant',
      installationMethod: 'Tongue & Groove',
      dimensions: '1800mm x 190mm x 15mm',
      warrantyYears: 25,
      soundInsulation: 'Natural Acoustic Damping',
      underlaymentAttached: false,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'European Raw Timber'
    },
    features: [
      'Authentic European White Oak surface with wire-brushed natural texture',
      'Generous 1800mm (6-foot) architectural lengths create sweeping sightlines',
      'Stable multi-ply substrate will not warp in Karachi marine humidity',
      'Matte UV lacquer preserves natural tactile wood feel'
    ],
    description: 'The definitive architectural choice for DHA Phase 5 & 6 luxury residences. Crafted from authentic slow-grown European White Oak, every plank displays graceful organic grain that deepens in warmth over decades.',
    variants: [
      {
        id: 'var-ewo-sand',
        name: 'European Oak - Raw Sand Natural',
        colorName: 'Raw Sand Natural',
        colorHex: '#d8ccb8',
        thickness: '15mm',
        pricePerSqFt: 620,
        pricePerBox: 12400,
        coveragePerBox: 20.0,
        sku: 'ENG-EWO-004-SND',
        stockBoxes: 45,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-ewo-caramel',
        name: 'European Oak - Warm Caramel',
        colorName: 'Warm Caramel',
        colorHex: '#a07855',
        thickness: '15mm',
        pricePerSqFt: 640,
        pricePerBox: 12800,
        coveragePerBox: 20.0,
        sku: 'ENG-EWO-004-CRM',
        stockBoxes: 25,
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 19,
    tags: ['engineered wood', 'european oak', 'luxury', 'architectural', 'dha karachi']
  },

  // 5. Solid Hardwood (Burmese Teak)
  {
    id: 'prod-hard-1',
    title: 'Golden Burmese Teak 18mm Solid Timber Plank',
    slug: 'golden-burmese-teak-18mm-solid-timber-plank',
    sku: 'SLD-TEAK-005',
    category: 'Solid Hardwood',
    categorySlug: 'solid-hardwood',
    materialType: 'Solid Hardwood',
    finish: 'Smooth Silk',
    thickness: '18mm Solid Natural Hardwood',
    wearLayer: '18mm 100% Solid Timber',
    waterResistance: 'Moisture Resistant',
    warrantyYears: 30,
    roomSuitability: ['Living Room', 'Bedroom'],
    pricePerSqFt: 890,
    pricePerBox: 14240,
    coveragePerBox: 16.0,
    planksPerBox: 8,
    stockBoxes: 40,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: '100% Solid Kiln-Dried Burmese Teak',
      thickness: '18mm',
      wearLayer: 'Full Depth Solid Teak',
      waterResistance: 'Natural Oil Moisture Resistance',
      installationMethod: 'Tongue & Groove',
      dimensions: '900mm-1200mm x 120mm x 18mm',
      warrantyYears: 30,
      soundInsulation: 'Heirloom Timber Mass',
      underlaymentAttached: false,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'Imported Grade A Teak'
    },
    features: [
      'High natural teak oils offer natural resistance to moisture and insects',
      'True generational investment — can be re-sanded and refinished 5+ times',
      'Rich golden brown hue develops a glorious patina over time',
      'Master installation with acclimatization protocol in Karachi'
    ],
    description: 'The pinnacle of luxury flooring in Pakistan. Solid Golden Burmese Teak brings natural wood resins and timeless dignity to executive residences, embassies, and distinguished family estates.',
    variants: [
      {
        id: 'var-teak-gold',
        name: 'Burmese Teak - Golden Satin',
        colorName: 'Golden Satin',
        colorHex: '#8b5a2b',
        thickness: '18mm',
        pricePerSqFt: 890,
        pricePerBox: 14240,
        coveragePerBox: 16.0,
        sku: 'SLD-TEAK-005-GLD',
        stockBoxes: 40,
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 14,
    tags: ['solid wood', 'burmese teak', 'heirloom', 'luxury flooring', 'dha']
  },

  // 6. Carpet Tiles
  {
    id: 'prod-carpet-1',
    title: 'Monolith Architectural Commercial Carpet Tiles 50x50cm',
    slug: 'monolith-architectural-commercial-carpet-tiles-50x50cm',
    sku: 'CPT-MN-006',
    category: 'Carpet Tiles & Rugs',
    categorySlug: 'carpet-tiles-rugs',
    materialType: 'Carpet Tiles',
    finish: 'Stone Textured',
    thickness: '6.5mm with Heavy Bitumen Backing',
    wearLayer: 'Solution Dyed Nylon (Anti-Static)',
    waterResistance: 'Moisture Resistant',
    warrantyYears: 15,
    roomSuitability: ['Office & Commercial', 'Living Room', 'Bedroom'],
    pricePerSqFt: 135,
    pricePerBox: 7290,
    coveragePerBox: 54.0,
    planksPerBox: 20,
    stockBoxes: 150,
    inStock: true,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: '100% Solution-Dyed Nylon with Modified Bitumen & Glass Fiber Base',
      thickness: '6.5mm',
      waterResistance: 'Stain & Spill Guard',
      installationMethod: 'Interlocking',
      dimensions: '500mm x 500mm (20 tiles/box = 5.0 sqm = 54 sq ft)',
      warrantyYears: 15,
      soundInsulation: '28dB Acoustic Noise Reduction',
      underlaymentAttached: true,
      origin: 'Commercial Contract Spec'
    },
    features: [
      'Acoustic sound dampening absorbs typing, chatter, and footstep reverberation',
      'Individual tile replacement if accidental spills or stains occur',
      'Caster chair and rolling trolley certified without snagging',
      'Anti-microbial and low VOC for healthy indoor air quality'
    ],
    description: 'Designed for high-performance corporate offices, legal chambers, and media rooms in Karachi. The Monolith Carpet Tile delivers superior acoustic comfort and modern linear texture.',
    variants: [
      {
        id: 'var-cpt-charcoal',
        name: 'Monolith - Architectural Charcoal',
        colorName: 'Architectural Charcoal',
        colorHex: '#333538',
        thickness: '6.5mm',
        pricePerSqFt: 135,
        pricePerBox: 7290,
        coveragePerBox: 54.0,
        sku: 'CPT-MN-006-CHR',
        stockBoxes: 90,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-cpt-slate',
        name: 'Monolith - Concrete Slate Grey',
        colorName: 'Concrete Slate Grey',
        colorHex: '#5c6066',
        thickness: '6.5mm',
        pricePerSqFt: 135,
        pricePerBox: 7290,
        coveragePerBox: 54.0,
        sku: 'CPT-MN-006-SLT',
        stockBoxes: 60,
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.8,
    reviewCount: 31,
    tags: ['carpet tiles', 'office flooring', 'acoustic', 'commercial', 'karachi']
  },

  // 7. Artificial Grass
  {
    id: 'prod-grass-1',
    title: 'Emerald Luxury 40mm 4-Tone Artificial Landscape Turf',
    slug: 'emerald-luxury-40mm-4-tone-artificial-landscape-turf',
    sku: 'GRS-EMD-007',
    category: 'Artificial Grass',
    categorySlug: 'artificial-grass',
    materialType: 'Artificial Grass',
    finish: 'Stone Textured',
    thickness: '40mm Pile Height',
    wearLayer: 'UV Resistant C-Shape Fiber',
    waterResistance: 'Weatherproof Outdoor',
    warrantyYears: 10,
    roomSuitability: ['Outdoor / Terrace'],
    pricePerSqFt: 115,
    pricePerBox: 5750,
    coveragePerBox: 50.0,
    planksPerBox: 1, // roll section
    stockBoxes: 110,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1533460004989-acf29222453b?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533460004989-acf29222453b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'UV-Stabilized Polyethylene & Polypropylene 4-Tone Thatch',
      thickness: '40mm Lush Pile Height',
      waterResistance: 'Rapid Perforated Drainage 60 Liters/min/sqm',
      installationMethod: 'Interlocking',
      dimensions: '2m Wide Continuous Rolls (Cut to Sq Ft)',
      warrantyYears: 10,
      soundInsulation: 'Soft Tactile Cushioning',
      origin: 'European UV Tested'
    },
    features: [
      '4-tone color blend mimics natural springtime Bermuda grass',
      'C-shaped blade memory prevents matting under foot traffic',
      'Perforated latex backing drains monsoon rain immediately',
      'Zero watering, mowing, or fertilizer needed'
    ],
    description: 'Transform DHA rooftops, courtyard terraces, and villa balconies into vibrant green sanctuaries. Our 40mm Emerald Luxury turf stays cool under Karachi sun and requires zero maintenance.',
    variants: [
      {
        id: 'var-grs-40',
        name: 'Emerald Luxury 40mm',
        colorName: 'Lush 4-Tone Green',
        colorHex: '#2d6a3b',
        thickness: '40mm',
        pricePerSqFt: 115,
        pricePerBox: 5750,
        coveragePerBox: 50.0,
        sku: 'GRS-EMD-007-40',
        stockBoxes: 110,
        image: 'https://images.unsplash.com/photo-1533460004989-acf29222453b?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 27,
    tags: ['artificial grass', 'terrace', 'rooftop lawn', 'outdoor', 'karachi']
  },

  // 8. Outdoor WPC Decking
  {
    id: 'prod-deck-1',
    title: 'Composite WPC Teak Outdoor Decking 25mm Hollow Plank',
    slug: 'composite-wpc-teak-outdoor-decking-25mm-hollow-plank',
    sku: 'DCK-TEAK-008',
    category: 'Outdoor Decking',
    categorySlug: 'outdoor-decking',
    materialType: 'Outdoor Decking',
    finish: 'Deep Woodgrain',
    thickness: '25mm Heavy Duty Composite',
    wearLayer: 'Anti-Slip Dual Grooved / Woodgrain',
    waterResistance: 'Weatherproof Outdoor',
    warrantyYears: 15,
    roomSuitability: ['Outdoor / Terrace'],
    pricePerSqFt: 420,
    pricePerBox: 8400,
    coveragePerBox: 20.0,
    planksPerBox: 6,
    stockBoxes: 80,
    inStock: true,
    thumbnail: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533460004989-acf29222453b?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: '60% Recycled Wood Fiber + 35% HDPE + 5% UV Blockers',
      thickness: '25mm x 140mm x 2200mm',
      waterResistance: '100% Weather & Rot Proof',
      installationMethod: 'Interlocking',
      dimensions: '2200mm x 140mm x 25mm',
      warrantyYears: 15,
      edgeProfile: 'Hidden Clip Side Grooves',
      origin: 'Commercial Exterior Spec'
    },
    features: [
      'Will never rot, splinter, warp, or require annual varnish',
      'Dual sided: natural woodgrain face on one side, linear anti-slip on other',
      'Hidden clip fastening system leaves clean, screw-free walkway',
      'Ideal for poolside, seaside balconies, and barbecue decks'
    ],
    description: 'Engineered specifically for coastal humidity and intense sea breeze. Our WPC Composite Decking offers the serene look of hardwood decking without the splintering, oiling, or termite danger.',
    variants: [
      {
        id: 'var-dck-teak',
        name: 'WPC Decking - Warm Teak',
        colorName: 'Warm Teak',
        colorHex: '#8b4513',
        thickness: '25mm',
        pricePerSqFt: 420,
        pricePerBox: 8400,
        coveragePerBox: 20.0,
        sku: 'DCK-TEAK-008-TK',
        stockBoxes: 45,
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-dck-charcoal',
        name: 'WPC Decking - Graphite Charcoal',
        colorName: 'Graphite Charcoal',
        colorHex: '#2b2c2f',
        thickness: '25mm',
        pricePerSqFt: 430,
        pricePerBox: 8600,
        coveragePerBox: 20.0,
        sku: 'DCK-TEAK-008-CHR',
        stockBoxes: 35,
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 16,
    tags: ['outdoor decking', 'wpc decking', 'terrace', 'swimming pool', 'karachi']
  },

  // 9. Wall Panels
  {
    id: 'prod-wall-1',
    title: 'Acoustic Fluted Walnut Charcoal WPC Wall Panel',
    slug: 'acoustic-fluted-walnut-charcoal-wpc-wall-panel',
    sku: 'WAL-FLT-009',
    category: 'Wall Panels',
    categorySlug: 'wall-panels',
    materialType: 'Wall Panels',
    finish: 'Deep Woodgrain',
    thickness: '18mm Fluted Slat Height',
    wearLayer: 'Matte Architectural Veneer',
    waterResistance: '100% Waterproof',
    warrantyYears: 15,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 260,
    pricePerBox: 6240,
    coveragePerBox: 24.0,
    planksPerBox: 6,
    stockBoxes: 85,
    inStock: true,
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Rigid High-Density Co-Extruded Composite',
      thickness: '18mm Fluted Profile x 160mm Wide x 2900mm Ceiling Height',
      waterResistance: '100% Waterproof & Termite Proof',
      installationMethod: 'Interlocking',
      dimensions: '2900mm x 160mm x 18mm',
      warrantyYears: 15,
      origin: 'Modern Architectural Spec'
    },
    features: [
      'Vertical fluted rhythm adds instant ceiling height and luxury shadow lines',
      'Tongue and groove interlock conceals all nails and fixings',
      '100% waterproof — unlike MDF, will never swell or rot on exterior walls',
      'Full 9.5-foot (2900mm) length covers standard ceiling height in one piece'
    ],
    description: 'The preferred design choice of top Pakistani architects for TV consoles, master bedroom bedheads, and reception lobbies. The 18mm fluted shadow gaps create striking architectural depth.',
    variants: [
      {
        id: 'var-wall-walnut',
        name: 'Fluted Panel - Dark Walnut',
        colorName: 'Dark Walnut',
        colorHex: '#3c2b1e',
        thickness: '18mm',
        pricePerSqFt: 260,
        pricePerBox: 6240,
        coveragePerBox: 24.0,
        sku: 'WAL-FLT-009-WLN',
        stockBoxes: 50,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-wall-oak',
        name: 'Fluted Panel - Natural Light Oak',
        colorName: 'Natural Light Oak',
        colorHex: '#cfbda1',
        thickness: '18mm',
        pricePerSqFt: 260,
        pricePerBox: 6240,
        coveragePerBox: 24.0,
        sku: 'WAL-FLT-009-OAK',
        stockBoxes: 35,
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 29,
    tags: ['wall panel', 'fluted panel', 'tv wall', 'charcoal', 'interior design']
  },

  // 10. PVC Skirting
  {
    id: 'prod-skirt-1',
    title: 'Waterproof PVC Skirting Board 100mm with Cable Duct',
    slug: 'waterproof-pvc-skirting-board-100mm-with-cable-duct',
    sku: 'SKR-PVC-010',
    category: 'PVC Skirting & Beading',
    categorySlug: 'pvc-skirting-beading',
    materialType: 'Skirting & Accessories',
    finish: 'Matte',
    thickness: '100mm Height x 15mm Depth',
    wearLayer: 'High Impact Resistant PVC',
    waterResistance: '100% Waterproof',
    warrantyYears: 20,
    roomSuitability: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office & Commercial'],
    pricePerSqFt: 95,
    pricePerBox: 3800,
    coveragePerBox: 40.0, // running feet
    planksPerBox: 5,
    stockBoxes: 200,
    inStock: true,
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: '100% Virgin High-Impact Waterproof PVC',
      thickness: '100mm (4 inches) Height x 2400mm Length',
      waterResistance: '100% Waterproof',
      installationMethod: 'Interlocking',
      dimensions: '2400mm x 100mm x 15mm',
      warrantyYears: 20,
      origin: 'European Profile Mold'
    },
    features: [
      'Integrated rear channel hides telephone, internet, and speaker cables',
      'Flexible rubber sealing lips on top & bottom seal against uneven walls',
      '100% waterproof — unlike wooden skirting, damp walls will never cause rot',
      'Matching corner blocks and end caps available'
    ],
    description: 'The clean finishing detail for any flooring installation. The 100mm profile features an internal raceway to conceal unsightly wires and an elastomeric seal that prevents dust buildup.',
    variants: [
      {
        id: 'var-skr-white',
        name: 'PVC Skirting 100mm - Matte Architectural White',
        colorName: 'Matte White',
        colorHex: '#ffffff',
        thickness: '100mm',
        pricePerSqFt: 95,
        pricePerBox: 3800,
        coveragePerBox: 40.0,
        sku: 'SKR-PVC-010-WHT',
        stockBoxes: 120,
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-skr-walnut',
        name: 'PVC Skirting 100mm - Smoked Walnut Match',
        colorName: 'Smoked Walnut Match',
        colorHex: '#3a2b1f',
        thickness: '100mm',
        pricePerSqFt: 105,
        pricePerBox: 4200,
        coveragePerBox: 40.0,
        sku: 'SKR-PVC-010-WLN',
        stockBoxes: 80,
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 33,
    tags: ['skirting', 'pvc skirting', 'cable duct', 'waterproof beading']
  },

  // 11. Underlayment
  {
    id: 'prod-und-1',
    title: 'Acoustic SoundGuard 3mm High-Density IXPE Underlayment',
    slug: 'acoustic-soundguard-3mm-high-density-ixpe-underlayment',
    sku: 'UND-IXP-011',
    category: 'Underlayment & Accessories',
    categorySlug: 'underlayment-accessories',
    materialType: 'Skirting & Accessories',
    finish: 'Smooth Silk',
    thickness: '3.0mm with Gold Vapor Foil',
    wearLayer: 'Closed Cell Cross-Linked Foam',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 45,
    pricePerBox: 4500,
    coveragePerBox: 100.0,
    planksPerBox: 1, // 100 sq ft roll
    stockBoxes: 140,
    inStock: true,
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Irradiated Cross-Linked Polyethylene (IXPE) with Metallic Vapor Barrier',
      thickness: '3.0mm',
      waterResistance: '100% Moisture Barrier (Zero Permeability)',
      installationMethod: 'Interlocking',
      dimensions: '1m x 10m Roll (100 sq ft)',
      warrantyYears: 25,
      soundInsulation: '23dB Impact Sound Reduction (IIC 72)',
      origin: 'Acoustic Lab Certified'
    },
    features: [
      'Blocks rising subfloor ground moisture and efflorescence dampness',
      'Heavy 23dB rating eliminates hollow clicking sound under laminate and vinyl',
      'Smoothes minor subfloor imperfections up to 2.5mm',
      'Built-in 3-inch overlap with peel-and-stick adhesive tape'
    ],
    description: 'The critical foundation for any laminate or engineered wood floor in Karachi. Prevents subfloor moisture from reaching your floorboards while silencing footstep echo.',
    variants: [
      {
        id: 'var-und-3mm',
        name: 'SoundGuard IXPE 3mm Roll',
        colorName: 'Black with Gold Foil',
        colorHex: '#1a1a1a',
        thickness: '3.0mm',
        pricePerSqFt: 45,
        pricePerBox: 4500,
        coveragePerBox: 100.0,
        sku: 'UND-IXP-011-3MM',
        stockBoxes: 140,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 25,
    tags: ['underlayment', 'ixpe', 'moisture barrier', 'acoustic', 'soundproofing']
  },

  // 12. Unique Original: French Château Chevron 45° Parquet
  {
    id: 'prod-chevron-1',
    title: 'Château d\'Amboise 45° French Chevron Smoked Oak SPC Plank',
    slug: 'chateau-damboise-45-french-chevron-smoked-oak-spc',
    sku: 'CHV-AMB-012',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Embossed in Register (EIR)',
    thickness: '6.5mm (5.5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.60mm Ultra Diamond Coat',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 320,
    pricePerBox: 5760,
    coveragePerBox: 18.0,
    planksPerBox: 24,
    stockBoxes: 110,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
    ],
    roomMockups: [
      {
        roomType: 'Living Room',
        imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
        description: 'French Chevron laid across a grand reception room'
      }
    ],
    specs: {
      material: 'Precision 45° Left & Right Angled Rigid Core SPC Chevron',
      thickness: '6.5mm',
      wearLayer: '0.60mm Diamond Ceramic Shield',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '600mm x 120mm x 6.5mm (45° Precision Bevel)',
      warrantyYears: 25,
      soundInsulation: '23dB Acoustic IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Painted Bevel 4V',
      origin: 'French Atelier Specification'
    },
    features: [
      'Authentic French 45-degree angle chevron with continuous centerline symmetry',
      'Pairs Parisian architectural majesty with 100% waterproof limestone core',
      'No glues, toxic primers, or sanding required — pure click-lock fitting',
      'Recommended 15% wastage allowance for precision diagonal perimeter cuts'
    ],
    description: 'Direct from Parisian architectural tradition, the Château d\'Amboise Chevron features true 45° angled ends that meet along a pristine razor-sharp centerline. Finished in a warm smoked oak patina with synchronized EIR timber pores.',
    variants: [
      {
        id: 'var-chv-smoked',
        name: 'Château Chevron - Smoked Cognac',
        colorName: 'Smoked Cognac',
        colorHex: '#523a28',
        thickness: '6.5mm',
        pricePerSqFt: 320,
        pricePerBox: 5760,
        coveragePerBox: 18.0,
        sku: 'CHV-AMB-012-SMK',
        stockBoxes: 70,
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-chv-natural',
        name: 'Château Chevron - Parisian Blonde',
        colorName: 'Parisian Blonde',
        colorHex: '#d8ccb5',
        thickness: '6.5mm',
        pricePerSqFt: 320,
        pricePerBox: 5760,
        coveragePerBox: 18.0,
        sku: 'CHV-AMB-012-BLD',
        stockBoxes: 40,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 42,
    tags: ['chevron', 'french parquet', '45 degree', 'smoked oak', 'luxury interior', 'dha karachi']
  },

  // 13. Unique Original: Palais de Versailles Basketweave Parquet Cassette
  {
    id: 'prod-versailles-1',
    title: 'Palais de Versailles Parquet Cassette 800x800mm Architectural Panel',
    slug: 'palais-de-versailles-parquet-cassette-800x800mm-architectural-panel',
    sku: 'ENG-VRS-013',
    category: 'Engineered Wood',
    categorySlug: 'engineered-wood',
    materialType: 'Engineered Wood',
    finish: 'Handscraped',
    thickness: '18mm (4mm French Oak Top + Multi-Ply Birch Base)',
    wearLayer: '4mm Solid French Oak Wear Layer',
    waterResistance: 'Moisture Resistant',
    warrantyYears: 30,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 780,
    pricePerBox: 10920,
    coveragePerBox: 14.0,
    planksPerBox: 2, // 800x800mm master tiles
    stockBoxes: 50,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Hand-Crafted French White Oak Versailles Motif on Multi-Ply Birch Substrate',
      thickness: '18mm',
      wearLayer: '4mm Select French Oak (Re-sandable 3 times)',
      waterResistance: 'Moisture Resistant with Hardwax Oil Seal',
      installationMethod: 'Tongue & Groove',
      dimensions: '800mm x 800mm x 18mm Cassette',
      warrantyYears: 30,
      soundInsulation: 'Solid Acoustic Mass',
      underlaymentAttached: false,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'European Heritage Woodcraft'
    },
    features: [
      'Historic 17th-century Versailles diamond square basketweave motif',
      'Pre-assembled 800x800mm master panels guarantee flawless pattern alignment',
      'Hand-scraped and wire-brushed texture with matte hardwax oil treatment',
      'Engineered cross-core resists warping under Karachi coastal humidity'
    ],
    description: 'Originally commissioned for King Louis XIV\'s Grand Trianon at Versailles, this architectural cassette parquet represents the highest expression of classical timber floor design. Each 800x800mm cassette is hand-assembled from select European Oak.',
    variants: [
      {
        id: 'var-vrs-heritage',
        name: 'Versailles Cassette - Heritage French Oak',
        colorName: 'Heritage French Oak',
        colorHex: '#875d38',
        thickness: '18mm',
        pricePerSqFt: 780,
        pricePerBox: 10920,
        coveragePerBox: 14.0,
        sku: 'ENG-VRS-013-HRT',
        stockBoxes: 50,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 18,
    tags: ['versailles parquet', 'engineered wood', 'palace design', 'luxury villa', 'clifton', 'dha phase 5']
  },

  // 14. Unique Original: Venetian Terrazzo & Carrara Marble Chip SPC
  {
    id: 'prod-terrazzo-1',
    title: 'Venetian Terrazzo & Carrara Marble Chip 600x600mm Waterproof SPC Tile',
    slug: 'venetian-terrazzo-carrara-marble-chip-600x600mm-waterproof-spc-tile',
    sku: 'SPC-TRZ-014',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Stone Textured',
    thickness: '6.0mm (5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.55mm Commercial Slip-Resistant Coat',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Kitchen', 'Bathroom', 'Living Room', 'Office & Commercial'],
    pricePerSqFt: 280,
    pricePerBox: 6720,
    coveragePerBox: 24.0,
    planksPerBox: 6, // 600x600mm tiles
    stockBoxes: 120,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Stone Plastic Composite (SPC) with Real Micro Marble Aggregate Print',
      thickness: '6.0mm',
      wearLayer: '0.55mm Matte Anti-Slip Wear Layer',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '600mm x 600mm x 6.0mm',
      warrantyYears: 25,
      soundInsulation: '22dB Integrated IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'Italian Design Standards'
    },
    features: [
      '100% waterproof for open kitchens, luxury powder rooms, and wet vanity areas',
      'Authentic Italian terrazzo look with seeded white Carrara & basalt stone flecks',
      'Warm and soft under bare feet compared to freezing cold, brittle ceramic tile',
      'Precision click-lock joints require zero grout lines and zero messy sealers'
    ],
    description: 'Revive mid-century Mediterranean luxury without the staining or cracking of traditional poured terrazzo. Our 600x600mm Venetian Terrazzo SPC tile delivers a satin-matte stone texture that is impervious to spills, steam, and standing water.',
    variants: [
      {
        id: 'var-trz-bianco',
        name: 'Venetian Terrazzo - Bianco Carrara',
        colorName: 'Bianco Carrara',
        colorHex: '#e8e5dc',
        thickness: '6.0mm',
        pricePerSqFt: 280,
        pricePerBox: 6720,
        coveragePerBox: 24.0,
        sku: 'SPC-TRZ-014-BNC',
        stockBoxes: 70,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-trz-nero',
        name: 'Venetian Terrazzo - Nero Basalt',
        colorName: 'Nero Basalt',
        colorHex: '#3b3d40',
        thickness: '6.0mm',
        pricePerSqFt: 285,
        pricePerBox: 6840,
        coveragePerBox: 24.0,
        sku: 'SPC-TRZ-014-NRO',
        stockBoxes: 50,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 36,
    tags: ['terrazzo', 'spc tile', 'waterproof kitchen', 'bathroom flooring', 'karachi showroom']
  },

  // 15. Unique Original: Roman Travertine Ivory Honed Architectural SPC
  {
    id: 'prod-travertine-1',
    title: 'Roman Travertine Ivory Honed 900x450mm Architectural Rigid SPC',
    slug: 'roman-travertine-ivory-honed-900x450mm-architectural-rigid-spc',
    sku: 'SPC-TRV-015',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Stone Textured',
    thickness: '6.0mm (5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.55mm Honed Natural Texture',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Kitchen', 'Bathroom', 'Office & Commercial'],
    pricePerSqFt: 275,
    pricePerBox: 5940,
    coveragePerBox: 21.6,
    planksPerBox: 5, // 900x450mm tiles
    stockBoxes: 100,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Limestone Composite with Honed Roman Travertine Mineral Texture',
      thickness: '6.0mm',
      wearLayer: '0.55mm Commercial Grade Honed',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '900mm x 450mm x 6.0mm',
      warrantyYears: 25,
      soundInsulation: '21dB Integrated IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'Italian Architectural Line'
    },
    features: [
      'Warm earthy limestone aesthetic with subtle horizontal vein-cut striations',
      'Honed matte texture provides pleasant tactile grip even with wet feet',
      'Completely immune to tea, turmeric, lemon, and oil stains (zero porosity)',
      'Subfloor thermal insulation ensures cozy underfoot comfort year-round'
    ],
    description: 'Capture the eternal elegance of Roman antiquity with our Ivory Honed Travertine SPC. Cut into contemporary 900x450mm format, it delivers the organic striations of vein-cut limestone without the porosity, pitting, or sealing headaches.',
    variants: [
      {
        id: 'var-trv-ivory',
        name: 'Roman Travertine - Warm Ivory',
        colorName: 'Warm Ivory',
        colorHex: '#dfd5c4',
        thickness: '6.0mm',
        pricePerSqFt: 275,
        pricePerBox: 5940,
        coveragePerBox: 21.6,
        sku: 'SPC-TRV-015-IVR',
        stockBoxes: 60,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-trv-silver',
        name: 'Roman Travertine - Silver Ash',
        colorName: 'Silver Ash',
        colorHex: '#bdb8ae',
        thickness: '6.0mm',
        pricePerSqFt: 280,
        pricePerBox: 6048,
        coveragePerBox: 21.6,
        sku: 'SPC-TRV-015-SLV',
        stockBoxes: 40,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 4.9,
    reviewCount: 28,
    tags: ['travertine', 'limestone', 'stone vinyl', 'spc tiles', 'dha architecture']
  },

  // 16. Unique Original: Shou Sugi Ban (Yakisugi) Japanese Flame-Charred
  {
    id: 'prod-shousugi-1',
    title: 'Shou Sugi Ban Japanese Flame-Charred Yakisugi Timber Plank',
    slug: 'shou-sugi-ban-japanese-flame-charred-yakisugi-timber-plank',
    sku: 'SPC-SSB-016',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Deep Woodgrain',
    thickness: '6.5mm (5.5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.60mm Carbon Shield Wear Layer',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom', 'Office & Commercial'],
    pricePerSqFt: 310,
    pricePerBox: 6200,
    coveragePerBox: 20.0,
    planksPerBox: 8,
    stockBoxes: 85,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Deep Relief Rigid SPC with Shou Sugi Ban Charred Wood Surface',
      thickness: '6.5mm',
      wearLayer: '0.60mm Ultra Scratch Resistant Carbonized Coat',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '1220mm x 180mm x 6.5mm',
      warrantyYears: 25,
      soundInsulation: '22dB Integrated IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Painted Bevel 4V',
      origin: 'Japanese Architectural Collection'
    },
    features: [
      'Dramatic blackened timber aesthetic inspired by ancient Yakisugi wood preservation',
      'Silky deep-char texture catches side lighting with sculptural shadow definition',
      'Completely non-marking, stain-proof, and pet-claw resistant',
      'Provides bold contrast for minimalist Japandi, industrial, and monochromatic spaces'
    ],
    description: 'Inspired by the 18th-century Japanese technique of Shou Sugi Ban (charring cedar to protect it from rot and weather), this surface showcases velvety deep charcoal grain with subtle metallic highlights. An unforgettable statement floor for contemporary Karachi homes.',
    variants: [
      {
        id: 'var-ssb-charcoal',
        name: 'Yakisugi - Midnight Black Ash',
        colorName: 'Midnight Black Ash',
        colorHex: '#1f1f21',
        thickness: '6.5mm',
        pricePerSqFt: 310,
        pricePerBox: 6200,
        coveragePerBox: 20.0,
        sku: 'SPC-SSB-016-BLK',
        stockBoxes: 50,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'var-ssb-espresso',
        name: 'Yakisugi - Burnt Espresso Ember',
        colorName: 'Burnt Espresso Ember',
        colorHex: '#2d2522',
        thickness: '6.5mm',
        pricePerSqFt: 310,
        pricePerBox: 6200,
        coveragePerBox: 20.0,
        sku: 'SPC-SSB-016-ESP',
        stockBoxes: 35,
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 31,
    tags: ['shou sugi ban', 'charred timber', 'black floor', 'japandi', 'architectural plank']
  },

  // 17. Unique Original: Calacatta Oro Extra-Large Waterproof SPC Slabs (600x1200mm)
  {
    id: 'prod-calacatta-1',
    title: 'Calacatta Oro Extra-Large Waterproof SPC Slabs (600x1200mm)',
    slug: 'calacatta-oro-extra-large-waterproof-spc-slabs-600x1200mm',
    sku: 'SPC-CLC-017',
    category: 'Vinyl (SPC/WPC) Flooring',
    categorySlug: 'spc-vinyl-flooring',
    materialType: 'SPC Vinyl',
    finish: 'Smooth Silk',
    thickness: '6.5mm (5.5mm Core + 1mm Sound IXPE)',
    wearLayer: '0.60mm Crystal Satin Ceramic Layer',
    waterResistance: '100% Waterproof',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Kitchen', 'Bathroom', 'Office & Commercial'],
    pricePerSqFt: 340,
    pricePerBox: 8160,
    coveragePerBox: 24.0,
    planksPerBox: 3, // 600x1200mm grand slabs
    stockBoxes: 90,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Extra-Large Rigid SPC Limestone Core with Italian Marble Bookmatch Veining',
      thickness: '6.5mm',
      wearLayer: '0.60mm Satin Polish Scratch Barrier',
      waterResistance: '100% Waterproof',
      installationMethod: 'Click-Lock',
      dimensions: '1200mm x 600mm x 6.5mm (4ft x 2ft Grand Slabs)',
      warrantyYears: 25,
      soundInsulation: '22dB Integrated IXPE',
      underlaymentAttached: true,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'Carrara Region Marble Scan'
    },
    features: [
      'Monumental 1200mm x 600mm (4x2 ft) format minimizes seam lines across rooms',
      'Dramatic golden-grey bookmatched Italian marble veining on warm alabaster white',
      'Zero grout lines to discolour, stain, or scrub in humid Karachi climate',
      'Installs seamlessly over old ceramic tiles without breaking or masonry debris'
    ],
    description: 'Transform your drawing room and master bath into an Italian marble palazzo. The Calacatta Oro SPC slab combines sweeping 4-foot porcelain proportions with the warm acoustic softness and fast click installation of modern composite.',
    variants: [
      {
        id: 'var-clc-oro',
        name: 'Calacatta Oro - Gold & Grey Vein',
        colorName: 'Gold & Grey Vein',
        colorHex: '#edeae1',
        thickness: '6.5mm',
        pricePerSqFt: 340,
        pricePerBox: 8160,
        coveragePerBox: 24.0,
        sku: 'SPC-CLC-017-ORO',
        stockBoxes: 90,
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 39,
    tags: ['calacatta marble', 'marble spc', 'large format', 'luxury living', 'waterproof floor', 'dha']
  },

  // 18. Unique Original: Copenhagen 240mm Ultra-Wide Scandinavian Fir
  {
    id: 'prod-douglas-1',
    title: 'Copenhagen 240mm Ultra-Wide Scandinavian Fir Engineered Plank',
    slug: 'copenhagen-240mm-ultra-wide-scandinavian-fir-engineered-plank',
    sku: 'ENG-CPH-018',
    category: 'Engineered Wood',
    categorySlug: 'engineered-wood',
    materialType: 'Engineered Wood',
    finish: 'Brushed Oil',
    thickness: '16mm (4mm Nordic Fir Top + Multi-Ply Birch Substrate)',
    wearLayer: '4mm Slow-Grown Conifer Wear Layer',
    waterResistance: 'Moisture Resistant',
    warrantyYears: 25,
    roomSuitability: ['Living Room', 'Bedroom'],
    pricePerSqFt: 680,
    pricePerBox: 13600,
    coveragePerBox: 20.0,
    planksPerBox: 4, // 2200mm x 240mm long & wide planks
    stockBoxes: 45,
    inStock: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop'
    ],
    specs: {
      material: 'Slow-Grown Scandinavian Conifer Timber with Multi-Ply Baltic Birch Substrate',
      thickness: '16mm',
      wearLayer: '4mm Select Timber (White Lye & Hardwax Oil)',
      waterResistance: 'Moisture Resistant',
      installationMethod: 'Tongue & Groove',
      dimensions: '2200mm x 240mm x 16mm (7.2ft long x 9.5in wide)',
      warrantyYears: 25,
      soundInsulation: 'Natural Acoustic Damping',
      underlaymentAttached: false,
      edgeProfile: 'Micro-Bevel 4V',
      origin: 'Nordic Timber Forestry'
    },
    features: [
      'Bespoke 240mm (9.5-inch) ultra-wide planks produce calm, expansive horizons',
      'Treated with traditional white lye wash and natural oil for serene blonde hue',
      'Generous 2.2-meter lengths dramatically reduce butt joints across living rooms',
      'Engineered multi-layer base stabilized for Karachi air conditioning cycles'
    ],
    description: 'Designed for visionary architectural residences that prioritize light, air, and organic balance. The Copenhagen 240mm plank presents wide-format Nordic timber treated in white lye, offering a peaceful, matte Scandinavian aesthetic.',
    variants: [
      {
        id: 'var-cph-lye',
        name: 'Copenhagen Wide Plank - White Lye Scandinavian',
        colorName: 'White Lye Scandinavian',
        colorHex: '#eae3d5',
        thickness: '16mm',
        pricePerSqFt: 680,
        pricePerBox: 13600,
        coveragePerBox: 20.0,
        sku: 'ENG-CPH-018-LYE',
        stockBoxes: 45,
        image: 'https://images.unsplash.com/photo-1502005229762-ee1a2b380f2d?q=80&w=800&auto=format&fit=crop'
      }
    ],
    rating: 5.0,
    reviewCount: 20,
    tags: ['wide plank', 'scandinavian floor', 'white oak', 'fir', 'minimalist', 'dha karachi']
  }
];

export const sampleReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-spc-1',
    productTitle: 'Nordic Oak 5.5mm Waterproof SPC Vinyl Plank',
    author: 'Tariq Mansoor',
    location: 'DHA Phase 5, Karachi',
    rating: 5,
    date: '2026-08-14',
    comment: 'Visited their showroom on 26th Street Tauheed Commercial. The staff showed us physical samples and arranged a site visit within 2 hours. Our 2,400 sq ft apartment flooring was completed in 3 days. Beautiful finish and truly 100% waterproof.',
    verifiedPurchase: true,
    projectPhotoUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    productId: 'prod-spc-2',
    productTitle: 'Smoked Walnut Herringbone SPC Luxury Vinyl',
    author: 'Ar. Sarah Hashmi (Hashmi Design Studio)',
    location: 'Clifton Block 4, Karachi',
    rating: 5,
    date: '2026-08-28',
    comment: 'Specified this Herringbone SPC for a luxury penthouse in Clifton. The precision of the 90-degree click joint is astonishing. My clients love the warm walnut character and no one can tell it is not solid hardwood.',
    verifiedPurchase: true,
    projectPhotoUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    productId: 'prod-eng-1',
    productTitle: 'European White Oak 15mm Engineered Plank',
    author: 'Kamran Siddiqui',
    location: 'DHA Phase 6, Karachi',
    rating: 5,
    date: '2026-09-02',
    comment: 'The 6-foot continuous planks look sensational in our double-height lounge. First Floor Floorings handled the moisture testing, subfloor levelling, and skirting fitting impeccably. Outstanding craftsmanship.',
    verifiedPurchase: true,
    projectPhotoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    productId: 'prod-lam-1',
    productTitle: 'Bavarian Oak 12mm AC5 Commercial Laminate',
    author: 'Zainab Qureshi',
    location: 'PECHS Block 6, Karachi',
    rating: 5,
    date: '2026-07-20',
    comment: 'Replaced old cold tiles with Bavarian Oak 12mm. The room temperature feels so much cozier and it handled our dog running around with zero scratches. Highly recommend their in-house installation team.',
    verifiedPurchase: true
  }
];

export const sampleQuestions: Question[] = [
  {
    id: 'q-1',
    productId: 'prod-spc-1',
    author: 'Farhan Zaidi',
    question: 'Can SPC vinyl flooring be installed directly over existing ceramic floor tiles in a Karachi flat without breaking them?',
    date: '2026-08-10',
    answer: 'Yes, absolutely! As long as your existing ceramic tiles are flat and firmly bonded, our 5.5mm SPC with pre-attached IXPE pad can be laid directly over them with zero demolition, dust, or noise. We only inspect grout line depth during our free Karachi site visit.',
    answeredAt: '2026-08-11'
  },
  {
    id: 'q-2',
    productId: 'prod-spc-2',
    author: 'Dr. Bilal Noman',
    question: 'How much extra wastage percentage should we calculate when ordering the Smoked Walnut Herringbone?',
    date: '2026-08-18',
    answer: 'For herringbone patterns, we recommend calculating 12% to 15% wastage (compared to 8% to 10% for straight planks) due to the diagonal wall cuts. Our online Flooring Cost Calculator calculates this automatically!',
    answeredAt: '2026-08-19'
  }
];

export const sampleCoupons: Coupon[] = [
  {
    id: 'coup-1',
    code: 'NEWFLOOR10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 25000,
    validUntil: '2026-12-31',
    description: '10% discount on first flooring project order over Rs. 25,000'
  },
  {
    id: 'coup-2',
    code: 'FIRSTFLOOR5',
    discountType: 'percentage',
    discountValue: 5,
    minOrderAmount: 50000,
    validUntil: '2026-12-31',
    description: '5% instant savings on bulk architectural flooring orders'
  },
  {
    id: 'coup-3',
    code: 'KARACHIFREE',
    discountType: 'fixed',
    discountValue: 2500,
    minOrderAmount: 40000,
    validUntil: '2026-12-31',
    description: 'Rs. 2,500 shipping & handling credit for Karachi metro deliveries'
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'SPC Vinyl vs. Laminate vs. Engineered Wood: The Ultimate Karachi Flooring Guide',
    slug: 'spc-vinyl-vs-laminate-vs-engineered-wood-karachi-guide',
    excerpt: 'How coastal humidity, monsoon dampness, and concrete subfloors dictate which flooring material will thrive in Karachi homes.',
    content: `
When selecting modern flooring in Karachi, the coastal climate is the single most critical factor that conventional brochures overlook. DHA Phase 5, Phase 8, and Clifton face intense sea-salt air and humid summers that will cause cheap unsealed fiberboards to swell.

### 1. SPC Vinyl (Stone Plastic Composite): The 100% Waterproof King
If you want zero anxiety regarding water spills, AC condensation, mopping, or pet messes, SPC is the undisputed modern champion. Composed of natural limestone powder and virgin polymers, it contains zero wood fiber. It can be installed safely in kitchens, vanity areas, and ground floor villas.

### 2. German AC5 Laminate: Unmatched Scratch Resistance
High-density 12mm German laminate offers a firmer, heavier acoustic feel than vinyl and delivers remarkable resistance against high heels, dragging heavy teak furniture, and active children. When paired with a 3mm vapor foil underlayment, it gives decades of service in living rooms and master suites.

### 3. Engineered Hardwood: The Supreme Architectural Choice
Unlike solid wood that expands across grain boundaries, engineered hardwood features multi-ply birch cross-layers beneath a 3mm-4mm authentic European Oak top veneer. It yields the majestic, warm tactile depth of genuine timber with total structural stability.

Visit our showroom at 20 C, 26th Street, DHA Phase 5, Karachi to feel all three materials side by side.
    `,
    category: 'Material Comparisons',
    author: 'Design Atelier, First Floor Floorings',
    publishedAt: '2026-08-05',
    date: '2026-08-05',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop',
    tags: ['spc vinyl', 'laminate', 'engineered wood', 'karachi homes']
  },
  {
    id: 'blog-2',
    title: 'How to Accurately Measure Your Rooms & Calculate Flooring Boxes in Pakistan',
    slug: 'how-to-accurately-measure-rooms-calculate-flooring-boxes',
    excerpt: 'Never run short mid-installation or overbuy excess inventory. Learn how professional flooring estimators calculate net square footage, box conversions, and pattern waste.',
    content: `
A common mistake homeowners make is buying flooring simply by room length times width without factoring in box pack sizes and cutting wastage.

### The Professional 3-Step Formula
1. **Measure Length x Width in Feet**: For an L-shaped room, divide into two rectangles. E.g., Bedroom: 14 ft x 16 ft = 224 sq ft net.
2. **Add Wastage Percentage**:
   - For Straight Plank Installation: Add **10%** (224 x 1.10 = 246.4 sq ft).
   - For Diagonal or Herringbone Parquet: Add **15%** (224 x 1.15 = 257.6 sq ft) due to angle cuts at perimeter walls.
3. **Divide by Box Coverage & Round Up**:
   Flooring is sold in sealed factory cartons to prevent transit damage. If each box contains 24.0 sq ft:
   246.4 / 24.0 = 10.26 boxes -> Round up to **11 full boxes**.

Use our interactive **Flooring Cost Calculator** on this website to calculate boxes, total cost, and installation charges in seconds!
    `,
    category: 'Installation & Planning',
    author: 'Master Installation Team',
    publishedAt: '2026-08-18',
    date: '2026-08-18',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
    tags: ['calculator', 'room measurement', 'flooring boxes', 'tips']
  },
  {
    id: 'blog-3',
    title: 'Transforming DHA Karachi Courtyards & Rooftops with WPC Decking & Artificial Turf',
    slug: 'transforming-dha-karachi-courtyards-rooftops-wpc-decking-artificial-turf',
    excerpt: 'Create a private outdoor sanctuary resistant to Karachi coastal sun, dust, and rain with composite wood and 40mm landscape turf.',
    content: `
DHA Phase 5, Phase 6, and Phase 8 rooftop terraces offer magnificent skyline and sea breeze views, yet conventional tiles heat up intensely during Karachi afternoons and reflect harsh glare.

Combining Wood-Plastic Composite (WPC) decking tiles with 40mm 4-tone artificial turf creates a lush, heat-reducing rooftop lounge that requires zero watering, no annual varnish, and drains instantly during torrential monsoon showers.
    `,
    category: 'Outdoor & Terrace',
    author: 'Architectural Consultant',
    publishedAt: '2026-09-01',
    date: '2026-09-01',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
    tags: ['wpc decking', 'artificial grass', 'rooftop terrace', 'dha karachi']
  }
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'materials',
    question: 'What is SPC Vinyl and how is it different from traditional laminate or regular vinyl?',
    answer: 'SPC stands for Stone Plastic Composite. Unlike traditional laminate which uses compressed wood sawdust (HDF), SPC uses an ultra-dense core of natural limestone powder (calcium carbonate) bonded with virgin polymer resins. This makes SPC 100% waterproof — it will never swell, buckle, or rot even when submerged in water.'
  },
  {
    id: 'faq-2',
    category: 'installation',
    question: 'Do you provide professional site visits and installation in Karachi?',
    answer: 'Yes! We have our own full-time master flooring technicians in Karachi. We offer a complimentary Site Visit across DHA (Phase 1-8), Clifton, PECHS, KDA, and surrounding areas where our technician brings physical material swatches, laser-measures your rooms, inspects subfloor levelling, and provides a guaranteed turnkey quote.'
  },
  {
    id: 'faq-3',
    category: 'site_visit',
    question: 'Can I install new flooring directly over my existing ceramic tiles or marble?',
    answer: 'Yes! In 90% of Karachi apartments and villas, our click-lock SPC vinyl or German laminate can be laid directly over existing ceramic, porcelain, or terrazzo tiles using our acoustic vapor underlayment. This saves you thousands of rupees in demolition costs and eliminates weeks of dust.'
  },
  {
    id: 'faq-4',
    category: 'samples',
    question: 'How does the Sample Ordering flow work?',
    answer: 'You can order up to 3 complimentary material swatches online. We deliver them right to your doorstep via express courier in Karachi (and nationwide). When you place your full flooring order, any small sample courier fee is automatically credited back on your final invoice.'
  },
  {
    id: 'faq-5',
    category: 'pricing_delivery',
    question: 'Why are prices shown both per sq ft and per box?',
    answer: 'In the architectural flooring industry, material is estimated by square foot but manufactured and packaged in sealed factory boxes to protect the precision tongue-and-groove click joints during transit. Our website clearly displays both: your unit cost per sq ft and the exact cost per box (e.g., Rs. 245/sq ft • Rs. 5,880/box for 24 sq ft).'
  },
  {
    id: 'faq-6',
    category: 'pricing_delivery',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD) for orders up to Rs. 50,000, Direct Bank Transfer to our Meezan Bank corporate account, JazzCash, Easypaisa, and in-person payments (Cash / Debit / Credit Card) at our 26th Street DHA Phase 5 showroom in Karachi.'
  }
];

export const sampleOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'FFF-2026-000101',
    createdAt: '2026-09-10T14:30:00Z',
    status: 'Delivered',
    items: [
      {
        id: 'item-101-1',
        productId: 'prod-spc-1',
        variantId: 'var-no-light',
        title: 'Nordic Oak 5.5mm Waterproof SPC Vinyl Plank',
        slug: 'nordic-oak-5-5mm-waterproof-spc-vinyl',
        materialType: 'SPC Vinyl',
        finish: 'Embossed in Register (EIR)',
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
        pricePerBox: 5880,
        pricePerSqFt: 245,
        coveragePerBox: 24.0,
        quantity: 12, // 12 boxes = 288 sq ft
        totalSqFt: 288,
        maxStock: 120
      },
      {
        id: 'item-101-2',
        productId: 'prod-skirt-1',
        variantId: 'var-skr-white',
        title: 'Waterproof PVC Skirting Board 100mm with Cable Duct',
        slug: 'waterproof-pvc-skirting-board-100mm-with-cable-duct',
        materialType: 'Skirting & Accessories',
        finish: 'Matte',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
        pricePerBox: 3800,
        pricePerSqFt: 95,
        coveragePerBox: 40.0,
        quantity: 3,
        totalSqFt: 120,
        maxStock: 120
      }
    ],
    customer: {
      fullName: 'Dr. Tariq Mansoor',
      phone: '0300-8241920',
      email: 'tariq.mansoor@gmail.com',
      address: 'House 45/B, Street 18, Khayaban-e-Muhafiz',
      area: 'DHA Phase 6',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
      orderNotes: 'Elevator access available. Please call 1 hour before delivery.'
    },
    deliveryMethod: 'karachi_express',
    installationRequested: true,
    preferredInstallationDate: '2026-09-15',
    subtotal: 81960,
    discount: 0,
    shippingFee: 0, // free over 50k
    installationFee: 11520, // 288 sq ft * 40
    total: 93480,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    notes: 'Installed and handed over by Master Tech Aslam on Sept 16.'
  }
];

export const sampleSiteVisits: SiteVisitRequest[] = [
  {
    id: 'sv-1',
    ticketNumber: 'SV-2026-000045',
    createdAt: '2026-09-18T10:15:00Z',
    fullName: 'Barrister Omar Farooq',
    phone: '0321-9876543',
    email: 'omar.farooq@chambers.pk',
    areaInKarachi: 'DHA Phase 5, Khayaban-e-Tanzeem',
    fullAddress: 'Bungalow 12-C, 14th Street, off Khayaban-e-Tanzeem, DHA Phase 5',
    preferredDate: '2026-09-24',
    preferredTimeSlot: 'Afternoon (2:00 PM – 5:00 PM)',
    roomType: 'Ground Floor Drawing Room & Dining Suite (Approx 1,100 sq ft)',
    estimatedSqFt: 1100,
    materialOfInterest: 'Smoked Walnut Herringbone SPC & Engineered European Oak',
    swatchesRequested: ['Nordic Oak', 'Smoked Walnut Herringbone', 'European Oak 15mm'],
    status: 'Scheduled',
    assignedEstimator: 'Engr. Faisal (Senior Flooring Consultant)',
    technicianNotes: 'Client wants laser subfloor level check over existing 1990s marble.'
  },
  {
    id: 'sv-2',
    ticketNumber: 'SV-2026-000046',
    createdAt: '2026-09-20T16:45:00Z',
    fullName: 'Mahnoor Khan',
    phone: '0333-2145678',
    email: 'mahnoor.interiors@gmail.com',
    areaInKarachi: 'Clifton Block 4',
    fullAddress: 'Apartment 702, Ocean View Terraces, Marine Drive, Clifton Block 4',
    preferredDate: '2026-09-25',
    preferredTimeSlot: 'Morning (11:00 AM – 2:00 PM)',
    roomType: 'Master Bedroom & Walk-in Closet (450 sq ft)',
    estimatedSqFt: 450,
    materialOfInterest: '100% Waterproof SPC Vinyl',
    status: 'Requested',
    technicianNotes: 'Requested sample box delivery during visit.'
  }
];

export const sampleQuotes: QuoteRequest[] = [
  {
    id: 'qt-1',
    quoteNumber: 'QT-2026-000012',
    createdAt: '2026-09-15T09:00:00Z',
    companyName: 'Studio Linea Architects',
    fullName: 'Ar. Danish Raza',
    phone: '0300-3456789',
    email: 'danish@studiolinea.pk',
    city: 'Karachi',
    projectType: 'Commercial Office',
    areaSqFt: 4800,
    materialPreferences: ['Monolith Carpet Tiles 50x50cm', 'Nordic Oak SPC Vinyl'],
    estimatedBudget: 'PKR 850,000 - 1,200,000',
    timeline: 'Within 30 Days (October 2026)',
    notes: 'Floor plan CAD drawing attached. Requires heavy traffic caster chair certified tiles and acoustic quiet room specification.',
    status: 'Quoted',
    proposedQuoteAmount: 940000,
    quotationNotes: 'B2B commercial wholesale rate applied @ Rs. 125/sq ft for carpet tiles + Rs. 225/sq ft for SPC.'
  }
];

export const sampleSampleOrders: SampleOrder[] = [
  {
    id: 'smp-1',
    sampleOrderNumber: 'SMP-2026-000021',
    createdAt: '2026-09-19T11:20:00Z',
    status: 'Dispatched',
    samples: [
      {
        id: 'smp-item-1',
        productId: 'prod-spc-1',
        title: 'Nordic Oak 5.5mm Waterproof SPC Vinyl',
        slug: 'nordic-oak-5-5mm-waterproof-spc-vinyl',
        materialType: 'SPC Vinyl',
        finish: 'Embossed in Register (EIR)',
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=400&auto=format&fit=crop',
        price: 0,
        sku: 'SMP-SPC-001'
      },
      {
        id: 'smp-item-2',
        productId: 'prod-spc-2',
        title: 'Smoked Walnut Herringbone SPC',
        slug: 'smoked-walnut-herringbone-spc-luxury-vinyl',
        materialType: 'SPC Vinyl',
        finish: 'Deep Woodgrain',
        image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=400&auto=format&fit=crop',
        price: 0,
        sku: 'SMP-SPC-002'
      }
    ],
    customer: {
      fullName: 'Ayesha Bilgrami',
      phone: '0321-4567890',
      email: 'ayesha.b@gmail.com',
      address: 'House 88, Street 7, DHA Phase 2 Ext',
      city: 'Karachi',
      province: 'Sindh'
    },
    shippingFee: 250,
    total: 250,
    paymentMethod: 'cod',
    trackingNumber: 'TCS-98471203',
    notes: 'Express swatch envelope handed to TCS Karachi dispatch.'
  }
];
