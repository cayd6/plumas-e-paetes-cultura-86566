import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2, Star, StarOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

/* ============ HONORED PEOPLE ============ */
function HonoredAdmin() {
  const { data = [], isLoading } = useTable("honored_people", "year");
  const upsert = useUpsert("honored_people");
  const del = useDelete("honored_people");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});

  const reset = () => setRow({ name: "", category: HONORED_CATEGORIES[0], year: new Date().getFullYear(), role: "", role_en: "", description: "", description_en: "", city: "", image_url: "", featured: false, active: true, display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  const save = async () => {
    if (!row.name?.trim()) return;
    await upsert.mutateAsync(row);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.length} homenageados cadastrados</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo homenageado</Button></DialogTrigger>
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

      {isLoading ? <p>Carregando…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((p: any) => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{p.name}</h4>
                      {p.featured && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{p.category} · {p.year}{p.city ? ` · ${p.city}` : ""}</p>
                    {!p.active && <Badge variant="outline" className="mt-1 text-xs">inativo</Badge>}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => { setRow(p); setOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => confirm("Excluir?") && del.mutate(p.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ PARTNERS ============ */
function PartnersAdmin() {
  const { data = [], isLoading } = useTable("partners", "display_order");
  const upsert = useUpsert("partners");
  const del = useDelete("partners");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});
  const reset = () => setRow({ name: "", type: PARTNER_TYPES[0], logo_url: "", website_url: "", description: "", description_en: "", active: true, display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.length} parceiros</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo parceiro</Button></DialogTrigger>
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
              </div>
              <BilingualField labelPt="Descrição" valuePt={row.description} valueEn={row.description_en} onPt={(v) => setRow({ ...row, description: v })} onEn={(v) => setRow({ ...row, description_en: v })} textarea />
              <label className="flex items-center gap-2 text-sm"><Switch checked={row.active !== false} onCheckedChange={(v) => setRow({ ...row, active: v })} />Ativo</label>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={async () => { if (row.name) { await upsert.mutateAsync(row); setOpen(false); } }}>Salvar</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <p>Carregando…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((p: any) => (
            <Card key={p.id}>
              <CardContent className="p-4 flex items-center gap-3">
                {p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-10 w-10 object-contain" /> : <div className="h-10 w-10 rounded bg-muted" />}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{p.name}</h4>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => { setRow(p); setOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                <Button size="icon" variant="ghost" onClick={() => confirm("Excluir?") && del.mutate(p.id)}><Trash2 className="h-3 w-3" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ PRESS KIT ============ */
function PressKitAdmin() {
  const { data = [], isLoading } = useTable("press_kit_assets", "display_order");
  const upsert = useUpsert("press_kit_assets");
  const del = useDelete("press_kit_assets");
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<AnyRow>({});
  const reset = () => setRow({ title: "", title_en: "", type: PRESS_TYPES[0], description: "", description_en: "", file_url: "", thumbnail_url: "", active: true, display_order: 0 });
  useEffect(() => { if (!open) reset(); }, [open]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.length} ativos de imprensa</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button onClick={() => { reset(); setOpen(true); }}><Plus className="h-4 w-4 mr-2" />Novo ativo</Button></DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{row.id ? "Editar" : "Novo"} ativo</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <BilingualField labelPt="Título*" valuePt={row.title} valueEn={row.title_en} onPt={(v) => setRow({ ...row, title: v })} onEn={(v) => setRow({ ...row, title_en: v })} />
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Tipo</Label>
                  <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" value={row.type || ""} onChange={(e) => setRow({ ...row, type: e.target.value })}>
                    {PRESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><Label>Ordem</Label><Input type="number" value={row.display_order ?? 0} onChange={(e) => setRow({ ...row, display_order: Number(e.target.value) })} /></div>
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
          {data.map((a: any) => (
            <Card key={a.id}>
              <CardContent className="p-4">
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
              </CardContent>
            </Card>
          ))}
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
        <p className="text-sm text-muted-foreground">Gerencie homenageados, parceiros institucionais e materiais para imprensa. Edição bilíngue PT/EN.</p>
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
