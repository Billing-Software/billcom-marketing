import { motion } from 'motion/react';

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-md text-left text-slate-700 space-y-6"
    >
      <h2 className="font-display font-extrabold text-3xl text-slate-900 border-b pb-4">Terms of Service</h2>
      <p className="text-xs font-bold text-slate-400 font-mono">Last Updated: July 1, 2026</p>
      <p className="text-sm leading-relaxed">
        Welcome to BillCom. By registering a business profile and logging in to the BillCom admin panels, you agree to comply with the terms below.
      </p>

      <div className="space-y-6 text-sm leading-relaxed">
        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">1. Account Registration &amp; Store Setup</h4>
          <p>
            You must provide accurate business registers, trade names, branch locations, and tax registration numbers (GSTIN/TIN) to configure cashier registers. You are solely responsible for all invoices, checkout lists, and cash balances logged under your account credentials.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">2. Subscription Billing &amp; SaaS Fees</h4>
          <p>
            SaaS access plans (Starter, Growth, and Enterprise) are billed on a monthly recurring schedule. Unpaid subscription cycles will trigger auto-suspension of branch sync nodes. All fees are exclusive of regional GST.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">3. Tax Calculations &amp; Compliance</h4>
          <p>
            BillCom compiles and automates calculations based on tax rates (e.g. 18% GST) specified in your Settings panel. Store managers are responsible for configuring legally compliant rates. BillCom is not responsible for filing errors or tax audit discrepancies.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">4. Integrated Printer &amp; Webhook Gateways</h4>
          <p>
            Invoices dispatched via the WhatsApp gateway are subject to regional carrier regulations and monthly messaging quotas. Standard print outputs are designed for thermal paper width compatibility (80mm/58mm).
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 text-base mb-2">5. Service Uptime &amp; Synchronizations</h4>
          <p>
            We strive to maintain a 99.9% network uptime for database syncing channels. We are not liable for business losses due to temporary regional telecommunication outages.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
