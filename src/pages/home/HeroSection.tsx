import React, { useRef, useState, useEffect, useCallback } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isInitialized = useRef(false);

  const initializeVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isInitialized.current) return;

    try {
      video.muted = true;
      await video.play().catch(() => {});
      isInitialized.current = true;
    } catch (err) {
      console.error("Video initialization error:", err);
    }
  }, []);

  const handleHoverState = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isInitialized.current) return;

    try {
      if (isHovering) {
        video.muted = false;
        await video.play().catch(() => {});
      } else {
        video.muted = true;
      }
    } catch (err) {
      console.error("Hover state change error:", err);
    }
  }, [isHovering]);

  // Initialize video only once
  useEffect(() => {
    initializeVideo();
    return () => {
      videoRef.current?.pause();
    };
  }, [initializeVideo]);

  // Handle hover changes
  useEffect(() => {
    handleHoverState();
  }, [handleHoverState]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section className="overflow-hidden w-full px-2.5">
      <div className="flex flex-wrap w-full justify-center">
        <div className="hidden lg:block w-full lg:w-1/4 px-4">
          <div className="flex justify-center items-center relative h-full">
            <img
              src="https://jaikvik.com/lab/new-post-video/img/new-cricle-image.png"
              alt="Decorative spinning element"
              className="w-full animate-[spin_15s_linear_infinite]"
              loading="lazy"
              width={400}
              height={400}
            />
            <img
              src="https://jaikvik.com/lab/new-post-video/img/rotate-3.png"
              alt="Decorative center element"
              className="absolute w-[900px] mr-7 max-w-none"
              loading="lazy"
              width={900}
              height={900}
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
              disablePictureInPicture
              disableRemotePlayback
            >
              <source
                src="https://jaikvik.com/lab/new-post-video/img/home-banner/jaikvik-corporate-film.mp4"
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
