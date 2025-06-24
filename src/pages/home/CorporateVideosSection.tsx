import React from "react";
import VideoItem from "../../components/items/VideoItem";

const CorporateVideosSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1450px] p-5 mx-auto flex flex-wrap gap-5 font-['Mulish',sans-serif] overflow-x-hidden">
      <div className="flex-1 min-w-[280px] flex flex-col">
        <div className="text-left mb-5">
          <h2 className="text-[clamp(18px,2.5vw,22px)] font-semibold text-[#e5e5e5] pb-2 inline-block relative group">
            <a
              href="#"
              className="text-[#e5e5e5] no-underline flex items-center gap-1.5 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            >
              Our Corporate Videos
            </a>
          </h2>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <VideoItem
            key="featured-video"
            label="Featured"
            teaserSrc="https://jaikvik.in/lab/new-post-video/video/corporate-video/addwatt-sd-version.mp4"
            fullSrc="https://jaikvik.in/lab/new-post-video/video/corporate-video/addwatt-sd-version.mp4"
            title="Company Overview"
            description="Learn about our mission and values"
          />
        </div>
      </div>
      <div className="flex-1 min-w-[280px] flex flex-col">
        <div className="text-left mb-5">
          <h2 className="text-[clamp(18px,2.5vw,22px)] font-semibold text-[#e5e5e5] pb-2 inline-block relative group">
            <a
              href="#"
              className="text-[#e5e5e5] no-underline flex items-center gap-1.5 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            >
              Corporate Video
            </a>
          </h2>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <VideoItem
            key="highlighted-video"
            label="Highlight"
            teaserSrc="https://jaikvik.in/lab/new-post-video/video/corporate-video/regent-hitech-2.mp4"
            fullSrc="https://jaikvik.in/lab/new-post-video/video/corporate-video/regent-hitech-2.mp4"
            title="Featured Content"
            description="Our latest corporate presentation"
          />
        </div>
      </div>
    </section>
  );
};

export default CorporateVideosSection;
