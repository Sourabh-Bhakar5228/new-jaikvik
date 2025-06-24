import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Define client data interface
interface Client {
  href: string;
  imgSrc: string;
  alt: string;
}

const clients: Client[] = [
  { href: "https://bweld.in/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/1.png", alt: "Bweld" },
  { href: "https://www.glowgreen.in/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/2.png", alt: "Glowgreen" },
  { href: "https://www.radiconlab.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/3.png", alt: "Radiconlab" },
  { href: "https://speedofer.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/4.png", alt: "Speedofer" },
  { href: "https://www.envirotechltd.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/5.png", alt: "Envirotech" },
  { href: "https://www.acousticnest.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/6.png", alt: "Acousticnest" },
  { href: "https://bharatautoparts.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/9.png", alt: "Bharat Auto Parts" },
  { href: "https://amradmedical.in/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/10.png", alt: "Amrad Medical" },
  { href: "https://www.c-med.in/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/11.png", alt: "C-Med" },
  { href: "https://www.martinkitchenware.com", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/12.png", alt: "Martin Kitchenware" },
  { href: "https://luxaindustries.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/13.png", alt: "Luxa Industries" },
  { href: "https://www.jaikviktechnology.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/14.png", alt: "Jaikvik Technology" },
  { href: "https://www.gtigti.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/15.png", alt: "GTI" },
  { href: "https://www.airtechmax.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/16.png", alt: "Airtech Max" },
  { href: "https://addwatt.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/17.png", alt: "Addwatt" },
  { href: "https://www.comfortthermowares.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/18.png", alt: "Comfort Thermowares" },
  { href: "https://www.thefoodprocessingmachine.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/19.png", alt: "Food Processing Machine" },
  { href: "https://anphoney.com/", imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/20.png", alt: "Anphoney" },
];

const OurClients: React.FC = () => {
  return (
    <section className="py-6 px-[28px]">
      <div className="mb-2.5">
        <h2 className="uppercase text-gray-200 text-2xl font-bold">OUR Clients</h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView={5}
        autoplay={{
          delay: 0,
          disableOnInteraction: false, // Changed to false to prevent stopping on interaction
        }}
        speed={6000}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7.5 },
        }}
        className="overflow-hidden"
      >
        {clients.map((client, index) => (
          <SwiperSlide key={index} className="flex-shrink-0">
            <a href={client.href} target="_blank" rel="noopener noreferrer">
              <img
                src={client.imgSrc}
                alt={client.alt}
                className="w-[150px] border border-[#808080] bg-gray-500 rounded-md"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurClients;