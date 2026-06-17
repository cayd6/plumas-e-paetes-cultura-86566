import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Archive } from "lucide-react";

export type EditorialStatus = "draft" | "published" | "archived";

export function StatusBadge({ status }: { status?: string | null }) {
  const s = (status ?? "draft") as EditorialStatus;
  if (s === "published") {
    return <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white"><CheckCircle2 className="h-3 w-3 mr-1" />Publicado</Badge>;
  }
  if (s === "archived") {
    return <Badge variant="outline" className="text-muted-foreground"><Archive className="h-3 w-3 mr-1" />Arquivado</Badge>;
  }
  return <Badge variant="secondary"><Circle className="h-3 w-3 mr-1" />Rascunho</Badge>;
}

export function CompletenessChips({ pt, en }: { pt: boolean; en: boolean }) {
  return (
    <div className="flex gap-1">
      <Badge variant={pt ? "default" : "outline"} className={pt ? "bg-foreground text-background" : "text-muted-foreground"}>
        PT {pt ? "✓" : "—"}
      </Badge>
      <Badge variant={en ? "default" : "outline"} className={en ? "bg-foreground text-background" : "text-muted-foreground"}>
        EN {en ? "✓" : "—"}
      </Badge>
    </div>
  );
}

interface StatusCycleProps {
  value?: string | null;
  onChange: (next: EditorialStatus) => void;
  disabled?: boolean;
}

export function StatusCycle({ value, onChange, disabled }: StatusCycleProps) {
  const order: EditorialStatus[] = ["draft", "published", "archived"];
  const current = (value ?? "draft") as EditorialStatus;
  const next = order[(order.indexOf(current) + 1) % order.length];
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      disabled={disabled}
      onClick={() => onChange(next)}
      title={`Alternar para ${next}`}
    >
      <StatusBadge status={current} />
    </Button>
  );
}
