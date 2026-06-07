import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Building2, Calculator, Users, FileText, Map, Landmark,
  CheckCircle2, ChevronRight, ChevronDown, ChevronUp,
  MapPin, Clock, ShieldCheck, ArrowRight, Menu, X, Star
} from 'lucide-react';
import logo1 from './assets/logo.png';
import logo2 from './assets/logo02.png';

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

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-6 md:p-8 text-left hover:bg-slate-50 transition-colors focus:outline-none">
        <span className="font-bold text-slate-900 text-lg md:text-xl pr-8">{question}</span>
        {isOpen ? <ChevronUp className="text-blue-600 flex-shrink-0" size={24} /> : <ChevronDown className="text-slate-400 flex-shrink-0" size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 leading-relaxed font-light text-lg">
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
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
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-slate-200' : 'bg-white py-4 shadow-sm'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <img src={logo1} alt="CONTEC Logo" className="h-6 md:h-10 w-auto object-contain" />
            <img src={logo2} alt="CONTEC Logo 2" className="h-6 md:h-10 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#metodo" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Método</a>
            <a href="#sobre" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Quem Somos</a>
            <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">FAQ</a>
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="text-sm font-bold bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
              Fale Conosco
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
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="mt-4 bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg">
              Fale Conosco Agora
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-slate-50 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=70" 
            alt="Business architecture" 
            fetchPriority="high"
            className="w-full h-full object-cover opacity-[0.04] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-slate-50/80 to-white" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Excelência e Tradição Contábil
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-8">
              Estruture o futuro do seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">segurança.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-light">
              Soluções contábeis, fiscais e documentais premium para construção civil, incorporações, loteamentos e empresas de todos os portes.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
            >
              <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="group relative bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20">
                <span>Agendar Consultoria</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#servicos" className="px-8 py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center">
                Explorar Serviços
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVIÇOS DETALHADOS SECTION */}
      <section id="servicos" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">O Que Entregamos</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Expertise que impulsiona resultados</h3>
            <p className="text-lg text-slate-600 font-light">Vamos muito além do básico. Entregamos soluções sob medida para blindar o seu patrimônio e garantir a máxima eficiência tributária.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.map((service, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                <div className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-sm">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light mb-8 flex-grow">{service.desc}</p>
                
                {service.bullets && (
                  <ul className="space-y-3 mt-auto border-t border-slate-200 pt-6">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                        <span className="leading-tight">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. NOSSO MÉTODO DE TRABALHO */}
      <section id="metodo" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
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
      <section id="sobre" className="py-32 bg-slate-50">
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
                <div className="absolute -bottom-8 -right-8 bg-white border border-slate-100 shadow-xl text-slate-800 p-8 rounded-3xl hidden md:block">
                  <div className="text-blue-500 mb-2"><Star size={32} fill="currentColor" /></div>
                  <p className="text-2xl font-bold text-slate-900">Alto Padrão</p>
                  <p className="text-slate-500 text-sm">Em cada detalhe</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
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
      <section id="faq" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">Tire suas dúvidas</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Perguntas Frequentes</h3>
            <p className="text-lg text-slate-600 font-light">Respostas claras para as dúvidas mais comuns sobre nossos serviços de contabilidade e consultoria.</p>
          </div>
          <div>
            <FAQItem 
              question="Vocês atendem apenas construtoras e loteadoras?"
              answer="Não. Embora sejamos altamente especializados no setor imobiliário e de construção civil, nossa equipe possui expertise para atender empresas prestadoras de serviços, comércios e indústrias de diversos portes."
            />
            <FAQItem 
              question="O que é o Geric da Caixa e como vocês ajudam?"
              answer="O Geric é a análise de Risco de Crédito da Caixa Econômica Federal, essencial para construtoras conseguirem financiamento. Nós adequamos seus balanços e preparamos toda a documentação exigida para que sua empresa alcance a nota necessária para aprovação."
            />
            <FAQItem 
              question="Minha empresa está em outra cidade, posso ser cliente CONTEC?"
              answer="Sim. Atendemos de forma 100% digital e segura, garantindo a mesma proximidade e eficiência do atendimento presencial através de reuniões online e plataformas seguras de troca de documentos."
            />
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative py-32 bg-blue-900 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541888086925-0c13bb104746?auto=format&fit=crop&w=1920&q=70" alt="Empreendimento" loading="lazy" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/90 to-blue-800/80" />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-200 text-sm font-bold uppercase tracking-widest mb-6">Fale com Especialistas</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Transforme a contabilidade em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Vantagem Competitiva</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Pare de perder tempo com burocracias. Deixe a nossa equipe cuidar da conformidade e da saúde financeira do seu negócio enquanto você foca exclusivamente no que importa: crescer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-slate-50 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:-translate-y-1">
              <FaWhatsapp size={24} /> Falar com Consultor
            </a>
            <a href="#servicos" className="inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-white/10">
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
              <div className="flex flex-wrap items-center gap-3 mb-8 bg-white/5 p-5 rounded-2xl border border-white/10">
                <img src={logo1} alt="CONTEC Logo" className="h-7 md:h-10 w-auto object-contain brightness-0 invert" />
                <img src={logo2} alt="CONTEC Logo 2" className="h-7 md:h-10 w-auto object-contain brightness-0 invert" />
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

            {/* Redes Sociais */}
            <div>
              <h4 className="text-white font-bold mb-8 tracking-wide text-lg">Redes Sociais</h4>
              <p className="text-sm text-slate-400 mb-6 font-light leading-relaxed">Em breve estaremos nas principais redes sociais produzindo conteúdo para você. Por enquanto, fale conosco pelo WhatsApp!</p>
              <div className="flex space-x-3">
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="h-12 px-6 bg-blue-600 border border-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-sm font-bold gap-3 text-white shadow-lg shadow-blue-600/20">
                    <FaWhatsapp size={20} /> Chamar no WhatsApp
                  </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 font-light">
            <p>&copy; {new Date().getFullYear()} CONTEC SERVIÇOS E CONSULTORIA CONTABIL LTDA. Todos os direitos reservados.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a 
        href="https://wa.me/5516997181970" 
        target="_blank" rel="noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-[0_10px_30px_-10px_rgba(34,197,94,0.8)] hover:scale-110 hover:-translate-y-1 transition-all z-50 flex items-center justify-center border border-green-400/50"
      >
        <FaWhatsapp size={28} />
      </a>

    </div>
  );
}
