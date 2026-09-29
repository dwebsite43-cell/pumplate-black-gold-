import { ShopReview } from './types';

export const initialShopReviews: ShopReview[] = [
  // L'ÉTOILE HAIR LOUNGE REVIEWS
  {
    id: 'rev-let-1',
    shopId: 'letoile',
    authorName: 'Devika Singhania',
    authorLocation: 'Colaba, Mumbai',
    authorTier: 'Sovereign Patron',
    rating: 5,
    appointmentDate: '2026-09-24',
    appointmentCode: 'LET-ESC-901',
    serviceName: 'Signature French Gold Balayage',
    stylistName: 'Master Jean-Jacques',
    title: 'Flawless sun-painted gold balayage with unmatched privacy',
    comment:
      'Master Jean-Jacques transformed my dull ends into radiant champagne ribbons with zero bleach harshness. The private suite experience, with warm gold leaf tea and bespoke scalp conditioning, was pure Parisian luxury. The 25% escrow booking gave me complete peace of mind, and the remaining settlement at the Nexora desk counter QR was effortless.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['French Balayage', 'Private Suite', 'Champagne Tea', 'Master Jean-Jacques'],
    helpfulCount: 38,
    isVerifiedAppointment: true,
    salonResponse: {
      responderName: 'Master Jean-Jacques',
      responderRole: 'Global Creative Director',
      comment:
        'Chère Devika, crafting those delicate multi-tonal champagne reflections around your cheekbones was an absolute pleasure. Your velvet suite reservation is permanently preserved for your seasonal gloss touch-up.',
      date: '2026-09-25'
    },
    createdAt: '2026-09-24T18:45:00Z'
  },
  {
    id: 'rev-let-2',
    shopId: 'letoile',
    authorName: 'Aarav Merchant',
    authorLocation: 'Bandra West, Mumbai',
    authorTier: 'VIP Velvet',
    rating: 5,
    appointmentDate: '2026-09-20',
    appointmentCode: 'LET-ESC-782',
    serviceName: 'Couture Precision Cut & Styling',
    stylistName: 'Elena Rostova',
    title: 'The architectural precision is leagues beyond standard luxury salons',
    comment:
      'Elena Rostova possesses extraordinary technical clarity. She analyzed my facial geometry and hair grain before touching a pair of Japanese diamond shears. The resulting contour has retained its crisp line for two weeks straight without product weight. L’Étoile is the only place in the country operating at Savile Row standards for hair.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 4.8
    },
    tags: ['Architectural Cut', 'Diamond Shears', 'Elena Rostova', 'Precision'],
    helpfulCount: 22,
    isVerifiedAppointment: true,
    createdAt: '2026-09-20T14:30:00Z'
  },
  {
    id: 'rev-let-3',
    shopId: 'letoile',
    authorName: 'Priyamvada Goel',
    authorLocation: 'Worli, Mumbai',
    authorTier: 'Atelier Member',
    rating: 5,
    appointmentDate: '2026-09-15',
    appointmentCode: 'LET-ESC-641',
    serviceName: 'Royal Caviar Crown Therapy',
    stylistName: 'Elena Rostova',
    title: 'Deep scalp rejuvenation with genuine white caviar extracts',
    comment:
      'After back-to-back bridal shoots, my scalp and roots were utterly exhausted. The gold mist infusion and warm caviar detoxification restored immediate bounce and volume. The sensory journey—the aromas, warm marble basin, and soothing infrared light—melted all stress. Truly a masterclass in restorative wellness.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['Caviar Scalp Therapy', 'Restorative', 'Warm Mist Basin'],
    helpfulCount: 17,
    isVerifiedAppointment: true,
    salonResponse: {
      responderName: 'L’Étoile Management',
      responderRole: 'Atelier Concierge',
      comment:
        'Thank you, Priyamvada. Restoring cellular vitality and scalp balance is at the core of our French white caviar protocols. We look forward to welcoming you back.',
      date: '2026-09-16'
    },
    createdAt: '2026-09-15T19:10:00Z'
  },
  {
    id: 'rev-let-4',
    shopId: 'letoile',
    authorName: 'Kavita Kapoor',
    authorLocation: 'Juhu, Mumbai',
    authorTier: 'VIP Velvet',
    rating: 4,
    appointmentDate: '2026-09-08',
    appointmentCode: 'LET-ESC-519',
    serviceName: 'Signature French Gold Balayage',
    stylistName: 'Master Jean-Jacques',
    title: 'Exquisite color results, slightly extended consultation duration',
    comment:
      'The dimensional color work is second to none; the tones match the sunlight in Saint-Tropez. Only deducting one star because the initial bespoke color mapping took 40 minutes before application began. That said, the meticulous care ensured zero cuticle damage.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 4.8,
      stylistExpertise: 5,
      punctuality: 4.0
    },
    tags: ['French Balayage', 'Detailed Consultation'],
    helpfulCount: 9,
    isVerifiedAppointment: true,
    createdAt: '2026-09-08T16:00:00Z'
  },

  // AURA LUXURY SPA REVIEWS
  {
    id: 'rev-aur-1',
    shopId: 'aura',
    authorName: 'Rohan Talwar',
    authorLocation: 'Alibaug & Mumbai',
    authorTier: 'Sovereign Patron',
    rating: 5,
    appointmentDate: '2026-09-26',
    appointmentCode: 'AUR-ESC-833',
    serviceName: 'Champagne & 24K Gold Body Healing',
    stylistName: 'Aditya Vardhan',
    title: 'Transformative thermal gold therapy in total sonic isolation',
    comment:
      'AURA is an architectural sanctuary. The crushed champagne grape body polish followed by warm 24-karat gold oil dissolved months of corporate tension. Aditya Vardhan is a genuine wellness alchemist who understands marma pressure points intimately. The acoustic design ensures you do not hear a whisper from the outside world.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['24K Gold Oil', 'Total Stillness', 'Aditya Vardhan', 'Marma Healing'],
    helpfulCount: 42,
    isVerifiedAppointment: true,
    salonResponse: {
      responderName: 'Aditya Vardhan',
      responderRole: 'Lead Wellness Alchemist',
      comment:
        'Namaste Rohan. Creating a haven of parasympathetic restoration is our highest calling. May the golden botanical nourishment stay with you.',
      date: '2026-09-27'
    },
    createdAt: '2026-09-26T20:15:00Z'
  },
  {
    id: 'rev-aur-2',
    shopId: 'aura',
    authorName: 'Meera Chokshi',
    authorLocation: 'Nariman Point, Mumbai',
    authorTier: 'VIP Velvet',
    rating: 5,
    appointmentDate: '2026-09-22',
    appointmentCode: 'AUR-ESC-710',
    serviceName: 'Sound Bath & Obsidian Stone Massage',
    stylistName: 'Anya Sen',
    title: 'Anya Sen’s quartz harmonics and basalt release felt out of this world',
    comment:
      'The multi-note singing bowl resonance calibrated my mind into a state of deep delta stillness within ten minutes. The heated volcanic obsidian stones glided along spinal meridians with exact thermal control. I felt lighter and more grounded than I have in years. Worth every rupee.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['Sound Bath', 'Obsidian Basalt', 'Anya Sen', 'Spinal Meridians'],
    helpfulCount: 29,
    isVerifiedAppointment: true,
    createdAt: '2026-09-22T17:40:00Z'
  },
  {
    id: 'rev-aur-3',
    shopId: 'aura',
    authorName: 'Sanjay Chhabria',
    authorLocation: 'Cuffe Parade, Mumbai',
    authorTier: 'Atelier Member',
    rating: 5,
    appointmentDate: '2026-09-17',
    appointmentCode: 'AUR-ESC-592',
    serviceName: 'Elite Oxygen Facial Infusion',
    stylistName: 'Aditya Vardhan',
    title: 'Hyperbaric oxygen delivery that shaved 5 years off fatigue',
    comment:
      'Traveled in from London on a 9-hour redeye and walked directly into AURA. The hyperbaric pure oxygen delivery paired with quartz crystal facial sculpting drained all puffiness instantly. My skin remained glowing and deeply hydrated for an entire week.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['Hyperbaric Oxygen', 'Crystal Sculpting', 'Jetlag Recovery'],
    helpfulCount: 19,
    isVerifiedAppointment: true,
    createdAt: '2026-09-17T11:20:00Z'
  },

  // THE OBSIDIAN ATELIER REVIEWS
  {
    id: 'rev-obs-1',
    shopId: 'obsidian',
    authorName: 'Vikramaditya Roy',
    authorLocation: 'Lower Parel, Mumbai',
    authorTier: 'Sovereign Patron',
    rating: 5,
    appointmentDate: '2026-09-25',
    appointmentCode: 'OBS-ESC-914',
    serviceName: 'Bespoke Fine-Line Illustration',
    stylistName: 'Sven Lindqvist',
    title: 'Single-needle micro-precision that belongs in a fine art museum',
    comment:
      'Sven Lindqvist spent two hours freehand-sketching the architectural mandala directly onto my arm to align with the musculature and bone structure. The 0.15mm needlework is impossibly crisp, with zero trauma or blowout. The sterile minimalist environment felt like a luxury gallery rather than a tattoo studio.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['0.15mm Single-Needle', 'Anatomical Alignment', 'Sven Lindqvist', 'Fine Art'],
    helpfulCount: 45,
    isVerifiedAppointment: true,
    salonResponse: {
      responderName: 'Sven Lindqvist',
      responderRole: 'Lead Resident Artist',
      comment:
        'Tack so much, Vikramaditya. Sacred geometry must always respect biological curves. Your skin accepted the pigment with supreme grace.',
      date: '2026-09-26'
    },
    createdAt: '2026-09-25T21:00:00Z'
  },
  {
    id: 'rev-obs-2',
    shopId: 'obsidian',
    authorName: 'Natasha Wadia',
    authorLocation: 'Khar West, Mumbai',
    authorTier: 'VIP Velvet',
    rating: 5,
    appointmentDate: '2026-09-19',
    appointmentCode: 'OBS-ESC-778',
    serviceName: 'Luxury Jewelry Restructuring',
    stylistName: 'Zara Blackwood',
    title: 'Aseptic needle ear curation with 18K solid gold diamond marquise',
    comment:
      'Zara Blackwood mapped out my ear cartilage like an architect. She installed a celestial five-gem constellation using internal-threaded solid gold without guns or trauma. The pain was minimal, healing has been seamless, and the styling looks like high jewelry from Place Vendôme.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['Aseptic Needle', 'Solid 18K Gold', 'Constellation Layout', 'Zara Blackwood'],
    helpfulCount: 31,
    isVerifiedAppointment: true,
    createdAt: '2026-09-19T15:15:00Z'
  },
  {
    id: 'rev-obs-3',
    shopId: 'obsidian',
    authorName: 'Kunal Singhal',
    authorLocation: 'BKC, Mumbai',
    authorTier: 'Atelier Member',
    rating: 5,
    appointmentDate: '2026-09-12',
    appointmentCode: 'OBS-ESC-623',
    serviceName: 'Polynesian Geometric Micro-Art',
    stylistName: 'Sven Lindqvist',
    title: 'Flawless grey-wash tones and razor-sharp micro-linework',
    comment:
      'Sven’s mastery of mathematical symmetry is stunning. The grey-wash gradients have cured into a velvety charcoal tone that catches the light beautifully. The studio’s hygiene protocols are higher than many hospitals I have visited.',
    categoriesRatings: {
      serviceQuality: 5,
      ambiance: 5,
      stylistExpertise: 5,
      punctuality: 5
    },
    tags: ['Grey-Wash Gradients', 'Symmetry', 'Hospital-Grade Sterile'],
    helpfulCount: 18,
    isVerifiedAppointment: true,
    createdAt: '2026-09-12T19:30:00Z'
  }
];
