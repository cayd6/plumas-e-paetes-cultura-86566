# Reestruturação do Projeto — Padrão Profissional

Refator profundo do código do Instituto Plumas & Paetês Cultural, organizando o projeto em arquitetura por *features*, consolidando duplicações, padronizando design system e melhorando performance. Sem alterar conteúdo institucional, cores da marca, dados ou rotas em uso.

## Objetivos

1. Arquitetura previsível por feature (cada domínio com seus componentes, hooks, tipos e API).
2. Eliminar componentes duplicados e código morto.
3. Design system consistente — zero cor hardcoded, tokens semânticos em toda UI.
4. Performance — code splitting por rota, lazy loading de imagens e mídia, bundle menor.
5. Qualidade — tipagem estrita, padrões de import, nomes consistentes.

## Estado atual (diagnóstico)

- 134 arquivos `.ts/.tsx`, várias páginas com 300–800 linhas concentrando lógica + UI.
- Duplicações detectadas:
  - `MissionCards` vs `home/PillarCards` (mesma função)
  - `PlumasEmNumeros` vs `home/ImpactNumbers`
  - `Testimonials` vs `home/TestimonialsSection`
  - `pages/Edicoes` vs `pages/EdicoesEnhanced` (rotas `/edicoes` e `/premio` apontam para a Enhanced)
- 32 arquivos usam classes de cor cruas (`text-white`, `bg-black` etc.) em vez de tokens semânticos.
- Hooks de dados (`useAboutData`, `useAwardData`, `useBlogData`…) misturados num único diretório plano.
- Páginas admin replicam estrutura sem layout/componentes compartilhados consistentes.
- `App.tsx` importa todas as páginas estaticamente (sem code splitting).

## Nova estrutura de pastas

```text
src/
  app/                       # bootstrap: providers, router, layout raiz
    providers.tsx
    router.tsx
    App.tsx
  shared/                    # cross-feature reutilizável
    ui/                      # shadcn (atual src/components/ui)
    components/              # Navigation, Footer, SEO, Breadcrumbs, BackToTop…
    hooks/                   # use-mobile, use-toast
    lib/                     # utils, constants
    types/
  features/
    home/
      components/            # Hero, Pillars, Impact, Projects, CTA…
      index.tsx              # página /
    about/                   # Sobre + hook useAboutData
    award/                   # Prêmio (ex-Edicoes) + useAwardData + admin
    magazine/                # Revista + useMagazineData + admin
    production/              # Producao + useProducaoData + admin
    gallery/                 # Galeria + hooks galeria + admin
    blog/                    # Blog + useBlogData + admin
    news/                    # Noticias
    events/                  # Eventos
    contact/                 # Contato
    admin/                   # shell admin: layout, sidebar, auth, settings, banners
    auth/                    # AuthContext, ProtectedRoute
    i18n/                    # LanguageContext + dicionários
  integrations/supabase/     # mantém (gerado)
  assets/
```

Cada feature segue o mesmo formato:

```text
features/<nome>/
  components/
  hooks/
  api/        # chamadas Supabase isoladas
  types.ts
  index.tsx   # página pública (se houver)
  admin.tsx   # painel admin (se houver)
```

## Mudanças principais

### 1. Arquitetura
- Mover arquivos para a nova estrutura preservando imports via path alias `@/`.
- Quebrar páginas longas (`Sobre` 776 linhas, `Contato` 379, `EdicoesEnhanced` 349) em subcomponentes de feature.
- Centralizar chamadas ao Supabase em `features/<x>/api/` — componentes só consomem hooks.

### 2. Consolidação / remoções
- Apagar: `MissionCards`, `PlumasEmNumeros`, `Testimonials` (versões legadas), `pages/Edicoes.tsx` (substituída por Enhanced).
- Unificar `ProjectCard` + `ProjectsSection` num só padrão de Card reutilizável em `shared/ui`.
- Padronizar admin com `AdminLayout` único + `AdminSidebar` (já existem, generalizar).

### 3. Design system
- Auditar 32 arquivos com cores cruas → trocar por tokens (`bg-background`, `text-foreground`, `text-primary-foreground`, etc.).
- Consolidar gradientes e sombras em `index.css` como variáveis (`--gradient-hero`, `--shadow-card`).
- Criar variantes de Button/Card específicas do projeto em vez de classes inline repetidas (`carnival`, `hero`, `outline-glass`).
- Tipografia: definir escala (`text-display`, `text-h1`...) em `tailwind.config.ts`.

### 4. Performance
- `React.lazy` + `Suspense` para todas as rotas em `app/router.tsx` (split por página).
- Lazy de imagens pesadas (`loading="lazy"`, `decoding="async"`), `width/height` explícitos para evitar CLS.
- Preload da imagem LCP do Hero no `index.html`.
- Plugin `vite-imagetools` para servir WebP/AVIF das imagens bundladas.
- Reduzir re-renders do `LanguageContext` memoizando o `translate`.

### 5. Qualidade de código
- `tsconfig` com `strict: true`, `noUnusedLocals`, `noUnusedParameters`.
- ESLint com regras de import order e `no-restricted-imports` (bloquear cor crua via plugin tailwind).
- Padronizar nomes: páginas em PascalCase, hooks `useX`, componentes co-localizados.
- Remover `console.log` residuais e código comentado.

## O que NÃO muda

- Rotas públicas (`/`, `/sobre`, `/premio`, `/edicoes`, `/revista`, `/producao`, `/galeria`, `/blog`, `/eventos`, `/noticias`, `/contato`, `/admin/*`).
- Conteúdo institucional, cores da marca, logo, tom de voz.
- Schema Supabase, RLS, tabelas.
- Comportamento visível ao usuário final além de pequenos ajustes de consistência (espaçamentos, hover, foco) autorizados.

## Entrega em fases

1. **Fase 1 — Limpeza**: remover duplicações e código morto, sem mover pastas. Verificar que nada quebra.
2. **Fase 2 — Estrutura**: criar `app/`, `shared/`, `features/` e migrar arquivo por arquivo, atualizando imports.
3. **Fase 3 — Design system**: substituir cores cruas, criar variantes, consolidar tokens.
4. **Fase 4 — Performance**: code splitting, lazy images, imagetools, preloads.
5. **Fase 5 — Qualidade**: ativar strict TS, ESLint reforçado, corrigir warnings.

Cada fase é commitável independentemente e mantém o site funcionando.

## Riscos e mitigação

- **Imports quebrados na migração**: mover em lotes pequenos por feature, verificando build após cada lote.
- **Regressão visual**: comparar cada página antes/depois; alterações visuais limitadas a tokens equivalentes.
- **Strict TS revelando bugs ocultos**: corrigir incrementalmente, podendo ficar para o fim da Fase 5.

## Detalhes técnicos

- Path alias `@/` continua apontando para `src/`. Novos sub-aliases opcionais: `@/features`, `@/shared`, `@/app`.
- Arquivos gerados (`integrations/supabase/client.ts`, `types.ts`, `.env`, `supabase/config.toml`) permanecem intocados.
- `App.tsx` reduzido a wrapper, router em `app/router.tsx` com `lazy()` por rota.
- Mantemos React Query, Helmet, Sonner; nenhuma dependência nova exceto `vite-imagetools` (opcional, Fase 4).
