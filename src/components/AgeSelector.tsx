'use client';

import { motion } from 'framer-motion';

interface AgeGroup {
  id: string;
  range: string;
  label: string;
  emoji: string;
}

const ageGroups: AgeGroup[] = [
  {
    id: '13-16',
    range: '13-16',
    label: 'ثانوي',
    emoji: '🎒',
  },
  {
    id: '17-20',
    range: '17-20',
    label: 'جامعة',
    emoji: '🎓',
  },
  {
    id: '21+',
    range: '21+',
    label: 'كبرنا',
    emoji: '💼',
  },
];

interface Props {
  selected: string | null;
  onSelect: (age: string) => void;
}

export default function AgeSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {ageGroups.map((age, index) => (
        <motion.button
          key={age.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(age.id)}
          className={`
            flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer transition-all duration-300
            ${selected === age.id
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white shadow-lg shadow-purple-500/30'
              : 'bg-[#1C1C26] text-white/80 hover:bg-[#252530] border border-white/5'
            }
          `}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl">{age.emoji}</span>
          <div className="flex flex-col items-start">
            <span className="font-bold text-sm">{age.range}</span>
            <span className="text-xs opacity-70">{age.label}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
