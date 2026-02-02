'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage, saveTheme, saveLang } from '@/lib/theme';
import Header from '@/components/Header';

// Translations
const translations = {
  en: {
    forParents: 'For Parents',
    startCreating: 'Start Creating! ✨',
    greeting: '👋 Hey there, future author!',
    heroTitle1: 'Create Your Own',
    heroTitle2: 'Epic Arabic Story',
    heroDesc: 'Design your hero, pick a world, choose your powers — and watch your imagination come to life! Your name goes on every story you create. 📖✨',
    letsGo: "Let's Go! Create My Story 🚀",
    whatYouCanDo: 'What You Can Do 🎮',
    exploreWorlds: 'Explore Amazing Worlds 🌍',
    exploreWorldsDesc: 'Choose where your adventure takes place!',
    pickPower: '⚡ Pick Your Power',
    chooseCompanion: '🤝 Choose Your Companion',
    seeWhatYouCanCreate: 'See What You Can Create! 📖',
    readyToBecome: 'Ready to Become',
    anAuthor: 'an Author?',
    itOnlyTakes: "It only takes a few minutes to create your first story. Your adventure is waiting!",
    createMyFirst: 'Create My First Story! 🎉',
    home: 'Home',
    madeForYoung: '© 2026 Rawy. Made for Young Storytellers 💚',
  },
  ar: {
    forParents: 'للآباء',
    startCreating: 'ابدأ الإنشاء! ✨',
    greeting: '👋 مرحباً، أيها المؤلف المستقبلي!',
    heroTitle1: 'أنشئ قصتك',
    heroTitle2: 'العربية الملحمية',
    heroDesc: 'صمم بطلك، اختر عالماً، حدد قواك — وشاهد خيالك يتحول لحقيقة! اسمك على كل قصة تكتبها. 📖✨',
    letsGo: 'هيا بنا! أنشئ قصتي 🚀',
    whatYouCanDo: 'ماذا يمكنك أن تفعل 🎮',
    exploreWorlds: 'استكشف عوالم مذهلة 🌍',
    exploreWorldsDesc: 'اختر أين تدور مغامرتك!',
    pickPower: '⚡ اختر قوتك',
    chooseCompanion: '🤝 اختر رفيقك',
    seeWhatYouCanCreate: 'شاهد ما يمكنك إنشاؤه! 📖',
    readyToBecome: 'مستعد لتصبح',
    anAuthor: 'مؤلفاً؟',
    itOnlyTakes: 'يستغرق الأمر دقائق فقط لإنشاء قصتك الأولى. مغامرتك في انتظارك!',
    createMyFirst: 'أنشئ قصتي الأولى! 🎉',
    home: 'الرئيسية',
    madeForYoung: '© 2026 راوي. صُنع للمؤلفين الصغار 💚',
  }
};

const getFeatures = (lang: Language) => [
  { emoji: '🦸', title: lang === 'en' ? 'Create Your Hero' : 'أنشئ بطلك', desc: lang === 'en' ? 'Give them a name, personality, and special powers. They can be brave, clever, funny, or kind!' : 'امنحهم اسماً وشخصية وقوى خاصة. يمكن أن يكونوا شجعاناً أو أذكياء أو مرحين أو طيبين!' },
  { emoji: '🌍', title: lang === 'en' ? 'Pick Your World' : 'اختر عالمك', desc: lang === 'en' ? 'Choose where your adventure happens — from space stations to magical forests!' : 'اختر أين تدور مغامرتك — من محطات الفضاء إلى الغابات السحرية!' },
  { emoji: '🤝', title: lang === 'en' ? 'Choose a Companion' : 'اختر رفيقاً', desc: lang === 'en' ? 'Every hero needs a friend! Pick a dragon, robot, wolf, or phoenix to join you.' : 'كل بطل يحتاج صديقاً! اختر تنيناً أو روبوتاً أو ذئباً أو طائر الفينيق.' },
  { emoji: '⚔️', title: lang === 'en' ? 'Set the Quest' : 'حدد المهمة', desc: lang === 'en' ? "Decide what challenge your hero will face. Find treasure? Save someone? Solve a mystery?" : 'قرر أي تحدٍ سيواجهه بطلك. إيجاد كنز؟ إنقاذ شخص؟ حل لغز؟' },
  { emoji: '📖', title: lang === 'en' ? 'Get Your Story' : 'احصل على قصتك', desc: lang === 'en' ? 'Our AI writes an amazing Arabic story with your hero at the center!' : 'الذكاء الاصطناعي يكتب قصة عربية رائعة وبطلك في المركز!' },
  { emoji: '📤', title: lang === 'en' ? 'Share With Friends' : 'شاركها مع أصدقائك', desc: lang === 'en' ? 'Share a cliffhanger teaser to hook your friends and make them want to read more!' : 'شارك تشويقة مثيرة لجذب أصدقائك وجعلهم يريدون قراءة المزيد!' },
];

const getStoryWorlds = (lang: Language) => [
  { emoji: '🏜️', name: lang === 'en' ? 'Desert Kingdom' : 'مملكة الصحراء', desc: lang === 'en' ? 'Ancient mysteries in golden sands' : 'أسرار قديمة في الرمال الذهبية' },
  { emoji: '🚀', name: lang === 'en' ? 'Space Station' : 'محطة فضائية', desc: lang === 'en' ? 'Adventures among the stars' : 'مغامرات بين النجوم' },
  { emoji: '🌊', name: lang === 'en' ? 'Underwater City' : 'مدينة تحت الماء', desc: lang === 'en' ? 'Secrets of the deep ocean' : 'أسرار أعماق المحيط' },
  { emoji: '🌲', name: lang === 'en' ? 'Magical Forest' : 'غابة سحرية', desc: lang === 'en' ? 'Enchanted creatures await' : 'مخلوقات ساحرة في انتظارك' },
  { emoji: '🌆', name: lang === 'en' ? 'Future City' : 'مدينة المستقبل', desc: lang === 'en' ? 'Tech wonders of tomorrow' : 'عجائب تقنية الغد' },
  { emoji: '🏛️', name: lang === 'en' ? 'Ancient Ruins' : 'آثار قديمة', desc: lang === 'en' ? 'Lost civilizations to explore' : 'حضارات مفقودة للاستكشاف' },
];

const getPowers = (lang: Language) => [
  { emoji: '⚡', name: lang === 'en' ? 'Super Speed' : 'سرعة خارقة' },
  { emoji: '👻', name: lang === 'en' ? 'Invisibility' : 'الاختفاء' },
  { emoji: '🦅', name: lang === 'en' ? 'Flying' : 'الطيران' },
  { emoji: '🧠', name: lang === 'en' ? 'Mind Reading' : 'قراءة الأفكار' },
  { emoji: '⏰', name: lang === 'en' ? 'Time Control' : 'التحكم بالزمن' },
  { emoji: '💪', name: lang === 'en' ? 'Super Strength' : 'قوة خارقة' },
];

const getCompanions = (lang: Language) => [
  { emoji: '🤖', name: lang === 'en' ? 'Robot' : 'روبوت' },
  { emoji: '🐉', name: lang === 'en' ? 'Dragon' : 'تنين' },
  { emoji: '🐺', name: lang === 'en' ? 'Wolf' : 'ذئب' },
  { emoji: '🔥', name: lang === 'en' ? 'Phoenix' : 'فينيق' },
];

export default function ForKidsPage() {
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

  const handleStartCreating = () => {
    const user = localStorage.getItem('rawy_user');
    if (user) {
      router.push('/demo');
    } else {
      router.push('/login');
    }
  };

  const features = getFeatures(lang);
  const storyWorlds = getStoryWorlds(lang);
  const powers = getPowers(lang);
  const companions = getCompanions(lang);

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
        textAlign: 'center',
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at top, #0D2818 0%, #0A0F0A 70%)'
          : `radial-gradient(ellipse at top, ${c.bgAlt} 0%, ${c.bg} 70%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating emojis background */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '48px', opacity: 0.2 }}>📚</div>
        <div style={{ position: 'absolute', top: '30%', right: '15%', fontSize: '40px', opacity: 0.2 }}>✨</div>
        <div style={{ position: 'absolute', bottom: '20%', left: '20%', fontSize: '36px', opacity: 0.2 }}>🚀</div>
        <div style={{ position: 'absolute', bottom: '30%', right: '10%', fontSize: '44px', opacity: 0.2 }}>🐉</div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '100px',
            background: `${c.primary}15`,
            border: `1px solid ${c.primary}30`,
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '24px',
            color: c.primary,
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.greeting}
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.heroTitle1}<br />
            <span style={{
              background: c.gradientGold,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{t.heroTitle2}</span>
          </h1>

          <p style={{
            fontSize: '20px',
            color: c.textMuted,
            lineHeight: '1.6',
            marginBottom: '40px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.heroDesc}
          </p>

          <button
            onClick={handleStartCreating}
            style={{
              padding: '20px 48px',
              fontSize: '20px',
              fontWeight: '800',
              color: theme === 'dark' ? '#0A0F0A' : '#fff',
              background: c.gradientGold,
              border: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              boxShadow: `0 8px 30px ${c.accent}40`,
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            {t.letsGo}
          </button>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bgAlt }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '48px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.whatYouCanDo}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {features.map((item, i) => (
              <div key={i} style={{
                padding: '28px',
                backgroundColor: c.bgCard,
                borderRadius: '20px',
                border: `1px solid ${c.border}`
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: c.textMuted, lineHeight: '1.6', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Worlds Section */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bg }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.exploreWorlds}
          </h2>
          <p style={{ textAlign: 'center', color: c.textMuted, marginBottom: '48px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.exploreWorldsDesc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px'
          }}>
            {storyWorlds.map((world, i) => (
              <div key={i} style={{
                padding: '24px',
                backgroundColor: `${c.primary}10`,
                borderRadius: '20px',
                border: `1px solid ${c.primary}20`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{world.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{world.name}</h3>
                <p style={{ fontSize: '12px', color: c.textMuted, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{world.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Powers & Companions */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bgAlt }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            {/* Powers */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.pickPower}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {powers.map((power, i) => (
                  <div key={i} style={{
                    padding: '16px 24px',
                    backgroundColor: `${c.accent}15`,
                    borderRadius: '100px',
                    border: `1px solid ${c.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{power.emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{power.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Companions */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.chooseCompanion}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {companions.map((comp, i) => (
                  <div key={i} style={{
                    padding: '20px 32px',
                    backgroundColor: `${c.primary}15`,
                    borderRadius: '16px',
                    border: `1px solid ${c.primary}25`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '32px' }}>{comp.emoji}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{comp.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Story Preview */}
      <section style={{ padding: '80px 24px', backgroundColor: c.bg }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '32px',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
          }}>
            {t.seeWhatYouCanCreate}
          </h2>

          <div style={{
            backgroundColor: c.bgCard,
            borderRadius: '24px',
            padding: '32px',
            border: `1px solid ${c.border}`
          }} dir="rtl">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span style={{ padding: '6px 14px', borderRadius: '100px', backgroundColor: `${c.primary}15`, fontSize: '13px', color: c.primary }}>🏜️ مملكة الصحراء</span>
              <span style={{ padding: '6px 14px', borderRadius: '100px', backgroundColor: `${c.accent}15`, fontSize: '13px', color: c.accent }}>⚡ سرعة خارقة</span>
            </div>

            <p style={{
              fontFamily: 'Tajawal, sans-serif',
              fontSize: '18px',
              lineHeight: '2.2',
              color: c.textMuted
            }}>
              🏜️ في قلب مملكة الصحراء، كان سارة تقف أمام تحدٍ لم تواجهه من قبل. بجانبها تنين صغير 🐉، رفيق دربها الوفي.
              <br /><br />
              &quot;هل أنتِ مستعدة؟&quot; سألها رفيقها بصوت هامس.
              <br /><br />
              نظرت سارة إلى الأفق البعيد. كانت تعلم أن سرعتها الخارقة ستكون مفتاح هذه المغامرة...
            </p>

            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: `1px solid ${c.border}`,
              fontSize: '14px',
              color: c.primary,
              textAlign: 'left'
            }}>
              ✍️ بقلم: سارة أحمد
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '100px 24px',
        background: c.gradient,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀✨📚</div>
          <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '20px', color: '#fff', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.readyToBecome}<br />{t.anAuthor}
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
            {t.itOnlyTakes}
          </p>
          <button
            onClick={handleStartCreating}
            style={{
              padding: '22px 56px',
              fontSize: '20px',
              fontWeight: '800',
              color: c.primary,
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}
          >
            {t.createMyFirst}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', backgroundColor: c.bg, borderTop: `1px solid ${c.border}` }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: c.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>R</div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: c.text, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {isRTL ? 'راوي' : 'Rawy'}
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/" style={{ color: c.textMuted, textDecoration: 'none', fontSize: '14px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {t.home}
            </Link>
            <Link href="/vision" style={{ color: c.textMuted, textDecoration: 'none', fontSize: '14px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
              {t.forParents}
            </Link>
          </div>
          <p style={{ color: c.textLight, fontSize: '13px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{t.madeForYoung}</p>
        </div>
      </footer>
    </div>
  );
}
