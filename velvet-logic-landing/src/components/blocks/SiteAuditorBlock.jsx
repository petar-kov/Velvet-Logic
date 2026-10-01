import React from 'react';

import SiteAuditor from '../auditor/SiteAuditor';
import { DynamicHeading, RichText, l } from '../shared/SharedComponents';

export default function SiteAuditorBlock({ data }) {
  if (!data) return null;

  return (
    <section 
      className="py-16 md:py-24 px-6 bg-slate relative"
    >
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-navy/30 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="font-heading text-sm tracking-widest text-orange font-bold uppercase mb-3 block">
            {l(data.preTitle)}
          </span>
          <DynamicHeading tag={data.headingTag || 'h2'} className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            {l(data.headingPart1)} <span className="text-orange">{l(data.headingHighlight)}</span>
          </DynamicHeading>
          <div className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            <RichText content={data.subtext} />
          </div>
        </div>
        <SiteAuditor />
      </div>
    </section>
  );
}
