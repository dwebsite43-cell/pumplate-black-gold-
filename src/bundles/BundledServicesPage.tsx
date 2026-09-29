import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Gift,
  Calendar,
  Layers,
  Award,
  Users,
  Shield,
  X,
  Phone,
  Check,
  Building,
  DollarSign,
  Heart,
  ChevronRight,
  Lock,
  Zap,
  MapPin,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { curatedBundles, customCatalogueServices } from './bundlesData';
import { BundledPackage, BundledServiceItem, BundleBookingRequest } from './types';

interface BundledServicesPageProps {
  onBackToLanding: () => void;
  onOpenPartnerConsole?: () => void;
  onOpenAdminPanel?: () => void;
}

export const BundledServicesPage: React.FC<BundledServicesPageProps> = ({
  onBackToLanding,
  onOpenPartnerConsole,
  onOpenAdminPanel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBundleForModal, setSelectedBundleForModal] = useState<BundledPackage | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [generatedPassId, setGeneratedPassId] = useState<string>('');

  // Form states
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('2026-10-15');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM');
  const [locationChoice, setLocationChoice] = useState<'flagship_salon' | 'vip_home_suite'>('flagship_salon');
  const [homeAddress, setHomeAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);

  // Custom Package Builder states
  const [selectedCustomServiceIds, setSelectedCustomServiceIds] = useState<string[]>([
    'cat-1',
    'cat-2',
    'cat-5',
  ]);

  // Compute Custom Package statistics
  const selectedCustomServices = customCatalogueServices.filter((s) =>
    selectedCustomServiceIds.includes(s.id)
  );

  const customSumOriginal = selectedCustomServices.reduce((sum, s) => sum + s.originalPrice, 0);
  const customTotalMinutes = selectedCustomServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  // Tiered discount calculation: 2 services = 15%, 3 services = 20%, 4+ services = 28%
  let customDiscountPct = 0;
  if (selectedCustomServices.length === 2) customDiscountPct = 15;
  else if (selectedCustomServices.length === 3) customDiscountPct = 20;
  else if (selectedCustomServices.length >= 4) customDiscountPct = 28;

  const customSavings = Math.round((customSumOriginal * customDiscountPct) / 100);
  const customPayable = customSumOriginal - customSavings;
  const customDeposit = Math.round(customPayable * 0.25);
  const customRemainder = customPayable - customDeposit;

  const toggleCustomService = (serviceId: string) => {
    setSelectedCustomServiceIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Filtered curated bundles
  const displayedBundles = curatedBundles.filter((bundle) => {
    if (selectedCategory === 'all') return true;
    return bundle.category === selectedCategory;
  });

  const handleOpenBooking = (bundle: BundledPackage) => {
    setSelectedBundleForModal(bundle);
    setBookingConfirmed(false);
    setIsBookingModalOpen(true);
  };

  const handleOpenCustomBooking = () => {
    if (selectedCustomServices.length < 2) return;
    const customBundleObj: BundledPackage = {
      id: 'custom-bundle',
      slug: 'bespoke-custom-bundle',
      name: `Bespoke Multi-Service Suite (${selectedCustomServices.length} Therapies)`,
      subtitle: 'Customized luxury treatment curation with tiered discount',
      badge: 'BESPOKE CREATION',
      category: 'all',
      durationHours: Number((customTotalMinutes / 60).toFixed(1)),
      services: selectedCustomServices,
      originalPrice: customSumOriginal,
      bundlePrice: customPayable,
      discountPercentage: customDiscountPct,
      savingsAmount: customSavings,
      depositPercent: 25,
      depositAmount: customDeposit,
      remainderAmount: customRemainder,
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      features: [
        'Dedicated VIP velvet suite reserved for custom duration',
        'Complimentary champagne and French macarons service',
        'Advance 25% escrow protection guarantee',
      ],
      idealFor: 'Personalized self-care and multi-treatment rejuvenation',
    };
    setSelectedBundleForModal(customBundleObj);
    setBookingConfirmed(false);
    setIsBookingModalOpen(true);
  };

  const handleConfirmEscrowBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      const newPassId = `NEX-BND-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedPassId(newPassId);
      setBookingConfirmed(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* 1. TOP EXECUTIVE HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToLanding}
              className="flex items-center space-x-2 text-[#D4AF37] hover:text-white transition-colors group cursor-pointer"
              title="Return to Nexora Showcase"
            >
              <span className="font-serif tracking-[0.25em] text-xl font-light">
                NEXORA <span className="text-white font-sans font-semibold tracking-wider text-xs bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">BUNDLED PACKAGES</span>
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToLanding}
              className="px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 text-[10px] tracking-[0.15em] uppercase font-mono transition-all"
              id="back-to-showcase-btn"
            >
              ← Back to Showcase
            </button>
            {onOpenPartnerConsole && (
              <button
                onClick={onOpenPartnerConsole}
                className="hidden sm:flex px-3 py-1.5 rounded-sm bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] tracking-[0.15em] uppercase font-mono items-center gap-1.5 transition-all"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Partner Console</span>
              </button>
            )}
            {onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="hidden sm:flex px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/20 text-[10px] tracking-[0.15em] uppercase font-mono items-center gap-1.5 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin #22</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO INTRO BANNER */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-[#0A0A0A] via-[#080808] to-[#050505] border-b border-[#D4AF37]/15 overflow-hidden">
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] gold-glow-radial rounded-full pointer-events-none opacity-40"></div>

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
            <Gift className="w-3.5 h-3.5" />
            <span>Curated Multi-Service Suites • Up to 35% Rate Privilege</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide">
              Haute Couture <span className="italic text-[#D4AF37]">Bundled Experiences</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 font-light max-w-3xl leading-relaxed">
              Combine world-class hair sculpture, 24K pure gold dermal therapies, and regenerative scalp rituals into synchronized luxury packages. Every reservation is secured via Nexora&apos;s 25% Advance Escrow with guaranteed counter UPI QR completion.
            </p>
          </div>

          {/* Quick Value Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="p-3 bg-black/60 rounded border border-[#D4AF37]/20">
              <span className="text-gray-500 uppercase text-[10px] block">Bridal Headliner</span>
              <span className="text-[#D4AF37] font-semibold text-sm">Bridal Glow Package</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">₹19,200 Savings (30% Off)</span>
            </div>
            <div className="p-3 bg-black/60 rounded border border-[#D4AF37]/20">
              <span className="text-gray-500 uppercase text-[10px] block">Maximum Privilege</span>
              <span className="text-emerald-400 font-semibold text-sm">Up to 35% Rate Cut</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Multi-service efficiency</span>
            </div>
            <div className="p-3 bg-black/60 rounded border border-[#D4AF37]/20">
              <span className="text-gray-500 uppercase text-[10px] block">Escrow Protected</span>
              <span className="text-white font-semibold text-sm">25% Advance Hold</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">75% at Counter QR</span>
            </div>
            <div className="p-3 bg-black/60 rounded border border-[#D4AF37]/20">
              <span className="text-gray-500 uppercase text-[10px] block">VIP Amenities</span>
              <span className="text-[#D4AF37] font-semibold text-sm">Private Velvet Suites</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Moët &amp; Chandon Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SELECTOR TABS */}
      <section className="sticky top-18 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#D4AF37]/15 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2 text-xs font-mono">
            {[
              { id: 'all', label: 'All Packages (5)' },
              { id: 'bridal', label: 'Bridal & Wedding' },
              { id: 'gala', label: 'Red Carpet & Galas' },
              { id: 'wellness', label: 'Wellness & Spa' },
              { id: 'executive', label: 'Men\'s Executive' },
              { id: 'couples', label: 'Couples Suite' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs whitespace-nowrap transition-all uppercase tracking-wider ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'bg-[#111111] text-gray-400 hover:text-white border border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <a
            href="#custom-builder"
            className="px-3 py-1.5 rounded text-xs font-mono uppercase bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 whitespace-nowrap flex items-center gap-1 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Builder</span>
          </a>
        </div>
      </section>

      {/* 4. CURATED PACKAGES CATALOGUE */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-widest block">
                FLAGSHIP CURATIONS
              </span>
              <h2 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                Available Bundled Packages
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500">
              Showing {displayedBundles.length} of {curatedBundles.length} Suites
            </span>
          </div>

          {/* Packages List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedBundles.map((bundle) => {
              const isBridal = bundle.id === 'bnd-bridal-glow';
              return (
                <div
                  key={bundle.id}
                  id={bundle.slug}
                  className={`rounded-xl bg-[#0A0A0A] border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl relative ${
                    isBridal
                      ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.18)] ring-1 ring-[#D4AF37]/40'
                      : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {/* Top Spotlight Badge if bridal */}
                  {isBridal && (
                    <div className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] text-black text-[10px] font-mono font-bold uppercase tracking-widest text-center py-1">
                      ★ Most Popular Bride &amp; Trousseau Package • 30% Privilege Applied
                    </div>
                  )}

                  {/* Header with image & core info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                            {bundle.badge}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            <span>{bundle.durationHours} Hours Duration</span>
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-medium text-white tracking-wide">
                          {bundle.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {bundle.subtitle}
                        </p>
                      </div>

                      {/* Savings pill */}
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 block">
                          {bundle.discountPercentage}% OFF
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                          Save ₹{bundle.savingsAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Services Included Checklist */}
                    <div className="p-3.5 bg-black/70 rounded-lg border border-white/5 space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 border-b border-white/5 pb-1.5 uppercase tracking-wider">
                        <span>Services Combined ({bundle.services.length} Therapies)</span>
                        <span className="text-gray-500">A-la-carte Value</span>
                      </div>

                      <div className="space-y-2">
                        {bundle.services.map((srv) => (
                          <div key={srv.id} className="flex items-start justify-between text-xs gap-3">
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                              <div>
                                <span className="text-gray-200 font-medium block leading-tight">
                                  {srv.name}
                                </span>
                                <span className="text-[10px] font-mono text-gray-500">
                                  {srv.category} • {srv.durationMinutes} mins
                                </span>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-gray-400 line-through shrink-0">
                              ₹{srv.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* VIP Privileges */}
                    <div className="space-y-1.5 text-xs text-gray-400">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                        Included Suite Privileges:
                      </span>
                      <ul className="space-y-1 text-[11px] font-light">
                        {bundle.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing footer & CTA */}
                  <div className="p-6 bg-[#0E0E0E] border-t border-[#D4AF37]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-sm font-mono text-gray-500 line-through">
                            ₹{bundle.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-2xl font-mono text-[#D4AF37] font-semibold tracking-tight">
                            ₹{bundle.bundlePrice.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                          25% Advance Escrow: <strong className="text-white">₹{bundle.depositAmount.toLocaleString()}</strong> • 75% at Salon QR
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(bundle)}
                        className="metallic-button text-xs font-mono uppercase tracking-wider py-2.5 px-5 rounded font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] flex items-center gap-1.5 cursor-pointer"
                        id={`book-bundle-${bundle.slug}-btn`}
                      >
                        <span>Book Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. INTERACTIVE CUSTOM BUNDLE BUILDER */}
        <section id="custom-builder" className="pt-12 border-t border-[#D4AF37]/30 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Package Configurator</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
              Build Your Own <span className="italic text-[#D4AF37]">Bespoke Suite</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl font-light">
              Select 2 or more signature treatments from our atelier menu. Our automated pricing engine instantly applies tiered multi-service privileges (2 services = 15% off, 3 services = 20% off, 4+ services = 28% off).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Service Checklist */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
                <span>Select Services to Combine:</span>
                <span className="text-[#D4AF37]">{selectedCustomServices.length} Selected</span>
              </div>

              <div className="space-y-2.5">
                {customCatalogueServices.map((service) => {
                  const isChecked = selectedCustomServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleCustomService(service.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#121008] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.12)]'
                          : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold'
                              : 'border-gray-600 bg-black/40'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-white">{service.name}</h4>
                          <span className="text-[10px] font-mono text-gray-400">
                            {service.category} • {service.durationMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-xs text-[#D4AF37] font-semibold">
                          ₹{service.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 cols: Live Price Calculator & Book Custom CTA */}
            <div className="lg:col-span-5 bg-[#0D0D0D] p-6 rounded-xl border border-[#D4AF37]/35 space-y-5 sticky top-36 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-sm font-serif text-white tracking-wide">
                    Live Custom Rate Engine
                  </h3>
                </div>
                {customDiscountPct > 0 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    {customDiscountPct}% TIER PRIVILEGE
                  </span>
                )}
              </div>

              {selectedCustomServices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs font-mono">
                  Select at least 2 services on the left to activate bundled rate discounts.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Selected count & duration */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-black/60 rounded border border-white/5">
                      <span className="text-[9px] text-gray-500 uppercase block">Selected Therapies</span>
                      <span className="text-white font-semibold">{selectedCustomServices.length} Services</span>
                    </div>
                    <div className="p-2.5 bg-black/60 rounded border border-white/5">
                      <span className="text-[9px] text-gray-500 uppercase block">Total Duration</span>
                      <span className="text-white font-semibold">
                        {Math.floor(customTotalMinutes / 60)}h {customTotalMinutes % 60}m
                      </span>
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-2 text-xs font-mono border-t border-b border-white/5 py-3">
                    <div className="flex justify-between text-gray-400">
                      <span>A-la-carte Sum Total:</span>
                      <span className="line-through">₹{customSumOriginal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Bundled Privilege Savings ({customDiscountPct}%):</span>
                      <span>-₹{customSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white text-base pt-1 font-bold">
                      <span className="text-[#D4AF37]">Bundled Package Total:</span>
                      <span className="text-[#D4AF37]">₹{customPayable.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 25% Escrow split breakdown */}
                  <div className="p-3 bg-black/80 rounded border border-[#D4AF37]/20 text-[11px] font-mono space-y-1.5">
                    <div className="flex justify-between text-gray-300">
                      <span>25% Advance Escrow Deposit:</span>
                      <span className="text-emerald-400 font-bold">₹{customDeposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>75% Counter QR Settlement:</span>
                      <span>₹{customRemainder.toLocaleString()}</span>
                    </div>
                    <p className="text-[9px] text-gray-500 pt-1">
                      Protected by Nexora Escrow Vault. Held safely until day of service.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCustomBooking}
                    disabled={selectedCustomServices.length < 2}
                    className={`w-full py-3 text-xs font-mono uppercase tracking-wider rounded font-bold transition-all flex items-center justify-center gap-2 ${
                      selectedCustomServices.length >= 2
                        ? 'metallic-button cursor-pointer'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    id="book-custom-bundle-btn"
                  >
                    <span>Book Custom Suite ({selectedCustomServices.length} Services)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 6. VIP ESCROW RESERVATION MODAL / DRAWER */}
      <AnimatePresence>
        {isBookingModalOpen && selectedBundleForModal && (
          <div className="fixed inset-0 z-[120] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-out drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-lg md:max-w-xl bg-[#0A0A0A] border-l-2 border-[#D4AF37]/50 shadow-[0_0_80px_rgba(212,175,55,0.3)] text-white flex flex-col h-full z-10 overflow-hidden"
              id="bundle-booking-drawer"
            >
              {/* Top Accent Ribbon */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37]"></div>

              {/* Header */}
              <div className="p-6 border-b border-[#D4AF37]/20 flex items-start justify-between bg-[#111111]/90">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/35 font-semibold">
                    VIP Escrow Reservation
                  </span>
                  <h3 className="text-xl font-serif text-white tracking-wide">
                    {selectedBundleForModal.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    Duration: {selectedBundleForModal.durationHours} Hours • {selectedBundleForModal.discountPercentage}% Rate Privilege
                  </p>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {bookingConfirmed ? (
                  /* CONFIRMATION PASS STATE */
                  <div className="space-y-6 text-center py-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-2xl font-serif text-[#D4AF37]">
                        VIP Reservation Confirmed
                      </h4>
                      <p className="text-xs font-mono text-gray-400">
                        Pass ID: <span className="text-white font-bold">{generatedPassId}</span> • Escrow Hold Active
                      </p>
                    </div>

                    {/* Digital Gold Pass Card */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-[#14120C] to-[#0A0A0A] border-2 border-[#D4AF37]/50 text-left space-y-4 shadow-xl">
                      <div className="flex justify-between items-start border-b border-[#D4AF37]/20 pb-3">
                        <div>
                          <span className="text-[9px] font-mono text-gray-400 uppercase">L'Étoile Flagship Suite</span>
                          <h5 className="text-base font-serif text-white">{selectedBundleForModal.name}</h5>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold">
                          25% ESCROW SECURED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">Guest Name</span>
                          <span className="text-white font-medium">{guestName}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">Date &amp; Time</span>
                          <span className="text-[#D4AF37] font-medium">{eventDate} • {timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">Experience Location</span>
                          <span className="text-white">
                            {locationChoice === 'flagship_salon' ? 'Flagship Salon Suite' : 'VIP Home Concierge'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">Deposit Authorized</span>
                          <span className="text-emerald-400 font-bold">
                            ₹{selectedBundleForModal.depositAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                        <span>Balance at Counter QR: ₹{selectedBundleForModal.remainderAmount.toLocaleString()}</span>
                        <span className="text-[#D4AF37]">Concierge SMS Dispatched</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 font-light max-w-sm mx-auto">
                      Our private liaison has dispatched confirmation to <strong className="text-white">{guestPhone}</strong>. Your Velvet Suite and therapists are reserved.
                    </p>

                    <button
                      onClick={() => setIsBookingModalOpen(false)}
                      className="w-full py-3 metallic-button text-xs font-mono uppercase tracking-wider rounded font-bold"
                    >
                      Done &amp; Return
                    </button>
                  </div>
                ) : (
                  /* BOOKING FORM STATE */
                  <form onSubmit={handleConfirmEscrowBooking} className="space-y-6">
                    {/* Financial Summary Card */}
                    <div className="p-4 rounded-xl bg-[#111111] border border-[#D4AF37]/30 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-400">Package A-la-carte Value:</span>
                        <span className="text-gray-500 line-through">
                          ₹{selectedBundleForModal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                        <span>Bundled Privilege Savings:</span>
                        <span>-₹{selectedBundleForModal.savingsAmount.toLocaleString()} ({selectedBundleForModal.discountPercentage}%)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-mono font-bold text-white pt-1 border-t border-white/10">
                        <span>Bundled Total Rate:</span>
                        <span className="text-[#D4AF37] text-lg">
                          ₹{selectedBundleForModal.bundlePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono pt-1 text-emerald-300">
                        <span>Required 25% Advance Escrow:</span>
                        <span className="font-bold">₹{selectedBundleForModal.depositAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Guest Information Inputs */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                        1. Guest Credentials
                      </h4>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">
                          Full Name (Guest of Honor):
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Radhika Sen"
                          className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-mono text-white placeholder-gray-600 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 mb-1">
                            Mobile (WhatsApp):
                          </label>
                          <input
                            type="tel"
                            required
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+91 98200 12345"
                            className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-mono text-white placeholder-gray-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 mb-1">
                            Email (VIP Pass Delivery):
                          </label>
                          <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="guest@domain.com"
                            className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-mono text-white placeholder-gray-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Date & Location Settings */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                        2. Date, Time &amp; Location
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 mb-1">
                            Target Event Date:
                          </label>
                          <input
                            type="date"
                            required
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-mono text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 mb-1">
                            Preferred Time Slot:
                          </label>
                          <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs font-mono text-white focus:outline-none"
                          >
                            <option value="10:00 AM">10:00 AM (Morning Slot)</option>
                            <option value="11:30 AM">11:30 AM (Prime Slot)</option>
                            <option value="02:30 PM">02:30 PM (Afternoon Suite)</option>
                            <option value="05:00 PM">05:00 PM (Sunset Bridal)</option>
                          </select>
                        </div>
                      </div>

                      {/* Location Choice */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-gray-400">
                          Venue Preference:
                        </label>
                        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                          <button
                            type="button"
                            onClick={() => setLocationChoice('flagship_salon')}
                            className={`p-3 rounded border text-left transition-all ${
                              locationChoice === 'flagship_salon'
                                ? 'bg-[#151208] border-[#D4AF37] text-white font-medium'
                                : 'bg-black border-white/10 text-gray-400'
                            }`}
                          >
                            <Building className="w-4 h-4 text-[#D4AF37] mb-1" />
                            <span>Flagship Velvet Suite</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setLocationChoice('vip_home_suite')}
                            className={`p-3 rounded border text-left transition-all ${
                              locationChoice === 'vip_home_suite'
                                ? 'bg-[#151208] border-[#D4AF37] text-white font-medium'
                                : 'bg-black border-white/10 text-gray-400'
                            }`}
                          >
                            <MapPin className="w-4 h-4 text-[#D4AF37] mb-1" />
                            <span>VIP Home Concierge</span>
                          </button>
                        </div>
                      </div>

                      {locationChoice === 'vip_home_suite' && (
                        <div className="space-y-1 animate-fade-in">
                          <label className="block text-[10px] font-mono text-gray-400">
                            Residential / Hotel Suite Address:
                          </label>
                          <input
                            type="text"
                            required
                            value={homeAddress}
                            onChange={(e) => setHomeAddress(e.target.value)}
                            placeholder="e.g. Penthouse 42, The Imperial Towers, Tardeo, Mumbai"
                            className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 text-xs font-mono text-white focus:outline-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">
                          Bridal or Dietary Notes (Optional):
                        </label>
                        <textarea
                          rows={2}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="e.g. Wedding outfit color is champagne gold; allergic to eucalyptus oil."
                          className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/30 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Escrow Guarantee Disclaimer */}
                    <div className="p-3 bg-black/60 rounded border border-[#D4AF37]/25 text-[10px] font-mono text-gray-400 space-y-1 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#D4AF37] font-semibold block">Nexora Escrow Guarantee</span>
                        <span>Your 25% advance deposit (₹{selectedBundleForModal.depositAmount.toLocaleString()}) remains in vault until service commencement. 100% refundable up to 48 hours prior.</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isAuthorizing}
                      className="w-full py-3.5 metallic-button text-xs font-mono uppercase tracking-widest rounded font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                      id="confirm-escrow-btn"
                    >
                      {isAuthorizing ? (
                        <span>Securing Escrow Vault...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Authorize 25% Escrow (₹{selectedBundleForModal.depositAmount.toLocaleString()})</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
