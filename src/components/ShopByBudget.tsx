import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

interface ShopByBudgetProps {
  onSelectBudget: (minPrice: number, maxPrice?: number) => void;
}

export const ShopByBudget: React.FC<ShopByBudgetProps> = ({ onSelectBudget }) => {
  const budgetTiers = [
    {
      title: 'Under Rs. 20,000',
      subtitle: 'Keypad, Nokia 105, entry 4G',
      minPrice: 0,
      maxPrice: 20000,
      badge: 'Basic & Everyday'
    },
    {
      title: 'Rs. 20,000 – 40,000',
      subtitle: 'Itel, Sparx, Redmi budget 4G',
      minPrice: 20000,
      maxPrice: 40000,
      badge: 'Students & Casual'
    },
    {
      title: 'Rs. 40,000 – 75,000',
      subtitle: 'Infinix Note 40, Redmi Note 13, Spark 20',
      minPrice: 40000,
      maxPrice: 75000,
      badge: 'Most Popular'
    },
    {
      title: 'Rs. 75,000 – 150,000',
      subtitle: 'Xiaomi 13T, Galaxy A55, Reno 11F',
      minPrice: 75000,
      maxPrice: 150000,
      badge: 'Pro Camera & 5G'
    },
    {
      title: 'Above Rs. 150,000',
      subtitle: 'iPhone 15 Pro, S24 Ultra, Pixel 8 Pro',
      minPrice: 150000,
      maxPrice: 900000,
      badge: 'Flagship & Titanium'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-accent flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" />
            <span>Targeted Filtering</span>
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-graphite mt-1">
            Shop Smartphones by Budget
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {budgetTiers.map((tier, idx) => (
          <div
            key={idx}
            onClick={() => onSelectBudget(tier.minPrice, tier.maxPrice)}
            className="p-4 rounded-2xl border border-sage-200 bg-white hover:border-accent hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-[10px] font-semibold">
                {tier.badge}
              </span>
              <h4 className="font-heading font-bold text-sm text-graphite mt-2 group-hover:text-accent transition-colors">
                {tier.title}
              </h4>
              <p className="text-[11px] text-sage-500 mt-1 line-clamp-2">
                {tier.subtitle}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-sage-100 flex items-center justify-between text-xs font-bold text-graphite group-hover:text-accent">
              <span>View Phones</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
