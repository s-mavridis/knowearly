-- ============================================================================
-- MIGRATION: Create analytics_events table
-- PURPOSE: Store all user interaction events tracked by the frontend
-- ============================================================================

-- Create the main analytics events table
-- This table will store every click, page view, and interaction from users
CREATE TABLE public.analytics_events (
  -- Unique ID for each event
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,

  -- When the event happened (automatically set to current time)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- USER IDENTIFICATION (anonymous - no personal data)
  -- anon_id: Unique ID stored in user's browser localStorage (persists across sessions)
  -- session_id: Unique ID for this browser tab session (resets when tab closes)
  anon_id TEXT NOT NULL,
  session_id TEXT NOT NULL,

  -- EVENT DETAILS
  -- event_name: What happened? Examples: "quiz_start", "tier_click", "waitlist_submit"
  -- page_path: What page were they on? Examples: "/", "/quiz", "/results"
  event_name TEXT NOT NULL,
  page_path TEXT,

  -- CUSTOM DATA (stored as JSON)
  -- properties: Any extra data about the event
  -- Example: { "tier": "Guided", "price": 149, "risk_bucket": "High Priority" }
  properties JSONB DEFAULT '{}'::jsonb,

  -- MARKETING ATTRIBUTION
  -- These help track where users came from
  utm_source TEXT,        -- Example: "google", "facebook"
  utm_campaign TEXT,      -- Example: "summer_2024"
  referrer TEXT           -- Example: "https://google.com"
);

-- ============================================================================
-- INDEXES: Make queries faster
-- ============================================================================

-- Index for finding events by name (e.g., "show me all quiz_start events")
CREATE INDEX idx_analytics_events_name ON public.analytics_events(event_name);

-- Index for finding events by user (e.g., "show me all events for user X")
CREATE INDEX idx_analytics_events_anon_id ON public.analytics_events(anon_id);

-- Index for finding events by date (e.g., "show me events from last week")
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS): Control who can read/write this table
-- ============================================================================

-- Enable RLS (required for security)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- POLICY 1: Anyone can INSERT events (public tracking from website)
-- This allows your website visitors to log analytics without being logged in
CREATE POLICY "Anyone can track events"
ON public.analytics_events
FOR INSERT
WITH CHECK (true);

-- POLICY 2: Nobody can SELECT/read events (except admins with service_role key)
-- This prevents random people from reading your analytics data
-- Only you (with admin access) can view the analytics
CREATE POLICY "No public read access"
ON public.analytics_events
FOR SELECT
USING (false);

-- POLICY 3: Nobody can UPDATE events
-- Analytics events should never be edited once created
CREATE POLICY "No public update access"
ON public.analytics_events
FOR UPDATE
USING (false);

-- POLICY 4: Nobody can DELETE events
-- Analytics events should never be deleted (except by admins)
CREATE POLICY "No public delete access"
ON public.analytics_events
FOR DELETE
USING (false);

-- ============================================================================
-- DONE!
-- ============================================================================
-- After this migration runs, you'll have:
-- ✅ A new "analytics_events" table
-- ✅ Indexes for fast queries
-- ✅ Security policies that allow public tracking but private reading
