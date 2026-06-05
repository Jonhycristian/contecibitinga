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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={logo1} alt="CONTEC Logo" className="h-10 w-auto object-contain" />
            <img src={logo2} alt="CONTEC Logo 2" className="h-10 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Serviços', 'Sobre Nós', 'Diferenciais', 'Depoimentos'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <a href="#contato" className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
              Fale Conosco
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Serviços', 'Sobre Nós', 'Diferenciais', 'Depoimentos'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-slate-300 hover:text-white">
                  {item}
                </a>
              ))}
              <a href="#contato" className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold">
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. BANNER PRINCIPAL (HERO) */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=70" 
            alt="Business architecture" 
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
          
          {/* Subtle glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px]" />
        </div>

        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Excelência Contábil & Imobiliária</span>
          </motion.div>

          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] max-w-5xl mx-auto tracking-tight"
          >
            Estruture o futuro do seu <br className="hidden md:block"/>
            <span className="text-gradient">negócio com segurança.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light"
          >
            Soluções contábeis, fiscais e documentais premium para construção civil, incorporações, loteamentos e empresas de todos os portes.
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="group relative bg-white text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <span>Agendar Consultoria</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#serviços" className="glass-card text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center">
              Explorar Serviços
            </a>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Role para baixo</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </section>

      {/* 2. NÚMEROS DA EMPRESA */}
      <section className="py-20 bg-slate-950 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10"
          >
            {[
              { label: 'Empresas Atendidas', value: '500+' },
              { label: 'Projetos Regularizados', value: '300+' },
              { label: 'Obrigações Entregues', value: '10k+' },
              { label: 'Índice de Retenção', value: '98%' }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp} className="glass-card rounded-2xl p-6 text-center border-t-white/20">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</h3>
                <p className="text-sm md:text-base text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVIÇOS */}
      <section className="py-32 bg-slate-50 relative" id="serviços">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-3 block">Nossas Especialidades</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Soluções completas para estruturar seu negócio.</h2>
            </div>
            <a href="#contato" className="hidden md:flex items-center gap-2 text-slate-900 font-semibold hover:text-cyan-600 transition-colors group">
              Ver todos os detalhes <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
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
              <motion.div key={idx} variants={fadeUp} className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-50 group-hover:text-cyan-600 group-hover:border-cyan-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SOBRE A CONTEC */}
      <section className="py-32 bg-white" id="sobre-nós">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
            {/* Dark background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800/50 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=70" alt="Equipe Contec" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 glass-card border border-white/20 text-white p-8 rounded-3xl hidden md:block backdrop-blur-xl">
                    <div className="text-cyan-400 mb-2"><Star size={32} fill="currentColor" /></div>
                    <p className="text-5xl font-bold mb-1">20<span className="text-cyan-400">+</span></p>
                    <p className="text-slate-300 font-medium text-sm tracking-wide uppercase">Anos de Experiência</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <span className="text-cyan-400 font-bold tracking-wider uppercase text-sm mb-3 block">Nossa Essência</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Muito além da contabilidade tradicional.</h2>
                <p className="text-slate-300 mb-8 text-lg font-light leading-relaxed">
                  A CONTEC atua com foco em resultados reais. Oferecemos um atendimento singular que une robustez técnica a uma consultoria estratégica, desenhada para alavancar e proteger o seu patrimônio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    'Atendimento Personalizado', 'Visão Estratégica', 
                    'Alta Precisão Técnica', 'Foco no Setor Imobiliário'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="text-cyan-400" size={16} />
                      </div>
                      <span className="font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#contato" className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                  Conheça nossa história
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIFERENCIAIS (PREMIUM GLASSMORPHISM) */}
      <section className="py-32 bg-slate-950 relative overflow-hidden" id="diferenciais">
        {/* Beautiful Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-700/30 rounded-full mix-blend-screen filter blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjRoLTR6bS0yMCAwdjRoLTh2MmgtNHY2aC0ydjRoMnY0aC0ydjZoMnY0aDR2Mmg4djRoMnYtNGg0di0yaC00di00aC0ydj00aC0ydjRILTZ2LTRoLTh2LTRoLTJ2LTRoMnYtNGgydi00aDJWMmg0VjBoOHYyaDRWMHptMCAwdjRoLThWMmg4em0tOCA0SDZWMGg0djJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-cyan-400 font-bold tracking-wider uppercase text-sm mb-3 block">Vantagem Competitiva</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Por que grandes empresas escolhem a CONTEC?</h2>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { t: 'Consultoria Estratégica', d: 'Análise profunda dos seus números para tomada de decisões seguras.' },
              { t: 'DNA Imobiliário', d: 'Mestres em incorporações, loteamentos e construção civil.' },
              { t: 'Agilidade Digital', d: 'Processos otimizados com tecnologia de ponta e segurança de dados.' },
              { t: 'Atendimento Premium', d: 'Um gerente de contas dedicado exclusivamente à sua empresa.' },
              { t: 'Redução Tributária', d: 'Planejamento fiscal rigoroso para maximizar seus lucros legalmente.' },
              { t: 'Regularização Célere', d: 'Resolução rápida de pendências nos órgãos públicos e CEF.' }
            ].map((dif, idx) => (
              <motion.div key={idx} variants={fadeUp} 
                className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{dif.t}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{dif.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. COMO FUNCIONA (LINHA DO TEMPO REFINADA) */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">A Jornada do Sucesso</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Nosso método comprovado para estruturar sua empresa em 5 passos simples.</p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Linha conectora */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-slate-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { title: 'Contato Inicial', desc: 'Entendemos sua necessidade.' },
                { title: 'Diagnóstico', desc: 'Análise completa do cenário.' },
                { title: 'Planejamento', desc: 'Definição da estratégia ideal.' },
                { title: 'Execução', desc: 'Ação rápida e precisa.' },
                { title: 'Monitoramento', desc: 'Acompanhamento contínuo.' }
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 transition-transform duration-300 relative border border-slate-100">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                    <span className="text-2xl font-bold text-slate-800">0{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS */}
      <section className="py-32 bg-white" id="depoimentos">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-3 block">Testemunhos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 max-w-3xl">Líderes de mercado confiam em nossa expertise.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { text: "A CONTEC transformou a gestão da nossa construtora. A assessoria nos processos da Caixa foi fundamental para viabilizar nossos loteamentos em tempo recorde.", author: "Ricardo Mendonça", role: "Diretor, Construtora RM" },
              { text: "Precisão absoluta na contabilidade. Desde que migramos, tivemos uma economia tributária significativa graças ao planejamento estratégico aplicado.", author: "Amanda Silva", role: "CEO, AS Incorporações" },
              { text: "O atendimento é de fato premium. Sempre disponíveis e proativos. É como ter um departamento contábil e jurídico altamente qualificado dentro da nossa própria empresa.", author: "Carlos Eduardo", role: "Sócio, Grupo Vértice" }
            ].map((dep, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-slate-50 border border-slate-100 p-8 rounded-3xl"
              >
                <div className="flex text-amber-400 mb-6 gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{dep.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {dep.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{dep.author}</h4>
                    <p className="text-sm text-slate-500">{dep.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative py-32 bg-slate-900 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541888086925-0c13bb104746?auto=format&fit=crop&w=1920&q=70" alt="Empreendimento" loading="lazy" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Pronto para elevar o patamar da sua empresa?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light">
            Agende uma reunião estratégica sem compromisso e descubra como podemos otimizar seus resultados.
          </p>
          <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:-translate-y-1">
            <FaWhatsapp size={24} /> Iniciar Conversa no WhatsApp
          </a>
        </div>
      </section>

      {/* 9. RODAPÉ PREMIUM */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo & Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <img src={logo1} alt="CONTEC Logo" className="h-12 w-auto object-contain" />
                <img src={logo2} alt="CONTEC Logo 2" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-sm leading-relaxed mb-8">
                Consultoria estratégica e inteligência contábil para negócios que buscam crescimento sólido e regularidade impecável.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Menu</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#sobre-nós" className="hover:text-cyan-400 transition-colors">Sobre a Empresa</a></li>
                <li><a href="#serviços" className="hover:text-cyan-400 transition-colors">Nossos Serviços</a></li>
                <li><a href="#depoimentos" className="hover:text-cyan-400 transition-colors">Cases de Sucesso</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Contato</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-cyan-500 mt-0.5 flex-shrink-0" size={18} />
                  <span>Av. Empresarial, 1000 - Sala 402<br/>Edifício Corporate, SP</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-cyan-500 flex-shrink-0" size={18} />
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">(16) 99718-1970</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-cyan-500 flex-shrink-0" size={18} />
                  <span>Seg a Sex: 08h às 18h</span>
                </li>
              </ul>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Redes Sociais</h4>
              <p className="text-sm text-slate-500 mb-4">Em breve estaremos nas principais redes sociais. Por enquanto, fale conosco pelo WhatsApp!</p>
              <div className="flex space-x-3">
                  <a href="https://wa.me/5516997181970" target="_blank" rel="noreferrer" className="h-10 px-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition-all text-sm font-medium gap-2">
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
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-full shadow-[0_10px_30px_-10px_rgba(16,185,129,0.8)] hover:scale-110 hover:-translate-y-1 transition-all z-50 flex items-center justify-center border border-green-400/50"
      >
        <FaWhatsapp size={28} />
      </a>

    </div>
  );
}
