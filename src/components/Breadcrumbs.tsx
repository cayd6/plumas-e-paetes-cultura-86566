import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const Breadcrumbs = () => {
  const location = useLocation();
  const { translate } = useLanguage();
  
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const routeNames: Record<string, string> = {
    sobre: translate("quemSomos"),
    edicoes: translate("premioPlumas"),
    revista: translate("revista"),
    revistas: translate("revista"),
    producao: translate("producaoEventos"),
    galeria: translate("galeria"),
    blog: translate("blog"),
    contato: translate("contato"),
    eventos: translate("eventos"),
    noticias: translate("noticias"),
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 hover:text-carnival-purple transition-colors">
                  <Home size={16} />
                  <span className="sr-only">{translate("inicio")}</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const displayName = routeNames[pathname] || pathname;
              
              return (
                <span key={routeTo} className="flex items-center gap-2">
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-medium text-carnival-purple">
                        {displayName}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={routeTo} className="hover:text-carnival-purple transition-colors">
                          {displayName}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;
