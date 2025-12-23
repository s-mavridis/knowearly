// Frontend analytics with dual persistence:
// - PRIMARY: Saves to Supabase database (permanent storage)
// - BACKUP: Also saves to localStorage (offline fallback)
// - Generates anon_id (persisted) and session_id (per tab session)
// - Tracks events with timestamp, path, and custom properties
// - Provides helpers for page views and dwell time measurement

import { supabase } from "@/integrations/supabase/client";

type AnalyticsEvent = {
  id: string;
  ts: number;
  event: string;
  page: string;
  anon_id: string;
  session_id: string;
  properties?: Record<string, unknown>;
};

const EVENTS_KEY = "ke_events";
const ANON_ID_KEY = "ke_anon_id";
const SESSION_ID_KEY = "ke_session_id";
const QUIZ_KEY = "ke_last_quiz";

function uuid(): string {
  // RFC4122-ish simple UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getAnonId(): string {
  let anon = localStorage.getItem(ANON_ID_KEY);
  if (!anon) {
    anon = uuid();
    localStorage.setItem(ANON_ID_KEY, anon);
  }
  return anon;
}

export function getSessionId(): string {
  let session = sessionStorage.getItem(SESSION_ID_KEY);
  if (!session) {
    session = uuid();
    sessionStorage.setItem(SESSION_ID_KEY, session);
  }
  return session;
}

export function initSession(): { anonId: string; sessionId: string } {
  const anonId = getAnonId();
  const sessionId = getSessionId();
  // Optionally record a session_start once per tab
  if (!sessionStorage.getItem("ke_session_started")) {
    sessionStorage.setItem("ke_session_started", "1");
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source");
    const utm_campaign = urlParams.get("utm_campaign");
    track("session_start", {
      referrer: document.referrer || null,
      utm_source,
      utm_campaign,
    });
  }
  return { anonId, sessionId };
}

/**
 * Sends analytics event to Supabase database
 * runs asynchronously so it doesn't slow down the user experience
 * If it fails, the event is still saved in localStorage as a backup
 */
async function sendToDatabase(event: AnalyticsEvent): Promise<void> {
  try {
    // Get UTM parameters from current URL (for marketing attribution)
    const urlParams = new URLSearchParams(window.location.search);

    // Insert the event into the analytics_events table
    // Using 'as any' to bypass strict type checking since analytics_events table was just added
    const { error } = await supabase.from("analytics_events" as any).insert({
      anon_id: event.anon_id,
      session_id: event.session_id,
      event_name: event.event,
      page_path: event.page,
      properties: event.properties || {},
      utm_source: urlParams.get("utm_source"),
      utm_campaign: urlParams.get("utm_campaign"),
      referrer: document.referrer || null,
    } as any);

    if (error) {
      // Log error to console for debugging, but don't break user experience
      console.warn("[analytics] Failed to save to database:", error.message);
    } else {
      // Success! Event is now permanently stored
      console.log("[analytics] ✓ Saved to database:", event.event);
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
    console.warn("[analytics] Exception sending to database:", error);
  }
}

export function track(event: string, properties?: Record<string, unknown>): void {
  try {
    const ev: AnalyticsEvent = {
      id: uuid(),
      ts: Date.now(),
      event,
      page: window.location.pathname,
      anon_id: getAnonId(),
      session_id: getSessionId(),
      properties,
    };
    // STEP 1: Save to localStorage (backup/offline support)
    const raw = localStorage.getItem(EVENTS_KEY);
    const list: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    list.push(ev);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(list));

    // STEP 2: Send to Supabase database (permanent storage)
    // This runs in the background and doesn't block the user
    sendToDatabase(ev);

    // STEP 3: Log to console for debugging
    // Helpful during validation: visible logs for every event
    // eslint-disable-next-line no-console
    if (console && console.groupCollapsed) {
      // eslint-disable-next-line no-console
      console.groupCollapsed(`[analytics] ${ev.event} @ ${new Date(ev.ts).toISOString()}`);
      // eslint-disable-next-line no-console
      console.log(ev);
      // eslint-disable-next-line no-console
      console.groupEnd();
    } else {
      // eslint-disable-next-line no-console
      console.log("[analytics]", ev.event, ev);
    }
  } catch {
    // ignore analytics errors
  }
}

export function trackPageView(pageName: string): void {
  track("page_view", { page_name: pageName });
}

export function saveQuizSnapshot(data: {
  answers: Record<string, string>;
  startedAt: number;
  completedAt?: number;
}): void {
  try {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function loadQuizSnapshot():
  | { answers: Record<string, string>; startedAt: number; completedAt?: number }
  | null {
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Dwell/engagement tracker (visibility-aware)
export function createDwellTracker() {
  let engagedMs = 0;
  let lastVisibleAt = document.visibilityState === "visible" ? Date.now() : 0;

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      if (lastVisibleAt) {
        engagedMs += Date.now() - lastVisibleAt;
        lastVisibleAt = 0;
      }
    } else {
      lastVisibleAt = Date.now();
    }
  };

  document.addEventListener("visibilitychange", onVisibility);

  const stop = () => {
    document.removeEventListener("visibilitychange", onVisibility);
    if (lastVisibleAt) {
      engagedMs += Date.now() - lastVisibleAt;
      lastVisibleAt = 0;
    }
    return engagedMs;
  };

  return { stop };
}

export type RiskBucket = "High Priority" | "Elevated Need" | "Standard";


