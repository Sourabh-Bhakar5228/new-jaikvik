import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ExpandedSections {
  [key: number]: boolean;
}

interface Section {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  sectionId: string;
}

interface SectionRef {
  ref: (node?: Element | null) => void;
  inView: boolean;
}

const WebDevelopment = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );

  const sections: Section[] = [
    {
      id: 0,
      title: "What Are Web Solutions?",
      subtitle: "Comprehensive Digital Platforms for Your Business",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Web solutions encompass a range of platforms and tools designed to
            establish and enhance a business's online presence. These include
            e-commerce websites, corporate websites, WooCommerce stores, and
            online portals, each tailored to meet specific business needs.
            <br />
            <br />
            <strong className="text-blue-300">E-commerce websites</strong>{" "}
            enable businesses to sell products and services online, offering
            features like product catalogues, secure payment gateways, and
            customer management systems.
            <strong className="text-blue-300"> Corporate websites</strong> serve
            as digital storefronts for businesses, showcasing their brand,
            services, and values to build trust and credibility.
            <strong className="text-blue-300"> WooCommerce</strong>, a powerful
            WordPress plugin, transforms websites into fully functional online
            stores with customizable features.
            <strong className="text-blue-300"> Online portals</strong> act as
            centralized platforms for users to access information, services, or
            collaborate, such as customer portals or employee intranet.
            <br />
            <br />
            At Jaikvik Technology, we offer web solutions that are designed to
            be scalable, secure, and user-friendly, ensuring seamless
            integration with existing systems and delivering exceptional user
            experiences.
          </p>
          {expandedSections[0] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              Our solutions empower businesses to reach global audiences,
              streamline operations, and drive growth. For instance, an
              e-commerce platform can reduce cart abandonment by 20% with
              personalized recommendations, while a corporate website can
              increase lead generation by 30% through optimized design and SEO.
              <br />
              <br />
              In today's digital era, a robust online presence is critical for
              business success. Our web solutions combine cutting-edge
              technology, responsive design, and strategic insights to help
              businesses stand out in competitive markets. From startups to
              global enterprises, we deliver tailored solutions that enhance
              brand visibility and customer engagement.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "Web Solutions",
      sectionId: "web-solutions",
    },
    {
      id: 1,
      title: "What Do Web Solutions Offer?",
      subtitle: "Powerful Features for Digital Success",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Web solutions provide businesses with the tools to create, manage,
            and optimize their digital presence. Here's an overview of key
            functionalities:
            <br />
            <br />
            <strong className="text-blue-300">E-commerce Functionality</strong>
            <br />
            E-commerce websites and WooCommerce stores offer product management,
            secure checkout processes, payment processors, inventory tracking,
            and customer account management, ensuring efficient business
            operations.
            <br />
            <strong className="text-blue-300">Corporate Branding</strong>
            <br />
            Corporate websites focus on branding, showcasing company values,
            services, and achievements to build credibility and attract clients
            or partners.
          </p>
          {expandedSections[1] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Online Portals</strong>
              <br />
              Portals provide users with centralized access to information or
              services, such as e-commerce portals, support portals, or employee
              intranet, improving collaboration and enhancing user engagement.
              <br />
              <br />
              <strong className="text-blue-300">SEO and Analytics Tools</strong>
              <br />
              Built-in SEO tools and analytics dashboards provide businesses the
              ability to optimize content, track visitor behavior, and improve
              search engine rankings.
              <br />
              <br />
              <strong className="text-blue-300">Responsive Web Design</strong>
              <br />
              All our solutions are mobile-friendly, ensuring seamless
              performance across devices, which is critical as 60% of web
              traffic comes from mobile users.
              <br />
              <br />
              Jaikvik Technology's solutions include integrations with platforms
              like payment gateways (e.g., PayPal, Stripe), CRM systems, and
              marketing automation tools like MailChimp. Features like AI-driven
              personalization, live chat support, and automated workflows
              enhance user experience and operational efficiency.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/website-design-software-provide-snugly-template-online-retail-business_31965-514820.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid",
      alt: "Web Features",
      reverse: true,
      sectionId: "web-features",
    },
    {
      id: 2,
      title: "Why Choose Web Solutions?",
      subtitle: "The Competitive Edge for Modern Businesses",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Web solutions are essential for businesses aiming to thrive in the
            digital age:
            <br />
            <br />
            <strong className="text-blue-300">Global Reach:</strong> E-commerce
            solutions and corporate websites allow businesses to connect with
            customers worldwide, breaking geographical barriers.
            <br />
            <strong className="text-blue-300">Scalability:</strong> From small
            WooCommerce stores to large online portals, our solutions scale with
            your business needs.
            <br />
            <strong className="text-blue-300">
              Enhanced User Experience:
            </strong>{" "}
            Responsive designs with intuitive interfaces ensure seamless user
            interactions.
            <br />
            <strong className="text-blue-300">
              Data-Driven Insights:
            </strong>{" "}
            Analytics tools offer valuable data on user behavior, helping
            optimize business strategies.
          </p>
          {expandedSections[2] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Cost Efficiency:</strong>{" "}
              Automating processes like inventory or customer support reduces
              operational costs significantly.
              <br />
              <br />
              <strong className="text-blue-300">
                Core Components of Web Solutions
              </strong>
              <br />
              <strong className="text-blue-300">
                Content Management:
              </strong>{" "}
              Easy-to-use CMS platforms like WordPress enable businesses to
              update content without technical expertise.
              <br />
              <strong className="text-blue-300">E-commerce Tools:</strong>{" "}
              Features like shopping carts, discount codes, and order tracking
              enhance the online selling experience.
              <br />
              <strong className="text-blue-300">Security:</strong> SSL
              certificates, secure payment gateways, and GDPR compliance protect
              user data.
              <br />
              <strong className="text-blue-300">Integration:</strong> Seamlessly
              connect with CRM, ERP, or marketing tools for streamlined
              operations.
              <br />
              <br />
              Jaikvik Technology's web solutions offer robust security, 24/7
              support, and regular updates to keep your platform competitive.
              Businesses using our e-commerce solutions have seen up to a 40%
              sales growth, while corporate websites have boosted lead
              generation by 25% through optimized UX and SEO.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/3d-rendering-website-hosting-concept_23-2149484783.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "Web Benefits",
      sectionId: "web-benefits",
    },
    {
      id: 3,
      title: "Web Solutions for Different Industries",
      subtitle: "Tailored Digital Solutions for Every Sector",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Web solutions are versatile, serving various industries with
            tailored features:
            <br />
            <strong className="text-blue-300">1. Retail and E-commerce</strong>
            <br />
            ● E-commerce websites with WooCommerce stores enable retailers to
            manage product listings, process payments, and deliver personalized
            shopping experiences.
            <br />● Enhanced features like abandoned cart recovery and loyalty
            programs drive sales.
          </p>
          {expandedSections[3] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">2. Education Sector</strong>
              <br />
              ● Online portals provide students access to course materials,
              schedules, and communication tools, streamlining academic
              processes.
              <br />
              <br />
              <strong className="text-blue-300">3. Healthcare Industry</strong>
              <br />
              ● Portals enable patients to book appointments, access medical
              records, and communicate with healthcare providers, improving care
              delivery.
              <br />
              <br />
              <strong className="text-blue-300">4. Real Estate</strong>
              <br />
              ● Corporate websites and portals showcase property listings,
              virtual tours, and client inquiry forms, simplifying the sales
              process.
              <br />
              <br />
              <strong className="text-blue-300">5. Nonprofits</strong>
              <br />
              ● Websites and portals facilitate fundraising, volunteer
              management, and donor engagement, amplifying outreach efforts.
              <br />
              <br />
              <strong className="text-blue-300">6. Hospitality</strong>
              <br />
              ● E-commerce platforms and portals manage bookings, guest
              preferences, and loyalty programs, enhancing customer experiences.
              <br />
              <br />
              Jaikvik Technology's web solutions are customized to meet
              industry-specific requirements. For example, a retail e-commerce
              store reduced cart abandonment by 25% with our automated email
              campaigns, while a healthcare portal cut appointment no-shows by
              20% through SMS reminders.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/web-development-programmers-landing-page_138260-18.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=webp",
      alt: "Web Use Cases",
      reverse: true,
      sectionId: "web-industries",
    },
    {
      id: 4,
      title: "E-commerce Websites",
      subtitle: "Powerful Online Selling Platforms",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            E-commerce websites are robust platforms that enable businesses to
            sell products and services online, reaching customers worldwide.
            These websites come equipped with essential tools to streamline
            online selling:
            <br />
            <br />
            <strong className="text-blue-300">Key Features:</strong>
            <br />● <strong>Product Management:</strong> Easily manage product
            listings, categories, and variations.
            <br />● <strong>Secure Payments:</strong> Integration with trusted
            payment gateways like Stripe and PayPal ensures secure transactions.
            <br />● <strong>Customer Accounts:</strong> Enable customers to
            create accounts, track orders, and save preferences.
            <br />● <strong>Cart and Checkout:</strong> Optimized checkout
            processes minimize cart abandonment.
          </p>
          {expandedSections[4] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Benefits:</strong>
              <br />● <strong>Global Reach:</strong> Sell to customers worldwide
              without the limitations of physical stores.
              <br />● <strong>Personalization:</strong> AI-driven
              recommendations boost sales by up to 15%.
              <br />● <strong>Scalability:</strong> Easily handle growing
              product catalogs and traffic.
              <br />● <strong>Analytics:</strong> Track sales, customer
              behavior, and inventory in real-time.
              <br />
              <br />
              Jaikvik Technology builds e-commerce websites with responsive
              designs, SEO optimization, and integrations with marketing tools
              like Mailchimp. Our clients have reported a 30% increase in online
              sales within six months of launching their e-commerce platforms.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/web-development-flat-landing-page-creative-team-designers-developers-work-together-illustration-full-stack-development-software-engineering-web-page-composition-with-people-characters_9209-3545.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "E-commerce Websites",
      sectionId: "ecommerce-websites",
    },
    {
      id: 5,
      title: "WooCommerce Stores",
      subtitle: "Flexible E-commerce on WordPress",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            WooCommerce, a powerful WordPress plugin, transforms websites into
            fully functional online stores. It's ideal for small to medium-sized
            businesses seeking flexibility and affordability.
            <br />
            <br />
            <strong className="text-blue-300">Key Features:</strong>
            <br />● <strong>Customizable Stores:</strong> Tailor your store's
            design and functionality with thousands of themes and plugins.
            <br />● <strong>Inventory Management:</strong> Track stock levels
            and automate restocking alerts.
            <br />● <strong>Payment Flexibility:</strong> Support for multiple
            payment methods, including digital wallets.
            <br />● <strong>WordPress Integration:</strong> Seamlessly manage
            content and sales within one platform.
          </p>
          {expandedSections[5] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Benefits:</strong>
              <br />● <strong>Cost-Effective:</strong> Lower setup costs
              compared to custom e-commerce platforms.
              <br />● <strong>SEO-Friendly:</strong> Leverage WordPress's SEO
              tools to improve search engine rankings.
              <br />● <strong>Scalability:</strong> Easily grow from a small
              store to a large enterprise.
              <br />● <strong>Community Support:</strong> Access a vast
              ecosystem of plugins and developer community support.
              <br />
              <br />
              Jaikvik Technology's WooCommerce solutions include
              mobile-responsive designs and integrations with platforms like
              Google Analytics and Facebook Ads for enhanced marketing. Our
              clients have achieved a 25% boost in conversions after optimizing
              their WooCommerce stores.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/close-up-man-shopping-with-laptop_23-2149241375.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "WooCommerce Stores",
      reverse: true,
      sectionId: "woocommerce-stores",
    },
    {
      id: 6,
      title: "Corporate Websites",
      subtitle: "Professional Digital Presence for Businesses",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Corporate websites serve as the digital face of a business,
            showcasing its brand, services, and achievements to build trust and
            credibility. They are designed to attract clients and generate leads
            effectively.
            <br />
            <br />
            <strong className="text-blue-300">Key Features:</strong>
            <br />● <strong>Brand Storytelling:</strong> Highlight your
            company's mission, vision, and achievements.
            <br />● <strong>Lead Generation:</strong> Contact forms, CTAs, and
            live chat features to drive customer inquiries.
            <br />● <strong>Portfolio Showcase:</strong> Display case studies,
            projects, or client testimonials.
            <br />● <strong>SEO Optimization:</strong> Enhance visibility on
            search engines.
          </p>
          {expandedSections[6] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Benefits:</strong>
              <br />● <strong>Credibility:</strong> A professional website
              builds trust among clients and partners.
              <br />● <strong>Lead Growth:</strong> Optimized designs can boost
              leads by up to 30%.
              <br />● <strong>Global Presence:</strong> Reach stakeholders
              globally with a polished online presence.
              <br />● <strong>Analytics Tools:</strong> Monitor visitor behavior
              to refine marketing strategies.
              <br />
              <br />
              Jaikvik Technology creates corporate websites with responsive
              layouts, fast load times, and seamless integrations with platforms
              like Salesforce for enhanced CRM. Our corporate clients have
              reported a 20% increase in client inquiries within months after
              launching their websites.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/website-design-software-provide-modish-template-online-retail-business_31965-671963.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Corporate Websites",
      sectionId: "corporate-websites",
    },
    {
      id: 7,
      title: "Online Portals",
      subtitle: "Centralized Digital Platforms for Businesses",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Online portals serve as centralized platforms that provide users
            with access to information, services, or collaboration tools. They
            are ideal for businesses, educational institutions, or organizations
            seeking efficiency.
            <br />
            <br />
            <strong className="text-blue-300">Key Features:</strong>
            <br />● <strong>User Management:</strong> Role-based access for
            admins, employees, or customers.
            <br />● <strong>Collaboration Tools:</strong> Features like forums,
            document sharing, and messaging to enhance communication.
            <br />● <strong>Integration Capabilities:</strong> Seamlessly
            connect with existing systems like ERP or CRM platforms.
            <br />● <strong>Security Measures:</strong> Robust authentication
            and data encryption for user data protection.
          </p>
          {expandedSections[7] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Benefits:</strong>
              <br />● <strong>Efficiency:</strong> Streamline processes like
              customer support or employee workflows for better productivity.
              <br />● <strong>Enhanced Engagement:</strong> Centralized
              platforms increase user engagement by up to 35%.
              <br />● <strong>Scalability:</strong> Support thousands of users
              seamlessly without performance issues.
              <br />● <strong>Customization Options:</strong> Tailor portals to
              meet specific industry needs, such as healthcare or education
              sectors.
              <br />
              <br />
              Jaikvik Technology's online portals are built with user-friendly
              interfaces and seamless integrations with platforms like Google
              Workspace for enhanced productivity. Our portal solutions have
              helped organizations reduce operational costs by 15% through
              automation.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/click-here-concept-illustration_114360-4384.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Online Portals",
      reverse: true,
      sectionId: "online-portals",
    },
  ];

  // Initialize expandedSections after sections definition
  React.useEffect(() => {
    setExpandedSections(
      sections.reduce((acc, section) => ({ ...acc, [section.id]: false }), {})
    );
  }, []);

  const sectionRefs: SectionRef[] = sections.map(() => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    return { ref, inView };
  });

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev: ExpandedSections) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    <div className="font-sans text-gray-100 bg-gray-900 min-h-screen relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-purple-900 rounded-full blur-3xl opacity-20" />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10 overflow-hidden"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="Web Solutions Hero"
        id="web-hero"
      >
        <div className="absolute inset-0 bg-black/80 z-10" />
        <motion.div
          className="relative z-20 px-5 w-full max-w-7xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Empower Your Business Online
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Build stunning e-commerce, corporate websites, WooCommerce stores,
            and online portals with Jaikvik Technology
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("web-overview")}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            aria-label="Explore Web Solutions"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Main Content Sections */}
      <div
        className="w-full mx-auto px-5 py-12 md:py-16 relative z-20 bg-gray-900"
        id="web-overview"
      >
        <div className="max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              ref={sectionRefs[index].ref}
              id={section.sectionId}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm mb-12 hover:shadow-lg hover:shadow-blue-900/20`}
              initial="hidden"
              animate={sectionRefs[index].inView ? "visible" : "hidden"}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex-1"
                variants={staggerContainer}
                initial="hidden"
                animate={sectionRefs[index].inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={staggerItem}
                  className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6"
                >
                  {section.title}
                </motion.h2>
                <motion.h3
                  variants={staggerItem}
                  className="text-xl text-blue-300 mb-4"
                >
                  {section.subtitle}
                </motion.h3>
                <motion.div
                  variants={staggerItem}
                  className="text-gray-300 leading-relaxed mb-4"
                >
                  {section.content}
                </motion.div>
                <motion.button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center text-blue-400 font-medium mt-4 transition-colors duration-300 hover:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Toggle ${section.title} Description`}
                >
                  {expandedSections[section.id] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      expandedSections[section.id] ? "transform rotate-90" : ""
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
                  className="w-full h-96 rounded-lg shadow-md transition-transform duration-500 hover:scale-105 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-gray-900 py-16 px-5 text-center relative overflow-hidden"
        style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Empower Your Business Online?
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our web solutions can enhance your digital presence,
            drive sales, and improve customer engagement.
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            aria-label="Get Started with Web Solutions"
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(56, 182, 255, 0.1) 0%, transparent 70%)",
            opacity,
          }}
        />
      </motion.div>
    </div>
  );
};

export default WebDevelopment;
