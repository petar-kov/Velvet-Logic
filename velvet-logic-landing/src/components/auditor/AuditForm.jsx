import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuditForm({ onSubmit, isLoading, t }) {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.formAction = undefined; // Prevent default form sub
    e.preventDefault();
    if (email && url) {
      onSubmit(email, url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative group transform md:-translate-y-4">
      
      <div className="relative z-10">
        <label htmlFor="url" className="block text-xs font-bold font-heading uppercase tracking-widest text-navy mb-2">
          {t?.auditorUrlLabel || 'Website URL'}
        </label>
        <div className="relative">
          <input
            id="url"
            name="url"
            type="text"
            required
            placeholder="e.g. yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="appearance-none block w-full px-5 py-4 bg-surface border border-gray/20 rounded-xl shadow-sm placeholder-secondary/50 font-body text-slate focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy transition-all"
          />
        </div>
      </div>

      <div className="relative z-10">
        <label htmlFor="email" className="block text-xs font-bold font-heading uppercase tracking-widest text-navy mb-2">
          {t?.auditorEmailLabel || 'Business Email'}
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-5 py-4 bg-surface border border-gray/20 rounded-xl shadow-sm placeholder-secondary/50 font-body text-slate focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy transition-all"
          />
        </div>
      </div>

      <div className="pt-2 relative z-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg text-lg font-heading font-bold text-white bg-orange hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-orange transition-all disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
              {t?.auditorLoading || 'Scanning Domain...'}
            </>
          ) : (
            <>
              <Search className="-ml-1 mr-3 h-5 w-5 text-white" />
              {t?.auditorSubmit || 'Generate Free Audit'}
            </>
          )}
        </motion.button>
        <p className="mt-4 text-xs text-center text-secondary font-body">
          We'll send the in-depth technical report to this email.
        </p>
      </div>
    </form>
  );
}
