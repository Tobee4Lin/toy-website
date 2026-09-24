'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  'http://localhost:3000';

const VISITOR_KEY = 'lv_visitor_id';
const SESSION_KEY = 'lv_session_id';

// Client-side bot / automation filter (server re-checks as well).
const CLIENT_BOT_RE =
  /bot|crawl|spider|slurp|baidu|yandex|sogou|petalbot|bytespider|applebot|googleother|facebot|facebookexternal|instagram|pinterest|twitterbot|telegram|whatsapp|linkedinbot|discordbot|slackbot|duckduckgo|phantomjs|headless|selenium|puppeteer|playwright|prerender|curl|wget|python|go-http|node-fetch|axios|httpclient|libwww|monitor|preview|scan/i;

function randomId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = randomId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return randomId();
  }
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}

function isLikelyBot(): boolean {
  if (typeof window === 'undefined') return true;
  const ua = navigator.userAgent || '';
  if (!ua.includes('Mozilla')) return true;
  if (CLIENT_BOT_RE.test(ua)) return true;
  // Automated browsers (headless Chrome etc.)
  if (navigator.webdriver) return true;
  return false;
}

// Don't pollute production stats from local / LAN development.
function isPrivateHost(): boolean {
  const h = window.location.hostname;
  return (
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h.startsWith('192.168.') ||
    h.startsWith('10.') ||
    h.startsWith('169.254.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h)
  );
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const recentRef = useRef<Map<string, number>>(new Map());
  const firstEventRef = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    if (isLikelyBot()) return;
    if (isPrivateHost()) return;

    // Page is being prerendered; wait until it is actually activated.
    const doc = document as Document & { prerendering?: boolean };
    if (doc.prerendering) {
      const onChange = () => sendPageView(pathname);
      document.addEventListener('prerenderingchange', onChange, { once: true });
      return () => document.removeEventListener('prerenderingchange', onChange);
    }

    sendPageView(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function sendPageView(path: string) {
    const now = Date.now();
    const recent = recentRef.current;
    // Client-side de-dupe: same path within 30 minutes.
    const last = recent.get(path);
    if (last && now - last < 30 * 60 * 1000) return;
    recent.set(path, now);

    const isFirst = firstEventRef.current;
    firstEventRef.current = false;

    const payload = {
      path,
      // External referrer only matters on the first page of the visit.
      referrer: isFirst ? document.referrer || '' : '',
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      deviceType: getDeviceType(),
    };

    try {
      fetch(`${API_BASE}/api/public/track`, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {
        /* analytics must never break the page */
      });
    } catch {
      /* ignore */
    }
  }

  return null;
}
