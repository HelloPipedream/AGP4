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

// Permanent GitHub Raw Links
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

// Logo component using custom SVG implementation to match user branding
const Logo = ({ light = false, className = "" }: { light?: boolean, className?: string }) => {
 return (
   <div className={`flex items-center ${className}`}>
     <img 
       src={IMAGES.LOGO_WHITE} 
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

     {/* Mega Menu Dropdown */}
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
               {/* Highlighted Section for 'Technology' */}
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

               {/* Grid Links */}
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
                 
                 {/* Decorative element for others */}
                 {activeMegaMenu !== 'technology' && (
                   <div className="hidden lg:flex items-center justify-center border-l border-outline-variant/10 pl-8">
                      <div className="text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-outline mb-4 block">AGP4 Ecosystem</span>
                        <p className="text-xs text-on-surface-variant font-light italic font-body max-w-[180px]">Scalable. Sustainable. Molecular-grade precision.</p>
                      </div>
                   </div>
                 )}
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
       {/* Enhanced Hero Section */}
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
               {/* Micro Tagline */}
               <div className="flex items-center gap-3 mb-1">
                 <div className="h-px w-6 bg-primary"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.7em] text-primary font-body">
                   Sustainable Farming Solutions
                 </span>
               </div>

               {/* Massive Architectural Headline */}
               <h1 className="text-white font-headline text-6xl md:text-8xl xl:text-[140px] leading-[0.88] tracking-tighter mb-12 drop-shadow-2xl">
                 Grow More.<br/>
                 <span className="text-primary italic">Use Less.</span><br/>
                 Waste Nothing.
               </h1>

               {/* Sub-content with strong vertical anchor */}
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
                 
                 {/* Decorative Stat/Label */}
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

         {/* Scroll Indicator - Positioned relative to avoid overlap */}
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

       {/* Methodology Section */}
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

               {/* Trust Badges */}
               <div className="mt-16 flex flex-wrap gap-x-16 gap-y-10 items-center px-8 lg:px-0 border-t border-outline-variant/10 pt-12">
                 {/* Bee Friendly */}
                 <div className="flex items-center gap-5 group cursor-default">
                   <div className="relative">
                     <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/50 transition-all duration-700 scale-150 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                     <div className="relative w-16 h-16 rounded-full border-2 border-primary/10 flex items-center justify-center bg-white shadow-sm group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(43,99,52,0.3)] transition-all duration-500 overflow-hidden group-hover:-rotate-6">
                       <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1 group-hover:scale-110 transition-transform duration-500 z-10">
                         <defs>
                           <path id="beeCurve" d="M10,32 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" />
                         </defs>
                         <circle cx="32" cy="32" r="30" fill="white"/>
                         <circle cx="32" cy="32" r="28" stroke="#F1B521" strokeWidth="3"/>
                         <text fill="#2B6334" fontSize="5" fontWeight="900" className="uppercase tracking-[0.2em] font-sans">
                           <textPath href="#beeCurve" startOffset="50%" textAnchor="middle">Certified • Certified • Certified</textPath>
                         </text>
                         {/* Bee Icon Design - Centered and scaled to not overlap text area */}
                         <g transform="translate(18, 20) scale(0.45)">
                           <path d="M32 15C25 15 20 20 20 25C20 28 22 32 25 35C22 38 20 42 20 45C20 50 25 55 32 55C39 55 44 50 44 45C44 42 42 38 39 35C42 32 44 28 44 25C44 20 39 15 32 15Z" fill="#F1B521"/>
                           <path d="M25 25C25 21 28 18 32 18C36 18 39 21 39 25C39 29 36 32 32 32C28 32 25 29 25 25Z" fill="#2B6334"/>
                           <path d="M26 23C26 23 23 21 23 18C23 15 26 15 26 18C26 21 26 23 26 23ZM38 23C38 23 41 21 41 18C41 15 38 15 38 18C38 21 38 23 38 23Z" stroke="#2B6334" strokeWidth="2"/>
                           <rect x="24" y="35" width="16" height="2" fill="#2B6334"/>
                           <rect x="22" y="42" width="20" height="2" fill="#2B6334"/>
                         </g>
                       </svg>
                     </div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Certified</span>
                     <span className="text-xs font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">Bee Friendly</span>
                   </div>
                 </div>

                 {/* OMRI / Organic */}
                 <div className="flex items-center gap-5 group cursor-default">
                   <div className="relative">
                     <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/50 transition-all duration-700 scale-150 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                     <div className="relative w-16 h-16 rounded-full border-2 border-primary/10 flex items-center justify-center bg-white shadow-sm group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(43,99,52,0.3)] transition-all duration-500 overflow-hidden group-hover:rotate-6">
                       <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full group-hover:scale-110 transition-all duration-500 z-10">
                         <defs>
                           <path id="omriCurve" d="M12,32 a20,20 0 1,1 40,0 a20,20 0 1,1 -40,0" />
                         </defs>
                         <circle cx="32" cy="32" r="30" fill="white"/>
                         <circle cx="32" cy="32" r="26" stroke="#2B6334" strokeWidth="2.5"/>
                         <text fill="#2B6334" fontSize="4.5" fontWeight="900" className="uppercase tracking-[0.15em] font-sans">
                           <textPath href="#omriCurve" startOffset="50%" textAnchor="middle">For Organic Use • Organic Standard</textPath>
                         </text>
                         <g transform="translate(14, 24)">
                           <text x="18" y="10" fontFamily="Arial Black, sans-serif" fontSize="12" fontWeight="900" textAnchor="middle" fill="#2B6334">OMRI</text>
                           <text x="18" y="18" fontFamily="Arial, sans-serif" fontSize="4" fontWeight="900" textAnchor="middle" fill="#2B6334" className="uppercase tracking-[0.2em]">LISTED</text>
                         </g>
                         <circle cx="32" cy="32" r="21" stroke="#2B6334" strokeWidth="0.5" strokeDasharray="1 2"/>
                       </svg>
                     </div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Eco-Label</span>
                     <span className="text-xs font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">OMRI Listed</span>
                   </div>
                 </div>

                 {/* Made in USA */}
                 <div className="flex items-center gap-5 group cursor-default">
                   <div className="relative">
                     <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/50 transition-all duration-700 scale-150 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                     <div className="relative w-16 h-16 rounded-full border-2 border-primary/10 flex items-center justify-center bg-white shadow-sm group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(43,99,52,0.3)] transition-all duration-500 overflow-hidden group-hover:rotate-6">
                       <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1 group-hover:scale-110 transition-transform duration-500 z-10">
                         <defs>
                           <path id="usaCurve" d="M12,32 a20,20 0 1,1 40,0 a20,20 0 1,1 -40,0" />
                         </defs>
                         <circle cx="32" cy="32" r="30" fill="white"/>
                         <circle cx="32" cy="32" r="27" stroke="#2B6334" strokeWidth="2"/>
                         <text fill="#2B6334" fontSize="4" fontWeight="900" className="uppercase tracking-[0.2em] font-sans">
                           <textPath href="#usaCurve" startOffset="50%" textAnchor="middle">Premium Quality • Established 2024</textPath>
                         </text>
                         {/* Modern USA Shield Icon */}
                         <g transform="translate(18, 22) scale(0.9)">
                           <path d="M15 0L30 5V15C30 22 25 28 15 32C5 28 0 22 0 15V5L15 0Z" fill="#3C3B6E"/>
                           <rect x="0" y="8" width="30" height="4" fill="#B22234"/>
                           <rect x="0" y="16" width="30" height="4" fill="#B22234"/>
                           <rect x="0" y="24" width="30" height="4" fill="#B22234"/>
                           <rect x="0" y="0" width="14" height="12" fill="#3C3B6E"/>
                           <circle cx="4" cy="4" r="1.5" fill="white"/>
                           <circle cx="10" cy="4" r="1.5" fill="white"/>
                           <circle cx="7" cy="8" r="1.5" fill="white"/>
                         </g>
                       </svg>
                     </div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Standard</span>
                     <span className="text-xs font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">Made in USA</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Visual Demonstration */}
       <section className="bg-surface-container/50 py-32 px-8 md:px-12 relative">
         <div className="absolute inset-0 leaf-texture opacity-[0.03] pointer-events-none"></div>
         <div className="max-w-7xl mx-auto text-center relative z-10">
           <div className="flex flex-col items-center mb-16">
             <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-6 block font-black font-body">Visual Demonstration</span>
             <h2 className="text-4xl md:text-6xl font-headline tracking-tight text-on-surface leading-tight mb-8">See the Absorption Revolution in Action</h2>
             <div className="h-[4px] w-24 bg-primary mb-8"></div>
             <div className="max-w-3xl">
               <p className="text-xl md:text-2xl text-on-surface-variant mb-4 leading-snug font-light font-body">
                 Watch how AGP4 uses micelle technology to improve penetration and absorption at the microscopic level.
               </p>
               <p className="text-sm text-primary font-bold uppercase tracking-[0.2em] font-body">Turn every spray into a more effective application.</p>
             </div>
           </div>

           <div className="relative max-w-5xl mx-auto group">
             <div className="aspect-video bg-black overflow-hidden shadow-2xl relative border-8 border-white">
               <img 
                 alt="Cinematic macro shot" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] opacity-80" 
                 src={IMAGES.HERO} 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-700"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <button className="w-28 h-28 bg-white/10 backdrop-blur-2xl border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-500 group/btn shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-90">
                   <Play size={40} className="fill-current ml-2 group-hover/btn:scale-110 transition-transform" />
                 </button>
               </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 structural-grid opacity-[0.08] pointer-events-none -z-10"></div>
             <div className="absolute -top-10 -left-10 w-40 h-40 dotted-map opacity-[0.08] pointer-events-none -z-10"></div>
           </div>

           <div className="mt-16 text-center">
             <button className="bg-primary text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark active:scale-95 shadow-lg font-body">
               Learn More About How It Works
             </button>
           </div>
         </div>
       </section>

       {/* Proven Resilience / Field Intelligence */}
       <section id="impact" className="py-32 px-8 md:px-12 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
           <div>
             <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block font-black font-body">Field Intelligence</span>
             <h2 className="text-5xl md:text-7xl font-headline tracking-tight text-on-surface leading-tight mb-6">Proven Where It Matters Most</h2>
             <p className="text-xl md:text-2xl text-on-surface-variant font-light leading-snug mb-6 font-body">Tested across thousands of acres of farmland in the United States, South America, Australia, and Southeast Asia.</p>
             <p className="text-sm text-primary font-bold uppercase tracking-[0.2em] mb-12 font-body">From controlled field trials to real-world applications, AGP4 consistently delivers measurable results.</p>
             
             <div className="space-y-10">
               {[
                 { icon: <Globe />, title: "Real-World Scale", text: "Used across thousands of acres in diverse climates and crop conditions, adapting to local soil profiles and humidity levels." },
                 { icon: <BarChart3 />, title: "Measurable Results", text: "Significant yield increases, improved input efficiency, and better pest control outcomes validated by independent third-party data." },
                 { icon: <CheckCircle2 />, title: "Field-Tested Performance", text: "Backed by extensive field trials and documented case studies with commercial growers ranging from family farms to industrial operations." },
                 { icon: <Settings2 />, title: "Consistent Across Applications", text: "From soil prep to foliar sprays and pesticide enhancement, AGP4 improves performance at every critical stage of the growth cycle." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex gap-6 group"
                 >
                   <div className="w-14 h-14 shrink-0 bg-white shadow-sm border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                     {item.icon}
                   </div>
                   <div>
                     <h3 className="text-lg uppercase tracking-widest text-on-surface mb-2 font-bold font-body">{item.title}</h3>
                     <p className="text-sm text-on-surface-variant leading-relaxed font-light font-body">{item.text}</p>
                   </div>
                 </motion.div>
               ))}
             </div>

             <div className="flex flex-col sm:flex-row gap-4 mt-16">
               <button className="bg-primary text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark shadow-lg flex-1 font-body">
                 View Field Results
               </button>
               <button className="bg-transparent border border-outline-variant text-on-surface px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:border-primary flex-1 font-body">
                 Explore Case Studies
               </button>
             </div>
           </div>

           <div className="space-y-12">
             {/* Performance Stats */}
             <div className="bg-white p-10 border border-primary/5 shadow-2xl space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 leaf-texture opacity-10 rotate-45 pointer-events-none"></div>
               <div className="relative z-10">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-10 font-body">Performance Insights</h4>
                 
                 {/* Progress Chart Item */}
                 <div className="mb-12">
                   <div className="flex justify-between items-end mb-4">
                     <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface font-body">Calcium Levels (Cherries)</h5>
                     <div className="text-5xl font-headline font-black text-primary tracking-tighter transition-all hover:scale-110 cursor-default">+85.7%</div>
                   </div>
                   <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: "85.7%" }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="h-full bg-primary relative"
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                     </motion.div>
                   </div>
                   <div className="mt-3">
                     <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 font-body">AGP4 Formula vs Standard Application</span>
                   </div>
                 </div>

                 <div className="space-y-6">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-6 font-body">Nutrient Absorption Efficiency</h5>
                   <div className="grid grid-cols-2 gap-4">
                     {[
                       { val: "+64%", label: "Calcium" },
                       { val: "+24%", label: "Nitrogen" }
                     ].map((stat, i) => (
                       <div key={i} className="bg-surface-container/50 p-6 border-l-4 border-primary hover:bg-white hover:shadow-lg transition-all">
                         <div className="text-4xl font-headline font-black text-on-surface tracking-tighter mb-1">{stat.val}</div>
                         <div className="text-[9px] font-black uppercase tracking-widest text-primary font-body">{stat.label}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap justify-between items-end gap-6 relative z-10">
                 <div className="space-y-2">
                   <div className="text-4xl font-headline font-black text-on-surface tracking-tighter">+37.5%</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-primary font-body">Total Yield Increase</div>
                 </div>
                 <div className="text-right space-y-2">
                   <div className="flex items-center justify-end gap-3">
                     <span className="text-lg font-bold text-on-surface-variant opacity-40 line-through font-body">18%</span>
                     <ArrowRight size={16} className="text-primary" />
                     <span className="text-3xl font-headline font-black text-on-surface">7%</span>
                   </div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-primary font-body">Off-grade Reduction</div>
                 </div>
               </div>
             </div>

             {/* Map Holder */}
             <InteractiveMap />
           </div>
         </div>
       </section>

       {/* Dual Solutions */}
       <section id="solutions" className="bg-surface-container/30 border-y border-outline-variant/20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
           {/* Commercial */}
           <div className="relative bg-primary-dark p-12 lg:p-20 flex flex-col items-center text-center overflow-hidden min-h-[850px] justify-between">
             <div className="absolute inset-0 structural-grid opacity-[0.05]"></div>
             <div className="absolute inset-0 leaf-texture opacity-5 rotate-90"></div>
             <div className="relative z-10 flex flex-col items-center max-w-xl h-full justify-between">
               <div>
                 <div className="flex items-center gap-4 mb-8 justify-center">
                   <div className="h-px w-8 bg-white/30"></div>
                   <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-black font-body">Commercial Farming</span>
                   <div className="h-px w-8 bg-white/30"></div>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-8 tracking-tight leading-tight">
                   One Solution.<br/>
                   <span className="text-white/80 italic">Endless Applications.</span>
                 </h2>
                 <p className="text-lg text-white font-bold leading-tight mb-6 font-body">From large-scale farming to home gardens, AGP4 enhances everything you already do.</p>
                 <p className="text-white/60 font-light leading-relaxed mb-12 font-body">Optimize large-scale operations with improved input efficiency and measurable yield gains.</p>
               </div>
               <div className="flex items-center justify-center py-8 relative">
                 {/* Enhanced Aura Pulse */}
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute w-[300px] h-[300px] bg-white rounded-full blur-[100px] pointer-events-none"
                 />
                 <motion.img 
                   animate={{ 
                     y: [0, -20, 0],
                     rotate: [0, -0.5, 0, 0.5, 0]
                   }}
                   transition={{ 
                     duration: 6, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                   whileHover={{ 
                     scale: 1.1, 
                     rotate: -2,
                     filter: "drop-shadow(0 0 50px rgba(255,255,255,0.4))",
                     y: -10
                   }}
                   src={IMAGES.COMMERCIAL_JUG} 
                   alt="AGP4 Commercial" 
                   className="relative z-10 max-h-[380px] w-auto drop-shadow-[0_45px_50px_rgba(0,0,0,0.8)] transition-all duration-700 cursor-pointer" 
                   referrerPolicy="no-referrer"
                 />
               </div>
               <button className="bg-white text-primary-dark px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all hover:bg-surface-container w-full sm:w-auto font-body">
                 For Commercial Growers
               </button>
             </div>
           </div>

           {/* Home */}
           <div className="relative bg-white p-12 lg:p-20 flex flex-col items-center text-center overflow-hidden min-h-[850px] justify-between">
             <div className="absolute inset-0 dotted-map opacity-[0.02]"></div>
             <div className="absolute inset-0 leaf-texture opacity-[0.02]"></div>
             <div className="relative z-10 flex flex-col items-center max-w-xl h-full justify-between">
               <div>
                 <div className="flex items-center gap-4 mb-8 justify-center">
                   <div className="h-px w-8 bg-primary/20"></div>
                   <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black font-body">Home Gardening</span>
                   <div className="h-px w-8 bg-primary/20"></div>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface mb-8 tracking-tight leading-tight">
                   Smarter Plant Care,<br/>
                   <span className="text-primary italic">Built In</span>
                 </h2>
                 <div className="inline-block bg-primary text-white px-6 py-2 font-black text-[9px] uppercase tracking-[0.4em] shadow-lg mb-8 relative font-body">
                   Mix. Spray. Grow.
                 </div>
                 <p className="text-lg text-on-surface font-bold leading-tight mb-6 font-body">Safe, simple plant care for modern home gardens.</p>
                 <p className="text-on-surface-variant font-light leading-relaxed mb-12 font-body">Grow healthier plants with less effort using a safe and easy-to-use formula.</p>
               </div>
               <div className="flex items-center justify-center py-8 relative">
                 {/* Enhanced Aura Pulse */}
                 <motion.div 
                   animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute w-[280px] h-[280px] bg-primary/20 rounded-full blur-[80px] pointer-events-none"
                 />
                 <motion.img 
                   animate={{ 
                     y: [0, -15, 0],
                     rotate: [0, 0.5, 0, -0.5, 0]
                   }}
                   transition={{ 
                     duration: 5.5, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                   whileHover={{ 
                     scale: 1.1, 
                     rotate: 2,
                     filter: "drop-shadow(0 0 40px rgba(43,99,52,0.3))",
                     y: -10
                   }}
                   src={IMAGES.HOME_BOTTLE}
                   alt="AGP4 Home" 
                   className="relative z-10 max-h-[380px] w-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.2)] transition-all duration-700 cursor-pointer" 
                   referrerPolicy="no-referrer"
                 />
               </div>
               <button className="bg-primary text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all hover:bg-primary-dark w-full sm:w-auto font-body">
                 For Home Gardeners
               </button>
             </div>
           </div>
         </div>
       </section>

       {/* Intellectual Ecosystem */}
       <section id="resources" className="py-32 px-8 md:px-12 bg-background relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10">
           <div className="mb-16">
             <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black font-body">Intellectual Ecosystem</span>
             <h2 className="text-4xl md:text-7xl font-headline tracking-tight text-on-surface leading-tight mb-6">Grow Smarter with AGP4</h2>
             <div className="h-[4px] w-24 bg-primary mb-8"></div>
             <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl font-light leading-relaxed font-body">
               Access expert knowledge, crop-specific insights, and intelligent tools designed to help you get better results.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
             {/* Card 1 */}
             <div className="md:col-span-4 group bg-white border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-all duration-500 flex flex-col p-8 cursor-pointer">
               <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                   <BookOpen size={24} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 font-body">20+ Crops Covered</span>
               </div>
               <h3 className="text-3xl font-headline tracking-tight mb-4 text-on-surface">Crop-Specific Guides</h3>
               <p className="text-on-surface-variant text-sm font-light leading-relaxed font-body">Tailored insights for different plants and growing conditions.</p>
             </div>

             {/* Card 2 */}
             <div className="md:col-span-4 group bg-white border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-all duration-500 flex flex-col p-8 cursor-pointer">
               <div className="w-12 h-12 bg-surface-container flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                 <FileText size={24} />
               </div>
               <h3 className="text-3xl font-headline tracking-tight mb-6 text-on-surface">Best Practices</h3>
               <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-6 font-body">Learn how to maximize absorption and improve outcomes across applications.</p>
               <div className="space-y-6 flex-grow">
                 <div className="border-l-2 border-surface-container-high group-hover:border-primary pl-4 transition-all group-hover:pl-6">
                   <h4 className="text-xs font-black uppercase tracking-wider mb-1 font-body">Optimizing pH levels</h4>
                   <p className="text-[11px] text-on-surface-variant font-light line-clamp-1 font-body">How solution balance affects micelle delivery...</p>
                 </div>
               </div>
               <div className="mt-8 pt-6 border-t border-outline-variant/30 text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-4 transition-all font-body">
                 Read Journal <ChevronRight size={14} />
               </div>
             </div>

             {/* Card 3: AI Assistant Promo */}
             <div className="md:col-span-4 group bg-on-surface text-white shadow-2xl hover:shadow-primary/30 transition-all duration-700 flex flex-col p-8 relative overflow-hidden">
               <div className="absolute inset-0 structural-grid opacity-[0.05]"></div>
               <div className="relative z-10 flex flex-col h-full">
                 <div className="flex items-center justify-between mb-8">
                   <div className="w-12 h-12 bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                     <Bot />
                   </div>
                   <span className="px-3 py-1 bg-primary/20 text-[8px] font-black uppercase tracking-[0.2em] border border-primary/30 font-body">Live Assistant</span>
                 </div>
                 <h3 className="text-3xl font-headline tracking-tight mb-4">AI Farmer Assistant</h3>
                 <p className="text-white/60 text-sm font-light leading-relaxed mb-8 font-body">Get instant, data-driven answers for your specific growing environment.</p>
                 <button 
                   onClick={() => {
                     const aiBtn = document.querySelector('button[class*="fixed bottom-8"]');
                     if (aiBtn) (aiBtn as HTMLButtonElement).click();
                   }}
                   className="w-full bg-white text-on-surface py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl font-body"
                 >
                   Ask the AI Assistant
                 </button>
               </div>
             </div>

             {/* Card 4: Wide Resource Hub */}
             <div className="md:col-span-12 group bg-white border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-all duration-500 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
               <div className="relative z-10 max-w-2xl">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                     <FolderHeart size={20} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 font-body">Comprehensive Archive</span>
                 </div>
                 <h3 className="text-4xl font-headline tracking-tight mb-4 text-on-surface font-bold">Resource Hub</h3>
                 <p className="text-on-surface-variant text-base font-light leading-relaxed font-body">Explore field trials, case studies, and in-depth educational content.</p>
               </div>
               <button className="bg-primary text-white px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary-dark shadow-lg font-body shrink-0">
                 Explore All Resources
               </button>
             </div>
           </div>

           {/* FAQ Section */}
           <div className="mt-24 pt-24 border-t border-outline-variant/20">
             <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
               <div className="lg:w-1/3">
                 <span className="text-[10px] uppercase tracking-[0.6em] text-primary mb-4 block font-black font-body">Knowledge Base</span>
                 <h3 className="text-4xl font-headline tracking-tight text-on-surface leading-tight mb-8 font-bold italic">
                   Frequently Asked Questions
                 </h3>
                 <p className="text-on-surface-variant text-base font-light leading-relaxed font-body mb-8">
                   Everything you need to know about AGP4 technology, application methodology, and expected outcomes.
                 </p>
                 <button className="text-[10px] font-black uppercase tracking-[0.4em] text-primary hover:text-primary-dark transition-colors flex items-center gap-3 font-body">
                   Ask a Custom Question <ArrowRight size={14} />
                 </button>
               </div>
               
               <div className="lg:w-2/3 space-y-4">
                 {[
                   {
                     q: "What exactly is AGP4 micelle technology?",
                     a: "AGP4 uses specific surfactants that form microscopic \"micelles\" around nutrients and pesticides in the solution. These micelles reduce surface tension and create an efficient pathway for inputs to pass through the plant's waxy cuticle, ensuring near-total absorption at the cellular level."
                   },
                   {
                     q: "Is AGP4 suitable for organic certified farming?",
                     a: "Yes, AGP4 is environmentally conscious and formulated to meet the rigorous standards of organic farming. Our technology is designed to be compatible with OMRI and other major organic certification standards, making it safe for both organic and conventional growers."
                   },
                   {
                     q: "How much can I potentially reduce my current input usage?",
                     a: "While results vary by crop and environment, many commercial growers report they can maintain or increase yields while reducing synthetic inputs by 20% to 50%. This is due to the drastic increase in absorption efficiency—meaning more of what you spray actually reaches its intended target."
                   },
                   {
                     q: "Are there specific weather conditions that optimize AGP4 applications?",
                     a: "AGP4 is designed to perform in diverse climates. However, its micelle technology is particularly beneficial in high-heat or low-humidity environments where spray evaporation is high and natural absorption is usually inhibited. It helps lock in the moisture and nutrients before they can evaporate."
                   },
                   {
                     q: "Can I mix AGP4 with my existing pesticide and nutrient programs?",
                     a: "Absolutely. AGP4 is designed to be a non-reactive enhancement to your current spray program. It is highly compatible with most standard fertilizers, foliar nutrients, and pesticides. We always recommend a standard jar test before large-scale mixing."
                   }
                 ].map((faq, i) => (
                   <FAQItem key={i} question={faq.q} answer={faq.a} />
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>
     </main>

     {/* Enhanced Footer */}
     <footer className="bg-[#0a1f0a] text-white pt-32 pb-12 px-8 md:px-12 relative overflow-hidden">
       {/* Background Decorative Layer */}
       <div className="absolute inset-0 leaf-texture opacity-[0.03] pointer-events-none"></div>
       <div className="absolute inset-0 structural-grid opacity-[0.02] pointer-events-none"></div>
       <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
       
       {/* Giant Watermark Logo */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none w-full flex flex-col items-center px-8">
          <svg 
           viewBox="0 0 100 80" 
           className="w-full max-w-[600px] h-auto" 
           fill="none" 
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M50 5C26.5 5 7.5 24 7.5 47.5C7.5 54.5 9 61 12 66.5C18 63 32.5 60.5 50 60.5C67.5 60.5 82 63 88 66.5C91 61 92.5 54.5 92.5 47.5C92.5 24 73.5 5 50 5Z" fill="white"/>
           <g stroke="#0a1f0a">
             <path d="M50 55V15" strokeWidth="2.5" strokeLinecap="round"/>
             <path d="M50 50C50 50 40 45 40 38C40 31 50 35 50 35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 50C50 50 60 45 60 38C60 31 50 35 50 35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 40C50 40 42 36 42 30C42 24 50 28 50 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 40C50 40 58 36 58 30C58 24 50 28 50 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 30C50 30 43 27 43 22C43 17 50 20 50 20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 30C50 30 57 27 57 22C57 17 50 20 50 20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 18C50 18 47 13 50 7C53 13 50 18 50 18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
           </g>
           <path d="M10 70C10 70 30 65 50 65C70 65 90 70 90 70" stroke="white" strokeWidth="3" strokeLinecap="round"/>
         </svg>
         <span className="text-[200px] font-headline font-black tracking-tighter text-white -mt-10">AGP4</span>
       </div>

       <div className="max-w-7xl mx-auto relative z-10">
         {/* Top Newsletter / CTA Bar */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-white/5 mb-24">
           <div className="lg:col-span-7">
             <h3 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-4 leading-tight">
               Cultivating a <i className="text-primary-light">Smarter</i> Future.<br/>
               Join our agricultural network.
             </h3>
             <p className="text-white/40 font-light max-w-lg font-body">
               Receive the latest field results, crop guides, and sustainable farming insights directly from AGP4 engineers.
             </p>
           </div>
           <div className="lg:col-span-5 flex flex-col justify-center">
             <div className="flex bg-white/5 border border-white/10 p-1 group focus-within:border-primary transition-all duration-500">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="bg-transparent border-none flex-1 px-6 py-4 outline-none text-sm font-body placeholder:text-white/20"
               />
               <button className="bg-primary hover:bg-primary-dark transition-all px-8 py-4 font-black uppercase text-[10px] tracking-widest active:scale-95 font-body">
                 Subscribe
               </button>
             </div>
             <p className="text-[9px] uppercase tracking-widest text-white/20 mt-4 font-bold font-body">
               By subscribing you agree to our privacy policy.
             </p>
           </div>
         </div>

         {/* Main Footer Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
         <div className="lg:col-span-4">
           <div className="group inline-block mb-10">
             <Logo light />
           </div>
           <p className="text-white/50 text-sm leading-relaxed font-body max-w-sm font-light mb-10 italic">
               For environmentally conscious farmers who seek effective yet eco-friendly pest control solutions for organic and conventional crops.
             </p>
             <div className="flex items-center gap-6">
               {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                 <button key={i} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-primary hover:bg-primary transition-all duration-300">
                   <Icon size={16} />
                 </button>
               ))}
             </div>
           </div>
           
           <div className="lg:col-span-2">
             <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-primary font-body">Solutions</h4>
             <ul className="space-y-6">
               {['Commercial Farming', 'Home Gardening'].map(item => (
                 <li key={item}>
                   <a href="#" className="relative group text-sm text-white/50 hover:text-white transition-colors font-body inline-block">
                     {item}
                     <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
                   </a>
                 </li>
               ))}
             </ul>
           </div>

           <div className="lg:col-span-3">
             <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-primary font-body">Resource Hub</h4>
             <ul className="space-y-6">
               {[
                 'Crop-specific Guides',
                 'Best Practices',
                 'Field Results',
                 'Explore Case Studies',
                 'AI Farmer Assistant'
               ].map(item => (
                 <li key={item}>
                   <button 
                     onClick={() => {
                       if (item === 'AI Farmer Assistant') {
                         const aiBtn = document.querySelector('button[class*="fixed bottom-8"]');
                         if (aiBtn) (aiBtn as HTMLButtonElement).click();
                       }
                     }}
                     className="relative group text-left w-full text-sm text-white/50 hover:text-white transition-colors font-body cursor-pointer flex items-center gap-2"
                   >
                     {item}
                     <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                   </button>
                 </li>
               ))}
             </ul>
           </div>

           <div className="lg:col-span-3">
             <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-primary font-body">Connect</h4>
             <div className="space-y-8">
               <div className="flex gap-5 group">
                 <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-colors text-white/40 group-hover:text-primary">
                   <MapPin size={18} />
                 </div>
                 <div className="text-sm">
                   <p className="text-white font-bold mb-1 font-body">Location</p>
                   <p className="text-white/40 font-light font-body">P.O. Box 1291<br/>San Joaquin, CA 93660</p>
                 </div>
               </div>
               <div className="flex gap-5 group">
                 <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-colors text-white/40 group-hover:text-primary">
                   <Phone size={18} />
                 </div>
                 <div className="text-sm">
                   <p className="text-white font-bold mb-1 font-body">Direct Line</p>
                   <p className="text-white/40 font-light font-body">415-385-8078</p>
                 </div>
               </div>
               <div className="flex gap-5 group">
                 <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-colors text-white/40 group-hover:text-primary">
                   <Mail size={18} />
                 </div>
                 <div className="text-sm">
                   <p className="text-white font-bold mb-1 font-body">Support Email</p>
                   <p className="text-white/40 font-light font-body hover:text-white transition-colors">
                     <a href="mailto:info@agp4farm.com">info@agp4farm.com</a>
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-10">
             <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 font-body">
               © 2026 AGP4 Architectural Systems. All rights reserved.
             </p>
             <div className="hidden lg:flex items-center gap-6 opacity-10">
               <div className="h-px w-12 bg-white"></div>
               <Leaf size={14} className="text-white" />
               <div className="h-px w-12 bg-white"></div>
             </div>
           </div>
           
           <div className="flex items-center gap-10">
             <div className="flex items-center gap-4 group cursor-pointer">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white transition-colors font-body">System Status</span>
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 font-body">
               Created by <a href="https://pipedream.digital" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors">Pipedream.digital</a>
             </p>
           </div>
         </div>
       </div>
     </footer>
   </div>
 );
}
