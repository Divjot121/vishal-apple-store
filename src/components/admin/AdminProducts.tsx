'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Product, Category, Condition, ProductVariant } from '@/types';
import { formatINR } from '@/lib/utils';
import { productRepository } from '@/lib/repository';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function AdminProducts() {
  const { products, refreshData } = useStore();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('iPhone');
  const [condition, setCondition] = useState<Condition>('New');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('/devices/iphone-16-pro-natural.png');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [batteryHealth, setBatteryHealth] = useState<number>(100);
  const [cosmeticScore, setCosmeticScore] = useState('10/10 Factory Sealed');

  // Specs
  const [chip, setChip] = useState('A18 Pro with 6-core GPU');
  const [display, setDisplay] = useState('6.9" Super Retina XDR OLED');
  const [camera, setCamera] = useState('48MP Main + 48MP Ultra-Wide');
  const [battery, setBattery] = useState('Up to 33 hours video playback');
  const [warranty, setWarranty] = useState('1 Year Official Brand Warranty');

  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: 'v-1',
      storage: '256GB',
      colour: 'Natural Titanium',
      colorHex: '#9E9A93',
      price: 139900,
      mrp: 144900,
      stock: 3,
    },
  ]);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('iPhone');
    setCondition('New');
    setTagline('Pure titanium craftsmanship.');
    setDescription('Carefully inspected and certified for premium retail standards.');
    setImagePath('/devices/iphone-16-pro-natural.png');
    setIsFeatured(false);
    setIsVisible(true);
    setBatteryHealth(100);
    setCosmeticScore('10/10 Factory Sealed');
    setChip('A18 Pro with 6-core GPU');
    setDisplay('6.3" Super Retina XDR OLED');
    setCamera('48MP Fusion Camera');
    setBattery('Up to 27 hours video playback');
    setWarranty('1 Year Official Brand Warranty');
    setVariants([
      {
        id: `v-${Date.now()}`,
        storage: '256GB',
        colour: 'Natural Titanium',
        colorHex: '#9E9A93',
        price: 119900,
        mrp: 129900,
        stock: 3,
      },
    ]);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setCondition(p.condition);
    setTagline(p.tagline);
    setDescription(p.description);
    setImagePath(p.images[0] || '/devices/iphone-16-pro-natural.png');
    setIsFeatured(p.isFeatured);
    setIsVisible(p.isVisible);
    setBatteryHealth(p.gradingReport?.batteryHealth || 100);
    setCosmeticScore(p.gradingReport?.cosmeticScore || '10/10');
    setChip(p.specs.chip);
    setDisplay(p.specs.display);
    setCamera(p.specs.camera || '');
    setBattery(p.specs.battery);
    setWarranty(p.specs.warranty);
    setVariants([...p.variants]);
    setModalOpen(true);
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: `v-${Date.now()}`,
        storage: '512GB',
        colour: 'Black Titanium',
        colorHex: '#252528',
        price: variants[0]?.price ? variants[0].price + 20000 : 139900,
        mrp: variants[0]?.mrp ? variants[0].mrp + 20000 : 149900,
        stock: 2,
      },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const handleVariantChange = (
    id: string,
    field: keyof ProductVariant,
    value: any
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const basePrice = variants[0]?.price || 99900;
    const mrp = variants[0]?.mrp || basePrice;
    const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);

    const productPayload = {
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      category,
      condition,
      basePrice,
      mrp,
      deviceModel: name,
      tagline,
      description,
      images: [imagePath],
      variants,
      specs: {
        chip,
        display,
        camera,
        battery,
        port: category === 'Mac' ? '3x Thunderbolt 4, MagSafe 3' : 'USB-C',
        biometrics: category === 'Mac' ? 'Touch ID' : 'Face ID',
        weight: '199g',
        warranty,
      },
      gradingReport: {
        batteryHealth,
        cosmeticScore,
        accessoriesIncluded: ['Official Box', 'Original Cable'],
        inspectionDate: new Date().toISOString().split('T')[0],
      },
      isVerified: true,
      isFeatured,
      isVisible,
      inStock: totalStock > 0,
    };

    try {
      if (editingProduct) {
        await productRepository.update(editingProduct.id, productPayload);
        setFeedback(`Updated ${name} successfully!`);
      } else {
        await productRepository.create(productPayload);
        setFeedback(`Created ${name} successfully!`);
      }
      await refreshData();
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string, prodName: string) => {
    if (confirm(`Are you sure you want to delete ${prodName} from catalog?`)) {
      await productRepository.delete(id);
      await refreshData();
      setFeedback(`Deleted ${prodName}`);
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleToggleVisibility = async (product: Product) => {
    await productRepository.update(product.id, { isVisible: !product.isVisible });
    await refreshData();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24A]">
            Catalog Management
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Products & Variants Manager
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Add new hardware lots, edit specs, manage multiple storage/colour configurations, or toggle catalog visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-semibold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Device</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="p-4 rounded-xl bg-[#141418] border border-white/[0.08]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by device title..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A24A]"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prod) => {
          const totalStock = prod.variants.reduce((sum, v) => sum + (v.stock || 0), 0);

          return (
            <div
              key={prod.id}
              className={`p-5 rounded-2xl bg-[#141418] border transition-all flex flex-col justify-between ${
                prod.isVisible
                  ? 'border-white/[0.08] hover:border-white/20'
                  : 'border-rose-500/30 opacity-70 bg-neutral-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      prod.condition === 'New'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : prod.condition === 'Unboxed'
                        ? 'bg-[#C9A24A]/10 text-[#C9A24A]'
                        : 'bg-sky-500/10 text-sky-400'
                    }`}
                  >
                    {prod.condition}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {prod.isFeatured && (
                      <span className="p-1 rounded bg-[#C9A24A]/20 text-[#C9A24A]" title="Featured">
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(prod)}
                      className="p-1 rounded text-neutral-400 hover:text-white"
                      title={prod.isVisible ? 'Hide from storefront' : 'Make visible'}
                    >
                      {prod.isVisible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-rose-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-14 h-14 bg-neutral-900 rounded-lg p-1 shrink-0">
                    <Image
                      src={prod.images[0] || '/devices/iphone-16-pro-natural.png'}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{prod.name}</h3>
                    <p className="text-xs font-semibold text-[#C9A24A]">{formatINR(prod.basePrice)}</p>
                    <span className="text-[10px] text-neutral-400">{prod.variants.length} Variants · Stock: {totalStock}</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 line-clamp-2 mb-3">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                  {prod.specs.chip}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(prod)}
                    className="p-1.5 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700"
                    title="Edit device details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(prod.id, prod.name)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    title="Delete device"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl bg-[#141418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24A]">
                  {editingProduct ? 'Edit Existing Device' : 'Create New Inventory Item'}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {editingProduct ? editingProduct.name : 'Add Apple Device'}
                </h3>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Device Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. iPhone 16 Pro Max"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                    >
                      <option value="iPhone">iPhone</option>
                      <option value="Mac">Mac</option>
                      <option value="iPad">iPad</option>
                      <option value="AirPods">AirPods</option>
                      <option value="Watch">Watch</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as Condition)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                    >
                      <option value="New">New (Sealed)</option>
                      <option value="Unboxed">Unboxed</option>
                      <option value="Pre-owned">Pre-owned</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tagline & Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Titanium precision. Next-generation speed."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed inspection summary and features..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                />
              </div>

              {/* Device Graphic Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Product Image (Official Apple Render)
                </label>
                <select
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-[#C9A24A] focus:outline-none"
                >
                  <option value="/devices/iphone-16-pro-natural.png">iPhone 16 Pro (Natural Titanium)</option>
                  <option value="/devices/iphone-16-pro-black.png">iPhone 16 Pro (Black Titanium)</option>
                  <option value="/devices/iphone-16-pro-desert.png">iPhone 16 Pro (Desert Titanium)</option>
                  <option value="/devices/iphone-16-pro-white.png">iPhone 16 Pro (White Titanium)</option>
                  <option value="/devices/iphone-16-teal.png">iPhone 16 (Teal)</option>
                  <option value="/devices/iphone-16-black.png">iPhone 16 (Black)</option>
                  <option value="/devices/iphone-16-pink.png">iPhone 16 (Pink)</option>
                  <option value="/devices/iphone-15-pro-natural.png">iPhone 15 Pro (Natural Titanium)</option>
                  <option value="/devices/iphone-15-pro-blue.png">iPhone 15 Pro (Blue Titanium)</option>
                  <option value="/devices/iphone-15-blue.png">iPhone 15 (Blue)</option>
                  <option value="/devices/iphone-14-midnight.png">iPhone 14 (Midnight)</option>
                  <option value="/devices/macbook-pro-14.png">MacBook Pro 14 (Space Black)</option>
                  <option value="/devices/macbook-pro-16.png">MacBook Pro 16 (Space Black)</option>
                  <option value="/devices/macbook-air-15.png">MacBook Air 15 (Midnight)</option>
                  <option value="/devices/macbook-air-13.png">MacBook Air 13 (Space Gray)</option>
                  <option value="/devices/ipad-pro-13.png">iPad Pro 13 M4 (Space Black)</option>
                  <option value="/devices/ipad-air-11.png">iPad Air 11 (Blue)</option>
                  <option value="/devices/ipad-10th-gen.png">iPad 10th Gen (Silver)</option>
                  <option value="/devices/airpods-pro-2.png">AirPods Pro 2</option>
                  <option value="/devices/airpods-max.png">AirPods Max (Midnight)</option>
                  <option value="/devices/airpods-4.png">AirPods 4 ANC</option>
                  <option value="/devices/watch-ultra-2.png">Apple Watch Ultra 2</option>
                  <option value="/devices/watch-series-10.png">Apple Watch Series 10 (Jet Black)</option>
                  <option value="/devices/watch-se-2.png">Apple Watch SE 2 (Midnight)</option>
                  <option value="/devices/magsafe-charger.png">MagSafe Charger</option>
                  <option value="/devices/power-adapter.png">35W Dual USB-C Power Adapter</option>
                  <option value="/devices/apple-pencil-pro.png">Apple Pencil Pro</option>
                </select>
              </div>

              {/* Variants Section */}
              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                    Variants (Storage / Colour / Pricing)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs text-[#C9A24A] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Variant</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {variants.map((v, idx) => (
                    <div
                      key={v.id}
                      className="p-3 rounded-xl bg-neutral-900/80 border border-white/[0.06] grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-xs"
                    >
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Storage</span>
                        <input
                          type="text"
                          value={v.storage}
                          onChange={(e) => handleVariantChange(v.id, 'storage', e.target.value)}
                          className="w-full px-2 py-1 rounded bg-black border border-white/10 text-white font-medium"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Colour</span>
                        <input
                          type="text"
                          value={v.colour}
                          onChange={(e) => handleVariantChange(v.id, 'colour', e.target.value)}
                          className="w-full px-2 py-1 rounded bg-black border border-white/10 text-white font-medium"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Price (₹)</span>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => handleVariantChange(v.id, 'price', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded bg-black border border-white/10 text-[#C9A24A] font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Stock Qty</span>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => handleVariantChange(v.id, 'stock', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded bg-black border border-white/10 text-white font-bold"
                        />
                      </div>
                      <div className="flex justify-end pt-3 sm:pt-0">
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                            title="Remove variant"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Specs */}
              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 block">
                  Hardware Specifications
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-0.5">Chip / CPU</label>
                    <input
                      type="text"
                      value={chip}
                      onChange={(e) => setChip(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-0.5">Display</label>
                    <input
                      type="text"
                      value={display}
                      onChange={(e) => setDisplay(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-0.5">Battery Health %</label>
                    <input
                      type="number"
                      min="70"
                      max="100"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-0.5">Warranty</label>
                    <input
                      type="text"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-white/20 bg-neutral-900 text-[#C9A24A]"
                  />
                  <span>Feature on Hero / Highlights</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="rounded border-white/20 bg-neutral-900 text-emerald-400"
                  />
                  <span>Visible on Public Storefront</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C9A24A] hover:bg-[#b8913d] text-black font-bold text-xs shadow-lg"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
