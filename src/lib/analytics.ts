// Google Analytics 4 utilities for comprehensive tracking

type GtagCommand = 'config' | 'event' | 'js';
type EventAction = 'click' | 'submit' | 'view' | 'expand' | 'contact' | 'navigate' | 'scroll' | 'timing_complete' | 'share' | 'follow' | 'exception';

declare global {
  interface Window {
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Helper to check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && Boolean(GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (!isGtagAvailable() || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  action: EventAction,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, unknown>
): void => {
  if (!isGtagAvailable()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters,
  });
};

// Track user interactions
export const trackButtonClick = (buttonName: string, section?: string): void => {
  trackEvent('click', 'button', buttonName, undefined, {
    section: section || 'unknown',
  });
};

export const trackFormSubmit = (formName: string, success: boolean = true): void => {
  trackEvent('submit', 'form', formName, success ? 1 : 0, {
    success: success,
  });
};

export const trackServiceInteraction = (serviceName: string, action: 'view' | 'expand' | 'contact'): void => {
  trackEvent(action, 'service', serviceName);
};

export const trackNavigation = (from: string, to: string): void => {
  trackEvent('navigate', 'navigation', `${from} -> ${to}`);
};

// Track scroll depth
export const trackScrollDepth = (depth: number): void => {
  trackEvent('scroll', 'engagement', `${depth}%`, depth);
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, page: string): void => {
  trackEvent('timing_complete', 'engagement', page, timeInSeconds, {
    name: 'time_on_page',
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string): void => {
  trackEvent('click', 'outbound_link', url, undefined, {
    link_text: linkText,
  });
};

// Track social interactions
export const trackSocialInteraction = (platform: string, action: 'click' | 'share' | 'follow'): void => {
  trackEvent(action, 'social', platform);
};

// Track errors
export const trackError = (error: string, fatal: boolean = false): void => {
  trackEvent('exception', 'error', error, fatal ? 1 : 0, {
    fatal: fatal,
  });
}
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