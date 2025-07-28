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
      title: "Introduction to Website Development",
      subtitle: "The Foundation of Your Online Presence",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            The craft of generating, constructing, and maintaining online
            websites is known as website development. It encompasses web design,
            coding, content creation, and focuses on ensuring an optimal user
            experience. The creation of a website is vital for businesses,
            organizations, and individuals in this digital age, providing a
            significant online presence to showcase products and services to a
            targeted audience.
            <br />
            <br />
            <strong className="text-blue-300">
              Relevance in Today’s Climate
            </strong>
            <br />
            <strong className="text-blue-300">Digital Presence:</strong> A
            website acts as a virtual storefront, available 24/7, allowing
            businesses to secure brand presence and showcase offerings globally.
            <br />
            <strong className="text-blue-300">User Interaction:</strong>{" "}
            Engaging and interactive websites build trust and credibility by
            attracting users and fostering meaningful connections.
            <br />
            <strong className="text-blue-300">Business Growth:</strong>{" "}
            Increased website traffic drives sales, enhances visibility, and
            attracts more customers.
          </p>
          {expandedSections[0] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">
                Features in Web Development
              </strong>
              <br />
              <strong className="text-blue-300">Design:</strong> A
              well-thought-out layout creates a user-friendly interface that
              entices visitors.
              <br />
              <strong className="text-blue-300">Coding:</strong> Involves script
              writing and integration using technologies like HTML, CSS,
              JavaScript, PHP, and SQL to power website functionalities.
              <br />
              <strong className="text-blue-300">Content:</strong> Persuasive,
              up-to-date, and informative texts, images, and multimedia engage
              the audience.
              <br />
              <strong className="text-blue-300">
                User Experience (UX):
              </strong>{" "}
              Easy navigation, fast loading times, and responsive design across
              all devices ensure seamless communication.
              <br />
              <br />
              Website development is essential to connect with today’s digitally
              savvy audiences, whether starting from scratch or enhancing an
              existing site. It forms the backbone of a successful online
              presence, driving personal or professional goals.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "Website Development",
      sectionId: "website-development",
    },
    {
      id: 1,
      title: "Why Use the Right Type of Website?",
      subtitle: "Aligning Your Website with Business Goals",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Using the right website type ensures your online presence supports
            your business objectives, whether it’s increasing sales, creating
            brand awareness, or engaging communities. A custom-built website
            tailored to your needs effectively communicates with your audience
            and aligns with your goals.
            <br />
            <br />
            <strong className="text-blue-300">
              Importance of Matching Website Type to Business Goals
            </strong>
            <br />
            <strong className="text-blue-300">
              Efficient Communication:
            </strong>{" "}
            A well-chosen website type meets audience demands, enhancing user
            experience.
            <br />
            <strong className="text-blue-300">Optimization:</strong> Aligning
            your site with desired outcomes increases traffic, conversions, or
            user satisfaction.
            <br />
            <strong className="text-blue-300">
              Cost and Resource Optimization:
            </strong>{" "}
            Focus resources on essential features, avoiding unnecessary
            expenses.
          </p>
          {expandedSections[1] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">
                General Site Types and Description
              </strong>
              <br />
              <strong className="text-blue-300">
                Corporate Websites:
              </strong>{" "}
              Establish business professionalism and showcase services offered.
              <br />
              <strong className="text-blue-300">
                E-commerce Websites:
              </strong>{" "}
              Facilitate online sales with user-friendly shopping experiences.
              <br />
              <strong className="text-blue-300">
                Portfolio Websites:
              </strong>{" "}
              Display creative works for designers, photographers, or artists.
              <br />
              <strong className="text-blue-300">Blog Sites:</strong> Share
              insights, skills, or updates with formatted content.
              <br />
              <strong className="text-blue-300">
                Educational Websites:
              </strong>{" "}
              Provide learning resources, courses, or certifications.
              <br />
              <strong className="text-blue-300">
                Media and News Sites:
              </strong>{" "}
              Offer news, features, and multimedia reporting.
              <br />
              <strong className="text-blue-300">
                Non-Profit Websites:
              </strong>{" "}
              Promote causes and encourage contributions or volunteering.
              <br />
              <strong className="text-blue-300">
                Entertainment Websites:
              </strong>{" "}
              Enable music streaming, video watching, or gaming.
              <br />
              <strong className="text-blue-300">Landing Pages:</strong> Designed
              for specific call-to-actions like subscriptions or purchases.
              <br />
              <strong className="text-blue-300">
                Community & Forum Websites:
              </strong>{" "}
              Support discussions and community building.
              <br />
              <br />
              Choosing the right website type aligns with your mission, supports
              your audience, and sets you up for digital success.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/website-design-software-provide-snugly-template-online-retail-business_31965-514820.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid",
      alt: "Website Types",
      reverse: true,
      sectionId: "website-types",
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
              Jaikvik Technology’s web solutions offer robust security, 24/7
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
              Jaikvik Technology’s web solutions are customized to meet
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
      subtitle: "Empowering Online Sales",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            E-commerce websites are essential platforms for businesses to sell
            products or services online, reaching global audiences. They
            integrate key features to streamline transactions and enhance
            customer experiences.
            <br />
            <br />
            <strong className="text-blue-300">Purpose</strong>
            <br />
            <strong className="text-blue-300">Showcase Offerings:</strong>{" "}
            Display products or services attractively and systematically.
            <br />
            <strong className="text-blue-300">
              Simplify Transactions:
            </strong>{" "}
            Enable easy purchasing processes for customers.
            <br />
            <strong className="text-blue-300">Global Reach:</strong> Cater to
            local and international markets.
            <br />
            <strong className="text-blue-300">Customer Data:</strong> Analyze
            user behavior through analytics to improve marketing strategies.
          </p>
          {expandedSections[4] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Features</strong>
              <br />
              <strong className="text-blue-300">Product Catalogue:</strong>{" "}
              Detailed listings with descriptions, prices, specifications, and
              high-quality images/videos.
              <br />
              <strong className="text-blue-300">Shopping Cart:</strong>{" "}
              User-friendly interface to add, modify, or delete products, with
              cost and tax details.
              <br />
              <strong className="text-blue-300">
                Secure Payment Gateway:
              </strong>{" "}
              Integration with trusted platforms like PayPal and Razorpay,
              compliant with PCI-DSS standards.
              <br />
              <strong className="text-blue-300">User Accounts:</strong> Allow
              customers to create accounts, track order history, and save
              preferences.
              <br />
              <br />
              Jaikvik Technology’s e-commerce solutions include responsive
              designs, SEO optimization, and integrations with tools like
              Mailchimp, driving up to a 30% increase in online sales for our
              clients within six months.
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
      title: "WooCommerce Websites",
      subtitle: "Flexible E-commerce on WordPress",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            WooCommerce, a powerful WordPress plugin, transforms websites into
            fully functional online stores, offering flexibility and control for
            businesses. It’s an ideal solution for small to medium-sized
            enterprises seeking cost-effective e-commerce capabilities.
            <br />
            <br />
            <strong className="text-blue-300">Purpose</strong>
            <br />
            <strong className="text-blue-300">
              Seamless Integration:
            </strong>{" "}
            Adds e-commerce functionality to any WordPress site.
            <br />
            <strong className="text-blue-300">Customization:</strong> Allows
            developers to tailor user experiences through coding.
            <br />
            <strong className="text-blue-300">Cost-Effective:</strong> Provides
            access to premium features without expensive software.
          </p>
          {expandedSections[5] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Features</strong>
              <br />
              <strong className="text-blue-300">Theme Integration:</strong>{" "}
              Supports a wide range of free and premium WordPress themes for a
              unique look.
              <br />
              <strong className="text-blue-300">
                Flexible Customization:
              </strong>{" "}
              Access to source code and plugins for enhanced functionality and
              API support for external integrations.
              <br />
              <strong className="text-blue-300">
                Advanced Store Management:
              </strong>{" "}
              Manage inventory, shipping, and taxes via a centralized dashboard,
              with support for unlimited products and trusted payment gateways
              like PayPal and Stripe.
              <br />
              <br />
              <strong className="text-blue-300">Best Practices</strong>
              <br />
              <strong className="text-blue-300">Regular Updates:</strong> Keep
              WordPress, WooCommerce, and extensions updated to improve
              performance and security.
              <br />
              <strong className="text-blue-300">SSL Certificate:</strong> Ensure
              secure connections with HTTPS for customer trust and SEO benefits.
              <br />
              <strong className="text-blue-300">Speed Optimization:</strong> Use
              image compression and caching plugins with reliable hosting.
              <br />
              <strong className="text-blue-300">
                Mobile-First Design:
              </strong>{" "}
              Ensure responsiveness and test checkout processes on mobile
              devices.
              <br />
              <strong className="text-blue-300">SEO Optimization:</strong>{" "}
              Utilize plugins like Yoast SEO for optimized product pages and
              keyword-rich descriptions.
              <br />
              <strong className="text-blue-300">
                Secure Payment Gateways:
              </strong>{" "}
              Offer trusted payment options for customer convenience and
              security.
              <br />
              <br />
              Jaikvik Technology’s WooCommerce solutions deliver
              mobile-responsive designs and integrations with Google Analytics
              and Facebook Ads, helping clients achieve a 25% boost in
              conversions.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/close-up-man-shopping-with-laptop_23-2149241375.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "WooCommerce Websites",
      reverse: true,
      sectionId: "woocommerce-websites",
    },
    {
      id: 6,
      title: "Corporate Websites",
      subtitle: "Building a Professional Digital Presence",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            The primary aim of a corporate website is to establish an online
            presence for companies. It serves as a central platform to showcase
            a business’s brand, values, services, and achievements while
            building credibility and trust among potential clients and partners.
            <br />
            <br />
            <strong className="text-blue-300">Features</strong>
            <br />
            <strong className="text-blue-300">About Us:</strong> Highlights the
            company’s background, mission, and vision.
            <br />
            <strong className="text-blue-300">Services:</strong> Details the
            products and services offered.
            <br />
            <strong className="text-blue-300">Contact Page:</strong> Provides
            user-friendly contact forms and information.
            <br />
            <strong className="text-blue-300">Testimonials:</strong> Showcases
            customer reviews and success stories.
            <br />
            <strong className="text-blue-300">Branding Elements:</strong>{" "}
            Incorporates logos, colors, and fonts reflecting the firm’s
            identity.
          </p>
          {expandedSections[6] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Best Practices</strong>
              <br />
              <strong className="text-blue-300">
                Clean, Professional Design:
              </strong>{" "}
              A visually appealing and easy-to-navigate layout.
              <br />
              <strong className="text-blue-300">Responsive Design:</strong>{" "}
              Ensures compatibility and performance across all devices with
              optimized images and code for fast loading.
              <br />
              <br />A corporate website is a powerful tool to connect with your
              target audience, enhance your business’s reputation, and achieve
              organizational goals in the digital space. Jaikvik Technology’s
              corporate websites are built with responsive layouts, fast load
              times, and integrations with tools like Salesforce for enhanced
              CRM, helping clients achieve up to a 20% increase in inquiries.
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
            <strong
              className="

text-blue-300"
            >
              Key Features:
            </strong>
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
              Jaikvik Technology’s online portals are built with user-friendly
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
        <div className="max-w-8xl mx-auto">
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
