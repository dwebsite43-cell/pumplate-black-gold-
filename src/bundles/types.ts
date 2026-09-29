export interface BundledServiceItem {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  durationMinutes: number;
  description: string;
}

export interface BundledPackage {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  badge?: string;
  category: 'all' | 'bridal' | 'gala' | 'wellness' | 'executive' | 'couples';
  durationHours: number;
  services: BundledServiceItem[];
  originalPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  savingsAmount: number;
  depositPercent: number;
  depositAmount: number;
  remainderAmount: number;
  heroImage: string;
  features: string[];
  idealFor: string;
}

export interface BundleBookingRequest {
  bundleId: string;
  bundleName: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  eventDate: string;
  timeSlot: string;
  locationChoice: 'flagship_salon' | 'vip_home_suite';
  homeAddress?: string;
  specialNotes?: string;
  totalPrice: number;
  depositAmount: number;
  remainderAmount: number;
  isCustomBundle?: boolean;
  selectedServicesList?: string[];
}
