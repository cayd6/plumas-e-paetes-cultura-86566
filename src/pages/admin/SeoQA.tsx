import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RouteAudit {
  route: string;
  source: string;
  hasPageSEO: boolean;
  title?: string;
  description?: string;
  hasJsonLd?: boolean;
  hasImage?: boolean;
}

interface AuditReport {
  generatedAt: string;
  routes: RouteAudit[];
}

const ORIGIN = "https://plumas-e-paetes-cultura-86566.lovable.app";

export default function SeoQA() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/seo-audit.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setReport)
      .catch((e) => setLoadError(String(e)));
  }, []);

  // Dynamic content from DB (blog/magazine) — checks for title + description coverage
  const { data: posts = [] } = useQuery({
    queryKey: ["seo-qa-blog"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,title,excerpt,slug")
        .eq("published", true)
        .limit(200);
      return data ?? [];
    },
  });
  const { data: editions = [] } = useQuery({
    queryKey: ["seo-qa-magazine"],
    queryFn: async () => {
      const { data } = await supabase
        .from("magazine_editions")
        .select("id,title,description,year")
        .limit(200);
      return data ?? [];
    },
  });

  const totalRoutes = report?.routes.length ?? 0;
  const failingRoutes = report?.routes.filter((r) => !r.hasPageSEO || !r.title || !r.description) ?? [];

  const dynamicMissing = [
    ...posts.filter((p: any) => !p.title || !p.excerpt).map((p: any) => ({ kind: "blog", id: p.id, label: p.title || p.slug })),
    ...editions.filter((e: any) => !e.title || !e.description).map((e: any) => ({ kind: "magazine", id: e.id, label: e.title || `Ed. ${e.year}` })),
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">QA de SEO</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Cobertura de metadados por rota e por conteúdo dinâmico. Gerado por <code>scripts/seo-audit.ts</code>.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Rotas estáticas</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{totalRoutes} rotas</Badge>
            <Badge variant={failingRoutes.length ? "destructive" : "default"}>
              {failingRoutes.length} sem metadados completos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loadError && (
            <p className="text-sm text-muted-foreground">
              Nenhum relatório encontrado em <code>/seo-audit.json</code>. Gere com <code>npx tsx scripts/seo-audit.ts</code>.
            </p>
          )}
          {report && (
            <div className="divide-y text-sm">
              {report.routes.map((r) => {
                const ok = r.hasPageSEO && r.title && r.description;
                return (
                  <div key={r.route} className="py-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {ok
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        : <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />}
                      <code className="text-xs">{r.route}</code>
                      <span className="text-xs text-muted-foreground truncate">{r.title ?? "—"}</span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Badge variant={r.title ? "secondary" : "outline"}>title</Badge>
                      <Badge variant={r.description ? "secondary" : "outline"}>desc</Badge>
                      <Badge variant={r.hasJsonLd ? "secondary" : "outline"}>JSON-LD</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Origem canônica: <code>{ORIGIN}</code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conteúdo dinâmico</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex gap-2">
            <Badge variant="outline">{posts.length} posts</Badge>
            <Badge variant="outline">{editions.length} edições</Badge>
            <Badge variant={dynamicMissing.length ? "destructive" : "default"}>
              {dynamicMissing.length} sem título/descrição
            </Badge>
          </div>
          {dynamicMissing.length > 0 && (
            <ul className="text-xs list-disc pl-5 space-y-0.5">
              {dynamicMissing.slice(0, 30).map((m) => (
                <li key={`${m.kind}-${m.id}`}><Badge variant="outline" className="mr-2 text-[10px]">{m.kind}</Badge>{m.label}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
