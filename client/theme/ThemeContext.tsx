import React, { createContext, useContext } from 'react';

import { space } from './spacing';
import { colorPalette } from './colors';
import { fonts, fontSize, fontWeight } from './typography';

const buildTheme = () => ({
  colors: colorPalette,
  space,
  fonts,
  fontSize,
  fontWeight,
});

type Theme = ReturnType<typeof buildTheme>;

const ThemeContext = createContext<Theme>(buildTheme());

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={buildTheme()}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');

  return ctx;
}
