import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Landmark, Handshake, Newspaper, Music2, Heart } from "lucide-react";
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

const groups = [
  { key: "institutional", icon: <Building2 className="h-5 w-5" />, pt: "Institucionais", en: "Institutional" },
  { key: "public_sector", icon: <Landmark className="h-5 w-5" />, pt: "Poder público", en: "Public sector" },
  { key: "sponsor", icon: <Handshake className="h-5 w-5" />, pt: "Patrocinadores", en: "Sponsors" },
  { key: "media", icon: <Newspaper className="h-5 w-5" />, pt: "Mídia", en: "Media" },
  { key: "cultural", icon: <Music2 className="h-5 w-5" />, pt: "Culturais", en: "Cultural" },
  { key: "support", icon: <Heart className="h-5 w-5" />, pt: "Apoio", en: "Support" },
] as const;

const Parcerias = () => {
  const { language } = useLanguage();
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);

  const { data: partners = [] } = useQuery({
    queryKey: ["partners", "all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("partners")
        .select("*")
        .eq("active", true)
        .order("display_order");
      return data ?? [];
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("Parcerias — Instituto Plumas & Paetês", "Partnerships — Instituto Plumas & Paetês"),
    url: `${SITE_URL}/parcerias`,
    description: t(
      "Patrocínio, parcerias institucionais e cidades parceiras do Instituto Plumas & Paetês Cultural.",
      "Sponsorship, institutional partnerships and partner cities of Instituto Plumas & Paetês Cultural."
    ),
  };

  const audiences = [
    {
      title: t("Empresas e patrocinadores", "Companies and sponsors"),
      body: t(
        "Associe sua marca à maior memória viva do carnaval brasileiro: 20 anos de presença editorial, premiação e acervo.",
        "Associate your brand with the largest living memory of Brazilian carnival: 20 years of editorial presence, awards and archive."
      ),
      cta: t("Receber proposta de patrocínio", "Request sponsorship deck"),
      id: "partnership_sponsor",
    },
    {
      title: t("Prefeituras e secretarias", "City halls and secretariats"),
      body: t(
        "Levamos o Prêmio Plumas & Paetês e nossas ações formativas para sua cidade — programa institucional sob medida.",
        "We bring the Plumas & Paetês Award and our educational programs to your city — a tailor-made institutional program."
      ),
      cta: t("Levar para minha cidade", "Bring to my city"),
      id: "partnership_city",
    },
    {
      title: t("Instituições culturais", "Cultural institutions"),
      body: t(
        "Co-realizações, mostras, residências e curadorias com museus, festivais e centros culturais.",
        "Co-productions, exhibitions, residencies and curatorship with museums, festivals and cultural centers."
      ),
      cta: t("Propor co-realização", "Propose a co-production"),
      id: "partnership_cultural",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={t("Parcerias e Patrocínio", "Partnerships and Sponsorship")}
        description={t(
          "Patrocinadores, prefeituras e instituições parceiras. Conheça os caminhos para apoiar a memória viva do carnaval brasileiro.",
          "Sponsors, city halls and partner institutions. Discover the ways to support the living memory of Brazilian carnival."
        )}
        keywords="parcerias, patrocínio, prefeituras, instituições, carnaval"
        lang={language === "pt" ? "pt-BR" : "en"}
        jsonLd={jsonLd}
      />
      <Navigation />

      <main id="conteudo" className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ label: t("Parcerias", "Partnerships") }]} />

          <header className="mt-6 mb-12 max-w-3xl">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              {t("Apoie a cultura", "Support culture")}
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight">
              {t("Faça parte da história do carnaval.", "Be part of the history of carnival.")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t(
                "Construímos pontes entre empresas, poder público, instituições culturais e a comunidade carnavalesca para preservar e formar o futuro do maior espetáculo da Terra.",
                "We bridge companies, public authorities, cultural institutions and the carnival community to preserve and shape the future of the greatest show on Earth."
              )}
            </p>
          </header>

          {/* Audiences */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {audiences.map((a) => (
              <article key={a.id} className="border border-border rounded-lg p-6 bg-card flex flex-col">
                <h2 className="font-serif text-2xl mb-3">{a.title}</h2>
                <p className="text-sm text-muted-foreground flex-1">{a.body}</p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 self-start"
                  onClick={() => trackCTA(a.id, a.cta, "/contato")}
                >
                  <Link to="/contato">
                    {a.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </section>

          {/* Partners by category */}
          <section className="mb-16">
            <h2 className="font-serif text-3xl mb-8">{t("Quem está com a gente", "Who stands with us")}</h2>
            {partners.length === 0 ? (
              <p className="text-muted-foreground">
                {t("Em breve publicaremos a lista completa de parceiros.", "The full partner list will be published soon.")}
              </p>
            ) : (
              <div className="space-y-10">
                {groups.map((g) => {
                  const list = partners.filter((p: any) => p.type === g.key);
                  if (list.length === 0) return null;
                  return (
                    <div key={g.key}>
                      <div className="flex items-center gap-2 text-carnival-purple mb-4">
                        {g.icon}
                        <h3 className="text-sm uppercase tracking-widest">{language === "pt" ? g.pt : g.en}</h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {list.map((p: any) => (
                          <a
                            key={p.id}
                            href={p.website_url || "#"}
                            target={p.website_url ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="border border-border rounded-lg p-4 flex items-center justify-center bg-card hover:border-carnival-purple transition-colors aspect-[4/3]"
                            aria-label={p.name}
                          >
                            {p.logo_url ? (
                              <img src={p.logo_url} alt={p.name} loading="lazy" className="max-h-16 max-w-full object-contain" />
                            ) : (
                              <span className="text-sm text-center">{p.name}</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Final CTA */}
          <section className="bg-carnival-purple text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl mb-2">
                {t("Vamos construir juntos a próxima edição.", "Let's build the next edition together.")}
              </h2>
              <p className="text-white/80">
                {t("Receba nosso material institucional e a proposta de patrocínio 2026.", "Receive our institutional deck and the 2026 sponsorship proposal.")}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              onClick={() => trackCTA("partnership_main", "Falar com o Instituto", "/contato")}
            >
              <Link to="/contato">
                {t("Falar com o Instituto", "Talk to the Institute")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Parcerias;
