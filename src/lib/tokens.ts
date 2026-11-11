/**
 * Vishal Apple Store - Design Tokens
 * Premium minimalism: Black, white, hairline borders, and warm gold (#C9A24A)
 */

export const tokens = {
  colors: {
    accent: {
      gold: '#C9A24A',
      goldLight: '#DFBF73',
      goldDark: '#9F7E30',
      goldMuted: 'rgba(201, 162, 74, 0.12)',
      goldBorder: 'rgba(201, 162, 74, 0.35)',
    },
    dark: {
      bg: '#0A0A0A',
      surface: '#121214',
      surfaceElevated: '#18181B',
      surfaceHighlight: '#222226',
      hairline: 'rgba(255, 255, 255, 0.08)',
      hairlineHover: 'rgba(255, 255, 255, 0.18)',
      textPrimary: '#FFFFFF',
      textSecondary: '#A1A1A6',
      textMuted: '#6E6E73',
    },
    light: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceElevated: '#F5F5F7',
      hairline: 'rgba(0, 0, 0, 0.08)',
      hairlineHover: 'rgba(0, 0, 0, 0.18)',
      textPrimary: '#1D1D1F',
      textSecondary: '#515154',
      textMuted: '#86868B',
    },
    condition: {
      new: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'Brand New (Sealed)',
      },
      unboxed: {
        bg: 'bg-[#C9A24A]/10',
        text: 'text-[#C9A24A]',
        border: 'border-[#C9A24A]/30',
        label: 'Unboxed (Like New)',
      },
      preowned: {
        bg: 'bg-sky-500/10',
        text: 'text-sky-400',
        border: 'border-sky-500/30',
        label: 'Certified Pre-Owned',
      },
    },
  },
  typography: {
    headlineDisplay: 'font-display font-semibold tracking-tight',
    headlineSection: 'font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    subheading: 'text-base sm:text-lg text-neutral-400 font-normal leading-relaxed',
  },
  radii: {
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  },
};

/**
 * Format Indian Rupee currency
 * Example: 129900 -> ₹1,29,900
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}
