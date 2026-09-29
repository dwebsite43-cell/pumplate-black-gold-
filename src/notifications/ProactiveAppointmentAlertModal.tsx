import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  Phone,
  MessageSquare,
  Volume2,
  X,
  AlertTriangle,
  ChevronRight,
  Send,
  Check,
  Copy,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClientAppointment,
  AppointmentAlert,
  initialScheduledAppointments,
  checkAndTrigger24hAppointmentAlerts,
  calculateHoursUntilAppointment,
  requestBrowserNotificationPermission,
  triggerBrowserNotification,
  generate24hProactiveClientMessage,
  playLuxuryReminderChime
} from './appointmentNotificationService';

interface ProactiveAppointmentAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSalon?: (salonId: string) => void;
}

export const ProactiveAppointmentAlertModal: React.FC<ProactiveAppointmentAlertModalProps> = ({
  isOpen,
  onClose,
  onSelectSalon
}) => {
  const [appointments, setAppointments] = useState<ClientAppointment[]>(initialScheduledAppointments);
  const [activeFilter, setActiveFilter] = useState<'24h' | 'all' | 'letoile' | 'aura' | 'obsidian'>('24h');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [copiedClientId, setCopiedClientId] = useState<string | null>(null);
  const [previewMessageAppt, setPreviewMessageAppt] = useState<ClientAppointment | null>(null);
  const [lastCheckTime, setLastCheckTime] = useState<string>('Just now');
  const [latestAlertToast, setLatestAlertToast] = useState<string>('');

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [isOpen]);

  // Request browser notification permission
  const handleRequestPermission = async () => {
    const perm = await requestBrowserNotificationPermission();
    setNotificationPermission(perm);
    if (perm === 'granted') {
      setLatestAlertToast('Browser notifications enabled for 24h client appointment alerts.');
      setTimeout(() => setLatestAlertToast(''), 4000);
    }
  };

  // Run the 24-hour proactive check manually
  const handleTriggerManualCheck = () => {
    const result = checkAndTrigger24hAppointmentAlerts(appointments, {
      sendBrowserNotification: notificationPermission === 'granted',
      playAudioChime: true
    });

    setLastCheckTime(new Date().toLocaleTimeString());
    setLatestAlertToast(
      `24h Engine Triggered: ${result.triggeredAlerts.length} client appointments require proactive preparation.`
    );
    setTimeout(() => setLatestAlertToast(''), 5000);
  };

  // Toggle checklist item
  const handleToggleChecklist = (appointmentId: string, itemIdx: number) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          const updated = [...apt.prepChecklist];
          if (updated[itemIdx].startsWith('✓ ')) {
            updated[itemIdx] = updated[itemIdx].replace('✓ ', '');
          } else {
            updated[itemIdx] = `✓ ${updated[itemIdx]}`;
          }
          return { ...apt, prepChecklist: updated };
        }
        return apt;
      })
    );
  };

  // Mark client appointment reminder acknowledged
  const handleAcknowledgeReminder = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, reminderAcknowledged: true, reminderSentAt: new Date().toLocaleTimeString() }
          : apt
      )
    );
  };

  // Copy WhatsApp proactive message
  const handleCopyMessage = (apt: ClientAppointment) => {
    const msg = generate24hProactiveClientMessage(apt);
    navigator.clipboard.writeText(msg);
    setCopiedClientId(apt.id);
    setTimeout(() => setCopiedClientId(null), 3000);
  };

  // Trigger test browser notification for specific appointment
  const handleTestBrowserAlert = (apt: ClientAppointment) => {
    playLuxuryReminderChime();
    const sent = triggerBrowserNotification(apt);
    if (sent) {
      setLatestAlertToast(`Browser Notification dispatched for ${apt.clientName}`);
    } else {
      setLatestAlertToast(
        `UI Alert: ${apt.clientName} has an appointment in ${calculateHoursUntilAppointment(apt.scheduledDate, apt.scheduledTime)} hours.`
      );
    }
    setTimeout(() => setLatestAlertToast(''), 4000);
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((apt) => {
    const hours = calculateHoursUntilAppointment(apt.scheduledDate, apt.scheduledTime);
    if (activeFilter === '24h') {
      return hours > 0 && hours <= 24;
    }
    if (activeFilter === 'letoile') {
      return apt.salonId === 'letoile';
    }
    if (activeFilter === 'aura') {
      return apt.salonId === 'aura';
    }
    if (activeFilter === 'obsidian') {
      return apt.salonId === 'obsidian';
    }
    return true;
  });

  const countWithin24h = appointments.filter((apt) => {
    const hours = calculateHoursUntilAppointment(apt.scheduledDate, apt.scheduledTime);
    return hours > 0 && hours <= 24;
  }).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="glass-slate-card bg-[#0A0A0A] border border-[#D4AF37]/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-[0_0_60px_rgba(212,175,55,0.25)] my-6 relative text-white"
        id="proactive-alerts-modal"
      >
        {/* Modal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>NEXORA SALONOS • PROACTIVE CLIENT CARE ENGINE</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide flex items-center gap-3">
              <span>24-Hour Appointment Alert Command</span>
              <span className="text-xs font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                {countWithin24h} Active (Next 24h)
              </span>
            </h3>
            <p className="text-xs font-light text-gray-400">
              Automated trigger function evaluating upcoming reservations. Generates browser web notifications and high-prestige UI alerts 24 hours prior to appointment time.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleTriggerManualCheck}
              className="metallic-button-strong py-2.5 px-4 text-xs font-mono uppercase tracking-wider rounded-lg flex items-center space-x-2 font-bold cursor-pointer"
              id="trigger-24h-check-btn"
              title="Run 24-hour proactive evaluation now"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Run 24h Check Now</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOAST / STATUS NOTICE */}
        {latestAlertToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-[#121008] border border-[#D4AF37] text-white rounded-lg flex items-center justify-between text-xs font-mono shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{latestAlertToast}</span>
            </div>
            <button
              onClick={() => setLatestAlertToast('')}
              className="text-gray-400 hover:text-white ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* BROWSER NOTIFICATION PERMISSION CONTROLLER STRIP */}
        <div className="bg-black/60 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notificationPermission === 'granted'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-medium flex items-center gap-2">
                <span>Browser Push Notifications:</span>
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold ${
                    notificationPermission === 'granted'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {notificationPermission}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {notificationPermission === 'granted'
                  ? 'Active: Desktop alerts will fire 24 hours prior to client bookings.'
                  : 'Enable browser permission so alerts trigger even when looking at other tabs.'}
              </p>
            </div>
          </div>

          {notificationPermission !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="metallic-button text-[11px] uppercase tracking-wider py-2 px-4 rounded font-bold shrink-0 text-[#D4AF37] hover:text-white"
            >
              Enable Browser Alerts
            </button>
          )}
        </div>

        {/* FILTER CHIPS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('24h')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === '24h'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Next 24h Window ({countWithin24h})
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              All Scheduled ({appointments.length})
            </button>
            <button
              onClick={() => setActiveFilter('letoile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'letoile'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              L'Étoile Lounge
            </button>
            <button
              onClick={() => setActiveFilter('aura')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'aura'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              AURA Spa
            </button>
            <button
              onClick={() => setActiveFilter('obsidian')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'obsidian'
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              The Obsidian Atelier
            </button>
          </div>

          <span className="text-[10px] font-mono text-gray-500">
            Last evaluated: {lastCheckTime}
          </span>
        </div>

        {/* APPOINTMENT ALERTS LIST */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center bg-black/40 border border-white/10 rounded-xl space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-serif text-white">All Clear in this Window</p>
              <p className="text-xs font-mono text-gray-400">
                No client appointments currently meet this filter criteria.
              </p>
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              const hoursRemaining = calculateHoursUntilAppointment(apt.scheduledDate, apt.scheduledTime);
              const isUrgent24h = hoursRemaining > 0 && hoursRemaining <= 24;

              return (
                <div
                  key={apt.id}
                  className={`p-5 rounded-xl border transition-all duration-300 relative space-y-4 ${
                    isUrgent24h
                      ? 'bg-[#110e08]/90 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                      : 'bg-[#0d0d0d] border-white/10'
                  }`}
                  id={`alert-card-${apt.id}`}
                >
                  {/* Header Row: Client, VIP Tier, Relative Time Countdown */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AA820A] to-[#D4AF37] text-black font-serif font-bold text-sm flex items-center justify-center shrink-0">
                        {apt.clientName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white tracking-wide">
                            {apt.clientName}
                          </h4>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/25">
                            {apt.vipTier}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2 mt-0.5">
                          <span>{apt.salonName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-gray-300">{apt.clientPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Time Countdown Badge */}
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      {isUrgent24h ? (
                        <div className="flex items-center space-x-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-3 py-1.5 rounded-lg text-[#D4AF37] font-semibold">
                          <Clock className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
                          <span>
                            In {Math.floor(hoursRemaining)}h {Math.round((hoursRemaining % 1) * 60)}m ({apt.scheduledDate} {apt.scheduledTime})
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg">
                          <span>{apt.scheduledDate} at {apt.scheduledTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Treatment & Specialist Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block">Treatment</span>
                      <span className="text-white font-medium truncate block">{apt.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block">Assigned Specialist</span>
                      <span className="text-[#D4AF37] font-medium">{apt.stylistName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block">Escrow Status</span>
                      <span className="text-emerald-400 font-medium">
                        ₹{apt.escrowDepositPaid.toLocaleString()} Deposit Held (25%)
                      </span>
                    </div>
                  </div>

                  {/* Preparation Checklist */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                      Salon Proactive Preparation Checklist:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {apt.prepChecklist.map((item, idx) => {
                        const isChecked = item.startsWith('✓ ');
                        return (
                          <button
                            key={idx}
                            onClick={() => handleToggleChecklist(apt.id, idx)}
                            className={`p-2 rounded text-left transition-colors flex items-start space-x-2 border cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-black/30 border-white/5 text-gray-300 hover:border-white/20'
                            }`}
                          >
                            <span className="text-[#D4AF37]">{isChecked ? '☑' : '☐'}</span>
                            <span className={isChecked ? 'line-through text-gray-400' : ''}>
                              {item.replace('✓ ', '')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {apt.specialNotes && (
                    <div className="text-[11px] font-mono text-gray-400 italic bg-[#14120B] p-2.5 rounded border border-[#D4AF37]/20">
                      <span className="text-[#D4AF37] font-semibold not-italic mr-1">VIP Notes:</span>
                      {apt.specialNotes}
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs font-mono">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleCopyMessage(apt)}
                        className="py-1.5 px-3 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 flex items-center space-x-1.5 cursor-pointer"
                        title="Copy Proactive WhatsApp Message"
                      >
                        {copiedClientId === apt.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">WhatsApp Copy Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy 24h WhatsApp Notice</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setPreviewMessageAppt(apt)}
                        className="py-1.5 px-3 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Preview Concierge Text</span>
                      </button>

                      <button
                        onClick={() => handleTestBrowserAlert(apt)}
                        className="py-1.5 px-3 rounded bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/35 flex items-center space-x-1.5 cursor-pointer"
                        title="Fire Browser Notification / Chime for this client"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Test Alert Ping</span>
                      </button>
                    </div>

                    <div>
                      {apt.reminderAcknowledged ? (
                        <span className="text-emerald-400 flex items-center space-x-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Acknowledged at {apt.reminderSentAt}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAcknowledgeReminder(apt.id)}
                          className="py-1.5 px-3 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Contacted &amp; Ready</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PREVIEW CONCIERGE MESSAGE MODAL */}
        <AnimatePresence>
          {previewMessageAppt && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0e0e0e] border border-[#D4AF37] rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-white font-mono text-xs"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2 text-[#D4AF37]">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold uppercase">24-Hour Proactive Client Copy</span>
                  </div>
                  <button
                    onClick={() => setPreviewMessageAppt(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-black p-4 rounded-lg border border-white/10 text-gray-300 whitespace-pre-wrap leading-relaxed font-mono text-xs">
                  {generate24hProactiveClientMessage(previewMessageAppt)}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-gray-500">
                    Recipient: {previewMessageAppt.clientPhone}
                  </span>
                  <button
                    onClick={() => {
                      handleCopyMessage(previewMessageAppt);
                      setPreviewMessageAppt(null);
                    }}
                    className="metallic-button-strong py-2 px-4 rounded text-xs uppercase tracking-wider font-bold"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
