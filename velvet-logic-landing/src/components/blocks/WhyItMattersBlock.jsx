import React from 'react';
import { motion } from 'framer-motion';

import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';

export default function WhyItMattersBlock({ data }) {
  if (!data) return null;

  const comparisons = data.comparisons || [];

  return (
    <section 
      id="why" 
      className="py-16 md:py-24 px-6 bg-surface relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-3 block">
            {l(data.preTitle)}
          </span>
          <DynamicHeading tag={data.headingTag || 'h2'} className="text-4xl md:text-5xl font-heading font-extrabold text-slate mb-6">
            {l(data.heading)}
          </DynamicHeading>
          <div className="font-body text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            <RichText content={data.subtext} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {comparisons.map((comp, idx) => (
            <motion.div 
              key={comp._key || idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col shadow-xl border border-gray/10 group relative overflow-hidden"
            >
              <div className="mb-4 relative z-10">
                <span className="text-navy font-heading text-[10px] font-bold uppercase tracking-wider mb-1 block">
                  Pillar 0{idx + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-slate">{l(comp.pillar)}</h3>
              </div>

              <div className="space-y-3 relative z-10 flex-grow flex flex-col justify-end">
                <div className="bg-gray/5 rounded-xl p-4 border border-gray/10">
                  <div className="flex items-center gap-3 mb-3 text-secondary font-heading font-bold text-sm uppercase">
                    <DynamicIcon name="XCircle" size={18} className="text-secondary/70" />
                    The Old Way
                  </div>
                  <p className="text-secondary font-body text-sm leading-relaxed">{l(comp.oldWay)}</p>
                </div>

                <div className="bg-navy/5 rounded-xl p-4 border border-navy/10 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <div className="flex items-center gap-3 mb-3 text-navy font-heading font-bold text-sm uppercase relative z-10">
                    <DynamicIcon name="CheckCircle2" size={18} className="text-orange" />
                    The Velvet Logic Way
                  </div>
                  <p className="text-slate font-body text-sm font-medium leading-relaxed relative z-10">{l(comp.ourWay)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
