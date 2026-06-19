import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate, useScroll, useSpring } from 'framer-motion';
import { FaWhatsapp, FaGooglePlay, FaApple } from 'react-icons/fa';
import { 
  Building2, Calculator, Users, FileText, Map, Landmark,
  CheckCircle2, ChevronRight, ChevronDown, ChevronUp,
  MapPin, Clock, ShieldCheck, ArrowRight, Menu, X, Star
} from 'lucide-react';
import logo1 from './assets/logo.png';
import logo2 from './assets/logo02.png';
import heroImage from './assets/hero.png';
import hero02Image from './assets/hero02.png';
import heroMetodoImage from './assets/hero-metodo.jpeg';
import heroEspecialistasImage from './assets/hero-especialistas.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`mb-4 rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-blue-50 border-blue-300 shadow-xl shadow-blue-900/10' : 'bg-blue-50/50 border-blue-100 hover:border-blue-300 hover:bg-blue-50'}`}>
      <button onClick={onClick} className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none">
        <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>{question}</span>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-200 text-blue-700' : 'bg-white text-blue-500 shadow-sm'}`}>
          <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 leading-relaxed font-light text-lg">
            <div className="pt-2 border-t border-slate-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedCounter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const faqs = [
    { q: "Vocês atendem apenas construtoras e loteadoras?", a: "Não. Embora sejamos altamente especializados no setor imobiliário e de construção civil, nossa equipe possui expertise para atender empresas prestadoras de serviços, comércios e indústrias de diversos portes." },
    { q: "O que é o Geric da Caixa e como vocês ajudam?", a: "O Geric é a análise de Risco de Crédito da Caixa Econômica Federal, essencial para construtoras conseguirem financiamento. Nós adequamos seus balanços e preparamos toda a documentação exigida para que sua empresa alcance a nota necessária para aprovação." },
    { q: "Minha empresa está em outra cidade, posso ser cliente CONTEC?", a: "Sim. Atendemos de forma 100% digital e segura, garantindo a mesma proximidade e eficiência do atendimento presencial através de reuniões online e plataformas seguras de troca de documentos." },
    { q: "Como funciona a troca de contador para a CONTEC?", a: "O processo é 100% transparente e sem burocracia para você. Nossa equipe cuida de toda a transição, comunicando o contador anterior e transferindo os dados de forma segura, garantindo que sua empresa não sofra nenhuma interrupção." },
    { q: "Vocês realizam planejamento tributário preventivo?", a: "Absolutamente. Não somos apenas 'geradores de guias'. Analisamos continuamente o faturamento e as margens da sua empresa para garantir que você esteja sempre enquadrado no regime tributário mais econômico e seguro permitido por lei." }
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesData = [
    { 
      title: 'Escrituração Fiscal e Contábil', 
      icon: <Calculator size={28} />, 
      desc: 'Gestão tributária e contábil estratégica, garantindo compliance e redução de custos.',
      bullets: ['Planejamento Tributário personalizado', 'Análise de balanços para tomada de decisão', 'Emissão e controle de certidões negativas', 'Recuperação de créditos tributários']
    },
    { 
      title: 'Loteamentos e Desmembramentos', 
      icon: <Map size={28} />, 
      desc: 'Especialistas em documentação imobiliária e processos de parcelamento de solo.',
      bullets: ['Análise de viabilidade técnica e legal', 'Aprovação de projetos (GRAPROHAB, etc)', 'Elaboração de minutas e convenções', 'Registro de incorporação imobiliária']
    },
    { 
      title: 'Geric junto à CEF', 
      icon: <Landmark size={28} />, 
      desc: 'Elaboração e acompanhamento de processos para aprovação de crédito (Geric) na Caixa Econômica Federal.',
      bullets: ['Pré-análise focada nos índices da Caixa', 'Montagem do dossiê de financiamento', 'Acompanhamento até a liberação do crédito']
    },
    { 
      title: 'Construção Civil e Incorporação', 
      icon: <Building2 size={28} />, 
      desc: 'Assessoria completa e contabilidade especializada para o setor de obras e incorporações.',
      bullets: ['Contabilidade para SPEs e SCPs', 'Patrimônio de Afetação', 'Controle de custos de obra', 'Regularização do INSS da obra']
    },
    { 
      title: 'Departamento Pessoal', 
      icon: <Users size={28} />, 
      desc: 'Administração completa de folha de pagamento e rotinas trabalhistas.',
      bullets: ['Gestão de e-Social', 'Cálculo de rescisões e férias', 'Apuração de encargos trabalhistas', 'Assessoria em acordos sindicais']
    },
    { 
      title: 'Legalização de Empresas', 
      icon: <ShieldCheck size={28} />, 
      desc: 'Abertura, alterações, encerramentos e regularizações em geral.',
      bullets: ['Constituição de empresas', 'Alterações contratuais', 'Baixa e encerramento', 'Alvarás e licenças de funcionamento']
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 origin-left z-[100] shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* HEADER NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity cursor-pointer">
            <img src={logo1} alt="CONTEC Logo" className="h-8 md:h-10 w-auto object-contain" />
            <img src={logo2} alt="CONTEC Logo 2" className="h-6 md:h-8 w-auto object-contain mt-1 md:mt-2" />
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">Serviços</a>
            <a href="#metodo" className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">Método</a>
            <a href="#sobre" className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">Quem Somos</a>
            <a href="#faq" className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">FAQ</a>
            <a href="#app" className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">App</a>
            <a href="#" target="_blank" rel="noreferrer" className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 font-bold transition-all shadow-sm text-sm">
              Área do Cliente
            </a>
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="text-sm font-bold bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              Falar com Especialista
            </a>
          </div>

          <button className="md:hidden text-slate-800" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Serviços</a>
            <a href="#metodo" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Método</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Quem Somos</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">FAQ</a>
            <a href="#app" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">App</a>
            <a href="#" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-blue-600 border-b border-slate-100 pb-4">Área do Cliente</a>
            <div className="flex flex-col gap-4 mt-8">
              <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="mt-4 bg-blue-600 text-white text-center py-4 rounded-full font-bold text-lg">
                Falar com Especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-24 bg-slate-50 overflow-hidden flex flex-col justify-center">
        {/* Imagem de Fundo (nova imagem de loteamento/construção) */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center md:bg-fixed opacity-80 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${hero02Image})` }}
          />
          {/* Gradiente complexo para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent w-full md:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 md:via-transparent to-slate-50/30" />
        </div>
        
        {/* Overlay decorativo de tecnologia/finanças */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 mt-6 md:mt-0">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Excelência e Tradição Contábil
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4 md:mb-6">
              Estruture o futuro do seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">segurança.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base sm:text-xl text-slate-700 mb-8 md:mb-10 max-w-3xl leading-relaxed font-light">
              Soluções Contábeis, Fiscais, RH e, Documentação imobiliária para Construção Civil, Loteamento e desmembramento, Incorporação imobiliária, consultoria e acompanhamento no processo de GERIC.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-0 justify-center md:justify-start w-full sm:w-auto"
            >
              <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="group relative bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                <span className="relative z-10 flex items-center gap-2">Agendar Consultoria <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </a>
              <a href="#servicos" className="px-8 py-4 rounded-full font-bold text-slate-700 bg-white/90 border border-slate-200 hover:bg-white transition-colors flex items-center justify-center">
                Explorar Serviços
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* INTEGRATED STATS */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 mt-8 md:mt-12">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
          >
            {[
              { number: 37, suffix: '', label: 'Anos de Experiência' },
              { number: 500, suffix: '+', label: 'Clientes Satisfeitos' },
              { number: 100, suffix: '%', label: 'Conformidade Fiscal' },
              { number: null, text: '24/7', label: 'Suporte Estratégico' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.5 + (idx * 0.1) } }
                }}
                className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-lg shadow-blue-900/5 border border-white flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-cyan-500 mb-1 md:mb-2 drop-shadow-sm leading-none">
                  {stat.number !== null ? <AnimatedCounter value={stat.number} suffix={stat.suffix} /> : stat.text}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-wider leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVIÇOS DETALHADOS SECTION */}
      <section id="servicos" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-slate-50/50 relative">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:items-end lg:text-left mb-12 md:mb-16 gap-8">
            <div className="max-w-3xl flex flex-col items-center lg:items-start">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-3">
                <span className="w-10 h-1 bg-blue-600 rounded-full hidden lg:block"></span> O Que Entregamos
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">Expertise que impulsiona <br className="hidden md:block" /><span className="text-blue-600">resultados</span></h3>
            </div>
            <p className="text-lg text-slate-600 font-light leading-relaxed max-w-md text-center lg:text-left">Vamos muito além do básico. Entregamos soluções sob medida para blindar o seu patrimônio e garantir a máxima eficiência tributária.</p>
            <div className="flex-shrink-0 pb-2 hidden md:block">
               <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white border border-slate-200 text-slate-800 px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-200/50">
                  Agendar Diagnóstico <ArrowRight size={18} className="text-blue-600" />
                </a>
            </div>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp} 
                className="relative z-10 bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500 p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full cursor-pointer overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                {/* Efeito de Gradiente (Revelado no Hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 border border-white/20">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">{service.title}</h4>
                <p className="text-blue-100 leading-relaxed font-light mb-8 flex-grow">{service.desc}</p>
                <div className="mt-auto pt-6 flex items-center text-white font-bold group-hover:text-white border-t border-white/10">
                  <span className="relative overflow-hidden flex items-center">
                    Ver Detalhes 
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SERVICE MODAL */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-100"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="p-8 md:p-12">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedService.title}</h3>
                  <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">{selectedService.desc}</p>
                  
                  {selectedService.bullets && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">O que está incluso:</h4>
                      <ul className="space-y-4">
                        {selectedService.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                            <CheckCircle2 className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-colors hover:bg-blue-700">
                      <FaWhatsapp size={20} /> Contratar Serviço
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. NOSSO MÉTODO SECTION (TIMELINE) */}
      <section id="metodo" className="py-20 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center md:bg-fixed opacity-20"
            style={{ backgroundImage: `url(${heroMetodoImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/95" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-4 text-sm">Nosso Método</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Como transformamos a contabilidade da sua empresa</h3>
            <p className="text-lg text-slate-400 font-light">Empresas não contratam contabilidade premium por impulso; contratam processo e segurança. Conheça as etapas do nosso trabalho.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Diagnóstico Estratégico', desc: 'Analisamos o cenário atual da sua empresa, identificando passivos ocultos e oportunidades tributárias.' },
              { step: '02', title: 'Saneamento e Compliance', desc: 'Organizamos e regularizamos toda a documentação pendente, blindando seu patrimônio contra autuações.' },
              { step: '03', title: 'Planejamento e Implantação', desc: 'Definimos o melhor regime tributário e estruturamos as rotinas de envio de dados.' },
              { step: '04', title: 'Alta Performance', desc: 'Reuniões periódicas de consultoria para apresentar resultados e projetar o crescimento do negócio.' }
            ].map((item, idx) => (
              <div key={idx} className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-blue-500/30 transition-colors">{item.step}</div>
                <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOBRE SECTION EXPANDIDA */}
      <section id="sobre" className="py-20 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=70" alt="Equipe Contec" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white border border-slate-100 shadow-xl text-slate-800 p-8 rounded-full hidden md:block">
                  <div className="text-blue-500 mb-2"><Star size={32} fill="currentColor" /></div>
                  <p className="text-2xl font-bold text-slate-900">Alto Padrão</p>
                  <p className="text-slate-500 text-sm">Em cada detalhe</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">Quem Somos</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Uma parceria construída na confiança e precisão.</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed font-light">
                A CONTEC nasceu com o propósito de descomplicar a contabilidade e a burocracia documental para empresas que desejam focar exclusivamente em seu crescimento.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                Nossa equipe é formada por especialistas obcecados por detalhes, garantindo que cada número e documento esteja em perfeita conformidade, blindando o seu patrimônio.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-600 mb-3 text-lg">Nossa Missão</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Entregar segurança jurídica e financeira através de uma contabilidade consultiva, permitindo que construtoras e empresários foquem no que fazem de melhor.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-600 mb-3 text-lg">Nossa Visão</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Ser a principal referência contábil e documental do interior de São Paulo em regularização imobiliária e construção civil.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sm:col-span-2 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-600 mb-3 text-lg">Nossos Valores</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Transparência absoluta, rigor técnico irretocável, agilidade na resolução de problemas complexos e construção de parcerias sólidas a longo prazo.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Esquerda: Textos Fixos */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 flex flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">Tire suas dúvidas</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Perguntas Frequentes</h3>
                <p className="text-lg text-slate-600 font-light mb-8">Respostas diretas e transparentes para as dúvidas mais comuns sobre os nossos serviços. Sua dúvida não está aqui?</p>
                <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-slate-50 text-slate-800 border border-slate-200 px-6 py-4 rounded-full font-bold transition-all hover:bg-slate-100 hover:border-slate-300">
                  <FaWhatsapp className="text-blue-600" size={20} /> Fale com um Consultor
                </a>
              </div>
            </div>

            {/* Direita: Acordeão */}
            <div className="lg:w-2/3">
              {faqs.map((faq, idx) => (
                <FAQItem 
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={activeFaq === idx}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. DEPOIMENTOS */}
      <section className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">O que dizem sobre nós</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Confiança Comprovada</h3>
            <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">Nossa maior conquista é a tranquilidade e o crescimento sólido dos nossos clientes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Depoimento 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-blue-500/10 absolute top-8 right-8 text-8xl font-serif leading-none">"</div>
              <div className="flex gap-1 text-amber-400 mb-6 relative z-10">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 mb-8 font-medium leading-relaxed flex-grow relative z-10">"A CONTEC não é apenas uma contabilidade, é uma parceira estratégica. A consultoria deles no processo do Geric da Caixa foi fundamental para a aprovação do nosso financiamento de obra em tempo recorde."</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10 mt-auto">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <Building2 size={24}/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 tracking-wide">Construtora Ávila</h4>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">Engenharia e Incorporações</p>
                </div>
              </div>
            </motion.div>

            {/* Depoimento 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-blue-500/10 absolute top-8 right-8 text-8xl font-serif leading-none">"</div>
              <div className="flex gap-1 text-amber-400 mb-6 relative z-10">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 mb-8 font-medium leading-relaxed flex-grow relative z-10">"Estávamos pagando impostos a mais por enquadramento errado. A auditoria tributária da equipe reestruturou toda a nossa carga fiscal, gerando uma economia imediata impressionante. Serviço premium."</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10 mt-auto">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <Users size={24}/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 tracking-wide">Grupo Silva</h4>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">Desenvolvimento Urbano</p>
                </div>
              </div>
            </motion.div>

            {/* Depoimento 3 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="text-blue-500/10 absolute top-8 right-8 text-8xl font-serif leading-none">"</div>
              <div className="flex gap-1 text-amber-400 mb-6 relative z-10">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-slate-700 mb-8 font-medium leading-relaxed flex-grow relative z-10">"Transferir minha contabilidade para a CONTEC foi a melhor decisão do ano. Processo transparente, atendimento 100% digital via WhatsApp muito rápido, e sempre têm a resposta certa na ponta da língua."</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 relative z-10 mt-auto">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <Map size={24}/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 tracking-wide">Rodrigues Imobiliária</h4>
                  <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">Vendas e Locação</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. NOSSO APP SECTION */}
      <section id="app" className="py-24 bg-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Imagem do Aplicativo */}
              <div className="relative w-[280px] md:w-[320px] mx-auto rounded-[2rem] shadow-2xl overflow-hidden border-[8px] border-slate-900 bg-slate-900">
                <img src="/app.png" alt="Aplicativo CONTEC" className="w-full h-auto object-cover rounded-2xl" />
                
                {/* Logo sobreposta */}
                <div className="absolute top-6 md:top-8 mt-[2px] left-1/2 -translate-x-1/2 pointer-events-none">
                  <img src={logo1} alt="Logo CONTEC" className="w-20 h-auto opacity-90" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-6">
              O Seu Escritório Digital
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              A contabilidade da sua empresa na <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">palma da mão.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Com o aplicativo oficial da CONTEC, você acompanha suas finanças, acessa guias de impostos, envia documentos e fala com seu contador em tempo real. Tudo isso direto do seu celular, de forma rápida, segura e sem burocracia.
            </p>

            <ul className="space-y-4 mb-10 text-left w-full max-w-md lg:max-w-none">
              {['Envio e recebimento de documentos fiscais', 'Acesso rápido a guias e relatórios', 'Atendimento direto com seu contador', 'Notificações importantes de vencimentos'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={14} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-black hover:bg-slate-900 hover:scale-105 border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-fit">
                <FaGooglePlay size={24} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-slate-300 mb-0.5">DISPONÍVEL NO</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-black hover:bg-slate-900 hover:scale-105 border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-fit">
                <FaApple size={28} className="text-white" />
                <div className="text-left">
                  <div className="text-[9px] leading-none text-slate-300 mb-0.5">Baixar na</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative py-20 md:py-24 bg-slate-900 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center md:bg-fixed opacity-90 scale-105"
            style={{ backgroundImage: `url(${heroEspecialistasImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900/20 to-slate-900/40" />
        </div>
        <div className="relative z-20 -mt-4 md:-mt-6 max-w-5xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-200 text-sm font-bold uppercase tracking-widest mb-6">Fale com Especialistas</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Transforme a contabilidade em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Vantagem Competitiva</span>
          </h2>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-10 font-light">Pare de perder tempo com burocracias. Deixe a nossa equipe cuidar da conformidade e da saúde financeira do seu negócio enquanto você foca exclusivamente no que importa: <strong className="text-white font-bold">crescer</strong>.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-slate-50 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1">
              Falar com Consultor
            </a>
            <a href="#servicos" className="inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/10">
              Conhecer Serviços
            </a>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-[#020617] pt-24 pb-12 border-t-[6px] border-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo & Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl mb-8 flex justify-center items-center shadow-sm">
                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                  <img src={logo1} alt="CONTEC Logo" className="h-8 w-auto object-contain" />
                  <img src={logo2} alt="CONTEC Logo 2" className="h-6 w-auto object-contain mt-1" />
                </a>
              </div>
              <p className="text-sm leading-relaxed mb-8 text-slate-400 font-light">
                Consultoria estratégica e inteligência contábil para negócios que buscam crescimento sólido e regularidade impecável em todo o território nacional.
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="lg:ml-8">
              <h4 className="text-white font-bold mb-8 tracking-wide text-lg">Links Rápidos</h4>
              <ul className="space-y-4">
                <li><a href="#servicos" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight size={16}/> Nossos Serviços</a></li>
                <li><a href="#metodo" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight size={16}/> Nosso Método</a></li>
                <li><a href="#sobre" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight size={16}/> Quem Somos</a></li>
                <li><a href="#faq" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight size={16}/> Dúvidas Frequentes</a></li>
                <li><a href="#app" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight size={16}/> Nosso App</a></li>
                <li><a href="#" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 font-bold"><ChevronRight size={16}/> Área do Cliente</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold mb-8 tracking-wide text-lg">Fale Conosco</h4>
              <ul className="space-y-5 text-slate-400 text-sm">
                <li className="flex items-start gap-4">
                  <div className="bg-white/5 p-2 rounded-lg text-blue-500"><MapPin size={20} /></div>
                  <span className="mt-1 leading-relaxed">Ibitinga - SP<br/>Atendimento Digital para todo o Brasil</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-white/5 p-2 rounded-lg text-blue-500"><FaWhatsapp size={20} /></div>
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-base">(16) 99718-1970</a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-white/5 p-2 rounded-lg text-blue-500"><Clock size={20} /></div>
                  <span className="text-base">Seg - Sex: 08:00 - 18:00</span>
                </li>
              </ul>
            </div>

            {/* Redes Sociais & App */}
            <div>
              <h4 className="text-white font-bold mb-8 tracking-wide text-lg">Conexão & App</h4>
              <p className="text-sm text-slate-400 mb-6 font-light leading-relaxed">Em breve estaremos nas redes sociais. Por enquanto, fale conosco no WhatsApp ou baixe nosso app oficial.</p>
              <div className="flex flex-col gap-3 mt-2">
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="w-fit h-12 px-6 bg-blue-600 border border-blue-500 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-sm font-bold gap-3 text-white shadow-lg shadow-blue-600/20">
                    <FaWhatsapp size={20} /> Chamar no WhatsApp
                  </a>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-xl transition-all text-white shadow-lg w-fit">
                      <FaGooglePlay size={20} className="text-white" />
                      <div className="text-left">
                        <div className="text-[8px] leading-none text-slate-400 mb-0.5">DISPONÍVEL NO</div>
                        <div className="text-xs font-semibold leading-tight">Google Play</div>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-xl transition-all text-white shadow-lg w-fit">
                      <FaApple size={22} className="text-white" />
                      <div className="text-left">
                        <div className="text-[8px] leading-none text-slate-400 mb-0.5">Baixar na</div>
                        <div className="text-xs font-semibold leading-tight">App Store</div>
                      </div>
                    </a>
                  </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col items-center justify-center gap-5 text-center text-sm text-slate-500 font-light">
            <div>
              <p className="text-slate-400 font-bold tracking-widest uppercase mb-2">CONTEC SERVIÇOS E CONSULTORIA CONTÁBIL LTDA</p>
              <p className="text-xs">Todos os direitos reservados &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a>
              <span className="text-white/20">•</span>
              <a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a 
        href="https://wa.me/5516997181970" 
        target="_blank" rel="noreferrer"
        className={`fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-500 group flex items-center justify-center ${scrolled ? 'opacity-100 translate-y-0 hover:scale-110 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Falar pelo WhatsApp"
      >
        <span className={`absolute inset-0 rounded-full bg-[#25D366] opacity-75 ${scrolled ? 'animate-ping' : ''}`}></span>
        <FaWhatsapp size={32} className="relative z-10" />
      </a>

    </div>
  );
}
