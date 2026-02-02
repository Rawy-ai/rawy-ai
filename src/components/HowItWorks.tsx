'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Enter Your Name',
    description: 'Tell us who the hero of your story should be. You become the main character.',
    image: '/step-1.png',
  },
  {
    number: '02',
    title: 'Choose Your Mood',
    description: 'Select from 8 genres: action, drama, horror, comedy, sci-fi, mystery, school life, or fantasy.',
    image: '/step-2.png',
  },
  {
    number: '03',
    title: 'Get Your Story',
    description: 'Our AI generates a personalized Arabic story in seconds, tailored to your preferences.',
    image: '/step-3.png',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6"
          >
            <span className="text-sm font-medium text-slate-700">How it Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900"
          >
            Create your story in
            <br />
            <span className="gradient-text">three simple steps</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    {step.number === '01' && (
                      <div className="p-8">
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold text-slate-800 mb-2">What's your name?</h4>
                          <p className="text-slate-500 text-sm">You'll be the hero of this story</p>
                        </div>
                        <div className="max-w-sm mx-auto">
                          <input
                            type="text"
                            placeholder="Enter your name..."
                            className="input-field text-center"
                            defaultValue="أحمد"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    )}
                    {step.number === '02' && (
                      <div className="p-8" dir="rtl">
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold text-slate-800 mb-2" style={{ fontFamily: 'Tajawal' }}>اختر نوع القصة</h4>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { emoji: '🔥', name: 'أكشن', selected: true },
                            { emoji: '💔', name: 'دراما' },
                            { emoji: '👻', name: 'رعب' },
                            { emoji: '😂', name: 'كوميدي' },
                          ].map((mood) => (
                            <div
                              key={mood.name}
                              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                mood.selected
                                  ? 'bg-indigo-50 border-indigo-300 shadow-md'
                                  : 'bg-white border-slate-200 hover:border-indigo-200'
                              }`}
                            >
                              <span className="text-2xl">{mood.emoji}</span>
                              <p className="mt-1 text-xs font-medium text-slate-700" style={{ fontFamily: 'Tajawal' }}>
                                {mood.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {step.number === '03' && (
                      <div className="p-8" dir="rtl">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">🔥</span>
                          <div>
                            <h4 className="font-semibold text-slate-800" style={{ fontFamily: 'Tajawal' }}>قصة أحمد</h4>
                            <p className="text-xs text-slate-500">أكشن • جاهزة</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                          <p className="text-slate-600 leading-relaxed text-sm" style={{ fontFamily: 'Tajawal' }}>
                            في ليلة من ليالي الشتاء الباردة، كان أحمد يمشي في شوارع المدينة القديمة. فجأة سمع صوتاً غريباً قادماً من زقاق مظلم...
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 py-2 px-4 bg-indigo-500 text-white rounded-lg text-sm font-medium">
                            Share
                          </button>
                          <button className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                            New Story
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
