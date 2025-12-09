-- Create gallery_videos table
CREATE TABLE public.gallery_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'entrevista',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  created_by UUID
);

-- Enable RLS
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Vídeos são públicos" ON public.gallery_videos
  FOR SELECT USING (true);

-- Admin insert
CREATE POLICY "Admins podem inserir vídeos" ON public.gallery_videos
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update
CREATE POLICY "Admins podem atualizar vídeos" ON public.gallery_videos
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete
CREATE POLICY "Admins podem deletar vídeos" ON public.gallery_videos
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_gallery_videos_updated_at
  BEFORE UPDATE ON public.gallery_videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();