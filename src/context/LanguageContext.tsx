import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isUrdu: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ur: 'ہوم' },
  'nav.shop': { en: 'Shop', ur: 'دکان' },
  'nav.smartphones': { en: 'Smartphones', ur: 'اسمارٹ فونز' },
  'nav.used': { en: 'Used Phones', ur: 'استعمال شدہ فونز' },
  'nav.accessories': { en: 'Accessories', ur: 'لوازمات' },
  'nav.repairs': { en: 'Repair Lab', ur: 'موبائل ریپئر' },
  'nav.tradeIn': { en: 'Trade-In / Sell', ur: 'موبائل ایکسچینج' },
  'nav.installments': { en: 'Installments', ur: 'آسان اقساط' },
  'nav.warranty': { en: 'Warranty & PTA', ur: 'وارنٹی چیک' },
  'nav.track': { en: 'Track Order', ur: 'آرڈر ٹریک کریں' },
  'nav.about': { en: 'About Us', ur: 'ہمارے بارے میں' },
  'nav.contact': { en: 'Contact Us', ur: 'رابطہ کریں' },
  'nav.account': { en: 'Account', ur: 'اکاؤنٹ' },
  'nav.cart': { en: 'Cart', ur: 'کارٹ' },
  'nav.wishlist': { en: 'Wishlist', ur: 'پسندیدہ' },
  'nav.compare': { en: 'Compare', ur: 'موازنہ' },

  // Announcements & Common
  'announcement.hours': { en: 'Mon-Sat: 10:30 AM – 10:30 PM | Katchehry Chowk, Multan', ur: 'پیر تا ہفتہ: صبح 10:30 تا رات 10:30 | کچہری چوک، ملتان' },
  'btn.shopNow': { en: 'Shop Now', ur: 'ابھی خریدیں' },
  'btn.addToCart': { en: 'Add to Cart', ur: 'کارٹ میں شامل کریں' },
  'btn.buyNow': { en: 'Buy Now', ur: 'فوری خریدیں' },
  'btn.quickView': { en: 'Quick View', ur: 'تفصیل دیکھیں' },
  'btn.viewDetails': { en: 'View Details', ur: 'مکمل معلومات' },
  'btn.whatsapp': { en: 'Chat on WhatsApp', ur: 'واٹس ایپ پر رابطہ' },
  'btn.call': { en: 'Call Shop', ur: 'کال کریں' },
  'btn.apply': { en: 'Apply', ur: 'لاگو کریں' },
  'btn.checkout': { en: 'Proceed to Checkout', ur: 'چیک آؤٹ کریں' },

  // Badges
  'badge.ptaApproved': { en: 'PTA Approved', ur: 'پی ٹی اے تصدیق شدہ' },
  'badge.officialWarranty': { en: 'Official Warranty', ur: 'آفیشل وارنٹی' },
  'badge.shopWarranty': { en: '7-Day Checking Warranty', ur: '7 دن دکان وارنٹی' },
  'badge.sameDayMultan': { en: 'Same-Day Multan Delivery', ur: 'ملتان میں اسی دن ڈیلیوری' },
  'badge.dealOfTheDay': { en: 'Deal of the Day', ur: 'آج کی خصوصی پیشکش' },

  // Sections
  'home.featured': { en: 'Featured Smartphones', ur: 'نمایاں اسمارٹ فونز' },
  'home.bestSellers': { en: 'Best Sellers in Multan', ur: 'ملتان کے سب سے زیادہ فروخت ہونے والے' },
  'home.budget': { en: 'Shop by Budget', ur: 'بجٹ کے مطابق منتخب کریں' },
  'home.brands': { en: 'Official Brand Partners', ur: 'مستند موبائل برانڈز' },
  'home.repairBanner': { en: 'Expert Smartphone Repair in Multan', ur: 'ملتان میں ماہر موبائل ریپئرنگ سروس' },
  'home.tradeInBanner': { en: 'Sell or Upgrade Your Old Phone', ur: 'پرانا موبائل بیچیں یا تبدیل کریں' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (key: string) => key,
  isUrdu: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('amm_language') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('amm_language', language);
    document.documentElement.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, isUrdu: language === 'ur' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
