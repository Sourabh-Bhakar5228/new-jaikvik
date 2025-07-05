import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import aboutContent from "./aboutContent.json";

const About: React.FC = () => {
  const progressBarsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const statNumbersRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const { aboutPage } = aboutContent;

  useEffect(() => {
    // Progress bar animation
    progressBarsRef.current = document.querySelectorAll("[data-title]");
    progressBarsRef.current.forEach((progress, index) => {
      const bar = progress.querySelector(".about-progress-bar") as HTMLElement;
      const percentage = progress.querySelector(
        ".about-progress-percentage"
      ) as HTMLElement;
      const value = parseInt(progress.getAttribute("data-value") || "0");

      if (!bar || !percentage) return;

      setTimeout(() => {
        let current = 0;
        const increment = value / 100;
        const duration = 3000;
        const intervalTime = duration / 100;

        const animate = setInterval(() => {
          if (current >= value) {
            clearInterval(animate);
            percentage.textContent = `${value}%`;
            bar.style.width = `${value}%`;
            return;
          }
          current += increment;
          percentage.textContent = `${Math.round(current)}%`;
          bar.style.width = `${current}%`;
        }, intervalTime);
      }, index * 500);
    });

    // Stats counter animation
    statNumbersRef.current = document.querySelectorAll("[data-id]");
    const options: IntersectionObserverInit = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target as HTMLElement;
          const target = parseInt(statNumber.getAttribute("data-id") || "0");
          const duration = 1000;
          const increment = target / (duration / 16);
          let current = 0;

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(counter);
              statNumber.textContent = target.toString();
            } else {
              statNumber.textContent = Math.floor(current).toString();
            }
          }, 16);
          observer.unobserve(statNumber);
        }
      });
    }, options);

    statNumbersRef.current.forEach((statNumber) => {
      observer.observe(statNumber);
    });

    return () => {
      statNumbersRef.current?.forEach((statNumber) =>
        observer.unobserve(statNumber)
      );
    };
  }, []);

  return (
    <div className="font-mulish bg-black text-white">
      <HeroSection content={aboutPage.heroSection} />
      <AboutSection content={aboutPage.aboutSection} />
      <MissionVision content={aboutPage.missionVision} />
      <WhyUsSection content={aboutPage.whyUs} />
      <StatesSection content={aboutPage.stats} />
      <WhyChooseUs content={aboutPage.whyChooseUs} />
      <PromotersSection content={aboutPage.promoters} />
      <ClientsSection content={aboutPage.clients} />
      <CTASection content={aboutPage.cta} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
        .animate-fadeInUp { animation: fadeInUp 1.6s ease-in-out; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-1600 { animation-delay: 1.6s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .transition-filter { transition-property: filter; }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

// Component implementations (same as before, excluding TestimonialSection)
const HeroSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.heroSection;
}) => (
  <section className="relative h-[60vh] bg-[url('${content.backgroundImage}')] bg-cover bg-center flex items-center justify-center text-center overflow-hidden">
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold animate-fadeInUp">
        {content.title}
      </h1>
      <p className="text-lg md:text-xl mt-5 animate-fadeInUp animation-delay-1500">
        {content.subtitle}
      </p>
      <a
        href={content.ctaButton.link}
        className="inline-block mt-5 bg-red-600 text-white py-2 px-5 rounded-md text-lg transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-2000"
        role="button"
        aria-label="Discover Our Story"
      >
        {content.ctaButton.text}
      </a>
    </div>
  </section>
);

const AboutSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.aboutSection;
}) => (
  <section id="about" className="bg-main-primary py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-5 animate-fadeIn">
        {content.title}
      </h2>
      {content.content.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg max-w-3xl mx-auto mb-5 animate-fadeIn animation-delay-1500"
        >
          {paragraph}
        </p>
      ))}
    </div>
  </section>
);

const MissionVision = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.missionVision;
}) => (
  <section className="bg-main-secondary w-full py-20">
    <div className="w-full px-4">
      <div className="flex flex-wrap justify-center w-full gap-8">
        <div className="bg-main-primary p-10 rounded-lg w-full max-w-md animate-fadeInUp animation-delay-1600">
          <h3 className="text-3xl font-bold text-red-600 mb-5">
            {content.mission.title}
          </h3>
          <p>{content.mission.content}</p>
        </div>
        <div className="bg-main-primary p-10 rounded-lg w-full max-w-md animate-fadeInUp animation-delay-1600">
          <h3 className="text-3xl font-bold text-red-600 mb-5">
            {content.vision.title}
          </h3>
          <p>{content.vision.content}</p>
        </div>
      </div>
    </div>
  </section>
);

const WhyUsSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.whyUs;
}) => (
  <section className="bg-main-primary py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4">
          <div
            className="bg-[url('${content.image}')] bg-cover bg-center h-[400px] rounded-lg animate-fadeIn"
            role="img"
            aria-label="Digital solutions background"
          ></div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          <div>
            <p className="text-main-red text-lg font-bold uppercase mb-2 animate-fadeIn">
              What We Do
            </p>
            <h2 className="text-4xl font-bold mb-5 animate-fadeIn animation-delay-1200">
              {content.title}
            </h2>
            <p className="text-lg mb-5 animate-fadeIn animation-delay-1400">
              {content.description}
            </p>
            <p className="text-lg mb-5 animate-fadeIn animation-delay-1400">
              {content.specializationText}
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {content.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-main-secondary p-5 rounded-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp animation-delay-1600"
                >
                  <h3 className="text-2xl font-bold text-main-red mb-4">
                    {service.title}
                  </h3>
                  <ul className="list-none">
                    <li className="text-base mb-2 relative pl-5">
                      <FaArrowRight className="absolute left-0 top-1 text-main-red" />
                      {service.description}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatesSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.stats;
}) => (
  <section className="bg-main-secondary py-20 text-center">
    <div className="px-8">
      <h2 className="text-4xl font-bold mb-10 animate-fadeIn">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
        {content.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-main-primary p-8 rounded-lg w-full max-w-xs animate-fadeInUp animation-delay-1600"
          >
            <div
              className="text-5xl font-bold text-main-red mb-2"
              data-id={stat.dataId}
            >
              0
            </div>
            <div className="text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.whyChooseUs;
}) => (
  <section className="bg-main-primary py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div>
            <p className="text-main-red text-lg font-bold uppercase mb-2 animate-fadeIn">
              Why Choose Us
            </p>
            <h2 className="text-4xl font-bold mb-5 animate-fadeIn animation-delay-1200">
              {content.title}
            </h2>
            {content.points.map((point, index) => (
              <div
                key={index}
                className="mb-5"
                data-title={point.title}
                data-value={point.value}
              >
                <p className="text-lg mb-2">{point.description}</p>
                <div className="bg-gray-700 rounded-md overflow-hidden h-5 relative">
                  <div className="about-progress-bar h-full bg-main-red rounded-md transition-all duration-[3000ms] w-0">
                    <span className="about-progress-percentage absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-white">
                      0%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-lg">{content.conclusion}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <div
            className="bg-[url('${content.image}')] bg-cover bg-center h-[400px] rounded-lg animate-fadeIn"
            role="img"
            aria-label="Why choose us background"
          ></div>
        </div>
      </div>
    </div>
  </section>
);

const PromotersSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.promoters;
}) => (
  <section className="min-h-screen bg-black py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <div className="inline-block">
          <h2 className="text-6xl font-black text-white mb-4 relative">
            Our Leaders
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </h2>
        </div>
        <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto">
          Meet the visionary leaders driving innovation and excellence at
          Jaikvik Technology
        </p>
      </div>

      <div className="space-y-16">
        {content.map((promoter, index) => (
          <div
            key={index}
            className={`group relative ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } flex flex-col lg:flex gap-8 items-center`}
          >
            <div className="lg:w-1/2 relative">
              <div
                className={`bg-gradient-to-br ${promoter.color} p-1 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
              >
                <div className="bg-white rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${promoter.color} rounded-full transform rotate-45`}
                    ></div>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="relative inline-block mb-6">
                      <img
                        src={promoter.image}
                        alt={promoter.name}
                        className="w-64 h-64 object-cover rounded-2xl mx-auto shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br ${promoter.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <div
                            className={`w-4 h-4 bg-${promoter.accent} rounded-full`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      {promoter.name}
                    </h3>
                    <p
                      className={`text-lg font-semibold bg-gradient-to-r ${promoter.color} bg-clip-text text-transparent mb-6`}
                    >
                      {promoter.role}
                    </p>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                        Previous Experience
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {promoter.companies.map((company, i) => (
                          <span
                            key={i}
                            className={`bg-gradient-to-r ${promoter.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300`}
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-900 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-800">
                <div className="space-y-6">
                  <div className="space-y-4">
                    {promoter.bio.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-gray-200 leading-relaxed text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div
                    className={`w-24 h-1 bg-gradient-to-r ${promoter.color} rounded-full my-8`}
                  ></div>
                  <div className="space-y-4">
                    {promoter.additionalInfo.map((paragraph, i) => (
                      <p key={i} className="text-gray-400 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="pt-6">
                    <button
                      className={`bg-gradient-to-r ${promoter.color} text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                    >
                      Connect with {promoter.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ClientsSection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.clients;
}) => (
  <section className="bg-main-primary py-16 text-center overflow-hidden">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-12 text-white animate-fadeIn">
        {content.title}
      </h2>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-main-primary to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-main-primary to-transparent z-10"></div>
        <div className="flex items-center justify-center space-x-8 overflow-x-auto py-4 px-8 hide-scrollbar">
          {content.logos.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm p-4 rounded-xl w-36 h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
            >
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                className="max-h-12 max-w-full object-contain transition-all duration-300"
              />
              <span className="text-white/80 text-xs mt-2 font-medium">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTASection = ({
  content,
}: {
  content: typeof aboutContent.aboutPage.cta;
}) => (
  <section className="bg-red-600 py-20 text-center">
    <div className="container mx-auto px-4">
      <div>
        <h2 className="text-4xl font-bold mb-5 animate-fadeIn">
          {content.title}
        </h2>
        <p className="text-lg mb-8 animate-fadeIn animation-delay-1200">
          {content.description}
        </p>
        <Link
          to={content.button.link}
          className="inline-block bg-black text-white py-3 px-8 rounded-md text-lg transition-all duration-300 hover:bg-gray-900 hover:scale-105 animate-fadeInUp animation-delay-1500"
          role="button"
          aria-label="Contact Jaikvik Technology"
        >
          {content.button.text}
        </Link>
      </div>
    </div>
  </section>
);

export default About;
