import { BundledPackage, BundledServiceItem } from './types';

export const curatedBundles: BundledPackage[] = [
  {
    id: 'bnd-bridal-glow',
    slug: 'bridal-glow-package',
    name: 'The Royal Bridal Glow Sanctuary',
    subtitle: 'The quintessential multi-phase bridal radiance & rejuvenation ritual',
    badge: 'SIGNATURE BRIDAL',
    category: 'bridal',
    durationHours: 6.5,
    originalPrice: 64000,
    bundlePrice: 44800,
    discountPercentage: 30,
    savingsAmount: 19200,
    depositPercent: 25,
    depositAmount: 11200,
    remainderAmount: 33600,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Brides, Sangeet & Reception Galas, Destination Wedding Nuptials',
    features: [
      'Private Velvet Presidential Suite reserved for the day',
      'Complimentary Moët & Chandon champagne & French patisserie tray',
      'Dedicated styling directorship by Master Jean-Jacques',
      'Complimentary bridal veil & diamond headpiece anchoring trial',
      'VIP Concierge Mercedes-Maybach transfer option available'
    ],
    services: [
      {
        id: 'srv-balayage-gold',
        name: 'Signature French 24K Gold Balayage & Crown Sculpting',
        category: 'Hair Artistry',
        originalPrice: 18500,
        durationMinutes: 180,
        description: 'Bespoke hand-painted dimensional gold illumination paired with micro-keratin shield.'
      },
      {
        id: 'srv-caviar-scalp',
        name: 'Royal Caviar & White Truffle Scalp Detox',
        category: 'Scalp Wellness',
        originalPrice: 9500,
        durationMinutes: 90,
        description: 'Scalp detoxification infused with French white caviar extracts and warm gold mist infusion.'
      },
      {
        id: 'srv-gold-body',
        name: '24K Pure Gold Thermal Body Polish & Champagne Wrap',
        category: 'Body Rituals',
        originalPrice: 22000,
        durationMinutes: 120,
        description: 'Thermal body polish utilizing crushed champagne grapes, finished with 24-karat gold oil massage.'
      },
      {
        id: 'srv-oxygen-facial',
        name: 'Elite Hyperbaric Oxygen Facial & Diamond Dust Infusion',
        category: 'Skin Radiance',
        originalPrice: 14000,
        durationMinutes: 75,
        description: 'Hyperbaric pure oxygen serum delivery with mineral-rich thermal quartz crystals massage.'
      }
    ]
  },
  {
    id: 'bnd-red-carpet',
    slug: 'red-carpet-radiance',
    name: 'Couture Red Carpet Radiance',
    subtitle: 'Flawless flash-photography skin alignment and sculptural blowout',
    badge: 'GALA READY',
    category: 'gala',
    durationHours: 3.5,
    originalPrice: 32500,
    bundlePrice: 24375,
    discountPercentage: 25,
    savingsAmount: 8125,
    depositPercent: 25,
    depositAmount: 6094,
    remainderAmount: 18281,
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Award Ceremonies, Film Premieres, Luxury Gala Openings',
    features: [
      'High-definition camera ready finish with 16-hour locked radiance',
      'Aromatherapy scalp pressure-point tension dissipation',
      'Complimentary champagne flute and artisanal espresso bar'
    ],
    services: [
      {
        id: 'srv-keratin-glaze',
        name: 'Parisian Keratin Glaze & Velvet Infusion',
        category: 'Hair Artistry',
        originalPrice: 12000,
        durationMinutes: 90,
        description: 'Instant frizz elimination and mirror-like glossy coat sealed with infrared irons.'
      },
      {
        id: 'srv-oxygen-facial-gala',
        name: 'Elite Hyperbaric Oxygen Facial',
        category: 'Skin Radiance',
        originalPrice: 14000,
        durationMinutes: 75,
        description: 'Instant skin plumping and pore shrinkage with botanical bio-actives.'
      },
      {
        id: 'srv-couture-cut',
        name: 'Couture Precision Cut & Signature Blowout',
        category: 'Sculpt & Style',
        originalPrice: 6500,
        durationMinutes: 60,
        description: 'Facial architecture alignment with volume retention styling.'
      }
    ]
  },
  {
    id: 'bnd-obsidian-gold',
    slug: 'obsidian-gold-wellness',
    name: 'Total Obsidian Stillness & 24K Gold Ritual',
    subtitle: 'Profound thermal relaxation and full cellular regeneration',
    badge: 'ULTIMATE DETOX',
    category: 'wellness',
    durationHours: 4.5,
    originalPrice: 38500,
    bundlePrice: 28875,
    discountPercentage: 25,
    savingsAmount: 9625,
    depositPercent: 25,
    depositAmount: 7219,
    remainderAmount: 21656,
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Deep stress relief, jetlag reset, restorative sanctuary weekends',
    features: [
      'Heated basalt obsidian stones sourced from volcanic archipelagos',
      'Private aromatherapy rain shower suite with sandalwood vapors',
      'Complimentary cold-pressed organic herbal elixir flight'
    ],
    services: [
      {
        id: 'srv-champagne-body',
        name: 'Champagne & 24K Gold Body Healing Polish',
        category: 'Body Rituals',
        originalPrice: 22000,
        durationMinutes: 120,
        description: 'Crushed champagne grape exfoliation followed by 24K gold oil hydration wrap.'
      },
      {
        id: 'srv-obsidian-stone',
        name: 'Heated Volcanic Obsidian Stone Tissue Release',
        category: 'Mind Stillness',
        originalPrice: 11000,
        durationMinutes: 90,
        description: 'Targeted myofascial release with warm polished obsidian stones.'
      },
      {
        id: 'srv-thermal-scalp',
        name: 'Scalp Detox & Thermal Mist Acupressure',
        category: 'Scalp Wellness',
        originalPrice: 5500,
        durationMinutes: 60,
        description: 'Meridian scalp acupressure stimulation with heated botanical mist.'
      }
    ]
  },
  {
    id: 'bnd-executive-men',
    slug: 'gentleman-executive-suite',
    name: 'The Sovereign Gentleman Executive Suite',
    subtitle: 'Precision grooming, artisanal straight-razor detailing, and scalp rejuvenation',
    badge: 'MEN\'S RESERVE',
    category: 'executive',
    durationHours: 2.75,
    originalPrice: 18100,
    bundlePrice: 13575,
    discountPercentage: 25,
    savingsAmount: 4525,
    depositPercent: 25,
    depositAmount: 3394,
    remainderAmount: 10181,
    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Grooms, high-level corporate executives, black-tie gala attendees',
    features: [
      'Artisanal hand-honed Japanese straight razor hot lather finish',
      'Single-malt whiskey or bespoke roasted espresso served in crystal',
      'Private masculine grooming salon bay with leather barber throne'
    ],
    services: [
      {
        id: 'srv-diamond-shave',
        name: 'Executive Diamond Grooming & Hot-Towel Shave',
        category: 'Men\'s Grooming',
        originalPrice: 4800,
        durationMinutes: 45,
        description: 'Multi-layer pre-shave oil, hot steamed linen, and precision contour shaving.'
      },
      {
        id: 'srv-beard-shaping',
        name: 'Royal Bespoke Beard Shaping & Botanical Oil',
        category: 'Men\'s Grooming',
        originalPrice: 3600,
        durationMinutes: 45,
        description: 'Anatomical facial balancing, scissor-over-comb tapering, and argan oil lock.'
      },
      {
        id: 'srv-scalp-massage-men',
        name: 'Scalp Detox & Thermal Massage',
        category: 'Scalp Wellness',
        originalPrice: 5500,
        durationMinutes: 45,
        description: 'Purifying scalp exfoliation with peppermint cool-down therapy.'
      },
      {
        id: 'srv-hand-buffing',
        name: 'Japanese Silk Hand Architecture & Buffing',
        category: 'Hand Care',
        originalPrice: 4200,
        durationMinutes: 30,
        description: 'Cuticle tidying, diamond buffer satin polish, and citrus paraffin wrap.'
      }
    ]
  },
  {
    id: 'bnd-couples-penthouse',
    slug: 'lamour-duo-retreat',
    name: 'L\'Amour Duo Champagne Retreat (Couples Suite)',
    subtitle: 'Synchronized luxury spa journey in our private imperial penthouse suite',
    badge: 'COUPLES PRIVILEGE',
    category: 'couples',
    durationHours: 5.0,
    originalPrice: 84000,
    bundlePrice: 54600,
    discountPercentage: 35,
    savingsAmount: 29400,
    depositPercent: 25,
    depositAmount: 13650,
    remainderAmount: 40950,
    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    idealFor: 'Anniversaries, Pre-Wedding Bonding, Luxury Honeymoon Celebration',
    features: [
      'Dual synchronized side-by-side heated marble treatment tables',
      'Private jacuzzi with Bulgarian rose petals and aromatic oils',
      'Full bottle of Dom Pérignon or Laurent-Perrier Champagne with caviar canapés'
    ],
    services: [
      {
        id: 'srv-dual-gold-body',
        name: 'Dual 24K Gold Body Healing & Warm Polish (2 Guests)',
        category: 'Body Rituals',
        originalPrice: 44000,
        durationMinutes: 120,
        description: 'Parallel full-body exfoliation and warm golden emulsion massage.'
      },
      {
        id: 'srv-dual-oxygen',
        name: 'Dual Elite Hyperbaric Oxygen Facials (2 Guests)',
        category: 'Skin Radiance',
        originalPrice: 28000,
        durationMinutes: 75,
        description: 'Synchronized pure oxygen hydration and crystal quartz smoothing.'
      },
      {
        id: 'srv-sound-bath',
        name: 'Private Tibetan Sound Bath & Crystal Meditation',
        category: 'Mind Stillness',
        originalPrice: 12000,
        durationMinutes: 60,
        description: 'Harmonic singing bowl resonance aligning neural calm and emotional stillness.'
      }
    ]
  }
];

// Catalogue of available services for the interactive "Custom Bundle Builder"
export const customCatalogueServices: BundledServiceItem[] = [
  {
    id: 'cat-1',
    name: 'Signature French Gold Balayage',
    category: 'Hair Artistry',
    originalPrice: 18500,
    durationMinutes: 180,
    description: 'Dimensional gold illumination paired with micro-keratin shield.'
  },
  {
    id: 'cat-2',
    name: 'Royal Caviar Crown Therapy',
    category: 'Scalp Wellness',
    originalPrice: 9500,
    durationMinutes: 90,
    description: 'French white caviar extract scalp detox with warm gold mist.'
  },
  {
    id: 'cat-3',
    name: 'Couture Precision Cut & Blowout',
    category: 'Sculpt & Style',
    originalPrice: 6500,
    durationMinutes: 60,
    description: 'Architectural precision cutting tailored to facial symmetry.'
  },
  {
    id: 'cat-4',
    name: '24K Gold Body Healing & Wrap',
    category: 'Body Rituals',
    originalPrice: 22000,
    durationMinutes: 120,
    description: 'Champagne grape thermal polish with 24K pure gold oil massage.'
  },
  {
    id: 'cat-5',
    name: 'Elite Oxygen Facial Infusion',
    category: 'Skin Radiance',
    originalPrice: 14000,
    durationMinutes: 75,
    description: 'Hyperbaric oxygen hydration with thermal quartz crystal release.'
  },
  {
    id: 'cat-6',
    name: 'Sound Bath & Obsidian Stone Massage',
    category: 'Mind Stillness',
    originalPrice: 11000,
    durationMinutes: 90,
    description: 'Basalt volcanic obsidian tissue release with Tibetan harmonics.'
  },
  {
    id: 'cat-7',
    name: 'Executive Diamond Hot-Towel Shave',
    category: 'Men\'s Grooming',
    originalPrice: 4800,
    durationMinutes: 45,
    description: 'Single-razor hot lather contouring with cold linen tone.'
  },
  {
    id: 'cat-8',
    name: 'Parisian Keratin Glaze Infusion',
    category: 'Hair Artistry',
    originalPrice: 12000,
    durationMinutes: 90,
    description: 'Instant frizz elimination and mirror-like glossy coat.'
  },
  {
    id: 'cat-9',
    name: 'Bespoke Fine-Line Skin Illustration',
    category: 'Luxury Ink',
    originalPrice: 25000,
    durationMinutes: 180,
    description: 'Fine single-needle precision line art with hypoallergenic gold pigments.'
  },
  {
    id: 'cat-10',
    name: 'Japanese Silk Hand & Foot Radiance',
    category: 'Nail Architecture',
    originalPrice: 5800,
    durationMinutes: 60,
    description: 'Silk cuticle smoothing, diamond buffer polish, and citrus wrap.'
  }
];
