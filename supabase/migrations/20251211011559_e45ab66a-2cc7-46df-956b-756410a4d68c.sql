
-- Tabela de estatísticas do prêmio
CREATE TABLE public.award_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value integer NOT NULL DEFAULT 0,
  label_pt text NOT NULL DEFAULT '',
  label_en text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de profissionais premiados
CREATE TABLE public.award_professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  awards_count integer NOT NULL DEFAULT 0,
  rank integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de escolas premiadas
CREATE TABLE public.award_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  awards_count integer NOT NULL DEFAULT 0,
  rank integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de curiosidades
CREATE TABLE public.award_curiosities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_pt text NOT NULL,
  text_en text NOT NULL,
  icon text NOT NULL DEFAULT 'Star',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de conteúdo "Quem Somos"
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value_pt text NOT NULL DEFAULT '',
  value_en text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'text',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de eventos da timeline
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title_pt text NOT NULL,
  title_en text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  image_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de depoimentos
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_pt text NOT NULL,
  role_en text NOT NULL,
  quote_pt text NOT NULL,
  quote_en text NOT NULL,
  image_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de serviços de produção
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_en text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  icon text NOT NULL DEFAULT 'Star',
  features_pt text[] DEFAULT '{}',
  features_en text[] DEFAULT '{}',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de projetos do portfólio
CREATE TABLE public.portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_en text NOT NULL,
  year text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  image_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de categorias do blog
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_pt text NOT NULL,
  name_en text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de posts do blog
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_en text NOT NULL,
  slug text NOT NULL UNIQUE,
  content_pt text NOT NULL,
  content_en text NOT NULL,
  excerpt_pt text,
  excerpt_en text,
  image_url text,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_name text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de edições da revista
CREATE TABLE public.magazine_editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title_pt text NOT NULL,
  title_en text NOT NULL,
  description_pt text,
  description_en text,
  cover_url text,
  pages text[] DEFAULT '{}',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.award_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_curiosities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.magazine_editions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para award_stats
CREATE POLICY "Estatísticas são públicas" ON public.award_stats FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir estatísticas" ON public.award_stats FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar estatísticas" ON public.award_stats FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar estatísticas" ON public.award_stats FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para award_professionals
CREATE POLICY "Profissionais são públicos" ON public.award_professionals FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir profissionais" ON public.award_professionals FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar profissionais" ON public.award_professionals FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar profissionais" ON public.award_professionals FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para award_schools
CREATE POLICY "Escolas são públicas" ON public.award_schools FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir escolas" ON public.award_schools FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar escolas" ON public.award_schools FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar escolas" ON public.award_schools FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para award_curiosities
CREATE POLICY "Curiosidades são públicas" ON public.award_curiosities FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir curiosidades" ON public.award_curiosities FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar curiosidades" ON public.award_curiosities FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar curiosidades" ON public.award_curiosities FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para about_content
CREATE POLICY "Conteúdo sobre é público" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir conteúdo sobre" ON public.about_content FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar conteúdo sobre" ON public.about_content FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar conteúdo sobre" ON public.about_content FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para timeline_events
CREATE POLICY "Timeline é pública" ON public.timeline_events FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir eventos" ON public.timeline_events FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar eventos" ON public.timeline_events FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar eventos" ON public.timeline_events FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para testimonials
CREATE POLICY "Depoimentos são públicos" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir depoimentos" ON public.testimonials FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar depoimentos" ON public.testimonials FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar depoimentos" ON public.testimonials FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para services
CREATE POLICY "Serviços são públicos" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir serviços" ON public.services FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar serviços" ON public.services FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar serviços" ON public.services FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para portfolio_projects
CREATE POLICY "Portfólio é público" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir projetos" ON public.portfolio_projects FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar projetos" ON public.portfolio_projects FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar projetos" ON public.portfolio_projects FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para blog_categories
CREATE POLICY "Categorias são públicas" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir categorias" ON public.blog_categories FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar categorias" ON public.blog_categories FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar categorias" ON public.blog_categories FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para blog_posts
CREATE POLICY "Posts publicados são públicos" ON public.blog_posts FOR SELECT USING (published = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem inserir posts" ON public.blog_posts FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar posts" ON public.blog_posts FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar posts" ON public.blog_posts FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas RLS para magazine_editions
CREATE POLICY "Revistas são públicas" ON public.magazine_editions FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir revistas" ON public.magazine_editions FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem atualizar revistas" ON public.magazine_editions FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins podem deletar revistas" ON public.magazine_editions FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers para updated_at
CREATE TRIGGER update_award_stats_updated_at BEFORE UPDATE ON public.award_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_award_professionals_updated_at BEFORE UPDATE ON public.award_professionals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_award_schools_updated_at BEFORE UPDATE ON public.award_schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_award_curiosities_updated_at BEFORE UPDATE ON public.award_curiosities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON public.timeline_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON public.portfolio_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_magazine_editions_updated_at BEFORE UPDATE ON public.magazine_editions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais das estatísticas do prêmio
INSERT INTO public.award_stats (key, value, label_pt, label_en, display_order) VALUES
('trophies', 462, 'Troféus Entregues', 'Trophies Awarded', 1),
('winners', 310, 'Profissionais Premiados', 'Award Winners', 2),
('editions', 20, 'Edições Realizadas', 'Editions Held', 3),
('schools', 52, 'Escolas Representadas', 'Schools Represented', 4),
('men', 60, 'Homens (%)', 'Men (%)', 5),
('women', 40, 'Mulheres (%)', 'Women (%)', 6);

-- Inserir top profissionais
INSERT INTO public.award_professionals (name, awards_count, rank) VALUES
('Rosa Magalhães', 18, 1),
('Jaime da Vila', 15, 2),
('Sandro Gomes', 12, 3),
('Maria Augusta', 11, 4),
('Fernando Pinto', 10, 5),
('Duda Santos', 9, 6),
('Max Lopes', 8, 7),
('Loia Zeza', 8, 8),
('Ney Travassos', 7, 9),
('Paulo Barros', 7, 10);

-- Inserir top escolas
INSERT INTO public.award_schools (name, awards_count, rank) VALUES
('Beija-Flor', 58, 1),
('Portela', 45, 2),
('Mangueira', 42, 3),
('Salgueiro', 38, 4),
('Imperatriz', 35, 5),
('Viradouro', 32, 6),
('Grande Rio', 30, 7),
('Unidos da Tijuca', 28, 8),
('Vila Isabel', 25, 9),
('Mocidade', 22, 10);

-- Inserir curiosidades
INSERT INTO public.award_curiosities (text_pt, text_en, icon, display_order) VALUES
('Rosa Magalhães é a maior vencedora da história com 18 troféus', 'Rosa Magalhães is the biggest winner in history with 18 trophies', 'Trophy', 1),
('Beija-Flor lidera entre as escolas com 58 premiações', 'Beija-Flor leads among schools with 58 awards', 'Award', 2),
('O prêmio já homenageou mais de 300 profissionais únicos', 'The award has honored over 300 unique professionals', 'Users', 3),
('A categoria Fantasia é a mais disputada historicamente', 'The Costume category is historically the most competitive', 'Star', 4);
