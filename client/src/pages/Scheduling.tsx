import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { trackScheduleConsultation } from '@/lib/analytics';

interface SchedulingData {
  nome: string;
  email: string;
  telefone: string;
  areaDireito: string;
  dataSelecionada: string;
  horarioSelecionado: string;
  descricaoBreve: string;
  consentimento: boolean;
}

export default function Scheduling() {
  const [step, setStep] = useState<'area' | 'date' | 'time' | 'info' | 'confirmation'>(
    'area'
  );
  const [schedulingData, setSchedulingData] = useState<SchedulingData>({
    nome: '',
    email: '',
    telefone: '',
    areaDireito: '',
    dataSelecionada: '',
    horarioSelecionado: '',
    descricaoBreve: '',
    consentimento: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const areasOfPractice = [
    { id: 'penal', label: 'Direito Penal', icon: '⚖️' },
    { id: 'jury', label: 'Tribunal do Júri', icon: '👥' },
    { id: 'civil', label: 'Direito Civil', icon: '📋' },
    { id: 'contracts', label: 'Contratos e Licitações', icon: '📝' },
    { id: 'municipal', label: 'Direito Municipal', icon: '🏛️' },
    { id: 'labor', label: 'Direito Trabalhista', icon: '👨‍💼' }
  ];

  const horarioDisponivel = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const obterProximosDias = () => {
    const dias = [];
    const hoje = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const data = new Date(hoje);
      data.setDate(data.getDate() + i);
      
      // Pular fins de semana
      if (data.getDay() !== 0 && data.getDay() !== 6) {
        dias.push(data);
      }
    }
    
    return dias;
  };

  const formatarData = (data: Date) => {
    return data.toISOString().split('T')[0];
  };

  const formatarDataExibicao = (data: Date) => {
    const opcoes: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    };
    return data.toLocaleDateString('pt-BR', opcoes);
  };

  const handleAreaSelect = (areaId: string) => {
    setSchedulingData(prev => ({ ...prev, areaDireito: areaId }));
    setStep('date');
  };

  const handleDateSelect = (data: string) => {
    setSchedulingData(prev => ({ ...prev, dataSelecionada: data }));
    setStep('time');
  };

  const handleTimeSelect = (horario: string) => {
    setSchedulingData(prev => ({ ...prev, horarioSelecionado: horario }));
    setStep('info');
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setSchedulingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarInfos = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!schedulingData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!schedulingData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schedulingData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!schedulingData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!schedulingData.descricaoBreve.trim()) newErrors.descricaoBreve = 'Descrição é obrigatória';
    if (!schedulingData.consentimento) newErrors.consentimento = 'Você deve consentir';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarInfos()) {
      return;
    }

    setLoading(true);

    try {
      // Rastrear agendamento
      trackScheduleConsultation('scheduling_page');

      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Preparar dados para envio
      const areaLabel = areasOfPractice.find(a => a.id === schedulingData.areaDireito)?.label;
      const dataFormatada = new Date(schedulingData.dataSelecionada).toLocaleDateString('pt-BR');

      const mensagemWhatsApp = encodeURIComponent(
        `Olá Alcivan! Gostaria de agendar uma consulta.\n\n` +
        `Nome: ${schedulingData.nome}\n` +
        `E-mail: ${schedulingData.email}\n` +
        `Telefone: ${schedulingData.telefone}\n` +
        `Área: ${areaLabel}\n` +
        `Data Desejada: ${dataFormatada}\n` +
        `Horário Desejado: ${schedulingData.horarioSelecionado}\n\n` +
        `Descrição: ${schedulingData.descricaoBreve}`
      );

      // Abrir WhatsApp
      window.open(`https://wa.me/5579988614292?text=${mensagemWhatsApp}`, '_blank');

      setSubmitted(true);
      setStep('confirmation');

      // Resetar após 5 segundos
      setTimeout(() => {
        setSchedulingData({
          nome: '',
          email: '',
          telefone: '',
          areaDireito: '',
          dataSelecionada: '',
          horarioSelecionado: '',
          descricaoBreve: '',
          consentimento: false
        });
        setStep('area');
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao agendar:', error);
    } finally {
      setLoading(false);
    }
  };

  const proximosDias = obterProximosDias();
  const areaLabel = areasOfPractice.find(a => a.id === schedulingData.areaDireito)?.label;

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
              Agende sua <span className="text-amber-500">Consulta Jurídica</span>
            </h1>
            <p className="text-lg text-slate-300">
              Escolha a data e horário que melhor se adequam à sua disponibilidade
            </p>
          </div>
        </div>
      </section>

      {/* Scheduling Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitted && (
              <div className="mb-8 p-6 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-4 animate-fade-in-down">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-green-400 font-semibold mb-2">Agendamento Confirmado!</h3>
                  <p className="text-slate-300 text-sm">
                    Você será redirecionado para o WhatsApp para confirmar seu agendamento. Entraremos em contato em breve para confirmar a data e horário.
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 ${step === 'area' ? 'text-amber-500' : 'text-slate-400'}`}>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-sm">1</div>
                  <span className="text-sm font-medium">Área</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${['date', 'time', 'info', 'confirmation'].includes(step) ? 'bg-amber-500' : 'bg-slate-700'}`} />
                <div className={`flex items-center gap-2 ${step === 'date' ? 'text-amber-500' : 'text-slate-400'}`}>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-sm">2</div>
                  <span className="text-sm font-medium">Data</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${['time', 'info', 'confirmation'].includes(step) ? 'bg-amber-500' : 'bg-slate-700'}`} />
                <div className={`flex items-center gap-2 ${step === 'time' ? 'text-amber-500' : 'text-slate-400'}`}>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-sm">3</div>
                  <span className="text-sm font-medium">Horário</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${['info', 'confirmation'].includes(step) ? 'bg-amber-500' : 'bg-slate-700'}`} />
                <div className={`flex items-center gap-2 ${['info', 'confirmation'].includes(step) ? 'text-amber-500' : 'text-slate-400'}`}>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-sm">4</div>
                  <span className="text-sm font-medium">Confirmação</span>
                </div>
              </div>
            </div>

            {/* Step 1: Area Selection */}
            {step === 'area' && (
              <div className="card-premium p-8 space-y-6">
                <h2 className="text-heading-md text-white">Selecione a Área de Atuação</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areasOfPractice.map(area => (
                    <button
                      key={area.id}
                      onClick={() => handleAreaSelect(area.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        schedulingData.areaDireito === area.id
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-700 bg-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{area.icon}</div>
                      <div className="font-semibold text-white">{area.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {step === 'date' && (
              <div className="card-premium p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading-md text-white">Selecione a Data</h2>
                  <button
                    onClick={() => setStep('area')}
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                  >
                    ← Voltar
                  </button>
                </div>
                <p className="text-slate-400">Área selecionada: <span className="text-amber-500 font-semibold">{areaLabel}</span></p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {proximosDias.map((data, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(formatarData(data))}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        schedulingData.dataSelecionada === formatarData(data)
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-700 bg-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="text-sm font-semibold text-white">{formatarDataExibicao(data)}</div>
                      <div className="text-xs text-slate-400 mt-1">{data.getDate()} de {data.toLocaleDateString('pt-BR', { month: 'short' })}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {step === 'time' && (
              <div className="card-premium p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading-md text-white">Selecione o Horário</h2>
                  <button
                    onClick={() => setStep('date')}
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                  >
                    ← Voltar
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-400">Área: <span className="text-amber-500 font-semibold">{areaLabel}</span></p>
                  <p className="text-slate-400">Data: <span className="text-amber-500 font-semibold">{new Date(schedulingData.dataSelecionada).toLocaleDateString('pt-BR')}</span></p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {horarioDisponivel.map(horario => (
                    <button
                      key={horario}
                      onClick={() => handleTimeSelect(horario)}
                      className={`p-3 rounded-lg border-2 transition-all text-center font-semibold ${
                        schedulingData.horarioSelecionado === horario
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                          : 'border-slate-700 bg-slate-800 text-white hover:border-amber-500/50'
                      }`}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Information */}
            {step === 'info' && (
              <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading-md text-white">Confirme seus Dados</h2>
                  <button
                    type="button"
                    onClick={() => setStep('time')}
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium"
                  >
                    ← Voltar
                  </button>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar size={16} className="text-amber-500" />
                    <span>{areaLabel} • {new Date(schedulingData.dataSelecionada).toLocaleDateString('pt-BR')} às {schedulingData.horarioSelecionado}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={schedulingData.nome}
                      onChange={handleInfoChange}
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
                        value={schedulingData.email}
                        onChange={handleInfoChange}
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
                        value={schedulingData.telefone}
                        onChange={handleInfoChange}
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
                      Descrição Breve do Caso *
                    </label>
                    <textarea
                      name="descricaoBreve"
                      value={schedulingData.descricaoBreve}
                      onChange={handleInfoChange}
                      placeholder="Descreva brevemente o motivo da consulta..."
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-800 border ${
                        errors.descricaoBreve ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none`}
                    />
                    {errors.descricaoBreve && <p className="text-red-400 text-sm mt-1">{errors.descricaoBreve}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentimento"
                      checked={schedulingData.consentimento}
                      onChange={handleInfoChange}
                      className="mt-1 w-5 h-5 rounded bg-slate-800 border border-slate-700 text-amber-500 focus:outline-none focus:border-amber-500 cursor-pointer"
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">
                      Autorizo o processamento de meus dados para fins de agendamento e comunicação. Entendo que meus dados serão mantidos em sigilo profissional. *
                    </span>
                  </label>
                  {errors.consentimento && <p className="text-red-400 text-sm">{errors.consentimento}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Confirmar Agendamento
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>

                <Link href="/">
                  <a className="block text-center btn-premium-outline">
                    Cancelar
                  </a>
                </Link>
              </form>
            )}

            {/* Step 5: Confirmation */}
            {step === 'confirmation' && (
              <div className="card-premium p-8 text-center space-y-6">
                <CheckCircle size={64} className="text-green-500 mx-auto" />
                <div>
                  <h2 className="text-heading-md text-white mb-2">Agendamento Realizado!</h2>
                  <p className="text-slate-300">
                    Você será redirecionado para o WhatsApp para confirmar seu agendamento. Entraremos em contato em breve.
                  </p>
                </div>
                <Link href="/">
                  <a className="btn-premium inline-flex items-center gap-2">
                    Voltar para Home
                    <ChevronRight size={18} />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-heading-lg text-white mb-12 text-center">Informações sobre Agendamento</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '⏱️',
                  title: 'Duração',
                  description: 'Consultas com duração de 30 a 60 minutos, conforme a complexidade do caso'
                },
                {
                  icon: '💬',
                  title: 'Modalidade',
                  description: 'Atendimento presencial ou remoto via WhatsApp, conforme sua preferência'
                },
                {
                  icon: '✅',
                  title: 'Confirmação',
                  description: 'Você receberá confirmação do agendamento via WhatsApp e e-mail'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
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
