# Configuração do Sistema de Agendamento Online

## Visão Geral

O sistema de agendamento online permite que clientes marquem consultas jurídicas diretamente no site. O sistema é integrado com WhatsApp para confirmação final.

---

## 1. Como Funciona

### Fluxo do Usuário

1. **Seleção de Área**: Cliente escolhe a área de direito (Penal, Civil, etc.)
2. **Seleção de Data**: Cliente escolhe uma data disponível (próximos 14 dias úteis)
3. **Seleção de Horário**: Cliente escolhe um horário disponível
4. **Confirmação de Dados**: Cliente preenche nome, e-mail, telefone e descrição breve do caso
5. **Redirecionamento WhatsApp**: Cliente é redirecionado para WhatsApp para confirmar o agendamento

### Dados Coletados

- Nome completo
- E-mail
- Telefone/WhatsApp
- Área de direito
- Data desejada
- Horário desejado
- Descrição breve do caso
- Consentimento para processamento de dados

---

## 2. Integração com Google Agenda (Opcional)

Para integração automática com Google Agenda, siga os passos abaixo:

### Passo 1: Criar uma Conta de Serviço no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a API do Google Calendar
4. Crie uma chave de serviço (JSON)

### Passo 2: Configurar Variáveis de Ambiente

Adicione as seguintes variáveis ao arquivo `.env`:

```env
GOOGLE_CALENDAR_ID=seu-email@gmail.com
GOOGLE_CALENDAR_API_KEY=sua-chave-api
GOOGLE_CALENDAR_SERVICE_ACCOUNT_EMAIL=seu-service-account@seu-projeto.iam.gserviceaccount.com
GOOGLE_CALENDAR_PRIVATE_KEY=sua-chave-privada
```

### Passo 3: Implementar Backend (Futuro)

Quando o projeto for atualizado para incluir backend, adicione um endpoint que:

1. Receba os dados do agendamento
2. Crie um evento no Google Calendar
3. Envie confirmação por e-mail

---

## 3. Horários Disponíveis

Os horários disponíveis são:

- **Manhã**: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30
- **Tarde**: 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00

**Nota**: Você pode personalizar esses horários editando o array `horarioDisponivel` no arquivo `client/src/pages/Scheduling.tsx`.

---

## 4. Datas Disponíveis

O sistema oferece automaticamente os próximos 14 dias úteis (segunda a sexta-feira).

**Nota**: Você pode personalizar o período editando a função `obterProximosDias()` no arquivo `client/src/pages/Scheduling.tsx`.

---

## 5. Rastreamento de Agendamentos

O sistema rastreia automaticamente:

- **Google Analytics**: Evento `schedule_consultation` quando o agendamento é confirmado
- **Facebook Pixel**: Evento `Lead` com informações do agendamento

---

## 6. Fluxo de WhatsApp

Quando o cliente confirma o agendamento, ele é redirecionado para WhatsApp com uma mensagem pré-preenchida contendo:

- Nome do cliente
- E-mail
- Telefone
- Área de direito
- Data desejada
- Horário desejado
- Descrição do caso

**URL do WhatsApp**: `https://wa.me/5579988614298`

**Nota**: Substitua o número de telefone pelo seu número de WhatsApp no arquivo `client/src/pages/Scheduling.tsx`.

---

## 7. Personalização

### Alterar Número de WhatsApp

Abra `client/src/pages/Scheduling.tsx` e procure por:

```typescript
window.open(`https://wa.me/5579988614298?text=${mensagemWhatsApp}`, '_blank');
```

Substitua `5579988614298` pelo seu número de WhatsApp (sem espaços ou caracteres especiais).

### Alterar Horários Disponíveis

Procure por:

```typescript
const horarioDisponivel = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];
```

Adicione ou remova horários conforme necessário.

### Alterar Período de Dias Disponíveis

Procure pela função `obterProximosDias()` e altere o valor `14` para o número de dias desejado.

---

## 8. Validação de Dados

O sistema valida automaticamente:

- ✓ Nome completo (obrigatório)
- ✓ E-mail válido (obrigatório)
- ✓ Telefone (obrigatório)
- ✓ Descrição do caso (obrigatório, mínimo 10 caracteres)
- ✓ Consentimento (obrigatório)

---

## 9. Mensagens de Erro

O sistema exibe mensagens de erro claras para:

- Campos obrigatórios não preenchidos
- E-mail em formato inválido
- Consentimento não marcado

---

## 10. Responsividade

O sistema de agendamento é totalmente responsivo e funciona perfeitamente em:

- Desktop
- Tablet
- Mobile

---

## 11. Acessibilidade

O sistema inclui:

- ✓ Navegação por teclado
- ✓ Labels descritivos
- ✓ Mensagens de erro acessíveis
- ✓ Contraste adequado de cores

---

## 12. Próximas Melhorias

Para futuras versões, considere adicionar:

1. **Integração com Google Calendar** - Sincronizar automaticamente com sua agenda
2. **Confirmação por E-mail** - Enviar confirmação automática para o cliente
3. **SMS de Lembrança** - Enviar SMS 24 horas antes da consulta
4. **Pagamento Online** - Integrar Stripe para pagamento da consulta
5. **Múltiplos Advogados** - Permitir agendamento com diferentes advogados
6. **Bloqueio de Horários** - Bloquear horários já agendados

---

## 13. Troubleshooting

### O agendamento não está funcionando

1. Verifique se o número de WhatsApp está correto
2. Verifique se todos os campos obrigatórios estão preenchidos
3. Verifique o console do navegador para erros

### O WhatsApp não abre

1. Certifique-se de que o WhatsApp está instalado no dispositivo
2. Verifique se o número de telefone está no formato correto (com código do país)

### As datas não aparecem

1. Verifique se a função `obterProximosDias()` está configurada corretamente
2. Certifique-se de que não está filtrando fins de semana desnecessariamente

---

## 14. Suporte

Para dúvidas ou problemas, entre em contato através do WhatsApp ou e-mail.

---

**Última atualização**: 07 de maio de 2026
