
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ChevronLeft, ChevronRight, ArrowLeftCircle, BookOpen } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const RevistaDetalhe = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [showPagination, setShowPagination] = useState(false);
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([1])); // Start with first page
  const [preloadProgress, setPreloadProgress] = useState(5); // Start with 5% progress
  
  // Define the image paths
  const paginas2010 = Array.from({ length: 20 }, (_, i) => {
    const pageNum = i + 1;
    return `/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-${pageNum.toString().padStart(4, '0')}.jpg`;
  });

  // Handle navigation actions
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentImageLoaded(preloadedImages.has(currentPage - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < paginas2010.length) {
      setCurrentPage(currentPage + 1);
      setCurrentImageLoaded(preloadedImages.has(currentPage + 1));
      window.scrollTo(0, 0);
    }
  };

  // Preload images in the background
  useEffect(() => {
    // Function to preload a single image and update state
    const preloadImage = (pageNumber: number) => {
      if (preloadedImages.has(pageNumber) || pageNumber < 1 || pageNumber > totalPages) return;
      
      const img = new Image();
      img.src = paginas2010[pageNumber - 1];
      img.onload = () => {
        setPreloadedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(pageNumber);
          return newSet;
        });
        
        // Update progress based on how many images are loaded
        const newProgress = Math.min(100, Math.round((preloadedImages.size + 1) / paginas2010.length * 100));
        setPreloadProgress(newProgress);
      };
    };

    // First preload current page (if not already loaded)
    if (!preloadedImages.has(currentPage)) {
      preloadImage(currentPage);
    }
    
    // Then preload adjacent pages (next page first, then previous)
    if (currentPage < totalPages) {
      preloadImage(currentPage + 1);
    }
    if (currentPage > 1) {
      preloadImage(currentPage - 1);
    }
    
    // After that, preload a few more pages in both directions
    setTimeout(() => {
      if (currentPage < totalPages - 1) preloadImage(currentPage + 2);
      if (currentPage < totalPages - 2) preloadImage(currentPage + 3);
    }, 1000);
    
    setTimeout(() => {
      if (currentPage > 2) preloadImage(currentPage - 2);
      if (currentPage > 3) preloadImage(currentPage - 3);
    }, 2000);
    
  }, [currentPage, preloadedImages, paginas2010, totalPages]);

  // Initial setup
  useEffect(() => {
    setTotalPages(paginas2010.length);
    
    // Show loader with a minimum time to prevent flashing
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowPagination(true);
      }, 500);
    }, 800);
    
    // Preload the first few pages
    const preloadInitialPages = async () => {
      const img = new Image();
      img.src = paginas2010[0];
      img.onload = () => {
        setCurrentImageLoaded(true);
        setPreloadedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(1);
          return newSet;
        });
      };
    };
    
    preloadInitialPages();
    
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePreviousPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  if (id !== "2010") {
    return <div>Revista não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link to="/revistas" className="flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors">
              <ArrowLeftCircle className="mr-2 h-5 w-5" />
              <span>Voltar para Revistas</span>
            </Link>
          </div>
          
          <header className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-ppc-purple via-ppc-magenta to-ppc-orange bg-clip-text text-transparent">
              Edição 2010: Prêmio Plumas e Paetês
            </h1>
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
              Homenagem aos artífices e profissionais do carnaval carioca
            </p>
          </header>

          {/* Loading progress indicator */}
          {preloadProgress < 100 && (
            <div className="mb-4 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Carregando revista</span>
                <span className="text-sm font-medium text-ppc-purple">{preloadProgress}%</span>
              </div>
              <Progress value={preloadProgress} className="h-2" />
            </div>
          )}

          <div className={`bg-white rounded-xl shadow-xl p-4 mb-8 transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative">
              {/* Page turner buttons on sides of the image */}
              <button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full ${
                  currentPage === 1 
                    ? 'opacity-20 cursor-not-allowed' 
                    : 'bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all'
                }`}
              >
                <ChevronLeft className="h-8 w-8 text-ppc-purple" />
              </button>
              
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 flex items-center justify-center rounded-full ${
                  currentPage === totalPages 
                    ? 'opacity-20 cursor-not-allowed' 
                    : 'bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all'
                }`}
              >
                <ChevronRight className="h-8 w-8 text-ppc-purple" />
              </button>
              
              {/* Magazine page */}
              <div className="flex justify-center">
                {isLoading || !preloadedImages.has(currentPage) ? (
                  <div className="w-full max-w-3xl h-[700px] rounded-lg bg-gray-100 flex items-center justify-center">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-ppc-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                    <img
                      src={paginas2010[currentPage - 1]}
                      alt={`Página ${currentPage}`}
                      className="max-h-[700px] w-full object-contain rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg"
                      loading="eager"
                      onLoad={() => {
                        setCurrentImageLoaded(true);
                        if (!preloadedImages.has(currentPage)) {
                          setPreloadedImages(prev => {
                            const newSet = new Set(prev);
                            newSet.add(currentPage);
                            return newSet;
                          });
                        }
                      }}
                    />
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      Página {currentPage} de {totalPages}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`flex justify-center space-x-4 mb-8 transition-all duration-500 ${showPagination ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-5 py-2.5 rounded-full transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-ppc-purple text-white hover:bg-ppc-purple/80 shadow-md hover:shadow-lg"
              }`}
            >
              <ChevronLeft className="mr-2 h-5 w-5" /> Página anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-5 py-2.5 rounded-full transition-all ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-ppc-purple text-white hover:bg-ppc-purple/80 shadow-md hover:shadow-lg"
              }`}
            >
              Próxima página <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <Pagination className={`transition-all duration-500 ${showPagination ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <PaginationContent>
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && <PaginationItem>...</PaginationItem>}

              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && <PaginationItem>...</PaginationItem>}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>

          <div className="text-center mt-12">
            <Link
              to="/revistas"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-ppc-purple/30 text-ppc-purple hover:bg-ppc-purple/5 transition-colors shadow-sm"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Voltar para Revistas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevistaDetalhe;
