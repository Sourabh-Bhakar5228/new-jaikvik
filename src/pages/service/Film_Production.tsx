import * as React from "react";
import { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion"; // Type-only import for Variants
import { useInView } from "react-intersection-observer";

// TypeScript Interfaces
interface Section {
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  id?: string;
}

interface ExpandedSections {
  [key: number]: boolean;
}

const FilmProduction: React.FC = () => {
  // Initialize expanded sections
  const initialExpandedSections: ExpandedSections = {};
  for (let i = 0; i <= 8; i++) {
    initialExpandedSections[i] = false;
  }
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Hero section inView
  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Define sections
  const sections: Section[] = [
    {
      title: "What Is Film Production?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Film production involves creating high-quality visual content, such
            as corporate videos, product explainers, TV commercials, YouTube
            ads, photoshoots, model shoots, and interviews. It blends creative
            storytelling, advanced technology, and professional expertise to
            craft compelling narratives.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Our Services
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            At Jaikvik Technology, we offer end-to-end film production services,
            from concept to post-production, using state-of-the-art equipment
            and editing software to make your content stand out.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Applications
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Tailored for product launches, corporate branding, or engaging ads,
            our solutions meet diverse needs.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Process Details
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Our process includes scriptwriting, storyboarding, filming,
                editing, and distribution for a seamless experience. We create
                emotionally engaging content to drive audience interaction and
                achieve your goals.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Impact
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Retail brands may see 30% higher online sales with our explainer
                videos, while corporate clients enhance reputation with
                professional presentations. Our analytics track engagement to
                optimize future projects.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/close-up-camera_1048944-3803309.jpg",
      alt: "Film Production Services",
      id: "film-production",
    },
    {
      title: "Corporate Video Presentation",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Corporate video presentations communicate your brand’s story,
            values, and services, ideal for investor pitches, training, or
            showcasing milestones.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Professional Quality:
              </span>{" "}
              High-definition visuals and clear audio for a polished look.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Custom Storytelling:
              </span>{" "}
              Tailored scripts highlight your brand’s strengths.
            </li>
          </ul>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Applications
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Use for internal communications, client pitches, or marketing
                campaigns.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Expertise
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology’s services include on-site filming,
                voiceovers, and motion graphics, with clients reporting 25%
                increased stakeholder engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/arrangement-cinema-elements-blue-background-with-copy-space_23-2148506001.jpg",
      alt: "Corporate Video Presentation",
      reverse: true,
      id: "corporate-video",
    },
    {
      title: "Product Explainer Videos",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Product explainer videos simplify complex products, perfect for
            e-commerce, SaaS, or tech startups.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Clear Messaging:
              </span>{" "}
              Concise scripts highlight key features and benefits.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Engaging Formats:
              </span>{" "}
              Animated or live-action videos capture attention.
            </li>
          </ul>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Boost conversion rates by up to 20% by addressing customer pain
                points.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Approach
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology creates explainer videos with 2D/3D animation
                or live footage, optimized for YouTube and social media to
                maximize reach.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/video-production-backstage-scenes-creating-video-content-professional-team_124865-39894.jpg",
      alt: "Product Explainer Videos",
      id: "product-explainer",
    },
    {
      title: "TV Commercial Ads",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            TV commercial ads deliver high-impact messages for brand launches or
            product promotions to a broad audience.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Broadcast Quality:
              </span>{" "}
              Shot with professional cameras and edited for TV standards.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Creative Concepts:
              </span>{" "}
              Memorable storylines that resonate with viewers.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Reach
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Adaptable for regional or national broadcasts.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Expertise
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology handles casting to post-production, with
                clients achieving 15% higher brand recall.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/press-reporter-fallowing-leads-case_23-2149579746.jpg",
      alt: "TV Commercial Ads",
      reverse: true,
      id: "tv-commercial",
    },
    {
      title: "YouTube Ads",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            YouTube ads offer a cost-effective way to reach targeted audiences
            on the world’s largest video platform.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Targeted Campaigns:
              </span>{" "}
              Precise audience targeting by demographics and interests.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Engaging Formats:
              </span>{" "}
              Skippable, non-skippable, or bumper ads tailored to goals.
            </li>
          </ul>
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Optimized ads achieve up to 10% higher click-through rates.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Approach
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology creates YouTube ads with compelling visuals
                and calls-to-action, optimized for mobile and desktop, with
                analytics to refine strategies.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/man-filming-with-professional-camera_23-2149066342.jpg",
      alt: "YouTube Ads",
      id: "youtube-ads",
    },
    {
      title: "Photoshoot Services",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Professional photoshoots capture stunning visuals for marketing,
            e-commerce, or branding.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                High-Quality Images:
              </span>{" "}
              Shot with professional lighting and edited for perfection.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Versatile Applications:
              </span>{" "}
              Ideal for product catalogs, social media, or websites.
            </li>
          </ul>
          {expandedSections[5] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Customization
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Tailored to your brand’s aesthetic and goals.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Expertise
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology’s photoshoot services include location
                scouting, styling, and post-processing, with clients seeing 20%
                increased social media engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/cinema-camera-film-set-scenes-background-film-crew-production_1048944-12611948.jpg",
      alt: "Photoshoot Services",
      reverse: true,
      id: "photoshoot",
    },
    {
      title: "Model Shoot",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Model shoots create captivating visuals for fashion, lifestyle, or
            product campaigns.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Professional Talent:
              </span>{" "}
              Work with experienced models and photographers.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                Creative Direction:
              </span>{" "}
              Concepts aligned with your brand’s vision.
            </li>
          </ul>
          {expandedSections[6] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Applications
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Perfect for advertising, lookbooks, or social media.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Expertise
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Our model shoot services include casting, makeup, and styling,
                with clients reporting 30% boosted campaign engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/photographer-developing-film-darkroom-red-light_1280275-61227.jpg",
      alt: "Model Shoot Services",
      id: "model-shoot",
    },
    {
      title: "Interview Videos",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Interview videos showcase thought leadership, customer testimonials,
            or employee stories.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Authentic Storytelling:
              </span>{" "}
              Capture genuine moments with professional filming.
            </li>
            <li>
              <span className="font-semibold text-red-500">Versatile Use:</span>{" "}
              Ideal for websites, social media, or events.
            </li>
          </ul>
          {expandedSections[7] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Builds trust and credibility with audiences.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Expertise
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology’s interview videos use multi-camera setups,
                lighting, and editing, increasing audience trust by 25%.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/silhouette-production-crew-team-working-photo-shooting-studio-lighting-flash-led-headligh_258335-2020.jpg",
      alt: "Interview Videos",
      reverse: true,
      id: "interview-videos",
    },
    {
      title: "Production Packages",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Our production packages offer comprehensive solutions for businesses
            of all sizes.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-red-500">
                Customizable Plans:
              </span>{" "}
              Basic, standard, or premium packages.
            </li>
            <li>
              <span className="font-semibold text-red-500">
                End-to-End Services:
              </span>{" "}
              Includes filming, editing, and distribution.
            </li>
          </ul>
          {expandedSections[8] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Bundled services save time and budget.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 mt-4 uppercase">
                Our Approach
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Jaikvik Technology’s packages meet diverse needs, from single
                videos to full-scale campaigns, reducing costs by 15% while
                maintaining quality.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/flat-lay-film-elements-white-background_23-2148416833.jpg",
      alt: "Production Packages",
      id: "production-packages",
    },
  ];

  // Initialize sectionRefs with correct typing
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

  // Define variants using Framer Motion's Variants type
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-12 left-6 w-24 h-24 bg-red-600 rounded-full opacity-10 blur-2xl" />
        <div className="absolute bottom-12 right-6 w-36 h-36 bg-red-600 rounded-full opacity-10 blur-2xl" />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/close-up-camera_1048944-3803309.jpg')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="Film Production Hero"
        id="film-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <motion.div
          className="relative z-20 px-4 w-full max-w-7xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-6 tracking-tight drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create Impactful Stories with Film Production
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg font-normal text-gray-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Bring your vision to life with Jaikvik Technology’s Film and Media
            Production Services, crafted to captivate and engage your audience.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("film-overview")}
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            aria-label="Explore Film Production Services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div
        className="w-full mx-auto px-4 py-12 md:py-16 relative z-20 bg-black/50"
        id="film-overview"
      >
        <div className="max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              ref={sectionRefs[index][0]}
              id={section.id}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center bg-gray-900/20 p-6 md:p-10 rounded-xl shadow-sm mb-12 hover:shadow-md hover:shadow-red-500/20 transition-shadow duration-300`}
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
                  className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-sm"
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
                  className="flex items-center text-red-500 font-semibold text-base mt-5 transition-colors duration-300 hover:text-red-400"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
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
                  className="w-full h-72 rounded-md shadow-md transition-transform duration-500 hover:scale-105 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-black py-16 px-4 text-center relative overflow-hidden"
        style={{ y }}
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Tell Your Story with Film Production?
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-normal text-gray-200 mb-8 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how Jaikvik Technology’s film production services can
            create captivating content to elevate your brand and engage your
            audience.
          </motion.p>
          <motion.button
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-radial from-red-600/10 to-transparent"
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 0.3]),
          }}
        />
      </motion.div>
    </div>
  );
};

export default FilmProduction;
