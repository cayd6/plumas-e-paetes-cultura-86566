import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { 
  useTimelineEvents, 
  useTestimonials,
  useAboutMutations,
  TimelineEvent,
  Testimonial
} from '@/hooks/useAboutData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function SobreAdmin() {
  const { data: timeline, isLoading: loadingTimeline } = useTimelineEvents();
  const { data: testimonials, isLoading: loadingTestimonials } = useTestimonials();
  const mutations = useAboutMutations();

  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<TimelineEvent, 'id'>>({
    year: '',
    title_pt: '',
    title_en: '',
    description_pt: '',
    description_en: '',
    image_url: null,
    display_order: 0
  });
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role_pt: '',
    role_en: '',
    quote_pt: '',
    quote_en: '',
    image_url: null,
    display_order: 0
  });

  const handleAddEvent = () => {
    mutations.addTimelineEvent.mutate({
      ...newEvent,
      display_order: (timeline?.length || 0) + 1
    });
    setNewEvent({ year: '', title_pt: '', title_en: '', description_pt: '', description_en: '', image_url: null, display_order: 0 });
    setDialogOpen(null);
  };

  const handleAddTestimonial = () => {
    mutations.addTestimonial.mutate({
      ...newTestimonial,
      display_order: (testimonials?.length || 0) + 1
    });
    setNewTestimonial({ name: '', role_pt: '', role_en: '', quote_pt: '', quote_en: '', image_url: null, display_order: 0 });
    setDialogOpen(null);
  };

  return (
    <AdminLayout title="Quem Somos">
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Linha do Tempo</CardTitle>
              <Dialog open={dialogOpen === 'event'} onOpenChange={(open) => setDialogOpen(open ? 'event' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Evento</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ano</Label>
                      <Input value={newEvent.year} onChange={(e) => setNewEvent(ev => ({ ...ev, year: e.target.value }))} />
                    </div>
                    <div>
                      <Label>URL da Imagem</Label>
                      <Input value={newEvent.image_url || ''} onChange={(e) => setNewEvent(ev => ({ ...ev, image_url: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>Título (PT)</Label>
                      <Input value={newEvent.title_pt} onChange={(e) => setNewEvent(ev => ({ ...ev, title_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Título (EN)</Label>
                      <Input value={newEvent.title_en} onChange={(e) => setNewEvent(ev => ({ ...ev, title_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Descrição (PT)</Label>
                      <Textarea value={newEvent.description_pt} onChange={(e) => setNewEvent(ev => ({ ...ev, description_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Descrição (EN)</Label>
                      <Textarea value={newEvent.description_en} onChange={(e) => setNewEvent(ev => ({ ...ev, description_en: e.target.value }))} />
                    </div>
                  </div>
                  <Button onClick={handleAddEvent} className="w-full mt-4">Adicionar</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingTimeline ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-3">
                  {timeline?.map((event) => (
                    <TimelineEventRow key={event.id} event={event} mutations={mutations} />
                  ))}
                  {timeline?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhum evento cadastrado</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Depoimentos</CardTitle>
              <Dialog open={dialogOpen === 'testimonial'} onOpenChange={(open) => setDialogOpen(open ? 'testimonial' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Depoimento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Depoimento</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome</Label>
                      <Input value={newTestimonial.name} onChange={(e) => setNewTestimonial(t => ({ ...t, name: e.target.value }))} />
                    </div>
                    <div>
                      <Label>URL da Foto</Label>
                      <Input value={newTestimonial.image_url || ''} onChange={(e) => setNewTestimonial(t => ({ ...t, image_url: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>Cargo (PT)</Label>
                      <Input value={newTestimonial.role_pt} onChange={(e) => setNewTestimonial(t => ({ ...t, role_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Cargo (EN)</Label>
                      <Input value={newTestimonial.role_en} onChange={(e) => setNewTestimonial(t => ({ ...t, role_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Depoimento (PT)</Label>
                      <Textarea value={newTestimonial.quote_pt} onChange={(e) => setNewTestimonial(t => ({ ...t, quote_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Depoimento (EN)</Label>
                      <Textarea value={newTestimonial.quote_en} onChange={(e) => setNewTestimonial(t => ({ ...t, quote_en: e.target.value }))} />
                    </div>
                  </div>
                  <Button onClick={handleAddTestimonial} className="w-full mt-4">Adicionar</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingTestimonials ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-3">
                  {testimonials?.map((testimonial) => (
                    <TestimonialRow key={testimonial.id} testimonial={testimonial} mutations={mutations} />
                  ))}
                  {testimonials?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhum depoimento cadastrado</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

function TimelineEventRow({ event, mutations }: { event: TimelineEvent; mutations: ReturnType<typeof useAboutMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(event);

  const save = () => {
    mutations.updateTimelineEvent.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.year} onChange={(e) => setData(d => ({ ...d, year: e.target.value }))} placeholder="Ano" />
          <Input value={data.image_url || ''} onChange={(e) => setData(d => ({ ...d, image_url: e.target.value || null }))} placeholder="URL da Imagem" />
          <Input value={data.title_pt} onChange={(e) => setData(d => ({ ...d, title_pt: e.target.value }))} placeholder="Título PT" />
          <Input value={data.title_en} onChange={(e) => setData(d => ({ ...d, title_en: e.target.value }))} placeholder="Título EN" />
          <Textarea value={data.description_pt} onChange={(e) => setData(d => ({ ...d, description_pt: e.target.value }))} placeholder="Descrição PT" />
          <Textarea value={data.description_en} onChange={(e) => setData(d => ({ ...d, description_en: e.target.value }))} placeholder="Descrição EN" />
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
      <div>
        <span className="font-bold">{event.year}</span>
        <span className="mx-2">-</span>
        <span>{event.title_pt}</span>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteTimelineEvent.mutate(event.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function TestimonialRow({ testimonial, mutations }: { testimonial: Testimonial; mutations: ReturnType<typeof useAboutMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(testimonial);

  const save = () => {
    mutations.updateTestimonial.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} placeholder="Nome" />
          <Input value={data.image_url || ''} onChange={(e) => setData(d => ({ ...d, image_url: e.target.value || null }))} placeholder="URL da Foto" />
          <Input value={data.role_pt} onChange={(e) => setData(d => ({ ...d, role_pt: e.target.value }))} placeholder="Cargo PT" />
          <Input value={data.role_en} onChange={(e) => setData(d => ({ ...d, role_en: e.target.value }))} placeholder="Cargo EN" />
          <Textarea value={data.quote_pt} onChange={(e) => setData(d => ({ ...d, quote_pt: e.target.value }))} placeholder="Depoimento PT" />
          <Textarea value={data.quote_en} onChange={(e) => setData(d => ({ ...d, quote_en: e.target.value }))} placeholder="Depoimento EN" />
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
      <div>
        <span className="font-bold">{testimonial.name}</span>
        <span className="mx-2">-</span>
        <span className="text-muted-foreground">{testimonial.role_pt}</span>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteTestimonial.mutate(testimonial.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
