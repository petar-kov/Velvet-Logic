import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import AuditForm from './AuditForm';
import AuditResults from './AuditResults';

const ExampleReport = ({ t }) => {
  return (
    <div className="w-full max-w-md bg-white p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col justify-between transform md:-translate-y-4 h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center">
            <BarChart3 className="text-orange w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-heading font-bold text-slate/50 uppercase tracking-widest">{t.auditorMockTag || 'Live Preview'}</div>
            <h3 className="text-xl font-heading font-bold text-navy">{t.auditorMockTitle || 'Diagnostic Report'}</h3>
          </div>
        </div>

        <div className="space-y-4 flex-grow flex flex-col justify-center">
          <div className="bg-surface border border-gray/10 p-4 rounded-2xl flex items-center gap-4 group-hover:border-gray/20 transition-colors">
             <div className="w-12 h-12 rounded-full border-[3px] border-green-500/20 flex items-center justify-center relative">
               <div className="absolute inset-0 border-[3px] border-green-500 rounded-full border-r-transparent rotate-45" />
               <span className="text-green-600 font-bold font-mono text-sm">98</span>
             </div>
             <div>
               <div className="text-navy font-bold text-sm">{t.auditorMock1Title || 'Performance'}</div>
               <div className="text-slate/60 text-xs">{t.auditorMock1Sub || 'Sub-second load time'}</div>
             </div>
          </div>

          <div className="bg-surface border border-gray/10 p-4 rounded-2xl flex items-center gap-4 group-hover:border-gray/20 transition-colors">
             <div className="w-12 h-12 rounded-full border-[3px] border-red-500/20 flex items-center justify-center relative">
               <div className="absolute inset-0 border-[3px] border-red-500 rounded-full border-r-transparent animate-spin" style={{ animationDuration: '3s' }} />
               <span className="text-red-500 font-bold font-mono text-sm">42</span>
             </div>
             <div>
               <div className="text-navy font-bold text-sm">{t.auditorMock2Title || 'Conversion Leaks'}</div>
               <div className="text-red-500 text-xs font-medium">{t.auditorMock2Sub || '3 critical errors'}</div>
             </div>
          </div>

          <div className="bg-surface border border-gray/10 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-slate font-medium">{t.auditorMockList1 || 'SSL Certificate Valid'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-slate font-medium">{t.auditorMockList2 || 'Missing sticky mobile CTA'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-slate font-medium">{t.auditorMockList3 || 'Multiple H1 tags detected'}</span>
            </div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 300, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 top-0 h-[2px] bg-orange shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default function SiteAuditor({ t }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);

  const handleAuditSubmit = async (email, url) => {
    setIsLoading(true);
    setError(null);
    setAuditData(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://velvet-site-auditor-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/v1/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, url }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate audit');
      }
      
      setAuditData(data);
      setTimeout(() => {
        document.getElementById('audit-results')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="free-audit" className="py-24 px-6 bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-heading text-sm tracking-widest text-orange font-bold uppercase mb-3 block">
            {t.auditorPre || 'Instant Analysis'}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            {t.auditorHead1 || 'Get Your Free '}<span className="text-orange">{t.auditorHeadHighlight || 'Site Audit'}</span>
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {t.auditorSub || 'Enter your domain below. Our engine will instantly scan your site for Conversion Leaks, Local SEO errors, and AI Search Readiness.'}
          </p>
        </div>

        {!auditData && (
          <div className="grid lg:grid-cols-2 gap-12 items-stretch group">
            <div className="w-full flex justify-center lg:justify-end">
              <AuditForm onSubmit={handleAuditSubmit} isLoading={isLoading} t={t} />
            </div>
            <div className="w-full justify-center lg:justify-start hidden lg:flex">
              <ExampleReport t={t} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="max-w-lg mx-auto bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg text-center font-body mt-8"
            >
              {error}
            </motion.div>
          )}

          {auditData && (
            <motion.div
              id="audit-results"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <AuditResults data={auditData} />
              
              <div className="mt-8 text-center">
                 <button 
                   onClick={() => setAuditData(null)}
                   className="text-white/60 hover:text-white transition-colors font-body text-sm underline"
                 >
                   Run another audit
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
