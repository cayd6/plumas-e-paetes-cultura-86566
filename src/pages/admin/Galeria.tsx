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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export default function AdminGaleria() {
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { data: photos, isLoading } = useGalleryPhotos(selectedYear, selectedType);
  const { signOut, signIn, signUp, user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        variant: 'destructive',
        title: 'Erro de validação',
        description: firstError.message,
      });
      return;
    }

    setLoading(true);
    
    if (isSignUp) {
      const { error } = await signUp(email, password);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao criar conta',
          description: error.message === 'User already registered'
            ? 'Este email já está cadastrado'
            : error.message,
        });
        setLoading(false);
      } else {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Entre com suas credenciais para acessar.',
        });
        setIsSignUp(false);
        setLoading(false);
      }
    } else {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: error.message === 'Invalid login credentials'
            ? 'Email ou senha incorretos'
            : error.message,
        });
        setLoading(false);
      } else {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo ao painel administrativo.',
        });
      }
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-carnival-purple to-carnival-blue">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  // Not authenticated - show login/signup form
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-carnival-purple to-carnival-blue p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">
              Painel Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Crie sua conta para acessar' 
                : 'Entre com suas credenciais de administrador'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading 
                  ? (isSignUp ? 'Criando conta...' : 'Entrando...') 
                  : (isSignUp ? 'Criar Conta' : 'Entrar')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {isSignUp ? (
                <p>
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Fazer login
                  </button>
                </p>
              ) : (
                <p>
                  Não tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Criar conta
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated but not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-carnival-purple to-carnival-blue">
        <div className="text-white text-xl text-center p-4">
          Acesso negado. Você não tem permissão de administrador.
        </div>
      </div>
    );
  }

  // Authenticated and is admin - show admin panel
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
