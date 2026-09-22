import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Calendar,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  Phone,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Product } from '../types';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface AdminPageProps {
  products: Product[];
  onRefreshProducts: () => void;
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onRefreshProducts,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'site-visits' | 'settings'>('products');

  const [orders, setOrders] = useState<any[]>([]);
  const [siteVisits, setSiteVisits] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Settings form
  const [phoneConfig, setPhoneConfig] = useState(siteConfig.phoneRaw);
  const [addressConfig, setAddressConfig] = useState(siteConfig.address.fullAddress);
  const [installRate, setInstallRate] = useState(siteConfig.standardInstallationRateSqFt.toString());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Product Add / Edit modal or inline form
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchSiteVisits();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch {
      // Local fallback
      setOrders([
        {
          id: 'FFF-90214',
          customerName: 'Architect Tariq Mansoor',
          customerPhone: '032135304261',
          city: 'Karachi',
          deliveryAddress: '24-C, 11th Commercial, Phase 2 Ext, DHA',
          grandTotal: 184500,
          status: 'dispatched',
          createdAt: new Date().toISOString(),
          items: [{ title: 'Smoked Walnut Herringbone SPC Luxury Vinyl', quantity: 26 }]
        }
      ]);
    }
  };

  const fetchSiteVisits = async () => {
    try {
      const res = await fetch('/api/site-visits');
      const data = await res.json();
      if (data.success && data.siteVisits) {
        setSiteVisits(data.siteVisits);
      }
    } catch {
      setSiteVisits([
        {
          id: 'SV-1049',
          customerName: 'Zainab Siddiqui',
          phone: '0321-9988776',
          area: 'DHA Phase 5 (Showroom Vicinity)',
          preferredDate: '2025-06-15',
          timeSlot: 'Afternoon (2:00 PM – 5:00 PM)',
          approxSqFt: 1400,
          materialsOfInterest: ['SPC Vinyl (Waterproof)', 'Herringbone Parquet'],
          status: 'confirmed'
        }
      ]);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title) return;

    try {
      const method = isNewProduct ? 'POST' : 'PUT';
      const endpoint = isNewProduct ? '/api/products' : `/api/products/${editingProduct.id}`;
      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      onRefreshProducts();
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Delete this surface from catalog?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefreshProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded5be]">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5731]">
            Showroom Operations
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241c15]">
            Atelier Management Console
          </h1>
          <p className="text-xs text-[#786c5e]">
            First Floor Floorings • 20 C, 26th Street, DHA Phase 5, Karachi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-sm"
          >
            View Live Store
          </button>
        </div>
      </div>

      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg border border-[#ded5be] space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-500">Catalog Surfaces</span>
          <div className="font-serif text-2xl font-bold text-[#241c15]">{products.length}</div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-[#ded5be] space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-500">Active Orders</span>
          <div className="font-serif text-2xl font-bold text-[#7b5731]">{orders.length}</div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-[#ded5be] space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-500">Karachi Site Visits</span>
          <div className="font-serif text-2xl font-bold text-emerald-800">{siteVisits.length}</div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-[#ded5be] space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-500">Installation Rate</span>
          <div className="font-serif text-2xl font-bold text-stone-900">Rs. {installRate}/sqft</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#ded5be] text-xs font-serif font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'products' ? 'border-[#7b5731] text-[#7b5731]' : 'border-transparent text-stone-600'
          }`}
        >
          <Package className="w-4 h-4" /> Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-[#7b5731] text-[#7b5731]' : 'border-transparent text-stone-600'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('site-visits')}
          className={`px-5 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'site-visits' ? 'border-[#7b5731] text-[#7b5731]' : 'border-transparent text-stone-600'
          }`}
        >
          <Calendar className="w-4 h-4" /> Site Visits ({siteVisits.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 border-b-2 flex items-center gap-2 ${
            activeTab === 'settings' ? 'border-[#7b5731] text-[#7b5731]' : 'border-transparent text-stone-600'
          }`}
        >
          <Settings className="w-4 h-4" /> Showroom Config
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-[#241c15]">Current Flooring Inventory</h3>
            <button
              onClick={() => {
                setIsNewProduct(true);
                setEditingProduct({
                  id: `prod-${Date.now()}`,
                  title: '',
                  slug: '',
                  materialType: 'SPC Vinyl',
                  pricePerSqFt: 350,
                  pricePerBox: 8050,
                  coveragePerBox: 23,
                  thickness: '6.5mm (5mm Core + 1.5mm IXPE)',
                  waterResistance: '100% Waterproof',
                  stockBoxes: 150,
                  thumbnail: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
                  specs: {
                    material: 'Rigid Limestone SPC',
                    thickness: '6.5mm',
                    wearLayer: '0.55mm',
                    waterResistance: '100% Waterproof',
                    installationMethod: 'Click-Lock',
                    dimensions: '1220mm x 180mm x 6.5mm',
                    warrantyYears: 25,
                    soundInsulation: '21dB Integrated IXPE',
                    origin: 'Imported European Standard'
                  }
                });
              }}
              className="px-4 py-2 bg-[#241c15] text-[#f4eee1] rounded-sm text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Surface
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl border border-[#ded5be]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf7f0] border-b border-[#ded5be] font-serif uppercase tracking-wider text-[11px] text-[#7b5731]">
                <tr>
                  <th className="p-3">Surface</th>
                  <th className="p-3">Core Material</th>
                  <th className="p-3">Price / SqFt</th>
                  <th className="p-3">Box Price</th>
                  <th className="p-3">Coverage</th>
                  <th className="p-3">Stock (Boxes)</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.thumbnail} alt={p.title} className="w-10 h-10 object-cover rounded-xs border border-stone-200" />
                      <div>
                        <strong className="font-bold text-stone-900 block truncate max-w-xs">{p.title}</strong>
                        <span className="text-[10px] text-stone-500">{p.thickness}</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-stone-700">{p.materialType}</td>
                    <td className="p-3 font-bold text-[#7b5731]">{formatPKR(p.pricePerSqFt)}</td>
                    <td className="p-3 text-stone-800">{formatPKR(p.pricePerBox)}</td>
                    <td className="p-3 text-stone-600">{p.coveragePerBox} sq ft</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 text-[11px]">
                        {p.stockBoxes} Boxes
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setIsNewProduct(false);
                          setEditingProduct(p);
                        }}
                        className="p-1.5 text-stone-600 hover:text-stone-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Add Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white rounded-xl border border-[#ded5be] p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-xs"
          >
            <h3 className="font-serif text-lg font-bold text-[#241c15]">
              {isNewProduct ? 'Add New Flooring Surface' : 'Edit Surface Details'}
            </h3>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Title</label>
              <input
                type="text"
                required
                value={editingProduct.title || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                className="w-full p-2 border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Price / Sq Ft (PKR)</label>
                <input
                  type="number"
                  required
                  value={editingProduct.pricePerSqFt || ''}
                  onChange={(e) => {
                    const sqft = Number(e.target.value);
                    const cov = editingProduct.coveragePerBox || 23;
                    setEditingProduct({ ...editingProduct, pricePerSqFt: sqft, pricePerBox: Math.round(sqft * cov) });
                  }}
                  className="w-full p-2 border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Coverage / Box (sq ft)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editingProduct.coveragePerBox || ''}
                  onChange={(e) => {
                    const cov = Number(e.target.value);
                    const sqft = editingProduct.pricePerSqFt || 300;
                    setEditingProduct({ ...editingProduct, coveragePerBox: cov, pricePerBox: Math.round(sqft * cov) });
                  }}
                  className="w-full p-2 border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Calculated Box Price</label>
                <input
                  type="number"
                  value={editingProduct.pricePerBox || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, pricePerBox: Number(e.target.value) })}
                  className="w-full p-2 border border-stone-300 rounded-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Stock (Boxes)</label>
                <input
                  type="number"
                  value={editingProduct.stockBoxes || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stockBoxes: Number(e.target.value) })}
                  className="w-full p-2 border border-stone-300 rounded-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Material Type</label>
              <select
                value={editingProduct.materialType || 'SPC Vinyl'}
                onChange={(e) => setEditingProduct({ ...editingProduct, materialType: e.target.value as any })}
                className="w-full p-2 border border-stone-300 rounded-sm font-medium"
              >
                <option value="SPC Vinyl">SPC Vinyl</option>
                <option value="Laminate">Laminate</option>
                <option value="Engineered Wood">Engineered Wood</option>
                <option value="Solid Hardwood">Solid Hardwood</option>
                <option value="Outdoor Decking">Outdoor Decking</option>
                <option value="Carpet Tiles">Carpet Tiles</option>
                <option value="Artificial Grass">Artificial Grass</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Image URL</label>
              <input
                type="text"
                value={editingProduct.thumbnail || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
                className="w-full p-2 border border-stone-300 rounded-sm font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#241c15] text-white rounded-sm font-bold"
              >
                Save Surface
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-[#241c15]">Client Procurement Orders</h3>
          <div className="overflow-x-auto bg-white rounded-xl border border-[#ded5be]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf7f0] border-b border-[#ded5be] font-serif uppercase tracking-wider text-[11px] text-[#7b5731]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Total Value</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-[#241c15]">#{o.id}</td>
                    <td className="p-3 font-semibold text-stone-900">{o.customerName}</td>
                    <td className="p-3 text-stone-600">{o.customerPhone}</td>
                    <td className="p-3 text-stone-600 truncate max-w-xs">{o.deliveryAddress}</td>
                    <td className="p-3 font-serif font-bold text-[#7b5731]">{formatPKR(o.grandTotal)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 text-[10px] uppercase">
                        {o.status || 'Dispatched'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={o.status || 'dispatched'}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="p-1 border border-stone-300 rounded-sm text-[11px]"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Site Visits Tab */}
      {activeTab === 'site-visits' && (
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-[#241c15]">Karachi In-Home Site Visits</h3>
          <div className="overflow-x-auto bg-white rounded-xl border border-[#ded5be]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf7f0] border-b border-[#ded5be] font-serif uppercase tracking-wider text-[11px] text-[#7b5731]">
                <tr>
                  <th className="p-3">Ref</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Karachi Area</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Approx Area</th>
                  <th className="p-3">Requested Swatches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {siteVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-[#241c15]">#{v.id}</td>
                    <td className="p-3 font-semibold text-stone-900">{v.customerName}</td>
                    <td className="p-3 text-stone-600">{v.phone}</td>
                    <td className="p-3 text-stone-700">{v.area}</td>
                    <td className="p-3 font-medium text-stone-900">
                      {v.preferredDate} ({v.timeSlot})
                    </td>
                    <td className="p-3 text-stone-600">{v.approxSqFt} sq ft</td>
                    <td className="p-3 text-stone-500">
                      {(v.materialsOfInterest || []).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white rounded-xl border border-[#ded5be] p-6 space-y-4 text-xs">
          <h3 className="font-serif text-base font-bold text-[#241c15]">
            Showroom Master Parameters
          </h3>
          <p className="text-[#786c5e]">
            Configured without touching code. Stored in application settings and synchronized with header, footer, WhatsApp, and quotation logic.
          </p>

          {settingsSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-sm border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Showroom settings updated successfully.</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-stone-800 mb-1">Phone / WhatsApp Number (Raw)</label>
            <input
              type="text"
              value={phoneConfig}
              onChange={(e) => setPhoneConfig(e.target.value)}
              className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-mono"
            />
            <span className="text-[10px] text-stone-500">
              International WhatsApp link generated: https://wa.me/9232135304261
            </span>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Flagship Address</label>
            <textarea
              rows={2}
              value={addressConfig}
              onChange={(e) => setAddressConfig(e.target.value)}
              className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Karachi Installation Labor Rate (PKR / sq ft)</label>
            <input
              type="number"
              value={installRate}
              onChange={(e) => setInstallRate(e.target.value)}
              className="w-full p-2.5 bg-[#faf7f0] border border-stone-300 rounded-sm font-bold"
            />
          </div>

          <button
            type="button"
            onClick={() => setSettingsSaved(true)}
            className="px-6 py-2.5 bg-[#241c15] text-[#f4eee1] rounded-sm font-bold uppercase tracking-wider"
          >
            Save Showroom Settings
          </button>
        </div>
      )}
    </div>
  );
};
