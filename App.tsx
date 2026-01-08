
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Compass, 
  PenTool, 
  Layers, 
  ChevronRight, 
  Maximize2, 
  Zap, 
  Image as ImageIcon,
  ArrowRight,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  MousePointer2
} from 'lucide-react';
import { generateArchitecturalSketch } from './services/geminiService';
import { Project } from './types';

// --- Utility Components ---

const FadeInView = ({ children, delay = 0, direction = 'up' }: { children?: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-none transform rotate-45 group hover:rotate-0 transition-transform duration-500">
            <span className="text-white font-bold text-xl -rotate-45 group-hover:rotate-0 transition-transform">T</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold tracking-[0.2em] text-lg">TIANZHU</span>
            <span className="text-[10px] tracking-[0.4em] text-stone-400 mt-1 uppercase">Engineering Design</span>
          </div>
        </motion.div>

        <div className="hidden md:flex space-x-12">
          {['作品集', '设计流程', 'AI实验室', '关于天筑'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="relative text-stone-600 hover:text-stone-900 text-sm font-bold tracking-widest transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center space-x-2 bg-stone-900 text-white px-7 py-2.5 rounded-none text-xs font-bold tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
        >
          <span>预约合作</span>
          <ArrowUpRight size={14} />
        </motion.button>

        <button className="md:hidden text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-8 flex flex-col space-y-6 shadow-xl"
          >
            {['作品集', '设计流程', 'AI实验室', '关于天筑'].map((item) => (
              <a key={item} href={`#${item}`} className="text-stone-800 text-xl font-bold tracking-widest" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="bg-stone-900 text-white py-4 font-bold tracking-widest">预约合作</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center arch-grid overflow-hidden bg-[#f9f8f6]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pt-20">
        <div className="lg:col-span-7">
          <FadeInView direction="right">
            <h2 className="text-xs font-black tracking-[0.5em] text-stone-400 uppercase mb-6 flex items-center space-x-3">
              <span className="w-12 h-[1px] bg-stone-300 inline-block"></span>
              <span>EST. 2005 · ARCHITECTURE</span>
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold text-stone-900 leading-[1.1] mb-8">
              构筑<span className="sketch-font text-stone-500">灵感</span><br />
              印刻<span className="font-serif italic border-b-2 border-stone-300">永恒</span>
            </h1>
            <p className="text-stone-500 text-xl mb-12 max-w-xl leading-relaxed font-light">
              从最初的一笔手绘勾勒，到精确至毫米的CAD制图。我们不仅在建造空间，更是在为理想生活设计容器。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button 
                whileHover={{ x: 10 }}
                className="bg-stone-900 text-white px-10 py-5 flex items-center justify-between group min-w-[220px]"
              >
                <span className="font-bold tracking-widest">查看项目作品</span>
                <ArrowRight className="ml-4" size={20} />
              </motion.button>
              <button className="flex items-center space-x-4 px-6 text-stone-800 font-bold tracking-widest group">
                <span className="p-3 rounded-full border border-stone-200 group-hover:bg-stone-100 transition-colors">
                  <Maximize2 size={18} />
                </span>
                <span>观看设计短片</span>
              </button>
            </div>
          </FadeInView>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <FadeInView delay={0.3} direction="left">
            <div className="relative z-10">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800" 
                  alt="Architectural Draft" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 bg-white p-6 shadow-2xl border border-stone-100 max-w-[200px]"
              >
                <PenTool size={24} className="text-stone-400 mb-4" />
                <h4 className="text-xs font-bold tracking-widest uppercase mb-2">手绘原型</h4>
                <p className="text-[10px] text-stone-500 leading-tight">保留线条最初的张力与呼吸感，这是设计的灵魂起点。</p>
              </motion.div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-stone-200 -z-10 translate-x-4 translate-y-4"></div>
          </FadeInView>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-40"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold">向下滚动</span>
        <div className="w-[1px] h-12 bg-stone-900"></div>
      </motion.div>
    </section>
  );
};

const ProcessEvolution = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "1. 艺术构思",
      label: "Concept",
      desc: "打破常规，在纸面释放想象。每一根手绘线条都承载着建筑师的初步直觉。",
      image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
      icon: <PenTool size={24} />
    },
    {
      title: "2. 技术精控",
      label: "CAD Draft",
      desc: "理性的尺度介入。将艺术美感转化为严谨的工程语言，确定每一处梁柱的坐标。",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
      icon: <Layers size={24} />
    },
    {
      title: "3. 落地实施",
      label: "Execution",
      desc: "材料、光影与现实的碰撞。我们驻扎现场，确保图纸上的每一个像素都能完美落地。",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      icon: <Maximize2 size={24} />
    }
  ];

  return (
    <section id="设计流程" className="py-32 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInView>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold tracking-[0.4em] text-stone-500 uppercase mb-4">EVOLUTION PROCESS</h2>
              <h3 className="text-4xl md:text-5xl font-bold">从线条到空间的进化</h3>
            </div>
            <div className="flex space-x-4">
              {steps.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-12 h-1 bg-stone-700 transition-all ${activeStep === idx ? 'bg-white w-20' : ''}`}
                />
              ))}
            </div>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center rounded-sm">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest text-stone-400 mb-2">{steps[activeStep].label}</h4>
                  <h3 className="text-3xl font-bold mb-6">{steps[activeStep].title}</h3>
                  <p className="text-stone-400 text-lg leading-relaxed">{steps[activeStep].desc}</p>
                </div>
                <button className="group flex items-center space-x-3 text-white font-bold tracking-widest hover:text-stone-300 transition-colors">
                  <span>了解更多技术细节</span>
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="aspect-video overflow-hidden rounded-sm relative group"
              >
                <img 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-transparent transition-colors duration-700"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    { id: '1', title: '静安云端美术馆', category: '文化建筑', description: '以流动的曲线消融边界，营造无界艺术空间。', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', type: 'sketch' },
    { id: '2', title: '余杭极简住宅', category: '住宅设计', description: '极致的留白与比例控制，重构生活秩序。', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600', type: 'cad' },
    { id: '3', title: '杭州数字绿谷', category: '商业综合体', description: '生态优先的垂直办公社区。', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', type: 'final' },
    { id: '4', title: '旧城更新：1958创意园', category: '城市更新', description: '在历史的肌理上植入现代功能。', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600', type: 'sketch' },
    { id: '5', title: '光影礼拜堂', category: '公共建筑', description: '光的建筑学实践。', image: 'https://images.unsplash.com/photo-1507652313519-d4511f7ca4ad?auto=format&fit=crop&q=80&w=600', type: 'cad' },
    { id: '6', title: '莫干山悦榕庄', category: '精品酒店', description: '隐于山林的自然主义表达。', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600', type: 'final' },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.type === activeFilter);

  return (
    <section id="作品集" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeInView direction="right">
            <h2 className="text-xs font-black tracking-[0.5em] text-stone-300 uppercase mb-4">SELECTED WORKS</h2>
            <h3 className="text-4xl md:text-5xl font-bold">精选项目巡礼</h3>
          </FadeInView>
          
          <div className="flex space-x-2 bg-stone-100 p-1.5 rounded-none">
            {[
              { id: 'all', label: '全部作品' },
              { id: 'sketch', label: '手绘阶段' },
              { id: 'cad', label: '施工深化' },
              { id: 'final', label: '建成实景' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 text-xs font-black tracking-[0.2em] transition-all uppercase ${activeFilter === filter.id ? 'bg-white shadow-lg text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase mb-2 block">{project.category}</span>
                    <h4 className="text-2xl font-bold text-white mb-4 leading-tight">{project.title}</h4>
                    <button className="inline-flex items-center space-x-2 text-white text-xs font-black tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all">
                      <span>查看详情</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AIStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    const img = await generateArchitecturalSketch(prompt);
    setResult(img);
    setIsGenerating(false);
  };

  return (
    <section id="AI实验室" className="py-32 bg-[#121212] text-white relative arch-grid" style={{ backgroundSize: '60px 60px' }}>
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 mb-8 backdrop-blur-md">
              <Zap size={18} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">GenAI Architectural Core</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">AI 辅助灵感生成</h2>
            <p className="text-stone-400 text-xl font-light mb-12 leading-relaxed">
              天筑自研 AI 建筑大脑，支持输入一段构想描述，系统将自动生成专业的手绘初稿或 CAD 空间逻辑模型。
            </p>
            
            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：苏州园林风格的现代科技办公总部" 
                  className="w-full bg-stone-800/50 border border-stone-700 py-6 px-8 text-white placeholder-stone-600 focus:outline-none focus:border-white transition-all text-lg"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="absolute right-3 top-3 bottom-3 bg-white text-stone-900 px-8 font-black tracking-widest text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-200 transition-all"
                >
                  {isGenerating ? '正在构思...' : '立即生成'}
                </button>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-[16/10] bg-stone-900/50 border border-stone-800 relative overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full p-4"
                  >
                    <img src={result} alt="AI Blueprint" className="w-full h-full object-contain" />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    className="text-center p-12 opacity-20 group-hover:opacity-40 transition-opacity"
                  >
                    {isGenerating ? (
                      <div className="space-y-6">
                        <div className="w-16 h-16 border-2 border-stone-600 border-t-white rounded-full animate-spin mx-auto"></div>
                        <p className="text-xs font-black tracking-[0.4em] uppercase">正在构建几何秩序...</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={80} className="mx-auto mb-6" />
                        <p className="text-sm font-black tracking-[0.2em] uppercase">等待灵感注入实验室</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-50 py-32 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-12 h-12 bg-stone-900 flex items-center justify-center">
                <span className="text-white font-black text-2xl">T</span>
              </div>
              <span className="font-black tracking-[0.3em] text-xl">TIANZHU</span>
            </div>
            <h4 className="text-3xl font-bold text-stone-900 mb-8 leading-snug">
              为您打造具有时代精神与<br />人文关怀的建筑地标
            </h4>
          </div>
          
          <div className="md:col-span-2">
            <h5 className="font-black text-xs tracking-[0.3em] uppercase text-stone-300 mb-10">探索页面</h5>
            <ul className="space-y-5 text-sm font-bold">
              <li><a href="#作品集" className="text-stone-500 hover:text-stone-900 transition-colors">作品全集</a></li>
              <li><a href="#设计流程" className="text-stone-500 hover:text-stone-900 transition-colors">设计流程</a></li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h5 className="font-black text-xs tracking-[0.3em] uppercase text-stone-300 mb-10">天筑总部</h5>
            <p className="text-stone-500 text-sm font-bold leading-relaxed mb-6">
              上海市静安区苏州河路1908号 天筑设计大厦 8-12F
            </p>
            <p className="text-stone-900 text-xl font-bold">+86 (21) 5288 9900</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-stone-200">
          <p className="text-[10px] font-bold text-stone-400 tracking-[0.1em]">© 2024 TIANZHU ENGINEERING DESIGN INSTITUTE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-stone-900 selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-stone-900 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] p-4 hidden lg:block">
        <MousePointer2 size={12} className="text-stone-400 rotate-12" />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <div className="w-full h-20 bg-gradient-to-b from-[#f9f8f6] to-white"></div>
        <ProcessEvolution />
        <ProjectsGallery />
        <AIStudio />
        
        <section className="py-40 bg-white overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-stone-50/50 whitespace-nowrap pointer-events-none -z-10 uppercase italic">
            TIANZHU DESIGN
          </div>
          
          <div className="max-w-5xl mx-auto px-6 text-center">
            <FadeInView>
              <h2 className="text-5xl md:text-7xl font-bold text-stone-900 mb-12">共赴下一场<br />空间进化</h2>
              <p className="text-stone-500 text-xl font-light mb-16 max-w-2xl mx-auto">
                无论是摩天大楼的宏伟构想，还是私人官邸的精致笔触，天筑设计始终以专业的工程素养为您的每一个灵感保驾护航。
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-stone-900 text-white px-16 py-7 text-xs font-black tracking-[0.4em] uppercase shadow-2xl shadow-stone-300 hover:bg-stone-800 transition-all"
              >
                立即发起设计咨询
              </motion.button>
            </FadeInView>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
