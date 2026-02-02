'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { themes, Theme, Language, saveTheme, saveLang } from '@/lib/theme';

interface HeaderProps {
  theme: Theme;
  lang: Language;
  onThemeChange: (theme: Theme) => void;
  onLangChange: (lang: Language) => void;
  variant?: 'default' | 'studio' | 'minimal';
  showHowItWorks?: boolean;
}

// Translations for header
const headerTranslations = {
  en: {
    forKids: 'For Kids',
    ourVision: 'Our Vision',
    howItWorks: 'How it Works',
    login: 'Log in',
    tryStudio: 'Try Story Studio',
    storyStudio: 'Story Studio',
    logout: 'Log out',
  },
  ar: {
    forKids: 'للأطفال',
    ourVision: 'رؤيتنا',
    howItWorks: 'كيف يعمل',
    login: 'تسجيل دخول',
    tryStudio: 'جرب استوديو القصص',
    storyStudio: 'استوديو القصص',
    logout: 'تسجيل خروج',
  }
};

export default function Header({
  theme,
  lang,
  onThemeChange,
  onLangChange,
  variant = 'default',
  showHowItWorks = false
}: HeaderProps) {
  const router = useRouter();
  const c = themes[theme];
  const t = headerTranslations[lang];
  const isRTL = lang === 'ar';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
    saveTheme(newTheme);
  };

  const toggleLanguage = (newLang: Language) => {
    onLangChange(newLang);
    saveLang(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('rawy_user');
    router.push('/');
  };

  const handleTryStudio = () => {
    const user = localStorage.getItem('rawy_user');
    if (user) {
      router.push('/demo');
    } else {
      router.push('/login');
    }
  };

  // Shared styles
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: c.navBg,
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${c.border}`,
    transition: 'all 0.3s'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px'
  };

  const logoStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: c.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    boxShadow: `0 4px 20px ${c.primary}40`
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: c.text,
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
  };

  const themeButtonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: `1px solid ${c.border}`,
    backgroundColor: c.bgCard,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'all 0.2s'
  };

  const langToggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    borderRadius: '10px',
    overflow: 'hidden',
    border: `1px solid ${c.border}`,
    backgroundColor: c.bgCard
  };

  const langButtonStyle = (isActive: boolean, isArabic: boolean = false): React.CSSProperties => ({
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? `${c.primary}20` : 'transparent',
    color: isActive ? c.primary : c.textMuted,
    transition: 'all 0.2s',
    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'inherit'
  });

  const navLinkStyle: React.CSSProperties = {
    color: c.textMuted,
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s',
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
  };

  const ctaButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    background: c.gradient,
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: `0 4px 16px ${c.primary}40`,
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
  };

  // Studio variant - for the story creation flow
  if (variant === 'studio') {
    return (
      <nav style={navStyle}>
        <div style={containerStyle}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={logoStyle}>R</div>
            <span style={{ ...logoTextStyle, fontSize: '22px' }}>
              {t.storyStudio}
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={toggleTheme} style={themeButtonStyle}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div style={langToggleContainerStyle}>
              <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>
                EN
              </button>
              <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>
                عربي
              </button>
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                border: `1px solid ${c.border}`,
                borderRadius: '10px',
                backgroundColor: 'transparent',
                color: c.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Minimal variant - just logo and toggles (for login page)
  if (variant === 'minimal') {
    return (
      <nav style={navStyle}>
        <div style={containerStyle}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={logoStyle}>R</div>
            <span style={logoTextStyle}>
              {isRTL ? 'راوي' : 'Rawy'}
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={toggleTheme} style={themeButtonStyle}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div style={langToggleContainerStyle}>
              <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>
                EN
              </button>
              <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>
                عربي
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Default variant - main navigation
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={logoStyle}>R</div>
          <span style={logoTextStyle}>
            {isRTL ? 'راوي' : 'Rawy'}
          </span>
        </Link>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={themeButtonStyle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Language Toggle */}
          <div style={langToggleContainerStyle}>
            <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>
              EN
            </button>
            <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>
              عربي
            </button>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: '16px' }}>
            <Link href="/for-kids" style={navLinkStyle}>
              {t.forKids}
            </Link>
            <Link href="/vision" style={navLinkStyle}>
              {t.ourVision}
            </Link>
            {showHowItWorks && (
              <a href="#how-it-works" style={navLinkStyle}>
                {t.howItWorks}
              </a>
            )}
          </div>

          {/* CTA Button */}
          <button onClick={handleTryStudio} style={ctaButtonStyle}>
            {t.tryStudio}
          </button>
        </div>
      </div>
    </nav>
  );
}
