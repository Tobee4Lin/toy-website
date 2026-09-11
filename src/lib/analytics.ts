// Analytics abstraction layer - easily connect GA/GTM later
// In dev mode, events are logged; in production, silently drop unless a provider is connected.

type EventName =
  | 'product_view'
  | 'add_to_selection'
  | 'remove_from_selection'
  | 'quick_inquiry_open'
  | 'inquiry_submit'
  | 'catalog_form_open'
  | 'catalog_download'
  | 'whatsapp_click'
  | 'request_quote_click'
  | 'market_page_view';

interface EventProps {
  [key: string]: string | number | boolean | undefined;
}

function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function trackEvent(name: EventName, props: EventProps = {}): void {
  if (isDev()) {
    console.info(`[analytics] ${name}`, JSON.stringify(props));
  }
  // Future: window.dataLayer?.push({ event: name, ...props });
  // Future: gtag('event', name, props);
}
