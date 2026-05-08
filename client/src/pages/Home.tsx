import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Shield, Gavel, FileText, Briefcase, Building2, Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      icon: Shield,
      title: 'Direito Penal',
      description: 'Defesa criminal completa em investigações, audiências e Tribunal do Júri com estratégia técnica de alto nível.'
    },
    {
      icon: Gavel,
      title: 'Tribunal do Júri',
      description: 'Atuação especializada em casos de grande complexidade e repercussão, com técnica de oratória e persuasão.'
    },
    {
      icon: FileText,
      title: 'Direito Civil',
      description: 'Indenizações, responsabilidade civil, cobranças e proteção patrimonial com análise estratégica completa.'
    },
    {
      icon: Briefcase,
      title: 'Contratos e Licitações',
      description: 'Revisão contratual, análise de editais e defesa administrativa com foco em segurança jurídica.'
    },
    {
      icon: Building2,
      title: 'Direito Municipal',
      description: 'Consultoria a gestores e servidores, análise de atos administrativos e PADs com expertise especializada.'
    },
    {
      icon: Users,
      title: 'Direito Trabalhista',
      description: 'Reclamações trabalhistas, acordos, cálculos e verbas rescisórias com negociação estratégica.'
    }
  ];

  const differentials = [
    {
      title: 'Atendimento Estratégico',
      description: 'Análise profunda de cada caso com foco em resultados práticos e soluções inovadoras.'
    },
    {
      title: 'Defesa Técnica Personalizada',
      description: 'Estratégias customizadas para cada cliente, respeitando suas necessidades específicas.'
    },
    {
      title: 'Comunicação Clara',
      description: 'Explicações acessíveis sobre procedimentos jurídicos complexos, sem jargão desnecessário.'
    },
    {
      title: 'Agilidade',
      description: 'Resposta rápida a demandas urgentes e acompanhamento próximo de todas as etapas.'
    },
    {
      title: 'Atendimento Remoto Nacional',
      description: 'Serviços jurídicos de qualidade premium em todo o Brasil, sem limitações geográficas.'
    },
    {
      title: 'Expertise Comprovada',
      description: 'Pós-graduações em Direito Penal, Municipal e Contratos com experiência consolidada.'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Mendes',
      area: 'Direito Penal',
      text: 'Alcivan foi essencial para meu caso. Sua estratégia técnica e comunicação clara me deram segurança em um momento crítico. Resultado excepcional!',
      rating: 5
    },
    {
      name: 'Fernanda Silva',
      area: 'Direito Civil',
      text: 'Profissional de excelência. Atendimento remoto impecável, análise detalhada e resultado que superou minhas expectativas. Recomendo fortemente.',
      rating: 5
    },
    {
      name: 'Roberto Costa',
      area: 'Contratos e Licitações',
      text: 'A expertise de Alcivan em contratos foi decisiva para proteger meus interesses. Trabalho de alta qualidade e responsabilidade profissional.',
      rating: 5
    },
    {
      name: 'Juliana Oliveira',
      area: 'Direito Trabalhista',
      text: 'Alcivan conquistou minha confiança desde o primeiro contato. Estratégia inteligente, defesa técnica impecável e resultado favorável.',
      rating: 5
    },
    {
      name: 'Marcelo Santos',
      area: 'Tribunal do Júri',
      text: 'Sua atuação em tribunal foi magistral. Técnica de oratória impecável, estratégia brilhante e resultado que não esperava. Excelente profissional!',
      rating: 5
    },
    {
      name: 'Patricia Gomes',
      area: 'Direito Municipal',
      text: 'Consultoria de altíssima qualidade. Alcivan entende profundamente de direito municipal e oferece soluções práticas e eficazes.',
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-amber-500 text-amber-500' : 'text-slate-600'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/hero-background-JEoFMPTX3UGhqrC2oxoVCX.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-block">
                <div className="text-sm font-semibold text-amber-500 uppercase tracking-widest">
                  Advocacia Premium
                </div>
              </div>

              <h1 className="text-display-xl text-white leading-tight">
                Advocacia Estratégica com <span className="text-amber-500">Técnica, Inteligência e Resultado</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                Atuação jurídica moderna, segura e técnica em todo o Brasil. Orientações claras, decisões fundamentadas e acompanhamento próximo em cada etapa do seu caso.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-300">OAB/SE 16.699</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-300">Atendimento Remoto Nacional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-300">Advocacia Estratégica Especializada</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <a
                  href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20gostaria%20de%20falar%20sobre%20meu%20caso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-2"
                >
                  Falar no WhatsApp
                  <ChevronRight size={18} />
                </a>
                <Link href="/agendamento">
                  <a className="btn-premium-outline flex items-center justify-center gap-2">
                    Agendar Consulta
                    <ChevronRight size={18} />
                  </a>
                </Link>
              </div>
            </div>

            {/* Right Content - Professional Photo */}
            <div className={`relative ${isLoaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
              <div className="relative z-10">
                <img
                  src="/images/foto-alcivan-premium.webp"
                  alt="Alcivan Guimarães dos Santos - Advogado Especialista"
                  className="w-full rounded-lg shadow-2xl"
                  style={{
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-amber-500/30 rounded-lg hidden md:block"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-amber-500/30 rounded-lg hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display-lg text-white mb-4">Sobre Alcivan Guimarães</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Sou <span className="text-amber-500 font-semibold">Alcivan Guimarães dos Santos</span>, advogado inscrito na <span className="text-amber-500 font-semibold">OAB/SE 16.699</span>. Minha atuação combina técnica jurídica de excelência, análise detalhada de casos complexos e comunicação clara com meus clientes.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Tenho pós-graduação em <span className="text-amber-500 font-semibold">Direito Penal e Processo Penal</span>, atuando em investigações, audiências, medidas urgentes e Tribunal do Júri com estratégia de alto nível.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Também sou pós-graduado em <span className="text-amber-500 font-semibold">Direito Municipal</span> e <span className="text-amber-500 font-semibold">Contratos e Licitações</span>, oferecendo expertise consolidada em múltiplas áreas do direito.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Baseio meu trabalho em três pilares: <span className="text-amber-500 font-semibold">transparência, estratégia e agilidade</span>. Meu objetivo é oferecer segurança jurídica e conduzir cada cliente com clareza em todas as etapas do processo.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="card-premium text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">OAB/SE</div>
                <div className="text-slate-300">16.699</div>
              </div>
              <div className="card-premium text-center">
                <div className="text-2xl font-bold text-amber-500 mb-2">Especialidades</div>
                <div className="text-slate-300 text-sm">Penal, Municipal, Contratos</div>
              </div>
              <div className="card-premium text-center">
                <div className="text-2xl font-bold text-amber-500 mb-2">Atuação</div>
                <div className="text-slate-300 text-sm">Todo o Brasil</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="areas" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-white mb-4">Áreas de Atuação</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Atendimento remoto, estratégico e com clareza em todas as etapas
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="card-premium group"
                  style={{
                    animation: isLoaded ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading-sm text-white mb-2">{service.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="diferenciais" className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-white mb-4">Nossos Diferenciais</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Atendimento estratégico, defesa técnica personalizada e comunicação clara
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentials.map((diff, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-300"
                style={{
                  animation: isLoaded ? `fadeInUp 0.6s ease-out ${index * 0.08}s both` : 'none'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-500/30 rounded-full mt-1"></div>
                  <div>
                    <h3 className="text-heading-sm text-white mb-2">{diff.title}</h3>
                    <p className="text-slate-400 text-sm">{diff.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/about-section-bg-LckbCfnhG2cKc7iGNUWhwH.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-white mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Depoimentos de clientes satisfeitos que confiaram em nossa advocacia estratégica
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-premium flex flex-col"
                style={{
                  animation: isLoaded ? `fadeInUp 0.6s ease-out ${index * 0.08}s both` : 'none'
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4"></div>

                {/* Author Info */}
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-amber-500 text-xs">{testimonial.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/services-accent-HhKy4dMjYbGBJFqnbA3MwE.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-display-lg text-white">
              Confiança, Estratégia e <span className="text-amber-500">Posicionamento Premium</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Cada caso é tratado com a máxima seriedade e profissionalismo. Utilizamos análise técnica profunda, estratégia jurídica inovadora e comunicação transparente para garantir os melhores resultados para nossos clientes.
            </p>
            <div className="pt-4">
              <div className="inline-block px-6 py-3 rounded-lg border-2 border-amber-500 text-amber-500 font-semibold">
                Advocacia de Alto Nível
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/cta-background-MvTmyTtcT3GnfxThMjJeVT.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-display-lg text-white">
              Seu Caso Exige <span className="text-amber-500">Estratégia Jurídica de Alto Nível</span>
            </h2>
            <p className="text-lg text-slate-300">
              Agende uma consulta com Alcivan Guimarães e descubra como a advocacia estratégica pode transformar seu caso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <a
                  href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20gostaria%20de%20agendar%20uma%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-2"
                >
                  Falar no WhatsApp
                  <ChevronRight size={18} />
                </a>
              <Link href="/agendamento">
                <a className="btn-premium-outline flex items-center justify-center gap-2 text-lg">
                  Agendar Consulta
                  <ChevronRight size={18} />
                </a>
              </Link>
            </div>

            <div className="pt-8 space-y-2 text-slate-400">
              <p className="text-sm">Atendimento remoto em todo o Brasil</p>
              <p className="text-sm">Resposta rápida e profissional garantida</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
