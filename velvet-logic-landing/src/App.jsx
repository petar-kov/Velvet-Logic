import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Layers, Zap } from 'lucide-react';
import VelvetSpheres from './VelvetSpheres';
import ContactForm from './components/ContactForm';
const dict = {
  ENG: {
    navWork: "Testimonials",
    navProcess: "Process",
    navContact: "Contact",
    btnStart: "START PROJECT",
    heroPre: "Innovative Digital Solutions",
    heroTitle1: "Soft as ",
    heroTitleVelvet: "Velvet",
    heroTitle2: "Sharp as ",
    heroTitleLogic: "Logic.",
    heroDesc: "We design and build high-performance interfaces that bridge the gap between human emotion and technical precision.",
    heroBtnStart: "Start your journey",
    heroBtnPort: "Read Testimonials",
    testiHeadPre: "Client",
    testiHeadSub: "Testimonials",
    testiDesc: "Hear from the teams we've partnered with. [Scroll horizontally]",
    procTag: "Build Philosophy",
    procHead: "The ",
    procHeadSpan: "Velvet Logic",
    procHeadEnd: " Framework",
    procDesc: "We don't believe in black boxes. Our 3-step process is transparent, iterative, and designed to move from concept to high-performance code rapidly.",
    proc1Title: "Kick Off",
    proc1Desc: "Understanding the core problem, defining exact technical requirements, and establishing the creative direction.",
    proc2Title: "Prototype",
    proc2Desc: "Rapid wireframing and interactive high-fidelity prototypes to visualize the experience before writing code.",
    proc3Title: "Launch",
    proc3Desc: "Developing with modern frameworks, rigorous performance testing, and deploying a scalable final product.",
    feat1Tag: "The Vision",
    feat1Title: "Creative Fluidity",
    feat1Desc: "We reject rigid frameworks. Our design process adapts to your brand like liquid, filling every gap in the user experience.",
    feat2Tag: "The Engine",
    feat2Title: "Technical Logic",
    feat2Desc: "High-performance code that ensures your site isn't just pretty—it's a high-speed machine optimized for conversion.",
    feat3Tag: "The Result",
    feat3Title: "Human Impact",
    feat3Desc: "We build for the people on the other side of the screen, creating emotional resonance through motion and glassmorphism.",
    contactTag: "Let's Talk",
    contactHead1: "Ready to apply ",
    contactHeadSpan: "Velvet Logic",
    contactHead2: "?",
    contactDesc: "Whether you need a cutting-edge landing page, a complex web application, or a holistic brand redesign, we're ready to build.",
    contactF1: "Fast Response",
    contactF1Sub: "Within 24 business hours",
    contactF2: "Tailored Solutions",
    contactF2Sub: "Custom tailored to your specific needs",
    formName: "Name",
    formEmail: "Email",
    formDetails: "Project Details",
    formDetailsPlace: "Tell us about your next big idea...",
    formSubmit: "Submit Inquiry"
  },
  SRB: {
    navWork: "Svedočanstva",
    navProcess: "Proces",
    navContact: "Kontakt",
    btnStart: "ZAPOČNI PROJEKAT",
    heroPre: "Inovativna Digitalna Rešenja",
    heroTitle1: "Mekano kao ",
    heroTitleVelvet: "Pliš",
    heroTitle2: "Oštro kao ",
    heroTitleLogic: "Logika.",
    heroDesc: "Dizajniramo i gradimo interfejse visokih performansi koji premošćuju jaz između ljudske emocije i tehničke preciznosti.",
    heroBtnStart: "Započni putovanje",
    heroBtnPort: "Pročitaj Svedočanstva",
    testiHeadPre: "Svedočanstva",
    testiHeadSub: "Klijenata",
    testiDesc: "Čuj šta kažu timovi sa kojima smo sarađivali. [Skroluj horizontalno]",
    procTag: "Filozofija Izrade",
    procHead: "Radni Okvir ",
    procHeadSpan: "Velvet Logic",
    procHeadEnd: "",
    procDesc: "Ne verujemo u skrivene kutije. Naš proces je transparentan, iterativan i dizajniran da brzo pređe od koncepta do koda visokih performansi.",
    proc1Title: "Početak",
    proc1Desc: "Razumevanje srži problema, definisanje tačnih tehničkih zahteva i uspostavljanje kreativnog pravca.",
    proc2Title: "Prototip",
    proc2Desc: "Brza izrada okvira i interaktivni prototipi visoke tačnosti za vizualizaciju pre pisanja koda.",
    proc3Title: "Lansiranje",
    proc3Desc: "Razvijanje modernim alatima, rigorozno testiranje performansi i lansiranje skalabilnog finalnog proizvoda.",
    feat1Tag: "Vizija",
    feat1Title: "Kreativna Fluidnost",
    feat1Desc: "Odbacujemo nefleksibilne okvire. Dizajn se prilagođava vašem brendu kao tečnost, popunjavajući svaku prazninu UX-a.",
    feat2Tag: "Motor",
    feat2Title: "Tehnička Logika",
    feat2Desc: "Kod vrhunskih performansi osigurava da sajt nije samo lep – to je mašina velike brzine, optimizovana za konverzije.",
    feat3Tag: "Rezultat",
    feat3Title: "Ljudski Uticaj",
    feat3Desc: "Gradimo za ljude sa druge strane ekrana, stvarajući emotivnu povezanost kroz pokret i glasmorfizam.",
    contactTag: "Hajde da Pričamo",
    contactHead1: "Spremni za ",
    contactHeadSpan: "Velvet Logic",
    contactHead2: "?",
    contactDesc: "Bilo da vam je potrebna najmodernija landing stranica, ozbiljna web aplikacija, ili redizajn brenda, spremni smo za gradnju.",
    contactF1: "Brz Odgovor",
    contactF1Sub: "U roku od 24 radna sata",
    contactF2: "Skrojena Rešenja",
    contactF2Sub: "Prilagođena isključivo vašim potrebama",
    formName: "Ime",
    formEmail: "Email",
    formDetails: "Detalji Projekta",
    formDetailsPlace: "Opišite nam vašu sledeću veliku ideju...",
    formSubmit: "Pošalji Upit"
  }
};

const getTestimonials = (lang) => {
  if (lang === 'ENG') {
    return [
      { name: "Sarah Chen", role: "CTO, Nexus AI", quote: "Velvet Logic completely redesigned our SaaS interface. User engagement increased by 140% in just two weeks.", color: "bg-primary" },
      { name: "Marcus Thorne", role: "Founder, Oasis", quote: "Their fluid, organic approach to design transformed our rigid productivity app into an experience people love using.", color: "bg-accent" },
      { name: "Dr. E. Vance", role: "Lead Researcher, Veridian", quote: "The virtual interfaces they built for our VR platform defied everything we thought was possible in web tech.", color: "bg-cta" },
      { name: "Alex Rivera", role: "CEO, FinTech Flow", quote: "A rare mix of creative brilliance and technical mastery. The animations they added are profoundly impactful.", color: "bg-primary" }
    ];
  } else {
    return [
      { name: "Sara Čen", role: "CTO, Nexus AI", quote: "Velvet Logic je potpuno redizajnirao naš SaaS interfejs. Angažovanje korisnika se povećalo za 140% u samo dve nedelje.", color: "bg-primary" },
      { name: "Marko T.", role: "Founder, Oasis", quote: "Njihov fluidan pristup dizajnu pretvorio je našu sputanu aplikaciju u iskustvo koje ljudi sa zadovoljstvom koriste.", color: "bg-accent" },
      { name: "Dr. E. Vanc", role: "Lead Researcher, Veridian", quote: "Virtuelni interfejsi koje su izgradili za našu VR platformu prevazišli su sve što smo smatrali mogućim.", color: "bg-cta" },
      { name: "Aleksa R.", role: "CEO, FinTech Flow", quote: "Retka mešavina kreativne genijalnosti i tehničkog majstorstva. Animacije koje su dodali su neverovatno upečatljive.", color: "bg-primary" }
    ];
  }
};

// --- Components ---

const Navbar = ({ lang, setLang, t }) => {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-slate-200/50"
    >
      <div className="text-2xl font-bold font-heading tracking-tighter text-slate">
        VELVET<span className="text-primary">LOGIC</span>
      </div>
      
      <div className="hidden md:flex gap-8 items-center font-mono text-sm uppercase tracking-widest text-slate">
        <a href="#testimonials" className="hover:text-primary transition-colors">{t.navWork}</a>
        <a href="#process" className="hover:text-primary transition-colors">{t.navProcess}</a>
        <a href="#contact" onClick={scrollToContact} className="hover:text-cta transition-colors">{t.navContact}</a>
        
        {/* Language Toggles */}
        <div className="flex gap-2 items-center bg-slate-100 rounded-lg px-2 py-1 ml-4 border border-slate-200">
          <button 
            onClick={() => setLang('ENG')}
            className={`px-2 py-1 transition-all rounded ${lang === 'ENG' ? 'bg-white shadow text-primary font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            ENG
          </button>
          <button 
            onClick={() => setLang('SRB')}
            className={`px-2 py-1 transition-all rounded ${lang === 'SRB' ? 'bg-white shadow text-primary font-bold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            SRB
          </button>
        </div>
      </div>

      <motion.button 
        onClick={scrollToContact}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-slate text-white px-5 py-2 rounded-full font-mono text-xs transition-colors hover:bg-slate-800"
      >
        {t.btnStart}
      </motion.button>
    </motion.nav>
  );
};

const BorderBeamCard = ({ title, description, tag, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#6366F1_50%,#E2E8F0_100%)]" />
      </div>
      
      <div className="relative bg-white rounded-xl h-full p-6">
        <span className="text-[10px] font-mono bg-slate/5 px-2 py-1 rounded text-primary mb-4 inline-block tracking-tighter uppercase font-bold">
          {tag}
        </span>
        <h3 className="text-2xl font-heading font-bold mb-2 text-slate">{title}</h3>
        <p className="text-slate/60 font-sans text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex items-center text-cta font-mono text-xs font-bold group-hover:gap-2 transition-all">
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

const GlowingTestimonialCard = ({ testimony }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glowColorMap = {
    "bg-primary": "#6366F1",
    "bg-cta": "#10B981",
    "bg-accent": "#F59E0B"
  };
  const gColor = glowColorMap[testimony.color] || "#6366F1";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseMove={handleMouseMove}
      className="relative min-w-[500px] p-[1.5px] md:min-w-[600px] h-[400px] overflow-hidden rounded-3xl bg-slate-800/50 group shadow-2xl"
    >
      {/* Dynamic Cursor Light Tracer */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${gColor}aa,
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Solid Inner Card Plate Container */}
      <div className="relative z-10 bg-[#0F172A] rounded-[calc(1.5rem-1px)] w-full h-full p-10 flex flex-col justify-between overflow-hidden">
        {/* Soft Inner Atmosphere Glow */}
        <motion.div 
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                ${gColor}22,
                transparent 70%
              )
            `,
          }}
        />
        
        {/* Content Wrapper */}
        <div className="relative z-20">
          <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-10">"{testimony.quote}"</p>
        </div>
        
        <div className="flex items-center gap-4 relative z-20">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border border-white/10 ${testimony.color}`}>
            {testimony.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white leading-none mb-1">{testimony.name}</h4>
            <p className="text-slate-400 font-mono text-xs">{testimony.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Layout ---

export default function App() {
  const [lang, setLang] = useState('ENG');
  const t = dict[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(horizontalScroll, [0, 1], ["0%", "-65%"]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate selection:bg-primary selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />
      
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center -mt-10 md:mt-0 px-6 pt-20">
        <VelvetSpheres />
        <div className="max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-mono text-xs tracking-[0.3em] text-accent font-bold uppercase mb-4 block"
            >
              {t.heroPre}
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight mb-8">
              {t.heroTitle1} <span className="text-primary italic">{t.heroTitleVelvet}</span>,<br />
              {t.heroTitle2} <span className="underline decoration-cta">{t.heroTitleLogic}</span>
            </h1>
            <p className="font-mono text-slate/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cta text-white px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-lg shadow-cta/30 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">{t.heroBtnStart} <Zap size={20} fill="currentColor" /></span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </motion.button>
              
              <button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border text-slate border-slate-200 px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-slate-50 transition-colors"
              >
                {t.heroBtnPort}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (Horizontal Scroll) */}
      <section id="testimonials" ref={horizontalRef} className="relative h-[300vh] bg-slate">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-12 items-center">
            <div className="min-w-[400px]">
              <h2 className="text-5xl font-heading font-bold text-white mb-4">{t.testiHeadPre}<br/><span className="text-primary">{t.testiHeadSub}</span></h2>
              <p className="text-slate-400 font-mono">{t.testiDesc}</p>
            </div>
            
            {getTestimonials(lang).map((testimony, idx) => (
              <GlowingTestimonialCard key={idx} testimony={testimony} />
            ))}
            
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.3em] text-accent font-bold uppercase mb-4 block"
          >
            {t.procTag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-slate mb-6"
          >
            {t.procHead}<span className="text-primary">{t.procHeadSpan}</span>{t.procHeadEnd}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-slate/60 max-w-2xl mx-auto text-lg"
          >
            {t.procDesc}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative mt-16">
          <div className="hidden md:block absolute top-8 left-10 pt-4 right-10 h-px border-t-2 border-dashed border-slate-200 -z-10" />
          
          {[
            { step: "01", title: t.proc1Title, desc: t.proc1Desc },
            { step: "02", title: t.proc2Title, desc: t.proc2Desc },
            { step: "03", title: t.proc3Title, desc: t.proc3Desc }
          ].map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-slate text-white rounded-2xl flex items-center justify-center font-mono font-bold text-xl mb-6 shadow-lg shadow-slate/20 group-hover:scale-110 group-hover:bg-primary group-hover:-rotate-3 transition-all duration-300">
                {item.step}
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">{item.title}</h3>
              <p className="text-slate/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORYTELLING / FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50/50 rounded-3xl mb-10">
        <div className="grid md:grid-cols-3 gap-8">
          <BorderBeamCard 
            tag={t.feat1Tag}
            title={t.feat1Title}
            description={t.feat1Desc}
            delay={0.1}
          />
          <BorderBeamCard 
            tag={t.feat2Tag}
            title={t.feat2Title}
            description={t.feat2Desc}
            delay={0.3}
          />
          <BorderBeamCard 
            tag={t.feat3Tag}
            title={t.feat3Title}
            description={t.feat3Desc}
            delay={0.5}
          />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-slate text-white relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-cta font-bold uppercase mb-4 block">
              {t.contactTag}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t.contactHead1}<span className="text-primary italic">{t.contactHeadSpan}</span>{t.contactHead2}
            </h2>
            <p className="text-slate-400 font-sans mb-10 text-base max-w-md leading-relaxed">
              {t.contactDesc}
            </p>
            
            <div className="space-y-6 text-slate-300 font-sans">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:scale-110 transition-all">
                  <Zap className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.contactF1}</h4>
                  <p className="text-sm text-slate-400">{t.contactF1Sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/50 group-hover:scale-110 transition-all">
                  <Layers className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.contactF2}</h4>
                  <p className="text-sm text-slate-400">{t.contactF2Sub}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative"
          >
            <ContactForm />
          </motion.div>
        </div>
        
        {/* Footer Links Mini */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold font-heading tracking-tighter text-white">
            VELVET<span className="text-primary">LOGIC</span>
          </div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-slate-400 hover:[&>a]:text-white transition-colors">
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#dribbble">Dribbble</a>
          </div>
        </div>
      </section>
    </div>
  );
}
