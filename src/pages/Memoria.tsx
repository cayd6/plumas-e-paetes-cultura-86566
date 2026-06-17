import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Image as ImageIcon, Users } from "lucide-react";
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

const Memoria = () => {
  const { language } = useLanguage();
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);

  const { data: honored = [] } = useQuery({
    queryKey: ["honored_people", "memoria"],
    queryFn: async () => {
      const { data } = await supabase
        .from("honored_people")
        .select("*")
        .eq("active", true)
        .order("year", { ascending: false })
        .order("display_order");
      return data ?? [];
    },
  });

  const { data: editions = [] } = useQuery({
    queryKey: ["magazine_editions", "memoria"],
    queryFn: async () => {
      const { data } = await supabase
        .from("magazine_editions")
        .select("*")
        .order("year", { ascending: false })
        .limit(6);
      return data ?? [];
    },
  });

  const byYear = honored.reduce<Record<string, typeof honored>>((acc, p) => {
    const k = String(p.year ?? "—");
    (acc[k] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("Memória — Instituto Plumas & Paetês", "Memory — Instituto Plumas & Paetês"),
    url: `${SITE_URL}/memoria`,
    description: t(
      "Arquivo vivo do carnaval brasileiro: homenageados, edições e acervo do Prêmio Plumas & Paetês.",
      "Living archive of Brazilian carnival: honorees, editions and collection of the Plumas & Paetês Award."
    ),
    isPartOf: { "@type": "WebSite", name: "Instituto Plumas & Paetês Cultural", url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={t("Memória do Carnaval", "Carnival Memory")}
        description={t(
          "Acervo, homenageados e história do Prêmio Plumas & Paetês ao longo de 20 edições.",
          "Archive, honorees and history of the Plumas & Paetês Award across 20 editions."
        )}
        keywords="memória, carnaval, arquivo, homenageados, plumas e paetês"
        lang={language === "pt" ? "pt-BR" : "en"}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main id="conteudo" className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs />

          <header className="mt-6 mb-12 max-w-3xl">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              {t("Arquivo institucional", "Institutional archive")}
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-foreground">
              {t("Memória viva do carnaval brasileiro.", "Living memory of Brazilian carnival.")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t(
                "Vinte anos registrando, premiando e preservando os nomes que constroem o maior espetáculo da Terra.",
                "Twenty years recording, awarding and preserving the names that build the greatest show on Earth."
              )}
            </p>
          </header>

          {/* Pillars */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Users className="h-5 w-5" />, t: t("Homenageados", "Honorees"), v: honored.length, d: t("Personalidades reconhecidas", "Recognized personalities") },
              { icon: <BookOpen className="h-5 w-5" />, t: t("Edições", "Editions"), v: 20, d: t("Anos de premiação contínua", "Years of continuous awards") },
              { icon: <ImageIcon className="h-5 w-5" />, t: t("Acervo", "Collection"), v: "1k+", d: t("Imagens, vídeos e publicações", "Images, videos and publications") },
            ].map((b, i) => (
              <div key={i} className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-2 text-carnival-purple mb-3">{b.icon}<span className="text-xs uppercase tracking-widest">{b.t}</span></div>
                <div className="font-serif text-4xl">{b.v}</div>
                <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
              </div>
            ))}
          </section>

          {/* Honored by year */}
          <section className="mb-16">
            <h2 className="font-serif text-3xl mb-8">{t("Homenageados por edição", "Honorees by edition")}</h2>
            {years.length === 0 ? (
              <p className="text-muted-foreground">
                {t("Em breve publicaremos o acervo completo de homenageados.", "The full honorees archive will be published soon.")}
              </p>
            ) : (
              <div className="space-y-10">
                {years.map((y) => (
                  <div key={y}>
                    <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">{y}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {byYear[y].map((p) => (
                        <article key={p.id} className="border border-border rounded-lg overflow-hidden bg-card">
                          {p.image_url && (
                            <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-48 object-cover" />
                          )}
                          <div className="p-5">
                            <div className="text-xs uppercase tracking-widest text-carnival-magenta mb-1">{p.category}</div>
                            <h4 className="font-serif text-xl">{p.name}</h4>
                            {(language === "en" ? p.role_en || p.role : p.role) && (
                              <p className="text-sm text-muted-foreground mt-1">{language === "en" ? p.role_en || p.role : p.role}</p>
                            )}
                            {p.city && <p className="text-xs text-muted-foreground mt-2">{p.city}</p>}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Editions archive */}
          {editions.length > 0 && (
            <section className="mb-16">
              <h2 className="font-serif text-3xl mb-8">{t("Acervo da revista", "Magazine archive")}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {editions.map((e: any) => (
                  <Link key={e.id} to="/revista" className="group block">
                    {e.cover_url && <img src={e.cover_url} alt={e.title} loading="lazy" className="w-full aspect-[3/4] object-cover" />}
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground">{e.year}</div>
                      <div className="font-serif text-lg group-hover:text-carnival-purple transition-colors">{e.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">{t("Contribua com nosso acervo", "Contribute to our archive")}</h2>
              <p className="text-muted-foreground">{t("Tem fotos, vídeos ou registros históricos?", "Do you have photos, videos or historical records?")}</p>
            </div>
            <Button asChild onClick={() => trackCTA("memoria_contribute", "Enviar para o acervo", "/contato")}>
              <Link to="/contato">
                {t("Enviar para o acervo", "Send to the archive")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Memoria;
