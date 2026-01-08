
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
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
  Plus
} from 'lucide-react';
import { generateArchitecturalSketch } from './services/geminiService';
import { Project } from './types';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-stone-900 flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className={`font-bold tracking-widest text-lg ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>天筑设计</span>
        </motion.div>

        <div className="hidden md:flex space-x-10">
          {['作品集', '设计流程', 'AI灵感', '关于我们'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="text-stone-600 hover:text-stone-900 text-sm font-medium tracking-wide transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          预约咨询
        </motion.button>

        <button className="md:hidden text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {['作品集', '设计流程', 'AI灵感', '关于我们'].map((item) => (
                <a key={item} href={`#${item}`} className="text-stone-800 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="bg-stone-900 text-white px-6 py-3 rounded-md">预约咨询</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-stone-100">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M0 100 L100 0" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm font-bold tracking-[0.4em] text-stone-400 uppercase mb-4">ENGINEERING DESIGN INSTITUTE</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 leading-tight mb-8">
            从灵感微光<br />
            到<span className="font-serif italic text-stone-500 underline decoration-stone-300 underline-offset-8">建筑宏图</span>
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-lg leading-relaxed">
            我们致力于将最原始的艺术构思，转化为严谨的工程实践。通过手绘的温度与CAD的精准，定义现代空间。
          </p>
          <div className="flex space-x-4">
            <button className="bg-stone-900 text-white px-8 py-4 rounded-full flex items-center space-x-2 group hover:bg-stone-800 transition-all">
              <span>探索作品</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="border border-stone-300 text-stone-900 px-8 py-4 rounded-full hover:bg-white transition-all">
              了解流程
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://picsum.photos/seed/arch1/800/1000" 
              alt="Architecture Hero" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-lg shadow-xl max-w-xs hidden md:block">
            <div className="flex items-center space-x-3 mb-2">
              <PenTool size={20} className="text-stone-400" />
              <span className="text-xs font-bold tracking-widest text-stone-400">CONCEPT STAGE</span>
            </div>
            <p className="text-stone-800 font-medium">手工草绘赋予建筑灵魂，第一笔决定未来。</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      icon: <Compass size={32} />,
      title: "概念发散",
      desc: "与客户深度沟通，探索地块潜力，捕捉初步设计灵感。"
    },
    {
      icon: <PenTool size={32} />,
      title: "手绘草案",
      desc: "建筑师以细腻的手笔，在纸面勾勒出空间感与光影关系。"
    },
    {
      icon: <Layers size={32} />,
      title: "CAD精化",
      desc: "利用专业工具将艺术转化为毫米级的工程图纸，确保落地。"
    },
    {
      icon: <Maximize2 size={32} />,
      title: "三维模拟",
      desc: "全方位BIM建模，预演建筑在真实环境中的表现。"
    }
  ];

  return (
    <section id="设计流程" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">我们的专业路径</h2>
          <div className="w-20 h-1 bg-stone-900 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group p-8 border border-stone-100 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-stone-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    { id: '1', title: '云端美术馆', category: '文化建筑', description: '流畅的曲线模拟云朵的形态。', image: 'https://picsum.photos/seed/p1/600/600', type: 'sketch' },
    { id: '2', title: '静谧住宅', category: '住宅设计', description: '极简主义与自然光的完美契合。', image: 'https://picsum.photos/seed/p2/600/600', type: 'cad' },
    { id: '3', title: '科技绿洲', category: '办公空间', description: '整合垂直绿化的生态办公。', image: 'https://picsum.photos/seed/p3/600/600', type: 'final' },
    { id: '4', title: '历史重构', category: '城市更新', description: '旧工业遗址的现代转译。', image: 'https://picsum.photos/seed/p4/600/600', type: 'sketch' },
    { id: '5', title: '光影教堂', category: '公共建筑', description: '神圣空间的几何秩序。', image: 'https://picsum.photos/seed/p5/600/600', type: 'cad' },
    { id: '6', title: '山间书院', category: '教育设施', description: '顺应地形的山势建筑。', image: 'https://picsum.photos/seed/p6/600/600', type: 'final' },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.type === activeFilter);

  return (
    <section id="作品集" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">精选作品</h2>
            <p className="text-stone-500 max-w-md">我们每一份图纸都是对理想空间的严谨承诺。</p>
          </div>
          <div className="flex space-x-4 bg-stone-200/50 p-1 rounded-full">
            {[
              { id: 'all', label: '全部' },
              { id: 'sketch', label: '手绘草图' },
              { id: 'cad', label: 'CAD制图' },
              { id: 'final', label: '实景方案' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter.id ? 'bg-white shadow-md text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                  <span className="text-xs font-bold tracking-widest uppercase mb-2 opacity-70">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-stone-300 mb-6">{project.description}</p>
                  <button className="flex items-center space-x-2 text-white font-medium hover:underline">
                    <span>详情</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
    <section id="AI灵感" className="py-24 bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800 opacity-20 -skew-x-12 translate-x-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-stone-800 px-4 py-1 rounded-full mb-6">
              <Zap size={16} className="text-amber-400" />
              <span className="text-xs font-bold tracking-widest">AI INSPIRATION LAB</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">灵感生成实验室</h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              输入您的设计构想，天筑AI将即刻为您生成初步的建筑草画或制图概念，协助您在项目初期快速具象化创意。
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：位于悬崖边的极简主义混凝土别墅" 
                  className="w-full bg-stone-800 border-none rounded-xl px-6 py-5 text-white placeholder-stone-500 focus:ring-2 focus:ring-stone-500 outline-none"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="absolute right-2 top-2 bottom-2 bg-white text-stone-900 px-6 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100 transition-colors"
                >
                  {isGenerating ? '生成中...' : '即刻生成'}
                </button>
              </div>
              <p className="text-xs text-stone-500 ml-2">提示：描述越详细，生成的建筑概念越精准。</p>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="w-full aspect-[16/9] bg-stone-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-stone-700">
              {result ? (
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={result} 
                  alt="AI Generation" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="w-12 h-12 border-4 border-stone-600 border-t-white rounded-full animate-spin mx-auto"></div>
                      <p className="text-stone-400">正在构建您的设计蓝图...</p>
                    </div>
                  ) : (
                    <div className="space-y-4 opacity-30">
                      <ImageIcon size={64} className="mx-auto" />
                      <p>等待灵感注入</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-stone-900 flex items-center justify-center rounded-sm">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold tracking-widest">天筑设计</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">
              天筑工程设计院成立于2005年，专注于高端商业、文化及住宅建筑设计。我们坚持原创，致敬工匠精神。
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">快速链接</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><a href="#" className="hover:text-stone-900 transition-colors">最新动态</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">核心团队</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">奖项荣誉</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">人才招聘</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">设计服务</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><a href="#" className="hover:text-stone-900 transition-colors">方案深化</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">施工图外包</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">BIM咨询</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">景观设计</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">联系我们</h4>
            <p className="text-sm text-stone-500 mb-4">上海市静安区灵感路888号建筑大厦12F</p>
            <p className="text-sm text-stone-500 mb-4">+86 021 8888 6666</p>
            <p className="text-sm text-stone-500">contact@tianzhudesign.com</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-stone-100 text-stone-400 text-xs">
          <p>© 2024 天筑工程设计院. 版权所有. 沪ICP备12345678号</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-900">隐私政策</a>
            <a href="#" className="hover:text-stone-900">服务条款</a>
            <a href="#" className="hover:text-stone-900">Cookie设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-stone-900 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <ProcessSection />
        <ProjectsGallery />
        <AIStudio />
        
        {/* Contact CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-stone-50 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <Plus size={40} className="text-stone-200" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">准备好开启您的建筑旅程了吗？</h2>
              <p className="text-stone-500 text-lg mb-10 max-w-2xl mx-auto">
                无论是摩天大楼的宏伟蓝图，还是温馨私宅的精致笔触，我们都将以专业的态度为您保驾护航。
              </p>
              <button className="bg-stone-900 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-xl transition-all">
                立即联系我们
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
