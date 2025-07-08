import React, { Suspense, lazy } from "react";

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

const VideoSkeletonLoader = () => {
  return (
    <div className="full-page-skeleton" aria-label="Loading content">
      {/* Hero Section */}
      <section aria-label="Loading hero section" className="skeleton-hero">
        <div className="skeleton-hero-content">
          <div className="skeleton-line large" aria-hidden="true"></div>
          <div className="skeleton-line medium" aria-hidden="true"></div>
          <div className="skeleton-button" aria-hidden="true"></div>
        </div>
      </section>

      {/* Standard Video Section */}
      <section aria-label="Loading video section" className="skeleton-section">
        <div className="skeleton-title" aria-hidden="true"></div>
        <div className="skeleton-video-container">
          <div className="skeleton-video-player" aria-hidden="true">
            <div className="skeleton-play-button" aria-hidden="true"></div>
          </div>
          <div className="skeleton-video-info">
            <div className="skeleton-line medium" aria-hidden="true"></div>
            <div className="skeleton-line small" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* Social Media Video Grid */}
      <section
        aria-label="Loading social media videos"
        className="skeleton-section dark-bg"
      >
        <div className="skeleton-title" aria-hidden="true"></div>
        <div className="skeleton-video-grid">
          {[...Array(4)].map((_, i) => (
            <div
              key={`social-video-${i}`}
              className="skeleton-social-video"
              aria-hidden="true"
            >
              <div className="skeleton-social-video-player">
                <div
                  className="skeleton-platform-icon"
                  aria-hidden="true"
                ></div>
              </div>
              <div className="skeleton-social-meta">
                <div className="skeleton-avatar" aria-hidden="true"></div>
                <div className="skeleton-social-text">
                  <div className="skeleton-line small" aria-hidden="true"></div>
                  <div
                    className="skeleton-line xsmall"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Video Carousel */}
      <section
        aria-label="Loading corporate videos"
        className="skeleton-section"
      >
        <div className="skeleton-title" aria-hidden="true"></div>
        <div className="skeleton-video-carousel">
          <div
            className="skeleton-carousel-control left"
            aria-hidden="true"
          ></div>
          <div className="skeleton-carousel-videos">
            {[...Array(3)].map((_, i) => (
              <div
                key={`corporate-video-${i}`}
                className="skeleton-corporate-video"
                aria-hidden="true"
              >
                <div className="skeleton-thumbnail"></div>
                <div className="skeleton-line small" aria-hidden="true"></div>
                <div className="skeleton-line xsmall" aria-hidden="true"></div>
              </div>
            ))}
          </div>
          <div
            className="skeleton-carousel-control right"
            aria-hidden="true"
          ></div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section
        aria-label="Loading video testimonials"
        className="skeleton-section dark-bg"
      >
        <div className="skeleton-title" aria-hidden="true"></div>
        <div className="skeleton-testimonial-videos">
          {[...Array(3)].map((_, i) => (
            <div
              key={`testimonial-${i}`}
              className="skeleton-testimonial"
              aria-hidden="true"
            >
              <div className="skeleton-testimonial-video">
                <div className="skeleton-play-button" aria-hidden="true"></div>
              </div>
              <div className="skeleton-testimonial-info">
                <div className="skeleton-line medium" aria-hidden="true"></div>
                <div className="skeleton-line small" aria-hidden="true"></div>
                <div className="skeleton-line xsmall" aria-hidden="true"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Gallery */}
      <section aria-label="Loading video gallery" className="skeleton-section">
        <div className="skeleton-title" aria-hidden="true"></div>
        <div className="skeleton-video-masonry">
          {[...Array(6)].map((_, i) => (
            <div
              key={`gallery-item-${i}`}
              className={`skeleton-gallery-item ${
                i % 3 === 0 ? "tall" : i % 2 === 0 ? "wide" : ""
              }`}
              aria-hidden="true"
            >
              <div className="skeleton-play-button" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .full-page-skeleton {
          width: 100%;
          padding: 0;
          margin: 0;
          background: #000;
        }

        /* Animation */
        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }

        /* Base Styles */
        .skeleton-section {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dark-bg {
          background: #f0f0f0;
        }

        .skeleton-title {
          width: 200px;
          height: 32px;
          background: #e1e1e1;
          border-radius: 4px;
          margin: 0 auto 3rem;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .skeleton-line {
          height: 12px;
          background: #e1e1e1;
          border-radius: 4px;
          margin-bottom: 10px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-line.large {
          width: 80%;
          height: 20px;
        }
        .skeleton-line.medium {
          width: 60%;
        }
        .skeleton-line.small {
          width: 40%;
          height: 10px;
        }
        .skeleton-line.xsmall {
          width: 30%;
          height: 8px;
        }

        .skeleton-button {
          width: 150px;
          height: 45px;
          background: #e1e1e1;
          border-radius: 25px;
          margin-top: 20px;
          animation: pulse 1.5s infinite ease-in-out;
        }

        /* Hero Section */
        .skeleton-hero {
          width: 100%;
          height: 80vh;
          background: #e9e9e9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .skeleton-hero-content {
          width: 80%;
          max-width: 800px;
          text-align: center;
        }

        /* Standard Video Player */
        .skeleton-video-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .skeleton-video-player {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 */
          background: #ddd;
          border-radius: 8px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.5);
        }
        .skeleton-video-info {
          padding: 1.5rem 0;
        }

        /* Social Media Video Grid */
        .skeleton-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .skeleton-social-video {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .skeleton-social-video-player {
          position: relative;
          width: 100%;
          padding-bottom: 100%; /* Square for social */
          background: #e1e1e1;
        }
        .skeleton-platform-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          background: #fff;
          border-radius: 50%;
        }
        .skeleton-social-meta {
          display: flex;
          padding: 1rem;
          gap: 1rem;
        }
        .skeleton-avatar {
          width: 40px;
          height: 40px;
          background: #e1e1e1;
          border-radius: 50%;
        }
        .skeleton-social-text {
          flex: 1;
          padding-top: 4px;
        }

        /* Corporate Video Carousel */
        .skeleton-video-carousel {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .skeleton-carousel-control {
          width: 40px;
          height: 40px;
          background: #e1e1e1;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .skeleton-carousel-videos {
          display: flex;
          gap: 1.5rem;
          flex: 1;
          overflow: hidden;
        }
        .skeleton-corporate-video {
          min-width: 300px;
          flex: 1;
        }
        .skeleton-thumbnail {
          width: 100%;
          padding-bottom: 60%; /* 16:9 */
          background: #e1e1e1;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        /* Video Testimonials */
        .skeleton-testimonial-videos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .skeleton-testimonial {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .skeleton-testimonial-video {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: #e1e1e1;
        }
        .skeleton-testimonial-info {
          padding: 1.5rem;
        }

        /* Video Gallery Masonry */
        .skeleton-video-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-auto-rows: 200px;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .skeleton-gallery-item {
          position: relative;
          background: #e1e1e1;
          border-radius: 8px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-gallery-item.tall {
          grid-row: span 2;
        }
        .skeleton-gallery-item.wide {
          grid-column: span 2;
        }
        .skeleton-gallery-item .skeleton-play-button {
          width: 40px;
          height: 40px;
          border-width: 2px;
        }
      `}</style>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Suspense fallback={<VideoSkeletonLoader />}>
        <HeroSection />
        <div className="section-spacer" />
        <WebsiteSection />
        <div className="section-spacer" />
        <OurTechnologies />
        <div className="section-spacer" />
        <SocialMediaSection />
        <div className="section-spacer" />
        <MobileAppSection />
        <div className="section-spacer" />
        <SocialMediaPostSection />
        <div className="section-spacer" />
        <OurVideosSection />
        <div className="section-spacer" />
        <GalleryImages />
        <div className="section-spacer" />
        <CorporateVideosSection />
        <div className="section-spacer" />
        <OurTestimonials />
        <div className="section-spacer" />
        <BlogsSection />
        <div className="section-spacer" />
        <OurServices />
        <div className="section-spacer" />
        <TeamVideoSlider />
        <div className="section-spacer" />
        <ReviewsSection />
        <div className="section-spacer" />
        <OurClients />
        <div className="section-spacer" />
        <EnquireSection />
        <div className="section-spacer" />
        <ChatBot />
      </Suspense>

      <style>{`
        .home-container {
         width: 100%;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        .home-container > * {
          
          margin: 0;
          padding: 0;
        }

        .section-spacer {
          height: 40px;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Home;
