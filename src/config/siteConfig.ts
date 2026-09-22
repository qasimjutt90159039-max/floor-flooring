// First Floor Floorings Configuration & Business Details
export interface SiteConfig {
  businessName: string;
  tagline: string;
  category: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsappNumber: string; // for wa.me links
  email: string;
  address: {
    line1: string;
    street: string;
    area: string;
    zone: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    fullAddress: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  currency: string;
  freeShippingThreshold: number; // in PKR
  freeSampleThreshold: number; // free sample delivery over Rs 50,000 order or 3 free samples in Karachi
  standardInstallationRateSqFt: number; // Rs 40/sq ft for vinyl/laminate in Karachi
  hardwoodInstallationRateSqFt: number; // Rs 65/sq ft for solid/engineered in Karachi
  standardWastageStraight: number; // 10%
  standardWastageHerringbone: number; // 15%
  announcementText: string;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch: string;
  };
  jazzCashDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  easypaisaDetails: {
    accountTitle: string;
    accountNumber: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube?: string;
  };
  openingHours: {
    weekdays: string;
    sunday: string;
  };
}

export const siteConfig: SiteConfig = {
  businessName: 'First Floor Floorings',
  tagline: 'Architectural Showroom & Surface Atelier',
  category: 'Flooring Store',
  phoneRaw: '032135304261',
  phoneFormatted: '+92 321 35304261',
  whatsappNumber: '9232135304261',
  email: 'info@firstfloorfloorings.pk',
  address: {
    line1: '20 C, 26th Street',
    street: '26th Street',
    area: 'DHA Phase 5, Tauheed Commercial Area',
    zone: 'Defence V, Defence Housing Authority (DHA)',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500',
    country: 'Pakistan',
    fullAddress: '20 C, 26th Street, DHA Phase 5, Tauheed Commercial Area, Defence V, Defence Housing Authority (DHA), Karachi, 75500, Pakistan',
  },
  geo: {
    lat: 24.8028,
    lng: 67.0423,
  },
  currency: 'PKR',
  freeShippingThreshold: 50000,
  freeSampleThreshold: 3, // up to 3 complimentary samples
  standardInstallationRateSqFt: 40,
  hardwoodInstallationRateSqFt: 65,
  standardWastageStraight: 10,
  standardWastageHerringbone: 15,
  announcementText: '🏛️ Architectural Showroom in DHA Phase 5, Karachi: Book a Free Site Visit with Material Swatches or Order Samples Online!',
  bankDetails: {
    bankName: 'Meezan Bank Limited',
    accountTitle: 'First Floor Floorings',
    accountNumber: '0281-0104882910',
    iban: 'PK14MEZN0002810104882910',
    branch: 'Tauheed Commercial Branch, DHA Phase 5, Karachi'
  },
  jazzCashDetails: {
    accountTitle: 'First Floor Floorings (Finance)',
    accountNumber: '0321-35304261',
  },
  easypaisaDetails: {
    accountTitle: 'First Floor Floorings',
    accountNumber: '0321-35304261',
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/firstfloorfloorings/',
    instagram: 'https://www.instagram.com/firstfloorfloorings',
    youtube: 'https://www.youtube.com/@firstfloorfloorings'
  },
  openingHours: {
    weekdays: '10:30 AM – 09:30 PM (Mon – Sat)',
    sunday: '01:00 PM – 08:00 PM (By Appointment)'
  }
};

export const getWhatsAppLink = (message?: string): string => {
  const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(
    message || 'Hello First Floor Floorings, I would like to inquire about your flooring collections, pricing, and Karachi site visit.'
  );
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
};

export const formatPKR = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};

export const calculateCoverage = (
  roomLength: number,
  roomWidth: number,
  coveragePerBox: number,
  wastagePercent: number = 10
) => {
  const netAreaSqFt = roomLength * roomWidth;
  const grossAreaSqFt = netAreaSqFt * (1 + wastagePercent / 100);
  const boxesNeeded = Math.ceil(grossAreaSqFt / coveragePerBox);
  const totalCoveredSqFt = Number((boxesNeeded * coveragePerBox).toFixed(2));
  const surplusSqFt = Number((totalCoveredSqFt - netAreaSqFt).toFixed(2));

  return {
    netAreaSqFt: Number(netAreaSqFt.toFixed(2)),
    grossAreaSqFt: Number(grossAreaSqFt.toFixed(2)),
    boxesNeeded,
    totalCoveredSqFt,
    surplusSqFt,
  };
};
