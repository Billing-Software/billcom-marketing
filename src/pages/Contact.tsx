import { useState } from 'react';
import { Send, CheckCircle2, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';

// EmailJS Constants
const SERVICE_ID = 'service_n3xydf3';
const TEMPLATE_ID = 'template_cznii9j';
const PUBLIC_KEY = 'kqaGcAYXDBTperrwy';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', business: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const templateParams = {
        title: formData.business ? `Inquiry from ${formData.business}` : 'General Business Inquiry',
        name: formData.name,
        email: formData.email,
        business: formData.business || 'Not Provided',
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        message: formData.message
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setIsSuccess(true);
      setShowToast(true);
      setFormData({ name: '', email: '', business: '', message: '' });
      
      // Auto-hide toast after 6 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 6000);
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      setErrorMessage(error?.text || 'Failed to send your inquiry. Please check your credentials or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-12 max-w-5xl mx-auto text-slate-700 text-left relative"
    >
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 right-4 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500 font-sans text-xs font-bold"
          >
            <CheckCircle2 size={16} className="text-white flex-shrink-0" />
            <span>Success! Message sent &amp; email dispatched.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
          Get in Touch
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-slate-900 tracking-tight leading-none text-center">
          Contact Our Sales &amp; Support Team
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto font-medium text-center">
          Have questions about multi-branch telemetry or custom printer integration setups? We are here to help.
        </p>
      </div>

      <div className="max-w-xl mx-auto w-full">
        {/* Contact Form */}
        <div className="glass-card rounded-3xl border border-slate-200 p-8 bg-white shadow-lg relative overflow-hidden min-h-[420px] flex flex-col justify-center">
          {isSuccess ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-550 max-w-sm mx-auto">
                Thank you for reaching out. A store implementation manager will review your trade details and contact you shortly.
              </p>
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setShowToast(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all cursor-pointer border"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Name</label>
                  <input 
                    type="text" required placeholder="e.g. Rakesh Yadav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email Address</label>
                  <input 
                    type="email" required placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Business Name (Optional)</label>
                <input 
                  type="text" placeholder="e.g. Yadav Retail Outlets"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Message Description</label>
                <textarea 
                  rows={4} required placeholder="Detail your hardware setups or sync targets..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 resize-none font-sans"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold font-sans">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#006a61] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-[#004d47] transition-all cursor-pointer shadow"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Sending inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
