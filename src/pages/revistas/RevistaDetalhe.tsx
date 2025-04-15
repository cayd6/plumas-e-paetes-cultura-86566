
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const RevistaDetalhe = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  
  // Using the actual magazine images from the src/pages/revistas/2010 folder
  const paginas2010 = [
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0001.jpg", // capa
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0002.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0003.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0004.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0005.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0006.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0007.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0008.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0009.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0010.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0011.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0012.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0013.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0014.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0015.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0016.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0017.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0018.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0019.jpg",
    "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0020.jpg",
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < paginas2010.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setTotalPages(paginas2010.length);
  }, []);

  if (id !== "2010") {
    return <div>Revista não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center">
              Edição 2010: Prêmio Plumas e Paetês
            </h1>
            <p className="text-center text-gray-600 mt-2">
              Homenagem aos artífices e profissionais do carnaval carioca
            </p>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
            <div className="flex justify-center">
              <img
                src={paginas2010[currentPage - 1]}
                alt={`Página ${currentPage}`}
                className="max-h-[800px] object-contain"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400"
                  : "bg-ppc-purple text-white hover:bg-ppc-purple/80"
              }`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Página anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-ppc-purple text-white hover:bg-ppc-purple/80"
              }`}
            >
              Próxima página <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <Pagination>
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

          <div className="text-center mt-8">
            <Link
              to="/revistas"
              className="text-ppc-purple hover:underline"
            >
              Voltar para Revistas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevistaDetalhe;
