import React from 'react';

import ContactForm from '../ContactForm';
import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';

export default function ContactBlock({ data }) {
  if (!data) return null;

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 px-6 bg-slate relative"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          {l(data.tag) && (
            <span className="font-heading text-sm tracking-widest text-orange font-bold uppercase mb-4 block">
              {l(data.tag)}
            </span>
          )}
          
          <DynamicHeading tag={data.headTag || 'h2'} className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
            {l(data.head1)} <span className="text-orange">{l(data.headSpan)}</span> {l(data.head2)}
          </DynamicHeading>
          
          <div className="font-body text-white/70 text-lg leading-relaxed mb-12 max-w-md">
            <RichText content={data.description} />
          </div>

          {data.features && data.features.length > 0 && (
            <div className="space-y-8">
              {data.features.map((feature, idx) => (
                <div key={feature._key || idx} className="flex items-start gap-4 text-white group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange/20 transition-colors">
                    <DynamicIcon name={feature.icon} customIcon={feature.iconCustom} size={24} className="text-white group-hover:text-orange transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg mb-1">{l(feature.title)}</h4>
                    <p className="font-body text-white/50">{l(feature.subtext)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <ContactForm labels={data.formLabels} />
        </div>
      </div>
    </section>
  );
}
