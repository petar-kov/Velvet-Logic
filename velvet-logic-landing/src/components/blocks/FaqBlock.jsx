import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { DynamicIcon, RichText, DynamicHeading, l } from '../shared/SharedComponents';

export default function FaqBlock({ data }) {
  const [openFaq, setOpenFaq] = useState(null);

  const hcFaqs = [
    {
      _key: 'hc-ux-1',
      question: { en: "How does premium design and UX actually drive business growth?" },
      answer: { en: "In today's digital landscape, your website is often your first impression. High-end design and seamless UX build instant trust, reducing bounce rates and friction. When a potential client sees a flawless, professional brand, they unconsciously associate that quality with your services, allowing you to command higher prices, close leads faster, and outpace competitors who rely on outdated templates." }
    },
    {
      _key: 'hc-ux-2',
      question: { en: "Does a 'velvet logic' aesthetic matter for industrial or service businesses?" },
      answer: { en: "Absolutely. While many industrial brands settle for generic looks, adopting a premium visual philosophy immediately sets you apart from the pack. It signals authority, reliability, and modern efficiency. A polished brand ensures you stop looking like a commodity and start looking like an undisputed industry leader." }
    }
  ];

  const newFaq = {
    _key: 'hc-other-services',
    question: { en: "Do you offer other services beyond web design?" },
    answer: { en: "Yes. Beyond building high-performance websites, we provide comprehensive branding, content planning, and content production (including blog writing and new page creation). We also offer ongoing retainers for web and copy updates to ensure your digital presence remains sharp, effective, and up-to-date." }
  };

  let allQuestions = data?.questions ? [...data.questions, ...hcFaqs] : [...hcFaqs];
  
  if (allQuestions.length > 0) {
    const middleIndex = Math.floor(allQuestions.length / 2);
    allQuestions.splice(middleIndex, 0, newFaq);
  } else {
    allQuestions = [newFaq];
  }

  if (!allQuestions || allQuestions.length === 0) return null;

  return (
    <section 
      className="py-16 md:py-24 px-6 bg-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-3 block">
            {l(data.preTitle)}
          </span>
          <DynamicHeading tag={data.headingTag || 'h2'} className="text-3xl md:text-5xl font-heading font-bold text-slate mb-6">
            {l(data.heading)}
          </DynamicHeading>
          <div className="font-body text-secondary text-lg leading-relaxed">
            <RichText content={data.subtext} />
          </div>
        </div>

        <div className="space-y-4">
          {allQuestions.map((q, idx) => (
            <div 
              key={q._key || idx} 
              className="border border-gray/20 rounded-2xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-surface transition-colors"
              >
                <span className="font-heading font-bold text-slate text-lg">{l(q.question)}</span>
                <motion.div
                  animate={{ rotate: openFaq === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy shrink-0 ml-4"
                >
                  <DynamicIcon name="ChevronDown" size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-secondary font-body leading-relaxed border-t border-gray/10">
                      <div className="mt-4"><RichText content={q.answer} /></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
