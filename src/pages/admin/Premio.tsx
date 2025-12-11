import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, Save } from 'lucide-react';
import { 
  useAwardStats, 
  useAwardProfessionals, 
  useAwardSchools, 
  useAwardCuriosities,
  useAwardMutations,
  AwardProfessional,
  AwardSchool,
  AwardCuriosity
} from '@/hooks/useAwardData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AdminPremio() {
  const { data: stats, isLoading: loadingStats } = useAwardStats();
  const { data: professionals, isLoading: loadingProfessionals } = useAwardProfessionals();
  const { data: schools, isLoading: loadingSchools } = useAwardSchools();
  const { data: curiosities, isLoading: loadingCuriosities } = useAwardCuriosities();
  const mutations = useAwardMutations();

  const [editingStats, setEditingStats] = useState<Record<string, number>>({});
  const [newProfessional, setNewProfessional] = useState({ name: '', awards_count: 0, rank: 1 });
  const [newSchool, setNewSchool] = useState({ name: '', awards_count: 0, rank: 1 });
  const [newCuriosity, setNewCuriosity] = useState({ text_pt: '', text_en: '', icon: 'Star', display_order: 0 });
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);

  const handleStatChange = (id: string, value: number) => {
    setEditingStats(prev => ({ ...prev, [id]: value }));
  };

  const saveStats = () => {
    Object.entries(editingStats).forEach(([id, value]) => {
      mutations.updateStat.mutate({ id, value });
    });
    setEditingStats({});
  };

  const handleAddProfessional = () => {
    mutations.addProfessional.mutate(newProfessional);
    setNewProfessional({ name: '', awards_count: 0, rank: (professionals?.length || 0) + 1 });
    setDialogOpen(null);
  };

  const handleAddSchool = () => {
    mutations.addSchool.mutate(newSchool);
    setNewSchool({ name: '', awards_count: 0, rank: (schools?.length || 0) + 1 });
    setDialogOpen(null);
  };

  const handleAddCuriosity = () => {
    mutations.addCuriosity.mutate(newCuriosity);
    setNewCuriosity({ text_pt: '', text_en: '', icon: 'Star', display_order: (curiosities?.length || 0) + 1 });
    setDialogOpen(null);
  };

  return (
    <AdminLayout title="Prêmio Plumas e Paetês">
      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="professionals">Top Profissionais</TabsTrigger>
          <TabsTrigger value="schools">Top Escolas</TabsTrigger>
          <TabsTrigger value="curiosities">Curiosidades</TabsTrigger>
        </TabsList>

        {/* Statistics Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Estatísticas do Prêmio</CardTitle>
              {Object.keys(editingStats).length > 0 && (
                <Button onClick={saveStats} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <p>Carregando...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats?.map((stat) => (
                    <div key={stat.id} className="p-4 border rounded-lg">
                      <Label>{stat.label_pt}</Label>
                      <Input
                        type="number"
                        value={editingStats[stat.id] ?? stat.value}
                        onChange={(e) => handleStatChange(stat.id, parseInt(e.target.value) || 0)}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professionals Tab */}
        <TabsContent value="professionals">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Profissionais</CardTitle>
              <Dialog open={dialogOpen === 'professional'} onOpenChange={(open) => setDialogOpen(open ? 'professional' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Profissional</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={newProfessional.name}
                        onChange={(e) => setNewProfessional(p => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Número de Prêmios</Label>
                      <Input
                        type="number"
                        value={newProfessional.awards_count}
                        onChange={(e) => setNewProfessional(p => ({ ...p, awards_count: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label>Posição no Ranking</Label>
                      <Input
                        type="number"
                        value={newProfessional.rank}
                        onChange={(e) => setNewProfessional(p => ({ ...p, rank: parseInt(e.target.value) || 1 }))}
                      />
                    </div>
                    <Button onClick={handleAddProfessional} className="w-full">Adicionar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingProfessionals ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-2">
                  {professionals?.map((prof) => (
                    <ProfessionalRow key={prof.id} professional={prof} mutations={mutations} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schools Tab */}
        <TabsContent value="schools">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Escolas</CardTitle>
              <Dialog open={dialogOpen === 'school'} onOpenChange={(open) => setDialogOpen(open ? 'school' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Escola</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={newSchool.name}
                        onChange={(e) => setNewSchool(s => ({ ...s, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Número de Prêmios</Label>
                      <Input
                        type="number"
                        value={newSchool.awards_count}
                        onChange={(e) => setNewSchool(s => ({ ...s, awards_count: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label>Posição no Ranking</Label>
                      <Input
                        type="number"
                        value={newSchool.rank}
                        onChange={(e) => setNewSchool(s => ({ ...s, rank: parseInt(e.target.value) || 1 }))}
                      />
                    </div>
                    <Button onClick={handleAddSchool} className="w-full">Adicionar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingSchools ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-2">
                  {schools?.map((school) => (
                    <SchoolRow key={school.id} school={school} mutations={mutations} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curiosities Tab */}
        <TabsContent value="curiosities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Curiosidades</CardTitle>
              <Dialog open={dialogOpen === 'curiosity'} onOpenChange={(open) => setDialogOpen(open ? 'curiosity' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Curiosidade</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Texto (PT)</Label>
                      <Input
                        value={newCuriosity.text_pt}
                        onChange={(e) => setNewCuriosity(c => ({ ...c, text_pt: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Texto (EN)</Label>
                      <Input
                        value={newCuriosity.text_en}
                        onChange={(e) => setNewCuriosity(c => ({ ...c, text_en: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Ícone (Trophy, Award, Users, Star, etc.)</Label>
                      <Input
                        value={newCuriosity.icon}
                        onChange={(e) => setNewCuriosity(c => ({ ...c, icon: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleAddCuriosity} className="w-full">Adicionar</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingCuriosities ? (
                <p>Carregando...</p>
              ) : (
                <div className="space-y-2">
                  {curiosities?.map((curiosity) => (
                    <CuriosityRow key={curiosity.id} curiosity={curiosity} mutations={mutations} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

// Row Components
function ProfessionalRow({ professional, mutations }: { professional: AwardProfessional; mutations: ReturnType<typeof useAwardMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(professional);

  const save = () => {
    mutations.updateProfessional.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded">
        <Input value={data.rank} onChange={(e) => setData(d => ({ ...d, rank: parseInt(e.target.value) || 1 }))} className="w-16" type="number" />
        <Input value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} className="flex-1" />
        <Input value={data.awards_count} onChange={(e) => setData(d => ({ ...d, awards_count: parseInt(e.target.value) || 0 }))} className="w-20" type="number" />
        <Button size="sm" onClick={save}>Salvar</Button>
        <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span className="flex items-center gap-3">
        <span className="font-bold text-muted-foreground w-8">{professional.rank}º</span>
        <span>{professional.name}</span>
        <span className="text-muted-foreground">({professional.awards_count} prêmios)</span>
      </span>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteProfessional.mutate(professional.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SchoolRow({ school, mutations }: { school: AwardSchool; mutations: ReturnType<typeof useAwardMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(school);

  const save = () => {
    mutations.updateSchool.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded">
        <Input value={data.rank} onChange={(e) => setData(d => ({ ...d, rank: parseInt(e.target.value) || 1 }))} className="w-16" type="number" />
        <Input value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} className="flex-1" />
        <Input value={data.awards_count} onChange={(e) => setData(d => ({ ...d, awards_count: parseInt(e.target.value) || 0 }))} className="w-20" type="number" />
        <Button size="sm" onClick={save}>Salvar</Button>
        <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span className="flex items-center gap-3">
        <span className="font-bold text-muted-foreground w-8">{school.rank}º</span>
        <span>{school.name}</span>
        <span className="text-muted-foreground">({school.awards_count} prêmios)</span>
      </span>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteSchool.mutate(school.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CuriosityRow({ curiosity, mutations }: { curiosity: AwardCuriosity; mutations: ReturnType<typeof useAwardMutations> }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(curiosity);

  const save = () => {
    mutations.updateCuriosity.mutate(data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-3 border rounded space-y-2">
        <Input value={data.text_pt} onChange={(e) => setData(d => ({ ...d, text_pt: e.target.value }))} placeholder="Texto PT" />
        <Input value={data.text_en} onChange={(e) => setData(d => ({ ...d, text_en: e.target.value }))} placeholder="Texto EN" />
        <Input value={data.icon} onChange={(e) => setData(d => ({ ...d, icon: e.target.value }))} placeholder="Ícone" />
        <div className="flex gap-2">
          <Button size="sm" onClick={save}>Salvar</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span>{curiosity.text_pt}</span>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => mutations.deleteCuriosity.mutate(curiosity.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
