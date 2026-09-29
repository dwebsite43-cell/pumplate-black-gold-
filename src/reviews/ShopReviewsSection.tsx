import React, { useState, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Filter,
  Search,
  CheckCircle,
  Plus,
  X,
  ChevronDown,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SalonTemplate, Stylist, Service } from '../types';
import { ShopReview, ReviewCategoryRatings } from './types';
import { initialShopReviews } from './reviewsData';

interface ShopReviewsSectionProps {
  selectedTemplate: SalonTemplate;
  allTemplates: SalonTemplate[];
  onSwitchSalonTemplate?: (template: SalonTemplate) => void;
  onBookServiceWithStylist?: (serviceName: string, stylistName?: string) => void;
  activeBookingVoucher?: {
    code: string;
    salonId: string;
    salonName: string;
    serviceName: string;
    stylistName?: string;
  } | null;
  isOpenReviewModalExternal?: boolean;
  onCloseExternalReviewModal?: () => void;
}

export const ShopReviewsSection: React.FC<ShopReviewsSectionProps> = ({
  selectedTemplate,
  allTemplates,
  onSwitchSalonTemplate,
  onBookServiceWithStylist,
  activeBookingVoucher,
  isOpenReviewModalExternal = false,
  onCloseExternalReviewModal
}) => {
  const [reviews, setReviews] = useState<ShopReview[]>(initialShopReviews);
  const [activeShopId, setActiveShopId] = useState<string>(selectedTemplate.id);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'helpful'>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulVotedIds, setHelpfulVotedIds] = useState<Record<string, boolean>>({});
  const [shareToast, setShareToast] = useState<string>('');

  // Handle external review modal trigger
  React.useEffect(() => {
    if (isOpenReviewModalExternal) {
      setIsWriteModalOpen(true);
      if (activeBookingVoucher?.salonId) {
        setActiveShopId(activeBookingVoucher.salonId);
      }
    }
  }, [isOpenReviewModalExternal, activeBookingVoucher]);

  // Keep activeShopId synchronized when external selectedTemplate changes
  React.useEffect(() => {
    setActiveShopId(selectedTemplate.id);
  }, [selectedTemplate.id]);

  const currentSalon = allTemplates.find((t) => t.id === activeShopId) || selectedTemplate;

  // New review form state
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formComment, setFormComment] = useState<string>('');
  const [formAuthorName, setFormAuthorName] = useState<string>('');
  const [formAuthorLocation, setFormAuthorLocation] = useState<string>('Mumbai');
  const [formAuthorTier, setFormAuthorTier] = useState<ShopReview['authorTier']>('VIP Velvet');
  const [formServiceName, setFormServiceName] = useState<string>(
    currentSalon.services[0]?.name || ''
  );
  const [formStylistName, setFormStylistName] = useState<string>(
    currentSalon.stylists[0]?.name || ''
  );
  const [formAppointmentCode, setFormAppointmentCode] = useState<string>(
    activeBookingVoucher?.code || ''
  );
  const [formCategories, setFormCategories] = useState<ReviewCategoryRatings>({
    serviceQuality: 5,
    ambiance: 5,
    stylistExpertise: 5,
    punctuality: 5
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Pre-fill form if activeBookingVoucher exists
  React.useEffect(() => {
    if (activeBookingVoucher) {
      if (activeBookingVoucher.code) setFormAppointmentCode(activeBookingVoucher.code);
      if (activeBookingVoucher.serviceName) setFormServiceName(activeBookingVoucher.serviceName);
      if (activeBookingVoucher.stylistName) setFormStylistName(activeBookingVoucher.stylistName);
    }
  }, [activeBookingVoucher]);

  // Update default service/stylist when active shop changes in form
  const handleFormShopChange = (shopId: string) => {
    setActiveShopId(shopId);
    const shop = allTemplates.find((t) => t.id === shopId) || selectedTemplate;
    setFormServiceName(shop.services[0]?.name || '');
    setFormStylistName(shop.stylists[0]?.name || '');
  };

  // Available experience tags
  const availableTags = [
    'Private Suite',
    'Master Stylist',
    'French Balayage',
    'Champagne Service',
    'Caviar Scalp Therapy',
    '24K Gold Oil',
    'Sound Bath',
    'Obsidian Basalt',
    '0.15mm Single-Needle',
    'Aseptic Needle',
    'Precision Shears',
    'Flawless Punctuality',
    'Zero-Friction Escrow'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter reviews for current active shop
  const shopReviews = useMemo(() => {
    return reviews.filter((r) => r.shopId === activeShopId);
  }, [reviews, activeShopId]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = shopReviews.length;
    if (total === 0) {
      return {
        avgRating: 5.0,
        totalReviews: 0,
        recommendationRate: 100,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        categories: { serviceQuality: 5, ambiance: 5, stylistExpertise: 5, punctuality: 5 }
      };
    }

    const sumRating = shopReviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = Number((sumRating / total).toFixed(2));

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sumQuality = 0;
    let sumAmbiance = 0;
    let sumExpertise = 0;
    let sumPunctuality = 0;
    let highRatingCount = 0;

    shopReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      breakdown[star] = (breakdown[star] || 0) + 1;
      if (r.rating >= 4) highRatingCount++;

      if (r.categoriesRatings) {
        sumQuality += r.categoriesRatings.serviceQuality;
        sumAmbiance += r.categoriesRatings.ambiance;
        sumExpertise += r.categoriesRatings.stylistExpertise;
        sumPunctuality += r.categoriesRatings.punctuality;
      } else {
        sumQuality += r.rating;
        sumAmbiance += r.rating;
        sumExpertise += r.rating;
        sumPunctuality += r.rating;
      }
    });

    const recommendationRate = Math.round((highRatingCount / total) * 100);

    return {
      avgRating,
      totalReviews: total,
      recommendationRate,
      breakdown,
      categories: {
        serviceQuality: Number((sumQuality / total).toFixed(1)),
        ambiance: Number((sumAmbiance / total).toFixed(1)),
        stylistExpertise: Number((sumExpertise / total).toFixed(1)),
        punctuality: Number((sumPunctuality / total).toFixed(1))
      }
    };
  }, [shopReviews]);

  // Filtered & Sorted reviews
  const displayedReviews = useMemo(() => {
    return shopReviews
      .filter((r) => {
        if (selectedStarFilter !== null && Math.round(r.rating) !== selectedStarFilter) {
          return false;
        }
        if (selectedCategoryFilter !== 'all' && r.serviceName !== selectedCategoryFilter) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchComment = r.comment.toLowerCase().includes(q);
          const matchService = r.serviceName.toLowerCase().includes(q);
          const matchAuthor = r.authorName.toLowerCase().includes(q);
          const matchStylist = r.stylistName ? r.stylistName.toLowerCase().includes(q) : false;
          const matchTags = r.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchComment && !matchService && !matchAuthor && !matchStylist && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest') return b.rating - a.rating;
        if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [shopReviews, selectedStarFilter, selectedCategoryFilter, searchQuery, sortBy]);

  // Upvote helpful action
  const handleToggleHelpful = (reviewId: string) => {
    if (helpfulVotedIds[reviewId]) {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount - 1 } : r))
      );
      setHelpfulVotedIds((prev) => ({ ...prev, [reviewId]: false }));
    } else {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
      );
      setHelpfulVotedIds((prev) => ({ ...prev, [reviewId]: true }));
    }
  };

  // Submit new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthorName.trim() || !formTitle.trim() || !formComment.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: ShopReview = {
        id: `rev-${activeShopId}-${Date.now()}`,
        shopId: activeShopId,
        authorName: formAuthorName.trim(),
        authorLocation: formAuthorLocation.trim() || 'Mumbai',
        authorTier: formAuthorTier,
        rating: formRating,
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentCode:
          formAppointmentCode.trim() || `${activeShopId.toUpperCase().slice(0, 3)}-ESC-${Math.floor(100 + Math.random() * 900)}`,
        serviceName: formServiceName || currentSalon.services[0]?.name || 'Signature Experience',
        stylistName: formStylistName || currentSalon.stylists[0]?.name,
        title: formTitle.trim(),
        comment: formComment.trim(),
        categoriesRatings: { ...formCategories },
        tags: selectedTags.length > 0 ? selectedTags : ['Verified Guest', 'Prestige Appointment'],
        helpfulCount: 1,
        isVerifiedAppointment: true,
        createdAt: new Date().toISOString()
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsWriteModalOpen(false);
        if (onCloseExternalReviewModal) onCloseExternalReviewModal();
        // Reset fields
        setFormTitle('');
        setFormComment('');
        setSelectedTags([]);
      }, 1500);
    }, 600);
  };

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return 'Transcendental Luxury (Atelier Grade)';
      case 4:
        return 'Exceptional Craftsmanship';
      case 3:
        return 'Satisfactory Quality';
      case 2:
        return 'Requires Refinement';
      case 1:
        return 'Unsatisfactory';
      default:
        return 'Select Star Rating';
    }
  };

  return (
    <section id="shop-reviews" className="py-24 px-6 bg-[#070707] border-b border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background ambient gold aura */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] gold-glow-radial opacity-30 pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] gold-glow-radial opacity-20 pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>VERIFIED ESCROW TESTIMONIALS &amp; STAR RATINGS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide">
              Individual Shop <span className="italic text-[#D4AF37]">Guest Experiences</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
              Transparent, post-appointment reflections authenticated via Nexora’s 25% Advance Escrow and counter QR scans. Read unfiltered accounts of bespoke hair transformations, healing rituals, and fine line art.
            </p>
          </div>

          {/* Action Row: Shop Switcher & Write Review Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Salon Switcher Tabs */}
            <div className="flex items-center space-x-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
              {allTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setActiveShopId(template.id);
                    if (onSwitchSalonTemplate) onSwitchSalonTemplate(template);
                    setSelectedStarFilter(null);
                    setSelectedCategoryFilter('all');
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeShopId === template.id
                      ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  id={`review-tab-${template.id}`}
                >
                  {template.name.split(' ')[0]} Lounge
                </button>
              ))}
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="metallic-button-strong py-2.5 px-5 text-xs font-mono uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 font-bold cursor-pointer shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              id="open-write-review-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Share Appointment Experience</span>
            </button>
          </div>
        </div>

        {/* SHOP RATING SUMMARY HERO CARD */}
        <div className="glass-slate-card p-6 md:p-8 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0f0e0b] via-[#080808] to-[#121008] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Col 1: Big Star Rating & Shop Identity (4 cols) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20 pb-6 lg:pb-0 lg:pr-8 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
                  {currentSalon.tagline}
                </span>
                <h3 className="text-2xl font-serif text-white tracking-wide">
                  {currentSalon.name}
                </h3>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-5xl md:text-6xl font-serif text-[#D4AF37] font-light">
                  {stats.avgRating.toFixed(1)}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(stats.avgRating)
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-gray-400">
                    Based on <span className="text-white font-semibold">{stats.totalReviews}</span> verified appointments
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{stats.recommendationRate}% Rebooking Rate</span>
                </div>
                <span className="text-gray-600">·</span>
                <div className="flex items-center space-x-1.5 text-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Escrow Verified</span>
                </div>
              </div>
            </div>

            {/* Col 2: Star Breakdown Histogram (4 cols) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20 pb-6 lg:pb-0 lg:pr-8 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
                <span>Rating Breakdown</span>
                {selectedStarFilter && (
                  <button
                    onClick={() => setSelectedStarFilter(null)}
                    className="text-[#D4AF37] hover:underline text-[10px]"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {([5, 4, 3, 2, 1] as const).map((starNum) => {
                const count = stats.breakdown[starNum];
                const pct = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                const isSelected = selectedStarFilter === starNum;

                return (
                  <button
                    key={starNum}
                    onClick={() =>
                      setSelectedStarFilter(isSelected ? null : starNum)
                    }
                    className={`w-full flex items-center space-x-3 text-xs font-mono py-1 px-1.5 rounded transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="w-8 text-left text-gray-300 flex items-center gap-1">
                      <span>{starNum}</span>
                      <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    </span>

                    <div className="flex-1 h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#AA820A] to-[#D4AF37] transition-all duration-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>

                    <span className="w-10 text-right text-gray-400 text-[11px]">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Col 3: Sub-Category Excellence Scores (4 cols) */}
            <div className="lg:col-span-4 space-y-3.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                Atelier Quality Benchmarks
              </span>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Service &amp; Craft Artistry</span>
                  <span className="text-[#D4AF37] font-semibold">{stats.categories.serviceQuality} / 5.0</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${(stats.categories.serviceQuality / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ambiance, Privacy &amp; Hygiene</span>
                  <span className="text-[#D4AF37] font-semibold">{stats.categories.ambiance} / 5.0</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${(stats.categories.ambiance / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Specialist Technique &amp; Consultation</span>
                  <span className="text-[#D4AF37] font-semibold">{stats.categories.stylistExpertise} / 5.0</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${(stats.categories.stylistExpertise / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Punctuality &amp; Escrow Settlement</span>
                  <span className="text-[#D4AF37] font-semibold">{stats.categories.punctuality} / 5.0</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-[#D4AF37]"
                    style={{ width: `${(stats.categories.punctuality / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-black/40 p-4 rounded-xl border border-white/10">
          {/* Search within reviews */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences (e.g. 'balayage', 'scalp', 'Sven')..."
              className="w-full bg-[#0a0a0a] text-xs text-white pl-10 pr-8 py-2.5 rounded-lg border border-white/10 focus:border-[#D4AF37] focus:outline-none font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Service Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-[#0a0a0a] text-xs text-gray-300 py-2.5 px-3 rounded-lg border border-white/10 focus:border-[#D4AF37] focus:outline-none font-mono cursor-pointer"
            >
              <option value="all">All Treatments</option>
              {currentSalon.services.map((svc) => (
                <option key={svc.id} value={svc.name}>
                  {svc.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest' | 'helpful')}
              className="bg-[#0a0a0a] text-xs text-gray-300 py-2.5 px-3 rounded-lg border border-white/10 focus:border-[#D4AF37] focus:outline-none font-mono cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>

            {/* Clear All active filters */}
            {(selectedStarFilter !== null || selectedCategoryFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedStarFilter(null);
                  setSelectedCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2 text-xs font-mono text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>
              Showing <span className="text-white font-semibold">{displayedReviews.length}</span> of {shopReviews.length} verified reviews for {currentSalon.name}
            </span>
            {selectedStarFilter && (
              <span className="text-[#D4AF37]">
                Filtered by {selectedStarFilter} Stars
              </span>
            )}
          </div>

          {displayedReviews.length === 0 ? (
            <div className="glass-slate-card p-12 text-center rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-500">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif text-white">No reviews found matching criteria</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                No verified reviews match your current filter combination. Try clearing your filters or be the first to share your experience with {currentSalon.name}.
              </p>
              <button
                onClick={() => {
                  setSelectedStarFilter(null);
                  setSelectedCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="metallic-button text-xs font-mono uppercase px-4 py-2 rounded-lg"
              >
                Show All Reviews
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {displayedReviews.map((review) => {
                const isHelpful = helpfulVotedIds[review.id];

                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-slate-card p-6 md:p-8 rounded-xl border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 bg-[#0c0c0c]/80 relative space-y-5"
                    id={`review-card-${review.id}`}
                  >
                    {/* Header Row: Author, Verification, Stars, Date */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Author Info */}
                      <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#AA820A] to-[#D4AF37] flex items-center justify-center text-black font-serif font-bold text-sm shadow-md shrink-0">
                          {review.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-white tracking-wide">
                              {review.authorName}
                            </h4>
                            {review.authorTier && (
                              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                                · {review.authorTier}
                              </span>
                            )}
                          </div>
                          
                          {/* Unboxed metadata with typographic separators */}
                          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mt-0.5">
                            {review.authorLocation && <span>{review.authorLocation}</span>}
                            {review.authorLocation && <span aria-hidden="true">·</span>}
                            <span>Appointment on {review.appointmentDate}</span>
                            {review.appointmentCode && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-gray-400 font-semibold">{review.appointmentCode}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge & Star Rating */}
                      <div className="flex sm:flex-col sm:items-end justify-between items-center gap-1.5 shrink-0">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(review.rating)
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>

                        {review.isVerifiedAppointment && (
                          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>VERIFIED ESCROW APPOINTMENT</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Service & Stylist Info Banner */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-300 bg-black/40 p-2.5 rounded-lg border border-white/5">
                      <div>
                        <span className="text-gray-500 uppercase text-[10px]">TREATMENT:</span>{' '}
                        <span className="text-white font-medium">{review.serviceName}</span>
                      </div>
                      {review.stylistName && (
                        <>
                          <span className="text-gray-600">|</span>
                          <div>
                            <span className="text-gray-500 uppercase text-[10px]">SPECIALIST:</span>{' '}
                            <span className="text-[#D4AF37] font-medium">{review.stylistName}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Review Title & Body */}
                    <div className="space-y-2">
                      <h5 className="text-base font-serif text-white tracking-wide font-normal">
                        "{review.title}"
                      </h5>
                      <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    {/* Sub-ratings if available */}
                    {review.categoriesRatings && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-gray-400">
                        <div>
                          <span>Craft:</span>{' '}
                          <span className="text-white font-medium">{review.categoriesRatings.serviceQuality}★</span>
                        </div>
                        <div>
                          <span>Ambiance:</span>{' '}
                          <span className="text-white font-medium">{review.categoriesRatings.ambiance}★</span>
                        </div>
                        <div>
                          <span>Specialist:</span>{' '}
                          <span className="text-white font-medium">{review.categoriesRatings.stylistExpertise}★</span>
                        </div>
                        <div>
                          <span>Punctuality:</span>{' '}
                          <span className="text-white font-medium">{review.categoriesRatings.punctuality}★</span>
                        </div>
                      </div>
                    )}

                    {/* Experience Tags */}
                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {review.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400"
                          >
                            ✦ {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Official Salon Management Response if present */}
                    {review.salonResponse && (
                      <div className="bg-[#121008] border-l-2 border-[#D4AF37] p-4 rounded-r-lg space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            Official Response from {review.salonResponse.responderName} ({review.salonResponse.responderRole})
                          </span>
                          <span className="text-gray-500">{review.salonResponse.date}</span>
                        </div>
                        <p className="text-gray-300 font-light italic leading-relaxed">
                          "{review.salonResponse.comment}"
                        </p>
                      </div>
                    )}

                    {/* Card Footer: Helpful counter, Book similar service button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs font-mono">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleToggleHelpful(review.id)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            isHelpful
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                          id={`helpful-btn-${review.id}`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-[#D4AF37]' : ''}`} />
                          <span>Helpful ({review.helpfulCount})</span>
                        </button>

                        <button
                          onClick={() => {
                            setShareToast(`Copied review permalink for ${review.authorName}`);
                            setTimeout(() => setShareToast(''), 3000);
                          }}
                          className="text-gray-500 hover:text-gray-300 flex items-center space-x-1 cursor-pointer transition-colors"
                          title="Share Review"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </button>
                      </div>

                      {/* Quick CTA to book this exact service */}
                      {onBookServiceWithStylist && (
                        <button
                          onClick={() => onBookServiceWithStylist(review.serviceName, review.stylistName)}
                          className="text-[#D4AF37] hover:text-white flex items-center space-x-1 text-[11px] font-mono tracking-wider uppercase cursor-pointer"
                        >
                          <span>Reserve {review.serviceName.split(' ')[0]} with 25% Escrow</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* SHARE TOAST NOTIFICATION */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#121008] border border-[#D4AF37] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center space-x-2 text-xs font-mono"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-slate-card bg-[#0A0A0A] border border-[#D4AF37]/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.2)] my-8 relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>POST-APPOINTMENT EXPERIENCE LEDGER</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                    Share Your Appointment Experience
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsWriteModalOpen(false);
                    if (onCloseExternalReviewModal) onCloseExternalReviewModal();
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif text-white">Experience Published</h4>
                  <p className="text-xs font-mono text-gray-400 max-w-md mx-auto">
                    Your verified review has been authenticated with Nexora Escrow Token and published to {currentSalon.name}’s public ledger.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  
                  {/* Select Salon / Lounge */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block">
                      A. Select Atelier / Shop
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {allTemplates.map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => handleFormShopChange(t.id)}
                          className={`p-3 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer ${
                            activeShopId === t.id
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="truncate font-serif">{t.name}</div>
                          <div className="text-[10px] text-gray-500 truncate mt-0.5">{t.tagline}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Star Rating Selector */}
                  <div className="space-y-2 bg-[#121008] p-4 rounded-xl border border-[#D4AF37]/30 text-center">
                    <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block">
                      Overall Star Rating
                    </label>
                    
                    <div className="flex items-center justify-center space-x-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="p-1.5 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (formHoverRating || formRating)
                                ? 'fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-mono text-gray-300 tracking-wide">
                      <span className="text-[#D4AF37] font-semibold">{formHoverRating || formRating} ★</span>{' '}
                      — {getRatingLabel(formHoverRating || formRating)}
                    </div>
                  </div>

                  {/* Appointment Details Row: Service, Stylist & Voucher Code */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Treatment / Service */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                        Service Received
                      </label>
                      <select
                        value={formServiceName}
                        onChange={(e) => setFormServiceName(e.target.value)}
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono cursor-pointer"
                      >
                        {currentSalon.services.map((svc) => (
                          <option key={svc.id} value={svc.name}>
                            {svc.name} (₹{svc.price.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Specialist / Stylist */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                        Specialist / Stylist
                      </label>
                      <select
                        value={formStylistName}
                        onChange={(e) => setFormStylistName(e.target.value)}
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono cursor-pointer"
                      >
                        {currentSalon.stylists.map((sty) => (
                          <option key={sty.id} value={sty.name}>
                            {sty.name} ({sty.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Escrow Voucher / Booking Reference */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                        Voucher / Escrow Code
                      </label>
                      <input
                        type="text"
                        value={formAppointmentCode}
                        onChange={(e) => setFormAppointmentCode(e.target.value)}
                        placeholder="e.g. LET-ESC-901"
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Sub-Category Ratings */}
                  <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/10">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                      Detailed Category Ratings
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      {/* Quality */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Service Craft</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setFormCategories({ ...formCategories, serviceQuality: s })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= formCategories.serviceQuality ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ambiance */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Ambiance &amp; Privacy</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setFormCategories({ ...formCategories, ambiance: s })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= formCategories.ambiance ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Stylist */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Specialist Technique</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setFormCategories({ ...formCategories, stylistExpertise: s })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= formCategories.stylistExpertise ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Punctuality */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Punctuality</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setFormCategories({ ...formCategories, punctuality: s })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= formCategories.punctuality ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Headline & Body */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-300 uppercase tracking-wider block">
                        Experience Headline <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Master-level color sculpting and serene private lounge"
                        className="w-full bg-[#0a0a0a] text-xs text-white p-3 rounded-lg border border-white/15 focus:border-[#D4AF37] focus:outline-none font-serif tracking-wide"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-300 uppercase tracking-wider block">
                        Detailed Reflection <span className="text-[#D4AF37]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder="Describe your session: the consultation, the techniques used, private amenities, and how you felt after the appointment..."
                        className="w-full bg-[#0a0a0a] text-xs text-white p-3 rounded-lg border border-white/15 focus:border-[#D4AF37] focus:outline-none font-light leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Experience Tags */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                      Select Key Highlights
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-[10px] font-mono py-1 px-2.5 rounded border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                                : 'bg-black/50 text-gray-400 border-white/10 hover:text-white'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Author Identity Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        Your Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        placeholder="e.g. Radhika Mehra"
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formAuthorLocation}
                        onChange={(e) => setFormAuthorLocation(e.target.value)}
                        placeholder="e.g. Bandra, Mumbai"
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        VIP Patron Tier
                      </label>
                      <select
                        value={formAuthorTier}
                        onChange={(e) => setFormAuthorTier(e.target.value as ShopReview['authorTier'])}
                        className="w-full bg-[#0a0a0a] text-xs text-white p-2.5 rounded-lg border border-white/15 focus:border-[#D4AF37] font-mono cursor-pointer"
                      >
                        <option value="VIP Velvet">VIP Velvet</option>
                        <option value="Atelier Member">Atelier Member</option>
                        <option value="Sovereign Patron">Sovereign Patron</option>
                        <option value="First-Time Guest">First-Time Guest</option>
                      </select>
                    </div>
                  </div>

                  {/* Submission Notice & Action */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>Review verified and anchored into Nexora SalonOS immutable ledger.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto metallic-button-strong py-3 px-8 text-xs font-mono uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 font-bold cursor-pointer shadow-lg disabled:opacity-50"
                      id="submit-review-btn"
                    >
                      {isSubmitting ? (
                        <span>Anchoring to Ledger...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Publish Verified Review</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
