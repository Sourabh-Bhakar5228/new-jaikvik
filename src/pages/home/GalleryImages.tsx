import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import galleryImages from "../../configs/all-gallery-images";

// Type for gallery images (assuming it's an array of strings)
type GalleryImage = string;

const GalleryImages = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isHoveringRef = useRef(false);

  const handleVideoHover = (value: boolean) => {
    isHoveringRef.current = value;
    if (swiperRef.current) {
      setTimeout(() => {
        if (isHoveringRef.current && swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.stop();
        } else if (!isHoveringRef.current && swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }, 50);
    }
  };

  // Fallback UI if no images
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="overflow-hidden h-auto my-4">
        <div className="websiteHeading mb-4">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <Link to="#" className="flex font-bold items-center gap-1.5 ml-2">
              Banners
            </Link>
          </h2>
        </div>
        <p className="text-gray-400 text-center">No banners available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <Link
            to="/gallery"
            className="flex font-bold items-center gap-1.5 ml-2"
          >
            Banners
          </Link>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1280: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1536: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet bg-gray-400 w-2 h-2 opacity-50",
            bulletActiveClass:
              "swiper-pagination-bullet-active bg-red-500 opacity-100",
          }}
          loop
          loopPreventsSliding={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={500}
          className="mySwiper !overflow-visible"
        >
          {galleryImages.map((image: GalleryImage, index: number) => (
            <SwiperSlide
              key={`${image}-${index}`}
              className="hover:z-50 transition-all duration-200"
            >
              <div
                className="hover:scale-105 transition-all duration-300 h-full object-cover hover:z-[1000] hover:shadow-lg rounded-lg overflow-hidden"
                onMouseEnter={() => handleVideoHover(true)}
                onMouseOver={() => handleVideoHover(true)}
                onMouseOut={() => handleVideoHover(false)}
                onMouseLeave={() => handleVideoHover(false)}
              >
                <img
                  src={image}
                  alt={`Banner Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg hover:brightness-105 transition-all duration-300"
                  // loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination top-3 text-right pr-5 z-10" />
      </div>
    </div>
  );
};

export default GalleryImages;
