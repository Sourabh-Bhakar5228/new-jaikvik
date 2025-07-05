import React, { useRef, useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showMuteButton, setShowMuteButton] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const muteButtonTimeout = useRef<NodeJS.Timeout | null>(null);
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
        showTemporaryMuteButton();
      } catch (err) {
        console.error("Video initialization error:", err);
      }
    };

    initializeVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (muteButtonTimeout.current) {
        clearTimeout(muteButtonTimeout.current);
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
            setIsMuted(false);
          }
          await video.play().catch(() => {}); // Avoid AbortError
          showTemporaryMuteButton();
        } else {
          video.muted = true;
          setIsMuted(true);
        }
      } catch (err) {
        console.error("Hover state change error:", err);
      }
    };

    handleHover();
  }, [isHovering]);

  const showTemporaryMuteButton = () => {
    setShowMuteButton(true);
    if (muteButtonTimeout.current) {
      clearTimeout(muteButtonTimeout.current);
    }
    muteButtonTimeout.current = setTimeout(() => {
      setShowMuteButton(false);
    }, 2000);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowMuteButton(false);
  };

  const toggleMute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!video.muted) {
      await video.play().catch(() => {});
    }

    showTemporaryMuteButton();
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
              loading="lazy"
            />
            <img
              src="https://jaikvik.in/lab/new-post-video/img/rotate-3.png"
              alt="Decorative center element"
              className="absolute w-[900px] mr-7 max-w-none"
              loading="lazy"
            />
          </div>
        </div>

        <div className="w-full lg:w-3/4 px-4">
          <div
            className="w-full relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleMute}
          >
            <button
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className={`absolute top-4 right-4 z-50 transition-all duration-300 rounded-md bg-purple-600/80 hover:bg-purple-600 text-white py-2 px-4 ${
                showMuteButton
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleMute(e);
              }}
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto lg:h-full md:h-[50vh] sm:h-[50vh] cursor-pointer rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
              preload="auto"
              aria-label="Promotional video"
            >
              <source
                src="https://jaikvik.in/lab/new-post-video/img/home-banner/jaikvik-technology-video-5.mp4"
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
