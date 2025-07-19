// import React, { lazy } from "react";

// // Lazy load all sections
// const HeroSection = lazy(() => import("./HeroSection"));
// const WebsiteSection = lazy(() => import("./WebsiteSection"));
// const SocialMediaSection = lazy(() => import("./SocialMediaSection"));
// const SocialMediaPostSection = lazy(() => import("./SocialMediaPostSection"));
// const ReviewsSection = lazy(() => import("./ReviewsSection"));
// const OurClients = lazy(() => import("./OurClients"));
// const EnquireSection = lazy(() => import("./EnquireSection"));
// const OurVideosSection = lazy(() => import("./OurVideosSection"));
// const GalleryImages = lazy(() => import("./GalleryImages"));
// const BlogsSection = lazy(() => import("./BlogsSection"));
// const OurTestimonials = lazy(() => import("./OurTestimonials"));
// const OurServices = lazy(() => import("./OurSerives"));
// const CorporateVideosSection = lazy(() => import("./CorporateVideosSection"));
// const OurTechnologies = lazy(() => import("./OurTechnologies"));
// const MobileAppSection = lazy(() => import("./MobileAppSection"));
// const TeamVideoSlider = lazy(() => import("./TeamVideoSlider"));
// const ChatBot = lazy(() => import("./Chatbot"));

// const Home: React.FC = () => {
//   return (
//     <div className="home-container">
//       <HeroSection />
//       <div className="section-spacer" />
//       <WebsiteSection />
//       <div className="section-spacer" />
//       <OurTechnologies />
//       <div className="section-spacer" />
//       <SocialMediaSection />
//       <div className="section-spacer" />
//       <MobileAppSection />
//       <div className="section-spacer" />
//       <SocialMediaPostSection />
//       <div className="section-spacer" />
//       <OurVideosSection />
//       <div className="section-spacer" />
//       <GalleryImages />
//       <div className="section-spacer" />
//       <CorporateVideosSection />
//       <div className="section-spacer" />
//       <OurTestimonials />
//       <div className="section-spacer" />
//       <BlogsSection />
//       <div className="section-spacer" />
//       <OurServices />
//       <div className="section-spacer" />
//       <TeamVideoSlider />
//       <div className="section-spacer" />
//       <ReviewsSection />
//       <div className="section-spacer" />
//       <OurClients />
//       <div className="section-spacer" />
//       <EnquireSection />
//       <div className="section-spacer" />
//       <ChatBot />

//       <style>{`
//         .home-container {
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           overflow-x: hidden;
//           padding:10px;
//           gap:20px;
//         }

//         .home-container > * {
//           margin: 0;
//           padding: 0;
//         }

//       `}</style>
//     </div>
//   );
// };

// export default Home;

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

// Skeleton Loader (Horizontal)
const SkeletonLoader: React.FC = () => (
  <div className="skeleton-row">
    {[...Array(3)].map((_, idx) => (
      <div className="skeleton-item" key={idx}></div>
    ))}
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
          <Suspense fallback={<SkeletonLoader />}>
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
          // padding: 10px;
          gap: 20px;
        }

        .skeleton-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          // padding: 10px 0;
        }

        .skeleton-item {
          flex: 0 0 250px;
          height: 150px;
          background-color: grey;
          border-radius: 8px;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
