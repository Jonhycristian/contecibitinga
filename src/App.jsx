import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Calculator, Users, FileText, Map, 
  Landmark, CheckCircle2, ChevronRight, MessageCircle, 
  MapPin, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';

// Variáveis de Animação
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 overflow-x-hidden scroll-smooth">
      
      {/* 1. BANNER PRINCIPAL (HERO) */}
      <section className="relative min-h-screen flex items-center justify-center bg-blue-950 overflow-hidden">
        {/* Fundo com imagem/overlay - Substituir src pela imagem da IA */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            alt="Empresário e engenheiro analisando plantas" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Partículas discretas (CSS/SVG) podem ser adicionadas aqui */}
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            Contabilidade, Consultoria e Regularização Imobiliária para Empresas e Empreendimentos.
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto"
          >
            Soluções contábeis, fiscais e documentais para construção civil, incorporações, loteamentos e empresas de todos os portes.
          </motion.p>
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#whatsapp" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
              <MessageCircle size={20} /> Falar no WhatsApp
            </a>
            <a href="#orcamento" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-950 px-8 py-4 rounded-lg font-bold transition-all">
              Solicitar Orçamento
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. NÚMEROS DA EMPRESA */}
      <section className="py-20 bg-blue-900 text-white relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Empresas Atendidas', value: '500+' },
              { label: 'Projetos Regularizados', value: '300+' },
              { label: 'Obrigações Entregues', value: '10k+' },
              { label: 'Clientes Satisfeitos', value: '98%' }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp} className="p-4">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-blue-300">{stat.value}</h3>
                <p className="text-slate-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVIÇOS */}
      <section className="py-24 bg-white" id="servicos">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Nossos Serviços</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Soluções completas para estruturar, legalizar e impulsionar o seu negócio.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: 'Escrituração Fiscal', icon: <FileText size={32} />, desc: 'Gestão completa de tributos e relatórios.' },
              { title: 'Escrituração Contábil', icon: <Calculator size={32} />, desc: 'Dashboards financeiros e balanços precisos.' },
              { title: 'Departamento Pessoal', icon: <Users size={32} />, desc: 'Administração de folha e rotinas trabalhistas.' },
              { title: 'Legalização de Empresas', icon: <ShieldCheck size={32} />, desc: 'Abertura, alterações e assinaturas digitais.' },
              { title: 'Loteamentos e Desmembramentos', icon: <Map size={32} />, desc: 'Regularização e aprovação de áreas.' },
              { title: 'Construção Civil e Incorporação', icon: <Building2 size={32} />, desc: 'Contabilidade específica para obras.' },
              { title: 'Geric junto à CEF', icon: <Landmark size={32} />, desc: 'Assessoria para financiamentos empresariais.' },
            ].map((service, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SOBRE A CONTEC */}
      <section className="py-24 bg-slate-50" id="sobre">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Equipe Contec" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl hidden md:block">
              <p className="text-4xl font-bold">20+</p>
              <p className="text-blue-100">Anos de Experiência</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">Muito além da contabilidade tradicional</h2>
            <p className="text-slate-600 mb-6 text-lg">
              A CONTEC atua com foco em resultados reais para a sua empresa. Oferecemos um atendimento personalizado que une experiência técnica e consultoria estratégica.
            </p>
            <ul className="space-y-4 mb-8">
              {['Atendimento personalizado', 'Experiência técnica avançada', 'Consultoria estratégica', 'Foco em empreendimentos imobiliários'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-green-500" size={24} /> {item}
                </li>
              ))}
            </ul>
            <a href="#contato" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
              Conheça nossa história <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 5. DIFERENCIAIS (GLASSMORPHISM) */}
      <section className="py-24 bg-blue-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Por que escolher a CONTEC?</h2>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              'Atendimento Humanizado', 'Consultoria Estratégica', 'Especialistas em Construção Civil',
              'Documentação Imobiliária', 'Suporte Digital', 'Agilidade nos Processos'
            ].map((diferencial, idx) => (
              <motion.div key={idx} variants={fadeUp} 
                // GLASSMORPHISM CLASSES HERE
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white flex items-center gap-4 hover:bg-white/20 transition-all"
              >
                <CheckCircle2 className="text-cyan-400 flex-shrink-0" size={28} />
                <span className="text-lg font-medium">{diferencial}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. COMO FUNCIONA (LINHA DO TEMPO) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-16">Como Funciona</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            {/* Linha conectora (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-100 -translate-y-1/2 z-0" />
            
            {['Contato', 'Diagnóstico', 'Planejamento', 'Execução', 'Acompanhamento'].map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center bg-white p-4 mb-8 md:mb-0"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg ring-4 ring-white">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-blue-950 text-lg">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS (ESTRUTURA CARROSSEL) */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-12">O que dizem nossos clientes</h2>
          <div className="flex gap-6 justify-center">
            {/* Estrutura pronta para integração com Swiper/Slick */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-lg w-full text-left">
              <div className="flex text-yellow-400 mb-4">{'★'.repeat(5)}</div>
              <p className="text-slate-600 italic mb-6">"A CONTEC transformou a gestão da nossa construtora. A assessoria nos processos da Caixa foi fundamental para nossos loteamentos."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
                <div>
                  <h4 className="font-bold text-blue-950">Cliente Exemplo</h4>
                  <p className="text-sm text-slate-500">Construtora X</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative py-32 bg-blue-900 flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-950/90 mix-blend-multiply z-10" />
          <img src="https://images.unsplash.com/photo-1541888086925-0c13bb104746?auto=format&fit=crop&q=80" alt="Visão de empreendimento" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative z-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Sua empresa merece uma contabilidade que vai além dos números.
          </h2>
          <a href="#whatsapp" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105">
            <MessageCircle size={28} /> Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* 9. RODAPÉ PROFISSIONAL */}
      <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo & Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">CONTEC</h3>
              <p className="text-sm mb-6">Soluções contábeis e consultoria estratégica para negócios que buscam crescimento sólido e regularizado.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">In</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">Ig</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">Fb</a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Sobre a Empresa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nossos Serviços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regularização Imobiliária</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <span>Rua Exemplo, 123 - Centro<br/>Belo Horizonte - MG</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="text-green-500 flex-shrink-0" size={20} />
                  <a href="#" className="hover:text-white transition-colors">(31) 99999-9999</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="text-blue-500 flex-shrink-0" size={20} />
                  <span>Seg a Sex: 08h às 18h</span>
                </li>
              </ul>
            </div>

            {/* Mapa (Placeholder) */}
            <div className="bg-slate-800 rounded-lg overflow-hidden h-48 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  [Google Maps iframe]
               </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
            <p>&copy; {new Date().getFullYear()} CONTEC. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Termos LGPD</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a 
        href="#" 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center"
      >
        <MessageCircle size={32} />
      </a>

    </div>
  );
}
