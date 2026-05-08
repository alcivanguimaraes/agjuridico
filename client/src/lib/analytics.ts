/**
 * Analytics Configuration
 * Integração com Google Analytics e Facebook Pixel
 * 
 * INSTRUÇÕES DE CONFIGURAÇÃO:
 * 1. Substitua 'G-XXXXXXXXXX' pelo seu Google Analytics ID
 * 2. Substitua '1234567890123456' pelo seu Facebook Pixel ID
 */

// Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

/**
 * Rastrear evento de envio de formulário
 */
export const trackFormSubmission = (formData: {
  areaDireito: string;
  tipoCase: string;
  urgencia: string;
}) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submit', {
      'event_category': 'conversion',
      'event_label': 'Contact Form',
      'area_direito': formData.areaDireito,
      'tipo_case': formData.tipoCase,
      'urgencia': formData.urgencia
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: 'Contact Form Submission',
      content_category: formData.areaDireito,
      value: 1.0,
      currency: 'BRL'
    });
  }

  console.log('Form submission tracked:', formData);
};

/**
 * Rastrear clique em WhatsApp
 */
export const trackWhatsAppClick = (source: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'whatsapp_click', {
      'event_category': 'engagement',
      'event_label': 'WhatsApp Contact',
      'source': source
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Click',
      content_category: source
    });
  }

  console.log('WhatsApp click tracked from:', source);
};

/**
 * Rastrear visualização de página
 */
export const trackPageView = (pageName: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      'page_title': pageName,
      'page_path': window.location.pathname
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'PageView');
  }

  console.log('Page view tracked:', pageName);
};

/**
 * Rastrear clique em "Agendar Consulta"
 */
export const trackScheduleConsultation = (source: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'schedule_consultation', {
      'event_category': 'conversion',
      'event_label': 'Schedule Consultation',
      'source': source
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: 'Schedule Consultation',
      content_category: source
    });
  }

  console.log('Schedule consultation tracked from:', source);
};

/**
 * Rastrear visualização de artigo do blog
 */
export const trackBlogArticleView = (articleTitle: string, category: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      'event_category': 'engagement',
      'event_label': 'Blog Article',
      'item_name': articleTitle,
      'item_category': category
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', {
      content_name: articleTitle,
      content_category: category,
      content_type: 'blog_article'
    });
  }

  console.log('Blog article view tracked:', articleTitle);
};

/**
 * Rastrear visualização de FAQ
 */
export const trackFAQView = (category: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      'event_category': 'engagement',
      'event_label': 'FAQ',
      'item_category': category
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', {
      content_name: 'FAQ Page',
      content_category: category,
      content_type: 'faq'
    });
  }

  console.log('FAQ view tracked:', category);
};

/**
 * Rastrear clique em área de atuação
 */
export const trackServiceClick = (serviceName: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      'event_category': 'engagement',
      'event_label': 'Service Interest',
      'item_name': serviceName
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', {
      content_name: serviceName,
      content_category: 'legal_service',
      content_type: 'service'
    });
  }

  console.log('Service click tracked:', serviceName);
};

/**
 * Rastrear tempo de permanência na página
 */
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'engagement', {
      'event_category': 'engagement',
      'event_label': pageName,
      'engagement_time_msec': timeInSeconds * 1000
    });
  }

  console.log('Time on page tracked:', pageName, timeInSeconds + 's');
};

/**
 * Rastrear scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      'event_category': 'engagement',
      'event_label': 'Scroll Depth',
      'scroll_depth': percentage
    });
  }

  console.log('Scroll depth tracked:', percentage + '%');
};

export default {
  trackFormSubmission,
  trackWhatsAppClick,
  trackPageView,
  trackScheduleConsultation,
  trackBlogArticleView,
  trackFAQView,
  trackServiceClick,
  trackTimeOnPage,
  trackScrollDepth
};
