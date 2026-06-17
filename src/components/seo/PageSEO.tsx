import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://plumas-e-paetes-cultura-86566.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png`;

interface PageSEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  lang?: "pt-BR" | "en";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

const PageSEO = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  keywords,
  lang = "pt-BR",
  jsonLd,
  noIndex,
}: PageSEOProps) => {
  const location = useLocation();
  const url = `${SITE_URL}${location.pathname}`;
  const fullTitle = title.includes("Plumas") ? title : `${title} | Instituto Plumas & Paetês Cultural`;
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Instituto Plumas & Paetês Cultural" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default PageSEO;
