import React, { useState } from 'react';
import { HomeServiceRequest } from '../types';
import {
  Home,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  DollarSign,
  User,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FileText,
  XCircle,
  Truck,
  Check,
  Eye,
} from 'lucide-react';

interface HomeServiceRequestsTabProps {
  requests: HomeServiceRequest[];
  onRequestAudit: (
    entityType: string,
    entityName: string,
    fieldChanged: string,
    oldValue: string,
    proposedNewValue: string,
    onConfirmed: (reason: string, finalAdmin: string, finalVal: string) => void,
    allowEditNewVal?: boolean
  ) => void;
  onVerifyDeposit: (id: string, utrReference: string, verifiedBy: string) => void;
  onRejectDeposit: (id: string, reason: string) => void;
  onUpdateServiceStatus: (id: string, newStatus: HomeServiceRequest['serviceStatus']) => void;
  currentAdminName: string;
}

export const HomeServiceRequestsTab: React.FC<HomeServiceRequestsTabProps> = ({
  requests,
  onRequestAudit,
  onVerifyDeposit,
  onRejectDeposit,
  onUpdateServiceStatus,
  currentAdminName,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'pending_deposit' | 'verified' | 'dispatched'>('pending_deposit');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  
  // Quick deposit verify modal
  const [verifyingRequest, setVerifyingRequest] = useState<HomeServiceRequest | null>(null);
  const [verifiedUtr, setVerifiedUtr] = useState<string>('');
  const [verificationNotes, setVerificationNotes] = useState<string>('');

  const pendingDepositCount = requests.filter((r) => r.depositStatus === 'Pending Deposit').length;
  const verifiedDepositCount = requests.filter((r) => r.depositStatus === 'Deposit Verified' || r.depositStatus === 'Fully Paid').length;
  const totalGrossPipeline = requests.reduce((acc, r) => acc + r.grossAmount, 0);
  const totalPendingDepositAmount = requests
    .filter((r) => r.depositStatus === 'Pending Deposit')
    .reduce((acc, r) => acc + r.advanceDepositRequired, 0);

  const filteredRequests = requests.filter((req) => {
    // City filter
    if (selectedCity !== 'all' && req.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }

    // Status filter
    if (filterMode === 'pending_deposit' && req.depositStatus !== 'Pending Deposit') {
      return false;
    }
    if (filterMode === 'verified' && req.depositStatus !== 'Deposit Verified' && req.depositStatus !== 'Fully Paid') {
      return false;
    }
    if (filterMode === 'dispatched' && req.serviceStatus !== 'Artisan Dispatched' && req.serviceStatus !== 'In Progress') {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        req.id.toLowerCase().includes(q) ||
        req.clientName.toLowerCase().includes(q) ||
        req.phone.toLowerCase().includes(q) ||
        req.address.toLowerCase().includes(q) ||
        req.salonName.toLowerCase().includes(q) ||
        req.servicesRequested.some((s) => s.toLowerCase().includes(q)) ||
        (req.utrReference && req.utrReference.toLowerCase().includes(q));
      if (!matches) return false;
    }

    return true;
  });

  const handleOpenVerifyModal = (req: HomeServiceRequest) => {
    setVerifyingRequest(req);
    setVerifiedUtr(req.utrReference || `UTR-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setVerificationNotes(`Bank credit confirmed via ${req.paymentMode}. Advance 50% deposit received into Nexora Escrow Vault.`);
  };

  const handleConfirmVerification = () => {
    if (!verifyingRequest) return;
    const req = verifyingRequest;
    const utr = verifiedUtr.trim() || req.utrReference || 'CONFIRMED-BANK-REF';
    
    onRequestAudit(
      'VIP Home Service Concierge',
      `${req.id} (${req.clientName})`,
      'Deposit Status',
      req.depositStatus,
      `Deposit Verified (UTR: ${utr})`,
      (reason, finalAdmin) => {
        onVerifyDeposit(req.id, utr, finalAdmin);
        setVerifyingRequest(null);
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Pending Deposit Alert Ribbon */}
      <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[#D4AF37]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
              ADMIN CONCIERGE DESK
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 font-semibold">
              VIP AT-HOME SERVICE DESK
            </span>
          </div>
          <h2 className="text-2xl font-serif text-white font-light mt-1 flex items-center gap-2.5">
            <Home className="w-6 h-6 text-[#D4AF37]" />
            <span>Incoming Home Service Requests</span>
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Manual advance deposit auditing, bank UTR verification, and master artisan dispatch coordination
          </p>
        </div>

        {/* Manager Action Badge */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-gray-500 uppercase block">Active Reviewer</span>
            <span className="text-xs font-mono text-[#D4AF37] font-semibold">{currentAdminName}</span>
          </div>
        </div>
      </div>

      {/* Prominent Highlighting Ribbon for Pending Deposits */}
      {pendingDepositCount > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/70 via-black to-[#0A0A0A] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] flex flex-wrap items-center justify-between gap-4 animate-gold-pulse">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37]">
              <AlertTriangle className="w-6 h-6 text-[#D4AF37] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                  ACTION REQUIRED: {pendingDepositCount} ADVANCE DEPOSITS PENDING VERIFICATION
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-red-950 text-red-300 border border-red-500/40">
                  CRITICAL
                </span>
              </div>
              <p className="text-xs text-gray-200 mt-0.5 font-sans">
                Managers must manually check incoming bank credits/UTRs before salons dispatch master stylists to private residences.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right font-mono">
              <span className="text-[10px] text-gray-400 block uppercase">Pending Advance Pool</span>
              <span className="text-base font-bold text-white">₹{totalPendingDepositAmount.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setFilterMode('pending_deposit')}
              className="metallic-button-strong px-4 py-2 rounded text-xs font-mono uppercase tracking-wider font-semibold shadow-lg"
            >
              Filter Pending ({pendingDepositCount})
            </button>
          </div>
        </div>
      )}

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/10 shadow-lg">
          <div className="flex justify-between items-center text-gray-400 text-[10px] font-mono uppercase">
            <span>Total Requests</span>
            <Home className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-serif text-white font-semibold mt-1">{requests.length}</p>
          <p className="text-[10px] font-mono text-gray-500">Incoming At-Home Bookings</p>
        </div>

        <div className="bg-[#0A0A0A] p-3.5 rounded-xl border-2 border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          <div className="flex justify-between items-center text-[#D4AF37] text-[10px] font-mono uppercase">
            <span>Pending Deposit</span>
            <Clock className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="text-2xl font-serif text-[#D4AF37] font-semibold mt-1">{pendingDepositCount}</p>
          <p className="text-[10px] font-mono text-amber-400">Needs Manager Manual Verification</p>
        </div>

        <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-emerald-500/30 shadow-lg">
          <div className="flex justify-between items-center text-gray-400 text-[10px] font-mono uppercase">
            <span>Deposits Verified</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-serif text-emerald-400 font-semibold mt-1">{verifiedDepositCount}</p>
          <p className="text-[10px] font-mono text-emerald-400/70">Cleared into Escrow Vault</p>
        </div>

        <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/10 shadow-lg">
          <div className="flex justify-between items-center text-gray-400 text-[10px] font-mono uppercase">
            <span>Gross Pipeline</span>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-serif text-white font-semibold mt-1">₹{(totalGrossPipeline / 100000).toFixed(2)} Lakh</p>
          <p className="text-[10px] font-mono text-gray-500">Total VIP Value</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0A0A0A] p-3 rounded-lg border border-white/10">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterMode('pending_deposit')}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              filterMode === 'pending_deposit'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-black text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Deposit ({pendingDepositCount})</span>
          </button>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all ${
              filterMode === 'all'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-black text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            All Requests ({requests.length})
          </button>

          <button
            onClick={() => setFilterMode('verified')}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              filterMode === 'verified'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-black text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verified Deposits ({verifiedDepositCount})</span>
          </button>

          <button
            onClick={() => setFilterMode('dispatched')}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              filterMode === 'dispatched'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-black text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dispatched / In Transit</span>
          </button>
        </div>

        {/* City Filter & Search Input */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-2.5 py-1.5 bg-black rounded border border-white/20 text-xs font-mono text-gray-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Goa">Goa</option>
          </select>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Client, Phone, UTR, Address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-black rounded border border-white/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] w-full"
            />
          </div>
        </div>
      </div>

      {/* Requests Card List with Emphasis on 'Pending Deposit' */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-mono bg-[#0A0A0A] rounded-xl border border-white/10">
            No home service requests match the selected filter.
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isPendingDeposit = req.depositStatus === 'Pending Deposit';

            return (
              <div
                key={req.id}
                className={`bg-[#0A0A0A] rounded-xl p-5 transition-all space-y-4 ${
                  isPendingDeposit
                    ? 'border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.14)] bg-gradient-to-b from-[#111108] to-[#0A0A0A]'
                    : 'border border-white/15 hover:border-[#D4AF37]/40 shadow-lg'
                }`}
              >
                {/* Header: Request ID, VIP Badge, Deposit Alert Flag */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                        {req.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300">
                        {req.residenceType}
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37] font-semibold">{req.vipTier}</span>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-white mt-1 flex items-center gap-2">
                      <span>{req.clientName}</span>
                      <span className="text-xs font-sans text-gray-400 font-normal">({req.phone})</span>
                    </h3>
                    <p className="text-xs text-gray-300 font-mono flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{req.address} • {req.city}</span>
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    {isPendingDeposit ? (
                      <span className="px-3 py-1 rounded text-xs font-mono uppercase bg-amber-950/80 text-amber-300 border-2 border-[#D4AF37] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)] animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>PENDING DEPOSIT • VERIFY NOW</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-xs font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{req.depositStatus}</span>
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-gray-400">
                      Fulfillment: <strong className="text-white uppercase">{req.serviceStatus}</strong>
                    </span>
                  </div>
                </div>

                {/* Service Details & Assigned Stylists */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black/60 p-3.5 rounded-lg border border-white/5 font-mono text-xs">
                  {/* Salon & Services */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase block">Salon & Couture House</span>
                    <p className="text-white font-medium">{req.salonName}</p>
                    <div className="text-[11px] text-gray-300 font-sans mt-1 space-y-0.5">
                      {req.servicesRequested.map((svc, i) => (
                        <div key={i} className="flex items-center gap-1 text-[#D4AF37]">
                          <span>•</span>
                          <span className="text-gray-300">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Artisans & Timing */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase block">Artisans & Schedule</span>
                    <p className="text-white">
                      {req.scheduledDate} ({req.scheduledTime})
                    </p>
                    <p className="text-[11px] text-[#D4AF37]">Est. Duration: {req.estimatedDuration}</p>
                    <div className="text-[11px] text-gray-400 mt-1">
                      <span className="text-gray-500 block text-[9px] uppercase">Assigned Talent:</span>
                      {req.artisansAssigned.join(', ')}
                    </div>
                  </div>

                  {/* Financial & Deposit Highlight Box */}
                  <div className={`p-3 rounded-lg border space-y-1.5 ${
                    isPendingDeposit ? 'bg-amber-950/20 border-[#D4AF37]/50' : 'bg-black border-white/10'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 uppercase">Gross Booking:</span>
                      <span className="text-white font-bold text-sm">₹{req.grossAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-white/10">
                      <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">50% Advance Required:</span>
                      <span className="text-[#D4AF37] font-bold text-sm">₹{req.advanceDepositRequired.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400">Payment Mode:</span>
                      <span className="text-gray-200">{req.paymentMode}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-400">Bank UTR / Ref:</span>
                      <span className="text-emerald-400 font-semibold truncate max-w-[120px]" title={req.utrReference}>
                        {req.utrReference || 'Awaiting Slip'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Special Concierge Logistics & Security Notes */}
                {(req.specialNotes || req.securityPassRequired) && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] font-mono text-gray-400 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      {req.securityPassRequired && (
                        <span className="text-amber-400 mr-2 font-semibold">[Security Clearance Gate Pass Mandatory]</span>
                      )}
                      <span>{req.specialNotes}</span>
                    </div>
                  </div>
                )}

                {/* Verification Confirmation Ledger (If already verified) */}
                {req.depositVerifiedBy && (
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center justify-between bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                    <span>
                      ✓ Advance payment audited & verified by <strong>{req.depositVerifiedBy}</strong>
                    </span>
                    <span>Verified at: {req.depositVerifiedAt}</span>
                  </div>
                )}

                {/* Actions Ribbon */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[10px] font-mono text-gray-500">
                    Request Reference: <span className="text-white">{req.id}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Primary Button for Pending Deposit: Manual Verification */}
                    {isPendingDeposit ? (
                      <>
                        <button
                          onClick={() => handleOpenVerifyModal(req)}
                          className="metallic-button-strong px-4 py-2 rounded text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                          title="Manually verify advance deposit UTR and clear for dispatch"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Verify Advance Deposit</span>
                        </button>

                        <button
                          onClick={() => {
                            onRequestAudit(
                              'VIP Home Service Concierge',
                              `${req.id} (${req.clientName})`,
                              'Deposit Status',
                              req.depositStatus,
                              'Deposit Failed / Expired',
                              (reason) => onRejectDeposit(req.id, reason)
                            );
                          }}
                          className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded text-xs font-mono"
                        >
                          Flag Invalid / Reject
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Fulfillment actions when deposit is already verified */}
                        {req.serviceStatus !== 'Artisan Dispatched' && req.serviceStatus !== 'In Progress' && (
                          <button
                            onClick={() => {
                              onRequestAudit(
                                'VIP Home Service Concierge',
                                `${req.id} (${req.clientName})`,
                                'Fulfillment Status',
                                req.serviceStatus,
                                'Artisan Dispatched',
                                () => onUpdateServiceStatus(req.id, 'Artisan Dispatched')
                              );
                            }}
                            className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 rounded text-xs font-mono flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch Artisans</span>
                          </button>
                        )}

                        {req.serviceStatus === 'Artisan Dispatched' && (
                          <button
                            onClick={() => {
                              onRequestAudit(
                                'VIP Home Service Concierge',
                                `${req.id} (${req.clientName})`,
                                'Fulfillment Status',
                                req.serviceStatus,
                                'In Progress',
                                () => onUpdateServiceStatus(req.id, 'In Progress')
                              );
                            }}
                            className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 rounded text-xs font-mono"
                          >
                            Mark In Progress
                          </button>
                        )}

                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 px-2.5 py-1 bg-emerald-950/40 rounded border border-emerald-500/30">
                          <Check className="w-3 h-3" /> Advance Cleared
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: MANUAL ADVANCE DEPOSIT VERIFICATION */}
      {verifyingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0A0A0A] border-2 border-[#D4AF37] rounded-xl shadow-[0_0_60px_rgba(212,175,55,0.3)] overflow-hidden text-white space-y-4 p-6">
            <div className="h-1.5 -mx-6 -mt-6 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37]"></div>

            <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-medium text-white">Manual Advance Deposit Verification</h3>
                  <p className="text-[10px] font-mono text-gray-400">
                    Confirm bank UTR reference and authorize VIP home service salon dispatch
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVerifyingRequest(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Request Summary */}
            <div className="p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Request ID:</span>
                <span className="text-[#D4AF37] font-bold">{verifyingRequest.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Client:</span>
                <span className="text-white font-medium">{verifyingRequest.clientName} ({verifyingRequest.vipTier})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Couture House:</span>
                <span className="text-gray-200">{verifyingRequest.salonName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gross Booking Value:</span>
                <span className="text-white">₹{verifyingRequest.grossAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10 text-emerald-400 font-bold">
                <span>Advance Deposit (50%):</span>
                <span>₹{verifyingRequest.advanceDepositRequired.toLocaleString()}</span>
              </div>
            </div>

            {/* Bank UTR verification input */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-gray-300 text-[10px] uppercase mb-1">
                  Bank UTR / RTGS / Payment Reference Number *
                </label>
                <input
                  type="text"
                  value={verifiedUtr}
                  onChange={(e) => setVerifiedUtr(e.target.value)}
                  className="w-full px-3 py-2 bg-black rounded border border-[#D4AF37]/50 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter bank UTR number e.g. HDFC99824108821..."
                  required
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Verify against live bank statement or payment gateway credit alert.
                </span>
              </div>

              <div>
                <label className="block text-gray-300 text-[10px] uppercase mb-1">
                  Verification Notes / Audit Reason *
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-black rounded border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                  placeholder="Manager confirmation notes..."
                  required
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={() => setVerifyingRequest(null)}
                className="px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmVerification}
                className="metallic-button-strong px-5 py-2 rounded text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Release to Salon</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
