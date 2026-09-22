import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  Calendar,
  Layers,
  Lock,
  LogOut,
  CheckCircle2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface AccountPageProps {
  products: Product[];
  onNavigate: (page: string, slug?: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ products, onNavigate }) => {
  const { user, login, register, logout, wishlist, removeFromWishlist } = useAuth();
  const { addToCart, addSample } = useCart();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'customer' | 'contractor'>('customer');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'visits'>('wishlist');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (isLoginMode) {
      const res = await login(email, password);
      if (!res.success) setAuthError(res.message || 'Invalid credentials');
    } else {
      const res = await register(name, email, phone, role);
      if (!res.success) setAuthError(res.message || 'Registration failed');
    }
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 font-sans">
        <div className="bg-white rounded-xl border border-[#ded5be] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
              Atelier Client Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#241c15]">
              {isLoginMode ? 'Sign In to Your Account' : 'Register for First Floor Access'}
            </h1>
            <p className="text-xs text-[#786c5e]">
              Manage orders, track site visits, and access architect trade discounts.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-sm border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {!isLoginMode && (
              <>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Farooq"
                    className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0321-35304261"
                    className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">Account Type</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
                  >
                    <option value="customer">Homeowner / Private Client</option>
                    <option value="contractor">Architect / Interior Trade Partner</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block font-bold text-stone-800 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#241c15] hover:bg-[#382b20] text-white rounded-sm font-serif font-bold uppercase tracking-wider text-xs transition-colors shadow-xs"
            >
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#786c5e] border-t border-stone-100">
            {isLoginMode ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="font-bold text-[#7b5731] hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLoginMode(true)}
                  className="font-bold text-[#7b5731] hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-8">
      {/* Header Profile Summary */}
      <div className="p-6 bg-white rounded-xl border border-[#ded5be] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#241c15] text-[#c98d4d] flex items-center justify-center font-serif text-xl font-bold border border-[#c98d4d]/40">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl font-bold text-[#241c15]">{user.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f4eee1] text-[#7b5731]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#786c5e]">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 bg-[#7b5731] hover:bg-[#634526] text-white text-xs font-bold rounded-sm uppercase tracking-wider"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={logout}
            className="p-2 text-stone-500 hover:text-red-600 rounded-sm hover:bg-stone-100 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#ded5be] text-xs font-serif font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-6 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-[#7b5731] text-[#7b5731]'
              : 'border-transparent text-[#786c5e]'
          }`}
        >
          <Heart className="w-4 h-4" /> Saved Surfaces ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-[#7b5731] text-[#7b5731]'
              : 'border-transparent text-[#786c5e]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders & Invoices
        </button>

        <button
          onClick={() => setActiveTab('visits')}
          className={`px-6 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'visits'
              ? 'border-[#7b5731] text-[#7b5731]'
              : 'border-transparent text-[#786c5e]'
          }`}
        >
          <Calendar className="w-4 h-4" /> Site Visits & Tickets
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#ded5be] space-y-2">
              <Heart className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-xs text-[#786c5e]">No flooring surfaces saved to your wishlist yet.</p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-4 py-2 bg-[#241c15] text-[#f4eee1] text-xs font-bold rounded-sm uppercase tracking-wider"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="p-4 bg-white rounded-lg border border-[#ded5be] space-y-3">
                  <div className="relative aspect-4/3 rounded-sm overflow-hidden bg-stone-100">
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white text-stone-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-serif text-xs font-bold text-[#241c15]">{p.title}</h3>
                    <p className="text-[11px] text-[#786c5e]">{formatPKR(p.pricePerSqFt)}/sq ft</p>
                  </div>
                  <div className="flex gap-2 pt-1 text-xs">
                    <button
                      onClick={() => addSample(p)}
                      className="flex-1 py-1.5 bg-[#f4eee1] text-[#241c15] font-bold rounded-xs text-[10px]"
                    >
                      Free Sample
                    </button>
                    <button
                      onClick={() => addToCart(p, undefined, 1)}
                      className="flex-1 py-1.5 bg-[#241c15] text-white font-bold rounded-xs text-[10px]"
                    >
                      Add Box
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="p-8 bg-white rounded-xl border border-[#ded5be] text-center space-y-2">
          <ShoppingBag className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-serif text-base font-bold text-[#241c15]">Orders Archive</h3>
          <p className="text-xs text-[#786c5e]">
            Orders placed under {user.email} are synced with showroom inventory dispatch in Karachi.
          </p>
          <button
            onClick={() => onNavigate('track-order')}
            className="px-4 py-2 bg-[#241c15] text-white text-xs font-bold rounded-sm mt-2"
          >
            Track by Order Reference Number
          </button>
        </div>
      )}

      {activeTab === 'visits' && (
        <div className="p-8 bg-white rounded-xl border border-[#ded5be] text-center space-y-2">
          <Calendar className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-serif text-base font-bold text-[#241c15]">Karachi Site Visits</h3>
          <p className="text-xs text-[#786c5e]">
            Need a technician with laser measurements and physical swatches at your villa?
          </p>
          <button
            onClick={() => onNavigate('site-visit')}
            className="px-4 py-2 bg-[#7b5731] text-white text-xs font-bold rounded-sm mt-2"
          >
            Schedule Free Site Visit
          </button>
        </div>
      )}
    </div>
  );
};
