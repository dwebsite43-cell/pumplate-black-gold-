/**
 * Proactive Client Appointment Reminder & Notification Engine
 * Nexora SalonOS • Automated 24-Hour Client Care & Proactive Salon Operations
 */

export interface ClientAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  vipTier: 'Couture Sovereign' | 'Obsidian Black' | 'Diamond Elite' | 'VIP Velvet' | 'Atelier Member';
  salonId: string;
  salonName: string;
  serviceName: string;
  stylistName: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // e.g. "11:00 AM" or "02:30 PM"
  durationMinutes: number;
  appointmentType: 'In-Salon Atelier' | 'Private Suite Concierge' | 'Home Villa Concierge';
  status: 'confirmed' | 'escrow_secured' | 'reminded_24h' | 'in_progress' | 'completed';
  location: string;
  escrowDepositPaid: number;
  totalAmount: number;
  prepChecklist: string[];
  specialNotes?: string;
  reminderSentAt?: string;
  reminderAcknowledged?: boolean;
}

export interface AppointmentAlert {
  id: string;
  appointmentId: string;
  appointment: ClientAppointment;
  triggeredAt: string;
  hoursRemaining: number;
  notificationType: 'browser_notification' | 'ui_alert' | 'both';
  browserNotificationSent: boolean;
  message: string;
  urgency: 'high_24h' | 'critical_12h' | 'imminent_4h';
  acknowledged: boolean;
}

// Initial scheduled appointments around current date (2026-09-29 / 2026-09-30)
export const initialScheduledAppointments: ClientAppointment[] = [
  {
    id: 'APT-2026-901',
    clientName: 'Alia Bhatt',
    clientPhone: '+91 98201 88390',
    clientEmail: 'alia.b@concierge-private.com',
    vipTier: 'Couture Sovereign',
    salonId: 'letoile',
    salonName: "L'Étoile Hair Lounge",
    serviceName: 'Signature French Gold Balayage & Crown Therapy',
    stylistName: 'Master Jean-Jacques',
    scheduledDate: '2026-09-30',
    scheduledTime: '09:30 AM',
    durationMinutes: 180,
    appointmentType: 'Private Suite Concierge',
    status: 'escrow_secured',
    location: "L'Étoile Velvet VIP Suite #1, Bandra West, Mumbai",
    escrowDepositPaid: 7000,
    totalAmount: 28000,
    prepChecklist: [
      'Pre-warm 24K gold foil infusion pots to 38°C',
      'Stock private bar with organic French white caviar tea',
      'Sanitize Japanese diamond shears (0.15mm edge check)',
      'Assign private valet parking pass #VVIP-08'
    ],
    specialNotes: 'Prefers quiet consultation with classical harp acoustics. Zero flash photography on premises.',
    reminderAcknowledged: false
  },
  {
    id: 'APT-2026-902',
    clientName: 'Rohan Talwar',
    clientPhone: '+91 98110 33910',
    clientEmail: 'rohan.talwar@apexholdings.in',
    vipTier: 'Obsidian Black',
    salonId: 'aura',
    salonName: 'AURA Luxury Spa',
    serviceName: 'Champagne & 24K Gold Body Healing Ritual',
    stylistName: 'Aditya Vardhan',
    scheduledDate: '2026-09-29',
    scheduledTime: '03:30 PM',
    durationMinutes: 120,
    appointmentType: 'In-Salon Atelier',
    status: 'escrow_secured',
    location: 'AURA Thermal Pavilion #3, Nariman Point, Mumbai',
    escrowDepositPaid: 5500,
    totalAmount: 22000,
    prepChecklist: [
      'Thermal basalt obsidian stones heated to 54°C',
      'Crushed champagne grape organic scrub blended fresh',
      'Delta brainwave singing bowls tuned to 432 Hz',
      'Aromatherapy: Sandalwood and Damascus Rose mist'
    ],
    specialNotes: 'Focus on lower lumbar myofascial release after international flight.',
    reminderAcknowledged: false
  },
  {
    id: 'APT-2026-903',
    clientName: 'Devika Singhania',
    clientPhone: '+91 98200 11928',
    clientEmail: 'devika.s@singhania.org',
    vipTier: 'Couture Sovereign',
    salonId: 'letoile',
    salonName: "L'Étoile Hair Lounge",
    serviceName: 'Royal Caviar Crown Therapy & Sculptural Blowout',
    stylistName: 'Elena Rostova',
    scheduledDate: '2026-09-30',
    scheduledTime: '02:00 PM',
    durationMinutes: 120,
    appointmentType: 'In-Salon Atelier',
    status: 'escrow_secured',
    location: "L'Étoile Studio Chair #1 (Elena), Bandra West, Mumbai",
    escrowDepositPaid: 4000,
    totalAmount: 16000,
    prepChecklist: [
      'Fresh French white caviar micro-capsules thawed',
      'Infrared scalp detoxification helmet sterilized',
      'Velvet drape and warm chamomile neck pillow staged'
    ],
    specialNotes: 'Attending gala event in evening; requires high mirror gloss finish.',
    reminderAcknowledged: false
  },
  {
    id: 'APT-2026-904',
    clientName: 'Aryaman Birla',
    clientPhone: '+91 94140 88219',
    vipTier: 'Diamond Elite',
    salonId: 'obsidian',
    salonName: 'The Obsidian Atelier',
    serviceName: 'Bespoke Fine-Line Illustration (Spine Mandala)',
    stylistName: 'Sven Lindqvist',
    scheduledDate: '2026-09-29',
    scheduledTime: '06:00 PM',
    durationMinutes: 180,
    appointmentType: 'In-Salon Atelier',
    status: 'escrow_secured',
    location: 'The Obsidian Atelier Gallery Suite A, Jaipur',
    escrowDepositPaid: 6250,
    totalAmount: 25000,
    prepChecklist: [
      'Single-needle 0.15mm aseptic cartridge batch unsealed',
      'Medical grade hypoallergenic charcoal pigment prepared',
      'Stencil transferred onto anatomical carbon paper'
    ],
    specialNotes: 'Strict aseptic requirements; room temperature maintained at 21°C.',
    reminderAcknowledged: false
  },
  {
    id: 'APT-2026-905',
    clientName: 'Devika Mallya',
    clientPhone: '+91 97400 99120',
    vipTier: 'Diamond Elite',
    salonId: 'aura',
    salonName: 'AURA Luxury Spa',
    serviceName: 'Sound Bath & Obsidian Heated Stone Therapy',
    stylistName: 'Anya Sen',
    scheduledDate: '2026-09-30',
    scheduledTime: '04:00 PM',
    durationMinutes: 90,
    appointmentType: 'Private Suite Concierge',
    status: 'escrow_secured',
    location: 'AURA Harmonic Sanctuary Suite #2, Nariman Point, Mumbai',
    escrowDepositPaid: 2750,
    totalAmount: 11000,
    prepChecklist: [
      'Tibetan 7-metal singing bowls aligned',
      'Volcanic basalt stones warmed in herbal oil bath',
      'Pure silk eye covering and lavender compress staged'
    ],
    specialNotes: 'Sensitive to citrus fragrances; use sandalwood exclusively.',
    reminderAcknowledged: false
  },
  {
    id: 'APT-2026-906',
    clientName: 'Kabir Oberoi',
    clientPhone: '+91 98221 55091',
    vipTier: 'VIP Velvet',
    salonId: 'obsidian',
    salonName: 'The Obsidian Atelier',
    serviceName: 'Luxury Jewelry Restructuring & Ear Constellation',
    stylistName: 'Zara Blackwood',
    scheduledDate: '2026-09-30',
    scheduledTime: '11:30 AM',
    durationMinutes: 60,
    appointmentType: 'In-Salon Atelier',
    status: 'escrow_secured',
    location: 'The Obsidian Atelier Gem Studio, Jaipur',
    escrowDepositPaid: 2125,
    totalAmount: 8500,
    prepChecklist: [
      '18K solid yellow gold marquise diamonds autoclave tested',
      'Implant-grade ASTM F-136 titanium posts verified',
      'Anatomical cartilage measurement calipers calibrated'
    ],
    specialNotes: 'First needle curation session; gentle anesthetic spray requested.',
    reminderAcknowledged: false
  }
];

/**
 * Parses time string (e.g., "09:30 AM", "03:30 PM") and date (YYYY-MM-DD) into Date object
 */
export function parseAppointmentDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Format: "09:30 AM" or "9:30 AM"
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return new Date(`${dateStr}T12:00:00`);
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours < 12) {
    hours += 12;
  } else if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

/**
 * Calculates hours remaining until an appointment relative to a given reference time.
 * If referenceTime is omitted, defaults to now.
 */
export function calculateHoursUntilAppointment(
  scheduledDate: string,
  scheduledTime: string,
  referenceTime?: Date
): number {
  const now = referenceTime || new Date();
  const appointmentDate = parseAppointmentDateTime(scheduledDate, scheduledTime);
  const diffMs = appointmentDate.getTime() - now.getTime();
  return Number((diffMs / (1000 * 60 * 60)).toFixed(2));
}

/**
 * Determines if an appointment is within the 24-hour proactive window.
 * An appointment is eligible if it is in the future and <= 24 hours away.
 */
export function isWithin24HourWindow(
  appointment: ClientAppointment,
  referenceTime?: Date,
  windowHours: number = 24
): boolean {
  const hoursRemaining = calculateHoursUntilAppointment(
    appointment.scheduledDate,
    appointment.scheduledTime,
    referenceTime
  );
  // Between 0 and windowHours (e.g. 24h)
  return hoursRemaining > 0 && hoursRemaining <= windowHours;
}

/**
 * Elegant soft audio chime using Web Audio API to alert the salon staff
 */
export function playLuxuryReminderChime(): void {
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic frequencies for luxury chime (E5, G#5, B5, E6 chord)
    const notes = [659.25, 830.61, 987.77, 1318.51];

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  } catch {
    // Non-blocking fallback if audio context is restricted
  }
}

/**
 * Requests permission for standard Web Browser Notifications.
 */
export async function requestBrowserNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

/**
 * Triggers a browser native notification if permitted
 */
export function triggerBrowserNotification(
  appointment: ClientAppointment,
  customTitle?: string
): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  try {
    const title = customTitle || `Nexora SalonOS: 24h Proactive Alert for ${appointment.clientName}`;
    const options: NotificationOptions = {
      body: `Upcoming ${appointment.serviceName} at ${appointment.salonName} tomorrow at ${appointment.scheduledTime}. Assigned to ${appointment.stylistName}.`,
      icon: '/favicon.ico',
      tag: `nexora-24h-${appointment.id}`,
      requireInteraction: false
    };

    const notif = new Notification(title, options);
    notif.onclick = () => {
      window.focus();
      notif.close();
    };
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates proactive WhatsApp or Concierge message copy for client care
 */
export function generate24hProactiveClientMessage(appointment: ClientAppointment): string {
  return `Greetings ${appointment.clientName},\n\nThis is the Concierge Desk at ${appointment.salonName}.\n\nYour upcoming appointment for "${appointment.serviceName}" with ${appointment.stylistName} is confirmed for ${appointment.scheduledDate} at ${appointment.scheduledTime}.\n\nYour private suite has been reserved, and all bespoke preparations are underway. Your 25% Advance Escrow (₹${appointment.escrowDepositPaid.toLocaleString()}) has been securely anchored.\n\nShould you have any dietary preferences, beverage requests, or schedule adjustments, simply reply directly to this private line.\n\nWarm regards,\nNexora Concierge & ${appointment.salonName}`;
}

/**
 * Core Helper Function:
 * Evaluates scheduled client appointments and triggers browser notifications
 * or UI alerts for those scheduled within the 24-hour window.
 */
export function checkAndTrigger24hAppointmentAlerts(
  appointments: ClientAppointment[],
  options?: {
    referenceTime?: Date;
    sendBrowserNotification?: boolean;
    playAudioChime?: boolean;
    onNewAlert?: (alert: AppointmentAlert) => void;
  }
): {
  triggeredAlerts: AppointmentAlert[];
  upcomingAppointments: ClientAppointment[];
  totalChecked: number;
} {
  const referenceTime = options?.referenceTime || new Date();
  const shouldSendBrowserNotif = options?.sendBrowserNotification ?? true;
  const shouldPlayChime = options?.playAudioChime ?? false;

  const triggeredAlerts: AppointmentAlert[] = [];
  const upcomingAppointments: ClientAppointment[] = [];

  appointments.forEach((apt) => {
    const hoursRemaining = calculateHoursUntilAppointment(
      apt.scheduledDate,
      apt.scheduledTime,
      referenceTime
    );

    // If appointment is within the next 24 hours (0 to 24h)
    if (hoursRemaining > 0 && hoursRemaining <= 24) {
      upcomingAppointments.push(apt);

      // Determine urgency
      let urgency: AppointmentAlert['urgency'] = 'high_24h';
      if (hoursRemaining <= 4) {
        urgency = 'imminent_4h';
      } else if (hoursRemaining <= 12) {
        urgency = 'critical_12h';
      }

      // Check if browser notification can be fired
      let browserSent = false;
      if (shouldSendBrowserNotif) {
        browserSent = triggerBrowserNotification(apt);
      }

      const alert: AppointmentAlert = {
        id: `ALT-${apt.id}-${Date.now()}`,
        appointmentId: apt.id,
        appointment: apt,
        triggeredAt: new Date().toISOString(),
        hoursRemaining,
        notificationType: browserSent ? 'both' : 'ui_alert',
        browserNotificationSent: browserSent,
        message: `24-Hour Client Care Alert: ${apt.clientName} (${apt.vipTier}) is scheduled for ${apt.serviceName} at ${apt.scheduledTime} with ${apt.stylistName}.`,
        urgency,
        acknowledged: apt.reminderAcknowledged || false
      };

      triggeredAlerts.push(alert);

      if (options?.onNewAlert) {
        options.onNewAlert(alert);
      }
    }
  });

  if (triggeredAlerts.length > 0 && shouldPlayChime) {
    playLuxuryReminderChime();
  }

  return {
    triggeredAlerts,
    upcomingAppointments,
    totalChecked: appointments.length
  };
}
