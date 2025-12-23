import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectsSection = () => {
  const { translate, language } = useLanguage();

  const projectCategories = {
    premios: [
      {
        title: translate('project1Title'),
        description: translate('project1Desc'),
      },
    ],
    capacitacao: [
      {
        title: translate('project2Title'),
        description: translate('project2Desc'),
      },
    ],
    publicacoes: [
      {
        title: translate('project3Title'),
        description: translate('project3Desc'),
      },
      {
        title: translate('project8Title'),
        description: translate('project8Desc'),
      },
    ],
    producao: [
      {
        title: translate('project4Title'),
        description: translate('project4Desc'),
      },
      {
        title: translate('project5Title'),
        description: translate('project5Desc'),
      },
      {
        title: translate('project6Title'),
        description: translate('project6Desc'),
      },
    ],
    patrimonio: [
      {
        title: translate('project7Title'),
        description: translate('project7Desc'),
      },
      {
        title: translate('project9Title'),
        description: translate('project9Desc'),
      },
    ],
  };

  const allProjects = [
    ...projectCategories.premios,
    ...projectCategories.capacitacao,
    ...projectCategories.publicacoes,
    ...projectCategories.producao,
    ...projectCategories.patrimonio,
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
        
        {/* Desktop: Tabs */}
        <div className="hidden md:block">
          <Tabs defaultValue="todos" className="max-w-6xl mx-auto">
            <TabsList className="flex flex-wrap justify-center mb-8 bg-muted/50 p-1 rounded-full">
              <TabsTrigger value="todos" className="rounded-full px-6">
                {language === 'pt' ? 'Todos' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="premios" className="rounded-full px-6">
                {language === 'pt' ? 'Prêmios' : 'Awards'}
              </TabsTrigger>
              <TabsTrigger value="publicacoes" className="rounded-full px-6">
                {language === 'pt' ? 'Publicações' : 'Publications'}
              </TabsTrigger>
              <TabsTrigger value="producao" className="rounded-full px-6">
                {language === 'pt' ? 'Produção' : 'Production'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="premios">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectCategories.premios.map((project, index) => (
                  <ProjectCard key={index} title={project.title} description={project.description} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="publicacoes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectCategories.publicacoes.map((project, index) => (
                  <ProjectCard key={index} title={project.title} description={project.description} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="producao">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...projectCategories.producao, ...projectCategories.patrimonio].map((project, index) => (
                  <ProjectCard key={index} title={project.title} description={project.description} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Mobile: Simple grid */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {allProjects.slice(0, 6).map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
