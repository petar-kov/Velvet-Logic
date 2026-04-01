import React, { useRef, useState, useEffect } from 'react';
import { client, urlFor } from './sanity';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useInView, animate, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import VelvetSpheres from './VelvetSpheres';
import ContactForm from './components/ContactForm';

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
            className="w-full rounded-2xl my-6 border border-white/10 shadow-xl shadow-obsidian/50 object-cover"
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
    formCompany: "Company Name",
    formPhone: "Phone Number",
    formDetails: "Project Details",
    formDetailsPlace: "Tell us about your next big idea...",
    formSubmit: "Submit Inquiry",
    formOptional: "(optional)",
    formSuccessTitle: "Thank you.",
    formSuccessDesc: "We've received your inquiry and will be in touch within 24 hours.",
    formError: "Something went wrong. Please try again.",
    formSending: "SENDING..."
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
    formCompany: "Ime Kompanije",
    formPhone: "Broj Telefona",
    formDetails: "Detalji Projekta",
    formDetailsPlace: "Opišite nam vašu sledeću veliku ideju...",
    formSubmit: "Pošalji Upit",
    formOptional: "(opciono)",
    formSuccessTitle: "Hvala Vam.",
    formSuccessDesc: "Primili smo vaš upit i javićemo vam se u roku od 24 sata.",
    formError: "Nešto je pošlo po zlu. Molimo pokušajte ponovo.",
    formSending: "ŠALJEM..."
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

const BorderBeamCard = ({ title, description, tag, iconName, delay = 0 }) => {
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
        <div className="text-obsidian/70 font-body text-sm leading-relaxed mb-6"><RichText content={description} /></div>
      </div>
    </motion.div>
  );
};

// ─── GRAVITY WELL CARD ────────────────────────────────────────────────────────
// Grid background + data-point nodes that travel grid lines on hover,
// snap to intersections, and form structured circuit patterns.
// Grid SVG = static never-animated layer.
// Nodes = motion.circle elements driven by Framer Motion keyframe sequences.

const GRID_COLS = 6;
const GRID_ROWS = 5;
const GW = 340; // viewBox width
const GH = 260; // viewBox height
const COL_STEP = GW / GRID_COLS;  // 56.67
const ROW_STEP = GH / GRID_ROWS;  // 52

// All grid intersection coordinates
const intersections = [];
for (let r = 0; r <= GRID_ROWS; r++) {
  for (let c = 0; c <= GRID_COLS; c++) {
    intersections.push({ x: c * COL_STEP, y: r * ROW_STEP });
  }
}

// 12 node definitions: each has a resting position and a hover sequence of
// grid intersections it snaps through. Sequences are chosen to look like
// circuit routing — horizontal runs, then a right-angle turn, then a snap.
const NODE_DEFS = [
  { restIdx: 0,  seq: [0, 1, 2, 8, 15, 21, 14, 7],       color: "#7F00FF", r: 3.5,  delay: 0 },
  { restIdx: 6,  seq: [6, 7, 8, 9, 16, 22, 23],           color: "#9B30FF", r: 2.5,  delay: 0.15 },
  { restIdx: 12, seq: [12, 13, 20, 26, 25, 18],           color: "#7F00FF", r: 3,    delay: 0.3 },
  { restIdx: 2,  seq: [2, 3, 10, 17, 24, 30, 29, 22],     color: "#B060FF", r: 2,    delay: 0.45 },
  { restIdx: 18, seq: [18, 19, 20, 13, 6, 7, 14, 21],     color: "#7F00FF", r: 4,    delay: 0.1 },
  { restIdx: 25, seq: [25, 26, 27, 34, 33, 32, 25],       color: "#9B30FF", r: 2.5,  delay: 0.6 },
  { restIdx: 4,  seq: [4, 11, 18, 25, 32, 33, 26, 19],    color: "#7F00FF", r: 2,    delay: 0.25 },
  { restIdx: 30, seq: [30, 23, 16, 9, 10, 17, 24, 31],    color: "#B060FF", r: 3,    delay: 0.7 },
  { restIdx: 9,  seq: [9, 16, 23, 30, 29, 22, 15, 8],     color: "#7F00FF", r: 2,    delay: 0.35 },
  { restIdx: 35, seq: [35, 34, 27, 28, 21, 14, 13, 20],   color: "#9B30FF", r: 3.5,  delay: 0.5 },
  { restIdx: 3,  seq: [3, 4, 5, 12, 19, 26, 33, 34],      color: "#7F00FF", r: 2,    delay: 0.8 },
  { restIdx: 28, seq: [28, 29, 30, 31, 24, 17, 10, 11],   color: "#B060FF", r: 2.5,  delay: 0.55 },
];

const GravityWellNode = ({ nodeDef, isActive }) => {
  const cx = useMotionValue(intersections[nodeDef.restIdx % intersections.length]?.x ?? 0);
  const cy = useMotionValue(intersections[nodeDef.restIdx % intersections.length]?.y ?? 0);
  const opacity = useMotionValue(0.18);
  const glowR = useMotionValue(nodeDef.r);
  const activeRef = useRef(false);
  const loopRef = useRef(null);

  const runLoop = async () => {
    activeRef.current = true;
    let step = 0;
    const seq = nodeDef.seq;
    const len = seq.length;
    while (activeRef.current) {
      const idx = seq[step % len];
      const target = intersections[idx % intersections.length];
      if (!target) break;
      await Promise.all([
        animate(cx, target.x, { duration: 0.38, ease: [0.4, 0, 0.2, 1], delay: step === 0 ? nodeDef.delay : 0 }),
        animate(cy, target.y, { duration: 0.38, ease: [0.4, 0, 0.2, 1], delay: step === 0 ? nodeDef.delay : 0 }),
        animate(glowR, nodeDef.r * 1.9, { duration: 0.15 }),
      ]);
      // Pulse at intersection
      await animate(glowR, nodeDef.r, { duration: 0.22, ease: "easeOut" });
      // Brief dwell at node
      await new Promise(r => setTimeout(r, 120));
      step++;
    }
  };

  const stopLoop = async () => {
    activeRef.current = false;
    if (loopRef.current) loopRef.current = null;
    const rest = intersections[nodeDef.restIdx % intersections.length];
    await Promise.all([
      animate(cx, rest.x, { duration: 0.6, ease: "easeInOut" }),
      animate(cy, rest.y, { duration: 0.6, ease: "easeInOut" }),
      animate(opacity, 0.18, { duration: 0.5 }),
      animate(glowR, nodeDef.r, { duration: 0.5 }),
    ]);
  };

  useEffect(() => {
    if (isActive) {
      animate(opacity, 1, { duration: 0.4, delay: nodeDef.delay });
      loopRef.current = runLoop();
    } else {
      stopLoop();
    }
  }, [isActive]);

  return (
    <motion.g>
      {/* Glow halo */}
      <motion.circle
        style={{ cx, cy }}
        fill={nodeDef.color}
        opacity={0.18}
        r={nodeDef.r * 3.5}
        filter="url(#nodeGlow)"
      />
      {/* Sharp core */}
      <motion.circle
        style={{ cx, cy, opacity, r: glowR }}
        fill={nodeDef.color}
      />
    </motion.g>
  );
};

const GravityWellCard = ({ title, description, tag, delay = 0 }) => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isInView) {
      setActive(true);
    }
  }, [isMobile, isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onHoverStart={() => !isMobile && setActive(true)}
      onHoverEnd={() => !isMobile && setActive(false)}
      className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[300px]"
    >
      {/* Border beam on hover or active on mobile */}
      <div className={`absolute inset-0 p-[2px] transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'} ${!isMobile ? 'group-hover:opacity-100' : ''}`}>
        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7F00FF22_0%,#7F00FF_50%,#7F00FF22_100%)]" />
      </div>

      <div className="relative bg-white rounded-xl h-full flex flex-col overflow-hidden">

        {/* ── GRID BACKGROUND ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            viewBox={`0 0 ${GW} ${GH}`}
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            style={{ filter: 'blur(0.4px)' }}
          >
            <defs>
              {/* Grid pattern tile */}
              <pattern id="gwGrid" x="0" y="0" width={COL_STEP} height={ROW_STEP} patternUnits="userSpaceOnUse">
                <path
                  d={`M ${COL_STEP} 0 L 0 0 0 ${ROW_STEP}`}
                  fill="none"
                  stroke="#94a3b830"
                  strokeWidth="0.8"
                />
              </pattern>
              {/* Node glow filter */}
              <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Intersection dot filter (sharper) */}
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Grid fill */}
            <rect width={GW} height={GH} fill="url(#gwGrid)" />
            {/* Close the right and bottom edges */}
            <line x1={GW} y1="0" x2={GW} y2={GH} stroke="#94a3b830" strokeWidth="0.8" />
            <line x1="0" y1={GH} x2={GW} y2={GH} stroke="#94a3b830" strokeWidth="0.8" />

            {/* Faint intersection dots — always visible */}
            {intersections.map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="1.4" fill="#94a3b855" />
            ))}

            {/* Active intersection highlight — glows violet on hover */}
            <motion.rect
              width={GW} height={GH}
              fill="none"
              stroke="#7F00FF"
              strokeWidth="0"
              animate={{ opacity: active ? 0.06 : 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Data-point nodes */}
            {NODE_DEFS.map((nd, i) => (
              <GravityWellNode key={i} nodeDef={nd} isActive={active} />
            ))}
          </svg>

          {/* Gradient overlay: grid fades into white at bottom for content legibility */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Tag — top-aligned, same position as other cards */}
          <span className="text-[10px] font-mono bg-violet/10 px-2 py-1 rounded text-violet mb-4 inline-block tracking-tighter uppercase font-bold self-start">
            {tag}
          </span>
          {/* Title + description pushed to the bottom */}
          <div className="mt-auto">
            <h3 className="text-2xl font-heading font-bold mb-2 text-obsidian">{title}</h3>
            <div className="text-obsidian/70 font-body text-sm leading-relaxed"><RichText content={description} /></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── HUMAN IMPACT CARD ────────────────────────────────────────────────────────
// Aurora mesh background + cursor-tracked glass lens + click-ripple physics.
// Two identical aurora blob layers: bottom (filter:blur), top (sharp, clip-path circle).
// CSS animations drive blob motion entirely on the compositor thread.

const HumanImpactCard = ({ title, description, tag, delay = 0 }) => {
  const cardRef   = useRef(null);
  const mouseX    = useMotionValue(-300);
  const mouseY    = useMotionValue(-300);
  const [ripples, setRipples] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });

  useEffect(() => {
    const checkMobile = () => {
      const isMob = window.innerWidth < 768;
      setIsMobile(isMob);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spring-smooth coordinates for physical lens feel
  const lx = useSpring(mouseX, { stiffness: 180, damping: 25 });
  const ly = useSpring(mouseY, { stiffness: 180, damping: 25 });

  // Automatic "breathing" drift for mobile when in view
  useEffect(() => {
    if (isMobile && isInView) {
      // Start a slow, continuous orbit
      const controlsX = animate(mouseX, [0, 200, 100, 300, 0], {
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      });
      const controlsY = animate(mouseY, [0, 100, 300, 200, 0], {
        duration: 12,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      });
      return () => {
        controlsX.stop();
        controlsY.stop();
      };
    }
  }, [isMobile, isInView, mouseX, mouseY]);

  // Lens clip-path (circle 88px at cursor)
  const lensClip = useMotionTemplate`circle(88px at ${lx}px ${ly}px)`;
  const ringX = useTransform(lx, v => v - 88);
  const ringY = useTransform(ly, v => v - 88);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    animate(mouseX, -300, { duration: 0.6, ease: 'easeOut' });
    animate(mouseY, -300, { duration: 0.6, ease: 'easeOut' });
  };

  const handleClick = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const batch = Date.now();
    const rings = [0, 0.4, 0.8, 1.2].map((offset, i) => ({
      id: batch + i, x: cx, y: cy, delay: offset
    }));
    setRipples(prev => [...prev, ...rings]);
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id < batch || rp.id > batch + 3)), 4500);
  };

  // Identical aurora mesh layers
  const auroraBlobs = (
    <>
      <div className="aurora-blob-1 absolute w-[72%] h-[80%] -top-[18%] -left-[16%] rounded-full"
        style={{ background: 'radial-gradient(ellipse at 55% 45%, rgba(127,0,255,0.45) 0%, rgba(100,0,240,0.22) 42%, transparent 70%)' }}
      />
      <div className="aurora-blob-2 absolute w-[58%] h-[68%] top-[8%] -right-[12%] rounded-full"
        style={{ background: 'radial-gradient(ellipse at 45% 55%, rgba(185,80,255,0.32) 0%, rgba(140,0,255,0.16) 44%, transparent 72%)' }}
      />
      <div className="aurora-blob-3 absolute w-[52%] h-[62%] bottom-[2%] left-[22%] rounded-full"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(80,0,210,0.38) 0%, rgba(60,0,185,0.2) 42%, transparent 70%)' }}
      />
    </>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[300px] cursor-crosshair select-none"
    >
      {/* ── ANIMATED BORDER BEAMS (always visible, slow orbit) ────────────────
          Two counter-rotating conic gradients create the effect of light
          circling the card border. Outer at 10s, inner at 14s reverse.       */}
      <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-75 transition-opacity duration-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7F00FF18_0%,#7F00FF_50%,#7F00FF18_100%)]" />
      </div>
      <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-[-1000%] animate-[spin_14s_linear_infinite_reverse] bg-[conic-gradient(from_270deg_at_50%_50%,#B060FF18_0%,#B060FF_50%,#B060FF18_100%)]" />
      </div>

      <div className="relative bg-white rounded-xl h-full flex flex-col overflow-hidden">

        {/* ── BLURRED AURORA LAYER ──────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden"
          style={{ filter: 'blur(22px) saturate(1.4)', willChange: 'transform' }}
        >
          {auroraBlobs}
        </div>

        {/* ── SHARP AURORA LAYER (glass lens) ───────────────────────────
            Identical blobs, NO blur. Clipped to circle at spring cursor.     */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: lensClip }}
        >
        {auroraBlobs}
        </motion.div>

        {/* ── GLASS LENS RING ─────────────────────────────────────────────
            Lives above the gradient (z-[5]) so it's visible over the text
            area too. Content at z-10 renders on top, keeping text readable. */}
        <motion.div
          className="absolute pointer-events-none z-[5]"
          style={{
            width: 176, height: 176,
            x: ringX, y: ringY,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.60)',
            boxShadow: '0 0 0 1px rgba(127,0,255,0.22), 0 4px 32px rgba(127,0,255,0.15), inset 0 1px 0 rgba(255,255,255,0.40)',
            background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.16), transparent 58%)'
          }}
        />

        {/* ── CLICK RIPPLES (4 rings, staggered, slow expansion) ────────── */}
        {ripples.map(rp => (
          <motion.div
            key={rp.id}
            className="absolute rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(127,0,255,0.5)' }}
            initial={{ width: 0,   height: 0,   x: rp.x,       y: rp.y,       opacity: 0.8 }}
            animate={{ width: 500, height: 500, x: rp.x - 250, y: rp.y - 250, opacity: 0   }}
            transition={{ duration: 2.8, delay: rp.delay, ease: [0.1, 0.6, 0.3, 1] }}
          />
        ))}

        {/* White gradient fade at bottom for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 50%, transparent 100%)' }}
        />

        {/* ── CONTENT ───────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col h-full p-6">
          <span className="text-[10px] font-mono bg-white/70 backdrop-blur-sm px-2 py-1 rounded text-violet mb-4 inline-block tracking-tighter uppercase font-bold self-start border border-violet/10">
            {tag}
          </span>
          <div className="mt-auto">
            <h3 className="text-2xl font-heading font-bold mb-2 text-obsidian">{title}</h3>
            <div className="text-obsidian/70 font-body text-sm leading-relaxed"><RichText content={description} /></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LiquidFillCard = ({ title, description, tag, delay = 0 }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const hasPoured = useRef(false);

  // 0 → 1 (maps directly to scaleY — no layout cost, pure transform)
  const fillScale = useMotionValue(0);

  // Wall adhesion spring: lags behind main liquid by ~80ms,
  // stays ~4% higher (surface tension film clinging to walls)
  const wallLag = useSpring(fillScale, { stiffness: 50, damping: 18 });
  const wallScale = useTransform(wallLag, v => Math.min(1, v + 0.042));

  // Liquid body color deepens as fill rises
  const liquidBg = useTransform(
    fillScale,
    [0, 0.25, 0.6, 1],
    [
      "rgba(127,0,255,0.06)",
      "rgba(110,0,240,0.13)",
      "rgba(90,0,220,0.21)",
      "rgba(65,0,195,0.32)"
    ]
  );

  // Wall film color (slightly more opaque than the body — pressed against glass)
  const wallFilmBg = useTransform(
    wallLag,
    [0, 0.5, 1],
    [
      "linear-gradient(to top, rgba(110,0,240,0.28) 0%, rgba(127,0,255,0.10) 60%, rgba(127,0,255,0.02) 88%, transparent 100%)",
      "linear-gradient(to top, rgba(100,0,230,0.34) 0%, rgba(110,0,240,0.14) 60%, rgba(127,0,255,0.03) 88%, transparent 100%)",
      "linear-gradient(to top, rgba(80,0,210,0.42) 0%, rgba(90,0,220,0.18) 60%, rgba(100,0,230,0.04) 88%, transparent 100%)"
    ]
  );

  // Wave tint colours get richer with fill level
  const wave1Color = useTransform(fillScale, [0, 1], ["rgba(127,0,255,0.16)", "rgba(80,0,210,0.32)"]);
  const wave2Color = useTransform(fillScale, [0, 1], ["rgba(127,0,255,0.10)", "rgba(70,0,200,0.21)"]);
  const wave3Color = useTransform(fillScale, [0, 1], ["rgba(127,0,255,0.05)", "rgba(60,0,180,0.13)"]);

  // ── WAVE POSITIONING (pixel-based translateY, GPU only) ──────────────────
  // Measuring real pixel height avoids the `top` layout property entirely.
  // waveY = (1 - fillScale) * cardH - WAVE_H * 0.35
  // This places 35% of the wave container above the waterline (crests visible)
  // and 65% inside the liquid (troughs submerged) — physically accurate.
  const cardInnerRef = useRef(null);
  const [cardH, setCardH] = useState(360);
  useEffect(() => {
    if (cardInnerRef.current) setCardH(cardInnerRef.current.offsetHeight);
  }, []);
  const WAVE_H = 56; // h-14 = 56px
  const waveY = useTransform(fillScale, v => (1 - v) * cardH - WAVE_H * 0.35);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pour-in: multi-keyframe slosh
  useEffect(() => {
    if (isInView && !hasPoured.current) {
      hasPoured.current = true;
      const targetFill = isMobile ? 0.55 : 0.25;
      animate(fillScale,
        [0, 0.08, 0.30, 0.19, 0.28, 0.22, targetFill],
        {
          duration: 4.5,
          times:    [0, 0.08, 0.38, 0.55, 0.70, 0.87, 1.0],
          ease: "easeInOut",
          delay: delay * 0.4
        }
      );
    }
  }, [isInView, delay, fillScale, isMobile]);

  const handleHoverStart = () => !isMobile && animate(fillScale, 1,    { duration: 4.5, ease: [0.05, 0.3, 0.3, 1] });
  const handleHoverEnd  = () => !isMobile && animate(fillScale, 0.25, { duration: 2.5, ease: [0.4, 0, 0.1, 1] });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[300px]"
    >
      <div className="absolute inset-0 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7F00FF22_0%,#7F00FF_50%,#7F00FF22_100%)]" />
      </div>

      <div ref={cardInnerRef} className="relative bg-white rounded-xl h-full flex flex-col p-6 overflow-hidden">

        {/* ── LIQUID BODY ──────────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full z-0 origin-bottom"
          style={{ scaleY: fillScale, backgroundColor: liquidBg }}
        />

        {/* ── WAVE SURFACE ────────────────────────────────────────────────────
            `y` is pure translateY in pixels — GPU compositor, zero reflow.
            Wave paths have a concave meniscus: curves rise at both walls
            (x=0 / x=1200) and dip in the centre, matching real surface tension. */}
        <motion.div
          className="absolute left-[-2px] right-[-2px] z-[1] pointer-events-none"
          style={{ top: 0, height: `${WAVE_H}px`, y: waveY }}
        >
          {/* Wave 1 — fast ripple, meniscus: y=28 at walls, y=18–78 centre */}
          <motion.svg
            viewBox="0 0 1200 80" preserveAspectRatio="none"
            className="wave-fwd absolute inset-0 w-[200%] h-full fill-current"
            style={{ color: wave1Color, animationDuration: "1.8s" }}
          >
                        <path d="M0,48 C150,76 350,16 600,48 C750,76 950,16 1200,48 L1200,80 L0,80 Z" />
          </motion.svg>

          {/* Wave 2 — counter-direction, softer meniscus */}
          <motion.svg
            viewBox="0 0 1200 80" preserveAspectRatio="none"
            className="wave-bwd absolute inset-0 w-[200%] h-full fill-current"
            style={{ color: wave2Color, animationDuration: "2.8s" }}
          >
                        <path d="M0,50 C150,18 380,76 600,50 C750,18 980,76 1200,50 L1200,80 L0,80 Z" />
          </motion.svg>

          {/* Wave 3 — slow deep swell */}
          <motion.svg
            viewBox="0 0 1200 80" preserveAspectRatio="none"
            className="wave-pulse absolute inset-0 w-[200%] h-full fill-current"
            style={{ color: wave3Color, animationDuration: "4.4s" }}
          >
                        <path d="M0,46 C200,12 420,74 600,46 C800,12 1020,74 1200,46 L1200,80 L0,80 Z" />
          </motion.svg>
        </motion.div>

        {/* ── WALL ADHESION FILMS ─────────────────────────────────────────── */}
        <motion.div
          className="absolute left-0 bottom-0 w-[3px] h-full z-[2] origin-bottom pointer-events-none"
          style={{ scaleY: wallScale, background: wallFilmBg }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[3px] h-full z-[2] origin-bottom pointer-events-none"
          style={{ scaleY: wallScale, background: wallFilmBg }}
        />

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col h-full flex-grow text-left">
          <div className="mb-4">
            <span className="text-[10px] font-mono bg-violet/10 px-2 py-1 rounded text-violet tracking-tighter uppercase font-bold transition-all group-hover:bg-white/80 group-hover:shadow-sm">
              {tag}
            </span>
          </div>
          <h3 className="text-2xl font-heading font-bold mb-2 text-obsidian">{title}</h3>
          <div className="text-obsidian/70 font-body text-sm leading-relaxed mb-6 flex-grow">
            <RichText content={description} />
          </div>
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
          <div className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-10">"<RichText content={testimony.quote} className="inline [&>p]:inline" />"</div>
        </div>
        
        <div className="flex items-center gap-4 relative z-20">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border border-white/10 ${testimony.color} overflow-hidden`}>
            {testimony.avatar ? (
              <img 
                src={urlFor(testimony.avatar).width(48).height(48).fit('crop').url()} 
                alt={testimony.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              testimony.initials || testimony.name.charAt(0)
            )}
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`bg-obsidian relative ${isMobile ? 'h-auto py-12' : 'h-[300vh]'}`}
    >
      {/* Sticky inner content - appears locked while scroll drives animation */}
      <DiscoveryAscentSection t={t} scrollProgress={scrollYProgress} isMobile={isMobile} />
    </div>
  );
};

// ==============================================
// THE ANIMATED CONTENT (Sticky in viewport)
// ==============================================

const DiscoveryAscentSection = ({ t, scrollProgress, isMobile }) => {
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
  const alwaysOn = useMotionValue(1);

  return (
    <section 
      id="process" 
      className={`${isMobile ? 'relative py-8 h-auto flex flex-col w-full' : 'sticky top-16 h-[calc(100vh-4rem)] w-full flex flex-col pt-4 pb-4 px-6'} bg-obsidian overflow-hidden z-40`}
    >
      {/* HEADER - Visible at top */}
      <div className="text-center mb-4 z-20">
        <motion.span 
          className="font-mono text-xs tracking-brand text-violet font-bold uppercase block"
        >
          {t.procTag}
        </motion.span>
        <DynamicHeading 
          animate
          tag={t.procHeadTag}
          className="text-4xl font-heading font-bold text-mercury mb-4 leading-brand"
        >
          {t.procHead}<span className="text-violet">{t.procHeadSpan}</span>{t.procHeadEnd}
        </DynamicHeading>
        <motion.div 
          className="font-body text-logic-gray max-w-2xl mx-auto text-sm leading-relaxed"
        >
          <RichText content={t.procDesc} />
        </motion.div>
      </div>

      {/* MAIN CONTENT - Flex-1 for remaining space */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative px-6 md:px-0">
        {/* SVG POWER LINE - Animated path following scroll progress */}
        {!isMobile && (
          <>
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
            <ActivatorDot pathProgress={pathProgress} />
          </>
        )}

        {/* CARDS GRID - 3 columns, staggered heights */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10 w-full mt-10 md:mt-0">
          {/* CARD 01 - System Audit */}
          <DiscoveryCard
            ref={card1Ref}
            step="01"
            title={t.proc1Title}
            desc={t.proc1Desc}
            yOffset={isMobile ? 0 : 60}
            activationProgress={isMobile ? alwaysOn : card1Activate}
          />

          {/* CARD 02 - Prototype Shell */}
          <DiscoveryCard
            ref={card2Ref}
            step="02"
            title={t.proc2Title}
            desc={t.proc2Desc}
            yOffset={isMobile ? 0 : 30}
            activationProgress={isMobile ? alwaysOn : card2Activate}
          />

          {/* CARD 03 - Flagship Deployment */}
          <DiscoveryCard
            ref={card3Ref}
            step="03"
            title={t.proc3Title}
            desc={t.proc3Desc}
            yOffset={0}
            activationProgress={isMobile ? alwaysOn : card3Activate}
          />
        </div>
      </div>

      {/* "SCROLL TO EXPLORE" HINT - Fades out as Phase 1 progresses */}
      {!isMobile && (
        <>
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
        </>
      )}
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

  // Hoisted hook calls away from JSX bodies and loops
  const bgGlowMap = useTransform(glowIntensity, v => `radial-gradient(circle, rgba(127, 0, 255, ${v * 0.4}), transparent 70%)`);
  const shadowMap = useTransform(glowIntensity, v => `0 0 ${20 + v * 40}px rgba(127, 0, 255, ${0.5 + v * 0.5})`);
  const titleOpacity = useTransform(activationProgress, [0, 0.12, 1], [0, 1, 1]);
  const titleY = useTransform(activationProgress, [0, 0.12, 1], [10, 0, 0]);
  const descOpacity = useTransform(activationProgress, [0, 0.15, 1], [0, 1, 1]);
  const accentScaleX = useTransform(activationProgress, [0, 0.12, 1], [0, 1, 1]);

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
          style={{ background: bgGlowMap }}
          pointerEvents="none"
        />

        {/* Number Box - Pulses when powered on */}
        <motion.div 
          className="w-16 h-16 bg-violet text-obsidian rounded-xl flex items-center justify-center font-mono font-bold text-2xl mb-8 shadow-neon-glow relative z-10"
          style={{ boxShadow: shadowMap }}
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
                opacity: titleOpacity,
                y: titleY
              }}
              transition={{ delay: idx * 0.01 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h3>

        {/* Description - Fades in with power-on - FASTER */}
        <motion.div 
          className="text-logic-gray text-sm leading-relaxed flex-grow relative z-10 font-body"
          style={{ opacity: descOpacity }}
        >
          <RichText content={desc} />
        </motion.div>

        {/* Bottom accent line - Grows on activation - FASTER */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-violet/0 via-violet to-violet/0 mt-6 relative z-10"
          style={{
            scaleX: accentScaleX,
            opacity: glowIntensity
          }}
        />
      </motion.div>
    </motion.div>
  );
});

// --- Main Layout ---

import { VisualEditing } from '@sanity/visual-editing/react';

// Detect if we are in preview mode via URL parameter (same as client)
const isPreview = typeof window !== 'undefined' && window.location.search.includes('preview=true');

const DynamicHeading = ({ tag = 'h2', children, animate, ...props }) => {
  const Tag = (tag || 'h2').toLowerCase();
  const Component = animate ? motion[Tag] : Tag;
  return <Component {...props}>{children}</Component>;
};

export default function App() {
  const [lang, setLang] = useState('ENG');
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    // Audit: Unified Global Query fetching everything in ONE round-trip
    const query = `*[_id in ["home-page", "navigation", "settings"]] {
      _id,
      _type,
      ...
    }`;

    client.fetch(query).then(data => {
      const home = data.find(d => d._id === 'home-page');
      const navigation = data.find(d => d._id === 'navigation');
      const settings = data.find(d => d._id === 'settings');

      // Map sections from the array for easier lookup
      const sectionMap = {
        hero: home?.sections?.find(s => s._type === 'hero'),
        testimonials: home?.sections?.find(s => s._type === 'testimonials'),
        process: home?.sections?.find(s => s._type === 'process'),
        values: home?.sections?.find(s => s._type === 'values'),
        contact: home?.sections?.find(s => s._type === 'contact')
      };

      setSanityData({ ...sectionMap, navigation, settings });
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (sanityData?.settings?.siteTitle) {
      document.title = l(sanityData.settings.siteTitle);
    }
  }, [sanityData]);

  const langKey = lang === 'ENG' ? 'en' : 'sr';
  const l = (field) => field && typeof field === 'object' ? field[langKey] || field.en || '' : (field || '');

  // Map Sanity values to the static dictionary keys seamlessly.
  const t = {
    // SEO Tags
    heroTitleTag: sanityData?.hero?.titleTag || 'h1',
    testiHeadTag: sanityData?.testimonials?.headTag || 'h2',
    procHeadTag: sanityData?.process?.headTag || 'h2',
    featHeadTag: sanityData?.values?.headingTag || 'h2',
    contactHeadTag: sanityData?.contact?.headTag || 'h2',

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
    heroBtnStartIcon: sanityData?.hero?.btnStartIcon || 'Zap',
    heroBtnStartIconCustom: sanityData?.hero?.btnStartIconCustom,
    heroBtnPort: l(sanityData?.hero?.btnPortText) || dict[lang].heroBtnPort,

    // Testimonials
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
    featPreTitle: l(sanityData?.values?.preTitle) || (lang === 'ENG' ? 'Our Philosophy' : 'Naša Filozofija'),
    featHeading:  l(sanityData?.values?.heading)  || (lang === 'ENG' ? 'Three Pillars of Excellence' : 'Tri Stuba Izvrsnosti'),
    featSubtext:  l(sanityData?.values?.subtext)   || (lang === 'ENG' ? 'Every project we take on is guided by three core values that define how we think, build, and deliver.' : 'Svaki projekat kojim upravljamo vođen je trima temeljnim vrednostima koje definišu kako razmišljamo, gradimo i isporučujemo.'),
    feat1Tag: l(sanityData?.values?.cards?.[0]?.tag) || dict[lang].feat1Tag,
    feat1Icon: sanityData?.values?.cards?.[0]?.icon || 'ArrowRight',
    feat1Title: l(sanityData?.values?.cards?.[0]?.title) || dict[lang].feat1Title,
    feat1Desc: l(sanityData?.values?.cards?.[0]?.description) || dict[lang].feat1Desc,
    feat2Tag: l(sanityData?.values?.cards?.[1]?.tag) || dict[lang].feat2Tag,
    feat2Icon: sanityData?.values?.cards?.[1]?.icon || 'ArrowRight',
    feat2Title: l(sanityData?.values?.cards?.[1]?.title) || dict[lang].feat2Title,
    feat2Desc: l(sanityData?.values?.cards?.[1]?.description) || dict[lang].feat2Desc,
    feat3Tag: l(sanityData?.values?.cards?.[2]?.tag) || dict[lang].feat3Tag,
    feat3Icon: sanityData?.values?.cards?.[2]?.icon || 'ArrowRight',
    feat3Title: l(sanityData?.values?.cards?.[2]?.title) || dict[lang].feat3Title,
    feat3Desc: l(sanityData?.values?.cards?.[2]?.description) || dict[lang].feat3Desc,

    // Contact
    contactTag: l(sanityData?.contact?.tag) || dict[lang].contactTag,
    contactHead1: l(sanityData?.contact?.head1) || dict[lang].contactHead1,
    contactHeadSpan: l(sanityData?.contact?.headSpan) || dict[lang].contactHeadSpan,
    contactHead2: l(sanityData?.contact?.head2) || dict[lang].contactHead2,
    contactDesc: l(sanityData?.contact?.description) || dict[lang].contactDesc,
    contactF1: l(sanityData?.contact?.features?.[0]?.title) || dict[lang].contactF1,
    contactF1Icon: sanityData?.contact?.features?.[0]?.icon || 'Zap',
    contactF1Sub: l(sanityData?.contact?.features?.[0]?.subtext) || dict[lang].contactF1Sub,
    contactF2: l(sanityData?.contact?.features?.[1]?.title) || dict[lang].contactF2,
    contactF2Icon: sanityData?.contact?.features?.[1]?.icon || 'Layers',
    contactF2Sub: l(sanityData?.contact?.features?.[1]?.subtext) || dict[lang].contactF2Sub,
    
    // Form Labels (Sanity Fallbacks)
    formName: l(sanityData?.contact?.formLabels?.name) || dict[lang].formName,
    formCompany: l(sanityData?.contact?.formLabels?.company) || dict[lang].formCompany,
    formEmail: l(sanityData?.contact?.formLabels?.email) || dict[lang].formEmail,
    formPhone: l(sanityData?.contact?.formLabels?.phone) || dict[lang].formPhone,
    formDetails: l(sanityData?.contact?.formLabels?.details) || dict[lang].formDetails,
    formDetailsPlace: l(sanityData?.contact?.formLabels?.detailsPlace) || dict[lang].formDetailsPlace,
    formSubmit: l(sanityData?.contact?.formLabels?.submit) || dict[lang].formSubmit,
    formSubmitIcon: sanityData?.contact?.formLabels?.btnSubmitIcon || 'Zap',
    
    // Extraneous Form Translations (Currently Static)
    formOptional: dict[lang].formOptional,
    formSuccessTitle: dict[lang].formSuccessTitle,
    formSuccessDesc: dict[lang].formSuccessDesc,
    formError: dict[lang].formError,
    formSending: dict[lang].formSending,
  };

  const activeTestimonials = sanityData?.testimonials?.list?.length 
    ? sanityData.testimonials.list.map(item => ({
        name: typeof item.name === 'object' ? l(item.name) : item.name,
        role: l(item.role),
        quote: l(item.quote),
        color: item.color || "bg-primary",
        avatar: item.avatar,
        initials: item.initials
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
            <DynamicHeading tag={t.heroTitleTag} className="text-6xl md:text-8xl font-heading font-bold tracking-tight mb-8 text-mercury">
              {t.heroTitle1} <span className="text-violet italic">{t.heroTitleVelvet}</span>,<br />
              {t.heroTitle2} <span className="underline decoration-violet">{t.heroTitleLogic}</span>
            </DynamicHeading>
            <div className="font-body text-gray text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              <RichText content={t.heroDesc} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.button 
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet text-obsidian px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-lg shadow-violet/30 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">{t.heroBtnStart} <DynamicIcon name={t.heroBtnStartIcon} size={20} fill="currentColor" /></span>
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
              <DynamicHeading tag={t.testiHeadTag} className="text-5xl font-heading font-bold text-mercury mb-4">{t.testiHeadPre}<br/><span className="text-violet">{t.testiHeadSub}</span></DynamicHeading>
              <div className="text-gray font-mono"><RichText content={t.testiDesc} /></div>
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-violet font-bold uppercase mb-3 block">
            {t.featPreTitle}
          </span>
          <DynamicHeading tag={t.featHeadTag} className="text-4xl md:text-5xl font-heading font-bold text-mercury mb-4 leading-tight">
            {t.featHeading}
          </DynamicHeading>
          <div className="font-body text-gray text-base max-w-2xl mx-auto leading-relaxed">
            <RichText content={t.featSubtext} />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <LiquidFillCard 
            tag={t.feat1Tag}
            title={t.feat1Title}
            description={t.feat1Desc}
            delay={0.1}
          />
          <GravityWellCard 
            tag={t.feat2Tag}
            title={t.feat2Title}
            description={t.feat2Desc}
            delay={0.3}
          />
          <HumanImpactCard 
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
            <DynamicHeading tag={t.contactHeadTag} className="text-4xl md:text-6xl font-heading font-bold mb-6 text-obsidian">
              {t.contactHead1}<span className="text-violet italic">{t.contactHeadSpan}</span>{t.contactHead2}
            </DynamicHeading>
            <div className="text-obsidian/70 font-body mb-10 text-base max-w-md leading-relaxed">
              <RichText content={t.contactDesc} />
            </div>
            
            <div className="space-y-6 text-obsidian/70 font-body">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-violet/30 group-hover:border-violet/80 group-hover:scale-110 transition-all">
                  <DynamicIcon name={t.contactF1Icon} className="text-violet" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-obsidian text-lg">{t.contactF1}</h4>
                  <p className="text-sm text-obsidian/60">{t.contactF1Sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center border border-violet/30 group-hover:border-violet/80 group-hover:scale-110 transition-all">
                  <DynamicIcon name={t.contactF2Icon} className="text-violet" size={20} />
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
            <ContactForm 
              currentLang={lang}
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
        {isPreview && <VisualEditing />}
      </section>
    </div>
  );
}
