import React, { useState, useEffect } from 'react';
import {
  Bell,
  ChevronRight,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  ClientAppointment,
  initialScheduledAppointments,
  checkAndTrigger24hAppointmentAlerts,
  calculateHoursUntilAppointment
} from './appointmentNotificationService';

interface ProactiveReminderBannerProps {
  onOpenCommandDesk: () => void;
}

export const ProactiveReminderBanner: React.FC<ProactiveReminderBannerProps> = ({
  onOpenCommandDesk
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [urgentAppointments, setUrgentAppointments] = useState<ClientAppointment[]>([]);

  useEffect(() => {
    // Run the helper function to detect appointments within the next 24 hours
    const result = checkAndTrigger24hAppointmentAlerts(initialScheduledAppointments, {
      sendBrowserNotification: false,
      playAudioChime: false
    });

    setUrgentAppointments(result.upcomingAppointments);
  }, []);

  if (!isVisible || urgentAppointments.length === 0) return null;

  const firstAppt = urgentAppointments[0];
  const hoursRemaining = calculateHoursUntilAppointment(firstAppt.scheduledDate, firstAppt.scheduledTime);

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-md w-full">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="glass-slate-card bg-[#0D0B06]/95 border-2 border-[#D4AF37]/60 rounded-xl p-4 shadow-[0_0_35px_rgba(212,175,55,0.25)] text-white space-y-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Bell className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                  24H CLIENT CARE ALERT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h4 className="text-xs font-serif font-medium text-white tracking-wide mt-0.5">
                {firstAppt.clientName} ({firstAppt.vipTier})
              </h4>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white p-1 transition-colors"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] font-light text-gray-300 leading-normal">
          Scheduled for <span className="text-white font-medium">{firstAppt.serviceName}</span> at{' '}
          <span className="text-[#D4AF37]">{firstAppt.scheduledTime}</span> with {firstAppt.stylistName}.{' '}
          <span className="text-emerald-400 font-mono">({Math.floor(hoursRemaining)}h remaining)</span>
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs font-mono">
          <span className="text-[10px] text-gray-400">
            {urgentAppointments.length} clients in 24h window
          </span>

          <button
            onClick={onOpenCommandDesk}
            className="text-[#D4AF37] hover:underline flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
          >
            <span>Open Command Desk</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
