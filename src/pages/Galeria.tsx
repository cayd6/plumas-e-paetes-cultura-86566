import { useState, memo } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageModal from "@/components/ImageModal";
import SEO from "@/components/SEO";
import GalleryHeroBanner from "@/components/GalleryHeroBanner";
import OptimizedImage from "@/components/OptimizedImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Camera, Video } from "lucide-react";
import { useGalleryPhotos } from "@/hooks/useGalleryPhotos";
import { useGalleryVideos } from "@/hooks/useGalleryVideos";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const Galeria = () => {
  const { translate } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("todos");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("fotos");
  
  const { data: photos, isLoading: photosLoading } = useGalleryPhotos(
    selectedYear === 'todos' ? undefined : selectedYear,
    selectedType === 'todos' ? undefined : selectedType
  );

  const { data: videos, isLoading: videosLoading } = useGalleryVideos(
    selectedYear === 'todos' ? undefined : selectedYear,
    selectedType === 'todos' ? undefined : selectedType
  );

  const filteredPhotos = photos || [];
  const filteredVideos = videos || [];

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
  };

  const handleCloseImageModal = () => setSelectedImage(null);
  const handleCloseVideoModal = () => setSelectedVideo(null);
  
  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredPhotos.length);
    }
  };
  
  const handlePreviousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNextVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo + 1) % filteredVideos.length);
    }
  };
  
  const handlePreviousVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo - 1 + filteredVideos.length) % filteredVideos.length);
    }
  };

  // Video types include 'entrevista'
  const videoTypes = [
    { value: 'todos', label: translate("tipoEvento") + ' - Todos' },
    { value: 'entrevista', label: translate("entrevistas") },
    { value: 'desfile', label: 'Desfiles' },
    { value: 'premiacao', label: 'Premiações' },
    { value: 'oficina', label: 'Oficinas' },
  ];

  const photoTypes = [
    { value: 'todos', label: translate("tipoEvento") + ' - Todos' },
    { value: 'desfile', label: 'Desfiles' },
    { value: 'premiacao', label: 'Premiações' },
    { value: 'oficina', label: 'Oficinas' },
  ];

  const currentTypes = activeTab === 'videos' ? videoTypes : photoTypes;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Galeria de Fotos e Vídeos | Instituto Plumas e Paetês Cultural"
        description="Confira momentos especiais dos nossos eventos culturais, desfiles, premiações e oficinas."
        keywords="galeria, fotos, vídeos, eventos culturais, carnaval, premiações, oficinas, entrevistas"
      />
      <Navigation />
      <Breadcrumbs />
      <LanguageControls />
      
      {/* Hero Banner */}
      <div className="pt-20">
        <GalleryHeroBanner selectedYear={selectedYear} />
      </div>

      {/* Tabs and Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-20 z-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Tabs */}
              <TabsList className="grid grid-cols-2 w-full max-w-xs">
                <TabsTrigger value="fotos" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  {translate("fotos")}
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  {translate("videos")}
                </TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">{translate("filtrarPor")}:</label>
                </div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
                >
                  <option value="todos">{translate("ano")} - Todos</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2005">2005</option>
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
                >
                  {currentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photos Tab Content */}
            <TabsContent value="fotos" className="mt-0">
              <section className="py-16">
                <div className="container mx-auto px-4">
                  {photosLoading ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {filteredPhotos.map((photo, index) => (
                          <div
                            key={photo.id}
                            onClick={() => handleImageClick(index)}
                            className="group relative break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer mb-6"
                          >
                            <OptimizedImage
                              src={photo.image_url}
                              alt={photo.title}
                              style={{ transform: `rotate(${photo.rotation || 0}deg)` }}
                              className="w-full h-auto min-h-[200px] group-hover:scale-110 transition-transform duration-500"
                              priority={index < 6}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-white text-xl font-semibold mb-2">{photo.title}</h3>
                                <p className="text-white/80 text-sm">{photo.year}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {filteredPhotos.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">{translate("nenhumaFotoEncontrada")}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>
            </TabsContent>

            {/* Videos Tab Content */}
            <TabsContent value="videos" className="mt-0">
              <section className="py-16">
                <div className="container mx-auto px-4">
                  {videosLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="aspect-video rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video, index) => (
                          <VideoCard
                            key={video.id}
                            video={video}
                            onClick={() => handleVideoClick(index)}
                          />
                        ))}
                      </div>

                      {filteredVideos.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">{translate("nenhumVideoEncontrado")}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && filteredPhotos[selectedImage] && (
        <ImageModal
          isOpen={selectedImage !== null}
          onClose={handleCloseImageModal}
          image={{
            ...filteredPhotos[selectedImage],
            src: filteredPhotos[selectedImage].image_url
          }}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
          hasNext={selectedImage < filteredPhotos.length - 1}
          hasPrevious={selectedImage > 0}
        />
      )}

      {/* Video Modal */}
      {selectedVideo !== null && filteredVideos[selectedVideo] && (
        <VideoModal
          isOpen={selectedVideo !== null}
          onClose={handleCloseVideoModal}
          video={filteredVideos[selectedVideo]}
          onNext={handleNextVideo}
          onPrevious={handlePreviousVideo}
          hasNext={selectedVideo < filteredVideos.length - 1}
          hasPrevious={selectedVideo > 0}
        />
      )}

      {/* Instagram CTA */}
      <section className="py-20 bg-gradient-to-br from-ppc-magenta to-ppc-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {translate("sigaNosInstagram")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Acompanhe nossos eventos ao vivo e fique por dentro das novidades
          </p>
          <a
            href="https://www.instagram.com/plumasepaetescultural/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ppc-magenta rounded-full hover:bg-white/90 transition-colors font-semibold text-lg"
          >
            <Instagram size={24} />
            @plumasepaetescultural
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Galeria;
