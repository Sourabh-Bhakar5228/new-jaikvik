import React, { useRef, useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const isInitialized = useRef<boolean>(false);

  // Initialize video only once
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isInitialized.current) return;

    const initializeVideo = async () => {
      try {
        video.muted = true;
        await video.play().catch(() => {});
        isInitialized.current = true;
      } catch (err) {
        console.error("Video initialization error:", err);
      }
    };

    initializeVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Handle hover changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInitialized.current) return;

    const handleHover = async () => {
      try {
        if (isHovering) {
          if (video.muted) {
            video.muted = false;
          }
          await video.play().catch(() => {});
        } else {
          video.muted = true;
        }
      } catch (err) {
        console.error("Hover state change error:", err);
      }
    };

    handleHover();
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section className="overflow-hidden w-full px-2.5">
      <div className="flex flex-wrap w-full justify-center">
        <div className="hidden lg:block w-full lg:w-1/4 px-4">
          <div className="flex justify-center items-center relative h-full">
            <img
              src="https://jaikvik.in/lab/new-post-video/img/new-cricle-image.png"
              alt="Decorative spinning element"
              className="w-full animate-[spin_15s_linear_infinite]"
              // loading="lazy"
            />
            <img
              src="https://jaikvik.in/lab/new-post-video/img/rotate-3.png"
              alt="Decorative center element"
              className="absolute w-[900px] mr-7 max-w-none"
              // loading="lazy"
            />
          </div>
        </div>

        <div className="w-full lg:w-3/4 px-4">
          <div
            className="w-full relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto lg:h-full md:h-[50vh] sm:h-[50vh] cursor-pointer rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
              preload="auto"
              aria-label="Promotional video"
              poster="images/herosection.png"
            >
              <source
                src="https://jaikvik.in/lab/new-post-video/img/home-banner/jaikvik-corporate-film.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
