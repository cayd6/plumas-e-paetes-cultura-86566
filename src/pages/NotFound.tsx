
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Home, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";

const NotFound = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    toast({
      title: "Página não encontrada",
      description: "A página que você está procurando não existe ou foi removida.",
      variant: "destructive",
    });
  }, [location.pathname, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navigation />
      <LanguageControls />
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <span className="text-5xl font-bold text-red-500">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          A página que você está procurando pode ter sido removida ou temporariamente indisponível.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ppc-purple text-white hover:bg-ppc-purple/90 transition-colors">
            <Home className="h-5 w-5" />
            <span>Voltar ao Início</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
