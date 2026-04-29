/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  TrendingUp, 
  Recycle, 
  Leaf, 
  Globe, 
  BarChart3, 
  CheckCircle2, 
  Settings2, 
  Play, 
  BookOpen, 
  FileText, 
  Bot, 
  FolderHeart,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  Send, 
  Loader2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Plus,
  Minus
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { InteractiveMap } from './components/InteractiveMap';

// Working Permanent GitHub Raw Links
const IMAGES = {
  LOGO_WHITE: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/Logo.png",
  LOGO_GREEN: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/Logo.png",
  HERO: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2070",
  CHERRIES: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHmZf_uLid_z3kU7aF0iWlXN66L97v6lR0i0DMC-sXokxJ7AgReGwjcsTdUi0LvSRXqRUXnIgC6bPtSjz0thDDm1tPNdWyBYb41iXVaUUz_SZRiLa1REflLYnHs817oRmBNseJQwpscVlJrZh8ns8M6s012YUVFrv0JQP81aWmRhm1wvSjfSollxuIQPhjzQlkTR0m8_7gU2ScnbhSsyWaXjhLNJbLfLG6Gt0Oyuxg",
  STRAWBERRIES: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV6mEjPzu1gITXx-PrMJxJnx3U4cBeEolVZHfpXBiIv5Cfzn_sIhkC7IyWSE7UmLr-lF1i0DMC-sXokxJ7AgReGwjcsTdUi0LvSRXqRUXnIgC6bPtSjz0thDDm1tPNdWyBYb41iXVaUUz_SZRiLa1REflLYnHs817oRmBNseJQwpscVlJrZh8ns8M6s012YUVFrv0JQP81aWmRhm1wvSjfSollxuIQPhjzQlkTR0m8_7gU2ScnbhSsyWaXjhLNJbLfLG6Gt0Oyuxg",
  COMMERCIAL_JUG: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/CF.png",
  HOME_BOTTLE: "https://raw.githubusercontent.com/HelloPipedream/AGP4/main/public/HG.png",
  ORGANIC: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjAkUQVkQLrcxBoyQBTsrjzjdiOHg8oPu-vuqMExv1PumD9QdWG_odDblKb6Rq3cLnzsF6hKQ-9qFm7-gvf3RvcwxtLeUCfvzcbx32jf9bstyczIoZ8SF97P44Erdr9JRP7xI_fklj7Qft94w_4AgX0Jn5dgBAUGu2hfq-tkTrEEjrEz-4w3T-gJ6qmQIKCV7RVLjxU6yJG7JcyBK4BHqLXOENJW3_KHqTu7H6DZMC_CFbrYGMt-EI4yzFFbU0ftxrHfxdTk5-G1w"
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
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-on-surface' : 'text-white'} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-outline-variant/20 transition-all ${isOpen ? 'bg-surface-container/30' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className={`text-lg font-bold font-body ${isOpen ? 'text-primary' : 'text-on-surface'}`}>{question}</span>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pb-8 pr-12 text-on-surface-variant font-light leading-relaxed font-body">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen min-h-[900px] w-full flex items-start pt-32 overflow-hidden bg-[#020402]">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            <img alt="Hero" className="w-full h-full object-cover opacity-40" src={IMAGES.HERO} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020402] via-[#020402]/80 to-transparent"></div>
          </motion.div>
          <div className="relative z-20 max-w-7xl mx-auto w-full px-8 md:px-12">
            <h1 className="text-white font-headline text-6xl md:text-8xl xl:text-[140px] leading-[0.88] tracking-tighter mb-12">
              Grow More.<br/><span className="text-primary italic">Use Less.</span><br/>Waste Nothing.
            </h1>
            <div className="max-w-md border-t border-white/5 pt-12">
              <p className="text-lg text-white/60 font-light font-body mb-10">AGP4 enhances absorption at the microscopic level, turning every spray into a more powerful application.</p>
              <div className="flex gap-4">
                <button className="bg-primary text-white p-5 px-10 text-[10px] font-black uppercase tracking-[0.3em]">How It Works</button>
              </div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section id="technology" className="bg-white py-32 px-8 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black">Methodology</span>
              <h2 className="text-4xl md:text-6xl font-headline text-on-surface leading-tight mb-8">Introducing the Absorption Revolution</h2>
              <div className="space-y-8 text-xl text-on-surface-variant font-light font-body">
                <p>Most nutrients and pesticides never fully make it into the plant. AGP4 changes that using advanced micelle technology.</p>
                <p className="text-primary font-black uppercase tracking-tight">Everything you already use works better.</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 border-l border-outline-variant/30 lg:pl-16">
              {[
                { icon: <TrendingUp />, title: "Increase Effectiveness", text: "Maximize performance through improved absorption." },
                { icon: <Recycle />, title: "Reduce Waste", text: "Less runoff. Better coverage. Efficient use." },
                { icon: <Leaf />, title: "Improve Outcomes", text: "Stronger growth and higher yields." }
              ].map((item, i) => (
                <div key={i} className="p-8 border-b border-outline-variant/30 last:border-0">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-primary">{item.icon}</div>
                    <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm font-light font-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIELD INTELLIGENCE SECTION */}
        <section id="impact" className="py-32 px-8 md:px-12 bg-surface-container/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block font-black">Field Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-headline leading-tight mb-6">Proven Results</h2>
              <div className="space-y-10">
                {[
                  { icon: <Globe />, title: "Real-World Scale", text: "Tested across thousands of acres globally." },
                  { icon: <BarChart3 />, title: "Measurable Data", text: "Significant yield increases validated by third parties." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-white shadow-sm flex items-center justify-center text-primary">{item.icon}</div>
                    <div>
                      <h3 className="text-lg uppercase tracking-widest font-bold font-body">{item.title}</h3>
                      <p className="text-sm text-on-surface-variant font-light font-body">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 shadow-2xl border border-primary/5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-10">Performance Insights</h4>
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest">Calcium Levels (Cherries)</h5>
                  <div className="text-5xl font-headline font-black text-primary">+85.7%</div>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "85.7%" }} transition={{ duration: 1.5 }} className="h-full bg-primary" />
                </div>
              </div>
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* DUAL SOLUTIONS SECTION */}
        <section id="solutions" className="bg-surface-container/30 border-y border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-primary-dark p-12 lg:p-20 flex flex-col items-center text-center min-h-[850px] justify-between">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-white">Commercial Farming</h2>
              <motion.img animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} src={IMAGES.COMMERCIAL_JUG} alt="Commercial" className="max-h-[380px] w-auto drop-shadow-2xl" />
              <button className="bg-white text-primary-dark px-12 py-5 font-black uppercase tracking-widest font-body">For Commercial Growers</button>
            </div>
            <div className="relative bg-white p-12 lg:p-20 flex flex-col items-center text-center min-h-[850px] justify-between">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface">Home Gardening</h2>
              <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 5.5, repeat: Infinity }} src={IMAGES.HOME_BOTTLE} alt="Home" className="max-h-[380px] w-auto drop-shadow-2xl" />
              <button className="bg-primary text-white px-12 py-5 font-black uppercase tracking-widest font-body">For Home Gardeners</button>
            </div>
          </div>
        </section>

        {/* RESOURCES & FAQ SECTION */}
        <section id="resources" className="py-32 px-8 md:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black">Intellectual Ecosystem</span>
              <h2 className="text-4xl md:text-7xl font-headline text-on-surface leading-tight mb-8">Grow Smarter with AGP4</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <div className="bg-white border border-outline-variant/20 p-8 hover:border-primary/30 transition-all">
                <BookOpen className="text-primary mb-6" size={32} />
                <h3 className="text-2xl font-headline mb-4">Crop Guides</h3>
                <p className="text-on-surface-variant text-sm font-light font-body">Tailored insights for 20+ crop varieties.</p>
              </div>
              <div className="bg-white border border-outline-variant/20 p-8 hover:border-primary/30 transition-all">
                <FileText className="text-primary mb-6" size={32} />
                <h3 className="text-2xl font-headline mb-4">Best Practices</h3>
                <p className="text-on-surface-variant text-sm font-light font-body">Maximize absorption with our technical journals.</p>
              </div>
              <div className="bg-on-surface text-white p-8">
                <Bot className="text-primary mb-6" size={32} />
                <h3 className="text-2xl font-headline mb-4">AI Assistant</h3>
                <button className="w-full bg-primary text-white py-4 text-[10px] font-black uppercase tracking-widest mt-4">Ask the Assistant</button>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 pt-24">
              <h3 className="text-4xl font-headline text-on-surface mb-12 font-bold italic">Frequently Asked Questions</h3>
              <div className="max-w-4xl">
                <FAQItem question="What exactly is AGP4 micelle technology?" answer="AGP4 uses microscopic 'micelles' to surround nutrients, allowing them to penetrate the plant's waxy cuticle more efficiently." />
                <FAQItem question="Is AGP4 suitable for organic farming?" answer="Yes, AGP4 is formulated to meet major organic certification standards and is safe for conventional use as well." />
                <FAQItem question="How much can I reduce my input usage?" answer="Many growers report maintaining yields while reducing synthetic inputs by 20% to 50% due to increased absorption efficiency." />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#0a1f0a] py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 leaf-texture opacity-5 pointer-events-none"></div>
        <Logo className="justify-center mb-8" />
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] font-body">© 2026 AGP4 Architectural Systems. All rights reserved.</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-4">Created by Pipedream.digital</p>
      </footer>
    </div>
  );
}
