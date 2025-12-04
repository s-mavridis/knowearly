-- Drop the existing problematic SELECT policy
DROP POLICY IF EXISTS "Service role can read waitlist" ON public.waitlist_signups;

-- Create a proper SELECT policy that only allows service_role to read
-- Note: service_role bypasses RLS by default, but we still want explicit deny for anon/authenticated
CREATE POLICY "No public read access" ON public.waitlist_signups
FOR SELECT
USING (false);

-- Add explicit UPDATE deny policy
CREATE POLICY "No public update access" ON public.waitlist_signups
FOR UPDATE
USING (false);

-- Add explicit DELETE deny policy  
CREATE POLICY "No public delete access" ON public.waitlist_signups
FOR DELETE
USING (false);