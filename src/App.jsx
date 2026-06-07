import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Building2, Calculator, Users, FileText, Map, Landmark,
  CheckCircle2, ChevronRight, 
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

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <a href="#sobre" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Sobre Nós</a>
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
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Sobre Nós</a>
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

      {/* 2. STATS SECTION */}
      <section className="relative z-20 -mt-20 px-6">
        <div className="container mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
              {[
                { number: '15+', label: 'Anos de Experiência' },
                { number: '500+', label: 'Clientes Satisfeitos' },
                { number: '100%', label: 'Conformidade Fiscal' },
                { number: '24/7', label: 'Suporte Estratégico' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center px-4">
                  <h3 className="text-4xl md:text-5xl font-black text-blue-600 mb-2">{stat.number}</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS SECTION */}
      <section id="servicos" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">Nossas Especialidades</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Expertise que impulsiona o seu crescimento</h3>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: 'Escrituração Fiscal e Contábil', icon: <Calculator size={28} />, desc: 'Gestão tributária e contábil estratégica, garantindo compliance e redução de custos.' },
              { title: 'Departamento Pessoal', icon: <Users size={28} />, desc: 'Administração completa de folha de pagamento e rotinas trabalhistas.' },
              { title: 'Legalização de Empresas', icon: <ShieldCheck size={28} />, desc: 'Abertura, alterações, encerramentos e regularizações em geral.' },
              { title: 'Loteamentos e Desmembramentos', icon: <Map size={28} />, desc: 'Especialistas em documentação imobiliária e processos de parcelamento de solo.' },
              { title: 'Construção Civil e Incorporação', icon: <Building2 size={28} />, desc: 'Assessoria completa e contabilidade especializada para o setor de obras e incorporações.' },
              { title: 'Geric junto à CEF', icon: <Landmark size={28} />, desc: 'Elaboração e acompanhamento de processos para aprovação de crédito (Geric) na Caixa Econômica Federal.' },
            ].map((service, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-sm">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SOBRE SECTION */}
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
              
              <ul className="space-y-4 mb-10">
                {[
                  'Atendimento Personalizado Premium',
                  'Auditoria e Compliance Rigorosos',
                  'Especialistas em Imobiliário e Construção'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="text-blue-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
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
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo & Info */}
            <div className="lg:col-span-1">
              <div className="flex flex-wrap items-center gap-3 mb-6 bg-white/5 p-4 rounded-xl">
                <img src={logo1} alt="CONTEC Logo" className="h-7 md:h-10 w-auto object-contain brightness-0 invert" />
                <img src={logo2} alt="CONTEC Logo 2" className="h-7 md:h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-sm leading-relaxed mb-8 text-slate-400">
                Consultoria estratégica e inteligência contábil para negócios que buscam crescimento sólido e regularidade impecável.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Links Rápidos</h4>
              <ul className="space-y-4">
                <li><a href="#servicos" className="text-slate-400 hover:text-white transition-colors">Nossos Serviços</a></li>
                <li><a href="#sobre" className="text-slate-400 hover:text-white transition-colors">Quem Somos</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold mb-6 tracking-wide">Contato</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                  <span>Ibitinga - SP<br/>Entre em contato</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-blue-500 flex-shrink-0" size={18} />
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">(16) 99718-1970</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-blue-500 flex-shrink-0" size={18} />
                  <span>Seg - Sex: 08:00 - 18:00</span>
                </li>
              </ul>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Redes Sociais</h4>
              <p className="text-sm text-slate-400 mb-4">Em breve estaremos nas principais redes sociais. Por enquanto, fale conosco pelo WhatsApp!</p>
              <div className="flex space-x-3">
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="h-10 px-4 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition-all text-sm font-medium gap-2 text-slate-300">
                    <FaWhatsapp size={16} /> WhatsApp
                  </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} CONTEC SERVIÇOS E CONSULTORIA CONTABIL LTDA. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
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
