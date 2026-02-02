// Shared theme configuration for Rawy
// Saudi-inspired color palette with light and dark modes

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

// Theme colors with Saudi-inspired palette
export const themes = {
  light: {
    bg: '#FFFDF8',           // Warm cream/sand
    bgAlt: '#FDF8F0',        // Softer cream
    bgCard: '#FFFFFF',
    bgCardAlt: 'rgba(0,108,53,0.03)', // Subtle green tint
    text: '#1A2B1A',         // Deep green-black
    textMuted: '#5A6B5A',
    textLight: '#8A9B8A',
    border: 'rgba(0,108,53,0.1)',
    borderLight: 'rgba(0,108,53,0.05)',
    primary: '#006C35',      // Saudi Green
    primaryLight: '#0D9F61',
    primaryDark: '#005528',
    secondary: '#8B5CF6',    // Keep purple for app
    accent: '#C9A227',       // Gold
    accentLight: '#E8D48A',
    gradient: 'linear-gradient(135deg, #006C35, #0D9F61)',
    gradientAlt: 'linear-gradient(135deg, #8B5CF6, #006C35)',
    gradientGold: 'linear-gradient(135deg, #C9A227, #E8D48A)',
    shadow: 'rgba(0,108,53,0.08)',
    shadowStrong: 'rgba(0,108,53,0.15)',
    navBg: 'rgba(255,253,248,0.95)',
    error: '#DC3545',
    success: '#28A745',
  },
  dark: {
    bg: '#0A0F0A',           // Deep green-black
    bgAlt: '#111A11',
    bgCard: 'rgba(255,255,255,0.03)',
    bgCardAlt: 'rgba(0,108,53,0.08)',
    text: '#FFFFFF',
    textMuted: '#A0B0A0',
    textLight: '#6A7A6A',
    border: 'rgba(255,255,255,0.08)',
    borderLight: 'rgba(255,255,255,0.04)',
    primary: '#0D9F61',      // Brighter green for dark mode
    primaryLight: '#2ECC71',
    primaryDark: '#006C35',
    secondary: '#A78BFA',
    accent: '#E8D48A',       // Lighter gold for dark
    accentLight: '#C9A227',
    gradient: 'linear-gradient(135deg, #0D9F61, #2ECC71)',
    gradientAlt: 'linear-gradient(135deg, #A78BFA, #0D9F61)',
    gradientGold: 'linear-gradient(135deg, #E8D48A, #C9A227)',
    shadow: 'rgba(0,0,0,0.3)',
    shadowStrong: 'rgba(0,0,0,0.5)',
    navBg: 'rgba(10,15,10,0.9)',
    error: '#FF6B7A',
    success: '#4ADE80',
  }
};

// Helper functions
export function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('rawy_theme') as Theme;
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light';
}

export function getLangFromStorage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('rawy_lang') as Language;
  if (saved === 'en' || saved === 'ar') return saved;
  return 'en';
}

export function saveTheme(theme: Theme): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rawy_theme', theme);
  }
}

export function saveLang(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rawy_lang', lang);
  }
}

// Common component styles
export const getButtonStyle = (theme: typeof themes.light, variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const base = {
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600' as const,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  switch (variant) {
    case 'primary':
      return {
        ...base,
        color: '#fff',
        background: theme.gradient,
        boxShadow: `0 4px 20px ${theme.shadow}`,
      };
    case 'secondary':
      return {
        ...base,
        color: theme.text,
        backgroundColor: theme.bgCard,
        border: `2px solid ${theme.border}`,
      };
    case 'ghost':
      return {
        ...base,
        color: theme.textMuted,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.border}`,
      };
  }
};

export const getInputStyle = (theme: typeof themes.light, hasError: boolean = false) => ({
  width: '100%',
  padding: '16px 20px',
  fontSize: '16px',
  border: `2px solid ${hasError ? theme.error : theme.border}`,
  borderRadius: '12px',
  backgroundColor: theme.bgCard,
  color: theme.text,
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s ease',
});

export const getCardStyle = (theme: typeof themes.light) => ({
  backgroundColor: theme.bgCard,
  borderRadius: '20px',
  padding: '24px',
  border: `1px solid ${theme.border}`,
  boxShadow: `0 4px 20px ${theme.shadow}`,
});
