import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  X,
  Eye,
  Camera,
  Layers,
  GraduationCap,
  MessageSquare,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Stylist, StylistPortfolioItem, SalonTemplate } from '../types';

interface MeetYourStylistSectionProps {
  selectedTemplate: SalonTemplate;
  onSelectStylist: (stylist: Stylist) => void;
  onNavigateToEscrow: () => void;
  allTemplates: SalonTemplate[];
  onSwitchSalonTemplate?: (template: SalonTemplate) => void;
}

export const MeetYourStylistSection: React.FC<MeetYourStylistSectionProps> = ({
  selectedTemplate,
  onSelectStylist,
  onNavigateToEscrow,
  allTemplates,
  onSwitchSalonTemplate,
}) => {
  const [activeSalonId, setActiveSalonId] = useState<string>(selectedTemplate.id);
  const [selectedPortfolioWork, setSelectedPortfolioWork] = useState<{
    work: StylistPortfolioItem;
    stylist: Stylist;
  } | null>(null);

  // Synchronize with external template when changed
  const currentSalon = allTemplates.find((t) => t.id === activeSalonId) || selectedTemplate;

  const handleBookWithStylist = (stylist: Stylist) => {
    onSelectStylist(stylist);
    onNavigateToEscrow();
    const escrowEl = document.getElementById('escrow-section');
    if (escrowEl) {
      escrowEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="meet-stylists" className="py-24 px-6 bg-[#080808] border-b border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] gold-glow-radial opacity-35 pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] gold-glow-radial opacity-25 pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ATELIER MASTERS &amp; CREATIVE DIRECTORS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide">
              Meet Your <span className="italic text-[#D4AF37]">Master Stylists</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
              Every Nexora salon operates under elite credentialed artisans trained across Paris, London, Milan, and Stockholm. Review verified credentials, professional bios, and signature portfolios before reserving with 25% Advance Escrow.
            </p>
          </div>

          {/* Salon Switcher Tabs */}
          <div className="flex items-center space-x-2 bg-black/60 p-1.5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar shrink-0">
            {allTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setActiveSalonId(template.id);
                  if (onSwitchSalonTemplate) onSwitchSalonTemplate(template);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSalonId === template.id
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {template.name.split(' ')[0]} Lounge
              </button>
            ))}
          </div>
        </div>

        {/* Master Stylists Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {currentSalon.stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="rounded-2xl bg-gradient-to-br from-[#0F0E0C] via-[#0C0B0A] to-[#070707] border-2 border-[#D4AF37]/35 hover:border-[#D4AF37]/70 shadow-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 relative group"
              id={`stylist-card-${stylist.id}`}
            >
              {/* Top Accent Ribbon */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

              <div className="space-y-6">
                {/* Master Header: Portrait, Core Credentials & Verified Rating */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-white/5 pb-5">
                  <div className="relative shrink-0">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-2 -right-1 bg-[#D4AF37] text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow uppercase">
                      {stylist.experienceYears || 12}+ Yrs
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 font-bold">
                        {currentSalon.name}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-mono text-[#D4AF37]">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="font-bold">{stylist.rating}</span>
                        <span className="text-gray-500 text-[10px]">
                          ({stylist.reviewsCount || 480} VIP Reviews)
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-medium text-white tracking-wide truncate">
                      {stylist.name}
                    </h3>
                    <p className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase">
                      {stylist.role}
                    </p>

                    {stylist.education && (
                      <p className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5 pt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{stylist.education}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Short Professional Bio */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Professional Pedigree &amp; Philosophy
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    {stylist.bio || 'Renowned master artisan dedicated to couture personalized aesthetics, architectural precision cutting, and dimensional hair illumination.'}
                  </p>
                </div>

                {/* Master Quote */}
                {stylist.quote && (
                  <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-start space-x-2.5">
                    <Quote className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 rotate-180" />
                    <p className="text-xs font-serif italic text-gray-400 leading-snug">
                      &quot;{stylist.quote}&quot;
                    </p>
                  </div>
                )}

                {/* Signature Work Highlight */}
                {stylist.signatureWork && (
                  <div className="flex items-start space-x-2 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-gray-400">
                      Signature Masterwork: <strong className="text-white font-medium">{stylist.signatureWork}</strong>
                    </span>
                  </div>
                )}

                {/* Specialties Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">
                    Core Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-gray-300 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature Portfolio Gallery */}
                {stylist.portfolio && stylist.portfolio.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] uppercase text-[#D4AF37] tracking-wider flex items-center gap-1 font-semibold">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Signature Portfolio Works ({stylist.portfolio.length})</span>
                      </span>
                      <span className="text-[10px] text-gray-500">Click image to inspect</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {stylist.portfolio.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedPortfolioWork({ work: item, stylist })}
                          className="group/thumb relative rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37] cursor-pointer aspect-square transition-all bg-black/60 shadow-md"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover/thumb:opacity-95 transition-opacity p-2 flex flex-col justify-end">
                            <span className="text-[10px] font-serif font-medium text-white line-clamp-1 leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[8px] font-mono text-[#D4AF37] line-clamp-1">
                              {item.technique}
                            </span>
                          </div>
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                            <Eye className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between gap-4">
                <div className="text-[10px] font-mono text-gray-400">
                  <span className="block text-emerald-400 font-semibold">✓ Verified Resident Master</span>
                  <span>Direct Escrow Protected</span>
                </div>

                <button
                  onClick={() => handleBookWithStylist(stylist)}
                  className="metallic-button text-xs font-mono uppercase tracking-wider py-2.5 px-5 rounded font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
                  id={`book-with-stylist-${stylist.id}-btn`}
                >
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Work Inspection Lightbox Modal */}
      <AnimatePresence>
        {selectedPortfolioWork && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPortfolioWork(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#0D0D0D] border-2 border-[#D4AF37]/50 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.3)] text-white overflow-hidden z-10"
              id="portfolio-lightbox-modal"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37]"></div>

              <div className="p-6 space-y-5">
                {/* Header with Close */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/35 font-semibold">
                      Signature Masterwork • {selectedPortfolioWork.stylist.name}
                    </span>
                    <h3 className="text-xl font-serif font-medium text-white mt-1">
                      {selectedPortfolioWork.work.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedPortfolioWork(null)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* High-Resolution Portfolio Photo */}
                <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/30 max-h-[380px] bg-black">
                  <img
                    src={selectedPortfolioWork.work.image}
                    alt={selectedPortfolioWork.work.title}
                    className="w-full h-full object-cover max-h-[380px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                    Technique: {selectedPortfolioWork.work.technique}
                  </div>
                </div>

                {/* Description & Master notes */}
                {selectedPortfolioWork.work.description && (
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {selectedPortfolioWork.work.description}
                  </p>
                )}

                {/* Footer with Book Action */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-gray-400">
                    Lead Artist: <strong className="text-white">{selectedPortfolioWork.stylist.name}</strong> ({selectedPortfolioWork.stylist.role})
                  </div>

                  <button
                    onClick={() => {
                      const st = selectedPortfolioWork.stylist;
                      setSelectedPortfolioWork(null);
                      handleBookWithStylist(st);
                    }}
                    className="w-full sm:w-auto metallic-button py-2.5 px-6 rounded text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Reserve this Style with {selectedPortfolioWork.stylist.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
