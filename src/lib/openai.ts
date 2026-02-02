import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StoryRequest {
  name: string;
  mood?: string;
  ageGroup: string;
  gender?: 'male' | 'female';
  // New fields for Story Studio
  personality?: string;
  power?: string;
  companion?: string;
  world?: string;
  quest?: string;
  customPrompt?: string;
  language?: 'en' | 'ar';
  sceneNumber?: number;
  previousScenes?: string[];
  userTweak?: string;
}

export interface ImageRequest {
  heroName: string;
  gender: 'male' | 'female';
  world: string;
  companion: string;
  sceneDescription: string;
  sceneNumber: number;
}

// Age level configurations
const ageLevelConfig = {
  '9-10': {
    en: {
      length: '150-200 words',
      style: 'Simple language, short sentences, fun and playful tone, easy vocabulary',
      themes: 'friendship, discovery, helping others, basic problem-solving'
    },
    ar: {
      length: '150-200 كلمة',
      style: 'لغة بسيطة، جمل قصيرة، أسلوب مرح وممتع، مفردات سهلة',
      themes: 'الصداقة، الاكتشاف، مساعدة الآخرين، حل المشكلات البسيطة'
    }
  },
  '11-12': {
    en: {
      length: '200-300 words',
      style: 'More descriptive language, adventure and excitement, dialogue between characters',
      themes: 'teamwork, courage, facing fears, growing up, responsibility'
    },
    ar: {
      length: '200-300 كلمة',
      style: 'لغة وصفية أكثر، مغامرة وإثارة، حوار بين الشخصيات',
      themes: 'العمل الجماعي، الشجاعة، مواجهة المخاوف، النمو، المسؤولية'
    }
  },
  '13-15': {
    en: {
      length: '300-400 words',
      style: 'Complex narrative, deeper emotions, plot twists, character development',
      themes: 'identity, moral dilemmas, sacrifice, leadership, finding your path'
    },
    ar: {
      length: '300-400 كلمة',
      style: 'سرد معقد، مشاعر أعمق، تحولات في الأحداث، تطور الشخصية',
      themes: 'الهوية، المعضلات الأخلاقية، التضحية، القيادة، إيجاد طريقك'
    }
  }
};

// World descriptions for prompts
const worldDescriptions = {
  en: {
    desert: 'ancient desert kingdom with golden dunes, hidden oases, and mysterious ruins',
    space: 'futuristic space station orbiting a distant planet with advanced technology',
    underwater: 'magical underwater city with bioluminescent creatures and coral palaces',
    forest: 'enchanted forest with talking animals, ancient trees, and mystical glades',
    future: 'gleaming city of tomorrow with flying vehicles and holographic displays',
    ancient: 'lost ancient ruins filled with forgotten treasures and ancient secrets'
  },
  ar: {
    desert: 'مملكة صحراوية قديمة بكثبان ذهبية وواحات مخفية وأطلال غامضة',
    space: 'محطة فضائية مستقبلية تدور حول كوكب بعيد بتكنولوجيا متطورة',
    underwater: 'مدينة سحرية تحت الماء مع مخلوقات مضيئة وقصور مرجانية',
    forest: 'غابة مسحورة مع حيوانات ناطقة وأشجار قديمة ومروج غامضة',
    future: 'مدينة متلألئة من المستقبل بمركبات طائرة وشاشات هولوغرافية',
    ancient: 'آثار قديمة مفقودة مليئة بالكنوز المنسية والأسرار القديمة'
  }
};

// Quest descriptions
const questDescriptions = {
  en: {
    treasure: 'searching for a legendary lost treasure',
    rescue: 'on a mission to rescue someone important',
    mystery: 'solving a perplexing mystery',
    villain: 'confronting a powerful villain',
    race: 'competing in an epic race against time',
    portal: 'trying to close a dangerous magical portal'
  },
  ar: {
    treasure: 'البحث عن كنز أسطوري مفقود',
    rescue: 'في مهمة لإنقاذ شخص مهم',
    mystery: 'حل لغز محير',
    villain: 'مواجهة شرير قوي',
    race: 'التنافس في سباق ملحمي ضد الزمن',
    portal: 'محاولة إغلاق بوابة سحرية خطيرة'
  }
};

// Companion descriptions
const companionDescriptions = {
  en: {
    robot: 'a loyal robot friend with helpful gadgets',
    dragon: 'a baby dragon with fire-breathing abilities',
    wolf: 'a magical wolf with mystical powers',
    phoenix: 'a majestic phoenix that can heal and revive',
    cat: 'a talking cat with ancient wisdom',
    falcon: 'a golden falcon with incredible speed'
  },
  ar: {
    robot: 'روبوت صديق وفي مع أدوات مفيدة',
    dragon: 'تنين صغير يستطيع التنفس بالنار',
    wolf: 'ذئب سحري بقوى غامضة',
    phoenix: 'طائر الفينيق المهيب يستطيع الشفاء والإحياء',
    cat: 'قط يتكلم بحكمة قديمة',
    falcon: 'صقر ذهبي بسرعة لا تصدق'
  }
};

// Power descriptions
const powerDescriptions = {
  en: {
    speed: 'super speed that lets them move faster than the eye can see',
    invisible: 'the power of invisibility',
    strength: 'incredible super strength',
    flying: 'the ability to fly through the air',
    telepathy: 'mind reading and telepathic abilities',
    timecontrol: 'the power to control and manipulate time'
  },
  ar: {
    speed: 'سرعة خارقة تجعلهم يتحركون أسرع مما تراه العين',
    invisible: 'قوة الاختفاء',
    strength: 'قوة خارقة لا تصدق',
    flying: 'القدرة على الطيران في الهواء',
    telepathy: 'قراءة الأفكار والقدرات التخاطرية',
    timecontrol: 'القدرة على التحكم في الزمن ومعالجته'
  }
};

export async function generateStoryScene(request: StoryRequest): Promise<string> {
  const lang = request.language || 'ar';
  const ageConfig = ageLevelConfig[request.ageGroup as keyof typeof ageLevelConfig] || ageLevelConfig['11-12'];
  const config = ageConfig[lang];

  const worldDesc = worldDescriptions[lang][request.world as keyof typeof worldDescriptions['en']] || worldDescriptions[lang].desert;
  const questDesc = questDescriptions[lang][request.quest as keyof typeof questDescriptions['en']] || questDescriptions[lang].treasure;
  const companionDesc = companionDescriptions[lang][request.companion as keyof typeof companionDescriptions['en']] || companionDescriptions[lang].robot;
  const powerDesc = powerDescriptions[lang][request.power as keyof typeof powerDescriptions['en']] || powerDescriptions[lang].speed;

  const genderPronoun = request.gender === 'female'
    ? (lang === 'ar' ? 'هي' : 'she')
    : (lang === 'ar' ? 'هو' : 'he');

  const isFirstScene = !request.sceneNumber || request.sceneNumber === 1;
  const sceneNum = request.sceneNumber || 1;

  let systemPrompt = '';
  let userPrompt = '';

  if (lang === 'ar') {
    systemPrompt = `أنت كاتب قصص عربي موهوب للأطفال والمراهقين. اكتب بأسلوب شيق ومناسب للعمر.

قواعد مهمة:
- اكتب بالعربية الفصحى السهلة مع بعض التعابير الخليجية الخفيفة
- ${config.style}
- المواضيع المناسبة: ${config.themes}
- الطول: ${config.length}
- اجعل القصة مشوقة ومناسبة للأطفال
- تجنب أي محتوى غير لائق أو مخيف جداً
- ${genderPronoun === 'هي' ? 'البطلة أنثى' : 'البطل ذكر'}
- انتهِ بنهاية مشوقة تجعل القارئ يريد المزيد`;

    if (isFirstScene) {
      userPrompt = `اكتب المشهد الأول من قصة مغامرة:

اسم البطل/ة: ${request.name}
الشخصية: ${request.personality}
القوة الخاصة: ${powerDesc}
الرفيق: ${companionDesc}
العالم: ${worldDesc}
المهمة: ${questDesc}
${request.customPrompt ? `تفاصيل إضافية: ${request.customPrompt}` : ''}

ابدأ القصة مباشرة بمشهد افتتاحي مشوق يقدم البطل والرفيق في هذا العالم.`;
    } else {
      userPrompt = `اكتب المشهد رقم ${sceneNum} من القصة:

المشاهد السابقة:
${request.previousScenes?.join('\n\n---\n\n') || ''}

${request.userTweak ? `توجيهات القارئ للمشهد التالي: ${request.userTweak}` : ''}

أكمل القصة بمشهد جديد مشوق. ${sceneNum === 5 ? 'هذا هو المشهد الأخير، انتهِ بنهاية تتطلب من القارئ الاختيار بين خيارين مختلفين.' : 'انتهِ بنهاية مشوقة.'}`;
    }
  } else {
    systemPrompt = `You are a talented storyteller for children and teens. Write engaging, age-appropriate content.

Important rules:
- ${config.style}
- Appropriate themes: ${config.themes}
- Length: ${config.length}
- Keep the story exciting and child-friendly
- Avoid any inappropriate or overly scary content
- The hero is ${genderPronoun === 'she' ? 'female' : 'male'}
- End with an exciting cliffhanger that makes the reader want more`;

    if (isFirstScene) {
      userPrompt = `Write the first scene of an adventure story:

Hero's name: ${request.name}
Personality: ${request.personality}
Special power: ${powerDesc}
Companion: ${companionDesc}
World: ${worldDesc}
Quest: ${questDesc}
${request.customPrompt ? `Additional details: ${request.customPrompt}` : ''}

Start the story directly with an exciting opening scene introducing the hero and companion in this world.`;
    } else {
      userPrompt = `Write scene ${sceneNum} of the story:

Previous scenes:
${request.previousScenes?.join('\n\n---\n\n') || ''}

${request.userTweak ? `Reader's direction for next scene: ${request.userTweak}` : ''}

Continue the story with a new exciting scene. ${sceneNum === 5 ? 'This is the final scene, end with a conclusion that requires the reader to choose between two different paths.' : 'End with an exciting cliffhanger.'}`;
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || (lang === 'ar' ? 'حدث خطأ في إنشاء القصة' : 'Error generating story');
  } catch (error) {
    console.error('OpenAI story generation error:', error);
    throw error;
  }
}

export async function generateSceneImage(request: ImageRequest): Promise<string> {
  const worldVisual = {
    desert: 'golden sand dunes, ancient Arabian palace, sunset sky',
    space: 'futuristic space station, stars, nebula, spacecraft',
    underwater: 'coral reef, bioluminescent fish, underwater palace, bubbles',
    forest: 'magical forest, glowing mushrooms, ancient trees, fairy lights',
    future: 'futuristic city, flying cars, holographic billboards, neon lights',
    ancient: 'ancient ruins, mysterious temples, stone carvings, torchlight'
  };

  const companionVisual = {
    robot: 'friendly robot companion',
    dragon: 'cute baby dragon',
    wolf: 'magical silver wolf',
    phoenix: 'majestic phoenix bird with fire feathers',
    cat: 'wise talking cat',
    falcon: 'golden falcon'
  };

  const heroGender = request.gender === 'female' ? 'young girl' : 'young boy';
  const worldScene = worldVisual[request.world as keyof typeof worldVisual] || worldVisual.desert;
  const companion = companionVisual[request.companion as keyof typeof companionVisual] || companionVisual.robot;

  const prompt = `Children's book illustration style, vibrant colors, friendly and adventurous mood:
A brave ${heroGender} hero named ${request.heroName} with their ${companion} in a ${worldScene}.
Scene: ${request.sceneDescription}
Style: Pixar-like 3D animation, colorful, child-friendly, no text, wide shot, cinematic lighting.`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      style: 'vivid',
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('DALL-E image generation error:', error);
    throw error;
  }
}

// Legacy function for backward compatibility
export async function generateStory(request: StoryRequest): Promise<string> {
  return generateStoryScene(request);
}

export default openai;
