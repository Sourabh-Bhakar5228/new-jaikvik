import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import aboutContent from "./aboutContent.json";

// Animation styles moved to external CSS
import "../../styles/aboutAnimations.css";

interface AboutContent {
  aboutPage: {
    heroSection: {
      title: string;
      subtitle: string;
      backgroundImage: string;
      ctaButton: {
        text: string;
        link: string;
      };
    };
    aboutSection: {
      title: string;
      content: string[];
    };
    missionVision: {
      mission: {
        title: string;
        content: string;
      };
      vision: {
        title: string;
        content: string;
      };
    };
    whyUs: {
      title: string;
      description: string;
      specializationText: string;
      services: {
        title: string;
        description: string;
      }[];
      image: string;
    };
    stats: {
      title: string;
      stats: {
        value: number;
        label: string;
        dataId: string;
      }[];
    };
    whyChooseUs: {
      title: string;
      points: {
        title: string;
        value: number;
        description: string;
      }[];
      conclusion: string;
      image: string;
    };
    promoters: {
      name: string;
      role: string;
      image: string;
      bio: string[];
      companies: string[];
      additionalInfo: string[];
      color: string;
      accent: string;
    }[];
    clients: {
      title: string;
      logos: {
        name: string;
        logo: string;
      }[];
    };
    cta: {
      title: string;
      description: string;
      button: {
        text: string;
        link: string;
      };
    };
  };
}

const About: React.FC = () => {
  const progressBarsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const statNumbersRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const { aboutPage } = aboutContent as AboutContent;

  useEffect(() => {
    // Progress bar animation
    progressBarsRef.current = document.querySelectorAll("[data-title]");
    progressBarsRef.current?.forEach((progress, index) => {
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

    statNumbersRef.current?.forEach((statNumber) => {
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
    </div>
  );
};

// Component implementations
const HeroSection: React.FC<{
  content: AboutContent["aboutPage"]["heroSection"];
}> = ({ content }) => (
  <section
    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center overflow-hidden"
    style={{ backgroundImage: `url(${content.backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10 px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fadeInUp">
        {content.title}
      </h1>
      <p className="text-lg md:text-xl mt-5 animate-fadeInUp animation-delay-1500">
        {content.subtitle}
      </p>
      <a
        href={content.ctaButton.link}
        className="inline-block mt-8 bg-red-600 text-white py-3 px-6 rounded-md text-lg transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-2000"
        role="button"
        aria-label={content.ctaButton.text}
      >
        {content.ctaButton.text}
      </a>
    </div>
  </section>
);

const AboutSection: React.FC<{
  content: AboutContent["aboutPage"]["aboutSection"];
}> = ({ content }) => (
  <section id="about" className="bg-main-primary py-16 md:py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fadeIn">
        {content.title}
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {content.content.map((paragraph, index) => (
          <p
            key={index}
            className="text-base md:text-lg animate-fadeIn"
            style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const MissionVision: React.FC<{
  content: AboutContent["aboutPage"]["missionVision"];
}> = ({ content }) => (
  <section className="bg-main-secondary w-full py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <div className="bg-main-primary p-8 md:p-10 rounded-lg w-full max-w-md animate-fadeInUp">
          <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            {content.mission.title}
          </h3>
          <p className="text-base md:text-lg">{content.mission.content}</p>
        </div>
        <div className="bg-main-primary p-8 md:p-10 rounded-lg w-full max-w-md animate-fadeInUp animation-delay-200">
          <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
            {content.vision.title}
          </h3>
          <p className="text-base md:text-lg">{content.vision.content}</p>
        </div>
      </div>
    </div>
  </section>
);

const WhyUsSection: React.FC<{
  content: AboutContent["aboutPage"]["whyUs"];
}> = ({ content }) => (
  <section className="bg-main-primary py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div
            style={{ backgroundImage: `url(${content.image})` }}
            className="bg-cover bg-center h-64 md:h-80 lg:h-[400px] rounded-lg animate-fadeIn"
            role="img"
            aria-label="Digital solutions background"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <div>
            <p className="text-main-red text-lg font-bold uppercase mb-2 animate-fadeIn">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fadeIn animation-delay-1200">
              {content.title}
            </h2>
            <p className="text-base md:text-lg mb-5 animate-fadeIn animation-delay-1400">
              {content.description}
            </p>
            <p className="text-base md:text-lg mb-8 animate-fadeIn animation-delay-1400">
              {content.specializationText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-main-secondary p-5 rounded-lg transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-main-red mb-4">
                    {service.title}
                  </h3>
                  <ul className="list-none">
                    <li className="text-sm md:text-base mb-2 relative pl-5">
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

const StatesSection: React.FC<{
  content: AboutContent["aboutPage"]["stats"];
}> = ({ content }) => (
  <section className="bg-main-secondary py-16 md:py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fadeIn">
        {content.title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {content.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-main-primary p-4 md:p-8 rounded-lg animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <div
              className="text-4xl md:text-5xl font-bold text-main-red mb-2"
              data-id={stat.dataId}
            >
              0
            </div>
            <div className="text-sm md:text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs: React.FC<{
  content: AboutContent["aboutPage"]["whyChooseUs"];
}> = ({ content }) => (
  <section className="bg-main-primary py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div>
            <p className="text-main-red text-lg font-bold uppercase mb-2 animate-fadeIn">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fadeIn animation-delay-1200">
              {content.title}
            </h2>
            <div className="space-y-6">
              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="mb-5 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  data-title={point.title}
                  data-value={point.value}
                >
                  <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-base mb-3">{point.description}</p>
                  <div className="bg-gray-700 rounded-md overflow-hidden h-5 relative">
                    <div className="about-progress-bar h-full bg-main-red rounded-md transition-all duration-[3000ms] w-0">
                      <span className="about-progress-percentage absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-white">
                        0%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg mt-8 animate-fadeIn animation-delay-1000">
              {content.conclusion}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            style={{ backgroundImage: `url(${content.image})` }}
            className="bg-cover bg-center h-64 md:h-80 lg:h-[500px] rounded-lg animate-fadeIn"
            role="img"
            aria-label="Why choose us background"
          />
        </div>
      </div>
    </div>
  </section>
);

const PromotersSection: React.FC<{
  content: AboutContent["aboutPage"]["promoters"];
}> = ({ content }) => (
  <section className="py-16 md:py-24 bg-black">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 relative inline-block">
          Our Leaders
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
          Meet the visionary leaders driving innovation and excellence at
          Jaikvik Technology
        </p>
      </div>

      <div className="space-y-12 md:space-y-16">
        {content.map((promoter, index) => (
          <div
            key={index}
            className={`group relative flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="w-full lg:w-1/2 relative">
              <div
                className={`bg-gradient-to-br ${promoter.color} p-1 rounded-2xl md:rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500`}
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 opacity-10">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${promoter.color} rounded-full transform rotate-45`}
                    ></div>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="relative inline-block mb-4 md:mb-6">
                      <img
                        src={promoter.image}
                        alt={promoter.name}
                        className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl md:rounded-2xl mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div
                        className={`absolute -bottom-3 -right-3 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${promoter.color} rounded-lg md:rounded-xl flex items-center justify-center shadow-md`}
                      >
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-md flex items-center justify-center">
                          <div
                            className={`w-3 h-3 md:w-4 md:h-4 bg-${promoter.accent} rounded-full`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      {promoter.name}
                    </h3>
                    <p
                      className={`text-base md:text-lg font-semibold bg-gradient-to-r ${promoter.color} bg-clip-text text-transparent mb-4 md:mb-6`}
                    >
                      {promoter.role}
                    </p>
                    <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                      <h4 className="text-xs md:text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">
                        Previous Experience
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {promoter.companies.map((company, i) => (
                          <span
                            key={i}
                            className={`bg-gradient-to-r ${promoter.color} text-white px-3 py-1 text-xs md:text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-300`}
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
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-800">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    {promoter.bio.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-gray-200 leading-relaxed text-sm md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div
                    className={`w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r ${promoter.color} rounded-full my-6 md:my-8`}
                  ></div>
                  <div className="space-y-3 md:space-y-4">
                    {promoter.additionalInfo.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-gray-400 leading-relaxed text-sm"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="pt-4 md:pt-6">
                    <button
                      className={`bg-gradient-to-r ${promoter.color} text-white px-6 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base`}
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

const ClientsSection: React.FC<{
  content: AboutContent["aboutPage"]["clients"];
}> = ({ content }) => (
  <section className="bg-main-primary py-12 md:py-16 text-center overflow-hidden">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white animate-fadeIn">
        {content.title}
      </h2>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-main-primary to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-main-primary to-transparent z-10"></div>
        <div className="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4 px-6 md:px-8 hide-scrollbar">
          {content.logos.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg md:rounded-xl w-28 h-20 md:w-36 md:h-28 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/20 hover:shadow-md"
            >
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                className="max-h-8 md:max-h-12 max-w-full object-contain transition-all duration-300"
                loading="lazy"
              />
              <span className="text-white/80 text-xs mt-1 md:mt-2 font-medium">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTASection: React.FC<{ content: AboutContent["aboutPage"]["cta"] }> = ({
  content,
}) => (
  <section className="bg-red-600 py-12 md:py-16 text-center">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-5 animate-fadeIn">
          {content.title}
        </h2>
        <p className="text-base md:text-lg mb-6 md:mb-8 animate-fadeIn animation-delay-1200">
          {content.description}
        </p>
        <Link
          to={content.button.link}
          className="inline-block bg-black text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg transition-all duration-300 hover:bg-gray-900 hover:scale-105 animate-fadeInUp animation-delay-1500"
          role="button"
          aria-label={content.button.text}
        >
          {content.button.text}
        </Link>
      </div>
    </div>
  </section>
);

export default About;
