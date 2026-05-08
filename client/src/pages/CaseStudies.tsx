import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Award, TrendingUp, Shield, Briefcase, CheckCircle, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'wouter';

interface CaseStudy {
  id: string;
  titulo: string;
  area: string;
  resultado: string;
  descricao: string;
  desafio: string;
  solucao: string;
  impacto: string;
  duracao: string;
  ano: number;
  destaque: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'caso-001',
    titulo: 'Absolvição em Caso de Homicídio Doloso',
    area: 'Direito Penal',
    resultado: 'Absolvição',
    descricao: 'Defesa estratégica em caso de homicídio doloso com análise técnica de perícia forense.',
    desafio: 'Cliente acusado de homicídio doloso com evidências circunstanciais e testemunhas contraditórias.',
    solucao: 'Análise minuciosa da perícia forense, questionamento de testemunhas e apresentação de prova técnica conclusiva sobre a inocência do cliente.',
    impacto: 'Absolvição total do cliente, restauração de reputação e retorno à vida profissional.',
    duracao: '8 meses',
    ano: 2024,
    destaque: true
  },
  {
    id: 'caso-002',
    titulo: 'Vitória em Tribunal do Júri - Legítima Defesa',
    area: 'Tribunal do Júri',
    resultado: 'Absolvição por Legítima Defesa',
    descricao: 'Defesa bem-sucedida em tribunal do júri com argumentação estratégica sobre legítima defesa.',
    desafio: 'Cliente acusado de lesão corporal grave em situação de legítima defesa, com julgamento por júri popular.',
    solucao: 'Preparação estratégica de argumentação, apresentação de provas técnicas e testemunhas especialistas para convencer o júri sobre a legítima defesa.',
    impacto: 'Absolvição por unanimidade do júri, reconhecimento de direito de legítima defesa.',
    duracao: '6 meses',
    ano: 2024,
    destaque: true
  },
  {
    id: 'caso-003',
    titulo: 'Recuperação de Crédito em Ação Civil',
    area: 'Direito Civil',
    resultado: 'Ganho de Causa - R$ 250.000',
    descricao: 'Ação civil para recuperação de crédito com sucesso total e condenação do devedor.',
    desafio: 'Recuperação de crédito de alto valor com devedor insolvente e documentação incompleta.',
    solucao: 'Estratégia processual agressiva, análise forense de documentos e apresentação de prova técnica de fraude.',
    impacto: 'Condenação do devedor ao pagamento de R$ 250.000 + juros e correção monetária.',
    duracao: '10 meses',
    ano: 2024,
    destaque: false
  },
  {
    id: 'caso-004',
    titulo: 'Resolução de Disputa Contratual',
    area: 'Contratos e Licitações',
    resultado: 'Acordo Favorável - R$ 180.000',
    descricao: 'Resolução de disputa contratual complexa com negociação estratégica.',
    desafio: 'Disputa contratual entre empresas com interpretações conflitantes de cláusulas contratuais.',
    solucao: 'Análise técnica de contrato, negociação estratégica e mediação com apresentação de parecer jurídico conclusivo.',
    impacto: 'Acordo favorável ao cliente no valor de R$ 180.000, evitando litígio prolongado.',
    duracao: '4 meses',
    ano: 2024,
    destaque: false
  },
  {
    id: 'caso-005',
    titulo: 'Defesa em Processo Administrativo Municipal',
    area: 'Direito Municipal',
    resultado: 'Cassação de Multa Administrativa',
    descricao: 'Defesa bem-sucedida em processo administrativo municipal contra multa indevida.',
    desafio: 'Cliente multado pela prefeitura por supostamente violar normas municipais, com processo administrativo viciado.',
    solucao: 'Identificação de vícios processuais, apresentação de prova técnica e argumentação sobre inconstitucionalidade da multa.',
    impacto: 'Cassação total da multa administrativa, reconhecimento de abuso de poder.',
    duracao: '3 meses',
    ano: 2024,
    destaque: true
  },
  {
    id: 'caso-006',
    titulo: 'Reclamação Trabalhista - Indenização por Danos Morais',
    area: 'Direito Trabalhista',
    resultado: 'Condenação - R$ 120.000 + Reintegração',
    descricao: 'Reclamação trabalhista com sucesso total em ação contra dispensa discriminatória.',
    desafio: 'Empregado dispensado de forma discriminatória sem justa causa, com empresa negando responsabilidade.',
    solucao: 'Coleta de provas de discriminação, testemunhas, análise de comunicações internas e argumentação sobre direitos trabalhistas.',
    impacto: 'Condenação da empresa ao pagamento de R$ 120.000 por danos morais e reintegração do empregado.',
    duracao: '7 meses',
    ano: 2024,
    destaque: false
  },
  {
    id: 'caso-007',
    titulo: 'Defesa em Processo de Fraude Fiscal',
    area: 'Direito Penal',
    resultado: 'Redução de Pena - 50%',
    descricao: 'Defesa estratégica em processo de fraude fiscal com negociação de redução de pena.',
    desafio: 'Cliente acusado de fraude fiscal com evidências de irregularidades contábeis.',
    solucao: 'Análise técnica de contabilidade, negociação com ministério público e apresentação de programa de conformidade.',
    impacto: 'Redução de 50% da pena, acordo com ministério público para programa de conformidade.',
    duracao: '9 meses',
    ano: 2024,
    destaque: false
  },
  {
    id: 'caso-008',
    titulo: 'Vitória em Apelação - Reforma de Sentença',
    area: 'Direito Civil',
    resultado: 'Reforma de Sentença - Ganho de Causa',
    descricao: 'Apelação bem-sucedida com reforma total da sentença de primeira instância.',
    desafio: 'Sentença desfavorável em primeira instância em ação de indenização por acidente.',
    solucao: 'Análise técnica de perícia, apresentação de novo parecer de especialista e argumentação jurídica inovadora.',
    impacto: 'Reforma da sentença em apelação, condenação da parte contrária ao pagamento de indenização.',
    duracao: '11 meses',
    ano: 2024,
    destaque: true
  },
  {
    id: 'caso-009',
    titulo: 'Defesa em Ação de Licitação Fraudulenta',
    area: 'Contratos e Licitações',
    resultado: 'Anulação de Licitação - Vitória',
    descricao: 'Defesa bem-sucedida em ação contra licitação fraudulenta com anulação do processo.',
    desafio: 'Cliente prejudicado por licitação fraudulenta com participação de empresa concorrente com vantagem indevida.',
    solucao: 'Investigação técnica de irregularidades, análise de documentos e apresentação de prova de fraude.',
    impacto: 'Anulação da licitação fraudulenta, novo processo licitatório com vitória do cliente.',
    duracao: '5 meses',
    ano: 2024,
    destaque: false
  },
  {
    id: 'caso-010',
    titulo: 'Defesa em Tribunal do Júri - Homicídio Privilegiado',
    area: 'Tribunal do Júri',
    resultado: 'Condenação Reduzida - Homicídio Privilegiado',
    descricao: 'Defesa estratégica em tribunal do júri com reconhecimento de homicídio privilegiado.',
    desafio: 'Cliente acusado de homicídio doloso com possibilidade de reconhecimento de privilégio.',
    solucao: 'Argumentação estratégica sobre circunstâncias atenuantes, apresentação de prova técnica e convencimento do júri.',
    impacto: 'Reconhecimento de homicídio privilegiado com redução significativa de pena.',
    duracao: '7 meses',
    ano: 2024,
    destaque: false
  }
];

export default function CaseStudies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const areas = ['Direito Penal', 'Tribunal do Júri', 'Direito Civil', 'Contratos e Licitações', 'Direito Municipal', 'Direito Trabalhista'];

  const filteredCases = useMemo(() => {
    return caseStudies.filter(caseStudy => {
      const matchesSearch = caseStudy.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = !selectedArea || caseStudy.area === selectedArea;
      return matchesSearch && matchesArea;
    });
  }, [searchTerm, selectedArea]);

  const destaques = caseStudies.filter(c => c.destaque);

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
              Estudos de <span className="text-amber-500">Caso</span>
            </h1>
            <p className="text-lg text-slate-300">
              Conheça os resultados alcançados em processos bem-sucedidos
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-heading-lg text-white mb-12 text-center">Casos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destaques.map(caseStudy => (
              <div
                key={caseStudy.id}
                className="card-premium p-6 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer group"
                onClick={() => setExpandedCase(expandedCase === caseStudy.id ? null : caseStudy.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-amber-500 mb-2">{caseStudy.area}</div>
                    <h3 className="text-heading-sm text-white group-hover:text-amber-500 transition-colors">{caseStudy.titulo}</h3>
                  </div>
                  <Award className="text-amber-500 flex-shrink-0 ml-2" size={24} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-green-400">{caseStudy.resultado}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{caseStudy.descricao}</p>

                  {expandedCase === caseStudy.id && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-3 animate-fade-in-down">
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Desafio</h4>
                        <p className="text-sm text-slate-300">{caseStudy.desafio}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Solução</h4>
                        <p className="text-sm text-slate-300">{caseStudy.solucao}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Impacto</h4>
                        <p className="text-sm text-slate-300">{caseStudy.impacto}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-slate-400 pt-2">
                        <span>⏱️ {caseStudy.duracao}</span>
                        <span>📅 {caseStudy.ano}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-heading-lg text-white text-center">Explore Todos os Casos</h2>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Area Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedArea(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedArea === null
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Todas as Áreas
              </button>
              {areas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(selectedArea === area ? null : area)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedArea === area
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Cases */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCases.map(caseStudy => (
              <div
                key={caseStudy.id}
                className="card-premium p-6 hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
                onClick={() => setExpandedCase(expandedCase === caseStudy.id ? null : caseStudy.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                        {caseStudy.area}
                      </span>
                      {caseStudy.destaque && (
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                          Destaque
                        </span>
                      )}
                    </div>
                    <h3 className="text-heading-sm text-white hover:text-amber-500 transition-colors">{caseStudy.titulo}</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-green-400">{caseStudy.resultado}</span>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-2">{caseStudy.descricao}</p>

                  {expandedCase === caseStudy.id && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-3 animate-fade-in-down">
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Desafio</h4>
                        <p className="text-sm text-slate-300">{caseStudy.desafio}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Solução Aplicada</h4>
                        <p className="text-sm text-slate-300">{caseStudy.solucao}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-amber-500 mb-1">Impacto Alcançado</h4>
                        <p className="text-sm text-slate-300">{caseStudy.impacto}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-slate-400 pt-2 border-t border-slate-700">
                        <span className="flex items-center gap-1">⏱️ {caseStudy.duracao}</span>
                        <span className="flex items-center gap-1">📅 {caseStudy.ano}</span>
                      </div>
                    </div>
                  )}

                  {expandedCase !== caseStudy.id && (
                    <button className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1 mt-2">
                      Ver detalhes <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Nenhum caso encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-heading-lg text-white">Seu Caso Também Pode Ser um Sucesso</h2>
            <p className="text-lg text-slate-300">
              Conheça como podemos ajudar com estratégia jurídica de alto nível
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/agendamento">
                <a className="btn-premium inline-flex items-center justify-center gap-2">
                  Agendar Consulta
                  <ChevronRight size={18} />
                </a>
              </Link>
              <a
                href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-outline inline-flex items-center justify-center gap-2"
              >
                Falar no WhatsApp
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '⚖️', label: 'Casos Resolvidos', value: '150+' },
              { icon: '🏆', label: 'Taxa de Sucesso', value: '92%' },
              { icon: '💰', label: 'Valores Recuperados', value: 'R$ 15M+' },
              { icon: '⏱️', label: 'Anos de Experiência', value: '15+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-heading-md text-amber-500 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
