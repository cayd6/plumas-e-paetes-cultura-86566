
# Reorganização Institucional — Instituto Plumas & Paetês Cultural

Objetivo: elevar o site a padrão de instituição cultural editorial (memória, autoridade, parceria), preservando 100% a foto e os efeitos/animações do hero atual. Tudo CMS-driven e bilíngue PT/EN.

## 1. Princípios de design (guardrails)

- **Mantido intocado**: imagem `hero-background.jpg`, overlays/gradiente, `animate-fade-in`, badge de aniversário, scroll indicator, `ConfettiFalling`.
- **Banido**: 3 colunas com ícone-círculo repetidas, centralização total, "AI-look" roxo/branco genérico.
- **Tom**: editorial, quente, cultural — tipografia serifada para títulos editoriais (Playfair/DM Serif) + sans atual para corpo; uso de filetes, numeração de seções, eyebrow labels ("01 — Memória", "02 — Prêmio"), assimetria, imagens grandes com legenda tipo revista.
- **Sem alterar** paleta, logo, cores institucionais.

## 2. Homepage — nova arquitetura (ordem definitiva)

```text
┌─ 1. HERO (inalterado visualmente) ── copy enxuto
│    • Removidos os 2 parágrafos longos → 1 frase-manifesto + 1 linha de subtítulo
│    • CTAs: "Conheça o Instituto" (primário) + "Apoiar" (secundário, WhatsApp)
│    • Badge 20 anos mantido
│
├─ 2. FAIXA DE IMPACTO (números reais ou skeleton "em curadoria")
│    • 4 métricas em layout horizontal editorial (não cards isolados)
│    • Fallback: se valor=0 no CMS → mostra label "+ de 20 anos" ou esconde
│    • Tabela `award_stats` já existe — vincular
│
├─ 3. PILARES INSTITUCIONAIS (Memória · Reconhecimento · Formação · Produção)
│    • Layout editorial split: imagem grande à esquerda + 4 entradas numeradas à direita
│    • SEM cards iguais com ícone-círculo
│
├─ 4. PRÊMIO PLUMAS & PAETÊS — seção destaque
│    • Bloco "magazine cover": foto histórica + selo "20 edições" + última edição em destaque + link "Arquivo de edições"
│    • Lista lateral: últimos homenageados (chips clicáveis → modal)
│
├─ 5. REVISTA & DOCUMENTÁRIO
│    • Capa da revista mais recente + 3 capas anteriores em miniatura + CTA "Biblioteca digital"
│    • Player do vídeo institucional (YouTube embed mantido)
│
├─ 6. PROJETOS & PRODUÇÃO (carrossel editorial, 1 destaque + 2 secundários)
│
├─ 7. PARCEIROS E APOIADORES (faixa em escala de cinza, agrupados por categoria: Institucionais · Patrocinadores · Mídia · Apoio)
│
├─ 8. VOZES (depoimentos em formato editorial — pull quote grande, 1 por vez, com nome/cargo/foto, não grid)
│
├─ 9. CTA DE PARCERIA (split 60/40)
│    • Esquerda: "Leve o Plumas para sua cidade / Seja patrocinador / Imprensa"
│    • Direita: form curto ou 3 botões segmentados
│
└─ 10. FOOTER (newsletter PT/EN + sitemap + redes + selo CNPJ + idioma)
```

Removidos da home: `HeroBanner` duplicado, `RecognitionsSection` solta (vira faixa fina logo abaixo do hero ou integra ao item 3).

## 3. Novas páginas / navegação

Navegação principal (≤7 itens):

`Instituto` · `Prêmio` · `Revista` · `Memória` · `Produção` · `Imprensa` · `Contato`

Novas páginas a criar (rotas + placeholders CMS-ready):

| Rota | Função |
|---|---|
| `/instituto` (renomeia `/sobre`) | história, missão, **timeline**, equipe, conselho |
| `/premio` | já existe — adicionar **arquivo de edições filtrável** (ano, categoria, cidade, homenageado) |
| `/premio/edicoes/:ano` | página de edição individual (SEO Event) |
| `/revista` | biblioteca digital com filtros (ano, tema) |
| `/revista/:slug` | leitor/visualizador de edição (SEO Article) |
| `/memoria` | **arquivo searchável** (pessoas, projetos, categorias, cidades, anos) |
| `/memoria/pessoa/:slug` | perfil de homenageado |
| `/producao` | já existe — reforçar cases |
| `/imprensa` | **media kit**: logos, fotos hi-res, releases, contatos, bio (PT/EN) |
| `/parcerias` | propostas para patrocinadores, prefeituras, instituições |
| `/blog` | mantido — adicionar categorias e autor |

## 4. Modelo de conteúdo (CMS — extensões ao schema existente)

Tabelas já existentes a reaproveitar: `about_content`, `award_*`, `gallery_*`, `magazine_editions`, `site_banners`, `site_settings`, `testimonials`, `timeline_events`, `portfolio_projects`, `blog_*`.

Adicionar:

- `home_sections` — toggle/ordem/visibilidade por seção da home
- `honored_people` — homenageados (nome, slug, edição, categoria, cidade, bio_pt, bio_en, foto, links)
- `partners` — (nome, logo, categoria: institucional/patrocinador/midia/apoio, url, ordem, ativo)
- `press_kit_assets` — (titulo_pt, titulo_en, tipo: logo/foto/release/bio, arquivo, idioma)
- `pages_seo` — overrides de title/description/og por rota (PT e EN)
- Coluna `content_en` em todas as tabelas textuais que ainda só têm PT (`about_content`, `award_*`, `magazine_editions`, `blog_posts`, `testimonials`, `timeline_events`)

Todas as tabelas seguem regra `GRANT` + RLS (leitura pública, escrita só `admin` via `has_role`).

## 5. Internacionalização PT/EN

- `LanguageContext` já existe — expandir para ler campos `*_pt`/`*_en` de toda tabela
- Hook utilitário `useLocalizedField(row, field)` → retorna `row[`${field}_${lang}`] || row[`${field}_pt`]`
- URL strategy: prefixo `/en/*` opcional (fase 2); fase 1 = toggle client-side persistido
- `<html lang>` dinâmico via `react-helmet-async`
- Botão idioma migrado de `LanguageControls` flutuante para dentro do header (resolve overlap já identificado)

## 6. SEO

- Adicionar `react-helmet-async` + provider
- Schemas JSON-LD por rota:
  - sitewide: `Organization` (em `index.html`)
  - `/premio/edicoes/:ano` → `Event`
  - `/revista/:slug` → `Article`
  - `/memoria/pessoa/:slug` → `Person`
  - vídeo institucional → `VideoObject`
  - todas as rotas internas → `BreadcrumbList`
- `sitemap.xml` dinâmico (gerado a partir das tabelas CMS via edge function)
- `<title>` < 60 chars, `description` < 160, canonical e og:url auto-referenciais por rota PT e EN

## 7. Acessibilidade

- 1 `<h1>` por página, hierarquia H2/H3 correta
- `alt` obrigatório em todas as imagens via campo CMS `alt_pt`/`alt_en`
- Skip-link "Pular para conteúdo"
- Foco visível em todos os interativos, contraste AA validado
- Botão WhatsApp com `aria-label` e área mínima 44×44

## 8. Tracking de CTAs (analytics-ready)

- Componente `<TrackedLink event="..." />` wrapper que dispara `window.dataLayer.push` (GA4/GTM-ready)
- Eventos padronizados: `cta_hero_support`, `cta_partnership`, `cta_press_kit`, `magazine_open`, `edition_open`, `lang_switch`

## 9. Componente-a-componente

| Componente atual | Ação |
|---|---|
| `HeroSection` | manter visual, encurtar copy, trocar CTAs |
| `ImpactNumbers` | reformatar em faixa horizontal editorial, integrar `award_stats`, fallback elegante para 0 |
| `PillarCards` | refazer como split image+lista numerada |
| `RecognitionsSection` | fundir em faixa fina sob hero |
| `HeroBanner` | remover da home (passa a viver em `/premio`) |
| `VideoSection` | manter, integrar a seção 5 |
| `ProjectsSection` | virar carrossel 1+2 editorial |
| `PartnersSection` | agrupar por categoria CMS |
| `TestimonialsSection` | pull quote editorial single-item com paginação |
| `CTASection` | virar split 60/40 com 3 públicos |
| `LanguageControls` | mover para Navigation, remover flutuante |
| `Navigation` | reduzir para 7 itens, melhorar mobile (sheet lateral) |
| `Footer` | adicionar newsletter, seletor idioma, CNPJ |

## 10. Fases de entrega sugeridas

1. **Fase 1 (esta)** — homepage reorganizada + hero copy + LanguageControls no header + componentes editoriais novos + fallback de métricas. Sem migrations.
2. **Fase 2** — migrations: `honored_people`, `partners`, `press_kit_assets`, `home_sections`, `pages_seo` + colunas `*_en`.
3. **Fase 3** — novas rotas (`/memoria`, `/imprensa`, `/parcerias`, `/premio/edicoes/:ano`) + react-helmet-async + JSON-LD + sitemap dinâmico + tracking.

## Decisões que preciso confirmar antes de implementar

1. Confirmar fonte editorial para títulos (sugestão: **Playfair Display** ou **DM Serif Display**).
2. Confirmar copy curto do hero (sugestão PT): *"Memória viva do carnaval brasileiro."* + *"Há 20 anos registrando, premiando e formando quem faz o maior espetáculo da Terra."*
3. Posso começar pela **Fase 1** (apenas frontend, sem migrations) e depois abrir migrations em PRs separadas?
