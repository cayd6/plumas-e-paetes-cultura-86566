import { ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

/**
 * Gate around admin routes. Renders children (which trigger the lazy admin
 * bundle import) ONLY when the user is authenticated AND has the admin role.
 * Otherwise shows a lightweight login form that lives in the main bundle, so
 * the admin chunk is never downloaded by unauthenticated visitors.
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
          role="status"
          aria-label="Carregando"
        />
      </div>
    );
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-carnival-purple to-carnival-blue p-4">
        <div className="text-white text-xl text-center">
          Acesso negado. Você não tem permissão de administrador.
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        variant: 'destructive',
        title: 'Erro de validação',
        description: validation.error.errors[0].message,
      });
      return;
    }
    setSubmitting(true);
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
      } else {
        toast({ title: 'Conta criada com sucesso!', description: 'Entre com suas credenciais.' });
        setIsSignUp(false);
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
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-carnival-purple to-carnival-blue p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Painel Administrativo</CardTitle>
          <CardDescription className="text-center">
            {isSignUp ? 'Crie sua conta para acessar' : 'Entre com suas credenciais de administrador'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@exemplo.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? (isSignUp ? 'Criando conta...' : 'Entrando...')
                : (isSignUp ? 'Criar Conta' : 'Entrar')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isSignUp ? (
              <p>
                Já tem uma conta?{' '}
                <button type="button" onClick={() => setIsSignUp(false)}
                  className="text-primary hover:underline font-medium">Fazer login</button>
              </p>
            ) : (
              <p>
                Não tem uma conta?{' '}
                <button type="button" onClick={() => setIsSignUp(true)}
                  className="text-primary hover:underline font-medium">Criar conta</button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
