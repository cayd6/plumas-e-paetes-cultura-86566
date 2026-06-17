import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Image as ImageIcon, Users, Search, X, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSEO from "@/components/seo/PageSEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackCTA } from "@/lib/tracking";

const SITE_URL = "https://plumas-e-paetes-cultura-86566.lovable.app";

type ContentType = "all" | "people" | "editions";

const Memoria = () => {
  const { language } = useLanguage();
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);

  // Filters
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [role, setRole] = useState<string>("all");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

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
        .order("year", { ascending: false });
      return data ?? [];
    },
  });

  // Build filter option lists
  const opts = useMemo(() => {
    const years = new Set<string>();
    const cats = new Set<string>();
    const cities = new Set<string>();
    const roles = new Set<string>();
    honored.forEach((p: any) => {
      if (p.year) years.add(String(p.year));
      if (p.category) cats.add(p.category);
      if (p.city) cities.add(p.city);
      if (p.role) roles.add(p.role);
    });
    editions.forEach((e: any) => { if (e.year) years.add(String(e.year)); });
    return {
      years: Array.from(years).sort((a, b) => Number(b) - Number(a)),
      cats: Array.from(cats).sort(),
      cities: Array.from(cities).sort(),
      roles: Array.from(roles).sort(),
    };
  }, [honored, editions]);

  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const q = norm(search.trim());

  const filteredHonored = useMemo(() => honored.filter((p: any) => {
    if (year !== "all" && String(p.year) !== year) return false;
    if (category !== "all" && p.category !== category) return false;
    if (city !== "all" && p.city !== city) return false;
    if (role !== "all" && p.role !== role) return false;
    if (featuredOnly && !p.featured) return false;
    if (q) {
      const hay = norm([p.name, p.role, p.role_en, p.city, p.category, p.description].filter(Boolean).join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }), [honored, year, category, city, role, featuredOnly, q]);

  const filteredEditions = useMemo(() => editions.filter((e: any) => {
    if (year !== "all" && String(e.year) !== year) return false;
    if (q) {
      const hay = norm([e.title, e.title_en, String(e.year)].filter(Boolean).join(" "));
      if (!hay.includes(q)) return false;
    }
    return true;
  }), [editions, year, q]);

  const showPeople = contentType === "all" || contentType === "people";
  const showEditions = contentType === "all" || contentType === "editions";

  const filtersActive = search || year !== "all" || category !== "all" || city !== "all" || role !== "all" || contentType !== "all" || featuredOnly;
  const resetFilters = () => {
    setSearch(""); setYear("all"); setCategory("all"); setCity("all"); setRole("all"); setContentType("all"); setFeaturedOnly(false);
    trackCTA("memoria_filters_reset", "Limpar filtros", undefined, { category: "memoria" });
  };

  const byYear = filteredHonored.reduce<Record<string, any[]>>((acc, p) => {
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

  const select = "h-10 rounded-md border border-input bg-background px-3 text-sm";

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

          <header className="mt-6 mb-10 max-w-3xl">
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
          <section className="grid md:grid-cols-3 gap-6 mb-12" aria-label={t("Resumo do acervo", "Archive summary")}>
            {[
              { icon: <Users className="h-5 w-5" />, t: t("Homenageados", "Honorees"), v: honored.length, d: t("Personalidades reconhecidas", "Recognized personalities") },
              { icon: <BookOpen className="h-5 w-5" />, t: t("Edições", "Editions"), v: editions.length || 20, d: t("Anos de premiação contínua", "Years of continuous awards") },
              { icon: <ImageIcon className="h-5 w-5" />, t: t("Acervo", "Collection"), v: "1k+", d: t("Imagens, vídeos e publicações", "Images, videos and publications") },
            ].map((b, i) => (
              <div key={i} className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-2 text-carnival-purple mb-3">{b.icon}<span className="text-xs uppercase tracking-widest">{b.t}</span></div>
                <div className="font-serif text-4xl">{b.v}</div>
                <p className="text-sm text-muted-foreground mt-1">{b.d}</p>
              </div>
            ))}
          </section>

          {/* Filters */}
          <section className="mb-10 border border-border rounded-lg p-4 bg-card" aria-label={t("Filtros do acervo", "Archive filters")}>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                <Input
                  type="search"
                  placeholder={t("Buscar nome, função, cidade…", "Search name, role, city…")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  aria-label={t("Buscar no acervo", "Search archive")}
                />
              </div>
              {filtersActive && (
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <X className="h-3 w-3 mr-1" />{t("Limpar filtros", "Reset filters")}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <select className={select} value={contentType} onChange={(e) => setContentType(e.target.value as ContentType)} aria-label={t("Tipo de conteúdo", "Content type")}>
                <option value="all">{t("Todos conteúdos", "All content")}</option>
                <option value="people">{t("Homenageados", "Honorees")}</option>
                <option value="editions">{t("Revistas", "Magazines")}</option>
              </select>
              <select className={select} value={year} onChange={(e) => setYear(e.target.value)} aria-label={t("Ano", "Year")}>
                <option value="all">{t("Todos os anos", "All years")}</option>
                {opts.years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <select className={select} value={category} onChange={(e) => setCategory(e.target.value)} aria-label={t("Categoria", "Category")}>
                <option value="all">{t("Todas categorias", "All categories")}</option>
                {opts.cats.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className={select} value={city} onChange={(e) => setCity(e.target.value)} aria-label={t("Cidade", "City")}>
                <option value="all">{t("Todas cidades", "All cities")}</option>
                {opts.cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className={select} value={role} onChange={(e) => setRole(e.target.value)} aria-label={t("Função", "Role")}>
                <option value="all">{t("Todas funções", "All roles")}</option>
                {opts.roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <label className="flex items-center gap-2 px-3 h-10 rounded-md border border-input bg-background text-sm cursor-pointer">
                <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} />
                <Star className="h-3 w-3" /> {t("Só destaques", "Featured only")}
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-3" role="status" aria-live="polite">
              {t(
                `${filteredHonored.length} homenageados · ${filteredEditions.length} edições`,
                `${filteredHonored.length} honorees · ${filteredEditions.length} editions`
              )}
            </p>
          </section>

          {/* Honored */}
          {showPeople && (
            <section className="mb-16">
              <h2 className="font-serif text-3xl mb-8">{t("Homenageados por edição", "Honorees by edition")}</h2>
              {years.length === 0 ? (
                <div className="border border-dashed border-border rounded-lg p-10 text-center">
                  <p className="text-muted-foreground mb-4">
                    {filtersActive
                      ? t("Nenhum homenageado corresponde aos filtros.", "No honorees match your filters.")
                      : t("Em breve publicaremos o acervo completo de homenageados.", "The full honorees archive will be published soon.")}
                  </p>
                  {filtersActive && (
                    <Button variant="outline" size="sm" onClick={resetFilters}>{t("Limpar filtros", "Reset filters")}</Button>
                  )}
                </div>
              ) : (
                <div className="space-y-10">
                  {years.map((y) => (
                    <div key={y}>
                      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">{y}</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {byYear[y].map((p: any) => (
                          <article key={p.id} className="border border-border rounded-lg overflow-hidden bg-card">
                            {p.image_url && (
                              <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-48 object-cover" />
                            )}
                            <div className="p-5">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-xs uppercase tracking-widest text-carnival-magenta">{p.category}</div>
                                {p.featured && <Star className="h-3 w-3 text-carnival-gold fill-carnival-gold" />}
                              </div>
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
          )}

          {/* Editions */}
          {showEditions && (
            <section className="mb-16">
              <h2 className="font-serif text-3xl mb-8">{t("Acervo da revista", "Magazine archive")}</h2>
              {filteredEditions.length === 0 ? (
                <div className="border border-dashed border-border rounded-lg p-10 text-center">
                  <p className="text-muted-foreground">
                    {filtersActive
                      ? t("Nenhuma edição corresponde aos filtros.", "No editions match your filters.")
                      : t("Edições serão publicadas em breve.", "Editions will be published soon.")}
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredEditions.slice(0, 12).map((e: any) => (
                    <Link key={e.id} to="/revista" className="group block" onClick={() => trackCTA("memoria_open_edition", e.title, "/revista", { category: "memoria", year: e.year })}>
                      {e.cover_url && <img src={e.cover_url} alt={e.title} loading="lazy" className="w-full aspect-[3/4] object-cover" />}
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground">{e.year}</div>
                        <div className="font-serif text-lg group-hover:text-carnival-purple transition-colors">{e.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* CTA */}
          <section className="border-t border-border pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">{t("Contribua com nosso acervo", "Contribute to our archive")}</h2>
              <p className="text-muted-foreground">{t("Tem fotos, vídeos ou registros históricos?", "Do you have photos, videos or historical records?")}</p>
            </div>
            <Button asChild onClick={() => trackCTA("memoria_contribute", "Enviar para o acervo", "/contato", { category: "memoria" })}>
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
