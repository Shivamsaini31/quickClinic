import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import { Heart, Zap } from 'lucide-react';

const TestComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Test Title */}
        <motion.h1 
          className="text-6xl font-bold font-neon text-center bg-gradient-to-r from-neon-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          QuickClinic Test
        </motion.h1>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard glow className="p-6 text-center">
              <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Glass Card Test</h3>
              <p className="text-white/80">This is a glassmorphism card with glow effect</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="p-6 text-center">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Animation Test</h3>
              <p className="text-white/80">This card has smooth animations</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Test Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <NeonButton size="lg">
            <Zap className="w-5 h-5" />
            Primary Button
          </NeonButton>
          <NeonButton variant="secondary" size="lg">
            <Heart className="w-5 h-5" />
            Secondary Button
          </NeonButton>
          <NeonButton variant="outline" size="lg">
            <Zap className="w-5 h-5" />
            Outline Button
          </NeonButton>
        </motion.div>

        {/* Test Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-xl text-white/90 mb-4">
            If you can see this with <span className="text-cyan-400 font-bold">neon colors</span>, 
            <span className="text-neon-400 font-bold"> glassmorphism effects</span>, and 
            <span className="text-yellow-400 font-bold"> smooth animations</span>, 
            then the enhanced UI is working! 🎉
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TestComponent;
