import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import SEOManager from "../components/SEOManager";

// layouts
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";

// pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Blogs = lazy(() => import("../pages/blogs/Blogs"));
const BlogDetail = lazy(() => import("../pages/blogs/BlogDetail"));
const ContactUs = lazy(() => import("../pages/contact/ContactUs"));
const Careers = lazy(() => import("../pages/careers/Careers"));
const CRMPage = lazy(() => import("../pages/service/CRMPage"));
const Mobile = lazy(() => import("../pages/service/Mobile_Application"));
const ERPPage = lazy(() => import("../pages/service/ErpPage"));
const CoustmisedSoftware = lazy(
  () => import("../pages/service/CoustmisedSoftware")
);
const WebDevelopment = lazy(() => import("../pages/service/Web_Development"));
const DigitalMarketing = lazy(
  () => import("../pages/service/Digital_Marketing")
);
const SocailMediaMarketting = lazy(
  () => import("../pages/service/Socail_Media")
);
const YoutubeMetaAds = lazy(() => import("../pages/service/Youtube_Meta_Ads"));
const Branding = lazy(() => import("../pages/service/Brand_Promotion"));
const SeoServices = lazy(() => import("../pages/service/Seo_Services"));
const FilmProduction = lazy(() => import("../pages/service/Film_Production"));
const JavaScript = lazy(() => import("../pages/language_page/JavaScript"));
const Java = lazy(() => import("../pages/language_page/Java"));
const JQuery = lazy(() => import("../pages/language_page/jQuery"));
const Laravel = lazy(() => import("../pages/language_page/Laravel"));
const MongoDB = lazy(() => import("../pages/language_page/MongoDB"));
const NodeJS = lazy(() => import("../pages/language_page/NodeJS"));
const Python = lazy(() => import("../pages/language_page/Python"));
const ReactJS = lazy(() => import("../pages/language_page/ReactJS"));
const SQL = lazy(() => import("../pages/language_page/SQL"));
const Wordpress = lazy(() => import("../pages/language_page/Wordpress"));
const PrivacyPolicy = lazy(() => import("../pages/service/PrivacyPolicy"));
const Portfolio = lazy(() => import("../pages/service/Portfolio"));
const Brouchure = lazy(() => import("../pages/service/BrochurePdfPage"));

// Admin pages
const AdminLogin = lazy(() => import("../Admin/AdminLogin/AdminLogin"));
const Dashboard = lazy(() => import("../Admin/Dashboard/Dashboard"));
const NavbarDashboard = lazy(() => import("../Admin/Navbar/NavbarDashboard"));
const FooterDashboard = lazy(() => import("../Admin/Footer/FooterDashboard"));

// home page sections
const HeroSectionDashboard = lazy(
  () => import("../Admin/Home/herosection/AdminHeroSection")
);
const BannersDashboard = lazy(
  () => import("../Admin/Home/Addbanners/BannerDashboard")
);
const CorporateVideoDashboard = lazy(
  () => import("../Admin/Home/addcorporatevideo/CorporateVideoDashboard")
);
const ServicesSectionDashboard = lazy(
  () => import("../Admin/Home/addourservices/OurServicesDashboard")
);
const EnquirySectionDashboard = lazy(
  () => import("../Admin/Home/addenquirysection/EnquiryDashboard")
);
const ReelsDashboard = lazy(
  () => import("../Admin/Home/addreels/ReelsDashboard")
);
const VideoDashboard = lazy(
  () => import("../Admin/Home/addvideos/VideosDashboard")
);
const TestimonialVideoDashboard = lazy(
  () => import("../Admin/Home/addtestimonialvideo/TestimonialDashboard")
);
const WebsiteDashboard = lazy(
  () => import("../Admin/Home/addwebsiteimages/WebsiteDashboard")
);
const SocialMediaPostDashboard = lazy(
  () => import("../Admin/Home/addsocialmediapost/SocialMediaDashboard")
);
const OurTeamDashboard = lazy(
  () => import("../Admin/Home/addourteamvideo/TeamVideoDashboard")
);
const OurClientsDashboard = lazy(
  () => import("../Admin/Home/addourclients/ClientDashboard")
);

const AboutUsDashboard = lazy(() => import("../Admin/About/aboutAdmin"));
const BlogsDashboard = lazy(() => import("../Admin/Blogs/AdminBlogs"));
const CareersDashboard = lazy(
  () => import("../Admin/Careers/CareersDashboard")
);
const ContactUsDashboard = lazy(
  () => import("../Admin/Contact/ContactDashboard")
);

// services pages
const FilmProductionDashboard = lazy(
  () => import("../Admin/Services/filmproduction/filmAdmin")
);
const GoogleSeoDashboard = lazy(
  () => import("../Admin/Services/seoServices/SeoServicesDashboard")
);
const WebDevelopmentDashboard = lazy(
  () => import("../Admin/Services/webDevelopment/WebDevDashboard")
);
const CrmSoftwareDashboard = lazy(
  () => import("../Admin/Services/softwareDevpages/crmDashboard")
);
const MobileAppDashboard = lazy(
  () => import("../Admin/Services/softwareDevpages/mobileAppDashboard")
);
const ErpSoftwareDashboard = lazy(
  () => import("../Admin/Services/softwareDevpages/erpDashboard")
);
const CustomizationSoftwareDashboard = lazy(
  () =>
    import("../Admin/Services/softwareDevpages/customizationSoftwareDashboard")
);
const SocialMediaMarketingDashboard = lazy(
  () => import("../Admin/Services/digitalMarketingpages/socialMediaDashboard")
);
const YoutubeMetaAdsDashboard = lazy(
  () => import("../Admin/Services/digitalMarketingpages/youtubeMetaDashboard")
);
const BrandPromotionDashboard = lazy(
  () =>
    import("../Admin/Services/digitalMarketingpages/brandpromotionDashboard")
);
const AdminProfile = lazy(() => import("../Admin/profileadmin/AdminProfile"));
const AdminSetting = lazy(() => import("../Admin/profileadmin/AdminSettings"));
const AdminNotification = lazy(
  () => import("../Admin/profileadmin/AdminNotification")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <AppLayout />
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <SEOManager />
            <Home />
          </>
        ),
      },
      {
        path: "about",
        element: (
          <>
            <SEOManager />
            <About />
          </>
        ),
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            element: (
              <>
                <SEOManager />
                <Blogs />
              </>
            ),
          },
          {
            path: ":id",
            element: (
              <>
                <SEOManager />
                <BlogDetail />
              </>
            ),
          },
        ],
      },
      {
        path: "contact-us",
        element: (
          <>
            <SEOManager />
            <ContactUs />
          </>
        ),
      },
      {
        path: "careers",
        element: (
          <>
            <SEOManager />
            <Careers />
          </>
        ),
      },
      {
        path: "crm",
        element: (
          <>
            <SEOManager />
            <CRMPage />
          </>
        ),
      },
      {
        path: "mobile-application",
        element: (
          <>
            <SEOManager />
            <Mobile />
          </>
        ),
      },
      {
        path: "erp",
        element: (
          <>
            <SEOManager />
            <ERPPage />
          </>
        ),
      },
      {
        path: "coustmised-software",
        element: (
          <>
            <SEOManager />
            <CoustmisedSoftware />
          </>
        ),
      },
      {
        path: "web-development",
        element: (
          <>
            <SEOManager />
            <WebDevelopment />
          </>
        ),
      },
      {
        path: "digital-marketing",
        element: (
          <>
            <SEOManager />
            <DigitalMarketing />
          </>
        ),
      },
      {
        path: "social-media-marketing",
        element: (
          <>
            <SEOManager />
            <SocailMediaMarketting />
          </>
        ),
      },
      {
        path: "youtube-meta-ads",
        element: (
          <>
            <SEOManager />
            <YoutubeMetaAds />
          </>
        ),
      },
      {
        path: "branding",
        element: (
          <>
            <SEOManager />
            <Branding />
          </>
        ),
      },
      {
        path: "seo-services",
        element: (
          <>
            <SEOManager />
            <SeoServices />
          </>
        ),
      },
      {
        path: "film-production",
        element: (
          <>
            <SEOManager />
            <FilmProduction />
          </>
        ),
      },
      {
        path: "javascript",
        element: (
          <>
            <SEOManager />
            <JavaScript />
          </>
        ),
      },
      {
        path: "java",
        element: (
          <>
            <SEOManager />
            <Java />
          </>
        ),
      },
      {
        path: "jquery",
        element: (
          <>
            <SEOManager />
            <JQuery />
          </>
        ),
      },
      {
        path: "laravel",
        element: (
          <>
            <SEOManager />
            <Laravel />
          </>
        ),
      },
      {
        path: "mongodb",
        element: (
          <>
            <SEOManager />
            <MongoDB />
          </>
        ),
      },
      {
        path: "node-js",
        element: (
          <>
            <SEOManager />
            <NodeJS />
          </>
        ),
      },
      {
        path: "python",
        element: (
          <>
            <SEOManager />
            <Python />
          </>
        ),
      },
      {
        path: "react-js",
        element: (
          <>
            <SEOManager />
            <ReactJS />
          </>
        ),
      },
      {
        path: "sql",
        element: (
          <>
            <SEOManager />
            <SQL />
          </>
        ),
      },
      {
        path: "wordpress",
        element: (
          <>
            <SEOManager />
            <Wordpress />
          </>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <>
            <SEOManager />
            <PrivacyPolicy />
          </>
        ),
      },
      {
        path: "portfolio",
        element: (
          <>
            <SEOManager />
            <Portfolio />
          </>
        ),
      },
      {
        path: "brochure",
        element: (
          <>
            <SEOManager />
            <Brouchure />
          </>
        ),
      },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminLogin /> },
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "website-sections/navbar", element: <NavbarDashboard /> },
          { path: "website-sections/footer", element: <FooterDashboard /> },
          { path: "home/hero-section", element: <HeroSectionDashboard /> },
          { path: "home/banners", element: <BannersDashboard /> },
          {
            path: "home/corporate-video",
            element: <CorporateVideoDashboard />,
          },
          {
            path: "home/services-section",
            element: <ServicesSectionDashboard />,
          },
          {
            path: "home/enquiry-section",
            element: <EnquirySectionDashboard />,
          },
          { path: "home/reels", element: <ReelsDashboard /> },
          { path: "home/video", element: <VideoDashboard /> },
          {
            path: "home/testimonial-video",
            element: <TestimonialVideoDashboard />,
          },
          { path: "home/website", element: <WebsiteDashboard /> },
          {
            path: "home/social-media-post",
            element: <SocialMediaPostDashboard />,
          },
          { path: "home/our-team", element: <OurTeamDashboard /> },
          { path: "home/our-clients", element: <OurClientsDashboard /> },
          { path: "about-us", element: <AboutUsDashboard /> },
          { path: "blogs", element: <BlogsDashboard /> },
          { path: "careers", element: <CareersDashboard /> },
          { path: "contact-us", element: <ContactUsDashboard /> },
          {
            path: "services/software-development/crm-software",
            element: <CrmSoftwareDashboard />,
          },
          {
            path: "services/software-development/mobile-application",
            element: <MobileAppDashboard />,
          },
          {
            path: "services/software-development/erp-software",
            element: <ErpSoftwareDashboard />,
          },
          {
            path: "services/software-development/customization-software",
            element: <CustomizationSoftwareDashboard />,
          },
          {
            path: "services/web-development",
            element: <WebDevelopmentDashboard />,
          },
          {
            path: "services/digital-marketing/social-media-marketing",
            element: <SocialMediaMarketingDashboard />,
          },
          {
            path: "services/digital-marketing/youtube-meta-ads",
            element: <YoutubeMetaAdsDashboard />,
          },
          {
            path: "services/digital-marketing/brand-promotion",
            element: <BrandPromotionDashboard />,
          },
          {
            path: "services/google-seo-services",
            element: <GoogleSeoDashboard />,
          },
          {
            path: "services/film-production",
            element: <FilmProductionDashboard />,
          },
          { path: "profile", element: <AdminProfile /> },
          { path: "notifications", element: <AdminNotification /> },
          { path: "settings", element: <AdminSetting /> },
          { path: "*", element: <h2>Admin 404 Page!</h2> },
        ],
      },
    ],
  },
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
