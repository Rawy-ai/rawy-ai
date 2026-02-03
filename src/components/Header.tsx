'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { themes, Theme, Language, saveLang } from '@/lib/theme';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  theme: Theme;
  lang: Language;
  onThemeChange: (theme: Theme) => void;
  onLangChange: (lang: Language) => void;
  variant?: 'default' | 'studio' | 'minimal';
  showHowItWorks?: boolean;
}

const headerTranslations = {
  en: {
    forKids: 'For Kids',
    ourVision: 'Our Vision',
    howItWorks: 'How it Works',
    login: 'Log in',
    tryStudio: 'Try Story Studio',
    storyStudio: 'Story Studio',
    logout: 'Log out',
    investors: 'For Investors',
    menu: 'Menu',
  },
  ar: {
    forKids: 'للأطفال',
    ourVision: 'رؤيتنا',
    howItWorks: 'كيف يعمل',
    login: 'تسجيل دخول',
    tryStudio: 'جرب استوديو القصص',
    storyStudio: 'استوديو القصص',
    logout: 'تسجيل خروج',
    investors: 'للمستثمرين',
    menu: 'القائمة',
  }
};

export default function Header({
  theme,
  lang,
  onLangChange,
  variant = 'default',
}: HeaderProps) {
  const router = useRouter();
  const c = themes[theme];
  const t = headerTranslations[lang];
  const isRTL = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: scrolled ? c.navBg : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? `1px solid ${c.border}` : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: scrolled ? '0 24px' : '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scrolled ? '64px' : '80px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const logoStyle: React.CSSProperties = {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: c.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    boxShadow: `0 4px 20px ${c.primary}40`,
    transition: 'transform 0.3s ease',
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '26px',
    fontWeight: '800',
    color: c.text,
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    letterSpacing: '-0.02em',
  };

  const navLinkStyle: React.CSSProperties = {
    color: c.textMuted,
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    position: 'relative',
  };

  const ctaButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '12px',
    background: c.gradient,
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `0 4px 16px ${c.primary}40`,
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const langToggleStyle: React.CSSProperties = {
    display: 'flex',
    borderRadius: '10px',
    overflow: 'hidden',
    border: `1px solid ${c.border}`,
    backgroundColor: c.bgCard,
  };

  const langButtonStyle = (isActive: boolean, isArabic: boolean = false): React.CSSProperties => ({
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? `${c.primary}15` : 'transparent',
    color: isActive ? c.primary : c.textMuted,
    transition: 'all 0.2s ease',
    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
  });

  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: c.bg,
    zIndex: 999,
    padding: '100px 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    opacity: mobileMenuOpen ? 1 : 0,
    visibility: mobileMenuOpen ? 'visible' : 'hidden',
    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const mobileNavLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    backgroundColor: c.bgCard,
    borderRadius: '16px',
    textDecoration: 'none',
    color: c.text,
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    border: `1px solid ${c.border}`,
    transition: 'all 0.2s ease',
  };

  // Studio variant
  if (variant === 'studio') {
    return (
      <nav style={{ ...navStyle, backgroundColor: c.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ ...containerStyle, height: '64px', padding: '0 24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ ...logoStyle, width: '38px', height: '38px', fontSize: '18px' }}>R</div>
            <span style={{ ...logoTextStyle, fontSize: '20px' }}>
              {t.storyStudio}
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={langToggleStyle}>
              <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>EN</button>
              <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>عربي</button>
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
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              }}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <nav style={{ ...navStyle, backgroundColor: c.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ ...containerStyle, height: '64px', padding: '0 24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ ...logoStyle, width: '38px', height: '38px', fontSize: '18px' }}>R</div>
            <span style={{ ...logoTextStyle, fontSize: '22px' }}>{isRTL ? 'راوي' : 'Rawy'}</span>
          </Link>
          <div style={langToggleStyle}>
            <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>EN</button>
            <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>عربي</button>
          </div>
        </div>
      </nav>
    );
  }

  // Default variant
  return (
    <>
      <nav style={navStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={logoStyle}>R</div>
            <span style={logoTextStyle}>{isRTL ? 'راوي' : 'Rawy'}</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <Link href="/for-kids" style={navLinkStyle}>{t.forKids}</Link>
            <Link href="/vision" style={navLinkStyle}>{t.ourVision}</Link>
            <a href="#how-it-works" style={navLinkStyle}>{t.howItWorks}</a>
          </div>

          {/* Right Side - Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-nav">
            <div style={langToggleStyle}>
              <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>EN</button>
              <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>عربي</button>
            </div>
            <button onClick={handleTryStudio} style={ctaButtonStyle}>
              <Sparkles size={16} />
              {t.tryStudio}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              border: `1px solid ${c.border}`,
              backgroundColor: c.bgCard,
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              color: c.text,
              transition: 'all 0.2s',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle} className="mobile-menu">
        <Link href="/for-kids" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
          {t.forKids}
          <ChevronRight size={20} style={{ opacity: 0.5 }} />
        </Link>
        <Link href="/vision" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
          {t.ourVision}
          <ChevronRight size={20} style={{ opacity: 0.5 }} />
        </Link>
        <a href="#how-it-works" style={mobileNavLinkStyle} onClick={() => setMobileMenuOpen(false)}>
          {t.howItWorks}
          <ChevronRight size={20} style={{ opacity: 0.5 }} />
        </a>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...langToggleStyle, alignSelf: 'center' }}>
            <button onClick={() => toggleLanguage('en')} style={langButtonStyle(lang === 'en')}>EN</button>
            <button onClick={() => toggleLanguage('ar')} style={langButtonStyle(lang === 'ar', true)}>عربي</button>
          </div>
          <button onClick={() => { handleTryStudio(); setMobileMenuOpen(false); }} style={{ ...ctaButtonStyle, width: '100%', justifyContent: 'center', padding: '18px 24px', fontSize: '16px' }}>
            <Sparkles size={18} />
            {t.tryStudio}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
