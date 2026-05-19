export const EcommerceColors = {
  // Brand Core
  brandBlue: '#0066FF',
  brandBlueHover: '#0052CC',
  brandBlueLight: 'rgba(0, 102, 255, 0.08)',

  // Secondary & Accents
  electricBlue: '#00D2FF',
  promoRed: '#FF2D55',

  // Canvas
  bgApp: '#F2F5F8',
  bgCard: '#FFFFFF',
  borderMuted: '#E9ECEF',

  // Typography
  textMain: '#1A1D20',
  textMuted: '#6C7A89',
} as const;

export const EcommerceSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

export const EcommerceRadius = {
  card: '16px',
  pill: '999px',
  badge: '6px',
} as const;

export const EcommerceShadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
  blue: '0 4px 16px rgba(0, 102, 255, 0.05)',
  card: '0 4px 12px rgba(0, 102, 255, 0.03)',
} as const;

export const EcommerceTokens = {
  colors: EcommerceColors,
  spacing: EcommerceSpacing,
  borderRadius: EcommerceRadius,
  shadows: EcommerceShadows,
} as const;

export type EcommerceColorKey = keyof typeof EcommerceColors;
