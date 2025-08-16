import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react"; // icons
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";
import videos from "../../configs/all-videos";

const OurVideosSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    poster: string;
  } | null>(null);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  return (
    <div className="overflow-hidden h-auto my-4 ">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Our Videos
          </a>
        </h2>
      </div>

      {/* Swiper */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 8 },
            480: { slidesPerView: 1.3, spaceBetween: 8 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2.5, spaceBetween: 10 },
            1024: { slidesPerView: 3.5, spaceBetween: 10 },
            1280: { slidesPerView: 4.5, spaceBetween: 10 },
            1536: { slidesPerView: 5, spaceBetween: 12 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={600}
          className="mySwiper !overflow-visible"
        >
          {videos.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!overflow-visible hover:z-10 transition-transform duration-200"
            >
              <div
                className="cursor-pointer"
                onClick={() => {
                  // Only open overlay in mobile view
                  if (window.innerWidth <= 768) {
                    setSelectedVideo(item);
                  }
                }}
              >
                <ReelVideoCard
                  src={item.src}
                  poster={item.poster}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-[1.15]"
                  classname="transition-all duration-300 ease-in-out"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* Overlay Fullscreen Video (only for mobile) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          {/* Back Icon */}
          <button
            className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => (window.location.href = "/")} // Back to home
          >
            <BackIcon size={24} />
          </button>

          {/* Close Icon */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={26} />
          </button>

          {/* Video */}
          <video
            src={selectedVideo.src}
            poster={selectedVideo.poster}
            controls
            autoPlay
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default OurVideosSection;
