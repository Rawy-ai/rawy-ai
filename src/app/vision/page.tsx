'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage, saveTheme, saveLang } from '@/lib/theme';
import Header from '@/components/Header';

// Translations
const translations = {
  en: {
    home: 'Home',
    forKids: 'For Kids',
    tryStudio: 'Try Story Studio',
    badge: 'For Parents, Educators & Officials',
    heroTitle1: 'Our Vision for the Future of',
    heroTitle2: 'Arabic Storytelling',
    heroDesc: 'Rawy is building the next generation of Arab storytellers through AI-powered, culturally authentic creative tools that empower children to become authors.',
    whyTitle: 'Why We Built Rawy',
    problemTitle: 'The Problem We\'re Solving',
    problemDesc: 'Arab children today are increasingly consuming content in English, leading to a disconnect from their cultural heritage and native language. Meanwhile, traditional Arabic content often fails to engage modern youth who have grown up with interactive, personalized digital experiences.',
    solutionTitle: 'Our Solution',
    solutionDesc: 'Rawy transforms children from passive consumers into active creators. Using AI technology, we enable kids ages 9-15 to design their own characters, worlds, and adventures — then generate personalized Arabic stories with their name as the author. This approach builds literacy, creativity, and cultural pride simultaneously.',
    visionBadge: '🇸🇦 Saudi Vision 2030 Aligned',
    buildingVibrant: 'Building a Vibrant Society',
    visionDesc: "Rawy directly supports Saudi Vision 2030's goal of building a vibrant society by preserving Arabic language and culture, fostering creativity in youth, and developing local content for Arab families.",
    keyMetrics: 'Key Impact Metrics',
    educationalTitle: 'Educational Benefits',
    educationalDesc: 'Research-backed benefits of creative storytelling for youth development',
    safetyTitle: 'Safety & Values',
    safetyDesc: 'Parent-approved content with built-in safeguards',
    getInTouch: 'Get in Touch',
    contactDesc: "We'd love to hear from parents, educators, and officials interested in Rawy. Whether you have questions, feedback, or partnership opportunities, please reach out.",
    email: 'Email',
    location: 'Location',
    riyadh: 'Riyadh, Saudi Arabia',
    tryWithChild: 'Try Rawy With Your Child →',
    footer: '© 2026 Rawy. Made for Arab Families.',
    madeInSaudi: 'Made with ♥ in Saudi Arabia',
  },
  ar: {
    home: 'الرئيسية',
    forKids: 'للأطفال',
    tryStudio: 'جرب استوديو القصص',
    badge: 'للآباء والمعلمين والمسؤولين',
    heroTitle1: 'رؤيتنا لمستقبل',
    heroTitle2: 'القصص العربية',
    heroDesc: 'راوي تبني الجيل القادم من الرواة العرب من خلال أدوات إبداعية مدعومة بالذكاء الاصطناعي، أصيلة ثقافياً وتمكّن الأطفال ليصبحوا مؤلفين.',
    whyTitle: 'لماذا بنينا راوي',
    problemTitle: 'المشكلة التي نحلها',
    problemDesc: 'الأطفال العرب اليوم يستهلكون محتوى بالإنجليزية بشكل متزايد، مما يؤدي إلى انفصالهم عن تراثهم الثقافي ولغتهم الأم. في الوقت نفسه، المحتوى العربي التقليدي غالباً لا يجذب الشباب الحديث الذين نشأوا مع تجارب رقمية تفاعلية ومخصصة.',
    solutionTitle: 'حلنا',
    solutionDesc: 'راوي تحول الأطفال من مستهلكين سلبيين إلى مبدعين نشطين. باستخدام تقنية الذكاء الاصطناعي، نمكّن الأطفال من سن 9-15 من تصميم شخصياتهم وعوالمهم ومغامراتهم — ثم توليد قصص عربية مخصصة باسمهم كمؤلف.',
    visionBadge: '🇸🇦 متوافق مع رؤية 2030',
    buildingVibrant: 'بناء مجتمع حيوي',
    visionDesc: 'راوي تدعم مباشرة هدف رؤية السعودية 2030 في بناء مجتمع حيوي من خلال الحفاظ على اللغة والثقافة العربية، وتعزيز الإبداع لدى الشباب، وتطوير محتوى محلي للعائلات العربية.',
    keyMetrics: 'مقاييس التأثير الرئيسية',
    educationalTitle: 'الفوائد التعليمية',
    educationalDesc: 'فوائد مدعومة بالبحث للقصص الإبداعية في تنمية الشباب',
    safetyTitle: 'السلامة والقيم',
    safetyDesc: 'محتوى معتمد من الآباء مع ضمانات مدمجة',
    getInTouch: 'تواصل معنا',
    contactDesc: 'نود أن نسمع من الآباء والمعلمين والمسؤولين المهتمين براوي. سواء لديكم أسئلة أو ملاحظات أو فرص شراكة، يرجى التواصل معنا.',
    email: 'البريد الإلكتروني',
    location: 'الموقع',
    riyadh: 'الرياض، المملكة العربية السعودية',
    tryWithChild: 'جرب راوي مع طفلك ←',
    footer: '© 2026 راوي. صُنع للعائلات العربية.',
    madeInSaudi: 'صُنع بـ ♥ في السعودية',
  }
};

const getVisionPoints = (lang: Language) => [
  { icon: '📚', text: lang === 'en' ? 'Promoting Arabic literacy among youth' : 'تعزيز محو الأمية العربية بين الشباب' },
  { icon: '🎨', text: lang === 'en' ? 'Nurturing creativity and self-expression' : 'رعاية الإبداع والتعبير عن الذات' },
  { icon: '🕌', text: lang === 'en' ? 'Content aligned with Islamic values' : 'محتوى متوافق مع القيم الإسلامية' },
  { icon: '💡', text: lang === 'en' ? 'Developing local tech solutions' : 'تطوير حلول تقنية محلية' },
];

const getStats = (lang: Language) => [
  { num: '3,000+', label: lang === 'en' ? 'Stories Created' : 'قصة تم إنشاؤها' },
  { num: '500+', label: lang === 'en' ? 'Active Young Authors' : 'مؤلف صغير نشط' },
  { num: '95%', label: lang === 'en' ? 'Parent Approval Rate' : 'نسبة موافقة الآباء' },
  { num: '8', label: lang === 'en' ? 'Unique Story Worlds' : 'عوالم قصص فريدة' },
];

const getEducationalBenefits = (lang: Language) => [
  { title: lang === 'en' ? 'Literacy Development' : 'تطوير محو الأمية', desc: lang === 'en' ? 'Active story creation builds reading comprehension, vocabulary, and writing skills faster than passive consumption.' : 'إنشاء القصص النشط يبني الفهم القرائي والمفردات ومهارات الكتابة أسرع من الاستهلاك السلبي.', icon: '📖' },
  { title: lang === 'en' ? 'Creative Thinking' : 'التفكير الإبداعي', desc: lang === 'en' ? 'Designing characters and plots exercises creative problem-solving and imagination in structured ways.' : 'تصميم الشخصيات والحبكات يمارس حل المشكلات الإبداعي والخيال بطرق منظمة.', icon: '💡' },
  { title: lang === 'en' ? 'Cultural Identity' : 'الهوية الثقافية', desc: lang === 'en' ? 'Seeing themselves as heroes in Arabic stories strengthens cultural connection and pride.' : 'رؤية أنفسهم كأبطال في قصص عربية يعزز الارتباط الثقافي والفخر.', icon: '🌍' },
  { title: lang === 'en' ? 'Self-Expression' : 'التعبير عن الذات', desc: lang === 'en' ? 'Creating stories provides a safe outlet for emotions and ideas, building confidence.' : 'إنشاء القصص يوفر منفذاً آمناً للمشاعر والأفكار، ويبني الثقة.', icon: '🎭' },
  { title: lang === 'en' ? 'Digital Literacy' : 'محو الأمية الرقمية', desc: lang === 'en' ? 'Using AI tools responsibly teaches children to be creators, not just consumers of technology.' : 'استخدام أدوات الذكاء الاصطناعي بمسؤولية يعلم الأطفال أن يكونوا مبدعين، وليس مستهلكين فقط.', icon: '💻' },
  { title: lang === 'en' ? 'Social Skills' : 'المهارات الاجتماعية', desc: lang === 'en' ? 'Sharing stories with friends builds communication skills and positive social interactions.' : 'مشاركة القصص مع الأصدقاء يبني مهارات التواصل والتفاعلات الاجتماعية الإيجابية.', icon: '🤝' },
];

const getSafetyFeatures = (lang: Language) => [
  { title: lang === 'en' ? 'Age-Appropriate Content' : 'محتوى مناسب للعمر', desc: lang === 'en' ? 'All stories are designed for ages 9-15 with appropriate themes and complexity.' : 'جميع القصص مصممة للأعمار 9-15 مع مواضيع وتعقيد مناسب.', icon: '👶' },
  { title: lang === 'en' ? 'Values-Aligned' : 'متوافق مع القيم', desc: lang === 'en' ? 'Content reflects Islamic values and Arab cultural norms. No harmful or inappropriate elements.' : 'المحتوى يعكس القيم الإسلامية والأعراف الثقافية العربية. لا عناصر ضارة أو غير مناسبة.', icon: '🕌' },
  { title: lang === 'en' ? 'No Personal Data Collection' : 'لا جمع بيانات شخصية', desc: lang === 'en' ? 'We only collect minimal account information. Stories are private by default.' : 'نجمع معلومات الحساب الضرورية فقط. القصص خاصة بشكل افتراضي.', icon: '🔒' },
  { title: lang === 'en' ? 'Parent Controls' : 'تحكم الوالدين', desc: lang === 'en' ? 'Parents can review story history and manage account settings at any time.' : 'يمكن للآباء مراجعة سجل القصص وإدارة إعدادات الحساب في أي وقت.', icon: '👨‍👩‍👧' },
];

export default function VisionPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');

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

  const handleGetStarted = () => {
    const user = localStorage.getItem('rawy_user');
    if (user) {
      router.push('/demo');
    } else {
      router.push('/login');
    }
  };

  const visionPoints = getVisionPoints(lang);
  const stats = getStats(lang);
  const educationalBenefits = getEducationalBenefits(lang);
  const safetyFeatures = getSafetyFeatures(lang);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: c.bg, color: c.text }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <Header
        theme={theme}
        lang={lang}
        onThemeChange={setTheme}
        onLangChange={setLang}
      />

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        background: theme === 'dark'
          ? 'linear-gradient(180deg, #0D2818 0%, #0A0F0A 100%)'
          : `linear-gradient(180deg, ${c.bgAlt} 0%, ${c.bg} 100%)`
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            backgroundColor: `${c.primary}15`,
            color: c.primary,
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.badge}
          </div>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '24px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.heroTitle1}<br />
            <span style={{ color: c.primary }}>{t.heroTitle2}</span>
          </h1>

          <p style={{
            fontSize: '20px',
            color: c.textMuted,
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Why We Built This */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', textAlign: 'center', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.whyTitle}
          </h2>

          <div style={{ display: 'grid', gap: '32px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: c.bgAlt,
              borderRadius: '20px',
              border: `1px solid ${c.border}`
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: c.primary, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.problemTitle}
              </h3>
              <p style={{ fontSize: '17px', color: c.textMuted, lineHeight: '1.8', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.problemDesc}
              </p>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: c.bgAlt,
              borderRadius: '20px',
              border: `1px solid ${c.border}`
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: c.primary, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.solutionTitle}
              </h3>
              <p style={{ fontSize: '17px', color: c.textMuted, lineHeight: '1.8', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.solutionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alignment with Saudi Vision 2030 */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bgAlt }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '100px',
                backgroundColor: `${c.primary}15`,
                color: c.primary,
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '20px',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
              }}>
                {t.visionBadge}
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.buildingVibrant}
              </h2>
              <p style={{ fontSize: '17px', color: c.textMuted, lineHeight: '1.8', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.visionDesc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {visionPoints.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ fontSize: '16px', color: c.text, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '40px',
              backgroundColor: c.bgCard,
              borderRadius: '24px',
              boxShadow: `0 10px 40px ${c.shadow}`,
              border: `1px solid ${c.border}`
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.keyMetrics}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    backgroundColor: c.bgAlt,
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: c.primary }}>{stat.num}</div>
                    <div style={{ fontSize: '13px', color: c.textMuted, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bg }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', textAlign: 'center', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.educationalTitle}
          </h2>
          <p style={{ textAlign: 'center', color: c.textMuted, marginBottom: '48px', fontSize: '18px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.educationalDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {educationalBenefits.map((item, i) => (
              <div key={i} style={{
                padding: '28px',
                backgroundColor: c.bgAlt,
                borderRadius: '16px',
                border: `1px solid ${c.border}`
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: c.textMuted, lineHeight: '1.6', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Values */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bgAlt }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', textAlign: 'center', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.safetyTitle}
          </h2>
          <p style={{ textAlign: 'center', color: c.textMuted, marginBottom: '48px', fontSize: '18px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.safetyDesc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {safetyFeatures.map((item, i) => (
              <div key={i} style={{
                padding: '28px',
                backgroundColor: c.bgCard,
                borderRadius: '16px',
                border: `1px solid ${c.border}`
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: c.textMuted, lineHeight: '1.6', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Contact */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bg }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.getInTouch}
          </h2>
          <p style={{ fontSize: '18px', color: c.textMuted, lineHeight: '1.7', marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.contactDesc}
          </p>

          <div style={{
            padding: '32px',
            backgroundColor: c.bgAlt,
            borderRadius: '20px',
            marginBottom: '32px',
            border: `1px solid ${c.border}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '14px', color: c.textLight, marginBottom: '4px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.email}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: c.primary }}>hello@rawy.ai</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: c.textLight, marginBottom: '4px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.location}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: c.text, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.riyadh}</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            style={{
              padding: '18px 40px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              background: c.gradient,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${c.shadow}`,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            {t.tryWithChild}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 24px', backgroundColor: theme === 'dark' ? c.bgAlt : c.bg, borderTop: `1px solid ${c.border}` }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: c.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>R</div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: c.text, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {isRTL ? 'راوي' : 'Rawy'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link href="/" style={{ color: c.textMuted, textDecoration: 'none', fontSize: '14px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.home}</Link>
            <Link href="/for-kids" style={{ color: c.textMuted, textDecoration: 'none', fontSize: '14px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.forKids}</Link>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: c.textMuted, fontSize: '13px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.footer}</p>
            <p style={{ color: c.primary, fontSize: '12px', marginTop: '4px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.madeInSaudi}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
