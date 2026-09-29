import { SalonTemplate, AnalyticsMetric } from './types';

export const salonTemplates: SalonTemplate[] = [
  {
    id: 'letoile',
    name: "L'Étoile Hair Lounge",
    tagline: "High-Fashion Hair Sculpture & Balayage",
    slug: "letoile",
    theme: "Noir Gold Prestige",
    bgGrad: "from-[#0A0A0A] via-[#111111] to-[#050505]",
    accentColor: "#D4AF37",
    services: [
      { id: 'let-1', name: 'Signature French Gold Balayage', description: 'Bespoke hand-painted dimensional gold illumination paired with micro-keratin shield.', price: 18500, duration: 180, category: 'Hair Artistry' },
      { id: 'let-2', name: 'Royal Caviar Crown Therapy', description: 'Scalp detoxification infused with French white caviar extracts and warm gold mist infusion.', price: 9500, duration: 90, category: 'Scalp Wellness' },
      { id: 'let-3', name: 'Couture Precision Cut & Styling', description: 'Master-level sculptural cut adjusted perfectly to facial architecture, completed with signature blowout.', price: 6500, duration: 60, category: 'Sculpt & Style' }
    ],
    stylists: [
      {
        id: 'sty-1',
        name: 'Master Jean-Jacques',
        role: 'Global Creative Director',
        rating: 4.98,
        experienceYears: 16,
        education: 'École Supérieure de Coiffure Paris & Vidal Sassoon London',
        reviewsCount: 520,
        signatureWork: 'Dimensional 24K French Gold Balayage & Architectural Bobs',
        quote: 'Hair is dynamic sculpture. We don’t just cut; we design light and shadow around facial architecture.',
        bio: 'Trained in Paris and London, Master Jean-Jacques has directed runway hair for Paris Haute Couture Fashion Week and Cannes Film Festival. He specializes in freehand multi-tonal balayage, gold leaf micro-highlighting, and bespoke bridal hair sculptures.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        specialties: ['French Balayage', 'Precision Architectural Cuts', 'Bridal Trousseau Styling', 'Runway Direction'],
        portfolio: [
          {
            id: 'p-jj-1',
            title: 'Champagne Melt Balayage',
            technique: 'Freehand Clay Foil-Free',
            image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
            description: 'Sun-drenched dimensional French gold tones with seamless shadowed root.'
          },
          {
            id: 'p-jj-2',
            title: 'Architectural Jawline Bob',
            technique: 'Dry Diamond Shear Carving',
            image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80',
            description: 'Razor-sharp jaw-grazing silhouette aligned to cheekbone prominence.'
          },
          {
            id: 'p-jj-3',
            title: 'Royal Bridal Chignon & Veil Anchor',
            technique: 'Sculptural Pinning',
            image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80',
            description: 'Intricate low bridal chignon with hand-woven Swarovski crystal vine.'
          }
        ]
      },
      {
        id: 'sty-2',
        name: 'Elena Rostova',
        role: 'Senior Color Sculptor',
        rating: 4.94,
        experienceYears: 11,
        education: 'Toni&Guy Academy Milan & Wella Color Master Guild',
        reviewsCount: 390,
        signatureWork: 'Complex Color Correction, Platinum Glazes & Velvet Keratin',
        quote: 'Color is emotional alchemy. Achieving that perfect translucent tone requires scientific precision and high art.',
        bio: 'Recognized as one of Mumbai’s preeminent colorists, Elena is renowned for salvaging traumatized hair and elevating dull tones into luminous butterscotch, spun platinum, and rich chocolate glosses with zero structural damage.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        specialties: ['Color Correction', 'Translucent Platinum Glaze', 'Velvet Keratin Infusion', 'Gloss Illuminations'],
        portfolio: [
          {
            id: 'p-el-1',
            title: 'Smoky Platinum Glaze',
            technique: 'Olaplex Bond Rebuilding',
            image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80',
            description: 'Cool Nordic ice finish with prismatic pearlescent undertones.'
          },
          {
            id: 'p-el-2',
            title: 'Honey Amber Gloss Melt',
            technique: 'Multi-Zone Tone Blending',
            image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80',
            description: 'Warm caramel, honeycomb, and chestnut ribbons with high mirror gloss.'
          },
          {
            id: 'p-el-3',
            title: 'Parisian Silk Keratin Finish',
            technique: 'Infrared Thermal Lock',
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
            description: 'Weightless, humidity-immune glassy hair texture sealed for 16 weeks.'
          }
        ]
      }
    ]
  },
  {
    id: 'aura',
    name: "AURA Luxury Spa",
    tagline: "Therapeutic sanctuaries of total gold stillness",
    slug: "aura-spa",
    theme: "Warm Amber Champagne",
    bgGrad: "from-[#0D0B05] via-[#050505] to-[#121008]",
    accentColor: "#F5D0A1",
    services: [
      { id: 'aur-1', name: 'Champagne & 24K Gold Body Healing', description: 'Thermal body polish utilizing crushed champagne grapes, completed with a 24-karat gold oil massage.', price: 22000, duration: 120, category: 'Body Rituals' },
      { id: 'aur-2', name: 'Elite Oxygen Facial Infusion', description: 'Hyperbaric pure oxygen serum delivery with mineral-rich thermal quartz crystals massage.', price: 14000, duration: 75, category: 'Skin Radiance' },
      { id: 'aur-3', name: 'Sound Bath & Obsidian Stone Massage', description: 'Vibrational alignment backed by heated volcanic obsidian basalt stone tissue release.', price: 11000, duration: 90, category: 'Mind Stillness' }
    ],
    stylists: [
      {
        id: 'sty-3',
        name: 'Anya Sen',
        role: 'Vibrational Therapist',
        rating: 4.98,
        experienceYears: 13,
        education: 'Dharamsala Holistic Institute & Bali Thermal Sanctuary Guild',
        reviewsCount: 410,
        signatureWork: 'Tibetan Quartz Harmonic Sound Baths & Basalt Obsidian Massage',
        quote: 'True restoration begins when the nervous system enters complete parasympathetic stillness.',
        bio: 'A certified master of Tibetan singing bowl acoustics and volcanic obsidian myofascial release, Anya harmonizes deep tissue physical release with vibrational frequency realignment.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        specialties: ['Obsidian Stone Release', 'Sound Frequency Alignment', 'Myofascial Thermal Therapy'],
        portfolio: [
          {
            id: 'p-as-1',
            title: 'Volcanic Obsidian Basalt Align',
            technique: 'Meridian Heated Stone',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
            description: 'Hand-harvested volcanic obsidian heated to 54°C along spinal meridians.'
          },
          {
            id: 'p-as-2',
            title: 'Acoustic Quartz Sound Bath',
            technique: 'Full-Body Harmonic Immersion',
            image: 'https://images.unsplash.com/photo-1512290900672-1f416a5061b4?auto=format&fit=crop&w=400&q=80',
            description: 'Multi-note hand-hammered singing bowls calibrating deep brainwave delta state.'
          }
        ]
      },
      {
        id: 'sty-4',
        name: 'Aditya Vardhan',
        role: 'Wellness Alchemist',
        rating: 4.96,
        experienceYears: 10,
        education: 'Ayurvedic Academy of Kerala & Swiss Skin Science Institute',
        reviewsCount: 340,
        signatureWork: '24K Pure Gold Dermal Infusion & Thermal Mineral Detox',
        quote: 'Ancient golden oils and hyperbaric pure oxygen produce timeless dermal vitality.',
        bio: 'Aditya crafts bespoke botanical formulations and gold leaf massages. He blends hyperbaric pure oxygen delivery with herbal elixirs to dissolve deep fatigue and activate cellular glow.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        specialties: ['24K Gold Dermal Therapy', 'Hyperbaric Oxygen Plumping', 'Ayurvedic Marma Therapy'],
        portfolio: [
          {
            id: 'p-av-1',
            title: '24K Aurum Dermal Smoothing',
            technique: 'Pure Gold Leaf Infusion',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
            description: '24-karat edible gold leaves pressed and dissolved with hyperbaric serum.'
          },
          {
            id: 'p-av-2',
            title: 'Thermal Mineral Detox Wrap',
            technique: 'Crushed Grape & Clay Envelopment',
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
            description: 'Thermal botanical cocoon melting muscle tension and drawing lymphatic impurities.'
          }
        ]
      }
    ]
  },
  {
    id: 'obsidian',
    name: "The Obsidian Atelier",
    tagline: "Bespoke body illustration and high-fashion line art",
    slug: "obsidian-atelier",
    theme: "Minimalist Charcoal Steel",
    bgGrad: "from-[#040404] via-[#0A0A0A] to-[#111111]",
    accentColor: "#E5E5E5",
    services: [
      { id: 'obs-1', name: 'Bespoke Fine-Line Illustration', description: 'Luxury custom illustrative sketching directly onto skin, rendered with elite hypoallergenic pigments.', price: 25000, duration: 180, category: 'Luxury Ink' },
      { id: 'obs-2', name: 'Polynesian Geometric Micro-Art', description: 'Complex mathematically aligned geometric patterns with supreme grey-wash details.', price: 15500, duration: 120, category: 'Traditional Ink' },
      { id: 'obs-3', name: 'Luxury Jewelry Restructuring', description: 'Anatomically matched premium solid gold and titanium micro-body-piercing artistry.', price: 8500, duration: 45, category: 'Structural Gems' }
    ],
    stylists: [
      {
        id: 'sty-5',
        name: 'Sven Lindqvist',
        role: 'Lead Resident Artist',
        rating: 4.99,
        experienceYears: 15,
        education: 'Royal Academy of Fine Arts Stockholm',
        reviewsCount: 580,
        signatureWork: 'Micro-Geometric Realism & 24K Gold Tattoo Inlay',
        quote: 'The human form is the ultimate canvas. Every millimeter must respect anatomy and gravity.',
        bio: 'Sven brings classical Nordic fine-art training to single-needle luxury tattoo artistry. Specializing in micro-realism, anatomical geometric patterns, and fine-line calligraphy.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        specialties: ['Single-needle Lineart', 'Geometric Realism', 'Gold Ink Inlay'],
        portfolio: [
          {
            id: 'p-sl-1',
            title: 'Anatomical Sacred Geometry',
            technique: '0.15mm Single-Needle',
            image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=400&q=80',
            description: 'Micro-precision geometric mandala aligned to the cervical spine curve.'
          },
          {
            id: 'p-sl-2',
            title: 'Hyper-Realistic Floral Silhouette',
            technique: 'Micro Grey-Wash Fade',
            image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=400&q=80',
            description: 'Delicate single-needle botanical shading with razor-sharp micro-leaf contours.'
          }
        ]
      },
      {
        id: 'sty-6',
        name: 'Zara Blackwood',
        role: 'Bespoke Jewelry Alchemist',
        rating: 4.94,
        experienceYears: 9,
        education: 'Association of Professional Piercers (APP) Accredited & London Metal Guild',
        reviewsCount: 310,
        signatureWork: 'Curated Auricular Architecture & Solid Gold Microdermals',
        quote: 'Ear curation is architectural fine jewelry. Placement must harmonize with cartilage curvature.',
        bio: 'Specializes in needle-only anatomical ear curation using solid 18K/24K gold and implant-grade titanium, creating bespoke multi-gem constellation styling for high-fashion clients.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        specialties: ['Curated Ear Architecture', 'Solid Gold Piercing', 'Microdermal Studding'],
        portfolio: [
          {
            id: 'p-zb-1',
            title: 'Constellation Diamond Curation',
            technique: 'Aseptic Needle Piercing',
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
            description: 'Six-point celestial ear layout with hand-set marquise diamonds and yellow gold hoops.'
          }
        ]
      }
    ]
  }
];

export const mockAnalytics: AnalyticsMetric[] = [
  { date: 'Mon', revenue: 245000, bookings: 32, retentionRate: 88 },
  { date: 'Tue', revenue: 289000, bookings: 39, retentionRate: 91 },
  { date: 'Wed', revenue: 354000, bookings: 44, retentionRate: 94 },
  { date: 'Thu', revenue: 412000, bookings: 51, retentionRate: 95 },
  { date: 'Fri', revenue: 589000, bookings: 68, retentionRate: 97 },
  { date: 'Sat', revenue: 742000, bookings: 89, retentionRate: 98 },
  { date: 'Sun', revenue: 810000, bookings: 95, retentionRate: 99 }
];

export const sampleRetentionCampaign = {
  inactiveCount: 14,
  churnRiskAverage: "84%",
  draftedMessage: "Greetings from L'Étoile. We have noticed your reservation patterns suggest. A dedicated VIP velvet suite is reserved for you on Thursday evening with 20% elite credit. Please review to trigger dispatch.",
  sentChannels: ["WhatsApp Private Line", "Bespoke concierge SMS"],
};

export interface TerminalScanRecord {
  id: string;
  date: string;
  time: string;
  relativeTime: string;
  guest: string;
  tier: string;
  service: string;
  gross: number;
  counter75: number;
  escrow25: number;
  mode: string;
  vpa: string;
  utr: string;
  badge: string;
}

export const terminalScansData: TerminalScanRecord[] = [
  {
    id: 'TXN-NEX-8812',
    date: '2026-09-28',
    time: '15:42 IST',
    relativeTime: '4 mins ago (15:42 IST)',
    guest: 'Suhana Kapoor',
    tier: 'VIP Diamond Member',
    service: 'Signature French Gold Balayage',
    gross: 18500,
    counter75: 13875,
    escrow25: 4625,
    mode: 'UPI Instant QR (HDFC)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4288190281/HDFC',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8809',
    date: '2026-09-28',
    time: '15:18 IST',
    relativeTime: '28 mins ago (15:18 IST)',
    guest: 'Meera Singhania',
    tier: 'Couture Black Card',
    service: 'Royal Caviar Crown Therapy',
    gross: 9500,
    counter75: 7125,
    escrow25: 2375,
    mode: 'UPI Instant QR (ICICI)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4288177412/ICICI',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8794',
    date: '2026-09-28',
    time: '14:35 IST',
    relativeTime: '1 hour ago (14:35 IST)',
    guest: 'Ananya Roy',
    tier: 'Signature VIP Guest',
    service: 'Couture Precision Cut & Styling',
    gross: 6500,
    counter75: 4875,
    escrow25: 1625,
    mode: 'UPI Instant QR (Axis)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4288149021/AXIS',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8782',
    date: '2026-09-28',
    time: '12:15 IST',
    relativeTime: '3 hours ago (12:15 IST)',
    guest: 'Rohit Malhotra',
    tier: 'Executive Diamond Member',
    service: 'Executive Diamond Grooming & Shave',
    gross: 4800,
    counter75: 3600,
    escrow25: 1200,
    mode: 'UPI Instant QR (SBI)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4288110943/SBI',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8770',
    date: '2026-09-28',
    time: '10:45 IST',
    relativeTime: '5 hours ago (10:45 IST)',
    guest: 'Natasha Poonawalla',
    tier: 'VIP Diamond Elite',
    service: 'Platinum 24K Gold Facial Treatment',
    gross: 24000,
    counter75: 18000,
    escrow25: 6000,
    mode: 'UPI Instant QR (HDFC)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4288092100/HDFC',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8745',
    date: '2026-09-27',
    time: '18:20 IST',
    relativeTime: 'Yesterday (18:20 IST)',
    guest: 'Kavita Oberoi',
    tier: 'Couture Black Card',
    service: 'Parisian Keratin Infusion & Blowout',
    gross: 12000,
    counter75: 9000,
    escrow25: 3000,
    mode: 'UPI Instant QR (Kotak)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4277182901/KOTAK',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8731',
    date: '2026-09-27',
    time: '16:10 IST',
    relativeTime: 'Yesterday (16:10 IST)',
    guest: 'Devika Vardhan',
    tier: 'VIP Gold Member',
    service: 'Japanese Silk Hydration Therapy',
    gross: 8500,
    counter75: 6375,
    escrow25: 2125,
    mode: 'UPI Instant QR (HDFC)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4277161044/HDFC',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8718',
    date: '2026-09-27',
    time: '13:40 IST',
    relativeTime: 'Yesterday (13:40 IST)',
    guest: 'Sameer Bajaj',
    tier: 'Executive Member',
    service: 'Scalp Detox & Thermal Massage',
    gross: 5500,
    counter75: 4125,
    escrow25: 1375,
    mode: 'UPI Instant QR (ICICI)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4277134019/ICICI',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8692',
    date: '2026-09-25',
    time: '17:15 IST',
    relativeTime: '3 days ago (17:15 IST)',
    guest: 'Zara Merchant',
    tier: 'Signature VIP Guest',
    service: 'Moroccan Argan Luxury Pedicure',
    gross: 4200,
    counter75: 3150,
    escrow25: 1050,
    mode: 'UPI Instant QR (Axis)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4255171502/AXIS',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8650',
    date: '2026-09-24',
    time: '11:30 IST',
    relativeTime: '4 days ago (11:30 IST)',
    guest: 'Aditya Birla',
    tier: 'Diamond Reserve Member',
    service: 'Royal Bespoke Beard Shaping & Treatment',
    gross: 3600,
    counter75: 2700,
    escrow25: 900,
    mode: 'UPI Instant QR (HDFC)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4244113098/HDFC',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8580',
    date: '2026-09-20',
    time: '19:00 IST',
    relativeTime: '8 days ago (19:00 IST)',
    guest: 'Priya Chawla',
    tier: 'Couture Black Card',
    service: 'French Illuminating Gloss Treatment',
    gross: 7800,
    counter75: 5850,
    escrow25: 1950,
    mode: 'UPI Instant QR (SBI)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4200190012/SBI',
    badge: '75% Settled Direct',
  },
  {
    id: 'TXN-NEX-8521',
    date: '2026-09-15',
    time: '14:20 IST',
    relativeTime: '13 days ago (14:20 IST)',
    guest: 'Vikram Sethi',
    tier: 'VIP Diamond Member',
    service: 'Signature Balayage & Botanical Mask',
    gross: 16000,
    counter75: 12000,
    escrow25: 4000,
    mode: 'UPI Instant QR (HDFC)',
    vpa: 'letoile.salon@hdfcbank',
    utr: 'UPI/4155142099/HDFC',
    badge: '75% Settled Direct',
  }
];
