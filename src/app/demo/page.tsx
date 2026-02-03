'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { themes, Theme, Language, getThemeFromStorage, getLangFromStorage, saveTheme, saveLang } from '@/lib/theme';
import Header from '@/components/Header';
import {
  Shield, Lightbulb, Smile, Heart, Search, Target, Zap, EyeOff, Dumbbell, Wind, Brain, Clock,
  Cpu, Flame, Moon, Sunrise, MessageCircle, Send, Sun, Rocket, Droplets, Trees, Building2, Landmark,
  Gem, LifeBuoy, Compass, Swords, Trophy, Sparkles, Star, ArrowRight, ArrowLeft, Copy, RefreshCw, Check
} from 'lucide-react';

// Icon mapping for dynamic rendering
const iconMap: { [key: string]: React.ComponentType<{ size?: number; style?: React.CSSProperties }> } = {
  shield: Shield, lightbulb: Lightbulb, smile: Smile, heart: Heart, search: Search, target: Target,
  zap: Zap, 'eye-off': EyeOff, dumbbell: Dumbbell, wind: Wind, brain: Brain, clock: Clock,
  cpu: Cpu, flame: Flame, moon: Moon, sunrise: Sunrise, 'message-circle': MessageCircle, send: Send,
  sun: Sun, rocket: Rocket, droplets: Droplets, trees: Trees, 'building-2': Building2, landmark: Landmark,
  gem: Gem, 'life-buoy': LifeBuoy, compass: Compass, swords: Swords, trophy: Trophy, sparkles: Sparkles,
  star: Star
};

type Step = 'author' | 'age' | 'hero' | 'gender' | 'personality' | 'power' | 'companion' | 'world' | 'quest' | 'custom' | 'loading' | 'story';
type AgeLevel = '9-10' | '11-12' | '13-15' | '';

interface StoryConfig {
  authorName: string;
  ageLevel: AgeLevel;
  heroName: string;
  gender: 'male' | 'female' | '';
  personality: string[];
  power: string;
  companion: string;
  world: string;
  quest: string;
  customPrompt: string;
}

// Age level descriptions for story generation
const ageLevelConfig = {
  '9-10': {
    en: { label: 'Explorer (9-10)', desc: 'Simple adventures with fun characters', icon: 'star' },
    ar: { label: 'مستكشف (9-10)', desc: 'مغامرات بسيطة مع شخصيات ممتعة', icon: 'star' }
  },
  '11-12': {
    en: { label: 'Adventurer (11-12)', desc: 'Exciting quests with more twists', icon: 'zap' },
    ar: { label: 'مغامر (11-12)', desc: 'مهام مثيرة مع المزيد من التشويق', icon: 'zap' }
  },
  '13-15': {
    en: { label: 'Champion (13-15)', desc: 'Complex stories with deeper themes', icon: 'flame' },
    ar: { label: 'بطل (13-15)', desc: 'قصص معقدة مع مواضيع أعمق', icon: 'flame' }
  }
};

interface StoryScene {
  text: string;
  imageUrl: string;
  userTweak: string;
}

// Translations
const translations = {
  en: {
    storyStudio: 'Story Studio',
    logout: 'Log out',
    step: 'Step',
    of: 'of',
    complete: 'complete',
    back: '← Back',
    continue: 'Continue →',
    createStory: 'Create My Story',

    authorTitle: 'Your Author Name',
    authorDesc: 'This will appear on every story you create',
    authorPlaceholder: 'Your name...',

    ageTitle: 'Your Level',
    ageDesc: 'Choose your reading level for the perfect story',

    heroTitle: 'Name Your Hero',
    heroDesc: 'Who will be the star of your story?',
    heroPlaceholder: "Hero's name...",

    genderTitle: 'Hero Gender',
    genderDesc: 'Is your hero a boy or a girl?',
    male: 'Boy',
    female: 'Girl',

    personalityTitle: "'s Personality",
    personalityDesc: 'Pick up to 2 traits that define your hero',

    powerTitle: 'Special Power',
    powerDesc: 'What makes {name} unique?',

    companionTitle: 'Choose a Companion',
    companionDesc: 'Every hero needs a loyal friend',

    worldTitle: 'Story World',
    worldDesc: 'Where does the adventure take place?',

    questTitle: 'The Quest',
    questDesc: "What's {name}'s mission?",

    customTitle: 'Add Your Touch',
    customDesc: 'Optional: Add any special details you want in your story',
    customPlaceholder: 'e.g., "Include a magical golden key" or "The hero has a secret..."',
    skipCustom: 'Skip this step',

    loading: 'Creating your story...',
    loadingDesc: 'The AI is writing an epic adventure for {name}',

    publishedBy: 'Story Published by',
    adventure: "'s Adventure",

    sceneOf: 'Scene {current} of 5',
    continueStory: 'Continue the Story',
    tweakPlaceholder: 'What happens next? Add your ideas...',
    generateNext: 'Generate Next Scene →',
    sendToFriend: 'Send to Friend to Continue',
    friendRequired: 'After 5 scenes, invite a friend to decide what happens next!',

    copyFullStory: 'Copy Full Story',
    createNewStory: 'Create New Story',
    copied: 'Copied!',
  },
  ar: {
    storyStudio: 'استوديو القصص',
    logout: 'تسجيل خروج',
    step: 'خطوة',
    of: 'من',
    complete: 'مكتمل',
    back: 'رجوع ←',
    continue: '← متابعة',
    createStory: 'أنشئ قصتي',

    authorTitle: 'اسم المؤلف',
    authorDesc: 'سيظهر هذا الاسم على كل قصة تكتبها',
    authorPlaceholder: 'اسمك...',

    ageTitle: 'مستواك',
    ageDesc: 'اختر مستوى القراءة للحصول على القصة المثالية',

    heroTitle: 'اسم البطل',
    heroDesc: 'من سيكون نجم قصتك؟',
    heroPlaceholder: 'اسم البطل...',

    genderTitle: 'جنس البطل',
    genderDesc: 'هل بطلك ولد أم بنت؟',
    male: 'ولد',
    female: 'بنت',

    personalityTitle: ' شخصية',
    personalityDesc: 'اختر صفتين تعرّف بطلك',

    powerTitle: 'القوة الخاصة',
    powerDesc: 'ما الذي يجعل {name} مميزاً؟',

    companionTitle: 'اختر رفيقاً',
    companionDesc: 'كل بطل يحتاج صديقاً وفياً',

    worldTitle: 'عالم القصة',
    worldDesc: 'أين تدور المغامرة؟',

    questTitle: 'المهمة',
    questDesc: 'ما هي مهمة {name}؟',

    customTitle: 'أضف لمستك',
    customDesc: 'اختياري: أضف أي تفاصيل خاصة تريدها في قصتك',
    customPlaceholder: 'مثال: "أضف مفتاحاً ذهبياً سحرياً" أو "للبطل سر..."',
    skipCustom: 'تخطي هذه الخطوة',

    loading: 'جاري إنشاء قصتك...',
    loadingDesc: 'الذكاء الاصطناعي يكتب مغامرة ملحمية لـ {name}',

    publishedBy: 'قصة منشورة بقلم',
    adventure: 'مغامرة ',

    sceneOf: 'المشهد {current} من 5',
    continueStory: 'أكمل القصة',
    tweakPlaceholder: 'ماذا سيحدث بعد ذلك؟ أضف أفكارك...',
    generateNext: 'إنشاء المشهد التالي ←',
    sendToFriend: 'أرسل لصديق ليكمل',
    friendRequired: 'بعد 5 مشاهد، ادعُ صديقاً ليقرر ما سيحدث!',

    copyFullStory: 'نسخ القصة كاملة',
    createNewStory: 'إنشاء قصة جديدة',
    copied: 'تم النسخ!',
  }
};

// Data with translations - using icon names instead of emojis for professional look
const getPersonalities = (lang: Language) => [
  { id: 'brave', label: lang === 'en' ? 'Brave' : 'شجاع', icon: 'shield' },
  { id: 'clever', label: lang === 'en' ? 'Clever' : 'ذكي', icon: 'lightbulb' },
  { id: 'funny', label: lang === 'en' ? 'Funny' : 'مرح', icon: 'smile' },
  { id: 'kind', label: lang === 'en' ? 'Kind' : 'طيب', icon: 'heart' },
  { id: 'curious', label: lang === 'en' ? 'Curious' : 'فضولي', icon: 'search' },
  { id: 'determined', label: lang === 'en' ? 'Determined' : 'مصمم', icon: 'target' },
];

const getPowers = (lang: Language) => [
  { id: 'speed', label: lang === 'en' ? 'Super Speed' : 'سرعة خارقة', icon: 'zap' },
  { id: 'invisible', label: lang === 'en' ? 'Invisibility' : 'الاختفاء', icon: 'eye-off' },
  { id: 'strength', label: lang === 'en' ? 'Super Strength' : 'قوة خارقة', icon: 'dumbbell' },
  { id: 'flying', label: lang === 'en' ? 'Flying' : 'الطيران', icon: 'wind' },
  { id: 'telepathy', label: lang === 'en' ? 'Mind Reading' : 'قراءة الأفكار', icon: 'brain' },
  { id: 'timecontrol', label: lang === 'en' ? 'Time Control' : 'التحكم بالزمن', icon: 'clock' },
];

const getCompanions = (lang: Language) => [
  { id: 'robot', label: lang === 'en' ? 'Robot Friend' : 'روبوت صديق', icon: 'cpu' },
  { id: 'dragon', label: lang === 'en' ? 'Baby Dragon' : 'تنين صغير', icon: 'flame' },
  { id: 'wolf', label: lang === 'en' ? 'Magic Wolf' : 'ذئب سحري', icon: 'moon' },
  { id: 'phoenix', label: lang === 'en' ? 'Phoenix' : 'طائر الفينيق', icon: 'sunrise' },
  { id: 'cat', label: lang === 'en' ? 'Talking Cat' : 'قط يتكلم', icon: 'message-circle' },
  { id: 'falcon', label: lang === 'en' ? 'Golden Falcon' : 'صقر ذهبي', icon: 'send' },
];

const getWorlds = (lang: Language) => [
  { id: 'desert', label: lang === 'en' ? 'Desert Kingdom' : 'مملكة الصحراء', icon: 'sun' },
  { id: 'space', label: lang === 'en' ? 'Space Station' : 'محطة فضائية', icon: 'rocket' },
  { id: 'underwater', label: lang === 'en' ? 'Underwater City' : 'مدينة تحت الماء', icon: 'droplets' },
  { id: 'forest', label: lang === 'en' ? 'Magical Forest' : 'غابة سحرية', icon: 'trees' },
  { id: 'future', label: lang === 'en' ? 'Future City' : 'مدينة المستقبل', icon: 'building-2' },
  { id: 'ancient', label: lang === 'en' ? 'Ancient Ruins' : 'آثار قديمة', icon: 'landmark' },
];

const getQuests = (lang: Language) => [
  { id: 'treasure', label: lang === 'en' ? 'Find Lost Treasure' : 'إيجاد كنز مفقود', icon: 'gem' },
  { id: 'rescue', label: lang === 'en' ? 'Rescue Mission' : 'مهمة إنقاذ', icon: 'life-buoy' },
  { id: 'mystery', label: lang === 'en' ? 'Solve a Mystery' : 'حل لغز غامض', icon: 'compass' },
  { id: 'villain', label: lang === 'en' ? 'Defeat the Villain' : 'هزيمة الشرير', icon: 'swords' },
  { id: 'race', label: lang === 'en' ? 'Win the Race' : 'الفوز بالسباق', icon: 'trophy' },
  { id: 'portal', label: lang === 'en' ? 'Close the Portal' : 'إغلاق البوابة', icon: 'sparkles' },
];

export default function DemoPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [step, setStep] = useState<Step>('author');
  const [config, setConfig] = useState<StoryConfig>({
    authorName: '',
    ageLevel: '',
    heroName: '',
    gender: '',
    personality: [],
    power: '',
    companion: '',
    world: '',
    quest: '',
    customPrompt: '',
  });

  // Story evolution state
  const [scenes, setScenes] = useState<StoryScene[]>([]);
  const [tweakPrompt, setTweakPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];
  const c = themes[theme];
  const isRTL = lang === 'ar';

  useEffect(() => {
    // Load theme and language preferences
    setTheme(getThemeFromStorage());
    setLang(getLangFromStorage());

    const storedUser = localStorage.getItem('rawy_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setConfig(prev => ({ ...prev, authorName: parsed.name }));
    } else {
      router.push('/');
    }
  }, [router]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    saveLang(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('rawy_user');
    router.push('/');
  };

  const togglePersonality = (id: string) => {
    setConfig(prev => {
      if (prev.personality.includes(id)) {
        return { ...prev, personality: prev.personality.filter(p => p !== id) };
      } else if (prev.personality.length < 2) {
        return { ...prev, personality: [...prev.personality, id] };
      }
      return prev;
    });
  };

  const generateScene = async (isFirst: boolean = false, tweak: string = '') => {
    setIsGenerating(true);
    const sceneNumber = scenes.length + 1;

    try {
      const storyResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.heroName,
          ageGroup: config.ageLevel || '11-12',
          gender: config.gender,
          personality: config.personality.join(', '),
          power: config.power,
          companion: config.companion,
          world: config.world,
          quest: config.quest,
          customPrompt: config.customPrompt,
          language: lang,
          sceneNumber: sceneNumber,
          previousScenes: scenes.map(s => s.text),
          userTweak: tweak,
        }),
      });

      const storyData = await storyResponse.json();
      let sceneText = '';

      if (storyData.success) {
        sceneText = storyData.story;
      } else {
        sceneText = generateFallbackScene(sceneNumber, tweak);
      }

      let imageUrl = '';
      try {
        const imageResponse = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            heroName: config.heroName,
            gender: config.gender,
            world: config.world,
            companion: config.companion,
            sceneDescription: sceneText.substring(0, 200),
            sceneNumber: sceneNumber,
          }),
        });

        const imageData = await imageResponse.json();
        if (imageData.success) {
          imageUrl = imageData.imageUrl;
        }
      } catch {
        imageUrl = '';
      }

      const newScene: StoryScene = {
        text: sceneText,
        imageUrl: imageUrl,
        userTweak: tweak,
      };

      setScenes(prev => [...prev, newScene]);
      setTweakPrompt('');

      if (isFirst) {
        setStep('story');
      }
    } catch {
      const sceneText = generateFallbackScene(sceneNumber, tweak);
      const newScene: StoryScene = {
        text: sceneText,
        imageUrl: '',
        userTweak: tweak,
      };

      setScenes(prev => [...prev, newScene]);
      setTweakPrompt('');

      if (isFirst) {
        setStep('story');
      }
    }

    setIsGenerating(false);
  };

  const generateFallbackScene = (sceneNumber: number, tweak: string) => {
    const worlds = getWorlds(lang);
    const companions = getCompanions(lang);
    const powers = getPowers(lang);

    const worldText = worlds.find(x => x.id === config.world)?.label || '';
    const worldEmoji = worlds.find(x => x.id === config.world)?.emoji || '🏜️';
    const companionText = companions.find(x => x.id === config.companion)?.label || '';
    const companionEmoji = companions.find(x => x.id === config.companion)?.emoji || '🤖';
    const powerText = powers.find(x => x.id === config.power)?.label || '';

    const heroPronouns = config.gender === 'female'
      ? (lang === 'ar' ? { subj: 'هي', obj: 'ها', poss: 'ها' } : { subj: 'she', obj: 'her', poss: 'her' })
      : (lang === 'ar' ? { subj: 'هو', obj: 'ه', poss: 'ه' } : { subj: 'he', obj: 'him', poss: 'his' });

    if (lang === 'ar') {
      const scenesAr = [
        `${worldEmoji} في قلب ${worldText}، وقف ${config.heroName} أمام تحدٍ لم يواجهه من قبل. بجانبه ${companionText} ${companionEmoji}، رفيق دربه الوفي.\n\n"هل أنت مستعد؟" سأله رفيقه.\n\n${config.customPrompt ? `${config.customPrompt}\n\n` : ''}نظر ${config.heroName} إلى الأفق. كانت ${powerText} التي يملكها ستكون مفتاح هذه المغامرة...`,
        `فجأة، سمع ${config.heroName} صوتاً غريباً من الأعماق. صوت كأنه يناديه بالاسم...\n\n"${config.heroName}... ${config.heroName}..."\n\nالتفت بسرعة، قلبه ينبض بقوة!`,
        `ظهر باب عملاق منقوش عليه رموز قديمة، يتوهج بنور أزرق غامض.\n\n"هذا هو!" صرخ ${companionText}. "هذا ما كنا نبحث عنه!"`,
        `${tweak ? tweak + '\n\n' : ''}استخدم ${config.heroName} قوة ${powerText} لمواجهة الخطر. كان ${companionText} بجانبه يساعده في كل خطوة.`,
        `وصل ${config.heroName} و${companionText} إلى نهاية الطريق. أمامهم اختياران:\n\n⬅️ الطريق الأيسر: مظلم وغامض\n➡️ الطريق الأيمن: مضيء لكن خطير\n\nماذا سيختار ${config.heroName}؟ 🎭`,
      ];
      return scenesAr[Math.min(sceneNumber - 1, scenesAr.length - 1)];
    } else {
      const scenesEn = [
        `${worldEmoji} In the heart of ${worldText}, ${config.heroName} stood facing a challenge ${heroPronouns.subj} had never faced before. Beside ${heroPronouns.obj} was ${companionText} ${companionEmoji}, ${heroPronouns.poss} loyal companion.\n\n"Are you ready?" ${heroPronouns.poss} companion asked.\n\n${config.customPrompt ? `${config.customPrompt}\n\n` : ''}${config.heroName} looked at the horizon, knowing ${heroPronouns.poss} ${powerText} would be the key...`,
        `Suddenly, ${config.heroName} heard a strange sound from the depths. A voice calling ${heroPronouns.poss} name...\n\n"${config.heroName}... ${config.heroName}..."\n\n${heroPronouns.subj.charAt(0).toUpperCase() + heroPronouns.subj.slice(1)} turned quickly, heart pounding!`,
        `A giant door appeared, carved with ancient symbols, glowing with a mysterious blue light.\n\n"This is it!" shouted ${companionText}. "This is what we've been looking for!"`,
        `${tweak ? tweak + '\n\n' : ''}${config.heroName} used ${heroPronouns.poss} ${powerText} to face the danger. ${companionText} was by ${heroPronouns.poss} side, helping at every step.`,
        `${config.heroName} and ${companionText} reached the end of the path. Before them were two choices:\n\n⬅️ The left path: Dark and mysterious\n➡️ The right path: Bright but dangerous\n\nWhat will ${config.heroName} choose? 🎭`,
      ];
      return scenesEn[Math.min(sceneNumber - 1, scenesEn.length - 1)];
    }
  };

  const resetFlow = () => {
    setStep('author');
    setConfig({
      authorName: user?.name || '',
      ageLevel: '',
      heroName: '',
      gender: '',
      personality: [],
      power: '',
      companion: '',
      world: '',
      quest: '',
      customPrompt: '',
    });
    setScenes([]);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepNumber = () => {
    const steps: Step[] = ['author', 'age', 'hero', 'gender', 'personality', 'power', 'companion', 'world', 'quest', 'custom'];
    return steps.indexOf(step) + 1;
  };

  const nextStep = () => {
    const steps: Step[] = ['author', 'age', 'hero', 'gender', 'personality', 'power', 'companion', 'world', 'quest', 'custom'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: Step[] = ['author', 'age', 'hero', 'gender', 'personality', 'power', 'companion', 'world', 'quest', 'custom'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: c.bg,
        transition: 'background-color 0.3s'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: `3px solid ${c.border}`,
          borderTopColor: c.primary,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  const renderOptionGrid = (
    options: { id: string; label: string; icon: string }[],
    selected: string | string[],
    onSelect: (id: string) => void,
    multi: boolean = false
  ) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {options.map((opt) => {
        const isSelected = multi
          ? (selected as string[]).includes(opt.id)
          : selected === opt.id;
        const IconComponent = iconMap[opt.icon];
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            style={{
              padding: '20px 16px',
              borderRadius: '16px',
              border: isSelected ? `3px solid ${c.primary}` : `2px solid ${c.border}`,
              backgroundColor: isSelected ? `${c.primary}15` : c.bgCard,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: isSelected ? `${c.primary}20` : `${c.primary}10`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              {IconComponent && <IconComponent size={24} style={{ color: isSelected ? c.primary : c.textMuted }} />}
            </div>
            <div style={{
              fontWeight: '700',
              color: isSelected ? c.primary : c.text,
              fontSize: '14px',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
            }}>
              {opt.label}
            </div>
          </button>
        );
      })}
    </div>
  );

  const fullStory = scenes.map(s => s.text).join('\n\n---\n\n');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: c.bg,
      color: c.text,
      transition: 'background-color 0.3s, color 0.3s'
    }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header
        theme={theme}
        lang={lang}
        onThemeChange={setTheme}
        onLangChange={setLang}
        variant="studio"
      />

      {/* Main Content */}
      <main style={{ paddingTop: '100px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

          {/* Progress Bar */}
          {step !== 'loading' && step !== 'story' && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px',
                color: c.textMuted
              }}>
                <span>{t.step} {getStepNumber()} {t.of} 10</span>
                <span>{Math.round((getStepNumber() / 10) * 100)}% {t.complete}</span>
              </div>
              <div style={{
                height: '6px',
                backgroundColor: c.border,
                borderRadius: '100px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(getStepNumber() / 10) * 100}%`,
                  background: c.gradient,
                  borderRadius: '100px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          {/* Step 1: Author Name */}
          {step === 'author' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✍️</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.authorTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.authorDesc}
              </p>

              <div style={{
                backgroundColor: c.bgCard,
                borderRadius: '24px',
                padding: '32px',
                border: `1px solid ${c.border}`,
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <input
                  type="text"
                  value={config.authorName}
                  onChange={(e) => setConfig({ ...config, authorName: e.target.value })}
                  placeholder={t.authorPlaceholder}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    fontSize: '18px',
                    border: `2px solid ${c.primary}30`,
                    borderRadius: '14px',
                    textAlign: 'center',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: c.bgAlt,
                    color: c.text,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                  autoFocus
                />
                <button
                  onClick={nextStep}
                  disabled={!config.authorName.trim()}
                  style={{
                    width: '100%',
                    padding: '18px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fff',
                    background: config.authorName.trim() ? c.gradient : c.border,
                    border: 'none',
                    borderRadius: '14px',
                    cursor: config.authorName.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  {t.continue}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Age Level */}
          {step === 'age' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.ageTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.ageDesc}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '400px',
                margin: '0 auto 24px'
              }}>
                {(['9-10', '11-12', '13-15'] as const).map((level) => {
                  const levelConfig = ageLevelConfig[level][lang];
                  const isSelected = config.ageLevel === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setConfig({ ...config, ageLevel: level })}
                      style={{
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: isSelected ? `3px solid ${c.primary}` : `2px solid ${c.border}`,
                        backgroundColor: isSelected ? `${c.primary}15` : c.bgCard,
                        cursor: 'pointer',
                        textAlign: isRTL ? 'right' : 'left',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: isSelected ? c.gradient : c.bgAlt,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        flexShrink: 0
                      }}>
                        {levelConfig.emoji}
                      </div>
                      <div>
                        <div style={{
                          fontWeight: '700',
                          color: isSelected ? c.primary : c.text,
                          fontSize: '16px',
                          marginBottom: '4px',
                          fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                        }}>
                          {levelConfig.label}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: c.textMuted,
                          fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                        }}>
                          {levelConfig.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextStep}
                disabled={!config.ageLevel}
                style={{
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.ageLevel ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.ageLevel ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 3: Hero Name */}
          {step === 'hero' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🦸</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.heroTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.heroDesc}
              </p>

              <div style={{
                backgroundColor: c.bgCard,
                borderRadius: '24px',
                padding: '32px',
                border: `1px solid ${c.border}`,
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <input
                  type="text"
                  value={config.heroName}
                  onChange={(e) => setConfig({ ...config, heroName: e.target.value })}
                  placeholder={t.heroPlaceholder}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    fontSize: '18px',
                    border: `2px solid ${c.primary}30`,
                    borderRadius: '14px',
                    textAlign: 'center',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: c.bgAlt,
                    color: c.text,
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                  autoFocus
                />
                <button
                  onClick={nextStep}
                  disabled={!config.heroName.trim()}
                  style={{
                    width: '100%',
                    padding: '18px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fff',
                    background: config.heroName.trim() ? c.gradient : c.border,
                    border: 'none',
                    borderRadius: '14px',
                    cursor: config.heroName.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  {t.continue}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Gender */}
          {step === 'gender' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.genderTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.genderDesc}
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                {[
                  { id: 'male', emoji: '👦', label: t.male },
                  { id: 'female', emoji: '👧', label: t.female },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setConfig({ ...config, gender: g.id as 'male' | 'female' })}
                    style={{
                      padding: '32px 48px',
                      borderRadius: '20px',
                      border: config.gender === g.id ? `3px solid ${c.primary}` : `2px solid ${c.border}`,
                      backgroundColor: config.gender === g.id ? `${c.primary}15` : c.bgCard,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>{g.emoji}</div>
                    <div style={{
                      fontWeight: '700',
                      color: config.gender === g.id ? c.primary : c.text,
                      fontSize: '18px',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}>
                      {g.label}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={!config.gender}
                style={{
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.gender ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.gender ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 5: Personality */}
          {step === 'personality' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {isRTL ? t.personalityTitle + config.heroName : config.heroName + t.personalityTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.personalityDesc}
              </p>

              {renderOptionGrid(getPersonalities(lang), config.personality, togglePersonality, true)}

              <button
                onClick={nextStep}
                disabled={config.personality.length === 0}
                style={{
                  marginTop: '24px',
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.personality.length > 0 ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.personality.length > 0 ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 6: Power */}
          {step === 'power' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.powerTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.powerDesc.replace('{name}', config.heroName)}
              </p>

              {renderOptionGrid(getPowers(lang), config.power, (id) => setConfig({ ...config, power: id }))}

              <button
                onClick={nextStep}
                disabled={!config.power}
                style={{
                  marginTop: '24px',
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.power ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.power ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 7: Companion */}
          {step === 'companion' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.companionTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.companionDesc}
              </p>

              {renderOptionGrid(getCompanions(lang), config.companion, (id) => setConfig({ ...config, companion: id }))}

              <button
                onClick={nextStep}
                disabled={!config.companion}
                style={{
                  marginTop: '24px',
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.companion ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.companion ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 8: World */}
          {step === 'world' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.worldTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.worldDesc}
              </p>

              {renderOptionGrid(getWorlds(lang), config.world, (id) => setConfig({ ...config, world: id }))}

              <button
                onClick={nextStep}
                disabled={!config.world}
                style={{
                  marginTop: '24px',
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.world ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.world ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 9: Quest */}
          {step === 'quest' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.questTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.questDesc.replace('{name}', config.heroName)}
              </p>

              {renderOptionGrid(getQuests(lang), config.quest, (id) => setConfig({ ...config, quest: id }))}

              <button
                onClick={nextStep}
                disabled={!config.quest}
                style={{
                  marginTop: '24px',
                  padding: '18px 48px',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff',
                  background: config.quest ? c.gradient : c.border,
                  border: 'none',
                  borderRadius: '14px',
                  cursor: config.quest ? 'pointer' : 'not-allowed',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}
              >
                {t.continue}
              </button>
            </div>
          )}

          {/* Step 10: Custom Prompt */}
          {step === 'custom' && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={prevStep} style={{ background: 'none', border: 'none', color: c.textMuted, cursor: 'pointer', marginBottom: '16px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.back}
              </button>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.customTitle}
              </h1>
              <p style={{ color: c.textMuted, marginBottom: '32px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.customDesc}
              </p>

              <div style={{
                backgroundColor: c.bgCard,
                borderRadius: '24px',
                padding: '32px',
                border: `1px solid ${c.border}`,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <textarea
                  value={config.customPrompt}
                  onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
                  placeholder={t.customPlaceholder}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '18px',
                    fontSize: '16px',
                    border: `2px solid ${c.primary}30`,
                    borderRadius: '14px',
                    outline: 'none',
                    marginBottom: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: c.bgAlt,
                    color: c.text,
                    resize: 'none',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                />
                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                  <button
                    onClick={() => generateScene(true)}
                    disabled={isGenerating}
                    style={{
                      width: '100%',
                      padding: '18px',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#fff',
                      background: isGenerating ? c.border : c.gradientGold,
                      border: 'none',
                      borderRadius: '14px',
                      cursor: isGenerating ? 'not-allowed' : 'pointer',
                      boxShadow: isGenerating ? 'none' : `0 4px 20px ${c.accent}30`,
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}
                  >
                    {isGenerating ? '...' : t.createStory}
                  </button>
                  <button
                    onClick={() => {
                      setConfig({ ...config, customPrompt: '' });
                      generateScene(true);
                    }}
                    disabled={isGenerating}
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: c.textMuted,
                      backgroundColor: 'transparent',
                      border: `1px solid ${c.border}`,
                      borderRadius: '14px',
                      cursor: isGenerating ? 'not-allowed' : 'pointer',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}
                  >
                    {t.skipCustom}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {step === 'loading' && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: c.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                <span style={{ fontSize: '36px' }}>✨</span>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.loading}
              </h2>
              <p style={{ color: c.textMuted, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                {t.loadingDesc.replace('{name}', config.heroName)}
              </p>
            </div>
          )}

          {/* Story Display with Evolution */}
          {step === 'story' && (
            <div>
              {/* Scene Progress */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  background: `${c.primary}15`,
                  border: `1px solid ${c.primary}30`,
                  color: c.primary,
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                }}>
                  {t.sceneOf.replace('{current}', String(scenes.length))}
                </div>
              </div>

              {/* Current Scene */}
              {scenes.map((scene, idx) => (
                <div key={idx} style={{
                  backgroundColor: c.bgCard,
                  borderRadius: '24px',
                  padding: '24px',
                  border: `1px solid ${c.border}`,
                  marginBottom: '16px'
                }}>
                  {/* Scene Image */}
                  <div style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '16px',
                    background: scene.imageUrl
                      ? `url(${scene.imageUrl}) center/cover no-repeat`
                      : c.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    border: `1px solid ${c.border}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {!scene.imageUrl && (
                      <div style={{ textAlign: 'center', color: '#fff' }}>
                        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎨</div>
                        <div style={{ fontSize: '13px', opacity: 0.8 }}>
                          {lang === 'ar' ? `المشهد ${idx + 1}` : `Scene ${idx + 1}`}
                        </div>
                      </div>
                    )}
                    {scene.imageUrl && (
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#fff'
                      }}>
                        🎨 AI Generated
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: 'Tajawal, sans-serif',
                      fontSize: '17px',
                      lineHeight: '2',
                      color: c.text,
                      whiteSpace: 'pre-wrap'
                    }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {scene.text}
                  </div>
                </div>
              ))}

              {/* Evolution Controls - Only show if less than 5 scenes */}
              {scenes.length < 5 && (
                <div style={{
                  backgroundColor: `${c.primary}10`,
                  borderRadius: '20px',
                  padding: '24px',
                  border: `1px solid ${c.primary}20`,
                  marginBottom: '24px'
                }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', textAlign: 'center', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                    {t.continueStory}
                  </h4>
                  <textarea
                    value={tweakPrompt}
                    onChange={(e) => setTweakPrompt(e.target.value)}
                    placeholder={t.tweakPlaceholder}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: '15px',
                      border: `2px solid ${c.primary}30`,
                      borderRadius: '12px',
                      outline: 'none',
                      marginBottom: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: c.bgCard,
                      color: c.text,
                      resize: 'none',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                      textAlign: isRTL ? 'right' : 'left'
                    }}
                  />
                  <button
                    onClick={() => generateScene(false, tweakPrompt)}
                    disabled={isGenerating}
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#fff',
                      background: isGenerating ? c.border : c.gradient,
                      border: 'none',
                      borderRadius: '12px',
                      cursor: isGenerating ? 'not-allowed' : 'pointer',
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                    }}
                  >
                    {isGenerating ? '...' : t.generateNext}
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleCopy(fullStory)}
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: c.text,
                    backgroundColor: c.bgCard,
                    border: `1px solid ${c.border}`,
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  {copied ? t.copied : t.copyFullStory}
                </button>
                <button
                  onClick={resetFlow}
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#fff',
                    background: c.gradient,
                    border: 'none',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                  }}
                >
                  {t.createNewStory}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
