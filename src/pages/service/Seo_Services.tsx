import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sectionsData from "../../components/servicePageContent/Seoservices/seoServicesData.json";

// Define the SectionContent interface
interface SectionContent {
  title: string;
  content: string; // JSON typically contains strings, parsed to React nodes in parseContent
  image: string;
  alt: string;
  reverse?: boolean;
  id?: string;
}

interface ExpandedSections {
  [key: number]: boolean;
}

const SeoServices: React.FC = () => {
  // Type sectionsData with SectionContent interface
  const typedSectionsData: SectionContent[] = sectionsData;

  const initialExpandedSections: ExpandedSections = {};
  typedSectionsData.forEach((_, i) => {
    initialExpandedSections[i] = false;
  });
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const sectionRefs = typedSectionsData.map(() =>
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

  // Function to parse string content into React nodes
  const parseContent = (content: string): React.ReactNode => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-16 left-8 w-32 h-32 bg-red-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-red-800 rounded-full opacity-20 blur-3xl" />
      </motion.div>

      {/* Hero Section */}
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

      {/* Content Sections */}
      <div
        className="w-full mx-auto px-4 py-16 md:py-20 relative z-20 bg-black/90"
        id="seo-overview"
      >
        <div className="max-w-8xl mx-auto">
          {typedSectionsData.map((section, index) => (
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
                <motion.div variants={staggerItem}>
                  {parseContent(section.content)}
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

      {/* CTA Section */}
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
