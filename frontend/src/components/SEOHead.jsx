import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noIndex = false 
}) => {
  const siteTitle = "PI - Participatory Intelligence | Thai PBS";
  const siteDescription = "แพลตฟอร์มการมีส่วนร่วมสาธารณะของไทยพีบีเอส สำหรับการสร้างปัญญารวมหมู่และการพัฒนาสังคม";
  const baseUrl = "https://pi-website.vercel.app";
  const defaultImage = "/logo/pi-website-text-logo.svg";

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || siteDescription;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}${defaultImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="PI - Thai PBS" />
      <meta property="og:locale" content="th_TH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thaipbs" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PI - Participatory Intelligence",
          "alternateName": "Thai PBS PI",
          "url": baseUrl,
          "logo": `${baseUrl}/logo/pi-logo.svg`,
          "description": siteDescription,
          "foundingDate": "2025",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Thai PBS",
            "url": "https://www.thaipbs.or.th"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+66-2-123-4567",
            "contactType": "Customer Service",
            "email": "pi.thaipbs@gmail.com"
          },
          "sameAs": [
            "https://facebook.com/thaipbs",
            "https://twitter.com/thaipbs",
            "https://youtube.com/thaipbs"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
