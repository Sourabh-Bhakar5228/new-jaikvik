import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface VideoItemProps {
  label: string;
  videoSrc: string;
  posterSrc: string;
  title: string;
  description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({
  label,
  videoSrc,
  posterSrc,
  title,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          // When scrolled out of view
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          videoRef.current.muted = true;
          setIsMuted(true);
          setIsPlaying(false);
          setShowPoster(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setShowPoster(true);
    } else {
      setShowPoster(false);
      setIsLoading(true);
      video
        .play()
        .then(() => setIsLoading(false))
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().finally(() => setIsLoading(false));
        });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleMouseEnter = () => {
    if (isMobile || isPlaying) return;
    setShowPoster(false);
    const video = videoRef.current;
    if (video) {
      setIsLoading(true);
      video.currentTime = 0;
      video.muted = false;
      setIsMuted(false);
      video
        .play()
        .then(() => setIsLoading(false))
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().finally(() => setIsLoading(false));
        });
    }
  };

  const handleMouseLeave = () => {
    if (isMobile || isPlaying) return;
    setShowPoster(true);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && !isInView) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
        setIsMuted(true);
        setIsPlaying(false);
        setShowPoster(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full flex justify-center px-4">
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black group cursor-pointer transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={togglePlayPause}
      >
        <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
          {label}
        </span>

        {isInView && (
          <>
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover z-[2] ${
                showPoster ? "opacity-0" : "opacity-100"
              }`}
              loop
              playsInline
              muted={isMuted}
              preload="auto"
              controls={false}
              poster={posterSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            {showPoster && (
              <img
                src={posterSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover z-[1]"
              />
            )}
          </>
        )}

        {isLoading && !showPoster && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[4]">
            <div className="animate-pulse text-white"></div>
          </div>
        )}

        {(!isPlaying || isMobile || showPoster) && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-[3]">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center transition-transform hover:scale-110">
              {isPlaying ? (
                <FaPause className="text-white text-2xl" />
              ) : (
                <FaPlay className="text-white text-2xl ml-1" />
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-[3]">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>

        {!isMobile && !showPoster && (
          <button
            className="absolute bottom-4 right-4 bg-black/50 rounded-full p-2 z-[4] hover:bg-black/70 transition-all"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <FaVolumeMute className="text-white text-xl" />
            ) : (
              <FaVolumeUp className="text-white text-xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const CorporateVideosSection: React.FC = () => {
  const videos = [
    {
      key: "company-overview",
      label: "Featured",
      videoSrc:
        "https://jaikvik.in/lab/new-post-video/video/corporate-video/addwatt.mp4",
      posterSrc: "/images/coropratevideo/addwatt.png",
      title: "Company Overview",
      description: "Learn about our mission, values, and what makes us unique",
    },
    {
      key: "featured-project",
      label: "Highlight",
      videoSrc:
        "https://jaikvik.in/lab/new-post-video/video/corporate-video/regent-hitech.mp4",
      posterSrc: "/images/coropratevideo/reagent.png",
      title: "Featured Project",
      description: "See our latest corporate project in action",
    },
  ];

  return (
    <section className="w-full py-12 px-2 sm:px-4 lg:px-6 bg-black-900 pb-5">
      <div className="max-w-8xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Corporate Videos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <VideoItem
              key={video.key}
              label={video.label}
              videoSrc={video.videoSrc}
              posterSrc={video.posterSrc}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporateVideosSection;
