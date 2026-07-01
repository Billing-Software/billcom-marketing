import { Link } from 'react-router-dom';
import billcomLogo from '../assets/BillCom-text.svg';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/60 py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={billcomLogo} 
            alt="BillCom Logo" 
            className="h-8 md:h-9 w-auto object-contain" 
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-[#006a61] transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-[#006a61] transition-colors">Pricing</Link>
          <Link to="/about" className="hover:text-[#006a61] transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-[#006a61] transition-colors">Contact Us</Link>
        </nav>

        {/* CTA Header Actions */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#006a61] bg-[#006a61]/10 border border-[#006a61]/20 px-2.5 py-1 rounded-full font-sans">
            Coming Soon
          </span>
        </div>
      </div>
    </header>
  );
}
