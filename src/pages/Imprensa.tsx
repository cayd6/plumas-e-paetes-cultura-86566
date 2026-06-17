import { useQuery } from "@tanstack/react-query";
import { Download, FileText, Image as ImageIcon, Mail, Video, Palette, Newspaper } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSEO from "@/components/seo/PageSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackCTA } from "@/lib/tracking";

const SITE_URL = "https://plumas-e-paetes-cultura-86566.lovable.app";

const typeIcon: Record<string, JSX.Element> = {
  logo: <Palette className="h-4 w-4" />,
  release: <FileText className="h-4 w-4" />,
  photos: <ImageIcon className="h-4 w-4" />,
  pdf: <FileText className="h-4 w-4" />,
  brand_asset: <Palette className="h-4 w-4" />,
  video_link: <Video className="h-4 w-4" />,
};

const Imprensa = () => {
  const { language } = useLanguage();
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);

  const { data: assets = [] } = useQuery({
    queryKey: ["press_kit_assets"],
    queryFn: async () => {
      const { data } = await supabase
        .from("press_kit_assets")
        .select("*")
        .eq("active", true)
        .order("display_order");
      return data ?? [];
    },
  });

  const facts = [
    { v: "20", l: t("anos de atuação", "years of activity") },
    { v: "200+", l: t("personalidades homenageadas", "honored personalities") },
    { v: "50+", l: t("escolas de samba envolvidas", "samba schools involved") },
    { v: "1k+", l: t("publicações de imprensa", "press publications") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instituto Plumas & Paetês Cultural",
    url: SITE_URL,
    logo: `${SITE_URL}/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png`,
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "press",
      email: "imprensa@plumasepaetes.com.br",
      availableLanguage: ["Portuguese", "English"],
    }],
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={t("Imprensa & Kit de Mídia", "Press & Media Kit")}
        description={t(
          "Materiais para imprensa: logos, releases, fotos em alta, fatos institucionais e contato direto da assessoria.",
          "Press materials: logos, releases, hi-res photos, institutional facts and direct media contact."
        )}
        keywords="imprensa, press kit, mídia, releases, logos, plumas e paetês"
        lang={language === "pt" ? "pt-BR" : "en"}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main id="conteudo" className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs />

          <header className="mt-6 mb-12 max-w-3xl">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              <Newspaper className="h-3 w-3 mr-1" /> {t("Sala de imprensa", "Press room")}
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight">
              {t("Materiais oficiais para imprensa.", "Official materials for the press.")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t(
                "Acesse logos, releases, fotos em alta resolução e a apresentação institucional do Instituto Plumas & Paetês Cultural.",
                "Access logos, releases, hi-res photos and the institutional deck of Instituto Plumas & Paetês Cultural."
              )}
            </p>
          </header>

          {/* Facts */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {facts.map((f, i) => (
              <div key={i} className="border-l-2 border-carnival-gold pl-4">
                <div className="font-serif text-3xl md:text-4xl">{f.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{f.l}</div>
              </div>
            ))}
          </section>

          {/* Assets */}
          <section className="mb-16">
            <h2 className="font-serif text-3xl mb-8">{t("Kit de imprensa", "Press kit")}</h2>
            {assets.length === 0 ? (
              <p className="text-muted-foreground">
                {t("O kit de imprensa será publicado em breve.", "The press kit will be published soon.")}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {assets.map((a: any) => (
                  <article key={a.id} className="border border-border rounded-lg p-5 bg-card flex flex-col">
                    <div className="flex items-center gap-2 text-carnival-purple mb-3">
                      {typeIcon[a.type] ?? <FileText className="h-4 w-4" />}
                      <span className="text-xs uppercase tracking-widest">{a.type.replace("_", " ")}</span>
                    </div>
                    <h3 className="font-serif text-xl">{language === "en" ? a.title_en || a.title : a.title}</h3>
                    {(language === "en" ? a.description_en : a.description) && (
                      <p className="text-sm text-muted-foreground mt-2 flex-1">
                        {language === "en" ? a.description_en : a.description}
                      </p>
                    )}
                    {a.file_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="mt-4 self-start"
                        onClick={() => trackCTA("press_asset_download", a.title, a.file_url, { category: "press", asset_type: a.type })}
                      >
                        <a href={a.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          {t("Baixar", "Download")}
                        </a>
                      </Button>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Press contact */}
          <section className="border border-border rounded-lg p-8 md:p-10 bg-card flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl mb-2">{t("Contato para imprensa", "Press contact")}</h2>
              <p className="text-muted-foreground">{t("Entrevistas, agendamentos e materiais sob demanda.", "Interviews, scheduling and on-demand materials.")}</p>
            </div>
            <Button
              asChild
              size="lg"
              onClick={() => trackCTA("press_contact", "Falar com a assessoria", "mailto:imprensa@plumasepaetes.com.br", { category: "press" })}
            >
              <a href="mailto:imprensa@plumasepaetes.com.br">
                <Mail className="h-4 w-4 mr-2" />
                {t("Falar com a assessoria", "Contact press office")}
              </a>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Imprensa;
