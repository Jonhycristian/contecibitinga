import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { 
  Menu, X, TrendingUp, TrendingDown, Calculator, Users, Briefcase, 
  Search, ShieldCheck, ChevronDown, MapPin, Mail, Phone, ArrowRight, DollarSign, Activity, Clock
} from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaGooglePlay, FaApple } from 'react-icons/fa';
import logo from '../assets/logo.png';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';

const Counter = ({ from, to, prefix = "", suffix = "" }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => prefix + Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, delay: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
};

const faqs = [
  { q: "Como trocar de contador?", a: "O processo é simples, rápido e nós cuidamos de tudo. Entramos em contato com o seu contador atual, solicitamos a documentação necessária e fazemos a transição de forma segura, sem interromper as atividades da sua empresa." },
  { q: "Quanto custa abrir uma empresa?", a: "Os custos variam conforme a natureza jurídica, o porte da empresa e as taxas do estado. Na AtendCon, analisamos o seu perfil para garantir o melhor enquadramento tributário, minimizando os custos iniciais." },
  { q: "Vocês atendem empresas de outras cidades?", a: "Sim! Nosso atendimento é digital e otimizado. Atendemos clientes de diversas regiões com a mesma agilidade e proximidade de um escritório físico, através da nossa plataforma e WhatsApp." },
  { q: "Quais nichos vocês atendem?", a: "Nossa especialidade é ajudar prestadores de serviços, comércio varejista e profissionais liberais a organizarem suas finanças e pagarem menos impostos de forma legal." },
  { q: "Fazem regularização fiscal?", a: "Com certeza. Fazemos uma auditoria completa da situação da sua empresa, identificamos pendências e criamos um plano de ação para regularizar tudo perante a Receita Federal, Estadual e Municipal." },
  { q: "Trabalham com MEI?", a: "Sim, oferecemos assessoria para Microempreendedores Individuais (MEI), ajudando na abertura, declaração anual, emissão de guias e, futuramente, na transição para Microempresa (ME) quando o negócio crescer." }
];

const AtendconSPA = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [isFaqHovered, setIsFaqHovered] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  const [triageStep, setTriageStep] = useState(1);
  const [triageData, setTriageData] = useState({ segment: '', goal: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { margin: "100px" });
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);

  const openTriageModal = (e) => {
    if (e) e.preventDefault();
    setTriageStep(1);
    setTriageData({ segment: '', goal: '' });
    setIsTriageModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isTestimonialsPaused || !isTestimonialsInView) return;
    const interval = setInterval(() => {
      if (testimonialsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = testimonialsRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          testimonialsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialsRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isTestimonialsPaused, isTestimonialsInView]);

  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { margin: "-200px" });

  useEffect(() => {
    if (!isFaqInView) return;
    const interval = setInterval(() => {
      setActiveFaq((prev) => (prev !== null ? (prev + 1) % faqs.length : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [isFaqInView]);

  // Barra de progresso de scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=5531983858280"; // WhatsApp Oficial

  const services = [
    {
      title: "Gestão Contábil",
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      desc: "Classificação, escrituração contábil e análise de demonstrações (Balanço, DRE). Entrega de SPED e E-Lalur.",
      fullDetails: [
        "Classificação e escrituração contábil",
        "Elaboração e análise das demonstrações contábeis (Balancetes mensais, DRE, Balanço Patrimonial, Fluxo de Caixa)",
        "SPED Contábil, fiscal e contribuições",
        "Declarações acessórias (DIPJ, DCTF, FCONT, E-Lalur, entre outras)",
        "PER/DCOMP – Processos de Restituição e Compensação de Tributos Federais"
      ]
    },
    {
      title: "Gestão Fiscal",
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      desc: "Apuração de tributos (ICMS, IPI, PIS, Cofins, ISSQN) e transmissão de obrigações acessórias (DCTF, Dapi, VAF).",
      fullDetails: [
        "Apuração de tributos: ISSQN, ICMS, IPI, PIS, Cofins",
        "Declaração de Débitos e Créditos Tributários Federais (DCTF)",
        "Declaração de Apuração e Informações do ICMS (Dapi)",
        "Valor Adicionado Fiscal / Declaração Anual de Movimento Econômico e Fiscal (VAF/Damef)",
        "Declaração de Substituição Tributária e Declaração Eletrônica de Serviços (DES)"
      ]
    },
    {
      title: "Departamento Pessoal",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      desc: "Elaboração de folha de pagamento, cálculo de rescisões, controle de férias e envio de obrigações mensais/anuais.",
      fullDetails: [
        "Elaboração de folha de pagamento, 13º salário, pró-labore e guias (INSS, FGTS, IRRF)",
        "Registro informatizado de empregados",
        "Cálculo de rescisões e reajustes salariais (acordos ou dissídios coletivos)",
        "Mapa de Controle Anual de Férias",
        "Obrigações acessórias (Caged, Rais, Dirf) e informes de rendimentos"
      ]
    },
    {
      title: "Consultoria Tributária e Societária",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      desc: "Assessoria técnica, regimes especiais de tributação e treinamentos com atualizações da legislação.",
      fullDetails: [
        "Assessoria técnica específica nas áreas fiscal, trabalhista e previdenciária",
        "Elaboração e acompanhamento de Regimes Especiais de Tributação",
        "Treinamentos técnicos periódicos com atualizações da legislação",
        "Desenvolvimento de informativos e circulares para divulgação"
      ]
    },
    {
      title: "Auditoria Eletrônica (SPED)",
      icon: <Search className="w-8 h-8 text-blue-600" />,
      desc: "Validação profunda e certificação de arquivos fiscais/contábeis para reduzir riscos tributários.",
      fullDetails: [
        "Valida, audita e certifica arquivos fiscais a serem apresentados ao fisco",
        "Análises estruturais e complexos cruzamentos fiscais (100% dos dados)",
        "Redução de riscos tributários e aproveitamento de benefícios fiscais",
        "Apontamentos de erros, advertências e oportunidades"
      ]
    },
    {
      title: "Legalização e Pessoa Física",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      desc: "Constituição, alterações contratuais e regularização de registros. Inclui também declarações de IRPF.",
      fullDetails: [
        "Constituição de empresas e alterações contratuais",
        "Confecção de atos societários e regularização de registros necessários",
        "Pessoa Física (I.R.P.F.): Confecção e acompanhamento da Declaração de Imposto de Renda"
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden w-full">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      {/* 1. NAVBAR */}
      <header className={`fixed w-full top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-1 cursor-pointer">
            <img src={logo1} alt="Atendcon Icon" className="h-10 md:h-12 w-auto object-contain" />
            <img src={logo2} alt="Atendcon Text" className="h-8 md:h-10 w-auto object-contain translate-y-1" />
          </a>
          
          <nav className="hidden md:flex flex-1 justify-center gap-10 items-center font-medium text-sm text-slate-600">
            <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#metodo" className="hover:text-blue-600 transition-colors">Método</a>
            <a href="#sobre" className="hover:text-blue-600 transition-colors">Quem Somos</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            <a href="#app" className="hover:text-blue-600 transition-colors">App</a>
            <a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a>
          </nav>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 font-bold transition-all shadow-sm">
              Área do Cliente
            </a>
            <button onClick={openTriageModal} className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 font-semibold">
              Falar com Especialista
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl shadow-2xl rounded-b-3xl border-t border-slate-100 flex flex-col p-8 gap-5 font-medium z-50"
            >
              <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 transition flex items-center gap-3 border-b border-slate-100 pb-3">Serviços</a>
              <a href="#metodo" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 transition flex items-center gap-3 border-b border-slate-100 pb-3">Método</a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 transition flex items-center gap-3 border-b border-slate-100 pb-3">Quem Somos</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 transition flex items-center gap-3 border-b border-slate-100 pb-3">FAQ</a>
              <a href="#app" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-700 hover:text-blue-600 transition flex items-center gap-3 border-b border-slate-100 pb-3">Nosso App</a>
              <a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 hover:text-blue-700 transition flex items-center gap-3 font-bold mt-2">Área do Cliente</a>
              <button onClick={(e) => { setIsMobileMenuOpen(false); openTriageModal(e); }} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-transform text-white text-center py-4 rounded-full mt-2 font-bold shadow-lg shadow-blue-500/30 w-full">Falar com Especialista</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-20 pb-6 md:pt-28 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/fundo-00.png" alt="Office Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial="hidden" animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="w-full flex flex-col items-center md:items-start text-center md:text-left"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-xs md:text-sm mb-4 backdrop-blur-sm">
              Excelência e Tradição Contábil em BH
            </motion.div>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 max-w-4xl">
              Contabilidade estratégica para empresas que desejam crescer com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">segurança.</span>
            </motion.h1>

            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-sm md:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Soluções completas em gestão contábil, fiscal e empresarial. Foque no crescimento do seu negócio e deixe a burocracia com nossos especialistas.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto mb-10">
              <button onClick={openTriageModal} className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                <FaWhatsapp size={20} className="relative z-10" />
                <span className="relative z-10">Falar com Especialista</span>
              </button>
              <a href="#servicos" className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                Conhecer Soluções
              </a>
            </motion.div>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl"
            >
              {[
                { label: "Avaliação no Google", value: 5, prefix: "⭐ ", suffix: ".0" },
                { label: "Empresas Atendidas", value: 300, prefix: "+", suffix: "" },
                { label: "Processos Realizados", value: 5000, prefix: "+", suffix: "" },
                { label: "Taxa de Retenção", value: 98, prefix: "", suffix: "%" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white cursor-default text-center flex flex-col justify-center items-center hover:bg-white/10 transition">
                  <div className="text-xl md:text-3xl font-black text-blue-400 mb-1">
                    <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>


        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">O Que Entregamos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Soluções completas para lidar com qualquer grau de complexidade financeira, fiscal e trabalhista.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="bg-gradient-to-br from-blue-100 to-blue-50/80 border border-blue-200 p-8 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-blue-600/20 hover:border-blue-400 transition-all group text-center md:text-left flex flex-col items-center md:items-start relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-colors"></div>
                <div className="w-16 h-16 bg-white border border-blue-100 rounded-2xl shadow-sm shadow-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-950 relative z-10">{service.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed relative z-10 font-medium">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de Serviços */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-3xl max-w-lg w-full relative"
              >
                <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
                <div className="mb-6">{selectedService.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
                <p className="text-slate-600 mb-6">{selectedService.desc}</p>
                {selectedService.fullDetails && (
                  <ul className="mb-8 space-y-3 text-sm text-slate-700">
                    {selectedService.fullDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => { setSelectedService(null); openTriageModal(); }} className="block w-full bg-blue-600 text-white text-center py-3 rounded-full font-semibold hover:bg-blue-700">
                  Solicitar este serviço
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal de Triagem de Agendamento */}
        <AnimatePresence>
          {isTriageModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white p-6 md:p-8 rounded-3xl max-w-md w-full relative max-h-[90vh] overflow-y-auto custom-scrollbar"
              >
                <button onClick={() => setIsTriageModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-inner">
                  <FaWhatsapp size={24} />
                </div>
                
                {triageStep === 1 ? (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Qual o seu segmento?</h3>
                    <p className="text-slate-600 mb-6 text-sm">Para um atendimento mais rápido, selecione a sua área de atuação:</p>
                    
                    <div className="space-y-3">
                      {[
                        "Prestação de Serviços",
                        "Comércio / Varejo",
                        "Profissional Liberal",
                        "Profissionais Liberais",
                        "Outros"
                      ].map((option, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setTriageData({ ...triageData, segment: option });
                            setTriageStep(2);
                          }}
                          className="w-full text-left px-5 py-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium text-slate-700 transition-all flex justify-between items-center group"
                        >
                          {option}
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={() => setTriageStep(1)} className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2 flex items-center gap-1 hover:underline">
                      &larr; Voltar
                    </button>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">O que você busca hoje?</h3>
                    <p className="text-slate-600 mb-6 text-sm">Selecione o serviço para falarmos com o especialista certo:</p>
                    
                    <div className="space-y-3">
                      {[
                        "Trocar de Contador",
                        "Abertura de Empresa",
                        "Consultoria Especializada",
                        "Regularização Fiscal"
                      ].map((option, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            const texto = `Olá! Sou do segmento de *${triageData.segment}* e procuro ajuda com *${option}*.`;
                            window.open(`${WHATSAPP_LINK}&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`);
                            setIsTriageModalOpen(false);
                          }}
                          className="block w-full text-left px-5 py-3.5 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50 hover:text-green-700 font-medium text-slate-700 transition-all flex justify-between items-center group"
                        >
                          {option}
                          <FaWhatsapp size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 3.5 DIFERENCIAIS E NICHO */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-6 mx-auto">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Nossos Diferenciais
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Por que escolher a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AtendCon?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12">
            {[
              "Atendimento Humanizado",
              "Resposta Rápida",
              "Especialistas em Prestação de Serviços",
              "Comércio e Varejo",
              "Regularização Fiscal",
              "Assessoria Empresarial Completa"
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-xs mb-6 border border-yellow-500/30">
                ⭐ Expertise de Nicho
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Especialistas em <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Comércio</span> e Serviços
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Temos o conhecimento técnico profundo que diferencia a AtendCon da maioria das contabilidades tradicionais. Atendimento completo para o seu negócio.
              </p>
              <button onClick={openTriageModal} className="inline-block bg-yellow-500 text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                Falar com Especialista
              </button>
            </div>
            
            <div className="flex-1 relative z-10 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Lojas e Varejo",
                  "Prestadores de Serviços",
                  "Profissionais Liberais",
                  "Clínicas e Consultórios"
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 px-5 py-4 rounded-xl flex items-center gap-3 text-white font-medium">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METODO SECTION */}
      <section id="metodo" className="py-24 bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/fundo03.png" alt="Background Método" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Nosso Método</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Um processo validado para trazer segurança jurídica e performance financeira para o seu negócio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 -translate-y-1/2 opacity-30"></div>

            {[
              { step: "01", title: "Diagnóstico", desc: "Análise profunda da atual situação fiscal e contábil.", color: "from-blue-500 to-cyan-400" },
              { step: "02", title: "Compliance", desc: "Saneamento de pendências e regularização completa.", color: "from-indigo-500 to-blue-400" },
              { step: "03", title: "Planejamento", desc: "Desenho de regimes tributários e metas financeiras.", color: "from-violet-500 to-indigo-400" },
              { step: "04", title: "Performance", desc: "Acompanhamento mensal com auditoria eletrônica.", color: "from-purple-500 to-violet-400" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 hover:border-slate-700 transition-all duration-300 shadow-2xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
                
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg text-white font-black text-xl relative z-10`}>
                  {item.step}
                </div>
                
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors relative z-10">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                
                {/* Background large number */}
                <span aria-hidden="true" className="text-[120px] leading-none font-black text-white/5 absolute -bottom-6 -right-2 group-hover:text-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 select-none pointer-events-none">{item.step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUEM SOMOS */}
      <section id="sobre" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" alt="Team" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <ShieldCheck size={40} className="mb-4" />
              <div className="font-bold text-xl">Alto Padrão</div>
              <div className="text-blue-200 text-sm">Contabilidade Consultiva</div>
            </div>
          </div>
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">A atenção que sua empresa precisa</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              A ATENDCON CONTABILIDADE tem fornecido serviços personalizados de contabilidade e fiscais em Belo Horizonte. Com nossa equipe altamente treinada, sempre em busca de novos conhecimentos, estamos prontos para lidar com todas as suas necessidades de contabilidade, seja qual for o grau de complexidade. Caso precise de ajuda com as suas finanças pessoais ou da sua empresa, estamos sempre prontos para fazer seu planejamento fiscal ou prestar assessoria.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Construímos uma excelente reputação cuidando das necessidades fiscais e contábeis de uma grande variedade de empresas e pessoas. Temos toda a informação disponível e queremos trabalhar com você.
            </p>
            <div className="space-y-4 w-full">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
                <h4 className="font-bold text-slate-900 mb-2">Serviço Personalizado, Resultados Mensuráveis</h4>
                <p className="text-slate-600 text-sm">Entregar segurança jurídica e financeira através de uma contabilidade consultiva, permitindo que você foque no que faz de melhor: o seu negócio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" ref={faqRef} className="py-24 bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <img src="/fundo02.png" alt="Background FAQ" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs mb-6 mx-auto">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Tire suas dúvidas
          </div>
          <h2 className="text-4xl font-black text-white mb-2 leading-tight">
            Dúvidas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Frequentes</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              className={`bg-white/5 backdrop-blur-md border ${activeFaq === i ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/10 hover:border-blue-400/50'} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer`}
            >
              <div className="w-full flex justify-between items-center p-6 text-left">
                <span className={`font-bold text-lg transition-colors ${activeFaq === i ? 'text-blue-400' : 'text-slate-200'}`}>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === i ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>
                  <ChevronDown className={`transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} size={18} />
                </div>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mt-10">
          <p className="text-lg text-slate-400 mb-6">
            Não encontrou o que procurava? Fale diretamente com nossa equipe.
          </p>
          <button onClick={openTriageModal} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">
            <FaWhatsapp size={18}/> Chamar no WhatsApp
          </button>
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
                <img src="/app.png" alt="Aplicativo ATENDCON" className="w-full h-auto object-cover rounded-2xl" />
                
                {/* Logo sobreposta */}
                <div className="absolute top-10 md:top-11 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  <img src={logo1} alt="Logo ATENDCON" className="w-20 h-auto opacity-90" />
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
              Com o aplicativo oficial da ATENDCON, você acompanha suas finanças, acessa guias de impostos, envia documentos e fala com seu contador em tempo real. Tudo isso direto do seu celular, de forma rápida, segura e sem burocracia.
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
              <a href="https://play.google.com/store/apps/details?id=com.atendconcontabilidade" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-black hover:bg-slate-900 hover:scale-105 border border-slate-800 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-fit">
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


      {/* 7.5 AVALIAÇÕES / PROVA SOCIAL */}
      <section className="py-24 relative overflow-hidden border-t border-slate-800 text-white">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet="/fundo01_mobile.png" />
            <img src="/fundo01.png" alt="Background Avaliações" className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold text-xs mb-6 mx-auto backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Prova Social
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            O que nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">clientes dizem</span>
          </h2>
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-slate-300 md:text-lg font-medium text-center">
              <span className="text-yellow-500 text-xl tracking-widest">★★★★★</span>
              <span>Mais de <strong className="text-white">37 avaliações</strong> no Google</span>
            </div>
            <a href="https://www.google.com/search?q=atendcon&oq=atendcon&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhAjGCcyCggDEAAYgAQYogQyBwgEEAAY7wUyCggFEAAYgAQYogQyBwgGEAAY7wUyBggHEEUYPNIBCDQyODRqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSFkNJSE0wb2dLRUlDQWdJRHU3bzZ3WEE%3D" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl font-bold text-sm mt-2">
              Deixe sua avaliação
            </a>
          </div>
        </div>
        
        <div className="w-full relative pb-12 z-10">
          {/* Fading edges for smooth scroll hiding */}
          <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#0b1120] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#0b1120] to-transparent z-20 pointer-events-none"></div>

          <div 
            ref={testimonialsRef}
            onMouseEnter={() => setIsTestimonialsPaused(true)}
            onMouseLeave={() => setIsTestimonialsPaused(false)}
            onTouchStart={() => setIsTestimonialsPaused(true)}
            onTouchEnd={() => setIsTestimonialsPaused(false)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-12 md:px-32 scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { name: "Décio Jr", text: "Excelente profissional com elevado conhecimento em contabilidade em geral. Atendimento nota 10. Altamente recomendável." },
              { name: "Nívea Diniz", text: "Atendimento impecável. Fui orientada com clareza e honestidade do início ao fim." },
              { name: "Karen Alexandra Victor Carneiro", text: "Há mais de 4 anos conto com o auxílio do Daniel para resolver questões junto à Receita Federal." },
              { name: "Ana Sousa", text: "Fechamento de empresa realizado com eficiência e preço justo." },
              { name: "Nilson Martins Peroche", text: "Profissional eficiente e dedicado. Recomendo sem dúvidas." },
              { name: "Ciça Carolina", text: "Há quase 5 anos contamos com a AtendCon. Agilidade, atenção e competência." }
            ].map((review, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-blue-700 to-blue-900 border border-blue-500/30 p-8 rounded-3xl shadow-xl flex flex-col justify-between w-[300px] md:w-[400px] shrink-0 snap-center text-left transition-transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex text-yellow-400 text-lg mb-4">
                    ★★★★★
                  </div>
                  <p className="text-blue-50 italic leading-relaxed mb-6 font-medium">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                    <span className="text-xs text-blue-200">Cliente AtendCon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTATO E MAPA */}
      <section id="contato" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
              Atendimento Rápido
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Fale Conosco</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Explique brevemente a sua necessidade. Nossa equipe entrará em contato em instantes via WhatsApp para oferecer a melhor solução para o seu negócio.
            </p>

            <form className="space-y-5 w-full text-left" onSubmit={(e) => {
              e.preventDefault();
              const nome = e.target.nome.value;
              const empresa = e.target.empresa.value;
              const servico = e.target.servico.value;
              const mensagem = e.target.mensagem.value;
              const texto = `Olá! Meu nome é *${nome}*${empresa ? ` da empresa *${empresa}*` : ''}.\n\nGostaria de falar sobre: *${servico}*.\n\nDetalhes:\n${mensagem}`;
              window.open(`${WHATSAPP_LINK}&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`);
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Seu Nome *</label>
                  <input name="nome" type="text" placeholder="Como podemos te chamar?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Empresa</label>
                  <input name="empresa" type="text" placeholder="Nome do seu negócio" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Qual sua necessidade principal? *</label>
                <select name="servico" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-700" required>
                  <option value="" disabled selected>Selecione uma opção...</option>
                  <option value="Abertura de Empresa">Quero abrir uma empresa</option>
                  <option value="Troca de Contador">Quero trocar de contador</option>
                  <option value="Consultoria Tributária">Preciso reduzir meus impostos</option>
                  <option value="Regularização">Preciso regularizar pendências</option>
                  <option value="Outros">Outros assuntos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Detalhes da sua solicitação</label>
                <textarea name="mensagem" rows={4} placeholder="Conte um pouco mais sobre o que você precisa..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all custom-scrollbar"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-4 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/30">
                <FaWhatsapp size={24} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>

          <div className="relative h-full w-full min-h-[500px] lg:min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white isolate bg-slate-100 group">
            {/* Map Frame */}
            <iframe 
              src="https://maps.google.com/maps?q=Avenida%20Cristiano%20Machado%20640%20sala%201507%20Sagrada%20Familia%20Belo%20Horizonte&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              className="absolute inset-0 grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            
            {/* Floating Glass Contact Card over the map */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sede Atendcon</h4>
                  <p className="text-xs text-blue-600 font-bold">Belo Horizonte - MG</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-3 leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                  Avenida Cristiano Machado 640, Sala 1507<br/>Sagrada Familia - CEP 31030-514
                </p>
                <div className="h-px w-full bg-slate-200"></div>
                <p className="flex items-center gap-3 font-medium text-slate-800">
                  <FaWhatsapp size={16} className="text-green-500" /> (31) 98385-8280
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/fundo04.png" alt="Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Transforme a contabilidade em Vantagem Competitiva.</h2>
          <p className="text-xl text-slate-200 mb-10">Agende uma conversa e descubra como podemos alavancar o seu negócio.</p>
          <button onClick={openTriageModal} className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition shadow-2xl">
            Solicitar Atendimento
          </button>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 md:pt-24 pb-6 border-t border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 md:pb-16">
            
            {/* Logo & Sobre */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl inline-block backdrop-blur-sm">
                <img src="/logo02.png" alt="Atendcon Logo" className="h-12 md:h-16 w-auto object-contain" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-medium">Atenção que sua empresa precisa. Especialistas em gestão fiscal, contábil e departamento pessoal em Belo Horizonte.</p>
            </div>

            {/* Links Rápidos */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Links Rápidos</h4>
              <ul className="flex flex-col gap-3 text-sm font-medium">
                <li><a href="https://vip.acessorias.com/atendconcontabilidade" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition flex items-center gap-2"><ArrowRight size={14}/> Área do Cliente</a></li>
                <li><a href="#servicos" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> Serviços</a></li>
                <li><a href="#metodo" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> Nosso Método</a></li>
                <li><a href="#sobre" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> Quem Somos</a></li>
                <li><a href="#faq" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> FAQ</a></li>
                <li><a href="#app" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> Nosso App</a></li>
                <li><a href="#contato" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={14}/> Contato</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>Contato</h4>
              <ul className="space-y-4 text-sm text-slate-300 font-medium">
                <li className="flex items-center justify-center md:justify-start gap-3"><FaWhatsapp size={18} className="text-blue-400 shrink-0" /> (31) 98385-8280</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><Phone size={18} className="text-blue-400 shrink-0" /> (31) 97500-4001</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><Mail size={18} className="text-blue-400 shrink-0" /> Comercial@atendcon.com.br</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><Mail size={18} className="text-blue-400 shrink-0" /> Operacional@atendcon.com.br</li>
                <li className="flex items-start justify-center md:justify-start gap-3"><MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" /> <span>Avenida Cristiano Machado 640<br/>sala 1507<br/>Sagrada Familia - BH<br/>CEP 31030-514</span></li>
                <li className="flex items-center justify-center md:justify-start gap-3"><Clock size={18} className="text-blue-400 shrink-0" /> Seg a Sex: 08:00 às 18:00</li>
              </ul>
            </div>

            {/* Apps & Redes */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>Nossos Apps</h4>
              <div className="flex flex-col gap-3 w-full max-w-[200px]">
                <a href="https://play.google.com/store/apps/details?id=com.atendconcontabilidade" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-full">
                  <FaGooglePlay size={20} className="text-emerald-400 shrink-0" />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Disponível no</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all text-white shadow-lg w-full">
                  <FaApple size={24} className="text-slate-200 shrink-0" />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Baixar na</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </a>
              </div>

              <h4 className="text-white font-bold text-lg mt-8 mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>Redes e Avaliações</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a href="https://www.instagram.com/atendconcontabilidade?utm_source=qr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.google.com/search?q=atendcon&oq=atendcon&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhAjGCcyCggDEAAYgAQYogQyBwgEEAAY7wUyCggFEAAYgAQYogQyBwgGEAAY7wUyBggHEEUYPNIBCDQyODRqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSFkNJSE0wb2dLRUlDQWdJRHU3bzZ3WEE%3D" target="_blank" rel="noreferrer" className="px-4 h-10 rounded-full bg-white text-slate-900 flex items-center gap-2 hover:scale-105 transition-transform shadow-lg font-bold text-xs">
                  <span className="text-yellow-500 text-lg leading-none -mt-1">★</span> Avalie no Google
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-slate-500">
            <p>© {new Date().getFullYear()} ATENDCON CONTABILIDADE. Todos os direitos reservados.</p>

            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-800 text-slate-400 shadow-inner">
              CNPJ: 12.345.678/0001-90
            </div>
          </div>
        </div>
      </footer>

      {/* 10. FLOATING WHATSAPP */}
      <button 
        onClick={openTriageModal}
        className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
      >
        <FaWhatsapp size={32} />
      </button>
    </div>
  );
};

export default AtendconSPA;
