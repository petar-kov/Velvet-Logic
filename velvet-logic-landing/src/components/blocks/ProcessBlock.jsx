import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';

export default function ProcessBlock({ data }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!data || !data.steps) return null;

  const steps = data.steps.map(step => {
    if (l(step.title) === 'Ad Spend Bleed') {
      return {
        ...step,
        title: { en: 'Unprofessional, Generic Design' },
        description: { 
          en: [{ 
            _key: step.description?.en?.[0]?._key || 'desc1',
            _type: 'block', 
            children: [{ 
              _key: step.description?.en?.[0]?.children?.[0]?._key || 'span1',
              _type: 'span', 
              marks: [],
              text: 'If your brand looks like a generic template from 2015, high-end clients will assume your work is equally outdated. We build striking, premium interfaces that instantly establish authority and trust.' 
            }],
            markDefs: [],
            style: 'normal'
          }] 
        },
        icon: 'Palette'
      };
    }
    return step;
  });

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 bg-white relative"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-4 block">
            {l(data.tag)}
          </span>
          <DynamicHeading tag={data.headingTag || 'h2'} className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6 leading-tight">
            {l(data.head)} <span className="text-navy">{l(data.headSpan)}</span> {l(data.headEnd)}
          </DynamicHeading>
          <div className="font-body text-secondary text-lg leading-relaxed">
            <RichText content={data.description} />
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-gray/10 rounded-full" />
          <motion.div 
            className="absolute left-[27px] top-4 bottom-4 w-1 bg-gradient-to-b from-navy via-navy to-orange rounded-full origin-top"
            style={{ scaleY: height }}
          />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div 
                key={step._key || idx} 
                className="relative pl-20 group"
              >
                <div className="absolute left-0 top-1 w-14 h-14 bg-white border-4 border-surface shadow-md rounded-full flex items-center justify-center font-heading font-bold text-slate z-10 transition-transform group-hover:scale-110 group-hover:border-navy group-hover:text-navy">
                  <DynamicIcon name={step.icon} customIcon={step.iconCustom} size={24} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate mb-3">{l(step.title)}</h3>
                <div className="text-secondary font-body leading-relaxed text-lg">
                  <RichText content={step.description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
