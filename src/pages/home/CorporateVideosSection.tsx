import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";

interface VideoItemProps {
  label: string;
  teaserSrc: string;
  fullSrc: string;
  title: string;
  description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({
  label,
  teaserSrc,
  fullSrc,
  title,
  description,
}) => {
  const teaserVideoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const expandedContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Mobile-specific play/pause toggle
  const toggleMobilePlayPause = () => {
    if (!isMobile) return;

    const video = teaserVideoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {
          video.muted = true;
          video.play();
        });
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };

  // Original desktop hover behavior
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (teaserVideoRef.current) {
      teaserVideoRef.current.muted = false;
      teaserVideoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (teaserVideoRef.current) {
      teaserVideoRef.current.muted = true;
      teaserVideoRef.current.loop = true;
    }
  };

  // Original fullscreen functionality
  const openFullscreen = () => {
    if (expandedContainerRef.current && expandedVideoRef.current) {
      expandedContainerRef.current.style.display = "flex";
      expandedVideoRef.current.src = fullSrc;
      expandedVideoRef.current.muted = false;
      expandedVideoRef.current.controls = true;
      expandedVideoRef.current.play().catch(() => {
        expandedVideoRef.current!.muted = true;
        expandedVideoRef.current!.play();
      });
    }
  };

  const closeFullscreen = () => {
    if (expandedContainerRef.current && expandedVideoRef.current) {
      expandedVideoRef.current.pause();
      expandedVideoRef.current.src = "";
      expandedContainerRef.current.style.display = "none";
    }
  };

  // Initialize teaser video
  useEffect(() => {
    const teaserVideo = teaserVideoRef.current;
    if (teaserVideo) {
      teaserVideo.muted = true;
      teaserVideo.loop = true;
      if (!isMobile) {
        teaserVideo.play();
      }
    }
  }, [isMobile]);

  return (
    <>
      {/* Original desktop video item with mobile enhancements */}
      <div
        className="relative w-full h-[clamp(200px,40vw,400px)] rounded-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-[0_8px_25px_rgba(0,0,0,0.2)] bg-black group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isMobile ? toggleMobilePlayPause : undefined}
      >
        <span className="absolute top-4 right-4 bg-[#ff4d4d] text-white px-2.5 py-1 rounded-full text-[clamp(10px,1.2vw,12px)] font-semibold uppercase z-10 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-0">
          {label}
        </span>

        <video
          ref={teaserVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-[2]"
          loop
          playsInline
          muted
          controls={isMobile && showControls}
        >
          <source src={teaserSrc} type="video/mp4" />
        </video>

        {/* Mobile play button overlay */}
        {isMobile && !showControls && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[3]">
            <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
              <FaPlay className="text-white text-2xl ml-1" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.8)] text-white z-[3] transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-0">
          <h3 className="text-[clamp(14px,2vw,18px)] font-semibold mb-1 text-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
            {title}
          </h3>
          <p className="text-[clamp(12px,1.5vw,14px)]">{description}</p>
        </div>

        <div
          className="start-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[rgba(255,77,77,0.8)] rounded-full flex items-center justify-center z-[5] opacity-100 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer group-hover:opacity-0"
          onClick={(e) => {
            e.stopPropagation();
            openFullscreen();
          }}
        >
          <FaPlay className="text-white text-2xl ml-0.5" />
        </div>
      </div>

      {/* Fullscreen container (unchanged) */}
      <div
        ref={expandedContainerRef}
        className="fixed inset-0 bg-black z-[1000] hidden justify-center items-center"
      >
        <span
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-[1001] bg-[rgba(0,0,0,0.5)] w-[35px] h-[35px] rounded-full flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <FaTimes />
        </span>
        <video
          ref={expandedVideoRef}
          controls
          className="max-w-full max-h-full object-contain"
          playsInline
        >
          <source src={fullSrc} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

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
