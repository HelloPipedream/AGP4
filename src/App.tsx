/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  TrendingUp, Recycle, Leaf, Globe, BarChart3, CheckCircle2, 
  Settings2, Play, BookOpen, FileText, Bot, FolderHeart,
  ChevronRight, ArrowRight, Menu, X, MessageSquare, Send, 
  Loader2, MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Plus, Minus
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { InteractiveMap } from './components/InteractiveMap';

// REPLACE THESE URLS with your ImgBB or Public GitHub links
const IMAGES = {
  LOGO_WHITE: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/Logo.png",
  LOGO_GREEN: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/Logo.png",
  HERO: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2070",
  COMMERCIAL_JUG: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/CF.png",
  HOME_BOTTLE: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/HG.png"
};

const Logo = ({ className = "" }: { light?: boolean, className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <img src={IMAGES.LOGO_WHITE} alt="AGP4 Logo" className="h-12 w-auto object-contain" />
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Technology', id: 'technology' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Impact', id: 'impact' },
    { label: 'Resources', id: 'resources' }
  ];

  return (
    <nav onMouseLeave={() => setActiveMegaMenu(null)} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || activeMegaMenu ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center w-full px-8 md:px-12 py-6 border-b border-outline-variant/10">
        <div className="flex items-center gap-12">
          <Logo className="cursor-pointer" />
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button key={item.label} onMouseEnter={() => setActiveMegaMenu(item.id)} className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative py-2 font-body ${isScrolled || activeMegaMenu ? 'text-on-surface' : 'text-white/80'}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="bg-primary text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark font-body">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <section className="relative h-screen min-h-[900px] w-full flex items-start pt-32 overflow-hidden bg-[#020402]">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            <img alt="Hero" className="w-full h-full object-cover opacity-40" src={IMAGES.HERO} />
          </motion.div>
          <div className="relative z-20 max-w-7xl mx-auto w-full px-8 md:px-12">
            <h1 className="text-white font-headline text-6xl md:text-8xl xl:text-[140px] leading-[0.88] tracking-tighter mb-12">
              Grow More.<br/><span className="text-primary italic">Use Less.</span><br/>Waste Nothing.
            </h1>
          </div>
        </section>

        {/* Commercial & Home Solutions */}
        <section className="bg-surface-container/30 border-y border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-primary-dark p-12 lg:p-20 flex flex-col items-center text-center min-h-[800px]">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-8">Commercial Farming</h2>
              <div className="flex items-center justify-center py-8">
                <motion.img animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} src={IMAGES.COMMERCIAL_JUG} alt="Commercial" className="max-h-[380px] w-auto drop-shadow-2xl" />
              </div>
              <button className="bg-white text-primary-dark px-12 py-5 font-black uppercase tracking-widest">For Commercial Growers</button>
            </div>

            <div className="relative bg-white p-12 lg:p-20 flex flex-col items-center text-center min-h-[800px]">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface mb-8">Home Gardening</h2>
              <div className="flex items-center justify-center py-8">
                <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 5.5, repeat: Infinity }} src={IMAGES.HOME_BOTTLE} alt="Home" className="max-h-[380px] w-auto drop-shadow-2xl" />
              </div>
              <button className="bg-primary text-white px-12 py-5 font-black uppercase tracking-widest">For Home Gardeners</button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#0a1f0a] py-20 px-8 text-center">
        <Logo className="justify-center mb-8" />
        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">© 2026 AGP4 Architectural Systems.</p>
      </footer>
    </div>
  );
}
