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
