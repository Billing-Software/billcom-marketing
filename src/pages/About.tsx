import { Store, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-20 max-w-4xl mx-auto text-slate-700 text-left"
    >
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
          Who We Are
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-slate-900 tracking-tight leading-none">
          Obsessed with Speed &amp; Reliability
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto font-medium">
          Building the digital infrastructure for modern retail checkout nodes and ledger sync.
        </p>
      </div>

      <div className="glass-card rounded-3xl border border-slate-200 p-8 md:p-12 bg-white shadow-xl relative overflow-hidden space-y-8">
        <div className="absolute inset-0 bg-[#006a61]/5 blur-3xl pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <h3 className="font-display font-bold text-xl text-slate-900">Our Vision</h3>
          <p className="leading-relaxed">
            At BillCom, we believe retail billing shouldn't be sluggish, complicated, or restricted by offline connectivity. Our mission is to provide store cashiers, warehouse managers, and franchise owners with lightweight, instant-syncing POS tools that work seamlessly across mobile, tablet, and desktop environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-105">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61]">
              <Store size={18} />
            </span>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Offline First Architecture</h4>
              <p className="text-xs text-slate-500 mt-1">Our client cash-register engine caches checkout data locally and performs background sync when networks recover.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="p-3 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61]">
              <ShieldCheck size={18} />
            </span>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Enterprise Security Compliance</h4>
              <p className="text-xs text-slate-500 mt-1">We enforce database node isolation, daily encrypted backup vaults, and secure TLS API transmissions.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
