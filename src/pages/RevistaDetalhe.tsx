
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
  
  // Updated to include all 20 images for the 2010 magazine
  // Currently using the 7 available images, to be updated with all 20 when uploaded
  const paginas2010 = [
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // capa
    "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
    "/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png",
    "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
    "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
    "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
    "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png",
    // Placeholder for the remaining images - you'll need to replace these with your actual image paths
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
    "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", // temporary placeholder
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
