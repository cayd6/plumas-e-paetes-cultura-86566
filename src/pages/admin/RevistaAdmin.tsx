import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { 
  useMagazineEditions,
  useMagazineMutations,
  MagazineEdition
} from '@/hooks/useMagazineData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function RevistaAdmin() {
  const { data: editions, isLoading } = useMagazineEditions();
  const mutations = useMagazineMutations();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEdition, setNewEdition] = useState<Omit<MagazineEdition, 'id'>>({
    year: '',
    title_pt: '',
    title_en: '',
    description_pt: null,
    description_en: null,
    cover_url: null,
    pages: [],
    display_order: 0
  });
  const [pagesInput, setPagesInput] = useState('');

  const handleAddEdition = () => {
    const pages = pagesInput.split('\n').filter(url => url.trim());
    mutations.addEdition.mutate({
      ...newEdition,
      pages,
      display_order: (editions?.length || 0) + 1
    });
    setNewEdition({
      year: '',
      title_pt: '',
      title_en: '',
      description_pt: null,
      description_en: null,
      cover_url: null,
      pages: [],
      display_order: 0
    });
    setPagesInput('');
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Revista Plumas e Paetês">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Edições da Revista</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Edição
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Edição</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ano</Label>
                  <Input value={newEdition.year} onChange={(e) => setNewEdition(ed => ({ ...ed, year: e.target.value }))} />
                </div>
                <div>
                  <Label>URL da Capa</Label>
                  <Input value={newEdition.cover_url || ''} onChange={(e) => setNewEdition(ed => ({ ...ed, cover_url: e.target.value || null }))} />
                </div>
                <div>
                  <Label>Título (PT)</Label>
                  <Input value={newEdition.title_pt} onChange={(e) => setNewEdition(ed => ({ ...ed, title_pt: e.target.value }))} />
                </div>
                <div>
                  <Label>Título (EN)</Label>
                  <Input value={newEdition.title_en} onChange={(e) => setNewEdition(ed => ({ ...ed, title_en: e.target.value }))} />
                </div>
                <div>
                  <Label>Descrição (PT)</Label>
                  <Textarea value={newEdition.description_pt || ''} onChange={(e) => setNewEdition(ed => ({ ...ed, description_pt: e.target.value || null }))} />
                </div>
                <div>
                  <Label>Descrição (EN)</Label>
                  <Textarea value={newEdition.description_en || ''} onChange={(e) => setNewEdition(ed => ({ ...ed, description_en: e.target.value || null }))} />
                </div>
                <div className="col-span-2">
                  <Label>URLs das Páginas (uma por linha)</Label>
                  <Textarea 
                    value={pagesInput} 
                    onChange={(e) => setPagesInput(e.target.value)} 
                    className="min-h-[100px]"
                    placeholder="https://exemplo.com/pagina1.jpg&#10;https://exemplo.com/pagina2.jpg"
                  />
                </div>
              </div>
              <Button onClick={handleAddEdition} className="w-full mt-4">Adicionar Edição</Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <div className="space-y-3">
              {editions?.map((edition) => (
                <EditionRow key={edition.id} edition={edition} mutations={mutations} />
              ))}
              {editions?.length === 0 && (
                <p className="text-muted-foreground text-center py-4">Nenhuma edição cadastrada</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}

function EditionRow({ edition, mutations }: { edition: MagazineEdition; mutations: ReturnType<typeof useMagazineMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(edition);
  const [pagesInput, setPagesInput] = useState(edition.pages.join('\n'));

  const save = () => {
    const pages = pagesInput.split('\n').filter(url => url.trim());
    mutations.updateEdition.mutate({ ...data, pages });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.year} onChange={(e) => setData(d => ({ ...d, year: e.target.value }))} placeholder="Ano" />
          <Input value={data.cover_url || ''} onChange={(e) => setData(d => ({ ...d, cover_url: e.target.value || null }))} placeholder="URL da Capa" />
          <Input value={data.title_pt} onChange={(e) => setData(d => ({ ...d, title_pt: e.target.value }))} placeholder="Título PT" />
          <Input value={data.title_en} onChange={(e) => setData(d => ({ ...d, title_en: e.target.value }))} placeholder="Título EN" />
          <Textarea value={data.description_pt || ''} onChange={(e) => setData(d => ({ ...d, description_pt: e.target.value || null }))} placeholder="Descrição PT" />
          <Textarea value={data.description_en || ''} onChange={(e) => setData(d => ({ ...d, description_en: e.target.value || null }))} placeholder="Descrição EN" />
          <div className="col-span-2">
            <Label>URLs das Páginas (uma por linha)</Label>
            <Textarea 
              value={pagesInput} 
              onChange={(e) => setPagesInput(e.target.value)} 
              className="min-h-[80px]"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Salvar</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded">
      <div className="flex items-center gap-4">
        {edition.cover_url && (
          <img src={edition.cover_url} alt={edition.title_pt} className="w-12 h-16 object-cover rounded" />
        )}
        <div>
          <span className="font-bold">{edition.title_pt}</span>
          <span className="mx-2">-</span>
          <span className="text-muted-foreground">{edition.year}</span>
          <span className="ml-2 text-xs text-muted-foreground">({edition.pages.length} páginas)</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteEdition.mutate(edition.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
