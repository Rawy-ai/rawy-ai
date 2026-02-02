'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage, saveTheme, saveLang } from '@/lib/theme';

// Translations
const translations = {
  en: {
    // Nav
    forKids: 'For Kids',
    ourVision: 'Our Vision',
    howItWorks: 'How it Works',
    login: 'Log in',
    tryStudio: 'Try Story Studio',
    tryFree: 'Try Free',

    // Hero
    badge: '✨ AI-Powered Storytelling Platform',
    heroTitle1: 'Where Arab Children',
    heroTitle2: 'Become Authors',
    heroTitle3: 'of Their Own Stories',
    heroDesc: 'The first AI platform designed specifically for Arab youth ages 9-15. Create culturally authentic Arabic stories that inspire creativity, build literacy, and celebrate heritage.',
    openStudio: 'Open Story Studio',
    watchDemo: 'Watch Demo',
    storiesCreated: '3,000+ stories created',
    parentApproved: 'Parent approved',
    valuesAligned: 'Values-aligned',

    // Preview
    storyStudio: 'Story Studio',
    aiGenerated: 'AI Generated',
    byAuthor: 'By:',

    // Stats bar
    activeAuthors: 'Active Young Authors',
    storiesGenerated: 'Stories Generated',
    countriesReached: 'Countries Reached',
    parentSatisfaction: 'Parent Satisfaction',

    // Mission
    missionBadge: 'Our Mission',
    missionTitle: 'Preserving Arabic Heritage Through Modern Technology',
    missionDesc: 'We believe every Arab child should see themselves as heroes in stories that reflect their culture, values, and language. Rawy combines cutting-edge AI with deep cultural understanding.',
    culturalRelevance: 'Cultural Relevance',
    culturalDesc: 'Stories rooted in Arab heritage and Islamic values',
    literacyDev: 'Literacy Development',
    literacyDesc: 'Age-appropriate Arabic content that builds reading skills',
    creativeExp: 'Creative Expression',
    creativeDesc: 'Kids become authors, building confidence and creativity',

    // How it works
    howBadge: 'How it Works',
    howTitle: 'From Imagination to Published Story in Minutes',
    step1Title: 'Create Character',
    step1Desc: 'Name your hero and choose their unique personality traits',
    step2Title: 'Build World',
    step2Desc: 'Select magical settings, companions, and special powers',
    step3Title: 'Choose Quest',
    step3Desc: 'Pick the adventure type and exciting challenges to face',
    step4Title: 'Get Published',
    step4Desc: 'AI generates your story with beautiful illustrations',

    // Features
    featuresBadge: 'Why Rawy',
    featuresTitle: 'Built for the Next Generation of Arab Storytellers',
    feature1Title: 'AI-Powered Generation',
    feature1Desc: 'Advanced GPT-4 and DALL-E 3 create unique stories and illustrations',
    feature2Title: 'Collaborative Stories',
    feature2Desc: 'Kids can invite friends to continue their stories together',
    feature3Title: 'Age-Appropriate Content',
    feature3Desc: 'Stories adapt to reading levels: Explorer (9-10), Adventurer (11-12), Champion (13-15)',
    feature4Title: 'Video Generation',
    feature4Desc: 'Transform stories into animated videos to share with family',
    feature5Title: 'Cultural Authenticity',
    feature5Desc: 'Every story respects Arab heritage and Islamic values',
    feature6Title: 'Gamification',
    feature6Desc: 'Badges, leaderboards, and challenges keep kids engaged',

    // Impact
    impactBadge: 'Our Impact',
    impactTitle: 'Building the Next Generation of Arab Storytellers',
    impactDesc: 'Every story created on Rawy contributes to our mission of increasing Arabic literacy, fostering creativity, and strengthening cultural identity among Arab youth.',
    parentsSay: 'What Parents Say',
    quote1: '"My daughter finally enjoys reading Arabic. She has created 12 stories already!"',
    quote1Author: 'Fatima A., Riyadh',
    quote2: '"The stories are age-appropriate and align with our values. Highly recommend."',
    quote2Author: 'Ahmed M., Dubai',

    // Investment
    investBadge: 'Investment Opportunity',
    investTitle: 'Join Us in Shaping the Future of Arab Storytelling',
    investDesc: 'Rawy is positioned to become the leading AI-powered content platform for Arab children. With a growing user base and strong unit economics, we are seeking strategic partners to scale across the MENA region.',
    marketSize: '$2.4B',
    marketLabel: 'MENA EdTech Market',
    growthRate: '18%',
    growthLabel: 'Annual Growth Rate',
    targetUsers: '50M+',
    targetLabel: 'Target Arabic-Speaking Children',
    learnMore: 'Learn More About Investment',

    // CTA
    ctaTitle: 'Ready to Inspire Young Authors?',
    ctaDesc: 'Join thousands of families using Rawy to nurture creativity and cultural pride. Free to try. No credit card required.',
    ctaButton: 'Open Story Studio — Free',
    ctaNote: '✓ No signup required to try  ✓ 5 free stories per day  ✓ Safe for kids',

    // Footer
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact',
    madeIn: 'Made with ♥ in Saudi Arabia',
    copyright: '© 2026 Rawy.',
  },
  ar: {
    // Nav
    forKids: 'للأطفال',
    ourVision: 'رؤيتنا',
    howItWorks: 'كيف يعمل',
    login: 'تسجيل الدخول',
    tryStudio: 'جرّب استوديو القصص',
    tryFree: 'جرّب مجاناً',

    // Hero
    badge: '✨ منصة القصص بالذكاء الاصطناعي',
    heroTitle1: 'حيث يصبح الأطفال العرب',
    heroTitle2: 'مؤلفين',
    heroTitle3: 'لقصصهم الخاصة',
    heroDesc: 'أول منصة ذكاء اصطناعي مصممة خصيصاً للشباب العربي من 9-15 سنة. اكتب قصصاً عربية أصيلة تُلهم الإبداع وتبني مهارات القراءة وتحتفي بالتراث.',
    openStudio: 'افتح استوديو القصص',
    watchDemo: 'شاهد العرض',
    storiesCreated: '+3,000 قصة مُنشأة',
    parentApproved: 'موافقة الوالدين',
    valuesAligned: 'متوافق مع القيم',

    // Preview
    storyStudio: 'استوديو القصص',
    aiGenerated: 'إنشاء الذكاء الاصطناعي',
    byAuthor: 'بقلم:',

    // Stats bar
    activeAuthors: 'مؤلف شاب نشط',
    storiesGenerated: 'قصة تم إنشاؤها',
    countriesReached: 'دولة',
    parentSatisfaction: 'رضا الوالدين',

    // Mission
    missionBadge: 'مهمتنا',
    missionTitle: 'الحفاظ على التراث العربي من خلال التكنولوجيا الحديثة',
    missionDesc: 'نؤمن بأن كل طفل عربي يستحق أن يرى نفسه بطلاً في قصص تعكس ثقافته وقيمه ولغته. راوي يجمع بين الذكاء الاصطناعي المتطور والفهم الثقافي العميق.',
    culturalRelevance: 'الصلة الثقافية',
    culturalDesc: 'قصص متجذرة في التراث العربي والقيم الإسلامية',
    literacyDev: 'تطوير القراءة',
    literacyDesc: 'محتوى عربي مناسب للعمر يبني مهارات القراءة',
    creativeExp: 'التعبير الإبداعي',
    creativeDesc: 'يصبح الأطفال مؤلفين، يبنون الثقة والإبداع',

    // How it works
    howBadge: 'كيف يعمل',
    howTitle: 'من الخيال إلى قصة منشورة في دقائق',
    step1Title: 'أنشئ الشخصية',
    step1Desc: 'سمِّ بطلك واختر صفاته الفريدة',
    step2Title: 'ابنِ العالم',
    step2Desc: 'اختر الأماكن السحرية والرفاق والقوى الخاصة',
    step3Title: 'اختر المهمة',
    step3Desc: 'حدد نوع المغامرة والتحديات المثيرة',
    step4Title: 'انشر القصة',
    step4Desc: 'الذكاء الاصطناعي ينشئ قصتك مع رسومات جميلة',

    // Features
    featuresBadge: 'لماذا راوي',
    featuresTitle: 'مصمم للجيل القادم من الكتّاب العرب',
    feature1Title: 'إنشاء بالذكاء الاصطناعي',
    feature1Desc: 'GPT-4 و DALL-E 3 المتقدمان ينشئان قصصاً ورسومات فريدة',
    feature2Title: 'قصص تعاونية',
    feature2Desc: 'يمكن للأطفال دعوة أصدقائهم لمواصلة القصص معاً',
    feature3Title: 'محتوى مناسب للعمر',
    feature3Desc: 'القصص تتكيف مع مستوى القراءة: مستكشف (9-10)، مغامر (11-12)، بطل (13-15)',
    feature4Title: 'إنشاء الفيديو',
    feature4Desc: 'حوّل القصص إلى فيديوهات متحركة للمشاركة مع العائلة',
    feature5Title: 'الأصالة الثقافية',
    feature5Desc: 'كل قصة تحترم التراث العربي والقيم الإسلامية',
    feature6Title: 'التلعيب',
    feature6Desc: 'شارات ولوحات صدارة وتحديات تحافظ على تفاعل الأطفال',

    // Impact
    impactBadge: 'تأثيرنا',
    impactTitle: 'نبني الجيل القادم من الكتّاب العرب',
    impactDesc: 'كل قصة تُنشأ على راوي تساهم في مهمتنا لزيادة محو الأمية العربية وتعزيز الإبداع وتقوية الهوية الثقافية بين الشباب العربي.',
    parentsSay: 'ماذا يقول الآباء',
    quote1: '"ابنتي أخيراً تستمتع بقراءة العربية. لقد أنشأت 12 قصة بالفعل!"',
    quote1Author: 'فاطمة أ.، الرياض',
    quote2: '"القصص مناسبة للعمر ومتوافقة مع قيمنا. أوصي بها بشدة."',
    quote2Author: 'أحمد م.، دبي',

    // Investment
    investBadge: 'فرصة استثمارية',
    investTitle: 'انضم إلينا في تشكيل مستقبل القصص العربية',
    investDesc: 'راوي في موقع يؤهله ليصبح المنصة الرائدة للمحتوى بالذكاء الاصطناعي للأطفال العرب. مع قاعدة مستخدمين متنامية واقتصاديات وحدة قوية، نبحث عن شركاء استراتيجيين للتوسع في منطقة الشرق الأوسط وشمال أفريقيا.',
    marketSize: '$2.4B',
    marketLabel: 'سوق التقنية التعليمية في المنطقة',
    growthRate: '18%',
    growthLabel: 'معدل النمو السنوي',
    targetUsers: '+50M',
    targetLabel: 'طفل ناطق بالعربية',
    learnMore: 'اعرف المزيد عن الاستثمار',

    // CTA
    ctaTitle: 'مستعد لإلهام المؤلفين الصغار؟',
    ctaDesc: 'انضم إلى آلاف العائلات التي تستخدم راوي لتنمية الإبداع والفخر الثقافي. مجاني للتجربة. لا حاجة لبطاقة ائتمان.',
    ctaButton: 'افتح استوديو القصص — مجاناً',
    ctaNote: '✓ لا حاجة للتسجيل للتجربة  ✓ 5 قصص مجانية يومياً  ✓ آمن للأطفال',

    // Footer
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    contact: 'اتصل بنا',
    madeIn: 'صُنع بـ ♥ في المملكة العربية السعودية',
    copyright: '© 2026 راوي.',
  }
};

export default function Home() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  const t = translations[lang];
  const c = themes[theme];
  const isRTL = lang === 'ar';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check saved preferences
    setTheme(getThemeFromStorage());
    setLang(getLangFromStorage());

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGetStarted = () => {
    const user = localStorage.getItem('rawy_user');
    if (user) {
      router.push('/demo');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    router.push('/demo');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: c.bg,
      color: c.text,
      transition: 'background-color 0.3s, color 0.3s'
    }} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Subtle Pattern Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: theme === 'light' ? 0.4 : 0.15
      }}>
        {/* Geometric Islamic-inspired pattern overlay */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.primary}15 0%, transparent 70%)`,
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.accent}20 0%, transparent 70%)`,
          filter: 'blur(60px)'
        }} />
      </div>

      {/* Navigation */}
      <Header
        theme={theme}
        lang={lang}
        onThemeChange={setTheme}
        onLangChange={setLang}
        showHowItWorks={true}
      />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        paddingTop: isMobile ? '120px' : '160px',
        paddingBottom: isMobile ? '60px' : '100px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              {/* Badge with Saudi green accent */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '100px',
                background: `${c.primary}10`,
                border: `1px solid ${c.primary}25`,
                color: c.primary,
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '28px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.badge}
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: isMobile ? '40px' : '58px',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '28px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                <span style={{ color: c.text }}>{t.heroTitle1}</span><br />
                <span style={{
                  background: c.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{t.heroTitle2}</span><br />
                <span style={{ color: c.text }}>{t.heroTitle3}</span>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: isMobile ? '17px' : '19px',
                color: c.textMuted,
                lineHeight: '1.8',
                marginBottom: '36px',
                maxWidth: '520px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.heroDesc}
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleGetStarted}
                  style={{
                    padding: '18px 36px',
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#fff',
                    background: c.gradient,
                    border: 'none',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    boxShadow: `0 8px 32px ${c.primary}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  {t.openStudio} →
                </button>
                <button
                  style={{
                    padding: '18px 36px',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: c.text,
                    backgroundColor: c.bgCard,
                    border: `2px solid ${c.border}`,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  ▶ {t.watchDemo}
                </button>
              </div>

              {/* Trust Signals with green checkmarks */}
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '16px' : '28px', flexWrap: 'wrap' }}>
                {[t.storiesCreated, t.parentApproved, t.valuesAligned].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: c.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#fff'
                    }}>✓</div>
                    <span style={{
                      fontSize: '14px',
                      color: c.textMuted,
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Preview */}
            <div style={{
              flex: 1,
              width: '100%',
              position: 'relative'
            }}>
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: `radial-gradient(circle, ${c.primary}15 0%, transparent 70%)`,
                filter: 'blur(40px)',
                zIndex: 0
              }} />

              <div style={{
                position: 'relative',
                backgroundColor: c.bgCard,
                borderRadius: '28px',
                padding: isMobile ? '16px' : '20px',
                border: `1px solid ${c.border}`,
                boxShadow: `0 20px 60px ${c.shadow}`,
                zIndex: 1
              }}>
                <div style={{
                  backgroundColor: theme === 'light' ? '#FAFAF8' : 'rgba(10,10,30,0.8)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `1px solid ${c.border}`
                }}>
                  {/* Window Header with Saudi green */}
                  <div style={{
                    padding: '16px 20px',
                    background: c.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '15px',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>📚 {t.storyStudio}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    </div>
                  </div>

                  {/* Scene Image with gold/sand gradient */}
                  <div style={{
                    height: isMobile ? '160px' : '200px',
                    background: theme === 'light'
                      ? 'linear-gradient(135deg, #F5E6C8, #E8D4A8)'
                      : 'linear-gradient(135deg, #2A1F0A, #3D2A0F)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ fontSize: '64px', zIndex: 1 }}>🏜️</div>
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: theme === 'light' ? 'rgba(0,108,53,0.9)' : 'rgba(0,0,0,0.6)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#fff',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>
                      🎨 {t.aiGenerated}
                    </div>
                  </div>

                  {/* Story Content */}
                  <div style={{ padding: isMobile ? '20px' : '24px' }} dir="rtl">
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginBottom: '16px'
                    }}>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: `${c.primary}15`,
                        border: `1px solid ${c.primary}25`,
                        color: c.primary,
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>🏜️ صحراء</span>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: `${c.accent}20`,
                        border: `1px solid ${c.accent}30`,
                        color: theme === 'light' ? '#8B6914' : c.accent,
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>⚡ مغامرة</span>
                    </div>
                    <p style={{
                      fontFamily: 'Tajawal, sans-serif',
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: '2',
                      color: c.text
                    }}>
                      في أعماق الصحراء، وجد سالم نفسه أمام باب غامض منقوش عليه رموز قديمة...
                    </p>
                    <div style={{
                      marginTop: '16px',
                      padding: '14px',
                      backgroundColor: c.bgCardAlt,
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: c.textMuted,
                      border: `1px solid ${c.borderLight}`
                    }}>
                      ✍️ بقلم: سالم الحربي
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        position: 'relative',
        padding: '48px 24px',
        backgroundColor: c.bgAlt,
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '32px'
        }}>
          {[
            { num: '500+', label: t.activeAuthors },
            { num: '3,000+', label: t.storiesGenerated },
            { num: '12', label: t.countriesReached },
            { num: '95%', label: t.parentSatisfaction },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '32px' : '42px',
                fontWeight: '800',
                background: c.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px'
              }}>{stat.num}</div>
              <div style={{
                fontSize: '14px',
                color: c.textMuted,
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '100px',
            background: `${c.primary}10`,
            border: `1px solid ${c.primary}20`,
            color: c.primary,
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.missionBadge}
          </div>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: '800',
            marginBottom: '24px',
            color: c.text,
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
            lineHeight: '1.2'
          }}>
            {t.missionTitle}
          </h2>
          <p style={{
            fontSize: isMobile ? '17px' : '19px',
            color: c.textMuted,
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto 60px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.missionDesc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              { icon: '🎯', title: t.culturalRelevance, desc: t.culturalDesc },
              { icon: '📖', title: t.literacyDev, desc: t.literacyDesc },
              { icon: '✨', title: t.creativeExp, desc: t.creativeDesc },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                backgroundColor: c.bgCard,
                borderRadius: '20px',
                border: `1px solid ${c.border}`,
                boxShadow: `0 4px 20px ${c.shadow}`,
                transition: 'all 0.3s',
                cursor: 'default'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '20px'
                }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: c.text,
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>{item.title}</h3>
                <p style={{
                  fontSize: '15px',
                  color: c.textMuted,
                  lineHeight: '1.7',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        backgroundColor: c.bgAlt,
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: '100px',
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              color: c.primary,
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>
              {t.howBadge}
            </div>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '800',
              color: c.text,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
              lineHeight: '1.2'
            }}>
              {t.howTitle}
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {[
              { num: '01', title: t.step1Title, desc: t.step1Desc, color: c.primary },
              { num: '02', title: t.step2Title, desc: t.step2Desc, color: c.primaryLight },
              { num: '03', title: t.step3Title, desc: t.step3Desc, color: c.secondary },
              { num: '04', title: t.step4Title, desc: t.step4Desc, color: c.accent },
            ].map((step, i) => (
              <div key={i} style={{
                padding: '32px 24px',
                backgroundColor: c.bgCard,
                borderRadius: '20px',
                border: `1px solid ${c.border}`,
                boxShadow: `0 4px 20px ${c.shadow}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '18px',
                  marginBottom: '20px',
                  boxShadow: `0 8px 24px ${step.color}30`
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: c.text,
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '14px',
                  color: c.textMuted,
                  lineHeight: '1.7',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: '100px',
              background: `${c.primary}10`,
              border: `1px solid ${c.primary}20`,
              color: c.primary,
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>
              {t.featuresBadge}
            </div>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '800',
              color: c.text,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
              lineHeight: '1.2'
            }}>
              {t.featuresTitle}
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {[
              { icon: '🤖', title: t.feature1Title, desc: t.feature1Desc },
              { icon: '🤝', title: t.feature2Title, desc: t.feature2Desc },
              { icon: '🎮', title: t.feature3Title, desc: t.feature3Desc },
              { icon: '🎬', title: t.feature4Title, desc: t.feature4Desc },
              { icon: '🕌', title: t.feature5Title, desc: t.feature5Desc },
              { icon: '🏆', title: t.feature6Title, desc: t.feature6Desc },
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '28px 24px',
                backgroundColor: c.bgCard,
                borderRadius: '16px',
                border: `1px solid ${c.border}`,
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                boxShadow: `0 2px 12px ${c.shadow}`
              }}>
                <div style={{
                  fontSize: '32px',
                  flexShrink: 0
                }}>{feature.icon}</div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: c.text,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}>{feature.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: c.textMuted,
                    lineHeight: '1.6',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        backgroundColor: c.bgAlt,
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '48px' : '80px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '100px',
                background: `${c.primary}10`,
                border: `1px solid ${c.primary}20`,
                color: c.primary,
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.impactBadge}
              </div>
              <h2 style={{
                fontSize: isMobile ? '32px' : '44px',
                fontWeight: '800',
                marginBottom: '24px',
                color: c.text,
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                lineHeight: '1.2'
              }}>
                {t.impactTitle}
              </h2>
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: c.textMuted,
                lineHeight: '1.8',
                marginBottom: '36px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.impactDesc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { num: '3,000+', label: isRTL ? 'قصة' : 'Stories' },
                  { num: '500+', label: isRTL ? 'مؤلف' : 'Authors' },
                  { num: '8', label: isRTL ? 'عوالم' : 'Worlds' },
                  { num: '95%', label: isRTL ? 'رضا' : 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '24px',
                    backgroundColor: c.bgCard,
                    borderRadius: '16px',
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 2px 12px ${c.shadow}`
                  }}>
                    <div style={{
                      fontSize: isMobile ? '28px' : '36px',
                      fontWeight: '800',
                      background: c.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '4px'
                    }}>{stat.num}</div>
                    <div style={{
                      fontSize: '14px',
                      color: c.textMuted,
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              flex: 1,
              width: '100%',
              backgroundColor: c.bgCard,
              borderRadius: '24px',
              padding: isMobile ? '28px' : '36px',
              border: `1px solid ${c.border}`,
              boxShadow: `0 4px 20px ${c.shadow}`
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '24px',
                color: c.text,
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.parentsSay}
              </h3>
              {[
                { text: t.quote1, author: t.quote1Author },
                { text: t.quote2, author: t.quote2Author },
              ].map((quote, i) => (
                <div key={i} style={{
                  padding: '20px',
                  backgroundColor: c.bgAlt,
                  borderRadius: '16px',
                  marginBottom: i < 1 ? '16px' : 0,
                  border: `1px solid ${c.borderLight}`
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: c.text,
                    lineHeight: '1.8',
                    marginBottom: '12px',
                    fontStyle: 'italic',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}>
                    {quote.text}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: c.textMuted,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}>— {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section with Gold accent */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(0,108,53,0.05), rgba(201,162,39,0.08))'
              : 'linear-gradient(135deg, rgba(0,108,53,0.15), rgba(201,162,39,0.1))',
            borderRadius: '32px',
            padding: isMobile ? '40px 24px' : '64px 48px',
            border: `1px solid ${c.accent}30`,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative corner patterns */}
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle at top right, ${c.accent}20 0%, transparent 70%)`,
              borderRadius: '0 32px 0 0'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle at bottom left, ${c.primary}15 0%, transparent 70%)`,
              borderRadius: '0 0 0 32px'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '100px',
                background: `${c.accent}20`,
                border: `1px solid ${c.accent}40`,
                color: theme === 'light' ? '#8B6914' : c.accent,
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                💎 {t.investBadge}
              </div>

              <h2 style={{
                fontSize: isMobile ? '28px' : '40px',
                fontWeight: '800',
                marginBottom: '20px',
                color: c.text,
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                lineHeight: '1.2'
              }}>
                {t.investTitle}
              </h2>

              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: c.textMuted,
                lineHeight: '1.8',
                maxWidth: '700px',
                margin: '0 auto 40px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.investDesc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {[
                  { num: t.marketSize, label: t.marketLabel },
                  { num: t.growthRate, label: t.growthLabel },
                  { num: t.targetUsers, label: t.targetLabel },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '24px',
                    backgroundColor: c.bgCard,
                    borderRadius: '16px',
                    border: `1px solid ${c.border}`,
                    boxShadow: `0 2px 12px ${c.shadow}`
                  }}>
                    <div style={{
                      fontSize: isMobile ? '32px' : '40px',
                      fontWeight: '800',
                      color: theme === 'light' ? '#8B6914' : c.accent,
                      marginBottom: '8px'
                    }}>{item.num}</div>
                    <div style={{
                      fontSize: '14px',
                      color: c.textMuted,
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <button
                style={{
                  padding: '18px 40px',
                  fontSize: '17px',
                  fontWeight: '700',
                  color: theme === 'light' ? '#fff' : '#000',
                  background: c.gradientGold,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  boxShadow: `0 8px 32px ${c.accent}30`,
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.learnMore} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Saudi Green */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        background: c.gradient,
        textAlign: 'center',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '20px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
            lineHeight: '1.2'
          }}>
            {t.ctaTitle}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '19px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '40px',
            lineHeight: '1.7',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.ctaDesc}
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '20px 48px',
              fontSize: '18px',
              fontWeight: '700',
              color: c.primary,
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            {t.ctaButton} →
          </button>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            marginTop: '20px',
            fontSize: '14px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.ctaNote}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        padding: isMobile ? '40px 24px' : '60px 24px',
        backgroundColor: theme === 'light' ? '#F5F0E6' : '#050805',
        borderTop: `1px solid ${c.border}`,
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: c.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>R</div>
            <span style={{
              fontSize: '22px',
              fontWeight: '700',
              color: c.text,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>{isRTL ? 'راوي' : 'Rawy'}</span>
          </div>

          <div style={{
            display: 'flex',
            gap: isMobile ? '20px' : '32px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <a href="#" style={{
              color: c.textMuted,
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>{t.privacy}</a>
            <a href="#" style={{
              color: c.textMuted,
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>{t.terms}</a>
            <a href="#" style={{
              color: c.textMuted,
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>{t.contact}</a>
          </div>

          <div style={{ textAlign: isMobile ? 'center' : 'right' }}>
            <p style={{
              color: c.primary,
              fontSize: '13px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
              marginBottom: '4px',
              fontWeight: '500'
            }}>{t.madeIn}</p>
            <p style={{
              color: c.textLight,
              fontSize: '12px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>{t.copyright}</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
