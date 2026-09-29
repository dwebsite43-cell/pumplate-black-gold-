import React from 'react';
import { TrendingUp, Users, QrCode, ShieldAlert, Award, Clock, Home } from 'lucide-react';

interface OverviewMetricsProps {
  growthPartnersCount: number;
  pendingShopsCount: number;
  pendingKycCount: number;
  activeQrsCount: number;
  totalVolume: number;
  fraudAlertsCount: number;
  pendingSettlementsCount: number;
  pendingHomeDepositsCount?: number;
  onSelectHomeServices?: () => void;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
  growthPartnersCount,
  pendingShopsCount,
  pendingKycCount,
  activeQrsCount,
  totalVolume,
  fraudAlertsCount,
  pendingSettlementsCount,
  pendingHomeDepositsCount = 0,
  onSelectHomeServices,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#D4AF37]/25 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>Gross Volume</span>
          <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        <p className="text-lg font-serif text-[#D4AF37] font-semibold mt-1">
          ₹{(totalVolume / 100000).toFixed(1)} Lakh
        </p>
        <p className="text-[10px] text-gray-500 font-mono">10% Platform Cut</p>
      </div>

      {/* Home Service Pending Advance Deposits Card */}
      <div
        onClick={onSelectHomeServices}
        className={`bg-[#0A0A0A] p-3 rounded-lg border shadow-lg transition-all cursor-pointer ${
          pendingHomeDepositsCount > 0
            ? 'border-[#D4AF37] bg-gradient-to-b from-amber-950/30 to-black hover:border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-gold-pulse'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono uppercase">
          <span className={pendingHomeDepositsCount > 0 ? 'text-[#D4AF37] font-bold' : 'text-gray-400'}>
            Home Deposits
          </span>
          <Home className={`w-3.5 h-3.5 ${pendingHomeDepositsCount > 0 ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
        </div>
        <p className={`text-lg font-serif font-semibold mt-1 ${pendingHomeDepositsCount > 0 ? 'text-[#D4AF37]' : 'text-white'}`}>
          {pendingHomeDepositsCount} Pending
        </p>
        <p className="text-[10px] font-mono text-amber-400/90">Verify Advance</p>
      </div>

      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>Pending Review</span>
          <Users className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <p className="text-lg font-serif text-white font-semibold mt-1">
          {pendingShopsCount + growthPartnersCount}
        </p>
        <p className="text-[10px] text-amber-400/80 font-mono">Shops & Partners</p>
      </div>

      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>KYC Verifications</span>
          <Clock className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <p className="text-lg font-serif text-white font-semibold mt-1">
          {pendingKycCount} Pending
        </p>
        <p className="text-[10px] text-blue-400/80 font-mono">PAN / GST Checks</p>
      </div>

      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>Active Gold QRs</span>
          <QrCode className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <p className="text-lg font-serif text-emerald-400 font-semibold mt-1">
          {activeQrsCount} Terminals
        </p>
        <p className="text-[10px] text-gray-500 font-mono">OLED & Pods</p>
      </div>

      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>15-Day Settlements</span>
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        <p className="text-lg font-serif text-white font-semibold mt-1">
          {pendingSettlementsCount} Due
        </p>
        <p className="text-[10px] text-[#D4AF37] font-mono">Rolling Cycle</p>
      </div>

      <div className="bg-[#0A0A0A] p-3 rounded-lg border border-red-500/20 shadow-lg">
        <div className="flex items-center justify-between text-gray-400 text-[10px] font-mono uppercase">
          <span>Risk & Fraud</span>
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
        </div>
        <p className="text-lg font-serif text-red-400 font-semibold mt-1">
          {fraudAlertsCount} Alerts
        </p>
        <p className="text-[10px] text-red-400/80 font-mono">Active Defense</p>
      </div>
    </div>
  );
};

