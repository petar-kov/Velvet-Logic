import React from 'react';
import { urlFor } from '../../sanity';
import { l } from './SharedComponents';

export default function Navbar({ data, settings }) {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const logo = settings?.logo;

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center bg-surface border-b border-gray/20 shadow-sm">
      <div className="flex items-center">
        {logo && logo.asset ? (
          <img src={urlFor(logo).height(40).url()} alt="Logo" className="h-8 md:h-10" />
        ) : (
          <div className="text-xl md:text-2xl font-bold font-heading tracking-tight text-slate">
            VELVET<span className="text-navy">LOGIC</span>
          </div>
        )}
      </div>
      
      <div className="hidden md:flex gap-8 items-center font-heading font-medium text-sm text-slate">
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-navy transition-colors">Audit Process</a>
        <a href="#design-philosophy" onClick={(e) => scrollToSection(e, 'design-philosophy')} className="hover:text-navy transition-colors">Design Philosophy</a>
        <a href="#contact" onClick={scrollToContact} className="hover:text-navy transition-colors">{l(data?.navContact) || 'Contact Us'}</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop CTA */}
        <button 
          onClick={scrollToContact}
          className="hidden md:block bg-orange text-white px-6 py-2.5 rounded-lg font-heading font-bold text-sm transition-colors hover:bg-orange/90 shadow-md whitespace-nowrap"
        >
          Book An Audit
        </button>
        
        {/* Mobile Sticky CTA */}
        <button 
          onClick={scrollToContact}
          className="md:hidden bg-orange text-white px-4 py-2 rounded-lg font-heading font-bold text-xs transition-colors hover:bg-orange/90 shadow-md whitespace-nowrap"
        >
          Book An Audit
        </button>
      </div>
    </nav>
  );
}
