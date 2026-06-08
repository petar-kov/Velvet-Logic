import { motion } from 'framer-motion';
import { ShieldAlert, TrendingDown, Search, Globe, CheckCircle } from 'lucide-react';

export default function AuditResults({ data }) {
  const { totalScore, scores, deductions, impacts } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRingColor = (score) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
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
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-gray-100">
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="stroke-gray-200"
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
            <span className={`text-5xl font-extrabold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">out of 100</span>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-obsidian mb-2">Audit Complete</h2>
          <p className="text-secondary text-lg">
            We've analyzed <span className="font-semibold text-navy">{data.url}</span>. 
            An in-depth version of this report has been sent to your email.
          </p>
        </div>
      </div>

      {impacts.length > 0 && (
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-xl font-bold text-slate mb-4">Business Impact Warning</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg space-y-4">
            {impacts.map((impact, idx) => (
              <p key={idx} className="text-red-800 font-medium">
                {impact}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="bg-mercury rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-slate font-bold text-lg">
                <span className="text-navy">{cat.icon}</span>
                {cat.title}
              </div>
              <div className={`font-bold text-lg ${cat.score < cat.max ? 'text-red-500' : 'text-green-500'}`}>
                {cat.score} / {cat.max}
              </div>
            </div>
            
            <ul className="space-y-3">
              {cat.deducs.length === 0 ? (
                <li className="flex items-start gap-2 text-sm text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Perfect score in this category!
                </li>
              ) : (
                cat.deducs.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="text-red-500 font-bold mt-0.5">&times;</span>
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
