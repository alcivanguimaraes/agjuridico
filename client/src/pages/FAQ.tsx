import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'wouter';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: 'Serviços',
      question: 'Quais são as principais áreas de atuação?',
      answer: 'Atuamos em Direito Penal (investigações e Tribunal do Júri), Direito Civil (indenizações e responsabilidade civil), Contratos e Licitações, Direito Municipal (processos administrativos) e Direito Trabalhista (reclamações e acordos). Oferecemos atendimento remoto em todo o Brasil com expertise técnica consolidada.'
    },
    {
      id: 2,
      category: 'Serviços',
      question: 'Vocês atendem apenas online ou também presencialmente?',
      answer: 'Oferecemos atendimento remoto em todo o Brasil via WhatsApp, videoconferência e e-mail. Isso permite que você receba orientação jurídica de qualidade premium sem necessidade de deslocamento. Quando necessário, podemos coordenar presença em audiências e procedimentos judiciais.'
    },
    {
      id: 3,
      category: 'Serviços',
      question: 'Como funciona a primeira consulta?',
      answer: 'A primeira consulta é realizada via WhatsApp ou videoconferência. Você descreve sua situação jurídica, seus objetivos e preocupações. Analisamos o caso com profundidade, explicamos as opções estratégicas disponíveis e apresentamos um plano de ação claro. Essa consulta permite que você entenda melhor sua situação antes de contratar nossos serviços.'
    },
    {
      id: 4,
      category: 'Honorários',
      question: 'Como são estruturados os honorários?',
      answer: 'Oferecemos diferentes modelos de honorários conforme o tipo de caso: (1) Honorários por hora - para consultorias pontuais; (2) Honorários fixos - para casos com escopo bem definido; (3) Honorários por resultado - em casos específicos onde combinamos um valor adicional vinculado ao resultado obtido. Cada modelo é discutido e acordado na primeira consulta.'
    },
    {
      id: 5,
      category: 'Honorários',
      question: 'Qual é a faixa de valores dos honorários?',
      answer: 'Os honorários variam conforme a complexidade do caso, área de atuação e modelo escolhido. Consultorias pontuais começam a partir de valores acessíveis, enquanto casos mais complexos (Tribunal do Júri, processos administrativos) têm valores maiores. Sempre apresentamos um orçamento claro antes de iniciar o trabalho, sem surpresas.'
    },
    {
      id: 6,
      category: 'Honorários',
      question: 'Há custas processuais além dos honorários?',
      answer: 'Sim. Além dos nossos honorários, existem custas processuais (taxas judiciais, custas de cartório, etc.) que são cobradas pelo Poder Judiciário. Essas custas variam conforme o tipo de processo e são informadas com clareza. Você tem total controle sobre essas despesas e é informado antes de qualquer gasto.'
    },
    {
      id: 7,
      category: 'Procedimentos',
      question: 'Qual é o tempo médio de resolução de um caso?',
      answer: 'O tempo varia bastante conforme o tipo de caso. Consultorias pontuais podem ser resolvidas em dias. Processos judiciais podem levar meses ou anos dependendo da complexidade e instância. No Tribunal do Júri, o tempo é mais previsível. Na primeira consulta, estimamos um cronograma realista para seu caso específico.'
    },
    {
      id: 8,
      category: 'Procedimentos',
      question: 'Como funciona o acompanhamento do meu caso?',
      answer: 'Você recebe atualizações regulares sobre o andamento do seu caso. Mantemos comunicação clara via WhatsApp, e-mail ou videoconferência conforme sua preferência. Você é informado sobre prazos importantes, decisões judiciais e próximos passos. Sua segurança jurídica e tranquilidade são nossas prioridades.'
    },
    {
      id: 9,
      category: 'Procedimentos',
      question: 'Posso mudar de advogado durante o processo?',
      answer: 'Sim, você tem total liberdade para escolher seu representante legal. Se desejar trocar de advogado, é necessário formalizar essa mudança junto ao tribunal. Nós respeitamos sua autonomia e, se necessário, cooperamos na transição para garantir que seu caso não seja prejudicado.'
    },
    {
      id: 10,
      category: 'Direito Penal',
      question: 'O que fazer se fui acusado de um crime?',
      answer: 'Procure um advogado imediatamente. Seus direitos começam desde o primeiro contato com a polícia. Você tem direito a permanecer em silêncio, ter um advogado presente e não ser coagido. Uma defesa técnica adequada desde o início é crucial. Oferecemos atendimento urgente para esses casos.'
    },
    {
      id: 11,
      category: 'Direito Penal',
      question: 'Qual é a diferença entre investigação policial e processo judicial?',
      answer: 'A investigação policial é conduzida pela polícia para apurar os fatos. O processo judicial é a ação perante o tribunal onde há acusação formal e direito de defesa. Na investigação, sua defesa técnica pode influenciar decisões cruciais. No processo, você tem direitos processuais mais amplos. Ambas as fases exigem estratégia cuidadosa.'
    },
    {
      id: 12,
      category: 'Direito Penal',
      question: 'Como funciona o Tribunal do Júri?',
      answer: 'O Tribunal do Júri julga crimes contra a vida (homicídio, lesão corporal grave, etc.). Um juiz preside, mas a decisão é tomada por 7 jurados (cidadãos comuns). A defesa técnica é crucial: argumentação clara, apresentação de provas e oratória persuasiva influenciam o voto dos jurados. Temos expertise consolidada nessa área.'
    },
    {
      id: 13,
      category: 'Direito Civil',
      question: 'Como funciona uma ação de indenização?',
      answer: 'Uma ação de indenização busca reparação por dano sofrido (moral, material ou estético). É necessário provar: (1) a culpa/responsabilidade do réu; (2) o dano sofrido; (3) o nexo causal entre culpa e dano. A indenização pode ser por acordo (mais rápido) ou sentença judicial. Analisamos seu caso e indicamos o melhor caminho.'
    },
    {
      id: 14,
      category: 'Direito Civil',
      question: 'Quanto tempo leva uma ação civil?',
      answer: 'Ações civis podem levar de 1 a 5 anos ou mais, dependendo da complexidade e da instância. Acordos podem ser alcançados em meses. Primeira instância geralmente leva 2-3 anos. Se houver apelação, adiciona-se mais tempo. Buscamos sempre resolver de forma mais rápida quando possível, mas a qualidade da defesa é prioridade.'
    },
    {
      id: 15,
      category: 'Contratos',
      question: 'Vocês analisam contratos antes de assinar?',
      answer: 'Sim! Oferecemos análise de contratos comerciais, trabalhistas e administrativos. Identificamos cláusulas prejudiciais, sugerimos ajustes e explicamos suas implicações. Essa análise prévia evita problemas futuros e protege seus interesses. É um investimento pequeno que pode economizar muito dinheiro depois.'
    },
    {
      id: 16,
      category: 'Contratos',
      question: 'O que fazer se uma das partes não cumpre o contrato?',
      answer: 'Primeiro, tentamos resolver via negociação e comunicação clara. Se isso não funcionar, podemos enviar notificação formal. Se necessário, movemos ação judicial para cobrar o cumprimento ou indenização por perdas e danos. A estratégia depende do contrato, da relação entre as partes e dos objetivos.'
    },
    {
      id: 17,
      category: 'Licitações',
      question: 'Como participar de uma licitação pública?',
      answer: 'Licitações têm regras rigorosas. É necessário: (1) estar habilitado (documentação em dia); (2) atender aos requisitos técnicos; (3) apresentar proposta dentro dos prazos; (4) cumprir formalidades. Oferecemos consultoria para garantir que você atenda todos os requisitos e maximize suas chances de êxito.'
    },
    {
      id: 18,
      category: 'Licitações',
      question: 'Posso contestar o resultado de uma licitação?',
      answer: 'Sim. Se houver irregularidades, você pode apresentar recurso administrativo. Oferecemos análise de editais, identificação de ilegalidades e defesa de seus direitos. Essa defesa pode ser preventiva (antes de participar) ou reativa (se o resultado for desfavorável). Temos expertise em recursos de licitação.'
    },
    {
      id: 19,
      category: 'Direito Municipal',
      question: 'O que é um Processo Administrativo Disciplinar (PAD)?',
      answer: 'Um PAD é um processo formal para apurar conduta de servidor público. Pode resultar em advertência, suspensão ou demissão. Você tem direito à defesa técnica adequada. Oferecemos consultoria em todas as fases: investigação preliminar, defesa escrita e audiência. Uma defesa bem estruturada é crucial para proteger sua carreira.'
    },
    {
      id: 20,
      category: 'Direito Municipal',
      question: 'Quais são os direitos de um servidor público?',
      answer: 'Servidores públicos têm direitos constitucionais e legais: estabilidade (após período de experiência), direito à defesa em processos administrativos, direitos trabalhistas (férias, décimo terceiro, etc.), direito à aposentadoria. Oferecemos consultoria para garantir que seus direitos sejam respeitados pela administração.'
    },
    {
      id: 21,
      category: 'Direito Trabalhista',
      question: 'Fui demitido injustamente. O que fazer?',
      answer: 'Você pode entrar com reclamação trabalhista no prazo de 2 anos. É possível pedir: reintegração no emprego, indenização por danos morais, diferenças salariais, aviso prévio, multa do FGTS (se aplicável). Analisamos seu caso, avaliamos chances de êxito e orientamos sobre a melhor estratégia.'
    },
    {
      id: 22,
      category: 'Direito Trabalhista',
      question: 'Como funciona um acordo trabalhista?',
      answer: 'Um acordo trabalhista é uma negociação entre você e o empregador, geralmente com mediação judicial. Você abre mão de certos direitos em troca de compensação financeira. Oferecemos consultoria para garantir que qualquer acordo seja justo e proteja seus interesses. Analisamos propostas e negociamos melhores condições.'
    },
    {
      id: 23,
      category: 'Geral',
      question: 'Vocês oferecem consultoria preventiva?',
      answer: 'Sim! Consultoria preventiva é uma de nossas especialidades. Analisamos contratos, processos administrativos, documentação e situações de risco antes que se tornem problemas. Isso economiza tempo e dinheiro. Muitos clientes nos procuram para evitar problemas futuros, não apenas para resolver crises.'
    },
    {
      id: 24,
      category: 'Geral',
      question: 'Como entro em contato para agendar uma consulta?',
      answer: 'Você pode entrar em contato via WhatsApp (clique no botão flutuante do site), enviar e-mail ou preencher o formulário de contato. Respondemos rapidamente e agendamos uma consulta conforme sua disponibilidade. A primeira consulta é uma oportunidade para você conhecer nosso trabalho e avaliar se podemos ajudá-lo.'
    },
    {
      id: 25,
      category: 'Geral',
      question: 'Vocês oferecem garantia de resultado?',
      answer: 'Não oferecemos garantia de resultado, pois isso seria antiético e violaria normas da advocacia. Nenhum advogado pode garantir vitória em processos judiciais - há muitas variáveis envolvidas. O que garantimos é: trabalho técnico de qualidade, estratégia bem fundamentada, comunicação clara e dedicação total ao seu caso.'
    }
  ];

  const categories = ['todos', 'Serviços', 'Honorários', 'Procedimentos', 'Direito Penal', 'Direito Civil', 'Contratos', 'Licitações', 'Direito Municipal', 'Direito Trabalhista', 'Geral'];

  const filteredFAQ = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.answer.toLowerCase().includes(searchTerm.toLowerCase());
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
              Perguntas <span className="text-amber-500">Frequentes</span>
            </h1>
            <p className="text-lg text-slate-300">
              Respostas claras sobre nossos serviços, honorários, procedimentos jurídicos e atendimento
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
                placeholder="Buscar perguntas..."
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
                {category === 'todos' ? 'Todas as Perguntas' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {filteredFAQ.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQ.map((item) => (
                  <div
                    key={item.id}
                    className="card-premium overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="w-full flex items-start justify-between p-6 hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-1 text-left">
                        <h3 className="text-heading-sm text-white font-semibold leading-relaxed">
                          {item.question}
                        </h3>
                        <div className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                          {item.category}
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`text-amber-500 flex-shrink-0 ml-4 transition-transform duration-300 ${
                          expandedId === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedId === item.id && (
                      <div className="px-6 pb-6 border-t border-slate-700 pt-6 animate-fade-in-down">
                        <p className="text-slate-300 leading-relaxed text-base">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-400 text-lg mb-4">Nenhuma pergunta encontrada com esses critérios.</p>
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
              Não Encontrou Sua <span className="text-amber-500">Resposta?</span>
            </h2>
            <p className="text-lg text-slate-300">
              Entre em contato conosco para uma consulta personalizada. Estamos prontos para esclarecer todas as suas dúvidas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20tenho%20uma%20dúvida%20que%20não%20está%20no%20FAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex items-center justify-center gap-2 text-lg"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
              <Link href="/">
                <a className="btn-premium-outline flex items-center justify-center gap-2 text-lg">
                  Voltar ao Início
                </a>
              </Link>
            </div>

            <div className="pt-8 space-y-2 text-slate-400">
              <p className="text-sm">Resposta rápida e profissional garantida</p>
              <p className="text-sm">Atendimento remoto em todo o Brasil</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
