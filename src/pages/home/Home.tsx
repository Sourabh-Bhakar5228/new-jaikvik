import React, { lazy, Suspense } from "react";

// Lazy load all sections
const HeroSection = lazy(() => import("./HeroSection"));
const WebsiteSection = lazy(() => import("./WebsiteSection"));
const SocialMediaSection = lazy(() => import("./SocialMediaSection"));
const SocialMediaPostSection = lazy(() => import("./SocialMediaPostSection"));
const ReviewsSection = lazy(() => import("./ReviewsSection"));
const OurClients = lazy(() => import("./OurClients"));
const EnquireSection = lazy(() => import("./EnquireSection"));
const OurVideosSection = lazy(() => import("./OurVideosSection"));
const GalleryImages = lazy(() => import("./GalleryImages"));
const BlogsSection = lazy(() => import("./BlogsSection"));
const OurTestimonials = lazy(() => import("./OurTestimonials"));
const OurServices = lazy(() => import("./OurSerives"));
const CorporateVideosSection = lazy(() => import("./CorporateVideosSection"));
const OurTechnologies = lazy(() => import("./OurTechnologies"));
const MobileAppSection = lazy(() => import("./MobileAppSection"));
const TeamVideoSlider = lazy(() => import("./TeamVideoSlider"));
const ChatBot = lazy(() => import("./Chatbot"));

// Full Screen Skeleton Loader
const FullScreenSkeletonLoader: React.FC = () => (
  <div className="fullscreen-skeleton">
    {/* Header skeleton */}
    <div className="skeleton-header">
      <div className="skeleton-logo"></div>
      <div className="skeleton-nav">
        {[...Array(5)].map((_, idx) => (
          <div className="skeleton-nav-item" key={idx}></div>
        ))}
      </div>
    </div>

    {/* Hero section skeleton */}
    <div className="skeleton-hero">
      <div className="skeleton-hero-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
        <div className="skeleton-buttons">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
      <div className="skeleton-hero-image"></div>
    </div>

    {/* Content sections skeleton */}
    <div className="skeleton-content">
      {/* Cards row */}
      <div className="skeleton-cards-row">
        {[...Array(3)].map((_, idx) => (
          <div className="skeleton-card" key={idx}>
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-card-title"></div>
              <div className="skeleton-card-text"></div>
              <div className="skeleton-card-text short"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Large content block */}
      <div className="skeleton-large-block">
        <div className="skeleton-section-title"></div>
        <div className="skeleton-grid">
          {[...Array(6)].map((_, idx) => (
            <div className="skeleton-grid-item" key={idx}></div>
          ))}
        </div>
      </div>

      {/* Text content rows */}
      <div className="skeleton-text-section">
        <div className="skeleton-section-title"></div>
        <div className="skeleton-text-lines">
          {[...Array(4)].map((_, idx) => (
            <div className="skeleton-text-line" key={idx}></div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer skeleton */}
    <div className="skeleton-footer">
      <div className="skeleton-footer-columns">
        {[...Array(4)].map((_, idx) => (
          <div className="skeleton-footer-column" key={idx}>
            <div className="skeleton-footer-title"></div>
            {[...Array(3)].map((_, i) => (
              <div className="skeleton-footer-link" key={i}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {[
        HeroSection,
        WebsiteSection,
        OurTechnologies,
        SocialMediaSection,
        MobileAppSection,
        SocialMediaPostSection,
        OurVideosSection,
        GalleryImages,
        CorporateVideosSection,
        OurTestimonials,
        BlogsSection,
        OurServices,
        TeamVideoSlider,
        ReviewsSection,
        OurClients,
        EnquireSection,
        ChatBot,
      ].map((Component, index) => (
        <React.Fragment key={index}>
          <Suspense fallback={<FullScreenSkeletonLoader />}>
            <Component />
          </Suspense>
          <div className="section-spacer" />
        </React.Fragment>
      ))}

      <style>{`
        .home-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          gap: 20px;
        }

        /* Full Screen Skeleton Styles */
        .fullscreen-skeleton {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background-color: #ffffff;
          z-index: 9999;
          overflow-y: auto;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Header Skeleton */
        .skeleton-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          border-bottom: 1px solid #f0f0f0;
          background: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .skeleton-logo {
          width: 150px;
          height: 40px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }

        .skeleton-nav {
          display: flex;
          gap: 2rem;
        }

        .skeleton-nav-item {
          width: 80px;
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        /* Hero Section Skeleton */
        .skeleton-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem;
          min-height: 500px;
          gap: 3rem;
        }

        .skeleton-hero-content {
          flex: 1;
          max-width: 500px;
        }

        .skeleton-title {
          width: 100%;
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .skeleton-subtitle {
          width: 80%;
          height: 24px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
          margin-bottom: 2rem;
        }

        .skeleton-buttons {
          display: flex;
          gap: 1rem;
        }

        .skeleton-button {
          width: 120px;
          height: 44px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }

        .skeleton-hero-image {
          flex: 1;
          height: 400px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 12px;
        }

        /* Content Skeleton */
        .skeleton-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .skeleton-cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .skeleton-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .skeleton-card-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .skeleton-card-content {
          padding: 1.5rem;
        }

        .skeleton-card-title {
          width: 80%;
          height: 24px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .skeleton-card-text {
          width: 100%;
          height: 16px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .skeleton-card-text.short {
          width: 60%;
        }

        .skeleton-large-block {
          margin-bottom: 4rem;
        }

        .skeleton-section-title {
          width: 300px;
          height: 36px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 6px;
          margin: 0 auto 2rem auto;
        }

        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .skeleton-grid-item {
          height: 120px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }

        .skeleton-text-section {
          margin-bottom: 4rem;
        }

        .skeleton-text-lines {
          max-width: 800px;
          margin: 0 auto;
        }

        .skeleton-text-line {
          width: 100%;
          height: 16px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .skeleton-text-line:nth-child(2) { width: 90%; }
        .skeleton-text-line:nth-child(3) { width: 85%; }
        .skeleton-text-line:nth-child(4) { width: 70%; }

        /* Footer Skeleton */
        .skeleton-footer {
          background-color: #f8f9fa;
          padding: 3rem 2rem;
          margin-top: 4rem;
        }

        .skeleton-footer-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .skeleton-footer-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skeleton-footer-title {
          width: 120px;
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-footer-link {
          width: 80px;
          height: 16px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        /* Shimmer Animation */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .fullscreen-skeleton {
            background-color: #1a1a1a;
          }
          
          .skeleton-header {
            background: #1a1a1a;
            border-bottom-color: #333;
          }
          
          .skeleton-footer {
            background-color: #111;
          }
          
          .skeleton-logo,
          .skeleton-nav-item,
          .skeleton-title,
          .skeleton-subtitle,
          .skeleton-button,
          .skeleton-hero-image,
          .skeleton-card-image,
          .skeleton-card-title,
          .skeleton-card-text,
          .skeleton-section-title,
          .skeleton-grid-item,
          .skeleton-text-line,
          .skeleton-footer-title,
          .skeleton-footer-link {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 200% 100%;
          }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .skeleton-header {
            padding: 1rem;
          }
          
          .skeleton-nav {
            display: none;
          }
          
          .skeleton-hero {
            flex-direction: column;
            padding: 2rem 1rem;
            text-align: center;
          }
          
          .skeleton-content {
            padding: 1rem;
          }
          
          .skeleton-cards-row {
            grid-template-columns: 1fr;
          }
          
          .skeleton-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .skeleton-footer-columns {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .section-spacer {
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
