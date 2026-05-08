import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { trackFormSubmission, trackScheduleConsultation } from '@/lib/analytics';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  areaDireito: string;
  tipoCase: string;
  urgencia: string;
  localizacao: string;
  descricao: string;
  dataEvento: string;
  valorEstimado: string;
  jaTemAdvogado: string;
  consentimento: boolean;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    areaDireito: '',
    tipoCase: '',
    urgencia: '',
    localizacao: '',
    descricao: '',
    dataEvento: '',
    valorEstimado: '',
    jaTemAdvogado: '',
    consentimento: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const areasOfPractice = [
    'Direito Penal',
    'Tribunal do Júri',
    'Direito Civil',
    'Contratos e Licitações',
    'Direito Municipal',
    'Direito Trabalhista',
    'Outro'
  ];

  const caseTypes = {
    'Direito Penal': ['Investigação Policial', 'Processo Criminal', 'Medida Urgente', 'Outro'],
    'Tribunal do Júri': ['Defesa em Júri', 'Preparação para Júri', 'Recurso', 'Outro'],
    'Direito Civil': ['Indenização', 'Responsabilidade Civil', 'Cobrança', 'Outro'],
    'Contratos e Licitações': ['Análise de Contrato', 'Licitação Pública', 'Disputa Contratual', 'Outro'],
    'Direito Municipal': ['Processo Administrativo', 'Consultoria', 'Defesa de Servidor', 'Outro'],
    'Direito Trabalhista': ['Reclamação Trabalhista', 'Acordo', 'Consultoria', 'Outro'],
    'Outro': ['Consultoria Geral', 'Outro']
  };

  const urgencyLevels = [
    { value: 'baixa', label: 'Baixa - Posso aguardar semanas' },
    { value: 'media', label: 'Média - Preciso de resposta em dias' },
    { value: 'alta', label: 'Alta - Preciso de resposta urgente' },
    { value: 'critica', label: 'Crítica - Situação muito urgente' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.areaDireito) newErrors.areaDireito = 'Selecione uma área de direito';
    if (!formData.tipoCase) newErrors.tipoCase = 'Selecione o tipo de caso';
    if (!formData.urgencia) newErrors.urgencia = 'Selecione o nível de urgência';
    if (!formData.localizacao.trim()) newErrors.localizacao = 'Localização é obrigatória';
    if (!formData.descricao.trim() || formData.descricao.length < 20) {
      newErrors.descricao = 'Descreva seu caso com pelo menos 20 caracteres';
    }
    if (!formData.consentimento) newErrors.consentimento = 'Você deve consentir com o processamento de dados';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Rastrear envio do formulário
      trackFormSubmission({
        areaDireito: formData.areaDireito,
        tipoCase: formData.tipoCase,
        urgencia: formData.urgencia
      });

      // Simular envio de formulário
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Rastrear clique em WhatsApp
      trackScheduleConsultation('contact_form');

      // Preparar dados para envio
      const emailBody = `
NOVO CASO QUALIFICADO - AG JURÍDICO ESTRATÉGICO

=== INFORMAÇÕES PESSOAIS ===
Nome: ${formData.nome}
E-mail: ${formData.email}
Telefone: ${formData.telefone}
Localização: ${formData.localizacao}

=== INFORMAÇÕES DO CASO ===
Área de Direito: ${formData.areaDireito}
Tipo de Caso: ${formData.tipoCase}
Nível de Urgência: ${formData.urgencia}
${formData.dataEvento ? `Data do Evento: ${formData.dataEvento}` : ''}
${formData.valorEstimado ? `Valor Estimado: ${formData.valorEstimado}` : ''}
Já tem Advogado: ${formData.jaTemAdvogado || 'Não informado'}

=== DESCRIÇÃO DO CASO ===
${formData.descricao}

=== CONSENTIMENTO ===
Consentimento para processamento de dados: Sim
      `;

      // Enviar por WhatsApp (simulado)
      const whatsappMessage = encodeURIComponent(
        `Olá Alcivan! Preenchi o formulário de contato no seu site.\n\nNome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}\nÁrea: ${formData.areaDireito}\nTipo: ${formData.tipoCase}\nUrgência: ${formData.urgencia}\n\nDescrição: ${formData.descricao}`
      );

      // Abrir WhatsApp em nova aba
      window.open(`https://wa.me/5579988614292?text=${whatsappMessage}`, '_blank');

      // Rastrear redirecionamento para WhatsApp
      console.log('Usuário redirecionado para WhatsApp com dados do formulário');

      setSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        areaDireito: '',
        tipoCase: '',
        urgencia: '',
        localizacao: '',
        descricao: '',
        dataEvento: '',
        valorEstimado: '',
        jaTemAdvogado: '',
        consentimento: false
      });

      // Resetar após 5 segundos
      setTimeout(() => setSubmitted(false), 5000);

      // Rastrear conclusão bem-sucedida do formulário
      console.log('Formulário enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Rastrear erro no envio
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'exception', {
          description: 'Form submission error',
          fatal: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar erro ao começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Resetar tipo de caso se mudar área
    if (name === 'areaDireito') {
      setFormData(prev => ({
        ...prev,
        tipoCase: ''
      }));
    }
  };

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
              Formulário de <span className="text-amber-500">Contato Avançado</span>
            </h1>
            <p className="text-lg text-slate-300">
              Preencha o formulário abaixo para que possamos qualificar seu caso e oferecer a melhor orientação jurídica
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitted && (
              <div className="mb-8 p-6 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-4 animate-fade-in-down">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-green-400 font-semibold mb-2">Formulário Enviado com Sucesso!</h3>
                  <p className="text-slate-300 text-sm">
                    Obrigado por preencher o formulário. Você será redirecionado para o WhatsApp para confirmar seu contato. Responderemos em breve com uma análise inicial do seu caso.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seção 1: Informações Pessoais */}
              <div className="card-premium p-6">
                <h2 className="text-heading-sm text-white mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">1</div>
                  Informações Pessoais
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                        errors.nome ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors`}
                    />
                    {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                          errors.email ? 'border-red-500' : 'border-slate-700'
                        } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors`}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(79) 98861-4292"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                          errors.telefone ? 'border-red-500' : 'border-slate-700'
                        } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors`}
                      />
                      {errors.telefone && <p className="text-red-400 text-sm mt-1">{errors.telefone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Localização (Cidade/Estado) *
                    </label>
                    <input
                      type="text"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleChange}
                      placeholder="Ex: Aracaju, SE"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                        errors.localizacao ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors`}
                    />
                    {errors.localizacao && <p className="text-red-400 text-sm mt-1">{errors.localizacao}</p>}
                  </div>
                </div>
              </div>

              {/* Seção 2: Informações do Caso */}
              <div className="card-premium p-6">
                <h2 className="text-heading-sm text-white mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">2</div>
                  Informações do Caso
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Área de Direito *
                      </label>
                      <select
                        name="areaDireito"
                        value={formData.areaDireito}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                          errors.areaDireito ? 'border-red-500' : 'border-slate-700'
                        } text-white focus:outline-none focus:border-amber-500 transition-colors`}
                      >
                        <option value="">Selecione uma área</option>
                        {areasOfPractice.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      {errors.areaDireito && <p className="text-red-400 text-sm mt-1">{errors.areaDireito}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Tipo de Caso *
                      </label>
                      <select
                        name="tipoCase"
                        value={formData.tipoCase}
                        onChange={handleChange}
                        disabled={!formData.areaDireito}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                          errors.tipoCase ? 'border-red-500' : 'border-slate-700'
                        } text-white focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50`}
                      >
                        <option value="">Selecione o tipo</option>
                        {formData.areaDireito && caseTypes[formData.areaDireito as keyof typeof caseTypes]?.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.tipoCase && <p className="text-red-400 text-sm mt-1">{errors.tipoCase}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nível de Urgência *
                      </label>
                      <select
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                          errors.urgencia ? 'border-red-500' : 'border-slate-700'
                        } text-white focus:outline-none focus:border-amber-500 transition-colors`}
                      >
                        <option value="">Selecione o nível</option>
                        {urgencyLevels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                      {errors.urgencia && <p className="text-red-400 text-sm mt-1">{errors.urgencia}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Data do Evento/Fato (opcional)
                      </label>
                      <input
                        type="date"
                        name="dataEvento"
                        value={formData.dataEvento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Valor Estimado do Caso (opcional)
                      </label>
                      <input
                        type="text"
                        name="valorEstimado"
                        value={formData.valorEstimado}
                        onChange={handleChange}
                        placeholder="Ex: R$ 50.000"
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Já possui advogado? (opcional)
                      </label>
                      <select
                        name="jaTemAdvogado"
                        value={formData.jaTemAdvogado}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="">Selecione</option>
                        <option value="sim">Sim, tenho advogado</option>
                        <option value="nao">Não, preciso de advogado</option>
                        <option value="talvez">Talvez, preciso de segunda opinião</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção 3: Descrição do Caso */}
              <div className="card-premium p-6">
                <h2 className="text-heading-sm text-white mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">3</div>
                  Descrição do Caso
                </h2>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Descreva seu caso em detalhes *
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seu caso. Inclua informações relevantes como: o que aconteceu, quando, quem está envolvido, qual é sua preocupação principal e o que você espera alcançar..."
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                      errors.descricao ? 'border-red-500' : 'border-slate-700'
                    } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none`}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-slate-400 text-sm">Mínimo 20 caracteres</p>
                    <p className="text-slate-400 text-sm">{formData.descricao.length} caracteres</p>
                  </div>
                  {errors.descricao && <p className="text-red-400 text-sm mt-1">{errors.descricao}</p>}
                </div>
              </div>

              {/* Seção 4: Consentimento */}
              <div className="card-premium p-6">
                <h2 className="text-heading-sm text-white mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">4</div>
                  Consentimento
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentimento"
                      checked={formData.consentimento}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded bg-slate-800 border border-slate-700 text-amber-500 focus:outline-none focus:border-amber-500 cursor-pointer"
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">
                      Autorizo o processamento de meus dados pessoais para fins de contato, análise do caso e comunicação jurídica. Entendo que meus dados serão mantidos em sigilo profissional. *
                    </span>
                  </label>
                  {errors.consentimento && <p className="text-red-400 text-sm">{errors.consentimento}</p>}

                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <p className="text-slate-400 text-xs">
                      <strong>Privacidade:</strong> Seus dados são protegidos pelo sigilo profissional e pela legislação de proteção de dados. Usaremos suas informações apenas para contato e análise do seu caso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-premium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Formulário
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
                <Link href="/">
                  <a className="btn-premium-outline flex items-center justify-center gap-2">
                    Voltar
                  </a>
                </Link>
              </div>

              <p className="text-center text-slate-400 text-sm">
                * Campos obrigatórios
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-lg text-white mb-12 text-center">Como Funciona o Processo</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Preenchimento',
                  description: 'Você preenche o formulário com informações sobre seu caso'
                },
                {
                  step: '2',
                  title: 'Qualificação',
                  description: 'Analisamos seu caso e determinamos a melhor estratégia'
                },
                {
                  step: '3',
                  title: 'Contato',
                  description: 'Entramos em contato via WhatsApp ou telefone'
                },
                {
                  step: '4',
                  title: 'Consulta',
                  description: 'Realizamos uma consulta inicial para discutir detalhes'
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-heading-sm text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
