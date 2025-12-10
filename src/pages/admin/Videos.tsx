import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useGalleryVideos } from '@/hooks/useGalleryVideos';
import { AdminVideoGrid } from '@/components/admin/AdminVideoGrid';
import { VideoUploadForm } from '@/components/admin/VideoUploadForm';

export default function AdminVideos() {
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: videos, isLoading } = useGalleryVideos(selectedYear, selectedType);

  const filteredVideos = videos?.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const years = ['todos', '2025', '2024', '2023', '2022', '2021', '2020'];
  const types = [
    { value: 'todos', label: 'Todos' },
    { value: 'entrevista', label: 'Entrevista' },
    { value: 'documentario', label: 'Documentário' },
    { value: 'cobertura', label: 'Cobertura' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <AdminLayout title="Gerenciar Vídeos">
      <Tabs defaultValue="view" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="view">Visualizar</TabsTrigger>
          <TabsTrigger value="add">Adicionar</TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-6">
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Buscar</Label>
                <Input
                  placeholder="Digite para buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Ano</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {years.map(y => (
                      <SelectItem key={y} value={y}>{y === 'todos' ? 'Todos' : y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {types.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Total: {filteredVideos.length}</div>
          </div>
          {isLoading ? <div className="text-center py-12">Carregando...</div> : <AdminVideoGrid videos={filteredVideos} />}
        </TabsContent>

        <TabsContent value="add">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Adicionar Novo Vídeo</h2>
            <VideoUploadForm />
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
