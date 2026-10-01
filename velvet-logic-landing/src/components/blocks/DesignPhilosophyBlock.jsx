import React from 'react';
import { motion } from 'framer-motion';

export default function DesignPhilosophyBlock({ data }) {
  return (
    <section 
      id="design-philosophy" 
      className="py-24 md:py-32 px-6 bg-surface relative overflow-hidden"
    >
      {/* Animated ambient gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <span className="font-heading text-xs md:text-sm tracking-widest text-navy font-bold uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-orange"></span>
            Design Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-8 text-slate leading-[1.1]">
            Aesthetics are not optional. <br/>
            <span className="text-orange">They are fundamental.</span>
          </h2>
          <div className="font-body text-secondary text-lg md:text-xl mb-8 leading-relaxed max-w-lg space-y-6">
            <p>
              When someone lands on your site, they decide if they trust you in a split second. Your brand's look and feel does all the talking before they even read a single word. We aren't just here to build websites that work. We're here to build digital experiences that feel undeniably premium, reliable, and sharp.
            </p>
            <p>
              For us, how a site looks is just as important as how it runs. Real growth happens when smart engineering is paired with a beautiful design, capturing your customers' attention and making them want to take action.
            </p>
          </div>
        </motion.div>

        {/* Right: Abstract Conceptual Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-[#f8f9fa] border-4 border-white flex items-center justify-center"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-10 pointer-events-none" />

          {/* Abstract floating shapes for "Growth/Beauty" */}
          <motion.div 
            className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full border border-navy/20"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-orange/30"
            animate={{ rotate: -360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-navy to-orange rounded-full mix-blend-multiply blur-2xl opacity-60"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-white to-orange/40 rounded-full mix-blend-screen blur-xl opacity-80"
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
