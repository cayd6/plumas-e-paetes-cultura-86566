import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  enableTrackingDebug,
  disableTrackingDebug,
  getTrackingLog,
  clearTrackingLog,
  trackCTA,
  CTA_CATEGORIES,
  validateCtaEvent,
} from "@/lib/tracking";
import { AlertTriangle, CheckCircle2, Trash2, Play, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogEntry {
  event?: string;
  timestamp?: string;
  cta_id?: string;
  cta_label?: string;
  cta_category?: string;
  destination?: string;
  page_path?: string;
  page_lang?: string;
  _issues?: Array<{ field: string; severity: string; message: string }>;
  [k: string]: unknown;
}

export default function TrackingQA() {
  const [enabled, setEnabled] = useState(typeof window !== "undefined" && !!window.__lovableTrackingDebug);
  const [log, setLog] = useState<LogEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (enabled) enableTrackingDebug();
    const i = setInterval(() => setLog([...(getTrackingLog() as LogEntry[])].reverse()), 500);
    return () => clearInterval(i);
  }, [enabled]);

  const ctaEvents = log.filter((e) => e.event === "cta_click");
  const broken = ctaEvents.filter((e) => (e._issues?.length ?? 0) > 0).length;

  const fireSample = () =>
    trackCTA("qa_test_event", "QA test", "/admin", { category: "navigation" });

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">QA de Tracking</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Inspecione eventos <code>cta_click</code> em tempo real. Valida snake_case <code>cta_id</code>, categoria tipada e <code>page_lang</code>.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Debug mode</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={enabled ? "default" : "outline"}
              onClick={() => {
                if (enabled) { disableTrackingDebug(); setEnabled(false); }
                else { enableTrackingDebug(); setEnabled(true); }
              }}
            >
              {enabled ? "Desativar" : "Ativar"}
            </Button>
            <Button size="sm" variant="outline" onClick={fireSample}>
              <Play className="h-3 w-3 mr-1" />Disparar evento de teste
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { clearTrackingLog(); setLog([]); }}>
              <Trash2 className="h-3 w-3 mr-1" />Limpar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            Categorias válidas: <code>{CTA_CATEGORIES.join(", ")}</code>
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary">Total: {ctaEvents.length}</Badge>
            <Badge variant={broken ? "destructive" : "default"}>
              {broken ? <AlertTriangle className="h-3 w-3 mr-1" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
              {broken} com problemas
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Eventos capturados</CardTitle></CardHeader>
        <CardContent>
          {ctaEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {enabled ? "Aguardando eventos… interaja com qualquer CTA do site." : "Ative o debug para começar a capturar."}
            </p>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-auto">
              {ctaEvents.map((e, idx) => {
                const issues = e._issues ?? validateCtaEvent(e as never);
                return (
                  <div key={idx} className="border rounded-md p-3 text-sm">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {issues.length === 0
                          ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                        <code className="font-mono text-xs">{e.cta_id ?? "—"}</code>
                        <Badge variant="outline" className="text-xs">{e.cta_category ?? "—"}</Badge>
                        <Badge variant="outline" className="text-xs">{e.page_lang ?? "—"}</Badge>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Copiar JSON"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(e, null, 2));
                          toast({ title: "Copiado", description: "Evento copiado como JSON." });
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {e.cta_label} → {e.destination ?? "—"} · {e.page_path}
                    </p>
                    {issues.length > 0 && (
                      <ul className="mt-2 text-xs space-y-0.5">
                        {issues.map((iss, j) => (
                          <li key={j} className={iss.severity === "error" ? "text-destructive" : "text-amber-600"}>
                            ⚠ <strong>{iss.field}</strong>: {iss.message}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
