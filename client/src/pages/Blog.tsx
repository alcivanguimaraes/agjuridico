import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Search, Calendar, User, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'wouter';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const articles = [
    {
      id: 1,
      title: 'Direitos e Deveres do Acusado em Investigação Criminal',
      excerpt: 'Entenda quais são seus direitos fundamentais durante uma investigação criminal e como uma defesa técnica adequada pode protegê-lo desde o início do processo.',
      category: 'Direito Penal',
      date: '15 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '8 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/hero-background-JEoFMPTX3UGhqrC2oxoVCX.webp'
    },
    {
      id: 2,
      title: 'Tribunal do Júri: Estratégias de Defesa que Funcionam',
      excerpt: 'Descubra as estratégias mais eficazes para uma defesa bem-sucedida no Tribunal do Júri, desde a seleção de jurados até a oratória persuasiva.',
      category: 'Tribunal do Júri',
      date: '12 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '10 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/services-accent-HhKy4dMjYbGBJFqnbA3MwE.webp'
    },
    {
      id: 3,
      title: 'Responsabilidade Civil: Como Proteger Seu Patrimônio',
      excerpt: 'Saiba como funcionam as ações de responsabilidade civil e quais medidas você pode tomar para proteger seu patrimônio de possíveis reclamações.',
      category: 'Direito Civil',
      date: '10 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '7 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/about-section-bg-LckbCfnhG2cKc7iGNUWhwH.webp'
    },
    {
      id: 4,
      title: 'Contratos: Cláusulas Essenciais que Você Não Pode Ignorar',
      excerpt: 'Conheça as cláusulas mais importantes em contratos comerciais e como evitar armadilhas jurídicas que podem prejudicar seus negócios.',
      category: 'Contratos',
      date: '8 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '9 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/cta-background-MvTmyTtcT3GnfxThMjJeVT.webp'
    },
    {
      id: 5,
      title: 'Licitações Públicas: Guia Completo para Participantes',
      excerpt: 'Tudo o que você precisa saber sobre participação em licitações públicas, desde a documentação necessária até estratégias de defesa em recursos.',
      category: 'Licitações',
      date: '5 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '11 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/hero-background-JEoFMPTX3UGhqrC2oxoVCX.webp'
    },
    {
      id: 6,
      title: 'Direito Municipal: Direitos e Deveres do Servidor Público',
      excerpt: 'Conheça os principais direitos e deveres dos servidores públicos municipais e como se defender em processos administrativos.',
      category: 'Direito Municipal',
      date: '2 de Maio de 2026',
      author: 'Alcivan Guimarães',
      readTime: '8 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/services-accent-HhKy4dMjYbGBJFqnbA3MwE.webp'
    },
    {
      id: 7,
      title: 'Reclamação Trabalhista: Seus Direitos Como Trabalhador',
      excerpt: 'Saiba quais são seus direitos trabalhistas e como proceder em caso de demissão injusta, atraso de salário ou outras violações.',
      category: 'Direito Trabalhista',
      date: '30 de Abril de 2026',
      author: 'Alcivan Guimarães',
      readTime: '7 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/about-section-bg-LckbCfnhG2cKc7iGNUWhwH.webp'
    },
    {
      id: 8,
      title: 'Medidas Urgentes: Quando e Como Solicitá-las',
      excerpt: 'Entenda quando é possível solicitar medidas urgentes (liminares, cautelares) e como elas podem proteger seus direitos imediatamente.',
      category: 'Direito Penal',
      date: '28 de Abril de 2026',
      author: 'Alcivan Guimarães',
      readTime: '6 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/cta-background-MvTmyTtcT3GnfxThMjJeVT.webp'
    },
    {
      id: 9,
      title: 'Processo Administrativo: Como Se Defender Adequadamente',
      excerpt: 'Guia completo sobre processos administrativos, seus direitos de defesa e as melhores estratégias para proteger sua reputação profissional.',
      category: 'Direito Municipal',
      date: '25 de Abril de 2026',
      author: 'Alcivan Guimarães',
      readTime: '9 min',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663524478716/VAuATCwBniSfiFUJ7Dko6L/hero-background-JEoFMPTX3UGhqrC2oxoVCX.webp'
    }
  ];

  const categories = [
    'todos',
    'Direito Penal',
    'Tribunal do Júri',
    'Direito Civil',
    'Contratos',
    'Licitações',
    'Direito Municipal',
    'Direito Trabalhista'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
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
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-display-lg text-white">
              Blog Jurídico <span className="text-amber-500">Estratégico</span>
            </h1>
            <p className="text-lg text-slate-300">
              Artigos, análises e orientações sobre temas jurídicos relevantes para sua proteção legal
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-slate-900/50 sticky top-24 z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {category === 'todos' ? 'Todos os Artigos' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="card-premium flex flex-col overflow-hidden group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 flex flex-col">
                    <h3 className="text-heading-sm text-white mb-3 group-hover:text-amber-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-3 pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                        <span className="text-amber-500">•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4 flex items-center gap-2 text-amber-500 font-semibold text-sm group-hover:gap-3 transition-all">
                      Ler Artigo
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg mb-4">Nenhum artigo encontrado com esses critérios.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todos');
                }}
                className="text-amber-500 hover:text-amber-400 font-semibold"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
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
              Precisa de Orientação <span className="text-amber-500">Jurídica Especializada?</span>
            </h2>
            <p className="text-lg text-slate-300">
              Nossos artigos são informativos, mas cada caso é único. Agende uma consulta para uma análise personalizada da sua situação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20li%20seus%20artigos%20e%20gostaria%20de%20agendar%20uma%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex items-center justify-center gap-2 text-lg"
              >
                Falar no WhatsApp
                <ChevronRight size={20} />
              </a>
              <Link href="/">
                <a className="btn-premium-outline flex items-center justify-center gap-2 text-lg">
                  Voltar ao Início
                  <ChevronRight size={20} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
