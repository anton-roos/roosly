// Google Analytics 4 utilities for comprehensive tracking
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'YOUR_GA_MEASUREMENT_ID';

// Initialize GA
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters,
    });
  }
};

// Track user interactions
export const trackButtonClick = (buttonName: string, section?: string) => {
  trackEvent('click', 'button', buttonName, undefined, {
    section: section || 'unknown',
  });
};

export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent('submit', 'form', formName, success ? 1 : 0, {
    success: success,
  });
};

export const trackServiceInteraction = (serviceName: string, action: 'view' | 'expand' | 'contact') => {
  trackEvent(action, 'service', serviceName);
};

export const trackNavigation = (from: string, to: string) => {
  trackEvent('navigate', 'navigation', `${from} -> ${to}`);
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'engagement', `${depth}%`, depth);
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  trackEvent('timing_complete', 'engagement', page, timeInSeconds, {
    name: 'time_on_page',
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('click', 'outbound_link', url, undefined, {
    link_text: linkText,
  });
};

// Track social interactions
export const trackSocialInteraction = (platform: string, action: 'click' | 'share' | 'follow') => {
  trackEvent(action, 'social', platform);
};

// Track errors
export const trackError = (error: string, fatal: boolean = false) => {
  trackEvent('exception', 'error', error, fatal ? 1 : 0, {
    fatal: fatal,
  });
};

// Track custom dimensions/metrics
export const setCustomDimension = (index: number, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      [`custom_map.dimension${index}`]: value,
    });
  }
};

export const setCustomMetric = (index: number, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      [`custom_map.metric${index}`]: value,
    });
  }
};

// E-commerce tracking (if needed in future)
export const trackPurchase = (transactionId: string, value: number, currency: string = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    });
  }
};

// Hook for React components
export const useAnalytics = () => {
  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackServiceInteraction,
    trackNavigation,
    trackScrollDepth,
    trackTimeOnPage,
    trackOutboundLink,
    trackSocialInteraction,
    trackError,
  };
};