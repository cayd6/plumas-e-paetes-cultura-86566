import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "Instituto Plumas e Paetês Cultural",
  description = "Transformando a sociedade brasileira através da economia criativa, valorizando artistas e promovendo a cultura popular desde 2005",
  image = "/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png",
  type = "website",
  keywords = "instituto cultural, carnaval, plumas e paetês, cultura brasileira, economia criativa, arte popular, prêmio carnaval"
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = "https://plumaspaetes.cultural.br";
  const fullUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${siteUrl}${image}`, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Instituto Plumas e Paetês Cultural', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', `${siteUrl}${image}`, true);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [title, description, image, type, keywords, fullUrl, siteUrl]);

  return null;
};

export default SEO;
