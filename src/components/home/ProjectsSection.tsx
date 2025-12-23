import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Trophy, 
  GraduationCap, 
  BookOpen, 
  Music, 
  Crown,
  Scale
} from "lucide-react";

interface ProjectItem {
  titleKey: string;
  summaryPt: string;
  summaryEn: string;
  link: string;
  icon: React.ReactNode;
}

const ProjectsSection = () => {
  const { translate, language } = useLanguage();

  const projects: ProjectItem[] = [
    {
      titleKey: 'project1Title',
      summaryPt: 'Celebra os profissionais dos bastidores do carnaval carioca desde 2005.',
      summaryEn: 'Celebrates Rio carnival backstage professionals since 2005.',
      link: '/premio',
      icon: <Trophy className="h-8 w-8" />
    },
    {
      titleKey: 'project2Title',
      summaryPt: 'Oficinas de formação e gestão artística no Rio de Janeiro e Brasília.',
      summaryEn: 'Training and artistic management workshops in Rio de Janeiro and Brasília.',
      link: '/sobre',
      icon: <GraduationCap className="h-8 w-8" />
    },
    {
      titleKey: 'project3Title',
      summaryPt: 'Publicação anual gratuita com 5.000 exemplares desde 2010.',
      summaryEn: 'Free annual publication with 5,000 copies since 2010.',
      link: '/revista',
      icon: <BookOpen className="h-8 w-8" />
    },
    {
      titleKey: 'project4Title',
      summaryPt: 'Espetáculos sobre Elza Soares, Chiquinha Gonzaga, Donga e outros.',
      summaryEn: 'Shows about Elza Soares, Chiquinha Gonzaga, Donga and others.',
      link: '/producao',
      icon: <Music className="h-8 w-8" />
    },
    {
      titleKey: 'project5Title',
      summaryPt: 'Confecção da coroa do Rei Momo em Rio, Niterói, Maricá e Cruz Alta.',
      summaryEn: 'Crafting King Momo\'s crown in Rio, Niterói, Maricá and Cruz Alta.',
      link: '/producao',
      icon: <Crown className="h-8 w-8" />
    },
    {
      titleKey: 'project9Title',
      summaryPt: 'Leis estadual e municipal para o Dia do Profissional da Economia Criativa.',
      summaryEn: 'State and municipal laws for Creative Economy Professional Day.',
      link: '/sobre',
      icon: <Scale className="h-8 w-8" />
    },
  ];

  return (
    <section id="projetos" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {translate('projetosProdutosEventos')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translate('projetosProdutosEventosDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {translate(project.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {language === 'pt' ? project.summaryPt : project.summaryEn}
                    </p>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    >
                      <Link to={project.link}>
                        {translate('saibaMais')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
