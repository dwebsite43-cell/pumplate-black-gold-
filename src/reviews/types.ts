export interface ReviewCategoryRatings {
  serviceQuality: number;
  ambiance: number;
  stylistExpertise: number;
  punctuality: number;
}

export interface SalonReviewResponse {
  responderName: string;
  responderRole: string;
  comment: string;
  date: string;
}

export interface ShopReview {
  id: string;
  shopId: string; // 'letoile' | 'aura' | 'obsidian'
  authorName: string;
  authorLocation?: string;
  authorTier?: 'VIP Velvet' | 'Atelier Member' | 'Sovereign Patron' | 'First-Time Guest';
  authorAvatar?: string;
  rating: number; // 1 to 5
  appointmentDate: string;
  appointmentCode?: string; // e.g. 'LET-ESC-901'
  serviceName: string;
  stylistName?: string;
  title: string;
  comment: string;
  categoriesRatings?: ReviewCategoryRatings;
  tags?: string[];
  photos?: string[];
  helpfulCount: number;
  isVerifiedAppointment: boolean;
  salonResponse?: SalonReviewResponse;
  createdAt: string;
}

export interface ShopRatingSummary {
  shopId: string;
  averageRating: number;
  totalReviews: number;
  recommendationRate: number; // percentage, e.g. 98
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  categoryAverages: {
    serviceQuality: number;
    ambiance: number;
    stylistExpertise: number;
    punctuality: number;
  };
}
