import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md text-left text-slate-700 space-y-6"
    >
      <h2 className="font-display font-extrabold text-3xl text-slate-900 border-b pb-4">Privacy Policy</h2>
      <p className="text-xs font-bold text-slate-400 font-mono">Last Updated: July 1, 2026</p>
      <p className="text-sm leading-relaxed">
        Your privacy is our priority. This document outlines how your retail and customer transaction details are handled.
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">1. Information We Collect</h4>
          <p>
            To operate billing services, we collect: business details (TIN, GSTIN, store address), product catalog listings, current stock levels, logged expenses, shift lists, customer contact profiles, and checkout invoice details.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">2. Processing &amp; Webhook Transmissions</h4>
          <p>
            Customer contact profiles and transaction data are transmitted to external WhatsApp API routing gateways only when you trigger invoice dispatches. We use TLS/SSL encryption protocols for all webhook transmittals.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">3. Storage &amp; Database Isolation</h4>
          <p>
            All data is hosted inside secure RDS clusters. We perform daily automated system backups. Employee accounts have restricted access based on owner-configured cashier permissions.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">4. Third-Party Restrictions</h4>
          <p>
            We do not sell, rent, or trade store registries, sales ledgers, or customer phone directories to marketing networks or data brokers under any circumstances.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
