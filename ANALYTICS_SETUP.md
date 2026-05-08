# Configuração de Google Analytics e Facebook Pixel

## Instruções de Integração

Este documento explica como configurar o Google Analytics e o Facebook Pixel para rastrear conversões no site AG Jurídico Estratégico.

---

## 1. Google Analytics

### Passo 1: Criar uma Propriedade no Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Clique em "Criar" e configure uma nova propriedade
3. Preencha as informações do site:
   - **Nome da Propriedade**: AG Jurídico Estratégico
   - **URL do site**: https://seu-dominio.com.br
   - **Fuso horário**: (UTC-03:00) Brasília
   - **Moeda**: BRL (Real Brasileiro)

### Passo 2: Obter o ID de Rastreamento

1. Na propriedade criada, vá para **Admin** > **Propriedades** > **Fluxos de dados**
2. Clique no fluxo de dados da web
3. Copie o **ID de Medição** (formato: G-XXXXXXXXXX)

### Passo 3: Substituir o ID no Código

Abra o arquivo `client/index.html` e substitua:

```html
<!-- Antes -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag('config', 'G-XXXXXXXXXX', {
```

```html
<!-- Depois -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
<script>
  gtag('config', 'G-SEU_ID_AQUI', {
```

### Passo 4: Configurar Eventos Personalizados

Os seguintes eventos estão configurados automaticamente:

- **form_submit**: Envio do formulário de contato
- **whatsapp_click**: Clique em links do WhatsApp
- **schedule_consultation**: Clique em "Agendar Consulta"
- **page_view**: Visualização de página
- **view_item**: Visualização de artigos, FAQ ou serviços
- **scroll**: Profundidade de scroll na página
- **engagement**: Tempo de permanência na página

---

## 2. Facebook Pixel

### Passo 1: Criar um Pixel do Facebook

1. Acesse [Facebook Business Manager](https://business.facebook.com/)
2. Vá para **Eventos** > **Pixels**
3. Clique em **Criar Pixel**
4. Preencha as informações:
   - **Nome do Pixel**: AG Jurídico Estratégico
   - **URL do site**: https://seu-dominio.com.br

### Passo 2: Obter o ID do Pixel

1. Após criar o pixel, copie o **ID do Pixel** (formato: 1234567890123456)

### Passo 3: Substituir o ID no Código

Abra o arquivo `client/index.html` e substitua:

```html
<!-- Antes -->
fbq('init', '1234567890123456'); // Substitua pelo seu Pixel ID
```

```html
<!-- Depois -->
fbq('init', 'SEU_PIXEL_ID_AQUI'); // Substitua pelo seu Pixel ID
```

### Passo 4: Configurar Eventos Personalizados

Os seguintes eventos estão configurados automaticamente:

- **PageView**: Visualização de página
- **Lead**: Envio de formulário e cliques em "Agendar Consulta"
- **Contact**: Cliques em WhatsApp
- **ViewContent**: Visualização de artigos, FAQ ou serviços

---

## 3. Eventos Rastreados

### Formulário de Contato

Quando um usuário preenche e envia o formulário:

- **Google Analytics**: Evento `form_submit` com dados:
  - `area_direito`: Área de direito selecionada
  - `tipo_case`: Tipo de caso
  - `urgencia`: Nível de urgência

- **Facebook Pixel**: Evento `Lead` com informações do caso

### Cliques em WhatsApp

Quando um usuário clica em um link do WhatsApp:

- **Google Analytics**: Evento `whatsapp_click` com a fonte
- **Facebook Pixel**: Evento `Contact`

### Visualização de Páginas

Cada página visualizada é rastreada automaticamente:

- **Google Analytics**: Evento `page_view`
- **Facebook Pixel**: Evento `PageView`

### Artigos do Blog

Quando um usuário visualiza um artigo:

- **Google Analytics**: Evento `view_item` com:
  - `item_name`: Título do artigo
  - `item_category`: Categoria do artigo

- **Facebook Pixel**: Evento `ViewContent`

### FAQ

Quando um usuário visualiza a página de FAQ:

- **Google Analytics**: Evento `view_item` com categoria
- **Facebook Pixel**: Evento `ViewContent`

---

## 4. Verificar a Integração

### Google Analytics

1. Acesse sua propriedade no Google Analytics
2. Vá para **Relatórios** > **Tempo real**
3. Visite seu site e verifique se as visualizações aparecem em tempo real

### Facebook Pixel

1. Acesse seu Pixel no Facebook Business Manager
2. Clique em **Teste o Pixel**
3. Instale a extensão do navegador e visite seu site
4. Verifique se os eventos aparecem no teste

---

## 5. Criar Conversões no Facebook

Para rastrear conversões específicas no Facebook:

1. Vá para **Eventos** > **Conversões**
2. Clique em **Criar Conversão**
3. Selecione seu Pixel
4. Configure a conversão:
   - **Nome**: Envio de Formulário de Contato
   - **Evento**: Lead
   - **Valor**: 1.0
   - **Moeda**: BRL

---

## 6. Criar Públicos Personalizados

Para criar públicos no Facebook baseado em eventos:

1. Vá para **Públicos** > **Públicos Personalizados**
2. Clique em **Criar Público Personalizado**
3. Selecione **Atividade do Pixel**
4. Configure:
   - **Evento**: Lead (para quem preencheu o formulário)
   - **Período**: Últimos 30 dias

---

## 7. Dicas de Otimização

### Google Analytics

- Configure **metas** para conversões importantes (formulário enviado, WhatsApp clicado)
- Use **segmentos** para analisar comportamento de usuários por tipo de caso
- Configure **alertas** para notificações de picos de tráfego

### Facebook Pixel

- Configure **campanhas de retargeting** para usuários que visitaram a página de formulário
- Use **lookalike audiences** para encontrar novos clientes similares aos que preencheram o formulário
- Monitore o **ROAS** (Return on Ad Spend) das campanhas

---

## 8. Troubleshooting

### Google Analytics não rastreia eventos

- Verifique se o ID de medição está correto
- Aguarde 24-48 horas para os dados aparecerem
- Verifique o console do navegador para erros

### Facebook Pixel não rastreia eventos

- Verifique se o ID do Pixel está correto
- Certifique-se de que o Pixel está aprovado
- Use a ferramenta de teste do Pixel para verificar

---

## 9. Contato e Suporte

Para dúvidas sobre a integração:

- **Google Analytics**: [Suporte do Google Analytics](https://support.google.com/analytics)
- **Facebook Pixel**: [Suporte do Facebook Business](https://www.facebook.com/help)

---

**Última atualização**: 07 de maio de 2026
