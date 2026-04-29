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

// Images mapping - Using ./ for root-level files
const IMAGES = {
  LOGO_WHITE: "./Logo.png",
  LOGO_GREEN: "./Logo.png",
  HERO: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2070",
  CHERRIES: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHmZf_uLid_z3kU7aF0iWlXN66L97v6lR0i0DMC-sXokxJ7AgReGwjcsTdUi0LvSRXqRUXnIgC6bPtSjz0thDDm1tPNdWyBYb41iXVaUUz_SZRiLa1REflLYnHs817oRmBNseJQwpscVlJrZh8ns8M6s012YUVFrv0JQP81aWmRhm1wvSjfSollxuIQPhjzQlkTR0m8_7gU2ScnbhSsyWaXjhLNJbLfLG6Gt0Oyuxg",
  STRAWBERRIES: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV6mEjPzu1gITXx-PrMJxJnx3U4cBeEolVZHfpXBiIv5Cfzn_sIhkC7IyWSE7UmLr-lF1i0DMC-sXokxJ7AgReGwjcsTdUi0LvSRXqRUXnIgC6bPtSjz0thDDm1tPNdWyBYb41iXVaUUz_SZRiLa1REflLYnHs817oRmBNseJQwpscVlJrZh8ns8M6s012YUVFrv0JQP81aWmRhm1wvSjfSollxuIQPhjzQlkTR0m8_7gU2ScnbhSsyWaXjhLNJbLfLG6Gt0Oyuxg",
  COMMERCIAL_JUG: "./CF.png",
  HOME_BOTTLE: "./HG.png",
  ORGANIC: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjAkUQVkQLrcxBoyQBTsrjzjdiOHg8oPu-vuqMExv1PumD9QdWG_odDblKb6Rq3cLnzsF6hKQ-9qFm7-gvf3RvcwxtLeUCfvzcbx32jf9bstyczIoZ8SF97P44Erdr9JRP7xI_fklj7Qft94w_4AgX0Jn5dgBAUGu2hfq-tkTrEEjrEz-4w3T-gJ6qmQIKCV7RVLjxU6yJG7JcyBK4BHqLXOENJW3_KHqTu7H6DZMC_CFbrYGMt-EI4yzFFbU0ftxrHfxdTk5-G1w"
};

// Logo component
const Logo = ({ light = false, className = "" }: { light?: boolean, className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="./Logo.png" 
        alt="AGP4 Logo" 
        className="h-12 w-auto object-contain" 
      />
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Technology', id: 'technology' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Impact', id: 'impact' },
    { label: 'Resources', id: 'resources' }
  ];

  const megaMenuContent: Record<string, any> = {
    technology: {
      featured: {
        title: "The Absorption Revolution",
        description: "Discover how micelle engineering is transforming agricultural input efficiency at the molecular level.",
        cta: "Explore Technology",
        image: IMAGES.HERO
      },
      links: [
        { title: "Micelle Engineering", desc: "Molecular precision engineering", icon: <Settings2 size={18} /> },
        { title: "Absorption Science", desc: "How it penetrates surfaces", icon: <TrendingUp size={18} /> },
        { title: "Innovation Pipeline", desc: "Next-gen sustainable tools", icon: <Leaf size={18} /> }
      ]
    },
    solutions: {
      links: [
        { title: "Commercial Agriculture", desc: "Industrial scale operations", icon: <TrendingUp size={18} /> },
        { title: "Home & Garden", desc: "Residential sustainable care", icon: <Leaf size={18} /> },
        { title: "Specialty Crops", desc: "Precision high-value yields", icon: <BarChart3 size={18} /> },
        { title: "B2B Partnerships", desc: "Integrate AGP4 into products", icon: <Globe size={18} /> }
      ]
    },
    impact: {
      links: [
        { title: "Field Intelligence", desc: "Global trial data & results", icon: <BarChart3 size={18} /> },
        { title: "Sustainability Stats", desc: "Measuring environmental ROI", icon: <Globe size={18} /> },
        { title: "Case Studies", desc: "Success stories from the field", icon: <FileText size={18} /> }
      ]
    },
    resources: {
      links: [
        { title: "Knowledge Base", desc: "Technical docs & guides", icon: <BookOpen size={18} /> },
        { title: "FAQ", desc: "Common questions answered", icon: <MessageSquare size={18} /> },
        { title: "AI Assistant", desc: "Interactive farmer support", icon: <Bot size={18} /> }
      ]
    }
  };

  return (
    <nav 
      onMouseLeave={() => setActiveMegaMenu(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || activeMegaMenu ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="flex justify-between items-center w-full px-8 md:px-12 py-6 border-b border-outline-variant/10">
        <div className="flex items-center gap-12 text-current">
          <Logo light={!isScrolled && !activeMegaMenu} className="cursor-pointer" />
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onMouseEnter={() => setActiveMegaMenu(item.id)}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative py-2 font-body ${isScrolled || activeMegaMenu ? 'text-on-surface' : 'text-white/80'} ${activeMegaMenu === item.id ? 'text-primary' : ''}`}
              >
                {item.label}
                {activeMegaMenu === item.id && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className={`hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] transition-colors font-body ${isScrolled || activeMegaMenu ? 'text-on-surface hover:text-primary' : 'text-white/70 hover:text-white'}`}>
            Login
          </button>
          <button className="bg-primary text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] active:scale-95 duration-150 transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 font-body">
            Get Started
          </button>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-on-surface' : 'text-white'} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-outline-variant/10 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-8 md:px-12 py-12">
              <div className="grid grid-cols-12 gap-12">
                {activeMegaMenu === 'technology' && megaMenuContent.technology.featured && (
                  <div className="col-span-12 lg:col-span-5 relative group cursor-pointer overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"></div>
                    <img 
                      src={megaMenuContent.technology.featured.image} 
                      alt="Featured" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2 block">Featured Innovation</span>
                      <h3 className="text-3xl font-headline text-white mb-4 leading-tight">{megaMenuContent.technology.featured.title}</h3>
                      <p className="text-white/80 text-sm mb-6 max-w-sm font-light font-body">{megaMenuContent.technology.featured.description}</p>
                      <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary group/btn bg-white px-6 py-3 rounded-none hover:bg-primary hover:text-white transition-all">
                        {megaMenuContent.technology.featured.cta}
                        <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                <div className={`grid gap-8 ${activeMegaMenu === 'technology' ? 'col-span-12 lg:col-span-7 grid-cols-1 md:grid-cols-2' : 'col-span-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {megaMenuContent[activeMegaMenu].links.map((link: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex gap-5 p-4 -m-4 hover:bg-surface-container/50 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-sm">
                        {link.icon}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-1 group-hover:text-primary transition-colors font-body">{link.title}</h4>
                        <p className="text-xs text-on-surface-variant font-light font-body">{link.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background shadow-xl p-8 flex flex-col space-y-6 md:hidden z-50 border-t border-outline-variant/10"
          >
            {navItems.map((item) => (
              <button key={item.label} className="text-left text-sm font-black uppercase tracking-widest text-on-surface hover:text-primary py-2 border-b border-outline-variant/10 last:border-0 font-body">
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  key?: any;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-outline-variant/20 transition-all duration-300 ${isOpen ? 'bg-surface-container/30 border-primary/30' : 'hover:bg-surface-container/10'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold font-body transition-colors ${isOpen ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/20' : 'bg-surface-container text-on-surface group-hover:bg-primary/10'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-on-surface-variant font-light leading-relaxed font-body text-base">
              {answer}
            </div>
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
        config: {
          systemInstruction: "You are an expert AGP4 Farmer Assistant. You help farmers optimize their crop yields using AGP4 micelle technology. You are professional, knowledgeable about agriculture, and focused on helping users achieve better results with less waste."
        },
        contents: [
          { role: 'user', parts: [ { text: userMsg } ] }
        ],
      });
      
      const aiText = response.text || "I'm sorry, I couldn't process that request right now.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm experiencing some technical difficulties. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <Bot size={28} className="group-hover:animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 z-[60] w-[90vw] md:w-[400px] h-[550px] bg-white shadow-2xl flex flex-col border border-outline-variant/30 overflow-hidden"
          >
            <div className="bg-primary p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <Bot />
                <div>
                  <h3 className="font-bold">AGP4 Assistant</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 leaf-texture bg-opacity-5" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-sm ${m.role === 'user' ? 'bg-primary text-white rounded-l-xl rounded-tr-xl' : 'bg-surface-container text-on-surface rounded-r-xl rounded-tl-xl'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container p-3 rounded-r-xl rounded-tl-xl">
                    <Loader2 className="animate-spin text-primary" size={20} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-outline-variant/30 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your crops..."
                className="flex-1 bg-surface-container border-none p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary text-white p-3 hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
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
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <AIFarmerAssistant />

      <main>
        <section className="relative h-screen min-h-[900px] w-full flex items-start pt-32 pb-48 overflow-hidden bg-[#020402]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{ opacity: heroOpacity, scale: heroScale }} 
            className="absolute inset-0 z-0"
          >
            <img 
              alt="Aerial farm sunrise" 
              className="w-full h-full object-cover object-center opacity-40 animate-zoom-in-slow transition-opacity duration-[3000ms]" 
              src={IMAGES.HERO} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020402] via-[#020402]/80 to-transparent"></div>
            <div className="absolute inset-0 leaf-texture opacity-[0.03]"></div>
          </motion.div>
          
          <div className="relative z-20 max-w-7xl mx-auto w-full px-8 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
            >
              <div className="lg:col-span-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-px w-6 bg-primary"></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.7em] text-primary font-body">
                    Sustainable Farming Solutions
                  </span>
                </div>

                <h1 className="text-white font-headline text-6xl md:text-8xl xl:text-[140px] leading-[0.88] tracking-tighter mb-12 drop-shadow-2xl">
                  Grow More.<br/>
                  <span className="text-primary italic">Use Less.</span><br/>
                  Waste Nothing.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-white/5 pt-12">
                  <div className="max-w-md">
                    <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed font-body mb-10">
                      AGP4 enhances absorption at the microscopic level, turning every spray into a more powerful, efficient, and effective application.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-20 md:mb-0">
                      <button className="bg-primary text-white p-5 px-10 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark active:scale-95 shadow-[0_20px_40px_rgba(0,90,0,0.3)] font-body">
                        How It Works
                      </button>
                      <button className="text-white border border-white/10 p-5 px-10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all active:scale-95 backdrop-blur-sm font-body">
                        View Data Sheets
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:block pt-2">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-px bg-white/10 group-hover:w-16 group-hover:bg-primary transition-all duration-500"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-body">Innovation Pillar</span>
                      </div>
                      <p className="text-2xl font-headline italic text-white/80 leading-snug">
                        Micelle Engineering for the modern agricultural landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-6 left-8 flex items-center gap-6 opacity-30 group cursor-default"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent group-hover:h-12 transition-all duration-700"></div>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/60 font-body">Scroll to explore</span>
          </motion.div>
        </section>

        <section id="process" className="bg-white py-32 px-8 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img src={IMAGES.CHERRIES} alt="" className="absolute top-[10%] left-[5%] w-64 h-64 opacity-[0.04] blur-xl transform -rotate-12" referrerPolicy="no-referrer" />
            <img src={IMAGES.STRAWBERRIES} alt="" className="absolute bottom-[15%] right-[10%] w-80 h-80 opacity-[0.03] blur-2xl transform rotate-45" referrerPolicy="no-referrer" />
            <img src={IMAGES.ORGANIC} alt="" className="absolute bottom-[5%] left-[30%] w-56 h-56 opacity-[0.04] blur-md" referrerPolicy="no-referrer" />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col relative z-10"
              >
                <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black font-body">Methodology</span>
                <h2 className="text-4xl md:text-6xl font-headline tracking-tight text-on-surface leading-tight mb-8">
                  Introducing the Absorption Revolution
                </h2>
                <div className="h-[4px] w-24 bg-primary mb-12"></div>
                
                <p className="text-[10px] uppercase tracking-[0.4em] text-outline font-black mb-4 font-body">It all comes down to absorption.</p>
                <div className="space-y-8 text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light font-body">
                  <p>Most nutrients and pesticides never fully make it into the plant. AGP4 changes that.</p>
                  <p>Using advanced micelle technology, AGP4 surrounds inputs with microscopic structures that help them penetrate and absorb more effectively into plant surfaces.</p>
                  <p className="text-primary font-black text-lg uppercase tracking-tight">The result is simple: Everything you already use works better.</p>
                </div>

                <button className="bg-primary text-white mt-12 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark self-start active:scale-95 shadow-lg hover:shadow-primary/20 font-body">
                  See Absorption in Action
                </button>
              </motion.div>

              <div className="grid grid-cols-1 border-l border-outline-variant/30 pl-0 lg:pl-16 relative z-10">
                {[
                  { icon: <TrendingUp />, title: "Increase Effectiveness", text: "Maximize the performance of nutrients and pesticides through improved absorption." },
                  { icon: <Recycle />, title: "Reduce Waste", text: "Less runoff. Better coverage. More efficient use of every application." },
                  { icon: <Leaf />, title: "Improve Plant Outcomes", text: "Stronger growth, healthier plants, and higher yields." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-8 border-b border-outline-variant/30 last:border-0 hover:bg-surface-container transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-6 mb-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-headline tracking-tight text-on-surface font-bold">{item.title}</h3>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light font-body">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container/50 py-32 px-8 md:px-12 relative">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline tracking-tight text-on-surface mb-8">See the Absorption Revolution in Action</h2>
            <div className="relative max-w-5xl mx-auto">
               <div className="aspect-video bg-black overflow-hidden shadow-2xl relative border-8 border-white">
                <img 
                  alt="Cinematic macro shot" 
                  className="w-full h-full object-cover opacity-80" 
                  src={IMAGES.HERO} 
                />
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="py-32 px-8 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface leading-tight mb-6">Proven Where It Matters Most</h2>
              <div className="space-y-10">
                {[
                  { icon: <Globe />, title: "Real-World Scale", text: "Used across thousands of acres in diverse climates." },
                  { icon: <BarChart3 />, title: "Measurable Results", text: "Significant yield increases validated by independent data." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg uppercase tracking-widest text-on-surface mb-2 font-bold">{item.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container/30 border-y border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Commercial Section */}
            <div className="relative bg-primary-dark p-12 lg:p-20 flex flex-col items-center text-center min-h-[800px]">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-8">Commercial Farming</h2>
                <div className="flex items-center justify-center py-8">
                  <motion.img 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    src="./CF.png" 
                    alt="AGP4 Commercial" 
                    className="max-h-[380px] w-auto drop-shadow-2xl" 
                  />
                </div>
                <button className="bg-white text-primary-dark px-12 py-5 font-black uppercase tracking-widest">
                  For Commercial Growers
                </button>
              </div>
            </div>

            {/* Home Section */}
            <div className="relative bg-white p-12 lg:p-20 flex flex-col items-center text-center min-h-[800px]">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface mb-8">Home Gardening</h2>
                <div className="flex items-center justify-center py-8">
                  <motion.img 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    src="./HG.png"
                    alt="AGP4 Home" 
                    className="max-h-[380px] w-auto drop-shadow-2xl" 
                  />
                </div>
                <button className="bg-primary text-white px-12 py-5 font-black uppercase tracking-widest">
                  For Home Gardeners
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a1f0a] text-white pt-32 pb-12 px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
          <Logo light />
          <p className="text-white/20 text-[10px] uppercase font-black">
            © 2026 AGP4 Architectural Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
