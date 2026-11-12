import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Generate a WhatsApp chat URL with pre-filled message
 */
export function buildWhatsAppLink(phoneRaw: string, message: string): string {
  const cleanPhone = phoneRaw.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

/**
 * Standard EMI Calculator formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateMonthlyEMI(
  principal: number,
  annualInterestRatePercent: number,
  tenureMonths: number
): {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
} {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
  }

  if (annualInterestRatePercent === 0) {
    const monthlyEmi = Math.round(principal / tenureMonths);
    return {
      monthlyEmi,
      totalInterest: 0,
      totalPayable: principal,
    };
  }

  const monthlyRate = annualInterestRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
  const totalPayable = monthlyEmi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    monthlyEmi,
    totalInterest,
    totalPayable,
  };
}

/**
 * Opening hours in Amritsar time (IST), independent of the visitor's clock.
 * Mon–Sat 10:30–21:00, Sun 11:30–20:00.
 */
export const STORE_HOURS: Record<number, [number, number]> = {
  0: [11.5, 20],
  1: [10.5, 21],
  2: [10.5, 21],
  3: [10.5, 21],
  4: [10.5, 21],
  5: [10.5, 21],
  6: [10.5, 21],
};

function fmtHour(h: number): string {
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  const suffix = hr >= 12 ? 'pm' : 'am';
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return min ? `${h12}:${String(min).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
}

export function getStoreStatus(now: Date = new Date()): { open: boolean; label: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const time = Number(get('hour')) + Number(get('minute')) / 60;
  const [openAt, closeAt] = STORE_HOURS[dayIdx] ?? STORE_HOURS[1];

  if (time >= openAt && time < closeAt) {
    return { open: true, label: `Open now · closes ${fmtHour(closeAt)}` };
  }
  if (time < openAt) {
    return { open: false, label: `Closed · opens ${fmtHour(openAt)} today` };
  }
  const tomorrow = STORE_HOURS[(dayIdx + 1) % 7];
  return { open: false, label: `Closed · opens ${fmtHour(tomorrow[0])} tomorrow` };
}

/** Indian mobile number: optional +91/0 prefix, then 10 digits starting 6–9 */
export function isValidIndianMobile(value: string): boolean {
  const digits = value.replace(/[^0-9]/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits);
}
