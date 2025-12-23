import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  icon?: React.ReactNode;
}

const ProjectCard = ({ title, description, link, icon }: ProjectCardProps) => {
  const { language } = useLanguage();
  
  return (
    <Card className="group h-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card">
      <CardHeader className="pb-2">
        {icon && (
          <div className="mb-2 text-primary">{icon}</div>
        )}
        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </CardDescription>
        {link && (
          <a 
            href={link}
            className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all duration-300 gap-1 mt-auto"
          >
            {language === 'pt' ? 'Saiba mais' : 'Learn more'}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
