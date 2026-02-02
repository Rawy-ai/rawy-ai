'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onGetStarted: () => void;
}

export default function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-12 lg:p-20"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to create your
              <br />
              first story?
            </h2>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join thousands of creators using Rawy to bring Arabic stories to life.
              Start for free, no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-2 bg-white text-indigo-700 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/60 text-sm">
                Free forever for up to 10 stories/day
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
