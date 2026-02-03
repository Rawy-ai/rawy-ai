'use client';

import Link from 'next/link';
import { themes, Theme, Language, saveTheme } from '@/lib/theme';
import { Twitter, Linkedin, Instagram, Mail, Sun, Moon, Heart, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  theme: Theme;
  lang: Language;
  onThemeChange: (theme: Theme) => void;
}

const footerTranslations = {
  en: {
    tagline: 'Empowering the next generation of Arab storytellers through AI.',
    product: 'Product',
    storyStudio: 'Story Studio',
    forKids: 'For Kids',
    howItWorks: 'How it Works',
    company: 'Company',
    ourVision: 'Our Vision',
    careers: 'Careers',
    contact: 'Contact',
    investors: 'Investors',
    pitchDeck: 'Pitch Deck',
    pressKit: 'Press Kit',
    partnerships: 'Partnerships',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    madeWith: 'Made with',
    inSaudi: 'in Saudi Arabia',
    allRights: 'All rights reserved.',
    theme: 'Theme',
    lightMode: 'Light',
    darkMode: 'Dark',
    backedBy: 'Building for',
    arabChildren: '50M+ Arabic-speaking children',
  },
  ar: {
    tagline: 'تمكين الجيل القادم من الكتّاب العرب من خلال الذكاء الاصطناعي.',
    product: 'المنتج',
    storyStudio: 'استوديو القصص',
    forKids: 'للأطفال',
    howItWorks: 'كيف يعمل',
    company: 'الشركة',
    ourVision: 'رؤيتنا',
    careers: 'الوظائف',
    contact: 'اتصل بنا',
    investors: 'المستثمرون',
    pitchDeck: 'العرض التقديمي',
    pressKit: 'الملف الصحفي',
    partnerships: 'الشراكات',
    legal: 'قانوني',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    cookies: 'سياسة ملفات تعريف الارتباط',
    madeWith: 'صُنع بـ',
    inSaudi: 'في السعودية',
    allRights: 'جميع الحقوق محفوظة.',
    theme: 'المظهر',
    lightMode: 'فاتح',
    darkMode: 'داكن',
    backedBy: 'نبني لأجل',
    arabChildren: '+50 مليون طفل ناطق بالعربية',
  }
};

export default function Footer({ theme, lang, onThemeChange }: FooterProps) {
  const c = themes[theme];
  const t = footerTranslations[lang];
  const isRTL = lang === 'ar';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
    saveTheme(newTheme);
  };

  const linkStyle: React.CSSProperties = {
    color: c.textMuted,
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease',
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '700',
    color: c.text,
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
  };

  const socialIconStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: `1px solid ${c.border}`,
    backgroundColor: c.bgCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: c.textMuted,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  return (
    <footer
      style={{
        backgroundColor: theme === 'light' ? '#FAFAF5' : '#0A0D0A',
        borderTop: `1px solid ${c.border}`,
        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
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
              }}>
                R
              </div>
              <span style={{
                fontSize: '24px',
                fontWeight: '800',
                color: c.text,
              }}>
                {isRTL ? 'راوي' : 'Rawy'}
              </span>
            </div>
            <p style={{
              color: c.textMuted,
              fontSize: '14px',
              lineHeight: '1.7',
              marginBottom: '24px',
              maxWidth: '260px',
            }}>
              {t.tagline}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://twitter.com/rawyai" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/rawyai" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com/rawyai" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <Instagram size={18} />
              </a>
              <a href="mailto:hello@rawy.ai" style={socialIconStyle}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={headingStyle}>{t.product}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><Link href="/demo" style={linkStyle}>{t.storyStudio}</Link></li>
              <li><Link href="/for-kids" style={linkStyle}>{t.forKids}</Link></li>
              <li><a href="#how-it-works" style={linkStyle}>{t.howItWorks}</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={headingStyle}>{t.company}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><Link href="/vision" style={linkStyle}>{t.ourVision}</Link></li>
              <li><a href="mailto:careers@rawy.ai" style={linkStyle}>{t.careers}</a></li>
              <li><a href="mailto:hello@rawy.ai" style={linkStyle}>{t.contact}</a></li>
            </ul>
          </div>

          {/* Investors Links */}
          <div>
            <h4 style={headingStyle}>{t.investors}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a href="#" style={linkStyle}>
                  {t.pitchDeck}
                  <ExternalLink size={12} style={{ opacity: 0.5 }} />
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  {t.pressKit}
                  <ExternalLink size={12} style={{ opacity: 0.5 }} />
                </a>
              </li>
              <li><a href="mailto:invest@rawy.ai" style={linkStyle}>{t.partnerships}</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={headingStyle}>{t.legal}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><a href="#" style={linkStyle}>{t.privacy}</a></li>
              <li><a href="#" style={linkStyle}>{t.terms}</a></li>
              <li><a href="#" style={linkStyle}>{t.cookies}</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: c.border, marginBottom: '32px' }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Theme Toggle Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: c.textMuted, fontWeight: '500' }}>{t.theme}</span>
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px',
                borderRadius: '100px',
                border: `1px solid ${c.border}`,
                backgroundColor: c.bgCard,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '100px',
                backgroundColor: theme === 'light' ? c.primary : 'transparent',
                color: theme === 'light' ? '#fff' : c.textMuted,
                transition: 'all 0.2s ease',
              }}>
                <Sun size={14} />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{t.lightMode}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '100px',
                backgroundColor: theme === 'dark' ? c.primary : 'transparent',
                color: theme === 'dark' ? '#fff' : c.textMuted,
                transition: 'all 0.2s ease',
              }}>
                <Moon size={14} />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{t.darkMode}</span>
              </div>
            </button>
          </div>

          {/* Copyright Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }} className="footer-bottom">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: c.textMuted,
              fontSize: '13px',
            }}>
              <span>© 2026 Rawy.</span>
              <span>{t.allRights}</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: c.textMuted,
              fontSize: '13px',
            }}>
              <span>{t.madeWith}</span>
              <Heart size={14} style={{ color: '#EF4444', fill: '#EF4444' }} />
              <MapPin size={14} />
              <span style={{ color: c.primary, fontWeight: '600' }}>{t.inSaudi}</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '100px',
              backgroundColor: `${c.accent}10`,
              border: `1px solid ${c.accent}25`,
            }}>
              <span style={{ fontSize: '13px', color: c.textMuted }}>{t.backedBy}</span>
              <span style={{
                fontSize: '13px',
                fontWeight: '700',
                color: theme === 'light' ? '#8B6914' : c.accent,
              }}>
                {t.arabChildren}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
