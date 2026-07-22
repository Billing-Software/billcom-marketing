import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

// Layout & Shared Components
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

import './App.css';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen bg-[#f8fafc] text-[#1a1c1e] overflow-x-hidden font-sans selection:bg-[#006a61]/25 selection:text-[#006a61]"
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`
        } as React.CSSProperties}
      >
        {/* Background Teal Glow Fields */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] radial-glow rounded-full" />
          <div className="absolute top-[30%] right-[-10%] w-[50%] h-[60%] radial-glow-purple rounded-full" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] radial-glow-mint rounded-full" />
          <div className="absolute inset-0 grid-bg-overlay opacity-80" />
        </div>

        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Home />} />
            <Route path="/demo" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/resume" element={<Checkout />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
