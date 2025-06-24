import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
import $ from "jquery";
import "../../styles/technology.css"; // Adjust the path as necessary
import { Link } from "react-router-dom";

interface Technology {
  name: string;
  mainImage: string;
  hoverImage: string;
  link: string;
}

const technologies: Technology[] = [
  {
    name: "ES6",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/ES6.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/javascript",
  },
  {
    name: "Java",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/JAva.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/java",
  },
  {
    name: "jQuery",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Jquery.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/jquery",
  },
  {
    name: "Laravel",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Laravel.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/laravel",
  },
  {
    name: "MongoDB",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Mongo-DB.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/mongodb",
  },
  {
    name: "Node.js",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Node-Js.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/node-js",
  },
  {
    name: "Python",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Python.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/python",
  },
  {
    name: "React.js",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/React-js.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/react-js",
  },
  {
    name: "SQL",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/SQL.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/sql",
  },
  {
    name: "WordPress",
    mainImage: "https://jaikvik.in/lab/new-post-video/img/logo/Wordpress.png",
    hoverImage:
      "https://jaikvik.in/lab/new-post-video/img/Website/radicon-lab.png",
    link: "/wordpress",
  },
];

interface TechnologyCardProps {
  tech: Technology;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ tech }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLImageElement>(null);

  const getImageScrollHeight = (): number => {
    if (!containerRef.current || !hoverImageRef.current) return 0;
    const imageHeight: number = hoverImageRef.current.offsetHeight;
    const containerHeight: number = containerRef.current.offsetHeight;
    console.log(
      "Image height:",
      imageHeight,
      "Container height:",
      containerHeight
    );
    return containerHeight - imageHeight;
  };

  const handleHoverStart = (): void => {
    console.log("Hover start on:", tech.name);
    if (!hoverImageRef.current || getImageScrollHeight() >= 0) {
      console.log("No scroll needed, image fits");
      return;
    }
    const duration: number = 5000;
    $(hoverImageRef.current)
      .stop()
      .css({ bottom: getImageScrollHeight() })
      .animate({ bottom: 0 }, duration);
  };

  const handleHoverEnd = (): void => {
    console.log("Hover end on:", tech.name);
    if (!hoverImageRef.current) return;
    $(hoverImageRef.current)
      .stop()
      .animate({ bottom: getImageScrollHeight() }, 500);
  };

  useEffect(() => {
    if (!hoverImageRef.current || !containerRef.current) return;
    $(hoverImageRef.current).css({ bottom: getImageScrollHeight() });

    const handleResize = () => {
      if (hoverImageRef.current) {
        $(hoverImageRef.current).css({ bottom: getImageScrollHeight() });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bhakar-technologia-card">
      <div
        ref={containerRef}
        className="bhakar-technologia-img bhakar-scroll-image"
        data-duration="5000"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <a href={tech.link}>
          <img
            src={tech.mainImage}
            alt={tech.name}
            className="image main-image"
          />
          <img
            ref={hoverImageRef}
            src={tech.hoverImage}
            alt="Radicon Lab"
            className="image hover-image"
            onError={() =>
              console.error(`Failed to load hover image for ${tech.name}`)
            }
          />
        </a>
      </div>
    </div>
  );
};

const TechnologySlider: React.FC = () => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    technologies.forEach((tech) => {
      const img = new Image();
      img.src = tech.mainImage;
      img.onerror = () =>
        console.error(`Failed to preload image: ${tech.mainImage}`);
      const hoverImg = new Image();
      hoverImg.src = tech.hoverImage;
      hoverImg.onerror = () =>
        console.error(`Failed to preload image: ${tech.hoverImage}`);
    });

    return () => {
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="bhakar-technologia-section">
      <div className="swiper bhakar-technologia-slider">
        <div className="bhakar-technologia-heading">
          <h2>
            <Link to="/">
              Our Technology <span></span>
            </Link>
          </h2>
        </div>
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1.2}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ el: ".bhakar-technologia-pagination", clickable: true }}
          navigation={{
            nextEl: ".bhakar-technologia-button-next",
            prevEl: ".bhakar-technologia-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          onMouseEnter={() => {
            console.log("Swiper hover start");
            if (swiperRef.current?.swiper?.autoplay) {
              swiperRef.current.swiper.autoplay.stop();
            }
          }}
          onMouseLeave={() => {
            console.log("Swiper hover end");
            if (swiperRef.current?.swiper?.autoplay) {
              swiperRef.current.swiper.autoplay.start();
            }
          }}
        >
          {technologies.map((tech, index) => (
            <SwiperSlide key={index}>
              <TechnologyCard tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="bhakar-technologia-nav">
          <div className="bhakar-technologia-button-prev"></div>
          <div className="bhakar-technologia-button-next"></div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySlider;
