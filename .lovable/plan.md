# Piloto: migrar feature Prêmio para `features/`

Mover toda a feature Prêmio Plumas & Paetês Cultural (página pública, painel admin, hook de dados e componente de números) para uma estrutura por feature co-localizada. Serve de modelo para as próximas (Revista, Produção, Blog, etc.).

## Escopo

Migrar apenas a feature Prêmio. Todas as demais páginas, hooks e componentes permanecem onde estão. Nenhuma mudança visual nem de comportamento.

## Estrutura nova

```text
src/features/award/
  components/
    PlumasEmNumeros.tsx     # ex src/components/PlumasEmNumeros.tsx
  hooks/
    useAwardData.ts         # ex src/hooks/useAwardData.ts
  pages/
    AwardPage.tsx           # ex src/pages/EdicoesEnhanced.tsx (renomeada)
    AwardAdminPage.tsx      # ex src/pages/admin/Premio.tsx (renomeada)
  index.ts                  # barrel exportando page/admin/hook/components
```

## Movimentação de arquivos

| De | Para |
|----|------|
| `src/pages/EdicoesEnhanced.tsx` | `src/features/award/pages/AwardPage.tsx` |
| `src/pages/admin/Premio.tsx`    | `src/features/award/pages/AwardAdminPage.tsx` |
| `src/hooks/useAwardData.ts`     | `src/features/award/hooks/useAwardData.ts` |
| `src/components/PlumasEmNumeros.tsx` | `src/features/award/components/PlumasEmNumeros.tsx` |

## Atualizações de imports

- `App.tsx`: trocar os imports lazy de `./pages/EdicoesEnhanced` e `./pages/admin/Premio` para `@/features/award`.
- `PlumasEmNumeros` interno passa a importar `useAwardData` por caminho relativo dentro da feature.
- `AwardPage.tsx` importa `PlumasEmNumeros` por caminho relativo dentro da feature.
- `AwardAdminPage.tsx` importa `useAwardData` por caminho relativo dentro da feature.

## Compatibilidade

Manter **shims de re-export** para não quebrar nenhum import existente fora da feature:

- `src/hooks/useAwardData.ts` → reexporta de `@/features/award/hooks/useAwardData`
- `src/components/PlumasEmNumeros.tsx` → reexporta `default` de `@/features/award/components/PlumasEmNumeros`

Esses shims podem ser apagados em uma etapa futura, quando todos os consumidores estiverem migrados.

## Rotas

Permanecem idênticas: `/premio`, `/edicoes`, `/admin/premio`. Apenas os módulos importados em `App.tsx` mudam de caminho.

## O que NÃO muda

- Conteúdo da página, layout, cores, copy institucional.
- Schema Supabase ou RLS.
- Comportamento do painel admin.
- Demais features.

## Verificação

- Build sem erros de import.
- Console sem erros de runtime ao abrir `/premio`, `/edicoes` e `/admin/premio`.
- `PlumasEmNumeros` continua renderizando dentro de `AwardPage`.

## Próximos pilotos (não nesta entrega)

Mesma receita aplicada a: `revista`, `production`, `blog`, `gallery`, `about`, `news`, `events`, `contact`. Cada uma vira um PR/turno independente.
