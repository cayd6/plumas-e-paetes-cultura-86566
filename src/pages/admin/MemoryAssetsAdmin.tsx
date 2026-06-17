import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Star, Download, Upload, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StatusBadge, StatusCycle, CompletenessChips, type EditorialStatus } from "@/components/admin/EditorialStatusControls";
import { parseCSVToObjects, toCSV, downloadCSV, coerceRow } from "@/lib/csv";

type AnyRow = Record<string, any>;

const HONORED_CATEGORIES = ["Carnavalesco", "Mestre-sala", "Porta-bandeira", "Aderecista", "Costureira", "Diretor", "Compositor", "Cantor", "Pesquisador", "Outro"];
const PARTNER_TYPES = ["institucional", "patrocinador", "poder_publico", "midia", "apoio"];
const PRESS_TYPES = ["logo", "release", "fotografia", "video", "midia_kit", "outro"];

function useTable(table: "honored_people" | "partners" | "press_kit_assets", orderBy: string) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: false }).order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

function useUpsert(table: string) {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (row: AnyRow) => {
      const { id, ...rest } = row;
      if (rest.status === "published" && !rest.published_at) rest.published_at = new Date().toISOString();
      if (id) {
        const { error } = await (supabase.from as any)(table).update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await (supabase.from as any)(table).insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast({ title: "Salvo com sucesso" });
    },
    onError: (e: any) => toast({ variant: "destructive", title: "Erro", description: e.message }),
  });
}

function useStatusMutation(table: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EditorialStatus }) => {
      const patch: AnyRow = { status };
      if (status === "published") patch.published_at = new Date().toISOString();
      const { error } = await (supabase.from as any)(table).update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table] }),
  });
}

function useDelete(table: string) {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from as any)(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast({ title: "Removido" });
    },
  });
}

function BilingualField({
  labelPt, valuePt, valueEn, onPt, onEn, textarea = false,
}: { labelPt: string; valuePt: string; valueEn: string; onPt: (v: string) => void; onEn: (v: string) => void; textarea?: boolean }) {
  const Comp: any = textarea ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{labelPt}</Label>
      <Tabs defaultValue="pt">
        <TabsList className="h-8">
          <TabsTrigger value="pt" className="text-xs">PT</TabsTrigger>
          <TabsTrigger value="en" className="text-xs">EN</TabsTrigger>
        </TabsList>
        <TabsContent value="pt"><Comp value={valuePt || ""} onChange={(e: any) => onPt(e.target.value)} rows={textarea ? 4 : undefined} /></TabsContent>
        <TabsContent value="en"><Comp value={valueEn || ""} onChange={(e: any) => onEn(e.target.value)} rows={textarea ? 4 : undefined} placeholder="English translation" /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ============ CSV Tools (Honored + Partners) ============ */

interface CsvSpec {
  table: "honored_people" | "partners";
  columns: string[];
  types: Record<string, "string" | "number" | "boolean">;
  dedupKey: string;
}

const HONORED_CSV: CsvSpec = {
  table: "honored_people",
  columns: ["name", "category", "year", "edition_number", "city", "role", "role_en", "description", "description_en", "image_url", "featured", "active", "status", "display_order"],
  types: { year: "number", edition_number: "number", display_order: "number", featured: "boolean", active: "boolean" },
  dedupKey: "name",
};
const PARTNERS_CSV: CsvSpec = {
  table: "partners",
  columns: ["name", "type", "logo_url", "website_url", "description", "description_en", "active", "status", "display_order"],
  types: { display_order: "number", active: "boolean" },
  dedupKey: "name",
};

function CsvToolbar({ spec, rows }: { spec: CsvSpec; rows: AnyRow[] }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ valid: AnyRow[]; skipped: AnyRow[]; existing: number } | null>(null);

  const handleExport = () => {
    const data = rows.map((r) => {
      const o: AnyRow = {};
      spec.columns.forEach((c) => { o[c] = r[c] ?? ""; });
      return o;
    });
    downloadCSV(`${spec.table}-${new Date().toISOString().slice(0, 10)}.csv`, toCSV(data, spec.columns));
    toast({ title: "Exportado", description: `${data.length} registros.` });
  };

  const handleFile = async (file: File) => {
    const text = await file.text();
    const { rows: parsed } = parseCSVToObjects(text);
    const existingKeys = new Set(rows.map((r) => String(r[spec.dedupKey] ?? "").toLowerCase().trim()));
    const valid: AnyRow[] = [];
    const skipped: AnyRow[] = [];
    let existingHit = 0;
    for (const r of parsed) {
      const coerced = coerceRow(r, spec.types as never);
      const key = String(coerced[spec.dedupKey] ?? "").toLowerCase().trim();
      if (!key) { skipped.push({ ...coerced, _reason: "missing key" }); continue; }
      if (existingKeys.has(key)) { existingHit++; continue; }
      // default status to draft if absent
      if (!coerced.status) coerced.status = "draft";
      valid.push(coerced);
    }
    setPreview({ valid, skipped, existing: existingHit });
  };

  const handleImport = async () => {
    if (!preview?.valid.length) return;
    const { error } = await (supabase.from as any)(spec.table).insert(preview.valid);
    if (error) {
      toast({ variant: "destructive", title: "Erro na importação", description: error.message });
      return;
    }
    toast({ title: "Importação concluída", description: `${preview.valid.length} novos registros (status: rascunho).` });
    qc.invalidateQueries({ queryKey: [spec.table] });
    setPreview(null);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={handleExport}>
          <Download className="h-3 w-3 mr-1" />Exportar CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
          <Upload className="h-3 w-3 mr-1" />Importar CSV
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Pré-visualização da importação</DialogTitle></DialogHeader>
          {preview && (
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 flex-wrap">
                <Badge>{preview.valid.length} novos</Badge>
                <Badge variant="outline">{preview.existing} já existentes (ignorados)</Badge>
                <Badge variant="destructive">{preview.skipped.length} inválidos</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Dedup por <code>{spec.dedupKey}</code>. Novos registros entram como <strong>rascunho</strong> até serem publicados.
              </p>
              <div className="max-h-64 overflow-auto border rounded-md p-2 text-xs">
                {preview.valid.slice(0, 20).map((r, i) => (
                  <div key={i} className="py-0.5 border-b last:border-0">{r[spec.dedupKey]} · {r.category ?? r.type ?? ""}</div>
                ))}
                {preview.valid.length > 20 && <div className="pt-1 text-muted-foreground">…e mais {preview.valid.length - 20}.</div>}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cancelar</Button>
            <Button onClick={handleImport} disabled={!preview?.valid.length}>Importar {preview?.valid.length ?? 0}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ============ FILTERS ============ */
type FilterState = { q: string; status: "all" | EditorialStatus };

function FiltersBar({ value, onChange }: { value: FilterState; onChange: (v: FilterState) => void }) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
        <Input
          placeholder="Buscar…"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          className="h-8 pl-7 w-48"
        />
      </div>
      <div className="flex gap-1">
        {(["all", "draft", "published", "archived"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={value.status === s ? "default" : "outline"}
            className="h-8 text-xs"
            onClick={() => onChange({ ...value, status: s })}
          >
            {s === "all" ? "Todos" : s === "draft" ? "Rascunho" : s === "published" ? "Publicados" : "Arquivados"}
          </Button>
        ))}
      </div>
    </div>
  );
}

function applyFilters<T extends AnyRow>(rows: T[], f: FilterState, searchFields: string[]): T[] {
  return rows.filter((r) => {
    if (f.status !== "all" && (r.status ?? "draft") !== f.status) return false;
    if (f.q.trim()) {
      const q = f.q.toLowerCase();
      const hit = searchFields.some((k) => String(r[k] ?? "").toLowerCase().includes(q));
      if (!hit) return false;
    }
    return true;
  });
}

/* ============ HONORED PEOPLE ============ */
function HonoredAdmin() {
  const { data = [], isLoading } = useTable("honored_people", "year");
  const upsert = useUpsert("honored_people");
  const statusMut = useStatusMutation("honored_people");
  const del = useDelete("honored_people");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});
  const [filter, setFilter] = useState<FilterState>({ q: "", status: "all" });

  const reset = () => setRow({ name: "", category: HONORED_CATEGORIES[0], year: new Date().getFullYear(), role: "", role_en: "", description: "", description_en: "", city: "", image_url: "", featured: false, active: true, status: "draft", display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  const save = async () => { if (!row.name?.trim()) return; await upsert.mutateAsync(row); setOpen(false); };

  const filtered = useMemo(() => applyFilters(data, filter, ["name", "city", "role", "category"]), [data, filter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground">{filtered.length} / {data.length}</p>
          <FiltersBar value={filter} onChange={setFilter} />
        </div>
        <div className="flex gap-2">
          <CsvToolbar spec={HONORED_CSV} rows={data} />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo</Button></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{row.id ? "Editar" : "Novo"} homenageado</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Nome*</Label><Input value={row.name || ""} onChange={(e) => setRow({ ...row, name: e.target.value })} /></div>
                  <div><Label>Ano</Label><Input type="number" value={row.year ?? ""} onChange={(e) => setRow({ ...row, year: Number(e.target.value) || null })} /></div>
                  <div><Label>Categoria</Label>
                    <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.category || ""} onChange={(e) => setRow({ ...row, category: e.target.value })}>
                      {HONORED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><Label>Cidade</Label><Input value={row.city || ""} onChange={(e) => setRow({ ...row, city: e.target.value })} /></div>
                  <div><Label>Edição (nº)</Label><Input type="number" value={row.edition_number ?? ""} onChange={(e) => setRow({ ...row, edition_number: Number(e.target.value) || null })} /></div>
                  <div><Label>Ordem</Label><Input type="number" value={row.display_order ?? 0} onChange={(e) => setRow({ ...row, display_order: Number(e.target.value) })} /></div>
                  <div>
                    <Label>Status</Label>
                    <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.status || "draft"} onChange={(e) => setRow({ ...row, status: e.target.value })}>
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                  </div>
                </div>
                <BilingualField labelPt="Função / Papel" valuePt={row.role} valueEn={row.role_en} onPt={(v) => setRow({ ...row, role: v })} onEn={(v) => setRow({ ...row, role_en: v })} />
                <BilingualField labelPt="Descrição" valuePt={row.description} valueEn={row.description_en} onPt={(v) => setRow({ ...row, description: v })} onEn={(v) => setRow({ ...row, description_en: v })} textarea />
                <div><Label>URL da imagem</Label><Input value={row.image_url || ""} onChange={(e) => setRow({ ...row, image_url: e.target.value })} placeholder="https://..." /></div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm"><Switch checked={!!row.featured} onCheckedChange={(v) => setRow({ ...row, featured: v })} />Destaque</label>
                  <label className="flex items-center gap-2 text-sm"><Switch checked={row.active !== false} onCheckedChange={(v) => setRow({ ...row, active: v })} />Ativo</label>
                </div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={save}>Salvar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? <p>Carregando…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p: any) => {
            const pt = !!p.role && !!p.description;
            const en = !!p.role_en && !!p.description_en;
            return (
              <Card key={p.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">{p.name}</h4>
                        {p.featured && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{p.category} · {p.year}{p.city ? ` · ${p.city}` : ""}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => { setRow(p); setOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => confirm("Excluir?") && del.mutate(p.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusCycle value={p.status} onChange={(s) => statusMut.mutate({ id: p.id, status: s })} />
                    <CompletenessChips pt={pt} en={en} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============ PARTNERS ============ */
function PartnersAdmin() {
  const { data = [], isLoading } = useTable("partners", "display_order");
  const upsert = useUpsert("partners");
  const statusMut = useStatusMutation("partners");
  const del = useDelete("partners");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});
  const [filter, setFilter] = useState<FilterState>({ q: "", status: "all" });
  const reset = () => setRow({ name: "", type: PARTNER_TYPES[0], logo_url: "", website_url: "", description: "", description_en: "", active: true, status: "draft", display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  const filtered = useMemo(() => applyFilters(data, filter, ["name", "type", "description"]), [data, filter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground">{filtered.length} / {data.length}</p>
          <FiltersBar value={filter} onChange={setFilter} />
        </div>
        <div className="flex gap-2">
          <CsvToolbar spec={PARTNERS_CSV} rows={data} />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo</Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader><DialogTitle>{row.id ? "Editar" : "Novo"} parceiro</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Nome*</Label><Input value={row.name || ""} onChange={(e) => setRow({ ...row, name: e.target.value })} /></div>
                  <div><Label>Categoria</Label>
                    <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.type || ""} onChange={(e) => setRow({ ...row, type: e.target.value })}>
                      {PARTNER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div><Label>Logo URL</Label><Input value={row.logo_url || ""} onChange={(e) => setRow({ ...row, logo_url: e.target.value })} /></div>
                  <div><Label>Website</Label><Input value={row.website_url || ""} onChange={(e) => setRow({ ...row, website_url: e.target.value })} /></div>
                  <div><Label>Ordem</Label><Input type="number" value={row.display_order ?? 0} onChange={(e) => setRow({ ...row, display_order: Number(e.target.value) })} /></div>
                  <div><Label>Status</Label>
                    <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.status || "draft"} onChange={(e) => setRow({ ...row, status: e.target.value })}>
                      <option value="draft">Rascunho</option><option value="published">Publicado</option><option value="archived">Arquivado</option>
                    </select>
                  </div>
                </div>
                <BilingualField labelPt="Descrição" valuePt={row.description} valueEn={row.description_en} onPt={(v) => setRow({ ...row, description: v })} onEn={(v) => setRow({ ...row, description_en: v })} textarea />
                <label className="flex items-center gap-2 text-sm"><Switch checked={row.active !== false} onCheckedChange={(v) => setRow({ ...row, active: v })} />Ativo</label>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={async () => { if (row.name) { await upsert.mutateAsync(row); setOpen(false); } }}>Salvar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? <p>Carregando…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p: any) => {
            const pt = !!p.description;
            const en = !!p.description_en;
            return (
              <Card key={p.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    {p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-10 w-10 object-contain" /> : <div className="h-10 w-10 rounded bg-muted" />}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{p.name}</h4>
                      <p className="text-xs text-muted-foreground">{p.type}</p>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => { setRow(p); setOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => confirm("Excluir?") && del.mutate(p.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusCycle value={p.status} onChange={(s) => statusMut.mutate({ id: p.id, status: s })} />
                    <CompletenessChips pt={pt} en={en} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============ PRESS KIT ============ */
function PressKitAdmin() {
  const { data = [], isLoading } = useTable("press_kit_assets", "display_order");
  const upsert = useUpsert("press_kit_assets");
  const statusMut = useStatusMutation("press_kit_assets");
  const del = useDelete("press_kit_assets");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});
  const [filter, setFilter] = useState<FilterState>({ q: "", status: "all" });
  const reset = () => setRow({ title: "", title_en: "", type: PRESS_TYPES[0], description: "", description_en: "", file_url: "", thumbnail_url: "", active: true, status: "draft", display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  const filtered = useMemo(() => applyFilters(data, filter, ["title", "title_en", "type"]), [data, filter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground">{filtered.length} / {data.length}</p>
          <FiltersBar value={filter} onChange={setFilter} />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo</Button></DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{row.id ? "Editar" : "Novo"} ativo</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualField labelPt="Título*" valuePt={row.title} valueEn={row.title_en} onPt={(v) => setRow({ ...row, title: v })} onEn={(v) => setRow({ ...row, title_en: v })} />
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Tipo</Label>
                  <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.type || ""} onChange={(e) => setRow({ ...row, type: e.target.value })}>
                    {PRESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><Label>Ordem</Label><Input type="number" value={row.display_order ?? 0} onChange={(e) => setRow({ ...row, display_order: Number(e.target.value) })} /></div>
                <div><Label>Status</Label>
                  <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.status || "draft"} onChange={(e) => setRow({ ...row, status: e.target.value })}>
                    <option value="draft">Rascunho</option><option value="published">Publicado</option><option value="archived">Arquivado</option>
                  </select>
                </div>
              </div>
              <div><Label>Arquivo URL*</Label><Input value={row.file_url || ""} onChange={(e) => setRow({ ...row, file_url: e.target.value })} /></div>
              <div><Label>Thumbnail URL</Label><Input value={row.thumbnail_url || ""} onChange={(e) => setRow({ ...row, thumbnail_url: e.target.value })} /></div>
              <BilingualField labelPt="Descrição" valuePt={row.description} valueEn={row.description_en} onPt={(v) => setRow({ ...row, description: v })} onEn={(v) => setRow({ ...row, description_en: v })} textarea />
              <label className="flex items-center gap-2 text-sm"><Switch checked={row.active !== false} onCheckedChange={(v) => setRow({ ...row, active: v })} />Ativo</label>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={async () => { if (row.title && row.file_url) { await upsert.mutateAsync(row); setOpen(false); } }}>Salvar</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <p>Carregando…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((a: any) => {
            const pt = !!a.title && !!a.description;
            const en = !!a.title_en && !!a.description_en;
            return (
              <Card key={a.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">{a.title}</h4>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => { setRow(a); setOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => confirm("Excluir?") && del.mutate(a.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusCycle value={a.status} onChange={(s) => statusMut.mutate({ id: a.id, status: s })} />
                    <CompletenessChips pt={pt} en={en} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MemoryAssetsAdmin() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Memória, Parceiros & Imprensa</CardTitle>
        <p className="text-sm text-muted-foreground">
          Workflow editorial com rascunho/publicação, completude PT/EN e importação em lote.
          Acesse também{" "}
          <a className="underline" href="/admin/qa/tracking">QA de Tracking</a> e{" "}
          <a className="underline" href="/admin/qa/seo">QA de SEO</a>.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="honored">
          <TabsList>
            <TabsTrigger value="honored">Homenageados</TabsTrigger>
            <TabsTrigger value="partners">Parceiros</TabsTrigger>
            <TabsTrigger value="press">Imprensa</TabsTrigger>
          </TabsList>
          <TabsContent value="honored" className="mt-6"><HonoredAdmin /></TabsContent>
          <TabsContent value="partners" className="mt-6"><PartnersAdmin /></TabsContent>
          <TabsContent value="press" className="mt-6"><PressKitAdmin /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
