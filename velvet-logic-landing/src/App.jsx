import React, { useRef, useState, useEffect } from 'react';
import { client, urlFor } from './sanity';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import ContactForm from './components/ContactForm';
import SiteAuditor from './components/auditor/SiteAuditor';
import { VisualEditing } from '@sanity/visual-editing/react';

// Detect if we are in preview mode via URL parameter (same as client)
const isPreview = typeof window !== 'undefined' && window.location.search.includes('preview=true');

const DynamicIcon = ({ name, customIcon, ...props }) => {
  if (customIcon) {
    return <img src={urlFor(customIcon).url()} alt="" style={{ width: props.size || 20, height: props.size || 20 }} className={props.className} />
  }
  const Icon = LucideIcons[name] || LucideIcons.ArrowRight;
  return <Icon {...props} />;
};

const RichText = ({ content, className = '' }) => {
  if (!content) return null;
  if (typeof content === 'string') return <>{content}</>;

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || 'Content image'}
            loading="lazy"
            src={client ? imageUrlBuilder(client).image(value).width(800).auto('format').url() : ''}
            className="w-full rounded-xl my-6 border border-gray/20 shadow-md object-cover"
          />
        );
      }
    }
  };

  return (
    <div className={`[&>p]:mb-4 last:[&>p]:mb-0 ${className}`}>
      <PortableText value={content} components={ptComponents} />
    </div>
  );
};

// Simplified Dictionary for English only
const dict = {
  navWork: "Projects",
  navProcess: "Services",
  navContact: "Contact Us",
  btnStart: "GET AN ESTIMATE",
  heroPre: "Stop Bleeding Revenue",
  heroTitle1: "Your website is leaking ",
  heroTitleVelvet: "leads",
  heroTitle2: " to your ",
  heroTitleLogic: "competitors.",
  heroDesc: "A three-second load delay kills 50% of your traffic. We build high-converting funnels that stop the leak and dominate local search.",
  heroBtnStart: "Stop The Leak",
  heroBtnPort: "View Our Work",
  testiHeadPre: "Client",
  testiHeadSub: "Testimonials",
  testiDesc: "Hear from the businesses we've partnered with.",
  procTag: "Our Services",
  procHead: "The ",
  procHeadSpan: "Velvet Logic",
  procHeadEnd: " Advantage",
  procDesc: "Straightforward, no-nonsense web development. We build sites that load fast, rank high, and convert visitors into calling customers.",
  processSteps: [
    { title: "Conversion & Trust Optimization", desc: "We fix hidden phone numbers, broken mobile layouts, and missing estimate forms. We inject social proof and clear Call-To-Actions so when prospects land on your site, they actually call you.", icon: "Target" },
    { title: "Traditional Local SEO & Technical Health", desc: "We rebuild your site's foundation. From lightning-fast load times and secure SSL certificates to optimized H1 tags and Schema markup, we ensure you rank above local competitors on Google.", icon: "Search" },
    { title: "AI Search Readiness (GEO/AEO)", desc: "The future of search is AI. We restructure your content with \"answer-first\" architecture and structured data tables so AI engines recommend your business first.", icon: "Bot" },
    { title: "Compliance & Competitive Protection", desc: "We secure your digital footprint. We plug AdWords leakage where competitors steal your brand traffic, and ensure your site is ADA compliant and legally protected.", icon: "ShieldCheck" }
  ],
  featPreTitle: "Our Approach",
  featHeading: "Built for Lead Generation",
  featSubtext: "We understand that your website isn't an art project. It's a sales tool. We map every section directly to conversion and search engine dominance.",
  feat1Tag: "Trust",
  feat1Title: "Data-Driven Trust",
  feat1Desc: "We replace generic layouts with high-converting, tested funnels. Every element is tested to turn your traffic into verified leads.",
  feat2Tag: "Technical SEO",
  feat2Title: "Search Foundation",
  feat2Desc: "Secure certificates and lightning-fast load times. We build the foundation Google demands.",
  feat3Tag: "AI Optimized",
  feat3Title: "Generative Readiness",
  feat3Desc: "Answer-first architecture. We format your content so generative AI engines recommend you first.",
  faqPreTitle: "Questions",
  faqHeading: "Frequently Asked Questions",
  faqSubtext: "Straight answers about our process.",
  faqQuestions: [
    { question: "How fast can you build a site?", answer: "We typically launch standard service sites within two weeks." },
    { question: "Do you guarantee leads?", answer: "We guarantee an optimized conversion foundation, but market demand dictates volume." },
    { question: "How do I know if my site is leaking leads?", answer: "If your site takes more than 3 seconds to load, lacks a sticky mobile click-to-call button, or doesn't have local schema markup, you are losing leads to competitors." },
    { question: "Do you work with generic templates?", answer: "No. We build custom, high-performance architectures specifically designed for lead capture in the trades and industrial sectors." },
    { question: "What happens after the audit?", answer: "We provide a completely free, no-obligation technical report. If you choose to hire us, we implement the fixes to plug the leaks." }
  ],
  whyPreTitle: "Comparison",
  whyHeading: "Why It Matters",
  whySubtext: "See the difference between standard development and Velvet Logic.",
  whyComparisons: [
    { pillar: "Lead Capture", oldWay: "Hidden phone numbers and broken contact forms.", ourWay: "Sticky mobile CTA bars and optimized lead funnels." },
    { pillar: "Technical SEO", oldWay: "Slow load times and missing H1 tags.", ourWay: "Sub-second load times with pristine Schema markup." },
    { pillar: "AI Readiness", oldWay: "Buried answers and generic text blocks.", ourWay: "Answer-first architecture ready for AI search engines." },
    { pillar: "Analytics", oldWay: "Guessing what visitors are actually doing.", ourWay: "Precision tracking on every button and form submission." },
    { pillar: "Security", oldWay: "Outdated plugins and missing SSL certificates.", ourWay: "Enterprise-grade protection and ADA compliance." },
    { pillar: "Ownership", oldWay: "Held hostage by proprietary agency platforms.", ourWay: "100% ownership of your code, content, and domain." }
  ],
  contactTag: "Get Started",
  contactHead1: "Ready to grow your ",
  contactHeadSpan: "business",
  contactHead2: "?",
  contactDesc: "Contact us today for a free website audit and estimate. We'll show you exactly how we can increase your online leads.",
  contactF1: "Fast Response",
  contactF1Sub: "We'll get back to you within 24 hours.",
  contactF2: "Tailored Solutions",
  contactF2Sub: "Custom strategies for your specific trade.",
  formName: "Name",
  formEmail: "Email",
  formCompany: "Company Name",
  formPhone: "Phone Number",
  formDetails: "Project Details",
  formDetailsPlace: "What do you need help with?",
  formSubmit: "Submit Inquiry",
  formOptional: "(optional)",
  formSuccessTitle: "Thank you.",
  formSuccessDesc: "We've received your inquiry and will be in touch shortly.",
  formError: "Something went wrong. Please try again.",
  formSending: "SENDING..."
};

const getTestimonials = () => {
  return [
    { name: "Mike R.", role: "Owner, Precision HVAC", quote: "They built us a site that actually gets the phone ringing. Highly recommended.", color: "bg-navy" },
    { name: "David S.", role: "Operations Manager, SteelWorks Inc.", quote: "Straightforward process and excellent results. The new site is lightning fast.", color: "bg-navy" },
    { name: "Sarah J.", role: "CEO, Apex Roofing", quote: "Our local SEO rankings skyrocketed after they rebuilt our platform.", color: "bg-navy" },
  ];
};

// --- Components ---

const Navbar = ({ t, logo }) => {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-surface border-b border-gray/20 shadow-sm">
      {logo ? (
        <img src={urlFor(logo).height(40).url()} alt="Logo" className="h-10" />
      ) : (
        <div className="text-2xl font-bold font-heading tracking-tight text-slate">
          VELVET<span className="text-navy">LOGIC</span>
        </div>
      )}
      
      <div className="hidden md:flex gap-8 items-center font-heading font-medium text-sm text-slate">
        <a href="#services" className="hover:text-navy transition-colors">{t.navProcess}</a>
        <a href="#testimonials" className="hover:text-navy transition-colors">{t.navWork}</a>
        <a href="#contact" onClick={scrollToContact} className="hover:text-navy transition-colors">{t.navContact}</a>
      </div>

      <button 
        onClick={scrollToContact}
        className="bg-orange text-white px-6 py-2.5 rounded-lg font-heading font-bold text-sm transition-colors hover:bg-orange/90 shadow-md"
      >
        {t.btnStart}
      </button>
    </nav>
  );
};

const InteractiveServices = ({ t }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const services = t.processSteps || [];

  return (
    <div className="flex flex-col md:flex-row gap-12 mt-16">
      <div className="md:w-1/2 flex flex-col justify-center gap-4">
        {services.map((srv, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setActiveTab(idx)}
            onClick={() => setActiveTab(idx)}
            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${activeTab === idx ? 'border-navy bg-white shadow-xl' : 'border-transparent hover:bg-gray/5'}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeTab === idx ? 'bg-navy text-white shadow-lg shadow-navy/30' : 'bg-navy/10 text-navy'}`}>
                <DynamicIcon name={srv.icon} size={24} />
              </div>
              <h3 className={`text-2xl font-heading font-bold transition-colors duration-300 ${activeTab === idx ? 'text-navy' : 'text-slate'}`}>{srv.title}</h3>
            </div>
            <AnimatePresence>
              {activeTab === idx && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }} 
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="text-secondary pl-[4.5rem] font-body text-base overflow-hidden"
                >
                  <RichText content={srv.desc} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="md:w-1/2 bg-slate rounded-3xl overflow-hidden relative min-h-[400px] flex items-center justify-center shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center text-white z-10"
          >
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
              <DynamicIcon name={services[activeTab].icon} size={40} className="text-orange" />
            </div>
            <h3 className="text-3xl font-heading font-bold mb-4">{services[activeTab].title}</h3>
            <div className="text-white/80 max-w-sm font-body"><RichText content={services[activeTab].desc} /></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const InteractiveBento = ({ t }) => {
  return (
    <div className="grid md:grid-cols-12 gap-6 mt-16">
      {/* Large Featured Block */}
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="md:col-span-7 lg:col-span-8 bg-navy rounded-3xl p-10 flex flex-col justify-between border border-navy/20 shadow-2xl relative overflow-hidden group min-h-[400px]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <span className="text-xs font-heading font-bold bg-white/10 text-white px-3 py-1 rounded-full uppercase tracking-wide">
            {t.feat1Tag}
          </span>
          <h3 className="text-4xl lg:text-5xl font-heading font-bold text-white mt-6 mb-4">{t.feat1Title}</h3>
          <div className="text-white/70 font-body text-lg max-w-md leading-relaxed"><RichText content={t.feat1Desc} /></div>
        </div>
        
        {/* Interactive Loading Bar */}
        <div className="relative z-10 mt-12 bg-white/10 h-3 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-orange relative"
            initial={{ width: "25%" }}
            variants={{ hover: { width: "100%", transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            <div className="absolute inset-0 bg-white/20 blur-sm" />
          </motion.div>
        </div>
      </motion.div>

      {/* Two smaller blocks */}
      <div className="md:col-span-5 lg:col-span-4 grid grid-rows-2 gap-6">
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-surface rounded-3xl p-8 border border-gray/20 shadow-industrial flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-heading font-bold bg-navy/10 text-navy px-3 py-1 rounded-full uppercase tracking-wide">
              {t.feat2Tag}
            </span>
            <motion.div variants={{ hover: { rotate: [0, -10, 10, -10, 10, 0], scale: 1.1, transition: { duration: 0.5 } } }} className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center border border-navy/10">
              <DynamicIcon name="PhoneCall" className="text-navy" size={20} />
            </motion.div>
          </div>
          <h3 className="text-2xl font-heading font-bold text-slate mb-2">{t.feat2Title}</h3>
          <div className="text-secondary font-body leading-relaxed"><RichText content={t.feat2Desc} /></div>
        </motion.div>

        <motion.div 
          whileHover="hover"
          className="bg-surface rounded-3xl p-8 border border-gray/20 shadow-industrial flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-heading font-bold bg-orange/10 text-orange px-3 py-1 rounded-full uppercase tracking-wide">
              {t.feat3Tag}
            </span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((_, i) => (
                <motion.div key={i} variants={{ hover: { opacity: [0.3, 1], scale: [0.8, 1], transition: { delay: i * 0.1 } } }} initial={{ opacity: 0.3 }}>
                  <DynamicIcon name="Star" className="text-orange" size={16} fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-heading font-bold text-slate mb-2">{t.feat3Title}</h3>
          <div className="text-secondary font-body leading-relaxed"><RichText content={t.feat3Desc} /></div>
        </motion.div>
      </div>
    </div>
  );
};

const MagneticCarousel = ({ testimonials }) => {
  const containerRef = useRef(null);
  const featured = testimonials[0];
  const others = testimonials.slice(1);

  if (!featured) return null;

  return (
    <div className="mt-16 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Featured Anchor */}
      <div className="lg:w-1/3 bg-orange rounded-3xl p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[400px]">
        <DynamicIcon name="Quote" size={120} className="absolute -top-6 -left-6 text-white/10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3" />
        <div className="relative z-10 mb-8 font-heading text-2xl font-bold leading-relaxed pt-8">
          "<RichText content={featured.quote} className="inline [&>p]:inline" />"
        </div>
        <div className="relative z-10 flex items-center gap-4 border-t border-white/20 pt-6">
          <div className="h-14 w-14 rounded-full flex items-center justify-center font-bold text-white text-xl bg-white/20 overflow-hidden border-2 border-white/50 shrink-0">
            {featured.avatar ? (
              <img src={urlFor(featured.avatar).width(56).height(56).fit('crop').url()} alt={featured.name} className="w-full h-full object-cover" />
            ) : (
              featured.initials || featured.name.charAt(0)
            )}
          </div>
          <div>
            <h4 className="text-lg font-bold leading-none mb-1">{featured.name}</h4>
            <p className="text-white/80 text-sm font-body font-medium">{featured.role}</p>
          </div>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div className="lg:w-2/3 overflow-hidden rounded-3xl bg-surface border border-gray/10 shadow-inner py-8 flex flex-col" ref={containerRef}>
        <div className="px-8 mb-4 flex items-center justify-between">
          <span className="text-xs font-mono text-secondary uppercase tracking-widest font-bold">Swipe to read more</span>
          <div className="flex gap-2 text-gray/30">
            <DynamicIcon name="ArrowLeft" size={16} />
            <DynamicIcon name="ArrowRight" size={16} />
          </div>
        </div>
        <motion.div 
          drag="x" 
          dragConstraints={containerRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing px-8 pb-4"
          whileTap={{ cursor: "grabbing" }}
        >
          {others.map((t, idx) => (
            <motion.div 
              key={idx} 
              className="min-w-[320px] md:min-w-[400px] bg-white rounded-3xl p-8 shadow-industrial border border-gray/10 flex flex-col justify-between"
              whileHover={{ scale: 1.02, rotate: Math.random() > 0.5 ? 1 : -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex gap-1 mb-6 text-orange">
                {[1,2,3,4,5].map((_, i) => <DynamicIcon key={i} name="Star" size={14} fill="currentColor" />)}
              </div>
              <div className="font-body text-slate italic mb-8 text-lg leading-relaxed flex-grow">
                "<RichText content={t.quote} className="inline [&>p]:inline" />"
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-gray/5">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white ${t.color} overflow-hidden shrink-0`}>
                  {t.avatar ? (
                    <img src={urlFor(t.avatar).width(48).height(48).fit('crop').url()} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    t.initials || t.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate leading-none mb-1">{t.name}</h4>
                  <p className="text-secondary font-body text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const WhyItMatters = ({ t }) => {
  return (
    <section id="why" className="py-24 px-6 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-heading text-sm tracking-widest text-orange font-bold uppercase mb-3 block">
            {t.whyPreTitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6">
            {t.whyHeading}
          </h2>
          <div className="font-body text-secondary text-lg max-w-2xl mx-auto">
            <RichText content={t.whySubtext} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.whyComparisons?.map((comp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-gray/20 rounded-3xl p-6 shadow-industrial relative overflow-hidden group hover:border-gray/30 transition-colors"
            >
              <h3 className="text-lg font-heading font-bold text-slate mb-6 border-b border-gray/10 pb-3">
                {comp.pillar}
              </h3>
              
              <div className="space-y-4">
                {/* The Old Way */}
                <div className="bg-surface p-4 rounded-2xl border border-gray/10 relative group-hover:border-gray/20 transition-colors">
                  <div className="absolute top-4 left-4 text-red-500">
                    <DynamicIcon name="XCircle" size={20} />
                  </div>
                  <div className="pl-10">
                    <div className="text-[10px] uppercase tracking-wider text-red-500 mb-1 font-bold font-heading">The Bleed</div>
                    <p className="text-secondary font-body text-sm leading-relaxed">{comp.oldWay}</p>
                  </div>
                </div>
                
                {/* The Velvet Logic Way */}
                <div className="bg-green-500/5 p-4 rounded-2xl border border-green-500/20 relative shadow-sm">
                  <div className="absolute top-4 left-4 text-green-600">
                    <DynamicIcon name="CheckCircle" size={20} />
                  </div>
                  <div className="pl-10">
                    <div className="text-[10px] uppercase tracking-wider text-green-600 mb-1 font-bold font-heading">The Velvet Logic Fix</div>
                    <p className="text-slate font-body font-medium text-sm leading-relaxed">{comp.ourWay}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faq = ({ t }) => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-3 block">
            {t.faqPreTitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6">
            {t.faqHeading}
          </h2>
          <div className="font-body text-secondary text-lg max-w-2xl mx-auto">
            <RichText content={t.faqSubtext} />
          </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faqQuestions?.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div 
                key={idx} 
                className={`border border-gray/20 rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white shadow-industrial border-navy/20' : 'bg-surface hover:bg-white'}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 lg:p-8 flex items-center justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:ring-inset"
                >
                  <h3 className={`text-xl font-heading font-bold transition-colors ${isOpen ? 'text-navy' : 'text-slate'}`}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-navy/10 text-navy' : 'bg-gray/5 text-secondary'}`}
                  >
                    <DynamicIcon name="ChevronDown" size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="px-6 lg:px-8 pb-8 pt-0 font-body text-secondary leading-relaxed border-t border-gray/5 mt-2 pt-6">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DynamicHeading = ({ tag = 'h2', children, animate, ...props }) => {
  const Tag = (tag || 'h2').toLowerCase();
  const Component = animate ? motion[Tag] : Tag;
  return <Component {...props}>{children}</Component>;
};

export default function App() {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    const query = `*[_id in ["home-page", "navigation", "settings", "footer"]] {
      _id,
      _type,
      ...
    }`;

    client.fetch(query).then(data => {
      const home = data.find(d => d._type === 'homePage');
      const navigation = data.find(d => d._type === 'navigation');
      const settings = data.find(d => d._type === 'settings');
      const footer = data.find(d => d._type === 'footer');

      const sectionMap = {
        hero: home?.sections?.find(s => s._type === 'hero'),
        testimonials: home?.sections?.find(s => s._type === 'testimonials'),
        process: home?.sections?.find(s => s._type === 'process'),
        whyItMatters: home?.sections?.find(s => s._type === 'whyItMatters'),
        siteAuditor: home?.sections?.find(s => s._type === 'siteAuditor'),
        values: home?.sections?.find(s => s._type === 'values'),
        faq: home?.sections?.find(s => s._type === 'faq'),
        contact: home?.sections?.find(s => s._type === 'contact')
      };

      setSanityData({ ...sectionMap, navigation, settings, footer });
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (sanityData?.settings?.siteTitle) {
      document.title = l(sanityData.settings.siteTitle) || "Velvet Logic";
    }
    if (sanityData?.settings?.seoDesc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', l(sanityData.settings.seoDesc));
      }
    }
    if (sanityData?.settings?.favicon) {
      let linkIcon = document.querySelector('link[rel="icon"]');
      if (linkIcon) {
        linkIcon.setAttribute('href', urlFor(sanityData.settings.favicon).width(32).height(32).url());
      }
    }
  }, [sanityData]);

  // Simplify translation helper to just return the string or the English property
  const l = (field) => field && typeof field === 'object' ? field.en || '' : (field || '');

  const t = {
    heroTitleTag: sanityData?.hero?.titleTag || 'h1',
    testiHeadTag: sanityData?.testimonials?.headTag || 'h2',
    procHeadTag: sanityData?.process?.headTag || 'h2',
    featHeadTag: sanityData?.values?.headingTag || 'h2',
    contactHeadTag: sanityData?.contact?.headTag || 'h2',

    navWork: l(sanityData?.navigation?.navWork) || dict.navWork,
    navProcess: l(sanityData?.navigation?.navProcess) || dict.navProcess,
    navContact: l(sanityData?.navigation?.navContact) || dict.navContact,
    btnStart: l(sanityData?.navigation?.btnStart) || dict.btnStart,
    
    heroPre: l(sanityData?.hero?.preTitle) || dict.heroPre,
    heroTitle1: l(sanityData?.hero?.titlePart1) || dict.heroTitle1,
    heroTitleVelvet: l(sanityData?.hero?.titleVelvet) || dict.heroTitleVelvet,
    heroTitle2: l(sanityData?.hero?.titlePart2) || dict.heroTitle2,
    heroTitleLogic: l(sanityData?.hero?.titleLogic) || dict.heroTitleLogic,
    heroDesc: l(sanityData?.hero?.description) || dict.heroDesc,
    heroBtnStart: l(sanityData?.hero?.btnStartText) || dict.heroBtnStart,
    heroBtnStartIcon: sanityData?.hero?.btnStartIcon || 'Phone',
    heroBtnPort: l(sanityData?.hero?.btnPortText) || dict.heroBtnPort,
    heroSocialProofText: l(sanityData?.hero?.socialProofText) || 'Trusted by 150+ Trade Businesses',
    heroSocialProofSub: l(sanityData?.hero?.socialProofSubtext) || 'Rated 5.0/5.0 on Google & Clutch',
    heroStatLabel: l(sanityData?.hero?.floatingStatLabel) || 'Avg. Lead Growth',
    heroStatValue: l(sanityData?.hero?.floatingStatValue) || '+340%',

    auditorPre: l(sanityData?.siteAuditor?.preTitle) || 'Instant Analysis',
    auditorHead1: l(sanityData?.siteAuditor?.headingPart1) || 'Get Your Free ',
    auditorHeadHighlight: l(sanityData?.siteAuditor?.headingHighlight) || 'Site Audit',
    auditorSub: l(sanityData?.siteAuditor?.subtext) || 'Enter your domain below. Our engine will instantly scan your site for Conversion Leaks, Local SEO errors, and AI Search Readiness.',
    auditorEmailLabel: l(sanityData?.siteAuditor?.formEmailLabel) || 'Email address',
    auditorUrlLabel: l(sanityData?.siteAuditor?.formUrlLabel) || 'Website URL (e.g. example.com)',
    auditorSubmit: l(sanityData?.siteAuditor?.formSubmitText) || 'Scan My Site',
    auditorLoading: l(sanityData?.siteAuditor?.formLoadingText) || 'SCANNING...',
    auditorMockTag: l(sanityData?.siteAuditor?.mockReportTag) || 'Live Preview',
    auditorMockTitle: l(sanityData?.siteAuditor?.mockReportTitle) || 'Diagnostic Report',
    auditorMock1Title: l(sanityData?.siteAuditor?.mockReportItem1Title) || 'Performance',
    auditorMock1Sub: l(sanityData?.siteAuditor?.mockReportItem1Sub) || 'Sub-second load time',
    auditorMock2Title: l(sanityData?.siteAuditor?.mockReportItem2Title) || 'Conversion Leaks',
    auditorMock2Sub: l(sanityData?.siteAuditor?.mockReportItem2Sub) || '3 critical errors',
    auditorMockList1: l(sanityData?.siteAuditor?.mockReportList1) || 'SSL Certificate Valid',
    auditorMockList2: l(sanityData?.siteAuditor?.mockReportList2) || 'Missing sticky mobile CTA',
    auditorMockList3: l(sanityData?.siteAuditor?.mockReportList3) || 'Multiple H1 tags detected',

    testiHeadPre: l(sanityData?.testimonials?.headPre) || dict.testiHeadPre,
    testiHeadSub: l(sanityData?.testimonials?.headSub) || dict.testiHeadSub,
    testiDesc: l(sanityData?.testimonials?.description) || dict.testiDesc,

    procTag: l(sanityData?.process?.tag) || dict.procTag,
    procHead: l(sanityData?.process?.head) || dict.procHead,
    procHeadSpan: l(sanityData?.process?.headSpan) || dict.procHeadSpan,
    procHeadEnd: l(sanityData?.process?.headEnd) || dict.procHeadEnd,
    procDesc: l(sanityData?.process?.description) || dict.procDesc,
    processSteps: sanityData?.process?.steps?.length > 0
      ? sanityData.process.steps.map(s => ({
          title: l(s.title),
          desc: l(s.description),
          icon: s.icon || 'Check'
        }))
      : dict.processSteps,

    featPreTitle: l(sanityData?.values?.preTitle) || dict.featPreTitle,
    featHeading:  l(sanityData?.values?.heading)  || dict.featHeading,
    featSubtext:  l(sanityData?.values?.subtext)   || dict.featSubtext,
    feat1Tag: l(sanityData?.values?.cards?.[0]?.tag) || dict.feat1Tag,
    feat1Title: l(sanityData?.values?.cards?.[0]?.title) || dict.feat1Title,
    feat1Desc: l(sanityData?.values?.cards?.[0]?.description) || dict.feat1Desc,
    feat2Tag: l(sanityData?.values?.cards?.[1]?.tag) || dict.feat2Tag,
    feat2Title: l(sanityData?.values?.cards?.[1]?.title) || dict.feat2Title,
    feat2Desc: l(sanityData?.values?.cards?.[1]?.description) || dict.feat2Desc,
    feat3Tag: l(sanityData?.values?.cards?.[2]?.tag) || dict.feat3Tag,
    feat3Title: l(sanityData?.values?.cards?.[2]?.title) || dict.feat3Title,
    feat3Desc: l(sanityData?.values?.cards?.[2]?.description) || dict.feat3Desc,

    faqPreTitle: l(sanityData?.faq?.preTitle) || dict.faqPreTitle,
    faqHeading: l(sanityData?.faq?.heading) || dict.faqHeading,
    faqSubtext: l(sanityData?.faq?.subtext) || dict.faqSubtext,
    faqQuestions: sanityData?.faq?.questions?.length > 0 
      ? sanityData.faq.questions.map(q => ({
          question: l(q.question),
          answer: l(q.answer)
        }))
      : dict.faqQuestions,

    whyPreTitle: l(sanityData?.whyItMatters?.preTitle) || dict.whyPreTitle,
    whyHeading: l(sanityData?.whyItMatters?.heading) || dict.whyHeading,
    whySubtext: l(sanityData?.whyItMatters?.subtext) || dict.whySubtext,
    whyComparisons: sanityData?.whyItMatters?.comparisons?.length > 0
      ? sanityData.whyItMatters.comparisons.map(c => ({
          pillar: l(c.pillar),
          oldWay: l(c.oldWay),
          ourWay: l(c.ourWay)
        }))
      : dict.whyComparisons,

    contactTag: l(sanityData?.contact?.tag) || dict.contactTag,
    contactHead1: l(sanityData?.contact?.head1) || dict.contactHead1,
    contactHeadSpan: l(sanityData?.contact?.headSpan) || dict.contactHeadSpan,
    contactHead2: l(sanityData?.contact?.head2) || dict.contactHead2,
    contactDesc: l(sanityData?.contact?.description) || dict.contactDesc,
    contactF1: l(sanityData?.contact?.features?.[0]?.title) || dict.contactF1,
    contactF1Icon: sanityData?.contact?.features?.[0]?.icon || 'Clock',
    contactF1Sub: l(sanityData?.contact?.features?.[0]?.subtext) || dict.contactF1Sub,
    contactF2: l(sanityData?.contact?.features?.[1]?.title) || dict.contactF2,
    contactF2Icon: sanityData?.contact?.features?.[1]?.icon || 'CheckCircle',
    contactF2Sub: l(sanityData?.contact?.features?.[1]?.subtext) || dict.contactF2Sub,
    
    formName: l(sanityData?.contact?.formLabels?.name) || dict.formName,
    formCompany: l(sanityData?.contact?.formLabels?.company) || dict.formCompany,
    formEmail: l(sanityData?.contact?.formLabels?.email) || dict.formEmail,
    formPhone: l(sanityData?.contact?.formLabels?.phone) || dict.formPhone,
    formDetails: l(sanityData?.contact?.formLabels?.details) || dict.formDetails,
    formDetailsPlace: l(sanityData?.contact?.formLabels?.detailsPlace) || dict.formDetailsPlace,
    formSubmit: l(sanityData?.contact?.formLabels?.submit) || dict.formSubmit,
    formSubmitIcon: sanityData?.contact?.formLabels?.btnSubmitIcon || 'Send',
    
    formOptional: dict.formOptional,
    formSuccessTitle: dict.formSuccessTitle,
    formSuccessDesc: dict.formSuccessDesc,
    formError: dict.formError,
    formSending: dict.formSending,
  };

  const activeTestimonials = sanityData?.testimonials?.list?.length 
    ? sanityData.testimonials.list.map(item => ({
        name: l(item.name),
        role: l(item.role),
        quote: l(item.quote),
        color: item.color || "bg-navy",
        avatar: item.avatar,
        initials: item.initials
      })) 
    : getTestimonials();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-mercury text-slate min-h-screen font-body antialiased selection:bg-orange/20 selection:text-orange">
      <Navbar t={t} logo={sanityData?.settings?.logo} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-surface">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-navy/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left"
          >
            <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-navy"></span>
              {t.heroPre}
            </span>
            <DynamicHeading tag={t.heroTitleTag} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-8 text-slate leading-[1.1]">
              {t.heroTitle1} <span className="text-navy">{t.heroTitleVelvet}</span><br />
              {t.heroTitle2} <span className="text-orange">{t.heroTitleLogic}</span>
            </DynamicHeading>
            <div className="font-body text-secondary text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              <RichText content={t.heroDesc} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-start">
              <motion.button 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-orange text-white px-8 py-4 rounded-lg font-heading font-bold text-lg shadow-lg hover:bg-orange/90 transition-colors flex items-center justify-center gap-2"
              >
                {t.heroBtnStart} <DynamicIcon name={t.heroBtnStartIcon} size={20} />
              </motion.button>
              
              <motion.button 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-surface border-2 border-gray/20 text-slate px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-gray/5 transition-colors"
              >
                {t.heroBtnPort}
              </motion.button>
            </div>

            {/* Social Proof Section */}
            <div className="mt-12 pt-10 border-t border-gray/20 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-2 border-surface overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="User 1" /></div>
                <div className="w-12 h-12 rounded-full border-2 border-surface overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="User 2" /></div>
                <div className="w-12 h-12 rounded-full border-2 border-surface overflow-hidden"><img src="https://i.pravatar.cc/100?img=13" alt="User 3" /></div>
                <div className="w-12 h-12 rounded-full border-2 border-surface overflow-hidden bg-navy flex items-center justify-center text-white font-bold text-xs">+150</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex gap-1 mb-1 text-orange justify-center sm:justify-start">
                  <DynamicIcon name="Star" size={16} fill="currentColor" />
                  <DynamicIcon name="Star" size={16} fill="currentColor" />
                  <DynamicIcon name="Star" size={16} fill="currentColor" />
                  <DynamicIcon name="Star" size={16} fill="currentColor" />
                  <DynamicIcon name="Star" size={16} fill="currentColor" />
                </div>
                <p className="text-slate font-bold font-heading text-sm">{t.heroSocialProofText}</p>
                <p className="text-secondary text-xs font-body mt-1">{t.heroSocialProofSub}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white mt-8 md:mt-0"
          >
            <img src={sanityData?.settings?.defaultHeroImage ? urlFor(sanityData.settings.defaultHeroImage).url() : "/hero-industrial.png"} alt="Hero background" className="w-full h-full object-cover" />
            
            {/* Overlay floating element for extra appeal */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white p-4 pr-8 rounded-xl shadow-xl border border-gray/10 flex items-center gap-4 animate-bounce z-20" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <DynamicIcon name="TrendingUp" className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-secondary uppercase font-bold tracking-wider">{t.heroStatLabel}</p>
                <p className="text-lg md:text-xl font-heading font-bold text-slate">{t.heroStatValue}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-6 bg-surface border-y border-gray/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-3 block">
              {t.procTag}
            </span>
            <DynamicHeading tag={t.procHeadTag} className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6">
              {t.procHead}<span className="text-navy">{t.procHeadSpan}</span>{t.procHeadEnd}
            </DynamicHeading>
            <div className="font-body text-secondary text-lg leading-relaxed">
              <RichText content={t.procDesc} />
            </div>
          </div>
          
          <InteractiveServices t={t} />
        </div>
      </section>

      {/* FEATURES / APPROACH SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-3 block">
            {t.featPreTitle}
          </span>
          <DynamicHeading tag={t.featHeadTag} className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6">
            {t.featHeading}
          </DynamicHeading>
          <div className="font-body text-secondary text-lg leading-relaxed">
            <RichText content={t.featSubtext} />
          </div>
        </div>

        <InteractiveBento t={t} />
      </section>

      <WhyItMatters t={t} />

      <SiteAuditor t={t} />

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 bg-slate text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <DynamicHeading tag={t.testiHeadTag} className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {t.testiHeadPre} <span className="text-orange">{t.testiHeadSub}</span>
            </DynamicHeading>
            <div className="font-body text-white/80 text-lg">
              <RichText content={t.testiDesc} />
            </div>
          </div>
          
          <MagneticCarousel testimonials={activeTestimonials} />
        </div>
      </section>

      <Faq t={t} />

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="font-heading text-sm tracking-widest text-navy font-bold uppercase mb-4 block">
              {t.contactTag}
            </span>
            <DynamicHeading tag={t.contactHeadTag} className="text-4xl md:text-5xl font-heading font-bold mb-6 text-slate">
              {t.contactHead1}<span className="text-orange">{t.contactHeadSpan}</span>{t.contactHead2}
            </DynamicHeading>
            <div className="text-secondary font-body mb-10 text-lg leading-relaxed">
              <RichText content={t.contactDesc} />
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <DynamicIcon name={t.contactF1Icon} className="text-navy" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate text-xl mb-1">{t.contactF1}</h4>
                  <p className="text-secondary">{t.contactF1Sub}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <DynamicIcon name={t.contactF2Icon} className="text-navy" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate text-xl mb-1">{t.contactF2}</h4>
                  <p className="text-secondary">{t.contactF2Sub}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray/20 shadow-lg">
            {/* The ContactForm component might still have some internal styling to fix, but we use it as is for now */}
            <ContactForm 
              currentLang="ENG"
              labels={{
                name: t.formName,
                company: t.formCompany,
                email: t.formEmail,
                phone: t.formPhone,
                details: t.formDetails,
                detailsPlace: t.formDetailsPlace,
                submit: t.formSubmit,
                optional: t.formOptional,
                successTitle: t.formSuccessTitle,
                successDesc: t.formSuccessDesc,
                errorText: t.formError,
                sending: t.formSending,
                submitIcon: t.formSubmitIcon
              }} 
            />
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-slate py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold font-heading tracking-tight text-white">
            {sanityData?.footer?.logoTextMain || "VELVET"}<span className="text-orange">{sanityData?.footer?.logoTextHighlight || "LOGIC"}</span>
          </div>
          <div className="flex gap-8 font-heading text-sm font-medium text-white/60 hover:[&>a]:text-white transition-colors">
            {sanityData?.footer?.socialLinks?.length ? (
              sanityData.footer.socialLinks.map((link) => (
                <a key={link._key || link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
              ))
            ) : (
              <>
                <a href="#linkedin">LinkedIn</a>
                <a href="#facebook">Facebook</a>
                <a href="#twitter">Twitter</a>
              </>
            )}
          </div>
        </div>
      </footer>
      
      {isPreview && <VisualEditing />}
    </div>
  );
}
