import { motion } from 'framer-motion';
import { ShieldAlert, TrendingDown, Search, Globe, CheckCircle } from 'lucide-react';

export default function AuditResults({ data }) {
  const { totalScore, scores, deductions, impacts } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-[#10b981]'; // Emerald
    if (score >= 60) return 'text-[#f59e0b]'; // Amber
    return 'text-[#ef4444]'; // Red
  };

  const getRingColor = (score) => {
    if (score >= 80) return 'stroke-[#10b981]';
    if (score >= 60) return 'stroke-[#f59e0b]';
    return 'stroke-[#ef4444]';
  };

  const categories = [
    { title: 'Conversion & Trust', score: scores.conversion, max: 25, icon: <TrendingDown className="w-5 h-5" />, deducs: deductions.conversion },
    { title: 'Local SEO & Health', score: scores.seo, max: 25, icon: <Search className="w-5 h-5" />, deducs: deductions.seo },
    { title: 'AI Search (GEO/AEO)', score: scores.geo_aeo, max: 25, icon: <Globe className="w-5 h-5" />, deducs: deductions.geo_aeo },
    { title: 'Compliance Risks', score: scores.compliance, max: 25, icon: <ShieldAlert className="w-5 h-5" />, deducs: deductions.compliance },
  ];

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray/10"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 pb-10 border-b border-gray/10">
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 100 100">
            <circle
              className="stroke-mercury"
              strokeWidth="8"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <motion.circle
              className={getRingColor(totalScore)}
              strokeWidth="8"
              strokeLinecap="round"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-heading font-extrabold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">out of 100</span>
          </div>
        </div>
        
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate mb-4">Audit Complete</h2>
          <p className="text-secondary font-body text-lg leading-relaxed max-w-lg">
            We've analyzed <span className="font-bold text-navy bg-navy/5 px-2 py-1 rounded">{data.url}</span>. 
            An in-depth technical readout has been dispatched to your email.
          </p>
        </div>
      </div>

      {impacts.length > 0 && (
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-sm font-heading font-bold text-orange uppercase tracking-widest mb-4">Business Impact Warning</h3>
          <div className="bg-[#fff1f2] border-l-4 border-[#e11d48] p-6 rounded-r-xl space-y-4 shadow-sm">
            {impacts.map((impact, idx) => (
              <p key={idx} className="text-[#9f1239] font-body font-medium leading-relaxed">
                {impact}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="bg-surface rounded-2xl p-6 border border-gray/10 shadow-industrial transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-6 border-b border-gray/10 pb-4">
              <div className="flex items-center gap-3 font-heading font-bold text-lg text-slate">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy">
                  {cat.icon}
                </div>
                {cat.title}
              </div>
              <div className={`font-heading font-bold text-xl ${cat.score < cat.max ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
                {cat.score} <span className="text-sm text-secondary">/ {cat.max}</span>
              </div>
            </div>
            
            <ul className="space-y-3">
              {cat.deducs.length === 0 ? (
                <li className="flex items-start gap-3 text-sm text-[#059669] font-body font-medium">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#10b981]" />
                  Perfect score in this category! Zero deductions.
                </li>
              ) : (
                cat.deducs.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-secondary font-body leading-relaxed">
                    <span className="text-[#ef4444] font-bold mt-0.5 text-lg leading-none">&times;</span>
                    {d}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
