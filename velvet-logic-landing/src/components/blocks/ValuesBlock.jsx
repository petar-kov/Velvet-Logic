import React from 'react';
import { motion } from 'framer-motion';

import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';

const NetworkAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <motion.line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#EB5E28" strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.line x1="50%" y1="50%" x2="80%" y2="40%" stroke="#EB5E28" strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
      <motion.line x1="50%" y1="50%" x2="60%" y2="80%" stroke="#EB5E28" strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
      <motion.circle cx="20%" cy="30%" r="4" fill="#EB5E28" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="50%" cy="50%" r="6" fill="#fff" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
      <motion.circle cx="80%" cy="40%" r="4" fill="#EB5E28" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
      <motion.circle cx="60%" cy="80%" r="4" fill="#EB5E28" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1.5, repeat: Infinity }} />
    </svg>
  </div>
);

const BlocksAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center">
    <div className="relative w-32 h-32 mt-16">
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-orange/40 border border-orange shadow-[0_0_15px_rgba(235,94,40,0.5)] rounded-sm" animate={{ y: [-150, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }} />
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-orange/30 border border-orange shadow-[0_0_15px_rgba(235,94,40,0.5)] rounded-sm" animate={{ y: [-150, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }} />
      <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-8 bg-orange/20 border border-orange shadow-[0_0_15px_rgba(235,94,40,0.5)] rounded-sm" animate={{ y: [-150, 0] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 1, ease: "easeOut" }} />
    </div>
  </div>
);

export default function ValuesBlock({ data }) {
  if (!data || !data.cards) return null;

  return (
    <section 
      id="services" 
      className="py-20 md:py-32 px-6 bg-[#0a0f1c] relative overflow-hidden"
    >
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-navy/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange/10 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-heading text-sm tracking-widest text-orange font-bold uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-orange"></span>
            {l(data.preTitle)}
            <span className="w-8 h-px bg-orange"></span>
          </span>
          <DynamicHeading tag={data.headingTag || 'h2'} className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
            {l(data.heading)}
          </DynamicHeading>
          <div className="font-body text-white/70 text-lg md:text-xl leading-relaxed">
            <RichText content={data.subtext} />
          </div>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(300px,auto)]">
          {data.cards.map((card, idx) => {
            const fallbackIcons = ['Search', 'Map', 'Zap'];
            const iconName = card.icon || fallbackIcons[idx % fallbackIcons.length];
            
            return (
              <motion.div 
                key={card._key || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
              >
                {/* Custom Card Background Animations */}
                {l(card.title) === 'Conversion Mapping' && <NetworkAnimation />}
                {(l(card.title) === 'The Velvet Logic Fix' || l(card.title).includes('Fix')) && <BlocksAnimation />}

                {/* Hover Reveal Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top Section */}
                <div className="relative z-10 mb-12">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy/50 border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <DynamicIcon name={iconName} customIcon={card.iconCustom} size={32} />
                    </div>
                    
                    {/* Tags */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-end max-w-[50%]">
                        {card.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] text-white/80 font-heading uppercase tracking-wider font-bold backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-heading font-bold text-white mb-4 text-2xl md:text-3xl">
                    {l(card.title)}
                  </h3>
                  
                  <div className="text-white/60 font-body leading-relaxed md:text-lg">
                    <RichText content={card.description} />
                  </div>
                </div>

                {/* Bottom Section (Metric) */}
                {l(card.metric) && (
                  <div className="relative z-10 mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-white/40 font-heading text-xs uppercase tracking-widest font-bold">Key Metric</span>
                    <span className="text-xl md:text-2xl font-heading font-bold text-orange group-hover:text-white transition-colors duration-300">
                      {l(card.metric)}
                    </span>
                  </div>
                )}
                
                {/* Decorative scanning line animation on hover */}
                {idx === 0 && (
                  <motion.div 
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent top-0 -translate-y-full opacity-0 group-hover:opacity-100"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
