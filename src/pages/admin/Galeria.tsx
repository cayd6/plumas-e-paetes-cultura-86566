import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useGalleryPhotos } from '@/hooks/useGalleryPhotos';
import { AdminGalleryGrid } from '@/components/admin/AdminGalleryGrid';
import { PhotoUploadForm } from '@/components/admin/PhotoUploadForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminGaleria() {
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: photos, isLoading } = useGalleryPhotos(selectedYear, selectedType);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const filteredPhotos = photos?.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const years = ['todos', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
  const types = [
    { value: 'todos', label: 'Todos' },
    { value: 'premiacao', label: 'Premiação' },
    { value: 'desfile', label: 'Desfile' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Painel Administrativo - Galeria</h1>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="view" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="view">Visualizar Fotos</TabsTrigger>
            <TabsTrigger value="add">Adicionar Fotos</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Filtros e Busca</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar por título</Label>
                  <Input
                    id="search"
                    placeholder="Digite para buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year-filter">Ano</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>
                          {year === 'todos' ? 'Todos os anos' : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type-filter">Tipo</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Total de fotos: {filteredPhotos.length}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Carregando fotos...</div>
            ) : (
              <AdminGalleryGrid photos={filteredPhotos} />
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Adicionar Novas Fotos</h2>
              <PhotoUploadForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
