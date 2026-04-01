import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function ContactForm({ labels, currentLang = 'ENG' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (formData.phone && !phoneRegex.test(formData.phone)) newErrors.phone = 'Valid Phone Number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, lang: currentLang })
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const inputClasses = "peer w-full bg-transparent border-2 border-obsidian/20 px-4 py-4 text-obsidian focus:outline-none focus:border-violet focus:ring-0 placeholder-transparent transition-colors font-body rounded-lg animate-glow";
  const labelClasses = "absolute left-4 top-4 text-obsidian/40 text-sm font-mono uppercase tracking-widest transition-all pointer-events-none " +
    "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:bg-white peer-focus:px-1 peer-focus:text-violet " +
    "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1";

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-violet/20 shadow-xl"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-violet/10 border border-violet/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(127,0,255,0.2)]"
            >
              <CheckCircle2 size={40} className="text-violet" />
            </motion.div>
            <h3 className="text-3xl font-heading font-bold text-obsidian mb-2">{labels?.successTitle || "Thank you."}</h3>
            <p className="font-mono text-sm text-violet">
              {labels?.successDesc || "We've received your inquiry and will be in touch within 24 hours."}
            </p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-8 w-full"
            noValidate
          >
            <div className="flex flex-col gap-8">
              {/* Single Column Floating Labels */}
              <div className="relative">
                <input 
                  id="fullName" 
                  name="fullName" 
                  type="text" 
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClasses} 
                  placeholder={labels?.name || "Full Name"} 
                />
                <label htmlFor="fullName" className={labelClasses}>{labels?.name || "Full Name"}</label>
                {errors.fullName && <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-mono">{errors.fullName}</span>}
              </div>

              <div className="relative">
                <input 
                  id="companyName" 
                  name="companyName" 
                  type="text" 
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputClasses} 
                  placeholder={labels?.company || "Company Name"} 
                />
                <label htmlFor="companyName" className={labelClasses}>{labels?.company || "Company Name"} <span className="lowercase text-obsidian/40">{labels?.optional || "(optional)"}</span></label>
              </div>

              <div className="relative">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses} 
                  placeholder={labels?.email || "Email Address"} 
                />
                <label htmlFor="email" className={labelClasses}>{labels?.email || "Email Address"}</label>
                {errors.email && <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-mono">{errors.email}</span>}
              </div>

              <div className="relative">
                <input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses} 
                  placeholder={labels?.phone || "Phone Number"} 
                />
                <label htmlFor="phone" className={labelClasses}>{labels?.phone || "Phone Number"} <span className="lowercase text-obsidian/40">{labels?.optional || "(optional)"}</span></label>
                {errors.phone && <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-mono">{errors.phone}</span>}
              </div>

              <div className="relative mt-2">
                <textarea 
                  id="message" 
                  name="message" 
                  rows="3" 
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`} 
                  placeholder={labels?.detailsPlace || "Message"} 
                ></textarea>
                <label htmlFor="message" className={labelClasses}>{labels?.details || "Project Details"}</label>
                {errors.message && <span className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-mono">{errors.message}</span>}
              </div>
            </div>
            
            {status === 'error' && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono text-center">
                {labels?.errorText || "Something went wrong. Please try again."}
              </div>
            )}

            <motion.button 
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-violet text-white py-4 mt-4 rounded-xl font-heading font-bold text-lg relative overflow-hidden group shadow-lg shadow-violet/20 hover:shadow-violet/40 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === 'loading' ? (labels?.sending || 'SENDING...') : (labels?.submit || 'SEND MESSAGE')} 
                {!status && <Zap size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />}
                {status !== 'loading' && <Zap size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
