import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ProjectCard = ({ title, description, icon }: ProjectCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 h-full">
      <CardHeader className="pb-2">
        {icon && (
          <div className="mb-2 text-primary">{icon}</div>
        )}
        <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
