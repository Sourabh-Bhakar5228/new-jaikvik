import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogImage?: string;
  twitterCard?: string;
}

const defaultMeta: PageMeta = {
  title: "Jaikvik Technology India – Digital Marketing, SEO & Web Development",
  description:
    "Jaikvik Technology India offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth.",
  keywords:
    "Jaikvik Technology, Web Development, Digital Marketing, SEO Services, Mobile App Development",
  canonical: "https://jaikvik.com/",
  ogImage: "https://jaikvik.com/img/logo/og-image.jpg",
  twitterCard: "summary_large_image",
};

const pageMeta: Record<string, PageMeta> = {
  "/": {
    ...defaultMeta,
  },
  "/about": {
    title:
      "About Jaikvik Technology India – Leading IT & Digital Solutions Company",
    description:
      "Learn about Jaikvik Technology India, a top IT company offering SEO, digital marketing, web development, CRM, ERP & mobile app solutions for business success.",
    canonical: "https://jaikvik.com/about",
  },
  "/blogs": {
    title:
      "Jaikvik Blogs – SEO, Digital Marketing, Web & Tech Insights in India",
    description:
      "Explore expert blogs by Jaikvik Technology on SEO, digital marketing, web development, mobile apps, ERP, CRM, and the latest IT trends to grow your business.",
    canonical: "https://jaikvik.com/blogs",
  },
  "/contact-us": {
    title: "Contact Jaikvik Technology India – SEO, Web & Digital Experts",
    description:
      "Get in touch with Jaikvik Technology India for expert SEO, digital marketing, web development, CRM, ERP, and mobile app services. We're here to help your business grow.",
    canonical: "https://jaikvik.com/contact-us",
  },
  "/careers": {
    title:
      "Careers at Jaikvik Technology – Join Top IT & Digital Company in India",
    description:
      "Explore exciting career opportunities at Jaikvik Technology India. Join our team of experts in SEO, web development, digital marketing, ERP, CRM, and more.",
    canonical: "https://jaikvik.com/careers",
  },
  "/admin": {
    title: "Admin Login – Jaikvik Technology India Private Limited",
    description:
      "Secure admin login page for Jaikvik Technology. Authorized personnel only. Access digital operations, web, SEO, and client management tools here.",
    canonical: "https://jaikvik.com/admin",
  },
  "/digital-marketing": {
    title:
      "Top Digital Marketing Agency in India – Jaikvik | Marketing Company",
    description:
      "Jaikvik is a leading digital marketing agency in India offering expert digital marketing services. Trusted digital marketing company for growth-driven strategies.",
    keywords:
      "Digital marketing agency in india, Digital Marketing, Digital Marketing Agency, Digital Marketing Company, digital marketing services",
    canonical: "https://jaikvik.com/digital-marketing",
  },
  "/seo-services": {
    title:
      "Best SEO Company in India | SEO Services & Audit – Jaikvik Technology",
    description:
      "Jaikvik Technology – top SEO agency in India offering SEO on Page, off Page, technical SEO, ecommerce SEO services, website audit, Google SEO service & SEO for ecommerce sites.",
    keywords:
      "SEO agency in India, Best SEO Company, Best SEO Company in India, best seo services in India, ecommerce seo agency, ecommerce seo services, Google seo service, e commerce seo, ecommerce seo, Google Search Engine Optimization, Search Engine Optimisation, SEO, seo agency near me, seo digital marketing, seo for ecommerce website, seo marketing company near me, SEO on Page, SEO Services, SEO Services in India, seo strategy for ecommerce website, seo on shopify, on Page SEO, off Page SEO,technical SEO ,website audit",
    canonical: "https://jaikvik.com/seo-services",
  },
  "/mobile-application": {
    title:
      "Mobile Application Development Company in India – Jaikvik Technology",
    description:
      "Jaikvik Technology is a top mobile application development company in India offering custom mobile app solutions to grow your business with scalable and user-friendly apps.",
    keywords:
      "mobile application development company in india, mobile application development company",
    canonical: "https://jaikvik.com/mobile-application",
  },
  "/erp": {
    title:
      "Best ERP Software for Business Efficiency – Jaikvik Technology India",
    description:
      "Streamline your operations with the best ERP software by Jaikvik Technology. Scalable, secure, and tailored ERP solutions to boost productivity and performance.",
    keywords: "best erp software",
    canonical: "https://jaikvik.com/erp",
  },
  "/web-development": {
    title: "Top Web Development Company in India – Jaikvik | Website Solutions",
    description:
      "Jaikvik is among the top 10 web development companies in India. A leading website development company offering expert website development for all business needs.",
    keywords:
      "web development companies in India, Website Development Companies, Website Development Company, Website development, Web Development Company, Top 10 web development company",
    canonical: "https://jaikvik.com/web-development",
  },
  "/crm": {
    title: "Best CRM Software for Business Growth – Jaikvik Technology India",
    description:
      "Boost customer relationships with the best CRM software by Jaikvik Technology. Streamlined CRM solutions tailored to manage sales, leads, and customer support.",
    keywords: "best CRM software",
    canonical: "https://jaikvik.com/crm",
  },
  "/coustmised-software": {
    title: "Customized Software Solutions – Jaikvik Technology India Pvt Ltd",
    description:
      "Jaikvik offers customized software tailored to your business needs. Scalable, secure, and efficient custom software solutions to drive digital transformation.",
    canonical: "https://jaikvik.com/coustmised-software",
  },
  "/social-media-marketing": {
    title: "Social Media Marketing Services – Jaikvik Technology India Pvt Ltd",
    description:
      "Boost your brand with Jaikvik's expert social media marketing services. We manage, grow, and optimize your presence on Facebook, Instagram, LinkedIn & more.",
    canonical: "https://jaikvik.com/social-media-marketing",
  },
  "/youtube-meta-ads": {
    title: "YouTube & Meta Ads Services – Jaikvik Technology India Pvt Ltd",
    description:
      "Jaikvik offers expert YouTube and Meta (Facebook & Instagram) Ads services. Boost visibility, drive traffic, and grow your business with high-converting campaigns.",
    canonical: "https://jaikvik.com/youtube-meta-ads",
  },
  "/branding": {
    title: "Branding Services in India – Jaikvik Technology | Build Your Brand",
    description:
      "Jaikvik offers expert branding services in India including logo design, brand strategy, identity, and positioning to help businesses stand out and grow effectively.",
    canonical: "https://jaikvik.com/branding",
  },
  "/film-production": {
    title:
      "Film Production Services – Jaikvik Technology | Video & Ad Creation",
    description:
      "Jaikvik offers professional film production services including corporate videos, ad films, brand stories, and creative video content for powerful visual marketing.",
    canonical: "https://jaikvik.com/film-production",
  },
  "/javascript": {
    title: "JavaScript Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology provides expert JavaScript development services, delivering dynamic, scalable, and high-performance web applications tailored to your business needs.",
    canonical: "https://jaikvik.com/javascript",
  },
  "/java": {
    title: "Java Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology offers professional Java development services, building robust, secure, and scalable enterprise applications to drive business success.",
    canonical: "https://jaikvik.com/java",
  },
  "/jquery": {
    title: "jQuery Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology provides expert jQuery development services, creating interactive and user-friendly web interfaces to enhance your digital presence.",
    canonical: "https://jaikvik.com/jquery",
  },
  "/laravel": {
    title: "Laravel Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology delivers Laravel development services, building secure, scalable, and high-performance web applications tailored to your business requirements.",
    canonical: "https://jaikvik.com/laravel",
  },
  "/mongodb": {
    title: "MongoDB Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology offers MongoDB development services, providing scalable and efficient database solutions for modern web and mobile applications.",
    canonical: "https://jaikvik.com/mongodb",
  },
  "/node-js": {
    title: "NodeJS Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology provides Node.js development services, building fast, scalable, and real-time web applications to accelerate your business growth.",
    canonical: "https://jaikvik.com/node-js",
  },
  "/python": {
    title: "Python Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology offers expert Python development services, creating versatile and scalable applications for web, automation, and data-driven solutions.",
    canonical: "https://jaikvik.com/python",
  },
  "/react-js": {
    title: "ReactJS Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology provides React.js development services, building dynamic, responsive, and high-performance user interfaces for modern web applications.",
    canonical: "https://jaikvik.com/react-js",
  },
  "/sql": {
    title: "SQL Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology offers SQL development services, delivering efficient, secure, and optimized database solutions to support your business applications.",
    canonical: "https://jaikvik.com/sql",
  },
  "/wordpress": {
    title: "WordPress Development Services – Jaikvik Technology",
    description:
      "Jaikvik Technology provides WordPress development services, creating customized, SEO-friendly, and scalable websites to elevate your online presence.",
    canonical: "https://jaikvik.com/wordpress",
  },
  "/privacy-policy": {
    title: "Privacy Policy – Jaikvik Technology",
    description:
      "Read Jaikvik Technology's Privacy Policy to understand how we collect, use, and protect your personal information while using our website and services.",
    canonical: "https://jaikvik.com/privacy-policy",
  },
  "/portfolio": {
    title: "Portfolio – Jaikvik Technology",
    description:
      "Explore Jaikvik Technology's portfolio showcasing our expertise in web development, digital marketing, SEO, mobile apps, ERP, CRM, and custom software solutions.",
    canonical: "https://jaikvik.com/portfolio",
  },
  "/brochure": {
    title: "Brochure – Jaikvik Technology",
    description:
      "Download Jaikvik Technology's brochure to discover our comprehensive services in digital marketing, SEO, web development, mobile apps, ERP, and CRM solutions.",
    canonical: "https://jaikvik.com/brochure",
  },
};

export default function SEOManager() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const meta = pageMeta[pathname] || defaultMeta;

  useEffect(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "none"; // Hide loader when SeoManager mounts
    }
  }, []);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta
        name="description"
        content={meta.description || defaultMeta.description}
      />
      <meta name="keywords" content={meta.keywords || defaultMeta.keywords} />
      <meta name="author" content="Jaikvik Technology" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta
        property="og:description"
        content={meta.description || defaultMeta.description}
      />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Jaikvik Technology" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={meta.ogImage || defaultMeta.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Jaikvik Technology Logo" />
      <meta
        name="twitter:card"
        content={meta.twitterCard || defaultMeta.twitterCard}
      />
      <meta name="twitter:title" content={meta.title} />
      <meta
        name="twitter:description"
        content={meta.description || defaultMeta.description}
      />
      <meta
        name="twitter:image"
        content={meta.ogImage || defaultMeta.ogImage}
      />
      <meta name="twitter:site" content="@JaikvikTech" />
      <meta name="twitter:creator" content="@JaikvikTech" />
    </Helmet>
  );
}
