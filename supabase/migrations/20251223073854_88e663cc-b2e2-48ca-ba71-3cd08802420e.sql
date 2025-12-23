-- Add columns for EHR consent to waitlist_signups
ALTER TABLE public.waitlist_signups
ADD COLUMN IF NOT EXISTS ehr_consent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS ehr_consent_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS terms_accepted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at timestamp with time zone;