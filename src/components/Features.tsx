'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Globe,
  Shield,
  Sparkles,
  Users,
  Palette,
  BookOpen,
  Heart
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete Arabic stories in seconds with our advanced AI engine.',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Globe,
    title: 'Culturally Authentic',
    description: 'Stories rooted in Arab heritage and values, written in natural Gulf dialect.',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Values-Aligned',
    description: 'Content that reflects Islamic values and is safe for all ages.',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Sparkles,
    title: 'Personalized',
    description: 'Stories adapt to reader preferences, age level, and interests.',
    color: 'from-purple-400 to-violet-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: BookOpen,
    title: '8 Story Genres',
    description: 'From action and drama to sci-fi and mystery — endless possibilities.',
    color: 'from-indigo-400 to-blue-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Heart,
    title: 'Engaging Content',
    description: 'Narrative hooks that keep readers coming back for more.',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
          >
            <span className="text-sm font-medium text-indigo-700">Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900"
          >
            Everything you need for
            <br />
            <span className="gradient-text">Arabic storytelling</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600"
          >
            Powerful AI meets cultural authenticity. Create stories that resonate
            with Arab audiences and reflect their values.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="feature-card group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: feature.color.includes('yellow') ? '#F59E0B' : feature.color.includes('blue') ? '#3B82F6' : feature.color.includes('green') ? '#10B981' : feature.color.includes('purple') ? '#8B5CF6' : feature.color.includes('indigo') ? '#6366F1' : '#EC4899' }} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
