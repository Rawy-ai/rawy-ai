'use client';

import { motion } from 'framer-motion';
import { Share2, RefreshCw, Heart, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  story: string;
  name: string;
  mood: string;
  onNewStory: () => void;
}

const moodEmojis: Record<string, string> = {
  action: '🔥',
  drama: '💔',
  horror: '👻',
  comedy: '😂',
  scifi: '🚀',
  mystery: '🔍',
  school: '📚',
  fantasy: '⚔️',
};

export default function StoryDisplay({ story, name, mood, onNewStory }: Props) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const shareText = `📖 قصتي على راوي:\n\n${story.slice(0, 200)}...\n\n🔥 سوّ قصتك على rawy.ai`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `قصة ${name}`,
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Story Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{moodEmojis[mood] || '📖'}</span>
          <div>
            <h2 className="text-xl font-bold text-white">قصة {name}</h2>
            <p className="text-white/50 text-sm">جاهزة! 🎉</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className={`p-3 rounded-full transition-all ${
            liked
              ? 'bg-red-500/20 text-red-400'
              : 'bg-white/5 text-white/50 hover:text-red-400'
          }`}
        >
          <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      {/* Story Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-[#13131A] rounded-3xl p-6 sm:p-8 border border-white/5"
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-tr-3xl" />

        <div className="story-text leading-loose whitespace-pre-wrap">
          {story}
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#13131A] to-transparent pointer-events-none rounded-b-3xl" />
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-full font-bold text-white shadow-lg shadow-purple-500/30"
        >
          <Share2 className="w-5 h-5" />
          شارك مع ربعك
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-[#1C1C26] rounded-full font-bold text-white/80 hover:text-white border border-white/10"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              تم النسخ!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              انسخ
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewStory}
          className="flex items-center gap-2 px-6 py-3 bg-[#1C1C26] rounded-full font-bold text-white/80 hover:text-white border border-white/10"
        >
          <RefreshCw className="w-5 h-5" />
          قصة جديدة
        </motion.button>
      </motion.div>

      {/* Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-white/40 text-sm mb-3">وش رأيك بالقصة؟</p>
        <div className="flex justify-center gap-2">
          {['🔥 حلوة', '😐 عادي', '💀 مو حلوة'].map((reaction, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#1C1C26] rounded-full text-sm text-white/60 hover:text-white hover:bg-[#252530] transition-all"
            >
              {reaction}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sparkle decoration */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-20 left-10 text-purple-500/20 pointer-events-none"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
    </motion.div>
  );
}
