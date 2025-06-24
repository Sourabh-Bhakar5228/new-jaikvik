import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Added for SPA navigation
import HeroSection from "./HeroSection";
import MissionVision from "./MissionVision";
import WhyUsSection from "./WhyUsSection";
import StatesSection from "./StatesSection";
import WhyChooseUs from "./WhyChooseUs";
import PromotersSection from "./PromotersSection";

const About: React.FC = () => {
  const progressBarsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const statNumbersRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    // Progress bar animation
    progressBarsRef.current = document.querySelectorAll("[data-title]");
    progressBarsRef.current.forEach((progress, index) => {
      const bar = progress.querySelector(".about-progress-bar") as HTMLElement;
      const percentage = progress.querySelector(
        ".about-progress-percentage"
      ) as HTMLElement;
      const value = parseInt(progress.getAttribute("data-value") || "0");

      if (!bar || !percentage) return; // Guard against null elements

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
      {/* Hero Section */}
      <HeroSection />

      {/* About Company Section */}
      <section id="about" className="bg-main-primary py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-5 animate-fadeIn">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto mb-5 animate-fadeIn animation-delay-1500">
            Established in 2016, Jaikvik Technology started as a partnership and
            had embarked on a journey with the vision of empowering businesses
            through digital means. Eventually, into 2022, observing the growth
            and diversification of the portfolio, the company was promoted to a
            Private Limited company and is now known as Jaikvik Technology India
            Private Limited.
          </p>
          <p className="text-lg max-w-3xl mx-auto mb-5 animate-fadeIn animation-delay-1500">
            Headquartered in India, we are a dynamic team of software
            developers, digital strategists, creatives, and brand specialists,
            committed to transforming business ideas into scalable, tech-driven
            realities.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Stats Section */}
      <StatesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Promoters Section */}
      <PromotersSection />

      {/* Clients Section */}
      <section className="bg-main-primary py-16 text-center overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-white animate-fadeIn">
            Trusted By Industry Leaders
          </h2>

          <div className="relative">
            {/* Gradient fade effect on sides */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-main-primary to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-main-primary to-transparent z-10"></div>

            {/* Clients carousel */}
            <div className="flex items-center justify-center space-x-8 overflow-x-auto py-4 px-8 hide-scrollbar">
              {[
                {
                  name: "Glow Green Pvt Ltd",
                  logo: "https://www.glowgreen.in/website/images/logo/logo.png",
                },
                {
                  name: "Envirotech System Ltd",
                  logo: "https://www.envirotechltd.com/assets/images/logo/New-logo.png",
                },
                {
                  name: "Celestail Lifestyle",
                  logo: "https://celestialindia.com/Assets/images/Logo/logo.png",
                },
                {
                  name: "Ambrosia Harvest Pvt Ltd",
                  logo: "https://anphoney.com/wp-content/uploads/header-ambrosia-harvest-logo.png",
                },
                {
                  name: "Victor Magnetics Pvt Ltd",
                  logo: "https://victormagnetics.com/assets/images/logo/logo.png",
                },
                {
                  name: "Indian Roller Pvt Ltd",
                  logo: "https://www.indianroller.com/assets/images/logo/logo.png",
                },
                {
                  name: "Indian Railway",
                  logo: "https://www.indianrail.gov.in/enquiry/images/rail.gif",
                },
                {
                  name: "IDFC Bank",
                  logo: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/n1/IDFC-logo-website.svg",
                },
              ].map((client, index) => (
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

        <style>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Testimonials Section */}
      <section className="bg-main-secondary py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 animate-fadeIn">
            What Our Clients Say
          </h2>
          <div className="bg-main-primary p-8 rounded-lg max-w-3xl mx-auto animate-fadeInUp animation-delay-1600">
            <p className="text-lg italic mb-5">
              "Jaikvik Technology transformed our digital presence with a
              seamless website and impactful digital marketing strategies. Their
              tailored solutions and creative approach have significantly
              boosted our brand's visibility and engagement."
            </p>
            <p className="font-bold text-main-red">
              - Rohan Mehta, CEO of TechSolutions Inc.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-20 text-center">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-4xl font-bold mb-5 animate-fadeIn">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg mb-8 animate-fadeIn animation-delay-1200">
              Let's discuss how Jaikvik Technology can help your business grow
              in the digital space.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-black text-white py-3 px-8 rounded-md text-lg transition-all duration-300 hover:bg-gray-900 hover:scale-105 animate-fadeInUp animation-delay-1500"
              role="button"
              aria-label="Contact Jaikvik Technology"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.6s ease-in-out;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-1400 {
          animation-delay: 1.4s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-1600 {
          animation-delay: 1.6s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .transition-filter {
          transition-property: filter;
        }
      `}</style>
    </div>
  );
};

export default About;
