'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/30 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-100/40 to-blue-100/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Now in Beta — Free for Early Users
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight"
          >
            AI-Powered
            <br />
            <span className="gradient-text">Arabic Storytelling</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Create personalized, culturally authentic Arabic stories in seconds.
            Engaging content that reflects our values and heritage.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onGetStarted}
              className="group flex items-center gap-2 btn-primary text-lg px-8 py-4"
            >
              Start Creating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 btn-secondary text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex flex-col items-center"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">1,000+</span> stories created by early users
            </p>
          </motion.div>
        </div>

        {/* Hero Image/Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Browser frame */}
            <div className="rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-white border border-slate-200 text-sm text-slate-400">
                    rawy.ai/create
                  </div>
                </div>
              </div>

              {/* App preview */}
              <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-2xl mx-auto text-center" dir="rtl">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    اختر نوع قصتك
                  </h3>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { emoji: '🔥', name: 'أكشن' },
                      { emoji: '💔', name: 'دراما' },
                      { emoji: '👻', name: 'رعب' },
                      { emoji: '😂', name: 'كوميدي' },
                    ].map((mood) => (
                      <div
                        key={mood.name}
                        className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <p className="mt-2 text-sm font-medium text-slate-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          {mood.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 text-right">
                    <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      في ليلة من ليالي الشتاء الباردة، كان أحمد يمشي في شوارع المدينة القديمة...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/4 p-4 rounded-2xl bg-white shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Story Generated</p>
                  <p className="text-xs text-slate-500">In 3.2 seconds</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 bottom-1/4 p-4 rounded-2xl bg-white shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xl">📖</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">1,247 stories</p>
                  <p className="text-xs text-slate-500">Created today</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
