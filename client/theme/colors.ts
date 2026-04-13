export const colorPalette = {
  // Base backgrounds
  background: '#020612',
  spaceGrid: '#041729',
  panel: '#071f26',

  // Panel accents / borders
  panelBorder: '#00e6ff',
  panelBorderAccent: '#19f0ff',

  // Text colors
  heading: '#7fe8ff',
  bodyText: '#bff7ff',
  muted: '#66c9d6',

  // Primary accents
  accent: '#1ee7c9',
  accentBright: '#39fff0',

  // Buttons / success
  buttonBackground: '#05220d',
  buttonBorder: '#29ff4a',
  buttonText: '#29ff4a',
  success: '#29ff4a',

  // Utility
  danger: '#ff5c5c',
  logoBlue: '#2bd9ff',
  subtleGrid: '#032332',
  glow: 'rgba(0,230,255,0.16)',
  outline: 'rgba(0,230,255,0.08)',
} as const;

export type ColorPalette = typeof colorPalette;
