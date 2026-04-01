import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Layers, Zap } from 'lucide-react';
import VelvetSpheres from './VelvetSpheres';
import ContactForm from './components/ContactForm';
import { client } from './sanity';

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
    proc1Title: "System Audit",
    proc1Desc: "Decoding the core logic and defining technical requirements.",
    proc2Title: "The Prototype Shell",
    proc2Desc: "High-fidelity interactive blueprints to visualize the flagship.",
    proc3Title: "Flagship Deployment",
    proc3Desc: "Optimization, stress-testing, and scaling the final product.",
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
    proc1Title: "Audit Sistema",
    proc1Desc: "Dekodiranje osnove logike i definisanje tehničkih zahteva.",
    proc2Title: "Ljuska Prototipa",
    proc2Desc: "Interaktivne plave fine jasnosti za vizuelizaciju flagershipа.",
    proc3Title: "Lansiranje Flagershipа",
    proc3Desc: "Optimizacija, stres-testiranje, i skaliranje finalnog proizvoda.",
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
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-obsidian/80 border-b border-violet/20"
    >
      <div className="text-2xl font-bold font-heading tracking-tighter text-mercury">
        VELVET<span className="text-violet">LOGIC</span>
      </div>
      
      <div className="hidden md:flex gap-8 items-center font-mono text-sm uppercase tracking-widest text-mercury">
        <a href="#testimonials" className="hover:text-violet transition-colors">{t.navWork}</a>
        <a href="#process" className="hover:text-violet transition-colors">{t.navProcess}</a>
        <a href="#contact" onClick={scrollToContact} className="hover:text-violet transition-colors">{t.navContact}</a>
        
        {/* Language Toggles */}
        <div className="flex gap-1 items-center bg-white/5 rounded-lg px-2 py-1 ml-4 border border-violet/30">
          <button 
            onClick={() => setLang('ENG')}
            className={`px-3 py-1.5 transition-all rounded font-bold text-xs ${lang === 'ENG' ? 'bg-violet text-obsidian shadow-lg shadow-violet/50' : 'text-gray hover:text-mercury'}`}
          >
            ENG
          </button>
          <button 
            onClick={() => setLang('SRB')}
            className={`px-3 py-1.5 transition-all rounded font-bold text-xs ${lang === 'SRB' ? 'bg-violet text-obsidian shadow-lg shadow-violet/50' : 'text-gray hover:text-mercury'}`}
          >
            SRB
          </button>
        </div>
      </div>

      <motion.button 
        onClick={scrollToContact}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-violet text-obsidian px-5 py-2 rounded-full font-mono text-xs transition-colors hover:bg-violet/80 font-bold"
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
        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7F00FF22_0%,#7F00FF_50%,#7F00FF22_100%)]" />
      </div>
      
      <div className="relative bg-white rounded-xl h-full p-6">
        <span className="text-[10px] font-mono bg-violet/10 px-2 py-1 rounded text-violet mb-4 inline-block tracking-tighter uppercase font-bold">
          {tag}
        </span>
        <h3 className="text-2xl font-heading font-bold mb-2 text-obsidian">{title}</h3>
        <p className="text-obsidian/70 font-body text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex items-center text-violet font-mono text-xs font-bold group-hover:gap-2 transition-all">
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

// --- ACTIVATOR DOT (Moves Along Path & Powers Cards) ---

const ActivatorDot = ({ pathProgress }) => {
  const dotLeft = useTransform(pathProgress, (v) => {
    let x = 0;
    if (v < 0.2) x = 200 + (v / 0.2) * 200;
    else if (v < 0.3) x = 400;
    else if (v < 0.5) x = 400 + ((v - 0.3) / 0.2) * 200;
    else if (v < 0.7) x = 600 + ((v - 0.5) / 0.2) * 200;
    else if (v < 0.8) x = 800;
    else x = 800 + ((v - 0.8) / 0.2) * 200;
    return `${(x / 1200) * 100}%`;
  });

  const dotTop = useTransform(pathProgress, (v) => {
    let y = 0;
    if (v < 0.2) y = 420;
    else if (v < 0.3) y = 420 - ((v - 0.2) / 0.1) * 60;
    else if (v < 0.7) y = 360; 
    else if (v < 0.8) y = 360 - ((v - 0.7) / 0.1) * 60;
    else y = 300;
    return `${(y / 600) * 100}%`;
  });

  return (
    <>
      {/* Large ambient glowing aura behind the cards */}
      <motion.div 
        className="absolute w-40 h-40 bg-violet/30 rounded-full z-0 pointer-events-none blur-[40px]"
        style={{
          left: dotLeft,
          top: dotTop,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Sharp pulsing core dot */}
      <motion.div
        className="absolute w-4 h-4 bg-violet rounded-full z-0 pointer-events-none"
        style={{
          left: dotLeft,
          top: dotTop,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 15px rgba(127,0,255, 0.8)"
        }}
        animate={{
          boxShadow: ["0 0 0 0 rgba(127, 0, 255, 0.8)", "0 0 0 16px rgba(127, 0, 255, 0)"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </>
  );
};

// ==============================================
// STICKY SCROLL-JACKING WRAPPER
// ==============================================
// Wrap the entire section in h-[300vh] so scrolling through it 
// drives the animation while the content appears "locked" sticky

const DiscoveryAscentWrapper = ({ t }) => {
  const containerRef = useRef(null);
  
  // Track scroll through the 300vh container (maps to 0-1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef}
      className="bg-obsidian relative h-[300vh]"
    >
      {/* Sticky inner content - appears locked while scroll drives animation */}
      <DiscoveryAscentSection t={t} scrollProgress={scrollYProgress} />
    </div>
  );
};

// ==============================================
// THE ANIMATED CONTENT (Sticky in viewport)
// ==============================================

const DiscoveryAscentSection = ({ t, scrollProgress }) => {
  const [card3PoweredOn, setCard3PoweredOn] = React.useState(false);
  
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Map scroll progress to path drawing animation (0 to 1)
  // This drives ALL animations based on how far user has scrolled
  const pathProgress = useTransform(scrollProgress, [0, 1], [0, 1]);
  
  // Card positions on the staircase
  const card1Pos = { x: 100, y: 280 };
  const card2Pos = { x: 300, y: 200 };
  const card3Pos = { x: 500, y: 280 };

  // Calculate activation based on dot proximity to each card
  const card1Activate = useTransform(pathProgress, (v) => {
    return Math.max(0, Math.min(1, v < 0.2 ? v / 0.1 : 1));
  });

  const card2Activate = useTransform(pathProgress, (v) => {
    if (v < 0.3) return 0;
    if (v < 0.5) return (v - 0.3) / 0.2; // Fade in as dot approaches
    return 1; // Stay fully active! Do not disappear!
  });

  const card3Activate = useTransform(pathProgress, (v) => {
    if (v < 0.8) return 0;
    if (v < 1.0) return (v - 0.8) / 0.2; // Fade in as dot approaches
    return 1; 
  });

  // SVG path geometry - stepped connecting path between the three cards
  const svgPath = "M 200 420 L 400 420 L 400 360 L 800 360 L 800 300 L 1000 300";

  // Track card3 power-on state for UI indicator
  React.useEffect(() => {
    const unsubscribe = card3Activate.onChange((v) => {
      setCard3PoweredOn(v > 0.95);
    });
    return unsubscribe;
  }, [card3Activate]);

  // Calculate fade-out of "Scroll to Explore" hint after Phase 1 begins
  const scrollHintOpacity = useTransform(pathProgress, [0, 0.15], [1, 0]);

  return (
    <section 
      id="process" 
      className="sticky top-0 h-screen w-full flex flex-col py-12 px-6 bg-obsidian overflow-hidden z-40"
    >
      {/* HEADER - Visible at top */}
      <div className="text-center mb-8 z-20">
        <motion.span 
          className="font-mono text-xs tracking-brand text-violet font-bold uppercase block"
        >
          {t.procTag}
        </motion.span>
        <motion.h2 
          className="text-4xl font-heading font-bold text-mercury mb-4 leading-brand"
        >
          {t.procHead}<span className="text-violet">{t.procHeadSpan}</span>{t.procHeadEnd}
        </motion.h2>
        <motion.p 
          className="font-body text-logic-gray max-w-2xl mx-auto text-sm leading-relaxed"
        >
          {t.procDesc}
        </motion.p>
      </div>

      {/* MAIN CONTENT - Flex-1 for remaining space */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative">
        {/* SVG POWER LINE - Animated path following scroll progress */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="pathGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Faint base path as guide */}
          <path
            d={svgPath}
            stroke="#7F00FF"
            strokeWidth="3"
            fill="none"
            opacity="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Bright animated path that grows as user scrolls */}
          <motion.path
            d={svgPath}
            stroke="#7F00FF"
            strokeWidth="5"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pathGlow)"
            vectorEffect="non-scaling-stroke"
            style={{
              pathLength: pathProgress
            }}
          />
        </svg>

        {/* Pulsing dot that moves along the path */}
        <ActivatorDot pathProgress={pathProgress} />

        {/* CARDS GRID - 3 columns, staggered heights */}
        <div className="grid md:grid-cols-3 gap-12 relative z-10 w-full">
          {/* CARD 01 - System Audit */}
          <DiscoveryCard
            ref={card1Ref}
            step="01"
            title={t.proc1Title}
            desc={t.proc1Desc}
            yOffset={120}
            activationProgress={card1Activate}
          />

          {/* CARD 02 - Prototype Shell */}
          <DiscoveryCard
            ref={card2Ref}
            step="02"
            title={t.proc2Title}
            desc={t.proc2Desc}
            yOffset={60}
            activationProgress={card2Activate}
          />

          {/* CARD 03 - Flagship Deployment */}
          <DiscoveryCard
            ref={card3Ref}
            step="03"
            title={t.proc3Title}
            desc={t.proc3Desc}
            yOffset={0}
            activationProgress={card3Activate}
          />
        </div>
      </div>

      {/* "SCROLL TO EXPLORE" HINT - Fades out as Phase 1 progresses */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        style={{
          opacity: scrollHintOpacity
        }}
      >
        <div className="text-xs font-mono text-violet/60 uppercase tracking-widest text-center">
          Scroll to Explore
        </div>
        <motion.div
          className="mx-auto mt-2 w-6 h-10 border-2 border-violet/40 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-violet/40 rounded-full mt-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* UNLOCK INDICATOR - Shows when card 3 is fully powered */}
      <motion.div
        className="absolute bottom-8 right-8 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: card3PoweredOn ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-xs font-mono text-violet uppercase tracking-widest"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨ Flagship Unlocked
        </motion.div>
      </motion.div>

    </section>
  );
};

// --- DISCOVERY CARD COMPONENT (POWER-ON LOGIC) ---

const DiscoveryCard = React.forwardRef(({ step, title, desc, yOffset, activationProgress }, ref) => {
  // Convert progress value to opacity, scale, and blur - FASTER ACTIVATION
  const cardOpacity = useTransform(activationProgress, [0, 0.1, 1], [0, 1, 1]);
  const cardScale = useTransform(activationProgress, [0, 0.1, 1], [0.85, 1, 1]);
  const cardBlur = useTransform(activationProgress, [0, 0.1, 1], [20, 0, 0]);
  
  // Border glow intensity - Fast snap on
  const glowIntensity = useTransform(activationProgress, [0, 0.08, 1], [0.1, 1, 1]);

  return (
    <motion.div 
      ref={ref}
      className="relative h-full flex flex-col"
      style={{
        transform: `translateY(${yOffset}px)`
      }}
    >
      <motion.div 
        className="bg-obsidian/80 backdrop-blur-xl p-8 rounded-2xl h-full flex flex-col border-2 border-white/10 relative overflow-hidden"
        style={{
          opacity: cardOpacity,
          scale: cardScale,
          filter: cardBlur
        }}
      >
        {/* Inner glow when powered on */}
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(glowIntensity, v => `radial-gradient(circle, rgba(127, 0, 255, ${v * 0.4}), transparent 70%)`)
          }}
          pointerEvents="none"
        />

        {/* Number Box - Pulses when powered on */}
        <motion.div 
          className="w-16 h-16 bg-violet text-obsidian rounded-xl flex items-center justify-center font-mono font-bold text-2xl mb-8 shadow-neon-glow relative z-10"
          style={{
            boxShadow: useTransform(
              glowIntensity,
              v => `0 0 ${20 + v * 40}px rgba(127, 0, 255, ${0.5 + v * 0.5})` 
            )
          }}
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          {step}
          <motion.div 
            className="absolute inset-0 border-2 border-white/20 rounded-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title - Character-by-character reveal on power-on - FASTER */}
        <motion.h3 className="text-2xl font-heading font-bold mb-4 text-mercury relative z-10 leading-brand min-h-16 flex items-center">
          {title.split("").map((char, idx) => (
            <motion.span
              key={idx}
              style={{
                opacity: useTransform(activationProgress, [0, 0.12, 1], [0, 1, 1])
              }}
              animate={{
                y: useTransform(activationProgress, [0, 0.12, 1], [10, 0, 0])
              }}
              transition={{ delay: idx * 0.01 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h3>

        {/* Description - Fades in with power-on - FASTER */}
        <motion.p 
          className="text-logic-gray text-sm leading-relaxed flex-grow relative z-10 font-body"
          style={{
            opacity: useTransform(activationProgress, [0, 0.15, 1], [0, 1, 1])
          }}
        >
          {desc}
        </motion.p>

        {/* Bottom accent line - Grows on activation - FASTER */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-violet/0 via-violet to-violet/0 mt-6 relative z-10"
          style={{
            scaleX: useTransform(activationProgress, [0, 0.12, 1], [0, 1, 1]),
            opacity: glowIntensity
          }}
        />
      </motion.div>
    </motion.div>
  );
});

// --- Main Layout ---

export default function App() {
  const [lang, setLang] = useState('ENG');
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    client.fetch(`{
      "hero": *[_type == "hero"][0],
      "testimonials": *[_type == "testimonials"][0],
      "process": *[_type == "process"][0],
      "values": *[_type == "values"][0],
      "contact": *[_type == "contact"][0],
      "navigation": *[_type == "navigation"][0]
    }`).then(data => setSanityData(data)).catch(console.error);
  }, []);

  // Helper resolvers for localized fields matching standard behavior
  const langKey = lang === 'ENG' ? 'en' : 'sr';
  const l = (field) => field && typeof field === 'object' ? field[langKey] || field.en || '' : (field || '');

  // Map Sanity values to the static dictionary keys seamlessly. Fill gap with fallbacks.
  const t = {
    // Navigation
    navWork: l(sanityData?.navigation?.navWork) || dict[lang].navWork,
    navProcess: l(sanityData?.navigation?.navProcess) || dict[lang].navProcess,
    navContact: l(sanityData?.navigation?.navContact) || dict[lang].navContact,
    btnStart: l(sanityData?.navigation?.btnStart) || dict[lang].btnStart,
    
    // Hero
    heroPre: l(sanityData?.hero?.preTitle) || dict[lang].heroPre,
    heroTitle1: l(sanityData?.hero?.titlePart1) || dict[lang].heroTitle1,
    heroTitleVelvet: l(sanityData?.hero?.titleVelvet) || dict[lang].heroTitleVelvet,
    heroTitle2: l(sanityData?.hero?.titlePart2) || dict[lang].heroTitle2,
    heroTitleLogic: l(sanityData?.hero?.titleLogic) || dict[lang].heroTitleLogic,
    heroDesc: l(sanityData?.hero?.description) || dict[lang].heroDesc,
    heroBtnStart: l(sanityData?.hero?.btnStartText) || dict[lang].heroBtnStart,
    heroBtnPort: l(sanityData?.hero?.btnPortText) || dict[lang].heroBtnPort,

    // Testimonials Section Header
    testiHeadPre: l(sanityData?.testimonials?.headPre) || dict[lang].testiHeadPre,
    testiHeadSub: l(sanityData?.testimonials?.headSub) || dict[lang].testiHeadSub,
    testiDesc: l(sanityData?.testimonials?.description) || dict[lang].testiDesc,

    // Process
    procTag: l(sanityData?.process?.tag) || dict[lang].procTag,
    procHead: l(sanityData?.process?.head) || dict[lang].procHead,
    procHeadSpan: l(sanityData?.process?.headSpan) || dict[lang].procHeadSpan,
    procHeadEnd: l(sanityData?.process?.headEnd) || dict[lang].procHeadEnd,
    procDesc: l(sanityData?.process?.description) || dict[lang].procDesc,
    proc1Title: l(sanityData?.process?.steps?.[0]?.title) || dict[lang].proc1Title,
    proc1Desc: l(sanityData?.process?.steps?.[0]?.description) || dict[lang].proc1Desc,
    proc2Title: l(sanityData?.process?.steps?.[1]?.title) || dict[lang].proc2Title,
    proc2Desc: l(sanityData?.process?.steps?.[1]?.description) || dict[lang].proc2Desc,
    proc3Title: l(sanityData?.process?.steps?.[2]?.title) || dict[lang].proc3Title,
    proc3Desc: l(sanityData?.process?.steps?.[2]?.description) || dict[lang].proc3Desc,

    // Features
    feat1Tag: l(sanityData?.values?.cards?.[0]?.tag) || dict[lang].feat1Tag,
    feat1Title: l(sanityData?.values?.cards?.[0]?.title) || dict[lang].feat1Title,
    feat1Desc: l(sanityData?.values?.cards?.[0]?.description) || dict[lang].feat1Desc,
    feat2Tag: l(sanityData?.values?.cards?.[1]?.tag) || dict[lang].feat2Tag,
    feat2Title: l(sanityData?.values?.cards?.[1]?.title) || dict[lang].feat2Title,
    feat2Desc: l(sanityData?.values?.cards?.[1]?.description) || dict[lang].feat2Desc,
    feat3Tag: l(sanityData?.values?.cards?.[2]?.tag) || dict[lang].feat3Tag,
    feat3Title: l(sanityData?.values?.cards?.[2]?.title) || dict[lang].feat3Title,
    feat3Desc: l(sanityData?.values?.cards?.[2]?.description) || dict[lang].feat3Desc,

    // Contact
    contactTag: l(sanityData?.contact?.tag) || dict[lang].contactTag,
    contactHead1: l(sanityData?.contact?.head1) || dict[lang].contactHead1,
    contactHeadSpan: l(sanityData?.contact?.headSpan) || dict[lang].contactHeadSpan,
    contactHead2: l(sanityData?.contact?.head2) || dict[lang].contactHead2,
    contactDesc: l(sanityData?.contact?.description) || dict[lang].contactDesc,
    contactF1: l(sanityData?.contact?.features?.[0]?.title) || dict[lang].contactF1,
    contactF1Sub: l(sanityData?.contact?.features?.[0]?.subtext) || dict[lang].contactF1Sub,
    contactF2: l(sanityData?.contact?.features?.[1]?.title) || dict[lang].contactF2,
    contactF2Sub: l(sanityData?.contact?.features?.[1]?.subtext) || dict[lang].contactF2Sub,
    
    // Form Labels
    formName: l(sanityData?.contact?.formLabels?.name) || dict[lang].formName,
    formCompany: l(sanityData?.contact?.formLabels?.company) || "Company Name",
    formEmail: l(sanityData?.contact?.formLabels?.email) || dict[lang].formEmail,
    formPhone: l(sanityData?.contact?.formLabels?.phone) || "Phone Number",
    formDetails: l(sanityData?.contact?.formLabels?.details) || dict[lang].formDetails,
    formDetailsPlace: l(sanityData?.contact?.formLabels?.detailsPlace) || dict[lang].formDetailsPlace,
    formSubmit: l(sanityData?.contact?.formLabels?.submit) || dict[lang].formSubmit,
  };

  const activeTestimonials = sanityData?.testimonials?.list?.length 
    ? sanityData.testimonials.list.map(item => ({
        name: typeof item.name === 'object' ? l(item.name) : item.name,
        role: l(item.role),
        quote: l(item.quote),
        color: item.color || "bg-primary"
      })) 
    : getTestimonials(lang);

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
    <div className="bg-obsidian text-mercury selection:bg-violet selection:text-obsidian">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-violet z-[60] origin-left" style={{ scaleX }} />
      
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center -mt-10 md:mt-0 px-6 pt-20 bg-gradient-to-b from-obsidian via-obsidian to-obsidian">
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
              className="font-mono text-xs tracking-[0.3em] text-violet font-bold uppercase mb-4 block"
            >
              {t.heroPre}
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight mb-8 text-mercury">
              {t.heroTitle1} <span className="text-violet italic">{t.heroTitleVelvet}</span>,<br />
              {t.heroTitle2} <span className="underline decoration-violet">{t.heroTitleLogic}</span>
            </h1>
            <p className="font-body text-gray text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet text-obsidian px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-lg shadow-violet/30 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">{t.heroBtnStart} <Zap size={20} fill="currentColor" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </motion.button>
              
              <button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 border text-mercury border-violet/30 px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-white/15 transition-colors"
              >
                {t.heroBtnPort}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (Horizontal Scroll) */}
      <section id="testimonials" ref={horizontalRef} className="relative h-[300vh] bg-[#0a0a0a]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-12 items-center">
            <div className="min-w-[400px]">
              <h2 className="text-5xl font-heading font-bold text-mercury mb-4">{t.testiHeadPre}<br/><span className="text-violet">{t.testiHeadSub}</span></h2>
              <p className="text-gray font-mono">{t.testiDesc}</p>
            </div>
            
            {activeTestimonials.map((testimony, idx) => (
              <GlowingTestimonialCard key={idx} testimony={testimony} />
            ))}
            
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION - DISCOVERY ASCENT (SCROLL-JACKING STICKY CONTAINER) */}
      <DiscoveryAscentWrapper t={t} />

      {/* STORYTELLING / FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white/5 rounded-3xl mb-10 border border-violet/20">
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
      <section id="contact" className="py-24 px-6 bg-white text-obsidian relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet/8 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-violet font-bold uppercase mb-4 block">
              {t.contactTag}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-obsidian">
              {t.contactHead1}<span className="text-violet italic">{t.contactHeadSpan}</span>{t.contactHead2}
            </h2>
            <p className="text-obsidian/70 font-body mb-10 text-base max-w-md leading-relaxed">
              {t.contactDesc}
            </p>
            
            <div className="space-y-6 text-obsidian/70 font-body">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-violet/30 group-hover:border-violet/80 group-hover:scale-110 transition-all">
                  <Zap className="text-violet" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian text-lg">{t.contactF1}</h4>
                  <p className="text-sm text-obsidian/60">{t.contactF1Sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center border border-violet/30 group-hover:border-violet/80 group-hover:scale-110 transition-all">
                  <Layers className="text-violet" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian text-lg">{t.contactF2}</h4>
                  <p className="text-sm text-obsidian/60">{t.contactF2Sub}</p>
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
            className="bg-white p-8 md:p-10 rounded-3xl border border-violet/20 shadow-2xl shadow-violet/5 relative"
          >
            <ContactForm labels={{
              name: t.formName,
              company: t.formCompany,
              email: t.formEmail,
              phone: t.formPhone,
              details: t.formDetails,
              detailsPlace: t.formDetailsPlace,
              submit: t.formSubmit,
            }} />
          </motion.div>
        </div>
        
        {/* Footer Links Mini */}
        <div className="max-w-7xl mx-auto mt-24 bg-obsidian rounded-2xl p-12 border border-violet/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold font-heading tracking-tighter text-mercury">
            VELVET<span className="text-violet">LOGIC</span>
          </div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-gray hover:[&>a]:text-violet transition-colors duration-300">
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#dribbble">Dribbble</a>
          </div>
        </div>
      </section>
    </div>
  );
}
