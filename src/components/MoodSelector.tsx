'use client';

import { motion } from 'framer-motion';

interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

const moods: Mood[] = [
  {
    id: 'action',
    name: 'أكشن',
    emoji: '🔥',
    color: 'from-orange-500 to-red-600',
    description: 'مغامرات ومطاردات',
  },
  {
    id: 'drama',
    name: 'دراما',
    emoji: '💔',
    color: 'from-pink-500 to-rose-600',
    description: 'مشاعر وعلاقات',
  },
  {
    id: 'horror',
    name: 'رعب',
    emoji: '👻',
    color: 'from-purple-600 to-violet-800',
    description: 'غموض وتشويق',
  },
  {
    id: 'comedy',
    name: 'كوميدي',
    emoji: '😂',
    color: 'from-yellow-400 to-orange-500',
    description: 'مواقف مضحكة',
  },
  {
    id: 'scifi',
    name: 'خيال علمي',
    emoji: '🚀',
    color: 'from-cyan-400 to-blue-600',
    description: 'مستقبل وتقنية',
  },
  {
    id: 'mystery',
    name: 'غموض',
    emoji: '🔍',
    color: 'from-emerald-500 to-teal-700',
    description: 'ألغاز وتحقيقات',
  },
  {
    id: 'school',
    name: 'مدرسة',
    emoji: '📚',
    color: 'from-blue-400 to-indigo-600',
    description: 'حياة مدرسية',
  },
  {
    id: 'fantasy',
    name: 'خيال',
    emoji: '⚔️',
    color: 'from-violet-500 to-purple-700',
    description: 'سحر ومغامرات',
  },
];

interface Props {
  selected: string | null;
  onSelect: (mood: string) => void;
}

export default function MoodSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {moods.map((mood, index) => (
        <motion.button
          key={mood.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(mood.id)}
          className={`
            relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300
            ${selected === mood.id
              ? 'bg-gradient-to-br ' + mood.color + ' scale-105 shadow-lg'
              : 'bg-[#1C1C26] hover:bg-[#252530] border border-white/5 hover:border-white/10'
            }
          `}
          whileHover={{ scale: selected === mood.id ? 1.05 : 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
            <span className={`font-bold text-sm sm:text-base ${selected === mood.id ? 'text-white' : 'text-white/90'}`}>
              {mood.name}
            </span>
            <span className={`text-xs ${selected === mood.id ? 'text-white/80' : 'text-white/50'}`}>
              {mood.description}
            </span>
          </div>

          {selected === mood.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
            >
              <span className="text-sm">✓</span>
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
