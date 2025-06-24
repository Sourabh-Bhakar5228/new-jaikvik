import React from "react";

// Import all sections
import HeroSection from "./HeroSection";
import WebsiteSection from "./WebsiteSection";
import SocialMediaSection from "./SocialMediaSection";
import SocialMediaPostSection from "./SocialMediaPostSection";
import ReviewsSection from "./ReviewsSection";
import OurClients from "./OurClients";
import EnquireSection from "./EnquireSection";
import OurVideosSection from "./OurVideosSection";
import GalleryImages from "./GalleryImages";
import BlogsSection from "./BlogsSection";
import OurTestimonials from "./OurTestimonials";
import OurServices from "./OurSerives";
import CorporateVideosSection from "./CorporateVideosSection";
import OurTechnologies from "./OurTechnologies";
import MobileAppSection from "./MobileAppSection";
import TeamVideoSlider from "./TeamVideoSlider";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <WebsiteSection />
      <OurTechnologies />
      <SocialMediaSection />
      <MobileAppSection />
      <SocialMediaPostSection />
      <OurVideosSection />
      <GalleryImages />
      <CorporateVideosSection />
      <OurTestimonials />
      <BlogsSection />
      <OurServices />
      <TeamVideoSlider />
      <ReviewsSection />
      <OurClients />
      <EnquireSection />

      <style>{`
        .home-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .home-container > * {
          width: 100%;
          position: relative;
          overflow: visible;
        }

        .home-container > * + * {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
