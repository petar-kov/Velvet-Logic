import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { urlFor } from '../../sanity';
import { DynamicIcon, RichText, DynamicHeading } from '../shared/SharedComponents';

export default function HeroBlock({ data }) {
  // Simple helper to grab the English localized string
  const l = (field) => field && typeof field === 'object' ? field.en || '' : (field || '');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <section 
      className="relative pt-24 pb-16 md:pt-40 md:pb-32 px-6 overflow-hidden bg-surface"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-navy/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mt-10 md:mt-0"
        >
          <span className="font-heading text-xs md:text-sm tracking-widest text-navy font-bold uppercase mb-4 md:mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-navy"></span>
            {l(data.preTitle)}
          </span>
          <DynamicHeading tag={data.titleTag || 'h1'} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6 md:mb-8 text-slate leading-[1.1]">
            {l(data.titlePart1)} <span className="text-navy">{l(data.titleVelvet)}</span><br />
            {l(data.titlePart2)} <span className="text-orange">{l(data.titleLogic)}</span>
          </DynamicHeading>
          <div className="font-body text-secondary text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-lg">
            <RichText content={data.description} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-start">
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-navy text-white px-8 py-4 rounded-xl font-heading font-bold text-lg transition-transform hover:-translate-y-1 hover:shadow-xl shadow-md flex items-center justify-center gap-2"
            >
              {l(data.btnStartText) || 'Stop The Leak'}
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('design-philosophy')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white text-navy px-8 py-4 rounded-xl font-heading font-bold text-lg border-2 border-navy/10 transition-colors hover:bg-navy/5 flex items-center justify-center gap-2"
            >
              View Our Design Philosophy
            </button>
          </div>


        </motion.div>

        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative h-[300px] sm:h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white mt-8 md:mt-0"
        >
          <div className="absolute inset-0 bg-navy overflow-hidden">
            {/* Growing Beehive / Honeycomb Effect */}
            <motion.div
              className="absolute inset-[-50%]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23EB5E28' stroke-width='2' stroke-opacity='0.9'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'/%3E%3Cpath d='M28 0L28 -34'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '56px 100px',
                backgroundPosition: 'center'
              }}
              animate={{ 
                clipPath: ["circle(2% at 50% 50%)", "circle(100% at 50% 50%)"],
                opacity: [0.5, 1, 0.5],
                x: mousePos.x * -60,
                y: mousePos.y * -60
              }}
              transition={{ 
                clipPath: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                x: { type: "spring", stiffness: 50, damping: 20 },
                y: { type: "spring", stiffness: 50, damping: 20 }
              }}
            />
            {/* Central Glow following mouse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-orange rounded-full mix-blend-screen blur-[100px] opacity-60"
              animate={{ 
                scale: [1, 1.2, 1],
                x: mousePos.x * 120,
                y: mousePos.y * 120
              }}
              transition={{ 
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                x: { type: "spring", stiffness: 70, damping: 20 },
                y: { type: "spring", stiffness: 70, damping: 20 }
              }}
            />
            {/* Fade outs at edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0f1c_80%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
