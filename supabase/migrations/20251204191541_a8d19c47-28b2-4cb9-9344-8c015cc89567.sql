-- Make first_name nullable since it's now optional
ALTER TABLE public.waitlist_signups ALTER COLUMN first_name DROP NOT NULL;

-- Make willingness_to_pay nullable since we're removing it from the form
ALTER TABLE public.waitlist_signups ALTER COLUMN willingness_to_pay DROP NOT NULL;

-- Make subscription_preference nullable since we're removing it from the form
ALTER TABLE public.waitlist_signups ALTER COLUMN subscription_preference DROP NOT NULL;

-- Add default values for tier/price in case they're not passed
ALTER TABLE public.waitlist_signups ALTER COLUMN selected_tier SET DEFAULT 'Guided Analysis';
ALTER TABLE public.waitlist_signups ALTER COLUMN selected_price SET DEFAULT 149;