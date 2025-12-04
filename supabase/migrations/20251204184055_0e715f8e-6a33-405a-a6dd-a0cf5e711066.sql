-- Create waitlist_signups table for storing waitlist form submissions
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  selected_tier TEXT NOT NULL,
  selected_price INTEGER NOT NULL,
  willingness_to_pay TEXT NOT NULL,
  subscription_preference TEXT NOT NULL,
  utm_source TEXT,
  utm_campaign TEXT
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist form)
CREATE POLICY "Anyone can join waitlist" 
ON public.waitlist_signups 
FOR INSERT 
WITH CHECK (true);

-- Only service role can read (for admin purposes)
CREATE POLICY "Service role can read waitlist" 
ON public.waitlist_signups 
FOR SELECT 
USING (false);