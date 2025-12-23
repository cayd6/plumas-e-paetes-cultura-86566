import { useLanguage } from "@/contexts/LanguageContext";

const VideoSection = () => {
  const { translate } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {translate('conhecaNossaHistoria')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translate('videoDescricao')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
            <iframe
              src="https://www.youtube.com/embed/IwJrey-jnjI?start=4923"
              title="Instituto Plumas e Paetês Cultural - Nossa História"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
