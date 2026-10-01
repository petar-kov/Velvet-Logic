import React from 'react';
import { motion } from 'framer-motion';

import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';
import { urlFor } from '../../sanity';

// Map sanity color field to tailwind classes
const getColorClasses = (color) => {
  switch (color) {
    case 'orange': return 'bg-orange/5 border-orange/20 text-orange';
    case 'navy': return 'bg-navy/5 border-navy/20 text-navy';
    case 'green': return 'bg-green-600/5 border-green-600/20 text-green-600';
    case 'slate': return 'bg-slate/5 border-slate/20 text-slate';
    default: return 'bg-gray/5 border-gray/20 text-gray';
  }
};

const getAvatarGlow = (color) => {
  switch (color) {
    case 'orange': return 'ring-orange/30';
    case 'navy': return 'ring-navy/30';
    case 'green': return 'ring-green-600/30';
    case 'slate': return 'ring-slate/30';
    default: return 'ring-gray/30';
  }
};

export default function TestimonialsBlock({ data }) {
  if (!data || !data.list || data.list.length === 0) return null;

  // Duplicate the list so we have enough content to seamlessly loop the marquee
  const duplicatedList = [...data.list, ...data.list, ...data.list];

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-32 px-0 bg-surface overflow-hidden border-y border-gray/10 relative"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-navy"></span>
            {l(data.headPre)}
            <span className="w-8 h-px bg-navy"></span>
          </span>
          <DynamicHeading tag={data.headTag || 'h2'} className="text-4xl md:text-5xl font-heading font-extrabold text-slate mb-6">
            {l(data.headSub)}
          </DynamicHeading>
          <div className="font-body text-secondary text-lg leading-relaxed">
            <RichText content={data.description} />
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-hidden relative group">
        {/* Gradients to fade the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none" />
        
        {/* Marquee Container */}
        <div className="flex w-fit">
          <motion.div 
            className="flex gap-6 md:gap-8 px-4"
            animate={{ x: "-33.33%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {duplicatedList.map((t, idx) => {
              const colorTheme = getColorClasses(t.color);
              const ringTheme = getAvatarGlow(t.color);
              
              return (
                <div 
                  key={idx} 
                  className="w-[85vw] sm:w-[350px] md:w-[450px] shrink-0 bg-white rounded-3xl p-8 shadow-industrial border border-gray/10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Subtle color accent block */}
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 ${colorTheme.split(' ')[0]}`} />
                  
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-8 text-orange">
                      {[...Array(t.rating || 5)].map((_, i) => <DynamicIcon key={i} name="Star" size={16} fill="currentColor" />)}
                    </div>
                    
                    <div className="font-body text-slate text-lg md:text-xl leading-relaxed mb-10 italic">
                      <RichText content={t.quote} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-gray/5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-xl shrink-0 border-2 border-white shadow-sm ring-4 ${ringTheme} ${!(t.avatar && t.avatar.asset) ? colorTheme : ''} overflow-hidden`}>
                      {t.avatar && t.avatar.asset ? (
                        <img src={urlFor(t.avatar).width(120).height(120).url()} alt={l(t.name)} className="w-full h-full object-cover" />
                      ) : (
                        l(t.initials) || l(t.name)?.charAt(0) || 'U'
                      )}
                    </div>
                    <div>
                      <p className="text-slate font-heading font-bold text-lg">{l(t.name)}</p>
                      <p className="text-secondary font-body text-sm font-medium">{l(t.role)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
