export interface PartnerShopDetail {
  shopId: string;
  shopName: string;
  ownerName: string;
  mobileNumber: string;
  address: string;
  city: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  qrActivationDate: string;
  dailyQrTransaction: number;
  requiredDailyQrTransaction: number; // ₹1,000
  companyCommissionRate: number; // 10%
  dailyCompanyCommission: number; // 10% of dailyQrTransaction
  dailyQualification: 'Passed' | 'Not Passed';
  consecutiveQualifyingDays: number; // e.g. 15 / 15
  isCycleCompleted: boolean; // Completed 15-day cycle
  settlementStatus: 'Settled (Bank UTR Released)' | 'In Escrow (Rolling 15-Day)' | 'Pending Verification' | 'Hold (Anomaly)';
  refundReversalStatus: 'Zero Reversals (Clean)' | '1 Reversal (Under Review)' | 'None';
  verificationStatus: 'Verified & Active' | 'Under Inspection' | 'Rejected';
  rejectionReason?: string;
  interiorPhoto: string;
  category: string;
}

export interface GrowthPartnerProfile {
  partnerId: string;
  name: string;
  phone: string;
  email: string;
  tier: 'Gold' | 'Platinum' | 'Diamond';
  joinedDate: string;
  region: string;
  totalShopsOnboarded: number;
  verifiedShops: number;
  qualifyingShops: number;
  shopsCompleting15DayCycle: number;
  rejectedShops: number;
  currentMilestone: string;
  nextMilestone: string;
  remainingShopsForNextMilestone: number;
  plusOneShopStatus: string;
  currentEligibleReward: string;
  claimStatus: 'Eligible to Claim' | 'Claim Submitted' | 'Approved & Dispatched' | 'Milestone Incomplete';
  shops: PartnerShopDetail[];
}
