'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage, saveTheme, saveLang } from '@/lib/theme';

// Translations
const translations = {
  en: {
    backToHome: 'Back to home',
    welcomeBack: 'Welcome back',
    createAccount: 'Create your account',
    signInDesc: 'Sign in to continue creating stories',
    signUpDesc: 'Start creating Arabic stories in seconds',
    continueWithGoogle: 'Continue with Google',
    orContinueWith: 'or continue with email',
    fullName: 'Full Name',
    enterName: 'Enter your name',
    email: 'Email Address',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'At least 6 characters',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    signUp: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signUpLink: 'Sign up',
    signInLink: 'Sign in',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 6 characters',
    // Right panel
    createStoriesTitle: 'Create Stories That',
    reflectCulture: 'Reflect Your Culture',
    rightPanelDesc: 'Join thousands of creators using AI to bring authentic Arabic stories to life. Fast, engaging, and culturally aligned.',
    feature1: '8 story genres to choose from',
    feature2: 'Stories in natural Gulf dialect',
    feature3: 'Age-appropriate content',
    feature4: 'Share with friends instantly',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    welcomeBack: 'مرحباً بعودتك',
    createAccount: 'أنشئ حسابك',
    signInDesc: 'سجل دخولك لمتابعة إنشاء القصص',
    signUpDesc: 'ابدأ بإنشاء قصص عربية في ثوانٍ',
    continueWithGoogle: 'المتابعة مع جوجل',
    orContinueWith: 'أو المتابعة بالبريد الإلكتروني',
    fullName: 'الاسم الكامل',
    enterName: 'أدخل اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'you@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: '6 أحرف على الأقل',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب؟',
    signUpLink: 'سجّل',
    signInLink: 'سجّل دخولك',
    nameRequired: 'الاسم مطلوب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMin: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    createStoriesTitle: 'أنشئ قصصاً',
    reflectCulture: 'تعكس ثقافتك',
    rightPanelDesc: 'انضم لآلاف المبدعين الذين يستخدمون الذكاء الاصطناعي لإحياء قصص عربية أصيلة. سريعة وجذابة ومتوافقة ثقافياً.',
    feature1: '8 أنواع قصص للاختيار منها',
    feature2: 'قصص باللهجة الخليجية الطبيعية',
    feature3: 'محتوى مناسب للعمر',
    feature4: 'شاركها مع أصدقائك فوراً',
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];
  const c = themes[theme];
  const isRTL = lang === 'ar';

  useEffect(() => {
    setTheme(getThemeFromStorage());
    setLang(getLangFromStorage());
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    saveLang(newLang);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = t.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem('rawy_user', JSON.stringify({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
    }));

    setIsLoading(false);
    router.push('/demo');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem('rawy_user', JSON.stringify({
      name: 'User',
      email: 'user@gmail.com',
    }));

    setIsLoading(false);
    router.push('/demo');
  };

  const features = [t.feature1, t.feature2, t.feature3, t.feature4];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: c.bg
    }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 24px',
        position: 'relative'
      }}>
        {/* Theme and Language toggles */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: isRTL ? 'auto' : '24px',
          left: isRTL ? '24px' : 'auto',
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={toggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: `1px solid ${c.border}`,
              backgroundColor: c.bgCard,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div style={{
            display: 'flex',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${c.border}`
          }}>
            <button
              onClick={() => toggleLanguage('en')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: lang === 'en' ? `${c.primary}20` : 'transparent',
                color: lang === 'en' ? c.primary : c.textMuted
              }}
            >
              EN
            </button>
            <button
              onClick={() => toggleLanguage('ar')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: lang === 'ar' ? `${c.primary}20` : 'transparent',
                color: lang === 'ar' ? c.primary : c.textMuted,
                fontFamily: 'Tajawal, sans-serif'
              }}
            >
              عربي
            </button>
          </div>
        </div>

        <div style={{
          maxWidth: '420px',
          width: '100%',
          margin: '0 auto'
        }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: c.textMuted,
              textDecoration: 'none',
              marginBottom: '32px',
              fontSize: '14px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            <svg style={{ width: '16px', height: '16px', transform: isRTL ? 'rotate(180deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToHome}
          </Link>

          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: c.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${c.shadow}`
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>R</span>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: c.text, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {isRTL ? 'راوي' : 'Rawy'}
            </span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: c.text,
              marginBottom: '8px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>
              {mode === 'login' ? t.welcomeBack : t.createAccount}
            </h1>
            <p style={{ color: c.textMuted, fontSize: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {mode === 'login' ? t.signInDesc : t.signUpDesc}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: c.bgCard,
              border: `2px solid ${c.border}`,
              borderRadius: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{ color: c.text }}>{t.continueWithGoogle}</span>
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '32px 0'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: c.border }} />
            <span style={{ fontSize: '14px', color: c.textMuted, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.orContinueWith}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: c.border }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: c.text,
                  marginBottom: '8px',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.enterName}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '16px',
                    border: `2px solid ${errors.name ? c.error : c.border}`,
                    borderRadius: '14px',
                    backgroundColor: c.bgAlt,
                    color: c.text,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                />
                {errors.name && (
                  <p style={{ marginTop: '8px', fontSize: '14px', color: c.error, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{errors.name}</p>
                )}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: c.text,
                marginBottom: '8px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.emailPlaceholder}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '16px',
                  border: `2px solid ${errors.email ? c.error : c.border}`,
                  borderRadius: '14px',
                  backgroundColor: c.bgAlt,
                  color: c.text,
                  outline: 'none',
                  boxSizing: 'border-box',
                  textAlign: isRTL ? 'right' : 'left'
                }}
              />
              {errors.email && (
                <p style={{ marginTop: '8px', fontSize: '14px', color: c.error, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{errors.email}</p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: c.text,
                marginBottom: '8px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.password}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={t.passwordPlaceholder}
                  style={{
                    width: '100%',
                    padding: isRTL ? '16px 20px 16px 50px' : '16px 50px 16px 20px',
                    fontSize: '16px',
                    border: `2px solid ${errors.password ? c.error : c.border}`,
                    borderRadius: '14px',
                    backgroundColor: c.bgAlt,
                    color: c.text,
                    outline: 'none',
                    boxSizing: 'border-box',
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: isRTL ? 'auto' : '16px',
                    left: isRTL ? '16px' : 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: c.textMuted,
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ marginTop: '8px', fontSize: '14px', color: c.error, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: c.gradient,
                border: 'none',
                borderRadius: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                boxShadow: `0 4px 16px ${c.shadow}`,
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
              ) : (
                <>
                  {mode === 'login' ? t.signIn : t.signUp}
                  <svg style={{ width: '20px', height: '20px', transform: isRTL ? 'rotate(180deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p style={{
            textAlign: 'center',
            color: c.textMuted,
            marginTop: '32px',
            fontSize: '15px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {mode === 'login' ? t.noAccount : t.hasAccount}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: '600',
                color: c.primary,
                cursor: 'pointer',
                fontSize: '15px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}
            >
              {mode === 'login' ? t.signUpLink : t.signInLink}
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div style={{
        flex: 1,
        background: c.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'none'
      }} className="lg-visible">
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-25%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-25%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(60px)'
        }} />

        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          color: 'white'
        }} dir={isRTL ? 'rtl' : 'ltr'}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: 1.2,
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.createStoriesTitle}<br />
            {t.reflectCulture}
          </h2>
          <p style={{
            fontSize: '18px',
            opacity: 0.85,
            maxWidth: '400px',
            lineHeight: 1.6,
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.rightPanelDesc}
          </p>

          <div style={{ marginTop: '48px' }}>
            {features.map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                opacity: 0.9
              }}>
                <svg style={{ width: '20px', height: '20px', color: '#E8D48A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ fontSize: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .lg-visible {
            display: flex !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
