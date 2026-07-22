import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import billcomLogo from '../assets/BillCom-text.svg';

const WORKSPACE_URL = import.meta.env.VITE_WORKSPACE_URL || 'http://localhost:3000';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/60 py-4 px-6 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
          <img 
            src={billcomLogo} 
            alt="BillCom Logo" 
            className="h-8 md:h-9 w-auto object-contain" 
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-[#006a61] transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-[#006a61] transition-colors">Pricing</Link>
          <Link to="/about" className="hover:text-[#006a61] transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-[#006a61] transition-colors">Contact Us</Link>
        </nav>

        {/* CTA Header Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href={`${WORKSPACE_URL}/login`} 
            className="text-[10px] font-black uppercase tracking-widest text-[#006a61] bg-[#006a61]/10 border border-[#006a61]/20 px-4 py-1.5 rounded-full font-sans hover:bg-[#006a61]/20 transition-all active:scale-95 cursor-pointer"
          >
            Login
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <div className={`md:hidden absolute top-[73px] left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg px-6 py-6 space-y-4 transition-all duration-300 transform origin-top ${
        isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <nav className="flex flex-col gap-4 text-sm font-bold text-slate-700">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-[#006a61] transition-colors py-1.5 border-b border-slate-100"
          >
            Home
          </Link>
          <Link 
            to="/pricing" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-[#006a61] transition-colors py-1.5 border-b border-slate-100"
          >
            Pricing
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-[#006a61] transition-colors py-1.5 border-b border-slate-100"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-[#006a61] transition-colors py-1.5"
          >
            Contact Us
          </Link>
        </nav>
        <div className="pt-2">
          <a 
            href={`${WORKSPACE_URL}/login`} 
            onClick={() => setIsOpen(false)}
            className="inline-block w-full text-[10px] font-black uppercase tracking-widest text-[#006a61] bg-[#006a61]/10 border border-[#006a61]/20 px-3.5 py-2 rounded-full font-sans hover:bg-[#006a61]/20 transition-all active:scale-95 text-center cursor-pointer"
          >
            Login
          </a>
        </div>
      </div>
    </header>
  );
}
