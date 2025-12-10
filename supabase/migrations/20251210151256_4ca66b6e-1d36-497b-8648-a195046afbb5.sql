-- Create site_banners table for hero banner management
CREATE TABLE public.site_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  title_pt TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  description_pt TEXT,
  description_en TEXT,
  link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  created_by UUID REFERENCES auth.users(id)
);

-- Create site_settings table for general site configurations
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'url', 'number', 'email', 'phone')),
  label_pt TEXT NOT NULL DEFAULT '',
  label_en TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on both tables
ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_banners
CREATE POLICY "Banners são públicos" ON public.site_banners
FOR SELECT USING (true);

CREATE POLICY "Admins podem inserir banners" ON public.site_banners
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem atualizar banners" ON public.site_banners
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem deletar banners" ON public.site_banners
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for site_settings
CREATE POLICY "Configurações são públicas" ON public.site_settings
FOR SELECT USING (true);

CREATE POLICY "Admins podem inserir configurações" ON public.site_settings
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem atualizar configurações" ON public.site_settings
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins podem deletar configurações" ON public.site_settings
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_site_banners_updated_at
BEFORE UPDATE ON public.site_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value, type, label_pt, label_en) VALUES
('youtube_video_id', 'IwJrey-jnjI', 'text', 'ID do Vídeo YouTube', 'YouTube Video ID'),
('youtube_video_start', '4923', 'number', 'Início do Vídeo (segundos)', 'Video Start (seconds)'),
('instagram_url', '', 'url', 'URL do Instagram', 'Instagram URL'),
('facebook_url', '', 'url', 'URL do Facebook', 'Facebook URL'),
('whatsapp_number', '', 'phone', 'Número do WhatsApp', 'WhatsApp Number'),
('contact_email', '', 'email', 'Email de Contato', 'Contact Email'),
('address', '', 'text', 'Endereço', 'Address');