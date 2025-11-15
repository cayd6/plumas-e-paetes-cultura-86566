-- Remove the incorrectly created admin user
DELETE FROM public.user_roles WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'plumaepaetescultural@admin.com');
DELETE FROM auth.users WHERE email = 'plumaepaetescultural@admin.com';

-- Create admin user with all required fields
DO $$
DECLARE
  user_id uuid := gen_random_uuid();
  encrypted_pw text;
BEGIN
  encrypted_pw := crypt('123456789', gen_salt('bf'));
  
  -- Insert into auth.users with all required fields
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    user_id,
    'authenticated',
    'authenticated',
    'plumaepaetescultural@admin.com',
    encrypted_pw,
    now(),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    now(),
    now(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
  );
  
  -- Insert into auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    format('{"sub":"%s","email":"%s"}', user_id::text, 'plumaepaetescultural@admin.com')::jsonb,
    'email',
    user_id::text,
    now(),
    now(),
    now()
  );
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, 'admin');
END $$;