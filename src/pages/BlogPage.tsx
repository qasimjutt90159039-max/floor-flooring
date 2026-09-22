import React from 'react';
import { Layers, Calendar, ArrowRight, Clock, User } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const articles = [
    {
      id: '1',
      title: 'SPC Vinyl vs. Marble: Why Modern Karachi Architects Are Specifying Luxury Vinyl Planks',
      excerpt: 'Explore why homeowners and developers in DHA and Clifton are replacing chilly, porous marble with warm, 100% waterproof SPC core planks with acoustic underlayment.',
      author: 'Ar. Tariq Mansoor',
      date: 'May 14, 2025',
      category: 'Design Trends',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Combating Coastal Humidity: How Subfloor Moisture Barriers Protect Your Floors in DHA & Clifton',
      excerpt: 'A technical deep-dive into vapor pressure from concrete slabs along the Karachi coastline and the exact vapor transmission membranes needed under click-lock planks.',
      author: 'Showroom Technical Team',
      date: 'April 28, 2025',
      category: 'Technical Guide',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'The Timeless Allure of Herringbone Parquet in Contemporary Living Lounges',
      excerpt: 'How French and European herringbone geometry adds architectural grandeur to modern high-ceiling living rooms without overwhelming minimalist furnishings.',
      author: 'Ayesha Raza',
      date: 'March 19, 2025',
      category: 'Style & Palettes',
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#7b5731] font-bold">
          The Karachi Flooring Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241c15]">
          Architectural Insights & Design Trends
        </h1>
        <p className="text-xs sm:text-sm text-[#786c5e]">
          Perspectives on material technology, subfloor prep, coastal humidity mitigation, and interior aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="group bg-white rounded-lg border border-[#ded5be] overflow-hidden hover:border-[#7b5731] transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
                  {art.category} • {art.date}
                </span>
                <h3 className="font-serif text-base font-bold text-[#241c15] leading-snug group-hover:text-[#7b5731] transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-[#786c5e] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-[#7b5731] font-semibold">
              <span className="text-stone-500 font-sans text-[11px]">{art.author}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
