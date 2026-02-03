'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage } from '@/lib/theme';
import {
  Sparkles, Users, BookOpen, Palette, Video, Shield, Trophy,
  ArrowRight, Play, Check, Target, Lightbulb, Globe, TrendingUp,
  Cpu, UserPlus, Layers, Film, Building, Award
} from 'lucide-react';

const translations = {
  en: {
    badge: 'AI-Powered Storytelling Platform',
    heroTitle1: 'Where Arab Children',
    heroTitle2: 'Become Authors',
    heroTitle3: 'of Their Own Stories',
    heroDesc: 'The first AI platform designed for Arab youth ages 9-15. Create culturally authentic Arabic stories with friends, build literacy skills, and celebrate your heritage.',
    openStudio: 'Open Story Studio',
    watchDemo: 'Watch Demo',
    storiesCreated: '3,000+ stories created',
    parentApproved: 'Parent approved',
    valuesAligned: 'Values-aligned',
    storyStudio: 'Story Studio',
    aiGenerated: 'AI Generated',
    activeAuthors: 'Active Young Authors',
    storiesGenerated: 'Stories Generated',
    countriesReached: 'Countries Reached',
    parentSatisfaction: 'Parent Satisfaction',

    // Collaborative Section
    collabBadge: 'Collaborative Storytelling',
    collabTitle: 'Build Stories Together with Friends',
    collabDesc: 'Rawy makes storytelling a social experience. Start your story, invite friends to add scenes, and create something amazing together.',
    collabStep1Title: 'Start Your Story',
    collabStep1Desc: 'Create your hero and write the opening scenes',
    collabStep2Title: 'Invite Friends',
    collabStep2Desc: 'Pass the story to friends to add their creative twists',
    collabStep3Title: 'Create Video Episodes',
    collabStep3Desc: 'Transform your collaborative story into an animated video',

    // Mission
    missionBadge: 'Our Mission',
    missionTitle: 'Preserving Arabic Heritage Through Modern Technology',
    missionDesc: 'We believe every Arab child should see themselves as heroes in stories that reflect their culture, values, and language.',
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

    // Investment
    investBadge: 'Investment Opportunity',
    investTitle: 'Join Us in Shaping the Future of Arab Storytelling',
    investDesc: 'Rawy is positioned to become the leading AI-powered content platform for Arab children. With a growing user base and strong unit economics, we seek strategic partners to scale across MENA.',
    marketSize: '$2.4B',
    marketLabel: 'MENA EdTech Market',
    growthRate: '18%',
    growthLabel: 'Annual Growth Rate',
    targetUsers: '50M+',
    targetLabel: 'Target Arabic-Speaking Children',
    learnMore: 'Learn More About Investment',

    // CTA
    ctaTitle: 'Ready to Inspire Young Authors?',
    ctaDesc: 'Join thousands of families using Rawy to nurture creativity and cultural pride. Free to try.',
    ctaButton: 'Open Story Studio — Free',
    ctaNote1: 'No signup required to try',
    ctaNote2: '5 free stories per day',
    ctaNote3: 'Safe for kids',
  },
  ar: {
    badge: 'منصة القصص بالذكاء الاصطناعي',
    heroTitle1: 'حيث يصبح الأطفال العرب',
    heroTitle2: 'مؤلفين',
    heroTitle3: 'لقصصهم الخاصة',
    heroDesc: 'أول منصة ذكاء اصطناعي مصممة للشباب العربي من 9-15 سنة. اكتب قصصاً عربية أصيلة مع أصدقائك وطوّر مهارات القراءة واحتفِ بتراثك.',
    openStudio: 'افتح استوديو القصص',
    watchDemo: 'شاهد العرض',
    storiesCreated: '+3,000 قصة',
    parentApproved: 'موافقة الوالدين',
    valuesAligned: 'متوافق مع القيم',
    storyStudio: 'استوديو القصص',
    aiGenerated: 'إنشاء الذكاء الاصطناعي',
    activeAuthors: 'مؤلف شاب نشط',
    storiesGenerated: 'قصة تم إنشاؤها',
    countriesReached: 'دولة',
    parentSatisfaction: 'رضا الوالدين',

    collabBadge: 'القصص التعاونية',
    collabTitle: 'ابنِ القصص مع أصدقائك',
    collabDesc: 'راوي يجعل كتابة القصص تجربة اجتماعية. ابدأ قصتك، ادعُ أصدقاءك لإضافة مشاهد، واصنعوا شيئاً مذهلاً معاً.',
    collabStep1Title: 'ابدأ قصتك',
    collabStep1Desc: 'أنشئ بطلك واكتب المشاهد الافتتاحية',
    collabStep2Title: 'ادعُ أصدقاءك',
    collabStep2Desc: 'مرر القصة لأصدقائك ليضيفوا لمساتهم الإبداعية',
    collabStep3Title: 'اصنع فيديو',
    collabStep3Desc: 'حوّل قصتكم التعاونية إلى فيديو متحرك',

    missionBadge: 'مهمتنا',
    missionTitle: 'الحفاظ على التراث العربي من خلال التكنولوجيا الحديثة',
    missionDesc: 'نؤمن بأن كل طفل عربي يستحق أن يرى نفسه بطلاً في قصص تعكس ثقافته وقيمه ولغته.',
    culturalRelevance: 'الصلة الثقافية',
    culturalDesc: 'قصص متجذرة في التراث العربي والقيم الإسلامية',
    literacyDev: 'تطوير القراءة',
    literacyDesc: 'محتوى عربي مناسب للعمر يبني مهارات القراءة',
    creativeExp: 'التعبير الإبداعي',
    creativeDesc: 'يصبح الأطفال مؤلفين، يبنون الثقة والإبداع',

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

    featuresBadge: 'لماذا راوي',
    featuresTitle: 'مصمم للجيل القادم من الكتّاب العرب',
    feature1Title: 'إنشاء بالذكاء الاصطناعي',
    feature1Desc: 'GPT-4 و DALL-E 3 ينشئان قصصاً ورسومات فريدة',
    feature2Title: 'قصص تعاونية',
    feature2Desc: 'يمكن للأطفال دعوة أصدقائهم لمواصلة القصص معاً',
    feature3Title: 'محتوى مناسب للعمر',
    feature3Desc: 'القصص تتكيف مع مستوى القراءة: مستكشف، مغامر، بطل',
    feature4Title: 'إنشاء الفيديو',
    feature4Desc: 'حوّل القصص إلى فيديوهات متحركة للمشاركة',
    feature5Title: 'الأصالة الثقافية',
    feature5Desc: 'كل قصة تحترم التراث العربي والقيم الإسلامية',
    feature6Title: 'التلعيب',
    feature6Desc: 'شارات ولوحات صدارة وتحديات تحافظ على التفاعل',

    investBadge: 'فرصة استثمارية',
    investTitle: 'انضم إلينا في تشكيل مستقبل القصص العربية',
    investDesc: 'راوي في موقع يؤهله ليصبح المنصة الرائدة للمحتوى بالذكاء الاصطناعي للأطفال العرب.',
    marketSize: '$2.4B',
    marketLabel: 'سوق التقنية التعليمية',
    growthRate: '18%',
    growthLabel: 'معدل النمو السنوي',
    targetUsers: '+50M',
    targetLabel: 'طفل ناطق بالعربية',
    learnMore: 'اعرف المزيد عن الاستثمار',

    ctaTitle: 'مستعد لإلهام المؤلفين الصغار؟',
    ctaDesc: 'انضم إلى آلاف العائلات التي تستخدم راوي لتنمية الإبداع والفخر الثقافي.',
    ctaButton: 'افتح استوديو القصص — مجاناً',
    ctaNote1: 'لا حاجة للتسجيل',
    ctaNote2: '5 قصص مجانية يومياً',
    ctaNote3: 'آمن للأطفال',
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

  const Badge = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      borderRadius: '100px',
      background: `${c.primary}10`,
      border: `1px solid ${c.primary}20`,
      color: c.primary,
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '24px',
      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
    }}>
      {children}
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontSize: isMobile ? '32px' : '48px',
      fontWeight: '800',
      color: c.text,
      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
      lineHeight: '1.2',
      marginBottom: '24px'
    }}>
      {children}
    </h2>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: c.bg,
      color: c.text,
      transition: 'background-color 0.3s, color 0.3s'
    }} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Background */}
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

      <Header theme={theme} lang={lang} onThemeChange={setTheme} onLangChange={setLang} showHowItWorks={true} />

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
              <Badge>
                <Sparkles size={16} />
                {t.badge}
              </Badge>

              <h1 style={{
                fontSize: isMobile ? '40px' : '58px',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '28px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
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

              <p style={{
                fontSize: isMobile ? '17px' : '19px',
                color: c.textMuted,
                lineHeight: '1.8',
                marginBottom: '36px',
                maxWidth: '520px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
              }}>
                {t.heroDesc}
              </p>

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
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {t.openStudio}
                  <ArrowRight size={20} />
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
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Play size={18} />
                  {t.watchDemo}
                </button>
              </div>

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
                      color: '#fff'
                    }}>
                      <Check size={12} />
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: c.textMuted,
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Preview */}
            <div style={{ flex: 1, width: '100%', position: 'relative' }}>
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
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <BookOpen size={18} />
                      {t.storyStudio}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    </div>
                  </div>

                  <div style={{
                    height: isMobile ? '160px' : '200px',
                    background: theme === 'light'
                      ? 'linear-gradient(135deg, #F5E6C8, #E8D4A8)'
                      : 'linear-gradient(135deg, #2A1F0A, #3D2A0F)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `${c.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Globe size={40} style={{ color: c.accent }} />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: theme === 'light' ? 'rgba(0,108,53,0.9)' : 'rgba(0,0,0,0.6)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Palette size={12} />
                      {t.aiGenerated}
                    </div>
                  </div>

                  <div style={{ padding: isMobile ? '20px' : '24px' }} dir="rtl">
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: `${c.primary}15`,
                        border: `1px solid ${c.primary}25`,
                        color: c.primary,
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Globe size={12} />
                        صحراء
                      </span>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: `${c.accent}20`,
                        border: `1px solid ${c.accent}30`,
                        color: theme === 'light' ? '#8B6914' : c.accent,
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Sparkles size={12} />
                        مغامرة
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'Tajawal, sans-serif',
                      fontSize: isMobile ? '15px' : '16px',
                      lineHeight: '2',
                      color: c.text
                    }}>
                      في أعماق الصحراء، وجد سالم نفسه أمام باب غامض منقوش عليه رموز قديمة...
                    </p>
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
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaborative Storytelling Section */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Badge>
              <Users size={16} />
              {t.collabBadge}
            </Badge>
            <SectionTitle>{t.collabTitle}</SectionTitle>
            <p style={{
              fontSize: isMobile ? '17px' : '19px',
              color: c.textMuted,
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}>
              {t.collabDesc}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              { icon: BookOpen, title: t.collabStep1Title, desc: t.collabStep1Desc, color: c.primary },
              { icon: UserPlus, title: t.collabStep2Title, desc: t.collabStep2Desc, color: c.secondary },
              { icon: Film, title: t.collabStep3Title, desc: t.collabStep3Desc, color: c.accent },
            ].map((step, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                backgroundColor: c.bgCard,
                borderRadius: '24px',
                border: `1px solid ${c.border}`,
                boxShadow: `0 4px 20px ${c.shadow}`,
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  border: `1px solid ${step.color}25`
                }}>
                  <step.icon size={32} style={{ color: step.color }} />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: c.text,
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '15px',
                  color: c.textMuted,
                  lineHeight: '1.7',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        backgroundColor: c.bgAlt,
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <Badge>{t.missionBadge}</Badge>
          <SectionTitle>{t.missionTitle}</SectionTitle>
          <p style={{
            fontSize: isMobile ? '17px' : '19px',
            color: c.textMuted,
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto 60px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
          }}>
            {t.missionDesc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {[
              { icon: Target, title: t.culturalRelevance, desc: t.culturalDesc },
              { icon: BookOpen, title: t.literacyDev, desc: t.literacyDesc },
              { icon: Lightbulb, title: t.creativeExp, desc: t.creativeDesc },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                backgroundColor: c.bgCard,
                borderRadius: '20px',
                border: `1px solid ${c.border}`,
                boxShadow: `0 4px 20px ${c.shadow}`
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `${c.primary}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <item.icon size={28} style={{ color: c.primary }} />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: c.text,
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}>{item.title}</h3>
                <p style={{
                  fontSize: '15px',
                  color: c.textMuted,
                  lineHeight: '1.7',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
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
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Badge>{t.howBadge}</Badge>
            <SectionTitle>{t.howTitle}</SectionTitle>
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
                boxShadow: `0 4px 20px ${c.shadow}`
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
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '14px',
                  color: c.textMuted,
                  lineHeight: '1.7',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
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
        backgroundColor: c.bgAlt,
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Badge>{t.featuresBadge}</Badge>
            <SectionTitle>{t.featuresTitle}</SectionTitle>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {[
              { icon: Cpu, title: t.feature1Title, desc: t.feature1Desc },
              { icon: Users, title: t.feature2Title, desc: t.feature2Desc },
              { icon: Layers, title: t.feature3Title, desc: t.feature3Desc },
              { icon: Video, title: t.feature4Title, desc: t.feature4Desc },
              { icon: Shield, title: t.feature5Title, desc: t.feature5Desc },
              { icon: Trophy, title: t.feature6Title, desc: t.feature6Desc },
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
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${c.primary}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <feature.icon size={24} style={{ color: c.primary }} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: c.text,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}>{feature.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: c.textMuted,
                    lineHeight: '1.6',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: c.bgCard,
            borderRadius: '32px',
            padding: isMobile ? '40px 24px' : '64px 48px',
            border: `1px solid ${c.border}`,
            boxShadow: `0 8px 40px ${c.shadow}`,
            textAlign: 'center'
          }}>
            <Badge>
              <TrendingUp size={16} />
              {t.investBadge}
            </Badge>
            <SectionTitle>{t.investTitle}</SectionTitle>
            <p style={{
              fontSize: isMobile ? '17px' : '19px',
              color: c.textMuted,
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto 48px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}>
              {t.investDesc}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px',
              marginBottom: '48px'
            }}>
              {[
                { value: t.marketSize, label: t.marketLabel, icon: Building },
                { value: t.growthRate, label: t.growthLabel, icon: TrendingUp },
                { value: t.targetUsers, label: t.targetLabel, icon: Users },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '28px',
                  backgroundColor: c.bgAlt,
                  borderRadius: '16px',
                  border: `1px solid ${c.border}`
                }}>
                  <stat.icon size={24} style={{ color: c.primary, marginBottom: '12px' }} />
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: c.primary,
                    marginBottom: '8px'
                  }}>{stat.value}</div>
                  <div style={{
                    fontSize: '14px',
                    color: c.textMuted,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="mailto:invest@rawy.ai" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: c.gradient,
              color: '#fff',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '17px',
              boxShadow: `0 8px 32px ${c.primary}30`,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}>
              {t.learnMore}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative',
        padding: isMobile ? '80px 24px' : '120px 24px',
        backgroundColor: c.bgAlt,
        zIndex: 1
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle>{t.ctaTitle}</SectionTitle>
          <p style={{
            fontSize: isMobile ? '17px' : '19px',
            color: c.textMuted,
            lineHeight: '1.8',
            marginBottom: '40px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
          }}>
            {t.ctaDesc}
          </p>

          <button
            onClick={handleGetStarted}
            style={{
              padding: '20px 48px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff',
              background: c.gradient,
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: `0 8px 32px ${c.primary}30`,
              marginBottom: '32px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Sparkles size={20} />
            {t.ctaButton}
          </button>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {[t.ctaNote1, t.ctaNote2, t.ctaNote3].map((note, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: c.textMuted,
                fontSize: '14px'
              }}>
                <Check size={16} style={{ color: c.primary }} />
                <span style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer theme={theme} lang={lang} onThemeChange={setTheme} />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        lang={lang}
        theme={theme}
      />
    </div>
  );
}
