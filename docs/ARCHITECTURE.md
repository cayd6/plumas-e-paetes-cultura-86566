# Arquitetura do Projeto

Documento de referência para a equipe. Define a estrutura alvo, convenções e padrões a serem seguidos em novas features e migrações graduais.

## Stack

- **Frontend**: React 18 + Vite 5 + TypeScript 5
- **UI**: TailwindCSS 3 + shadcn/ui + Radix
- **Estado de servidor**: TanStack Query
- **Backend**: Lovable Cloud (Supabase) — auth, DB com RLS, storage, edge functions
- **Roteamento**: react-router-dom v6
- **i18n**: Context próprio (PT/EN) em `src/contexts/LanguageContext.tsx`

## Estrutura de pastas alvo

```text
src/
  App.tsx                    # bootstrap (providers + router lazy)
  main.tsx
  index.css                  # tokens HSL + utilitários globais

  integrations/supabase/     # gerado — NÃO editar
  assets/                    # imagens importadas (bundle)

  components/
    ui/                      # shadcn primitives (Button, Card…)
    home/                    # seções específicas da Home
    admin/                   # shell e widgets do painel admin
    <componente>.tsx         # cross-feature (Navigation, Footer, SEO…)

  contexts/                  # AuthContext, LanguageContext
  hooks/                     # hooks de dados (useAwardData, useBlogData…)
  lib/                       # utils puros
  pages/                     # uma página por rota
    admin/                   # painéis admin
```

> Migração futura para `features/<dominio>/` (components + hooks + api + types
> co-localizados) está prevista. Quando movida, manter re-exports temporários
> em `components/` e `hooks/` para não quebrar imports legados.

## Convenções

### Nomeação
- Componentes e páginas em **PascalCase** (`ProjectCard.tsx`).
- Hooks em **camelCase** com prefixo `use` (`useAwardData.ts`).
- Utilitários em **camelCase** (`formatDate.ts`).
- Tipos exportados em **PascalCase** (`type AwardEdition`).

### Imports
- Sempre usar alias `@/` para qualquer caminho fora do mesmo diretório.
- Ordem: libs externas → `@/` internos → relativos → estilos.

### Componentes
- Um componente por arquivo, export default.
- Props tipadas via `interface XProps`.
- Sem lógica de fetch dentro do componente — usar hook dedicado.

### Dados / Supabase
- Toda chamada ao Supabase fica em um hook (`useXData`) ou função em `lib/api/`.
- Componentes consomem apenas hooks; nunca importam `supabase` diretamente.
- React Query para cache de leitura; mutations expostas via hook (`useXMutations`).

### Design system

**Regra crítica**: nunca usar cores cruas (`text-white`, `bg-black`, `#fff`)
em componentes. Sempre tokens semânticos do `index.css` / `tailwind.config.ts`:

| Uso                       | Token                         |
|---------------------------|-------------------------------|
| Fundo padrão              | `bg-background`               |
| Texto padrão              | `text-foreground`             |
| Cor principal da marca    | `bg-primary` / `text-primary` |
| Texto sobre primary       | `text-primary-foreground`     |
| Acento (carnaval)         | `bg-accent`                   |
| Texto silenciado          | `text-muted-foreground`       |
| Borda                     | `border-border`               |

Gradientes e sombras complexos devem virar variáveis CSS em `index.css`
(`--gradient-hero`, `--shadow-card`) e ser expostos como utilitários Tailwind.

### Acessibilidade & SEO
- Único `<h1>` por página; hierarquia `h2`/`h3` consistente.
- Todas as imagens com `alt` descritivo.
- Componente `<SEO />` em toda rota pública com `title`/`description` únicos.
- Imagens com `width`/`height` explícitos e `loading="lazy"` (exceto LCP).

### Performance
- Rotas são **lazy** em `App.tsx` (`React.lazy` + `<Suspense>`).
- LCP do Hero pré-carregado em `index.html` (`<link rel="preload" as="image">`).
- Listas longas devem usar virtualização quando >100 itens.
- Memoizar contextos: valor do provider sempre via `useMemo`.

### i18n
- Adicionar chaves em ambos os blocos (`pt` e `en`) de `LanguageContext.tsx`.
- Nunca hardcodar strings visíveis — usar `translate('chave')`.

## Admin
- Rota única `/admin` para login/gestão.
- Role `admin` atribuído manualmente via tabela `user_roles` (jamais armazenar role no profile).
- Páginas admin envolvidas pelo `AdminLayout` (sidebar + header consistentes).

## CMS-driven content
- Todo conteúdo institucional editável (textos da Home, Sobre, Prêmio, Revista,
  banners, vídeos, galeria) vem do Supabase via hook `useXData`.
- Strings de UI (botões, navegação) ficam no `LanguageContext`.

## Checklist para nova feature

1. Criar página em `src/pages/<Nome>.tsx` com `<SEO />`.
2. Criar hook de dados em `src/hooks/use<Nome>Data.ts` (React Query + Supabase).
3. Quebrar UI em componentes pequenos em `src/components/<feature>/`.
4. Adicionar rota lazy em `src/App.tsx`.
5. Atualizar `public/sitemap.xml` se rota pública.
6. Adicionar traduções PT/EN no `LanguageContext`.
7. RLS configurada em qualquer tabela nova; nunca expor dados sem policy.

## O que NÃO fazer

- Editar `src/integrations/supabase/client.ts` ou `types.ts` (gerados).
- Editar `.env` ou `supabase/config.toml` (project-level).
- Reintroduzir rotas removidas: `/edicoes/:id`, `/revistas`.
- Alterar cores da marca, logo, tom institucional sem pedido explícito.
- Armazenar `role` em `profiles` (vulnerabilidade de escalada de privilégio).
- Usar `console.log` em produção.
