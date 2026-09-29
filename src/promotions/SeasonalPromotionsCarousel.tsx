import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gift,
  Copy,
  Check,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Tag,
  Flame,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SeasonalPromotion {
  id: string;
  category: 'festive' | 'bridal' | 'seasonal';
  badge: string;
  tagline: string;
  title: string;
  description: string;
  countdownDays: number;
  countdownHours: number;
  countdownMinutes: number;
  originalPrice: number;
  festivePrice: number;
  discountPct: number;
  savingsAmount: number;
  depositAmount: number;
  promoCode: string;
  inclusions: string[];
  privileges: string[];
  image: string;
  idealFor: string;
}

export const seasonalPromotionsData: SeasonalPromotion[] = [
  {
    id: 'promo-diwali-gold',
    category: 'festive',
    badge: 'DIWALI FESTIVE PRIVILEGE',
    tagline: 'Limited Festive Release • 35% Multi-Service Savings',
    title: 'Royal Diwali 24K Gold & Champagne Radiance',
    description: 'Immaculate festive luminosity uniting pure 24-karat gold body polishing, French hand-painted balayage illumination, and white caviar scalp detox.',
    countdownDays: 5,
    countdownHours: 14,
    countdownMinutes: 32,
    originalPrice: 50000,
    festivePrice: 32500,
    discountPct: 35,
    savingsAmount: 17500,
    depositAmount: 8125,
    promoCode: 'DIWALI-GOLD-35',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Diwali Cards Parties, Laxmi Pujan Galas, Family Festivities',
    inclusions: [
      '24K Pure Gold Thermal Body Polish & Champagne Wrap',
      'Signature French 24K Gold Balayage & Crown Sculpting',
      'Royal Caviar & White Truffle Scalp Detox Therapy'
    ],
    privileges: [
      'Private Velvet Presidential Suite reserved for 4.5 hours',
      'Complimentary bottle of sparkling French cider & Diwali mithai box',
      'Dedicated styling directorship by Master Jean-Jacques'
    ]
  },
  {
    id: 'promo-bridal-trousseau',
    category: 'bridal',
    badge: 'AUTUMN-WINTER BRIDAL SUITE',
    tagline: 'Signature Wedding Trousseau • Limited Bridal Slots',
    title: 'The Imperial Bridal Glow Sanctuary',
    description: 'The definitive 6.5-hour head-to-toe couture curation ensuring exquisite camera-ready bridal luminosity, scalp revival, and 24K gold skin smoothing.',
    countdownDays: 8,
    countdownHours: 21,
    countdownMinutes: 15,
    originalPrice: 64000,
    festivePrice: 44800,
    discountPct: 30,
    savingsAmount: 19200,
    depositAmount: 11200,
    promoCode: 'BRIDAL-GLOW-30',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Brides, Sangeet & Reception Appearances, Destination Weddings',
    inclusions: [
      'Signature French Gold Balayage & Crown Sculpting (180 mins)',
      'Royal Caviar & White Truffle Scalp Detox (90 mins)',
      '24K Pure Gold Thermal Body Polish & Champagne Wrap (120 mins)',
      'Elite Hyperbaric Oxygen Facial & Diamond Dust Infusion (75 mins)'
    ],
    privileges: [
      'Private Velvet Suite with Moët & Chandon champagne service',
      'Complimentary bridal veil & headpiece anchoring trial',
      'VIP Concierge Mercedes-Maybach transfer option available'
    ]
  },
  {
    id: 'promo-moonlight-glow',
    category: 'festive',
    badge: 'NAVRATRI & KARWA CHAUTH SPECIAL',
    tagline: 'High-Demand Festive Slot • Instant Radiant Finish',
    title: 'Moonlight Pearl Radiance & Silk Hydration',
    description: 'Bespoke pre-celebration rejuvenation formulated with Japanese silk hair restructuring, micronized pearl facial infusion, and precision architectural styling.',
    countdownDays: 3,
    countdownHours: 9,
    countdownMinutes: 44,
    originalPrice: 29000,
    festivePrice: 20880,
    discountPct: 28,
    savingsAmount: 8120,
    depositAmount: 5220,
    promoCode: 'MOONLIGHT-28',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Karwa Chauth Evenings, Dandiya Nights, Festive Receptions',
    inclusions: [
      'Japanese Silk Hair Hydration Therapy & Infrared Seal',
      'Elite Hyperbaric Oxygen Facial with Mineral Quartz Release',
      'Couture Precision Cut & Sculptural Blowout'
    ],
    privileges: [
      'Aromatherapy scalp massage with French lavender vapors',
      'Complimentary cold-pressed organic pomegranate nectar',
      'Fast-track 2.5 hour express luxury turnaround'
    ]
  },
  {
    id: 'promo-groom-suite',
    category: 'bridal',
    badge: 'ROYAL GROOM\'S SPECIAL',
    tagline: 'Wedding Season Men\'s Atelier • 30% Privilege',
    title: 'The Sovereign Maharaja Grooming Suite',
    description: 'Precision hot-lather contour shave with hand-honed Japanese straight razor, bespoke beard balancing, botanical scalp therapy, and hand buffing.',
    countdownDays: 12,
    countdownHours: 16,
    countdownMinutes: 50,
    originalPrice: 18100,
    festivePrice: 12670,
    discountPct: 30,
    savingsAmount: 5430,
    depositAmount: 3168,
    promoCode: 'GROOM-ROYAL-30',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Grooms, Groomsmen Parties, High-Level Gala Attendees',
    inclusions: [
      'Executive Diamond Hot-Towel Shave with Multi-Layer Oils',
      'Royal Bespoke Beard Shaping & Botanical Argan Lock',
      'Scalp Detox & Thermal Mist Acupressure',
      'Japanese Silk Hand Architecture & Satin Buffing'
    ],
    privileges: [
      'Single-malt Scotch or bespoke espresso served in crystal',
      'Private masculine leather throne grooming suite',
      'Pre-wedding grooming consultation and facial alignment'
    ]
  },
  {
    id: 'promo-newyear-gala',
    category: 'seasonal',
    badge: 'NEW YEAR\'S EVE COUTURE',
    tagline: 'Year-End Gala Preparation • 35% Early Privilege',
    title: 'Couture Gala Red Carpet & Champagne Glow',
    description: 'High-definition camera-ready finish with 16-hour locked shine, Parisian keratin glaze, crystal quartz oxygen smoothing, and volume blowout.',
    countdownDays: 18,
    countdownHours: 6,
    countdownMinutes: 10,
    originalPrice: 32500,
    festivePrice: 21125,
    discountPct: 35,
    savingsAmount: 11375,
    depositAmount: 5281,
    promoCode: 'GALA-GLOW-35',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    idealFor: 'New Year Eve Galas, Award Evenings, Luxury Brand Launches',
    inclusions: [
      'Parisian Keratin Glaze & Velvet Infusion',
      'Elite Hyperbaric Oxygen Facial Infusion',
      'Couture Precision Sculpting & Signature Blowout'
    ],
    privileges: [
      '16-hour humidity and flash-photography locked radiance',
      'Complimentary glass of Laurent-Perrier Champagne',
      'Express VIP reservation pass with Escrow protection'
    ]
  }
];

interface SeasonalPromotionsCarouselProps {
  onNavigateToBundles: () => void;
  onBookPromotion?: (promo: SeasonalPromotion) => void;
}

export const SeasonalPromotionsCarousel: React.FC<SeasonalPromotionsCarouselProps> = ({
  onNavigateToBundles,
  onBookPromotion,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'festive' | 'bridal' | 'seasonal'>('all');

  // Live ticking seconds countdown
  const [secondsTick, setSecondsTick] = useState<number>(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsTick((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter promotions list
  const filteredPromos = seasonalPromotionsData.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  // Clamp current index if filtered list changes
  const activePromo = filteredPromos[currentIndex % filteredPromos.length] || filteredPromos[0];

  // Auto-advance carousel every 5.5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredPromos.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, filteredPromos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPromos.length) % filteredPromos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPromos.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <section
      id="seasonal-promotions"
      className="py-20 px-6 bg-gradient-to-b from-[#050505] via-[#090805] to-[#0A0A0A] border-y border-[#D4AF37]/25 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] gold-glow-radial-strong opacity-30 pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header Block with Title & Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>LIMITED-TIME SEASONAL PROMOTIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide">
              Festive Privileges &amp; <span className="italic text-[#D4AF37]">Bridal Suites</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
              Celebrate the celebratory season with multi-service rate cuts up to 35%. Complete wedding trousseau appointments and festive Diwali transformations protected with 25% Advance Escrow.
            </p>
          </div>

          {/* Category Filter Pills & Carousel Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 text-[11px] font-mono bg-black/60 p-1 rounded-lg border border-white/10">
              {[
                { id: 'all', label: 'All Offers (5)' },
                { id: 'festive', label: 'Diwali & Festive' },
                { id: 'bridal', label: 'Bridal Suites' },
                { id: 'seasonal', label: 'Gala & NYE' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilterCategory(f.id as any);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                    filterCategory === f.id
                      ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#D4AF37]/35 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Previous Promotion"
                id="carousel-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#D4AF37]/35 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Next Promotion"
                id="carousel-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Main Stage Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePromo.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="rounded-2xl bg-gradient-to-br from-[#0F0E0B] via-[#0C0C0C] to-[#080808] border-2 border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.18)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              id={`seasonal-promo-card-${activePromo.id}`}
            >
              {/* Left Column: Visual & Live Countdown (5 cols) */}
              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full flex flex-col justify-between p-6 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.3), rgba(5,5,5,0.85)), url(${activePromo.image})`,
                }}
              >
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 z-10">
                  <span className="px-3 py-1 rounded bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-md">
                    {activePromo.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                    {activePromo.discountPct}% PRIVILEGE
                  </span>
                </div>

                {/* Bottom Overlay: Live Urgency Countdown Timer */}
                <div className="z-10 space-y-3 bg-black/85 backdrop-blur-md p-4 rounded-xl border border-[#D4AF37]/30">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
                    <span className="flex items-center gap-1.5 text-[#D4AF37]">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>FESTIVE WINDOW CLOSES IN:</span>
                    </span>
                    <span className="text-emerald-400 animate-pulse font-bold">EXCLUSIVE SLOTS</span>
                  </div>

                  {/* Countdown Blocks */}
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="bg-black/90 p-2 rounded border border-[#D4AF37]/30">
                      <span className="text-lg font-bold text-white block leading-none">
                        0{activePromo.countdownDays}
                      </span>
                      <span className="text-[9px] text-gray-400 uppercase">Days</span>
                    </div>
                    <div className="bg-black/90 p-2 rounded border border-[#D4AF37]/30">
                      <span className="text-lg font-bold text-white block leading-none">
                        {activePromo.countdownHours}
                      </span>
                      <span className="text-[9px] text-gray-400 uppercase">Hours</span>
                    </div>
                    <div className="bg-black/90 p-2 rounded border border-[#D4AF37]/30">
                      <span className="text-lg font-bold text-white block leading-none">
                        {activePromo.countdownMinutes}
                      </span>
                      <span className="text-[9px] text-gray-400 uppercase">Mins</span>
                    </div>
                    <div className="bg-black/90 p-2 rounded border border-emerald-500/30">
                      <span className="text-lg font-bold text-emerald-400 block leading-none">
                        {secondsTick < 10 ? `0${secondsTick}` : secondsTick}
                      </span>
                      <span className="text-[9px] text-emerald-300 uppercase">Secs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inclusions, Pricing, Promo Voucher & CTA (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Tagline & Title */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-[#D4AF37] tracking-widest font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{activePromo.tagline}</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-wide">
                      {activePromo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {activePromo.description}
                    </p>
                  </div>

                  {/* Multi-Service Inclusions Checklist */}
                  <div className="p-4 bg-black/60 rounded-xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block border-b border-white/5 pb-1">
                      Included High-Fashion Therapies ({activePromo.inclusions.length} Combined):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activePromo.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start space-x-2 text-gray-200">
                          <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suite Privileges */}
                  <div className="space-y-1 text-xs text-gray-400">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block font-semibold">
                      VIP Atelier Privileges:
                    </span>
                    <ul className="space-y-1 text-[11px] font-light">
                      {activePromo.privileges.map((priv, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                          <span>{priv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing, Voucher Code & Action Footer */}
                <div className="pt-4 border-t border-[#D4AF37]/20 space-y-4">
                  {/* Price and Voucher Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/80 p-3.5 rounded-xl border border-[#D4AF37]/25">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-sm font-mono text-gray-500 line-through">
                          ₹{activePromo.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-2xl sm:text-3xl font-mono text-[#D4AF37] font-semibold tracking-tight">
                          ₹{activePromo.festivePrice.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          Save ₹{activePromo.savingsAmount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                        25% Advance Escrow: <strong className="text-white">₹{activePromo.depositAmount.toLocaleString()}</strong> • Balance at Counter QR
                      </span>
                    </div>

                    {/* Voucher Code Copy Pill */}
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded bg-[#151208] border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="font-bold tracking-wider">{activePromo.promoCode}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(activePromo.promoCode)}
                        className="p-2 rounded bg-black hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/20 transition-all cursor-pointer"
                        title="Copy Promo Code"
                      >
                        {copiedCode === activePromo.promoCode ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        if (onBookPromotion) {
                          onBookPromotion(activePromo);
                        } else {
                          onNavigateToBundles();
                        }
                      }}
                      className="w-full sm:flex-1 py-3 metallic-button-strong text-xs font-mono uppercase tracking-widest rounded font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
                      id={`book-promo-${activePromo.id}-btn`}
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Claim Festive Privilege ({activePromo.discountPct}% OFF)</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>

                    <button
                      onClick={onNavigateToBundles}
                      className="w-full sm:w-auto py-3 px-5 rounded bg-black/80 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      id="view-all-bundles-from-carousel-btn"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>View All Bundled Packages</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Progress Bar & Navigation Thumbnails */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Slide Indicator Dots */}
          <div className="flex items-center space-x-2">
            {filteredPromos.map((promo, idx) => (
              <button
                key={promo.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                    : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'
                }`}
                title={`Go to ${promo.title}`}
              />
            ))}
            <span className="text-[11px] font-mono text-gray-500 ml-2">
              0{currentIndex + 1} / 0{filteredPromos.length}
            </span>
          </div>

          {/* Escrow Guarantee Disclaimer */}
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Escrow Guarantee: 25% Deposit vault hold • 100% refundable up to 48 hrs</span>
          </div>
        </div>
      </div>
    </section>
  );
};
