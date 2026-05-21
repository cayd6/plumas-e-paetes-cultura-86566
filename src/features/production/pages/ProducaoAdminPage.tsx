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
  useServices, 
  usePortfolioProjects,
  useProducaoMutations,
  Service,
  PortfolioProject
} from '@/hooks/useProducaoData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProducaoAdmin() {
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: projects, isLoading: loadingProjects } = usePortfolioProjects();
  const mutations = useProducaoMutations();

  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    title_pt: '',
    title_en: '',
    description_pt: '',
    description_en: '',
    icon: 'Star',
    features_pt: [],
    features_en: [],
    display_order: 0
  });
  const [newProject, setNewProject] = useState<Omit<PortfolioProject, 'id'>>({
    title_pt: '',
    title_en: '',
    year: '',
    description_pt: '',
    description_en: '',
    image_url: null,
    display_order: 0
  });

  const handleAddService = () => {
    mutations.addService.mutate({
      ...newService,
      display_order: (services?.length || 0) + 1
    });
    setNewService({ title_pt: '', title_en: '', description_pt: '', description_en: '', icon: 'Star', features_pt: [], features_en: [], display_order: 0 });
    setDialogOpen(null);
  };

  const handleAddProject = () => {
    mutations.addProject.mutate({
      ...newProject,
      display_order: (projects?.length || 0) + 1
    });
    setNewProject({ title_pt: '', title_en: '', year: '', description_pt: '', description_en: '', image_url: null, display_order: 0 });
    setDialogOpen(null);
  };

  return (
    <AdminLayout title="Produção">
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Serviços</CardTitle>
              <Dialog open={dialogOpen === 'service'} onOpenChange={(open) => setDialogOpen(open ? 'service' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Serviço</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título (PT)</Label>
                      <Input value={newService.title_pt} onChange={(e) => setNewService(s => ({ ...s, title_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Título (EN)</Label>
                      <Input value={newService.title_en} onChange={(e) => setNewService(s => ({ ...s, title_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Ícone</Label>
                      <Input value={newService.icon} onChange={(e) => setNewService(s => ({ ...s, icon: e.target.value }))} placeholder="Star, Music, Camera..." />
                    </div>
                    <div>
                      <Label>Descrição (PT)</Label>
                      <Textarea value={newService.description_pt} onChange={(e) => setNewService(s => ({ ...s, description_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Descrição (EN)</Label>
                      <Textarea value={newService.description_en} onChange={(e) => setNewService(s => ({ ...s, description_en: e.target.value }))} />
                    </div>
                  </div>
                  <Button onClick={handleAddService} className="w-full mt-4">Adicionar</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingServices ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-3">
                  {services?.map((service) => (
                    <ServiceRow key={service.id} service={service} mutations={mutations} />
                  ))}
                  {services?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhum serviço cadastrado</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Portfólio</CardTitle>
              <Dialog open={dialogOpen === 'project'} onOpenChange={(open) => setDialogOpen(open ? 'project' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Projeto</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Título (PT)</Label>
                      <Input value={newProject.title_pt} onChange={(e) => setNewProject(p => ({ ...p, title_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Título (EN)</Label>
                      <Input value={newProject.title_en} onChange={(e) => setNewProject(p => ({ ...p, title_en: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Ano</Label>
                      <Input value={newProject.year} onChange={(e) => setNewProject(p => ({ ...p, year: e.target.value }))} />
                    </div>
                    <div>
                      <Label>URL da Imagem</Label>
                      <Input value={newProject.image_url || ''} onChange={(e) => setNewProject(p => ({ ...p, image_url: e.target.value || null }))} />
                    </div>
                    <div>
                      <Label>Descrição (PT)</Label>
                      <Textarea value={newProject.description_pt} onChange={(e) => setNewProject(p => ({ ...p, description_pt: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Descrição (EN)</Label>
                      <Textarea value={newProject.description_en} onChange={(e) => setNewProject(p => ({ ...p, description_en: e.target.value }))} />
                    </div>
                  </div>
                  <Button onClick={handleAddProject} className="w-full mt-4">Adicionar</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingProjects ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-3">
                  {projects?.map((project) => (
                    <ProjectRow key={project.id} project={project} mutations={mutations} />
                  ))}
                  {projects?.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">Nenhum projeto cadastrado</p>
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

function ServiceRow({ service, mutations }: { service: Service; mutations: ReturnType<typeof useProducaoMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(service);

  const save = () => {
    mutations.updateService.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.title_pt} onChange={(e) => setData(d => ({ ...d, title_pt: e.target.value }))} placeholder="Título PT" />
          <Input value={data.title_en} onChange={(e) => setData(d => ({ ...d, title_en: e.target.value }))} placeholder="Título EN" />
          <Input value={data.icon} onChange={(e) => setData(d => ({ ...d, icon: e.target.value }))} placeholder="Ícone" />
          <div />
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
        <span className="font-bold">{service.title_pt}</span>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteService.mutate(service.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ProjectRow({ project, mutations }: { project: PortfolioProject; mutations: ReturnType<typeof useProducaoMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(project);

  const save = () => {
    mutations.updateProject.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input value={data.title_pt} onChange={(e) => setData(d => ({ ...d, title_pt: e.target.value }))} placeholder="Título PT" />
          <Input value={data.title_en} onChange={(e) => setData(d => ({ ...d, title_en: e.target.value }))} placeholder="Título EN" />
          <Input value={data.year} onChange={(e) => setData(d => ({ ...d, year: e.target.value }))} placeholder="Ano" />
          <Input value={data.image_url || ''} onChange={(e) => setData(d => ({ ...d, image_url: e.target.value || null }))} placeholder="URL da Imagem" />
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
        <span className="font-bold">{project.title_pt}</span>
        <span className="mx-2">-</span>
        <span className="text-muted-foreground">{project.year}</span>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteProject.mutate(project.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
