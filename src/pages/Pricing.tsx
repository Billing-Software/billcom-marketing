import { CheckCircle2, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-24"
    >
      {/* Pricing plans grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Simple Transparent Pricing
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">
            Plans Built for Every Store Size
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium">
            Start with a 14-day free trial. No credit card required. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="glass-card rounded-3xl border border-slate-200 p-8 flex flex-col justify-between bg-white shadow-md relative overflow-hidden transition-all hover:scale-[1.01] hover:shadow-lg">
            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">Starter Plan</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">For single cash register outlets</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 font-mono">₹499</span>
                <span className="text-xs font-bold text-slate-400">/ month</span>
              </div>
              <div className="border-t border-slate-105 pt-6">
                <ul className="space-y-3.5 text-xs font-semibold text-slate-600 font-sans">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> 1 Branch &amp; 1 Cashier Profile
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> GST &amp; Non-GST Invoicing
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> CRM Customer Directory
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> SMS Invoice Dispatches
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-300">
                    <Minus size={14} /> Auto WhatsApp Webhooks
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-300">
                    <Minus size={14} /> Multi-Branch Syncing
                  </li>
                </ul>
              </div>
            </div>
            <a 
              href="/checkout?plan=1"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-bold text-xs mt-8 transition-colors block border border-slate-200 font-sans"
            >
              Start Free Trial
            </a>
          </div>

          {/* Growth Plan */}
          <div className="glass-card rounded-3xl border-2 border-[#006a61] p-8 flex flex-col justify-between bg-white shadow-xl relative overflow-hidden transition-all hover:scale-[1.01] hover:shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#006a61] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm">
              Most Popular
            </div>
            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">Growth Plan</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">Best for expanding retail franchises</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 font-mono">₹999</span>
                <span className="text-xs font-bold text-slate-400">/ month</span>
              </div>
              <div className="border-t border-slate-105 pt-6">
                <ul className="space-y-3.5 text-xs font-semibold text-slate-600 font-sans">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Up to 5 Branches Sync
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Unlimited Cashier Profiles
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Unlimited GST Invoices
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Auto WhatsApp Webhooks
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Stock Warning Alerts
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-300">
                    <Minus size={14} /> Dedicated Database Node
                  </li>
                </ul>
              </div>
            </div>
            <a 
              href="/checkout?plan=2"
              className="w-full py-3 rounded-xl bg-[#006a61] hover:bg-[#004d47] text-white text-center font-bold text-xs mt-8 transition-all block shadow-[0_4px_12px_rgba(0,106,97,0.25)] font-sans"
            >
              Start Free Trial
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card rounded-3xl border border-slate-200 p-8 flex flex-col justify-between bg-white shadow-md relative overflow-hidden transition-all hover:scale-[1.01] hover:shadow-lg">
            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-955">Enterprise Plan</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">For large chains with dedicated needs</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-800 font-mono">₹1,999</span>
                <span className="text-xs font-bold text-slate-400">/ month</span>
              </div>
              <div className="border-t border-slate-105 pt-6">
                <ul className="space-y-3.5 text-xs font-semibold text-slate-600 font-sans">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Unlimited Branches &amp; Cashiers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Dedicated Database Cluster
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> Custom PDF Invoice templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> SMS + WhatsApp Gateway Sync
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> 24/7 Priority Dedicated Manager
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-[#006a61]" /> API Integrations &amp; Webhooks
                  </li>
                </ul>
              </div>
            </div>
            <a 
              href="/checkout?plan=3"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-center font-bold text-xs mt-8 transition-colors block shadow font-sans"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
