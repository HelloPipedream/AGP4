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

// Permanent Working GitHub Raw Links
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

const Logo = ({ light = false, className = "" }: { light?: boolean, className?: string }) => (
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
    <div className={`border-b border-outline-variant/20 transition-all ${isOpen ? 'bg-surface-container/30 border-primary/30' : 'hover:bg-surface-container/10'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className={`text-lg font-bold font-body transition-colors ${isOpen ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180 shadow-lg' : 'bg-surface-container text-on-surface group-hover:bg-primary/10'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div className="pb-8 pr-12 text-on-surface-variant font-light leading-relaxed font-body">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AIFarmerAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your AGP4 Farmer Assistant. How can I help you optimize your crop growth today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: { systemInstruction: "You are an expert AGP4 Farmer Assistant." },
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "No response." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 z-[60] bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all"><Bot size={28} /></button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed bottom-24 right-8 z-[60] w-[400px] h-[550px] bg-white shadow-2xl flex flex-col border border-outline-variant/30 overflow-hidden">
            <div className="bg-primary p-6 flex justify-between items-center text-white font-body">
              <div className="flex items-center gap-3"><Bot /><h3 className="font-bold">AGP4 Assistant</h3></div>
              <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-sm rounded-xl ${m.role === 'user' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-outline-variant/30 flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about your crops..." className="flex-1 bg-surface-container p-3 text-sm outline-none" />
              <button onClick={handleSend} className="bg-primary text-white p-3"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <AIFarmerAssistant />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen min-h-[900px] w-full flex items-start pt-32 pb-48 overflow-hidden bg-[#020402]">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            <img alt="Hero" className="w-full h-full object-cover opacity-40" src={IMAGES.HERO} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020402] via-[#020402]/80 to-transparent"></div>
          </motion.div>
          <div className="relative z-20 max-w-7xl mx-auto w-full px-8 md:px-12">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px w-6 bg-primary"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.7em] text-primary font-body">Sustainable Farming Solutions</span>
              </div>
              <h1 className="text-white font-headline text-6xl md:text-8xl xl:text-[140px] leading-[0.88] tracking-tighter mb-12 drop-shadow-2xl">
                Grow More.<br/><span className="text-primary italic">Use Less.</span><br/>Waste Nothing.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                <div className="max-w-md">
                  <p className="text-lg text-white/60 font-light font-body mb-10">AGP4 enhances absorption at the microscopic level, turning every spray into a more powerful, efficient application.</p>
                  <button className="bg-primary text-white p-5 px-10 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">How It Works</button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section id="technology" className="bg-white py-32 px-8 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black font-body">Methodology</span>
              <h2 className="text-4xl md:text-6xl font-headline tracking-tight text-on-surface leading-tight mb-8">Introducing the Absorption Revolution</h2>
              <div className="h-[4px] w-24 bg-primary mb-12"></div>
              <div className="space-y-8 text-xl md:text-2xl text-on-surface-variant font-light font-body">
                <p>Most nutrients and pesticides never fully make it into the plant. AGP4 changes that using advanced micelle technology.</p>
                <p className="text-primary font-black text-lg uppercase tracking-tight">Everything you already use works better.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 border-l border-outline-variant/30 lg:pl-16 relative z-10">
              {[
                { icon: <TrendingUp />, title: "Increase Effectiveness", text: "Maximize the performance of nutrients through improved absorption." },
                { icon: <Recycle />, title: "Reduce Waste", text: "Less runoff. Better coverage. More efficient applications." },
                { icon: <Leaf />, title: "Improve Outcomes", text: "Stronger growth, healthier plants, and higher yields." }
              ].map((item, i) => (
                <div key={i} className="group p-8 border-b border-outline-variant/30 last:border-0 hover:bg-surface-container transition-all">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">{item.icon}</div>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{item.title}</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm font-light font-body">{item.text}</p>
                </div>
              ))}
              
              {/* TRUST BADGES SECTION */}
              <div className="mt-16 flex flex-wrap gap-x-16 gap-y-10 items-center px-8 lg:px-0 pt-12 border-t border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center font-black text-[10px] text-primary">BEE SAFE</div>
                  <div><span className="text-[10px] font-black uppercase text-primary block">Certified</span><span className="text-xs font-bold text-on-surface">Bee Friendly</span></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center font-black text-[10px] text-primary">OMRI</div>
                  <div><span className="text-[10px] font-black uppercase text-primary block">Eco-Label</span><span className="text-xs font-bold text-on-surface">Organic Standard</span></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 flex items-center justify-center font-black text-[10px] text-primary">USA</div>
                  <div><span className="text-[10px] font-black uppercase text-primary block">Standard</span><span className="text-xs font-bold text-on-surface">Made in USA</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT SECTION WITH PERFORMANCE INSIGHTS */}
        <section id="impact" className="py-32 px-8 md:px-12 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block font-black font-body">Field Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-headline leading-tight mb-6 text-on-surface">Proven Where It Matters Most</h2>
              <div className="space-y-10">
                {[
                  { icon: <Globe />, title: "Real-World Scale", text: "Tested across thousands of acres globally." },
                  { icon: <BarChart3 />, title: "Measurable Results", text: "Yield increases validated by independent data." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 bg-white shadow-sm border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">{item.icon}</div>
                    <div><h3 className="text-lg uppercase tracking-widest text-on-surface font-bold font-body">{item.title}</h3><p className="text-sm text-on-surface-variant font-light font-body">{item.text}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12 bg-white p-10 border border-primary/5 shadow-2xl relative">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-10 font-body">Performance Insights</h4>
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest font-body">Calcium Levels (Cherries)</h5>
                  <div className="text-5xl font-headline font-black text-primary tracking-tighter">+85.7%</div>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "85.7%" }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="h-full bg-primary" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mt-2 block font-body">AGP4 vs Standard Application</span>
              </div>
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="bg-surface-container/30 border-y border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            <div className="relative bg-primary-dark p-12 lg:p-20 flex flex-col items-center text-center min-h-[850px] justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-black font-body mb-8 block">Commercial Farming</span>
                <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-8">One Solution.<br/><span className="text-white/80 italic">Endless Applications.</span></h2>
              </div>
              <motion.img animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} src={IMAGES.COMMERCIAL_JUG} alt="Commercial" className="max-h-[380px] w-auto drop-shadow-2xl" />
              <button className="bg-white text-primary-dark px-12 py-5 font-black uppercase tracking-widest font-body">For Commercial Growers</button>
            </div>
            <div className="relative bg-white p-12 lg:p-20 flex flex-col items-center text-center min-h-[850px] justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black font-body mb-8 block">Home Gardening</span>
                <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface mb-8">Smarter Plant Care,<br/><span className="text-primary italic">Built In</span></h2>
              </div>
              <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 5.5, repeat: Infinity }} src={IMAGES.HOME_BOTTLE} alt="Home" className="max-h-[380px] w-auto drop-shadow-2xl" />
              <button className="bg-primary text-white px-12 py-5 font-black uppercase tracking-widest font-body">For Home Gardeners</button>
            </div>
          </div>
        </section>

        {/* INTELLECTUAL ECOSYSTEM GRID */}
        <section id="resources" className="py-32 px-8 md:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black font-body">Intellectual Ecosystem</span>
              <h2 className="text-4xl md:text-7xl font-headline tracking-tight text-on-surface leading-tight mb-6">Grow Smarter with AGP4</h2>
              <div className="h-[4px] w-24 bg-primary mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 bg-white border border-outline-variant/20 p-8 shadow-sm">
                <BookOpen className="text-primary mb-8" size={32} />
                <h3 className="text-3xl font-headline text-on-surface mb-4">Crop Guides</h3>
                <p className="text-on-surface-variant text-sm font-light font-body">Tailored insights for 20+ crops.</p>
              </div>
              <div className="md:col-span-4 bg-white border border-outline-variant/20 p-8 shadow-sm">
                <FileText className="text-primary mb-8" size={32} />
                <h3 className="text-3xl font-headline text-on-surface mb-4">Best Practices</h3>
                <p className="text-on-surface-variant text-sm font-light font-body">Optimization journals for maximum yield.</p>
              </div>
              <div className="md:col-span-4 bg-on-surface text-white p-8">
                <Bot className="text-primary mb-8" size={32} />
                <h3 className="text-3xl font-headline mb-4">AI Assistant</h3>
                <p className="text-white/60 text-sm mb-8 font-body">Instant data-driven answers for your farm.</p>
                <button className="w-full bg-white text-on-surface py-4 font-black uppercase tracking-widest text-[10px]">Ask Now</button>
              </div>
              <div className="md:col-span-12 bg-white border border-outline-variant/20 p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <div><h3 className="text-4xl font-headline text-on-surface mb-2 font-bold">Resource Hub</h3><p className="text-on-surface-variant font-body">Explore field trials and case studies.</p></div>
                <button className="bg-primary text-white px-10 py-5 font-black uppercase tracking-widest text-[11px]">Explore All</button>
              </div>
            </div>

            {/* FAQ SECTION */}
            <div className="mt-24 pt-24 border-t border-outline-variant/20 grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <h3 className="text-4xl font-headline text-on-surface leading-tight font-bold italic mb-8">Frequently Asked Questions</h3>
                <button className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">Ask a Custom Question <ArrowRight size={14} /></button>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <FAQItem question="What exactly is AGP4 micelle technology?" answer="AGP4 uses microscopic structures to surround nutrients and pesticides, ensuring near-total absorption at the cellular level by reducing surface tension." />
                <FAQItem question="Is AGP4 suitable for organic certified farming?" answer="Yes, AGP4 is formulated to meet the standards of organic farming and is compatible with OMRI guidelines." />
                <FAQItem question="How much can I reduce my current input usage?" answer="Growers typically report maintaining or increasing yields while reducing synthetic inputs by 20% to 50%." />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a1f0a] text-white pt-32 pb-12 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 leaf-texture opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-white/5 mb-24 items-center">
            <div className="lg:col-span-7"><h3 className="text-3xl md:text-5xl font-headline font-black leading-tight">Join our agricultural network.</h3></div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex bg-white/5 border border-white/10 p-1 group focus-within:border-primary transition-all">
                <input type="email" placeholder="Email address" className="bg-transparent flex-1 px-6 py-4 outline-none text-sm font-body" />
                <button className="bg-primary px-8 py-4 font-black uppercase text-[10px] tracking-widest">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <Logo light /><p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] font-body">© 2026 AGP4 Architectural Systems. All rights reserved.</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 font-body">Created by Pipedream.digital</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
