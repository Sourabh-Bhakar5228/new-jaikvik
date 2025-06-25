import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ErrorBoundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 bg-gray-900">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-300">
            Please try refreshing the page or contact support.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Define types for section content
interface Section {
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

const DigitalMarketing: React.FC = () => {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Hero section visibility
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Define sections array
  const sections: Section[] = [
    {
      title: "Introduction to Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing promotes businesses online using strategies like
            SEO, social media, PPC, and content creation. It offers real-time
            performance tracking and cost-effective reach, enabling businesses
            to target specific audiences and maximize ROI.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Unlike traditional methods, it’s measurable and adaptable, ideal for
            businesses of all sizes.
          </p>
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Digital Marketing Overview",
    },
    {
      title: "Evolution of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing began in the ‘90s with email campaigns, evolving
            into SEO and PPC in the 2000s with Google’s rise. Social media
            platforms like Facebook and YouTube introduced interactive ads,
            followed by mobile marketing. Today, AI, automation, and analytics
            drive personalized strategies.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            It’s a dynamic field reflecting technological advancements.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Evolution of Digital Marketing",
      reverse: true,
    },
    {
      title: "Significance of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing matters:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Wider Reach:
              </span>{" "}
              Connects globally via social media, search engines.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Cost-Effective:
              </span>{" "}
              Budget-friendly with high ROI compared to traditional ads.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Targeted Ads:
              </span>{" "}
              Reaches specific demographics via ads.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Measurable Results:
              </span>{" "}
              Provides real-time campaign insights.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/marketing-ideas-share-research-planning-concept_53876-127431.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=350",
      alt: "Significance of Digital Marketing",
    },
    {
      title: "Basics of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing uses online channels like websites, search
            engines, PPC, and social media to promote products. It differs from
            traditional marketing with interactive, targeted campaigns fostering
            two-way communication with customers.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Key elements include creativity and data-driven strategies.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/rocket-boosting-digital-marketing-social-media-with-smartphone_112255-1435.jpg?auto=format&fit=crop&w=740&q=80",
      alt: "Basics of Digital Marketing",
      reverse: true,
    },
    {
      title: "Key Components of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-7 text-gray-300">
            Core components include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Content Marketing:
              </span>{" "}
              Creates valuable content to attract audiences.
            </li>
            <li>
              <span className="font-semibold text-purple-400">SEO:</span>{" "}
              Optimizes websites for search rankings.
            </li>
            <li>
              <span className="font-semibold text-purple-400">SMM:</span>{" "}
              Engages via social media platforms.
            </li>
            <li>
              <span className="font-semibold text-purple-400">PPC:</span> Drives
              targeted traffic through paid ads.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Email Marketing:
              </span>{" "}
              Nurtures leads with personalized campaigns.
            </li>
          </ul>
        </>
      ),
      image:
        "http://img.freepik.com/free-vector/digital-marketing-landing-page_33099-1726.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=350",
      alt: "Components of Digital Marketing",
    },
    {
      title: "LinkedIn Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            LinkedIn is a B2B powerhouse with 950M+ users, ideal for reaching
            professionals, generating leads, and establishing thought
            leadership. Use optimized profiles, consistent posts, and LinkedIn
            Ads for impact.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            It’s perfect for networking and credibility.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/flat-design-linkedin-mockup_23-2149217511.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=350",
      alt: "LinkedIn Marketing",
      reverse: true,
    },
    {
      title: "Benefits of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Benefits include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Cost-Effective:
              </span>{" "}
              Affordable compared to traditional ads.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Global Reach:
              </span>{" "}
              Connects with audiences worldwide.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Targeted Marketing:
              </span>{" "}
              Reaches specific demographics.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Measurable Results:
              </span>{" "}
              Tracks performance in real-time.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Engagement:</span>{" "}
              Builds customer relationships.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/man-suit-standing-office-with-clipboard-pointing-poster-with-words_1098-17121.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Benefits of Digital Marketing",
    },
    {
      title: "Digital Marketing Trends",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Current trends:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Personalization:
              </span>{" "}
              Tailored content via AI.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Voice Search:
              </span>{" "}
              Optimizing for conversational queries.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Social Commerce:
              </span>{" "}
              In-app purchases on platforms.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Privacy-Centric:
              </span>{" "}
              Ethical data practices.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            These shape modern strategies.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/creative-monitor-tech_1134-719.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Digital Marketing Trends",
      reverse: true,
    },
    {
      title: "Strategies for Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Effective strategies:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Define Audience:
              </span>{" "}
              Use personas and segmentation.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Set Goals:</span>{" "}
              Align SMART objectives with KPIs.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Create Content:
              </span>{" "}
              Plan valuable, SEO-optimized content.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Multi-Channel:
              </span>{" "}
              Use diverse platforms for reach.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/creative-monitor-tech_1134-719.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Digital Marketing Strategies",
    },
    {
      title: "SEO Techniques",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SEO essentials:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Keyword Research:
              </span>{" "}
              Target high-value, long-tail keywords.
            </li>
            <li>
              <span className="font-semibold text-purple-400">On-Page:</span>{" "}
              Optimize titles, meta tags, content.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Off-Page:</span>{" "}
              Build quality backlinks.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Mobile-First:
              </span>{" "}
              Ensure responsive design.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/female-multitasking-work_23-2148390868.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "SEO Techniques",
      reverse: true,
    },
    {
      title: "Social Media Marketing Strategies",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SMM tips:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Choose Platforms:
              </span>{" "}
              Target where your audience is active.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Brand Voice:
              </span>{" "}
              Maintain consistency.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Paid vs. Organic:
              </span>{" "}
              Balance for reach and loyalty.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Trends:</span> Use
              AR, live streaming, short-form videos.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/social-media-marketing_773186-810.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "SMM Strategies",
    },
    {
      title: "SEO vs. SMM Balance",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SEO drives organic traffic; SMM offers instant engagement. Combine
            them by:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Sharing Content:
              </span>{" "}
              SEO content on social platforms.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Keyword Ideas:
              </span>{" "}
              Using social trends.
            </li>
          </ul>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Prioritize based on goals.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/social-media-marketing_773186-810.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "SEO vs. SMM",
      reverse: true,
    },
    {
      title: "Role of Data and Analytics",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Data drives decisions with:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">Tools:</span>{" "}
              Google Analytics, SEMrush.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Metrics:</span>{" "}
              Traffic, engagement, conversions, ROI.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Benefits:</span>{" "}
              Optimizes campaigns, predicts trends.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/business-achievement-improvement-success-result.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Data and Analytics",
    },
    {
      title: "Digital Marketing Challenges",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Challenges include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Competition:
              </span>{" "}
              Saturated digital spaces.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Ad Fatigue:</span>{" "}
              Declining engagement.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Privacy:</span>{" "}
              GDPR, CCPA compliance.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Algorithm Changes:
              </span>{" "}
              Impact visibility.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/creative-idea-png-sticker-mixed-media-transparent-background_53876-1038065.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Digital Marketing Challenges",
      reverse: true,
    },
    {
      title: "Future of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Future trends:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">AR/VR:</span>{" "}
              Immersive experiences.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Blockchain:</span>{" "}
              Transparent ad systems.
            </li>
            <li>
              <span className="font-semibold text-purple-400">AI/ML:</span>{" "}
              Personalized campaigns.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Sustainability:
              </span>{" "}
              Ethical marketing.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/marketing-conversion-flat-background_23-2148002911.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Future Trends",
    },
    {
      title: "Actionable Tips for Beginners",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Start with:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">Free Tools:</span>{" "}
              Canva, Google Analytics, Mailchimp.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Learning:</span>{" "}
              Google Digital Garage, HubSpot Academy.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Practice:</span>{" "}
              Small projects, experiments.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Routine:</span>{" "}
              Consistent learning schedule.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/marketing-conversion-flat-background_23-2148002911.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Beginner Tips",
      reverse: true,
    },
    {
      title: "Embrace Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing offers endless opportunities for growth. Stay
            updated, use free tools, keep learning, and experiment to succeed.
            Start today to transform your business.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Connect with us to explore more!
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/digital-marketing-illustration_112255-2905.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Conclusion",
    },
  ];

  // Toggle section expansion
  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ErrorBoundary>
      <div className="font-sans text-gray-100 bg-gray-950 min-h-screen relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y }}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        </motion.div>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80')`,
          }}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          id="smm-hero-section"
          aria-label="Digital Marketing Hero"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
          <div className="relative z-10 px-6 max-w-6xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-purple-400 mb-6 tracking-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              Elevate Your Brand with Jaikvik Technology
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock cutting-edge digital marketing strategies to boost
              visibility, engage audiences, and drive conversions.
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("smm-overview")}
              className="bg-purple-500 text-white px-8 py-2 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              aria-label="Explore Digital Marketing Solutions"
            >
              Discover Now <FaChevronDown className="ml-2 inline" />
            </motion.button>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16" id="smm-overview">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-8 bg-gray-900/30 p-8 rounded-xl mb-12 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-500`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-purple-400 mb-6">
                  {section.title}
                </h2>
                <div className="text-gray-300">{section.content}</div>
                <button
                  onClick={() => toggleSection(index)}
                  className="mt-6 text-purple-400 font-semibold flex items-center hover:text-purple-300 transition-colors duration-300"
                  aria-label={`Toggle ${section.title} section`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      expandedSections[index] ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedSections[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                  >
                    <h4 className="text-xl font-semibold text-purple-400 mb-3 uppercase">
                      Jaikvik Technology Advantage
                    </h4>
                    <p className="text-lg text-gray-300">
                      Jaikvik Technology empowers your brand with tailored
                      strategies for {section.title.toLowerCase()}.
                    </p>
                  </motion.div>
                )}
              </div>
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: section.reverse ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}

          {/* FAQ Section */}
          <motion.div
            className="text-lg mb-12 bg-gray-900/30 p-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Frequently Asked Questions"
          >
            <h2 className="text-3xl font-semibold text-purple-400 mb-6">
              FAQs About Digital Marketing
            </h2>
            <div>
              {[
                {
                  question: "What is digital marketing?",
                  answer:
                    "Digital marketing uses online channels like search engines, social media, email, and websites to promote products or services, leveraging strategies like SEO, PPC, and content marketing.",
                },
                {
                  question:
                    "Why is digital marketing important for businesses?",
                  answer:
                    "It offers global reach, cost-efficiency, targeted ads, measurable results, and enhanced brand visibility, making it essential for growth and competitiveness.",
                },
                {
                  question:
                    "Which industries benefit most from digital marketing?",
                  answer:
                    "E-commerce, healthcare, education, travel, real estate, and technology sectors gain significantly due to targeted reach and online consumer behavior.",
                },
                {
                  question: "What skills are needed for digital marketing?",
                  answer:
                    "Key skills include SEO, analytics, copywriting, social media management, email marketing, basic design, and adaptability to new trends.",
                },
                {
                  question: "How does digital marketing benefit professionals?",
                  answer:
                    "It enhances skills, supports entrepreneurship, boosts networking, and meets high industry demand across various fields.",
                },
                {
                  question: "What is the future of digital marketing?",
                  answer:
                    "Trends include AI-driven personalization, voice search optimization, video marketing, influencer strategies, and sustainable marketing practices.",
                },
                {
                  question: "How can I start learning digital marketing?",
                  answer:
                    "Take online courses (Coursera, HubSpot), earn certifications (Google Ads, Facebook Blueprint), practice with projects, and follow industry blogs.",
                },
                {
                  question: "How is ROI measured in digital marketing?",
                  answer:
                    "Track conversion rates, cost-per-lead, customer lifetime value, website traffic, engagement, and revenue vs. ad spend.",
                },
                {
                  question: "What tools are essential for digital marketing?",
                  answer:
                    "Use Google Analytics, SEMrush, Canva, Mailchimp, and Hootsuite for analytics, content creation, and campaign management.",
                },
                {
                  question:
                    "Why choose Jaikvik Technology for digital marketing?",
                  answer:
                    "Jaikvik Technology offers expert strategies, data-driven campaigns, and tailored solutions to drive your business’s digital success.",
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-600 py-4"
                >
                  <summary className="text-lg font-semibold text-gray-100 cursor-pointer hover:text-purple-400 transition-colors duration-300">
                    {faq.question}
                  </summary>
                  <p className="text-lg text-gray-300 mt-2">{faq.answer}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.section
          className="bg-blue-600 py-16 text-center px-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          role="complementary"
          aria-label="Call to Action"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Skyrocket Your Business?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-white max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Partner with Jaikvik Technology to leverage innovative digital
              marketing solutions.
            </motion.p>
            <motion.button
              className="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              aria-label="Get Started with Digital Marketing"
            >
              Get Started
            </motion.button>
          </div>
        </motion.section>
      </div>
    </ErrorBoundary>
  );
};

export default DigitalMarketing;
