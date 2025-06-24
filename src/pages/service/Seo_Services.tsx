import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define types for section content
interface SectionContent {
  title: string;
  content: React.JSX.Element;
  image: string;
  alt: string;
  reverse?: boolean;
  id?: string;
}

// Define type for expanded sections state
interface ExpandedSections {
  [key: number]: boolean;
}

const SeoServices: React.FC = () => {
  // Initialize expandedSections for all sections (0–4)
  const initialExpandedSections: ExpandedSections = {};
  for (let i = 0; i <= 4; i++) {
    initialExpandedSections[i] = false;
  }
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Define all sections with proper types
  const sections: SectionContent[] = [
    {
      title: "What Are Google SEO Services?",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Google SEO Services encompass strategies to improve your website's
            visibility on search engines, driving organic traffic and enhancing
            user experience. These services include{" "}
            <span className="font-bold text-red-400">
              Website Audit Reports
            </span>
            , <span className="font-bold text-red-400">On-Page SEO</span>,{" "}
            <span className="font-bold text-red-400">Off-Page SEO</span>, and{" "}
            <span className="font-bold text-red-400">Technical SEO</span> to
            ensure your site ranks higher.
          </p>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Our Approach:</span> At
            Jaikvik Technology, we provide comprehensive SEO solutions tailored
            to your business needs. Our audits identify performance gaps, while
            our SEO strategies optimize content, backlinks, and technical
            aspects to boost rankings.
          </p>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Long-Term Success:</span>{" "}
            Our approach ensures long-term success by aligning with Google's
            algorithms and best practices.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Advanced Strategies:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                We combine keyword research, content optimization, and technical
                fixes to enhance your site's authority. Our team uses tools like
                Google Analytics and Search Console to monitor performance and
                adapt strategies for maximum ROI.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Case Study:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                For example, an e-commerce site could see a 50% increase in
                organic traffic within months through our targeted SEO
                campaigns, while a local business might improve local search
                rankings with optimized Google My Business profiles.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/magnifying-glass-with-seo-concepts_1134-81.jpg",
      alt: "SEO Services Overview",
      id: "google-seo",
    },
    {
      title: "What Is a Website Audit Report?",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            A Website Audit Report is a detailed analysis of your website's
            performance, identifying issues affecting SEO, usability, and speed.
            It covers:
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Technical Issues:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Broken links, slow loading times, and mobile responsiveness.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">Content Gaps:</h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Missing keywords, duplicate content, and thin pages.
          </p>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Security Concerns:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                SSL issues, outdated plugins, and vulnerable code.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Our Expertise:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Jaikvik Technology's audits provide actionable recommendations
                to fix issues and improve rankings. Our reports include
                prioritized tasks, such as optimizing meta tags or fixing crawl
                errors, to enhance your site's performance.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">Results:</h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                For instance, a client reduced bounce rates by 30% after
                implementing our audit recommendations, leading to higher
                engagement and conversions.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/seo-website-development-data-network-concept_53876-127578.jpg",
      alt: "Website Audit Report",
      reverse: true,
      id: "website-audit",
    },
    {
      title: "On-Page SEO: Optimizing Content",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            On-Page SEO focuses on optimizing individual web pages to rank
            higher. Key elements include:
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Keyword Optimization:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Using relevant keywords in titles, headers, and content.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Content Quality:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Creating engaging, informative content that meets user intent.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">Meta Tags:</h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Crafting compelling meta titles and descriptions.
          </p>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Image Optimization:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Using alt text and compressed images for faster load times.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Internal Linking:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Connecting related pages to improve navigation and dwell time.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Our Impact:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Jaikvik Technology's On-Page SEO services ensure your content is
                user-friendly and search-engine optimized. Our clients have seen
                up to a 40% increase in click-through rates after optimizing
                meta descriptions and headers.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/seo-word-written-computer_192941-1129.jpg",
      alt: "On-Page SEO",
      id: "on-page-seo",
    },
    {
      title: "Off-Page SEO: Building Authority",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Off-Page SEO enhances your website's authority through external
            factors:
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Backlink Building:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Acquiring high-quality backlinks from reputable sites.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Social Signals:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Leveraging social media to boost brand visibility.
          </p>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Guest Posting:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Publishing content on authoritative blogs to drive traffic.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Local Citations:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Listing your business on directories like Yelp and Google My
                Business.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Our Strategy:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Jaikvik Technology's Off-Page SEO strategies focus on ethical
                link-building and brand mentions, resulting in a 25% increase in
                domain authority for clients within six months.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/seo-search-engine-optimization-modish-ecommerce-online-retail-business_31965-63120.jpg",
      alt: "Off-Page SEO",
      reverse: true,
      id: "off-page-seo",
    },
    {
      title: "Technical SEO: Enhancing Performance",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Technical SEO optimizes your website's infrastructure for better
            crawling and indexing:
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">Site Speed:</h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Reducing load times with caching and compression.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Mobile Optimization:
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Ensuring responsive design for all devices.
          </p>
          <h3 className="text-xl font-bold text-red-400 mb-4">XML Sitemaps:</h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Helping search engines navigate your site.
          </p>
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Schema Markup:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Adding structured data to improve rich snippets.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">Security:</h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
                Implementing HTTPS and fixing vulnerabilities.
              </p>
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Our Results:
              </h3>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Jaikvik Technology's Technical SEO services improve site
                performance, with clients reporting a 35% reduction in page load
                times and higher rankings after fixes.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/seo-search-engine-optimization-modish-ecommerce-online-retail-business_31965-46392.jpg",
      alt: "Technical SEO",
      id: "technical-seo",
    },
  ];

  // Initialize sectionRefs for sections
  const sectionRefs = sections.map(() =>
    useInView({ threshold: 0.2, triggerOnce: true })
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (id: string | undefined) => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-16 left-8 w-32 h-32 bg-red-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-red-800 rounded-full opacity-20 blur-3xl" />
      </motion.div>

      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/magnifying-glass-with-seo-concepts_1134-81.jpg')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="SEO Services Hero"
        id="seo-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <motion.div
          className="relative z-20 px-4 w-full max-w-6xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Boost Your Rankings with Google SEO Services
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Optimize your website with{" "}
            <span className="font-bold">Jaikvik Technology's</span> SEO and
            Audit Solutions
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("seo-overview")}
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            aria-label="Explore SEO Services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <FaChevronDown className="ml-3" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      <div
        className="w-full mx-auto px-4 py-16 md:py-20 relative z-20 bg-black/90"
        id="seo-overview"
      >
        <div className="max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              ref={sectionRefs[index][0]}
              id={section.id}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300`}
              initial="hidden"
              animate={sectionRefs[index][1] ? "visible" : "hidden"}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex-1"
                variants={staggerContainer}
                initial="hidden"
                animate={sectionRefs[index][1] ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={staggerItem}
                  className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
                >
                  {section.title}
                </motion.h2>
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed"
                >
                  {section.content}
                </motion.div>
                <motion.button
                  onClick={() => toggleSection(index)}
                  className="flex items-center text-red-400 font-bold text-lg mt-6 transition-colors duration-300 hover:text-red-300"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-3 transition-transform duration-300 ${
                      expandedSections[index] ? "rotate-90" : ""
                    }`}
                  />
                </motion.button>
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ x: section.reverse ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="bg-gradient-to-b from-black to-gray-900 py-20 px-4 text-center relative overflow-hidden"
        style={{ y }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Skyrocket Your Rankings?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-medium text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how Jaikvik Technology's SEO services can drive organic
            traffic and boost your online presence.
          </motion.p>
          <motion.button
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            aria-label="Get Started with SEO Services"
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default SeoServices;
