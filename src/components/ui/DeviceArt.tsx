import React, { useId } from 'react';
import type { Product } from '@/types';

/**
 * Neutral, brand-free device illustrations drawn in SVG.
 * They replace the Apple marketing renders: no logos, no wallpapers, and the
 * body takes the finish colour from the product data, so every colour variant
 * is shown correctly without another image file. All kinds share one 400×400
 * canvas, so they sit at the same scale in every tile.
 */
export type DeviceKind =
  | 'phone-pro'
  | 'phone'
  | 'laptop'
  | 'tablet'
  | 'watch'
  | 'watch-ultra'
  | 'earbuds'
  | 'headphones'
  | 'magsafe'
  | 'adapter'
  | 'pencil'
  | 'generic';

export function deviceKindFor(product: Pick<Product, 'category' | 'name'>): DeviceKind {
  const name = product.name.toLowerCase();
  switch (product.category) {
    case 'iPhone':
      return name.includes('pro') ? 'phone-pro' : 'phone';
    case 'Mac':
      return 'laptop';
    case 'iPad':
      return 'tablet';
    case 'Watch':
      return name.includes('ultra') ? 'watch-ultra' : 'watch';
    case 'AirPods':
      return name.includes('max') ? 'headphones' : 'earbuds';
    default:
      if (name.includes('magsafe')) return 'magsafe';
      if (name.includes('adapter') || name.includes('charger')) return 'adapter';
      if (name.includes('pencil')) return 'pencil';
      return 'generic';
  }
}

/* --- small colour helpers ------------------------------------------------ */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.padEnd(6, '0');
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) || 0) as [number, number, number];
}
/** t > 0 mixes toward white, t < 0 toward black */
function shade(hex: string, t: number): string {
  const target = t > 0 ? 255 : 0;
  const k = Math.abs(t);
  const [r, g, b] = hexToRgb(hex).map((c) => Math.round(c + (target - c) * k));
  return `rgb(${r} ${g} ${b})`;
}
function isLight(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

const GLASS = '#151515';
const LENS = '#1b1b1d';

interface DeviceArtProps {
  kind: DeviceKind;
  /** finish colour of the body, e.g. '#9E9A93' */
  finish?: string;
  className?: string;
  /** accessible label; omit when the surrounding element already names the product */
  label?: string;
}

export default function DeviceArt({ kind, finish = '#B9B6B0', className, label }: DeviceArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sheen = `sheen-${uid}`;
  const body = finish;
  const edge = shade(finish, isLight(finish) ? -0.18 : 0.22);
  const deep = shade(finish, -0.12);
  const outline = { stroke: 'currentColor', strokeOpacity: 0.16, strokeWidth: 1.5 } as const;

  const shadow = (cy: number, rx: number) => (
    <ellipse cx="200" cy={cy} rx={rx} ry="9" fill="currentColor" opacity="0.08" />
  );

  let art: React.ReactNode;
  switch (kind) {
    case 'phone-pro':
    case 'phone': {
      const pro = kind === 'phone-pro';
      art = (
        <>
          {shadow(346, 78)}
          <rect x="132" y="56" width="136" height="282" rx="28" fill={body} {...outline} />
          <rect x="132" y="56" width="136" height="282" rx="28" fill={`url(#${sheen})`} />
          <rect x="136.5" y="60.5" width="127" height="273" rx="24" fill="none" stroke={edge} strokeOpacity="0.5" />
          <rect x="268" y="128" width="3" height="40" rx="1.5" fill={edge} />
          <rect x="268" y="178" width="3" height="26" rx="1.5" fill={edge} />
          {pro ? (
            <>
              <rect x="146" y="70" width="70" height="70" rx="18" fill={deep} stroke={edge} strokeOpacity="0.6" />
              {[
                [166, 90],
                [166, 120],
                [195, 105],
              ].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                  <circle cx={cx} cy={cy} r="12.5" fill={edge} />
                  <circle cx={cx} cy={cy} r="9.5" fill={LENS} />
                  <circle cx={cx - 2.5} cy={cy - 2.5} r="2.2" fill="#fff" opacity="0.18" />
                </g>
              ))}
              <circle cx="199" cy="81" r="4.5" fill="#E9E6DF" />
              <circle cx="199" cy="129" r="2.4" fill={LENS} opacity="0.7" />
            </>
          ) : (
            <>
              <rect x="148" y="70" width="34" height="68" rx="17" fill={deep} stroke={edge} strokeOpacity="0.6" />
              {[88, 120].map((cy) => (
                <g key={cy}>
                  <circle cx="165" cy={cy} r="11.5" fill={edge} />
                  <circle cx="165" cy={cy} r="8.5" fill={LENS} />
                  <circle cx="162.5" cy={cy - 2.5} r="2" fill="#fff" opacity="0.18" />
                </g>
              ))}
              <circle cx="194" cy="104" r="4" fill="#E9E6DF" />
            </>
          )}
        </>
      );
      break;
    }

    case 'laptop':
      art = (
        <>
          {shadow(300, 160)}
          <rect x="74" y="92" width="252" height="176" rx="11" fill={body} {...outline} />
          <rect x="81" y="99" width="238" height="162" rx="6" fill={GLASS} />
          <path d="M81 99h120L121 261H87a6 6 0 0 1-6-6z" fill="#fff" opacity="0.04" />
          <rect x="186" y="99" width="28" height="7" rx="3.5" fill="#000" />
          <path d="M44 268h312l-6 14c-1.5 3.5-5 6-9 6H59c-4 0-7.5-2.5-9-6z" fill={body} {...outline} />
          <path d="M44 268h312l-1.6 3.8H45.6z" fill={edge} opacity="0.55" />
          <rect x="174" y="268" width="52" height="5" rx="2.5" fill={deep} />
        </>
      );
      break;

    case 'tablet':
      art = (
        <>
          {shadow(338, 108)}
          <rect x="112" y="52" width="176" height="276" rx="18" fill={body} {...outline} />
          <rect x="112" y="52" width="176" height="276" rx="18" fill={`url(#${sheen})`} />
          <rect x="121" y="61" width="158" height="258" rx="10" fill={GLASS} />
          <path d="M121 61h96L141 319h-10a10 10 0 0 1-10-10z" fill="#fff" opacity="0.045" />
          <circle cx="200" cy="56.5" r="1.8" fill={LENS} />
          <rect x="288" y="92" width="3" height="30" rx="1.5" fill={edge} />
        </>
      );
      break;

    case 'watch':
    case 'watch-ultra': {
      const ultra = kind === 'watch-ultra';
      const band = shade(finish, isLight(finish) ? -0.35 : -0.25);
      const caseR = ultra ? 24 : 36;
      art = (
        <>
          {shadow(352, 52)}
          <rect x="164" y="34" width="72" height="104" rx="14" fill={band} {...outline} />
          <rect x="164" y="262" width="72" height="96" rx="14" fill={band} {...outline} />
          <rect x="138" y="118" width="124" height="164" rx={caseR} fill={body} {...outline} />
          <rect x="138" y="118" width="124" height="164" rx={caseR} fill={`url(#${sheen})`} />
          <rect x="148" y="128" width="104" height="144" rx={caseR - 9} fill={GLASS} />
          <circle cx="200" cy="200" r="38" fill="none" stroke="#fff" strokeOpacity="0.12" />
          <path d="M200 200V176M200 200l17 9" stroke="#E9E6DF" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="200" cy="200" r="3.5" fill="#C9A24A" />
          <rect x="262" y="164" width="9" height="30" rx="3" fill={edge} />
          <rect x="262" y="206" width="5" height="28" rx="2" fill={edge} />
          {ultra && <rect x="132" y="168" width="6" height="34" rx="2" fill={edge} />}
        </>
      );
      break;
    }

    case 'earbuds':
      art = (
        <>
          {shadow(300, 104)}
          <rect x="104" y="128" width="168" height="160" rx="52" fill={body} {...outline} />
          <rect x="104" y="128" width="168" height="160" rx="52" fill={`url(#${sheen})`} />
          <path d="M104.8 182h166.4" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx="188" cy="226" r="3.2" fill={edge} />
          <g transform="rotate(14 300 150)">
            <ellipse cx="300" cy="128" rx="22" ry="20" fill={body} {...outline} />
            <ellipse cx="292" cy="124" rx="9" ry="8" fill={LENS} opacity="0.8" />
            <rect x="291" y="138" width="17" height="66" rx="8.5" fill={body} {...outline} />
          </g>
        </>
      );
      break;

    case 'headphones':
      art = (
        <>
          {shadow(318, 120)}
          <path d="M126 210C126 120 160 82 200 82s74 38 74 128" fill="none" stroke={edge} strokeWidth="7" strokeLinecap="round" />
          <path d="M140 200c0-70 26-100 60-100s60 30 60 100" fill="none" stroke={shade(finish, -0.3)} strokeOpacity="0.85" strokeWidth="14" strokeLinecap="round" />
          <rect x="120" y="180" width="12" height="40" rx="5" fill={edge} />
          <rect x="268" y="180" width="12" height="40" rx="5" fill={edge} />
          <rect x="88" y="196" width="72" height="110" rx="30" fill={body} {...outline} />
          <rect x="240" y="196" width="72" height="110" rx="30" fill={body} {...outline} />
          <rect x="88" y="196" width="72" height="110" rx="30" fill={`url(#${sheen})`} />
          <rect x="240" y="196" width="72" height="110" rx="30" fill={`url(#${sheen})`} />
          <rect x="148" y="206" width="18" height="90" rx="9" fill={shade(finish, -0.35)} />
          <rect x="234" y="206" width="18" height="90" rx="9" fill={shade(finish, -0.35)} />
          <rect x="300" y="214" width="6" height="18" rx="3" fill={edge} />
        </>
      );
      break;

    case 'magsafe':
      art = (
        <>
          {shadow(352, 70)}
          <path d="M200 236c0 54-90 40-96 112" fill="none" stroke={shade(finish, -0.08)} strokeWidth="10" strokeLinecap="round" />
          <path d="M200 236c0 54-90 40-96 112" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="10" strokeDasharray="2 5" strokeLinecap="round" />
          <circle cx="200" cy="160" r="82" fill={body} {...outline} />
          <circle cx="200" cy="160" r="82" fill={`url(#${sheen})`} />
          <circle cx="200" cy="160" r="60" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5" />
          <circle cx="200" cy="160" r="20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
          <rect x="190" y="238" width="20" height="16" rx="5" fill={edge} />
        </>
      );
      break;

    case 'adapter':
      art = (
        <>
          {shadow(318, 86)}
          <rect x="168" y="70" width="14" height="44" rx="3" fill="#BFBCB6" />
          <rect x="218" y="70" width="14" height="44" rx="3" fill="#BFBCB6" />
          <rect x="128" y="104" width="144" height="200" rx="26" fill={body} {...outline} />
          <rect x="128" y="104" width="144" height="200" rx="26" fill={`url(#${sheen})`} />
          <rect x="170" y="196" width="60" height="14" rx="7" fill="#26262A" />
          <rect x="170" y="226" width="60" height="14" rx="7" fill="#26262A" />
          <rect x="182" y="201" width="36" height="4" rx="2" fill="#4A4A50" />
          <rect x="182" y="231" width="36" height="4" rx="2" fill="#4A4A50" />
        </>
      );
      break;

    case 'pencil':
      art = (
        <>
          {shadow(300, 130)}
          <g transform="rotate(-32 200 200)">
            <rect x="62" y="186" width="250" height="28" rx="6" fill={body} {...outline} />
            <rect x="62" y="186" width="250" height="9" rx="4" fill={edge} opacity="0.35" />
            <path d="M312 186l40 14-40 14z" fill={shade(finish, -0.06)} {...outline} />
            <path d="M343 196.8l9 3.2-9 3.2z" fill="#3a3a3c" />
          </g>
        </>
      );
      break;

    default:
      art = (
        <>
          {shadow(316, 100)}
          <rect x="110" y="110" width="180" height="190" rx="22" fill={body} {...outline} />
          <rect x="110" y="110" width="180" height="190" rx="22" fill={`url(#${sheen})`} />
        </>
      );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {art}
    </svg>
  );
}
