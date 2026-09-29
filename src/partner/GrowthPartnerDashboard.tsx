import React, { useState } from 'react';
import { GrowthPartnerProfile, PartnerShopDetail } from './types';
import { mockGrowthPartners } from './partnerData';
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Store,
  ShieldCheck,
  Search,
  Filter,
  ArrowLeft,
  Sparkles,
  QrCode,
  DollarSign,
  AlertTriangle,
  Gift,
  ChevronRight,
  User,
  Phone,
  MapPin,
  Calendar,
  Check,
  RotateCcw,
} from 'lucide-react';

interface GrowthPartnerDashboardProps {
  onBackToLanding: () => void;
  onOpenAdminPanel?: () => void;
}

export const GrowthPartnerDashboard: React.FC<GrowthPartnerDashboardProps> = ({
  onBackToLanding,
  onOpenAdminPanel,
}) => {
  const [partnerProfiles, setPartnerProfiles] = useState<GrowthPartnerProfile[]>(mockGrowthPartners);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(mockGrowthPartners[0].partnerId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'qualifying' | 'completed15' | 'notPassed' | 'rejected'>('all');
  
  // Interactive test simulator modal / prompt for a shop's daily QR
  const [editingShop, setEditingShop] = useState<PartnerShopDetail | null>(null);
  const [simulatedTxnAmount, setSimulatedTxnAmount] = useState<number>(1250);
  const [claimToast, setClaimToast] = useState<string>('');

  const currentPartner = partnerProfiles.find((p) => p.partnerId === selectedPartnerId) || partnerProfiles[0];

  // Dynamic calculations based on current partner's shops
  const totalOnboarded = currentPartner.shops.length;
  const verifiedCount = currentPartner.shops.filter((s) => s.verificationStatus === 'Verified & Active').length;
  const qualifyingCount = currentPartner.shops.filter((s) => s.dailyQualification === 'Passed').length;
  const completed15DayCount = currentPartner.shops.filter((s) => s.isCycleCompleted).length;
  const rejectedCount = currentPartner.shops.filter((s) => s.verificationStatus === 'Rejected').length;

  const filteredShops = currentPartner.shops.filter((shop) => {
    const matchesSearch =
      shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.shopId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'qualifying') return shop.dailyQualification === 'Passed';
    if (statusFilter === 'completed15') return shop.isCycleCompleted;
    if (statusFilter === 'notPassed') return shop.dailyQualification === 'Not Passed' && shop.verificationStatus !== 'Rejected';
    if (statusFilter === 'rejected') return shop.verificationStatus === 'Rejected';

    return true;
  });

  const handleUpdateShopDailyTxn = (shopId: string, newTxn: number) => {
    setPartnerProfiles((prev) =>
      prev.map((partner) => {
        if (partner.partnerId !== selectedPartnerId) return partner;
        const updatedShops = partner.shops.map((s) => {
          if (s.shopId !== shopId) return s;
          const comm = Math.round(newTxn * (s.companyCommissionRate / 100));
          const qual = newTxn >= s.requiredDailyQrTransaction ? 'Passed' : 'Not Passed';
          return {
            ...s,
            dailyQrTransaction: newTxn,
            dailyCompanyCommission: comm,
            dailyQualification: qual,
          };
        });
        return {
          ...partner,
          shops: updatedShops,
        };
      })
    );
    setEditingShop(null);
  };

  const handleClaimReward = () => {
    setPartnerProfiles((prev) =>
      prev.map((partner) => {
        if (partner.partnerId !== selectedPartnerId) return partner;
        return {
          ...partner,
          claimStatus: 'Claim Submitted',
        };
      })
    );
    setClaimToast(`Reward Claim for "${currentPartner.currentEligibleReward}" has been officially dispatched to Nexora HQ.`);
    setTimeout(() => setClaimToast(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">Back to Showcase</span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-[0.2em] text-lg font-light text-[#D4AF37]">
                  NEXORA <span className="text-white font-sans font-bold text-xs bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">GROWTH PARTNER CONSOLE</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase">
                  {currentPartner.tier} Tier
                </span>
              </div>
              <p className="text-[11px] font-mono text-gray-400">
                Pehle Nexora, Phir Salon • Partner Territory Performance & 15-Day Milestone Ledger
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Switch Active Partner Profile */}
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Active Growth Partner</span>
              <span className="text-xs font-mono text-[#D4AF37] font-semibold">{currentPartner.name}</span>
            </div>
            <select
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="px-3 py-1.5 bg-black/80 rounded border border-[#D4AF37]/40 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {partnerProfiles.map((p) => (
                <option key={p.partnerId} value={p.partnerId}>
                  {p.name} ({p.tier} • {p.shops.length} Salons)
                </option>
              ))}
            </select>
            {onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded text-xs font-mono text-gray-300 transition-colors"
              >
                HQ Admin #22
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Toast Alert */}
        {claimToast && (
          <div className="p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{claimToast}</span>
          </div>
        )}

        {/* SECTION 1: MAIN OVERVIEW */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-between items-end gap-3 pb-2 border-b border-[#D4AF37]/20">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em]">EXECUTIVE DASHBOARD</span>
              <h2 className="text-2xl font-serif text-white font-light">Main Overview & Milestone Progress</h2>
            </div>
            <div className="text-xs font-mono text-gray-400">
              Partner ID: <span className="text-[#D4AF37] font-semibold">{currentPartner.partnerId}</span> • Territory: {currentPartner.region}
            </div>
          </div>

          {/* 5 Core Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {/* Total Shops Onboarded */}
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#D4AF37]/30 shadow-[0_0_25px_rgba(212,175,55,0.06)] relative overflow-hidden group">
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
                <span>Total Shops Onboarded</span>
                <Store className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-3xl font-serif text-white font-semibold mt-2">{totalOnboarded}</p>
              <p className="text-[10px] font-mono text-gray-400 mt-1">All Territory Acquisitions</p>
            </div>

            {/* Verified Shops */}
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-emerald-500/30 shadow-lg">
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
                <span>Verified Shops</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-serif text-emerald-400 font-semibold mt-2">{verifiedCount}</p>
              <p className="text-[10px] font-mono text-emerald-400/70 mt-1">KYC & Aesthetic Approved</p>
            </div>

            {/* Qualifying Shops */}
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.12)]">
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
                <span>Qualifying Shops</span>
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-3xl font-serif text-[#D4AF37] font-semibold mt-2">{qualifyingCount}</p>
              <p className="text-[10px] font-mono text-[#D4AF37]/80 mt-1">Daily QR ≥ ₹1,000 Met</p>
            </div>

            {/* Shops Completing 15-Day Cycle */}
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-amber-500/30 shadow-lg">
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
                <span>15-Day Cycle Completed</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-serif text-amber-300 font-semibold mt-2">{completed15DayCount}</p>
              <p className="text-[10px] font-mono text-amber-400/80 mt-1">Full Maturity Achieved</p>
            </div>

            {/* Rejected Shops */}
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-red-500/25 shadow-lg">
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
                <span>Rejected Shops</span>
                <XCircle className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-3xl font-serif text-red-400 font-semibold mt-2">{rejectedCount}</p>
              <p className="text-[10px] font-mono text-red-400/80 mt-1">Quality / KYC Disqualified</p>
            </div>
          </div>

          {/* Milestone & Plus-One Details Ribbon */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Milestone Tracker */}
            <div className="lg:col-span-7 bg-[#0A0A0A] p-5 rounded-xl border border-[#D4AF37]/35 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Milestone Progression Chronometer</span>
                </span>
                <span className="text-[11px] font-mono bg-white/5 px-2.5 py-0.5 rounded border border-white/10 text-gray-300">
                  {completed15DayCount} / {completed15DayCount + currentPartner.remainingShopsForNextMilestone} Completed Salons
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-black/60 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400 block uppercase">Current Milestone</span>
                  <p className="text-white font-serif text-sm font-medium">{currentPartner.currentMilestone}</p>
                </div>
                <div className="p-3 bg-black/60 rounded-lg border border-[#D4AF37]/30 space-y-1">
                  <span className="text-[10px] text-[#D4AF37] block uppercase">Next Milestone Target</span>
                  <p className="text-[#D4AF37] font-serif text-sm font-medium">{currentPartner.nextMilestone}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>Maturity Progress</span>
                  <span className="text-[#D4AF37] font-semibold">
                    {currentPartner.remainingShopsForNextMilestone === 0
                      ? 'Target Achieved'
                      : `Only ${currentPartner.remainingShopsForNextMilestone} remaining shop needed`}
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] via-[#F5D0A1] to-amber-400 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        100,
                        (completed15DayCount / (completed15DayCount + currentPartner.remainingShopsForNextMilestone)) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Plus-One Shop Status Banner */}
              <div className="p-3 bg-gradient-to-r from-amber-950/40 to-black/60 rounded-lg border border-[#D4AF37]/40 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                    PLUS-ONE (+1) SHOP STATUS
                  </span>
                  <p className="text-xs text-gray-200 font-sans">{currentPartner.plusOneShopStatus}</p>
                </div>
              </div>
            </div>

            {/* Right: Eligible Reward & Claim */}
            <div className="lg:col-span-5 bg-[#0A0A0A] p-5 rounded-xl border border-[#D4AF37]/35 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#D4AF37]" />
                    <span>Current Eligible Reward</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      currentPartner.claimStatus === 'Eligible to Claim'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 animate-pulse'
                        : currentPartner.claimStatus === 'Claim Submitted'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {currentPartner.claimStatus}
                  </span>
                </div>

                <div className="p-3.5 bg-black/70 rounded-lg border border-[#D4AF37]/30">
                  <p className="text-base font-serif text-white font-medium italic">
                    "{currentPartner.currentEligibleReward}"
                  </p>
                  <p className="text-[11px] font-mono text-gray-400 mt-2">
                    Verified milestone bonus granted to Growth Partners meeting consecutive 15-day cycle retention.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-gray-500">
                  Status: <span className="text-white">{currentPartner.claimStatus}</span>
                </span>
                <button
                  onClick={handleClaimReward}
                  disabled={currentPartner.claimStatus !== 'Eligible to Claim'}
                  className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    currentPartner.claimStatus === 'Eligible to Claim'
                      ? 'metallic-button-strong font-bold'
                      : 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{currentPartner.claimStatus === 'Eligible to Claim' ? 'Claim Eligible Reward' : 'Claim Logged'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SHOP-LEVEL DETAILS */}
        <section className="space-y-4 pt-4">
          <div className="flex flex-wrap justify-between items-end gap-3 pb-2 border-b border-[#D4AF37]/20">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em]">GRANULAR AUDIT</span>
              <h2 className="text-2xl font-serif text-white font-light">Shop-Level Details & Daily Commission Ledger</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  statusFilter === 'all'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                All Shops ({currentPartner.shops.length})
              </button>
              <button
                onClick={() => setStatusFilter('qualifying')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  statusFilter === 'qualifying'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Qualifying ({qualifyingCount})
              </button>
              <button
                onClick={() => setStatusFilter('completed15')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  statusFilter === 'completed15'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                15-Day Cycle Done ({completed15DayCount})
              </button>
              <button
                onClick={() => setStatusFilter('notPassed')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  statusFilter === 'notPassed'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Under ₹1,000 ({currentPartner.shops.filter(s => s.dailyQualification === 'Not Passed' && s.verificationStatus !== 'Rejected').length})
              </button>
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  statusFilter === 'rejected'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>
          </div>

          {/* Search bar & Live Rule Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0A0A0A] p-3 rounded-lg border border-white/10">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by Shop ID, Shop Name, Owner, City, or Mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-black rounded border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Daily Qualification Rule Banner */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-300">
              <span className="text-gray-500">Rule:</span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                <Check className="w-3 h-3" /> Daily QR ≥ ₹1,000 = Passed
              </span>
              <span className="flex items-center gap-1 text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                <XCircle className="w-3 h-3" /> Daily QR &lt; ₹1,000 = Not Passed
              </span>
              <span className="text-[#D4AF37]">Company Commission = 10%</span>
            </div>
          </div>

          {/* Shop Detailed Cards List */}
          <div className="space-y-4">
            {filteredShops.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-mono bg-[#0A0A0A] rounded-xl border border-white/10">
                No salons match the selected filter.
              </div>
            ) : (
              filteredShops.map((shop) => (
                <div
                  key={shop.shopId}
                  className={`bg-[#0A0A0A] rounded-xl border p-5 transition-all shadow-xl space-y-4 ${
                    shop.verificationStatus === 'Rejected'
                      ? 'border-red-500/30 bg-red-950/[0.04]'
                      : shop.dailyQualification === 'Passed'
                      ? 'border-[#D4AF37]/35 hover:border-[#D4AF37]/70'
                      : 'border-white/15'
                  }`}
                >
                  {/* Card Header: Shop Identity & Status badges */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex gap-3.5">
                      <img
                        src={shop.interiorPhoto}
                        alt={shop.shopName}
                        className="w-16 h-16 object-cover rounded-lg border border-[#D4AF37]/30 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/25">
                            {shop.shopId}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400">{shop.category}</span>
                        </div>
                        <h3 className="text-base font-serif font-medium text-white mt-0.5">{shop.shopName}</h3>
                        <p className="text-xs text-gray-300 font-sans">
                          Owner: <span className="text-white font-medium">{shop.ownerName}</span> • {shop.mobileNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Verification Status */}
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border ${
                          shop.verificationStatus === 'Verified & Active'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : shop.verificationStatus === 'Rejected'
                            ? 'bg-red-950 text-red-300 border-red-500/40'
                            : 'bg-amber-950 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {shop.verificationStatus}
                      </span>

                      {/* KYC Status */}
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border ${
                          shop.kycStatus === 'Verified'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                            : shop.kycStatus === 'Rejected'
                            ? 'bg-red-950 text-red-300 border-red-500/30'
                            : 'bg-blue-950 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        KYC: {shop.kycStatus}
                      </span>

                      {/* 15-Day Cycle Badge */}
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border ${
                          shop.isCycleCompleted
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40 font-semibold'
                            : 'bg-white/5 text-gray-400 border-white/10'
                        }`}
                      >
                        {shop.isCycleCompleted ? '15-Day Cycle Completed' : `Day ${shop.consecutiveQualifyingDays}/15 In Progress`}
                      </span>
                    </div>
                  </div>

                  {/* Daily QR Transaction & 10% Commission Highlight Box */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-black/70 p-3.5 rounded-lg border border-white/10 font-mono text-xs">
                    {/* Daily QR Transaction */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block uppercase">Daily QR Transaction</span>
                      <div className="text-base text-white font-bold flex items-center justify-between">
                        <span>₹{shop.dailyQrTransaction.toLocaleString()}</span>
                        <button
                          onClick={() => {
                            setEditingShop(shop);
                            setSimulatedTxnAmount(shop.dailyQrTransaction);
                          }}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-white/15"
                          title="Simulate Daily QR Amount"
                        >
                          Simulate
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-500 block">
                        Required Benchmark: ₹{shop.requiredDailyQrTransaction.toLocaleString()}
                      </span>
                    </div>

                    {/* Company Commission */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#D4AF37] block uppercase">Company Commission ({shop.companyCommissionRate}%)</span>
                      <div className="text-base text-[#D4AF37] font-bold">
                        ₹{shop.dailyCompanyCommission.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-gray-500 block">Auto 10% Platform Cut</span>
                    </div>

                    {/* Daily Qualification */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block uppercase">Daily Qualification</span>
                      <div>
                        {shop.dailyQualification === 'Passed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Passed (≥ ₹1,000)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-950 text-red-300 border border-red-500/40">
                            <XCircle className="w-3.5 h-3.5 text-red-400" /> Not Passed (&lt; ₹1,000)
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 block">Consecutive Days: {shop.consecutiveQualifyingDays}/15</span>
                    </div>

                    {/* Settlement Status */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 block uppercase">Settlement Status</span>
                      <div className="text-white font-medium text-[11px] truncate" title={shop.settlementStatus}>
                        {shop.settlementStatus}
                      </div>
                      <span className="text-[10px] text-emerald-400 block">{shop.refundReversalStatus}</span>
                    </div>
                  </div>

                  {/* Address & Operational Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-gray-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{shop.address}, {shop.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>QR Activation: {shop.qrActivationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Current Consecutive Days: <strong className="text-white">{shop.consecutiveQualifyingDays} / 15 Days</strong></span>
                    </div>
                  </div>

                  {/* Rejection Reason (If Applicable) */}
                  {shop.rejectionReason && (
                    <div className="p-3 rounded bg-red-950/40 border border-red-500/40 text-xs text-red-200 font-mono space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-red-300">
                        <AlertTriangle className="w-3.5 h-3.5" /> REJECTION REASON:
                      </span>
                      <p className="italic text-[11px] leading-relaxed text-red-200/90">{shop.rejectionReason}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* SIMULATION MODAL FOR TESTING DAILY QR VALUES */}
        {editingShop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] border-2 border-[#D4AF37]/50 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
              <h3 className="text-base font-serif font-medium text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#D4AF37]" />
                <span>Simulate Daily QR Transaction</span>
              </h3>
              <p className="text-xs font-mono text-gray-400">
                Test qualification logic for <strong className="text-white">{editingShop.shopName}</strong>.
              </p>

              <div className="p-3 bg-black/80 rounded border border-white/10 space-y-2 text-xs font-mono">
                <label className="block text-gray-400 text-[10px] uppercase">Enter Today's QR Volume (₹):</label>
                <input
                  type="number"
                  value={simulatedTxnAmount}
                  onChange={(e) => setSimulatedTxnAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/40 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSimulatedTxnAmount(1250)}
                    className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-[10px]"
                  >
                    Set ₹1,250 (Pass Example)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimulatedTxnAmount(800)}
                    className="px-2 py-1 rounded bg-red-950/60 text-red-300 border border-red-500/40 text-[10px]"
                  >
                    Set ₹800 (Fail Example)
                  </button>
                </div>
              </div>

              {/* Dynamic Preview */}
              <div className="p-3 rounded bg-white/5 border border-white/10 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily QR Transaction:</span>
                  <span className="text-white font-bold">₹{simulatedTxnAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Company Commission (10%):</span>
                  <span className="text-[#D4AF37] font-bold">₹{Math.round(simulatedTxnAmount * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-white/10">
                  <span className="text-gray-400">Daily Qualification:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      simulatedTxnAmount >= 1000
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {simulatedTxnAmount >= 1000 ? 'Passed' : 'Not Passed'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingShop(null)}
                  className="px-4 py-2 rounded text-xs font-mono bg-white/5 text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateShopDailyTxn(editingShop.shopId, simulatedTxnAmount)}
                  className="metallic-button-strong px-4 py-2 rounded text-xs font-mono font-semibold"
                >
                  Apply & Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
