import { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Section {
  id: number;
  title: string;
  content: React.ReactNode; // Changed from JSX.Element to React.ReactNode
  image: string;
  alt: string;
  reverse?: boolean;
  sectionId: string;
}

interface SectionRef {
  ref: (node?: Element | null) => void;
  inView: boolean;
}

const SocialMediaMarketing = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >(
    Array.from({ length: 17 }).reduce<Record<number, boolean>>(
      (acc, _, index) => ({ ...acc, [index]: false }),
      {}
    )
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

  const sections: Section[] = [
    {
      id: 0,
      title: "Social Media Marketing: Connecting Brands with Audiences",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              Social Media Marketing (SMM)
            </span>{" "}
            involves using social media networks strategically to promote a{" "}
            <span className="font-bold text-red-400">
              brand, product, or service
            </span>
            . Activities include producing and sharing marketing content,
            running targeted advertisements, and interacting directly with
            audiences to achieve business objectives.
          </p>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Social media elevates digital marketing through{" "}
            <span className="font-bold text-red-400">
              real-time communication
            </span>
            , fostering{" "}
            <span className="font-bold text-red-400">brand loyalty</span> and
            delivering measurable outcomes. It complements strategies like{" "}
            <span className="font-bold text-red-400">
              SEO, email marketing, and content marketing
            </span>
            , providing direct access to audiences where they spend much of
            their time online.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                SMM leverages platforms like{" "}
                <span className="font-bold text-red-400">
                  Facebook, Instagram, LinkedIn, and Twitter
                </span>{" "}
                to create meaningful connections. By combining creativity with
                analytics, businesses can craft campaigns that resonate deeply.
                At{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>
                , we specialize in tailored SMM strategies that align with your
                business goals for maximum impact and measurable results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Marketing Introduction",
      sectionId: "smm-introduction",
    },
    {
      id: 1,
      title: "SMM Importance in the Digital Age",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            In today's digital era, social media platforms like{" "}
            <span className="font-bold text-red-400">
              Facebook, Instagram, LinkedIn, and Twitter
            </span>{" "}
            offer millions to billions of opportunities for businesses to
            connect with their audience.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Increase Brand Awareness:
              </span>{" "}
              Social media channels enable brands to reach diverse global
              audiences effortlessly.
            </li>
            <li>
              <span className="font-bold text-red-400">Boost Engagement:</span>{" "}
              Businesses can foster connections through likes, comments, and
              shares, creating interactive experiences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Customer Relationship Insights:
              </span>{" "}
              Analytical tools provide deep insights into audience behavior and
              preferences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                More Traffic and Higher Conversion Rates:
              </span>{" "}
              Compelling posts and ads drive users to websites or e-commerce
              platforms.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Drive Brand Loyalty:
              </span>{" "}
              Consistent engagement builds trust and long-term relationships.
            </li>
          </ul>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Social media's pivotal role offers businesses unparalleled
                opportunities to connect globally. By leveraging targeted
                campaigns and real-time analytics, brands can optimize for
                measurable growth.{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology's SMM solutions
                </span>{" "}
                help you stay competitive in a digital-first world.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2b6e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "SMM Importance",
      reverse: true,
      sectionId: "smm-importance",
    },
    {
      id: 2,
      title: "Overview of Social Media Platforms",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Each social media platform serves a unique audience, making it
            essential to understand their distinct features:
          </p>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Facebook
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span> From young
                teenagers to seniors.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Business pages,
                groups, live videos, marketplace, and targeted ads.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold"> Disord: Use Cases:</span> Brand
                storytelling, community building, and lead generation.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Instagram
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span>{" "}
                Image-centric Millennials and Gen Z.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Stories, Reels,
                IGTV, and shopping options.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Visual
                storytelling, influencer marketing, product showcasing.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                LinkedIn
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span>{" "}
                Professionals and B2B businesses.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Company pages, job
                applications, professional networking, thought leadership
                content.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Employer branding,
                lead generation, industry insights.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Twitter
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span> News-savvy,
                tech enthusiasts, and trend followers.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Real-time updates,
                hashtags, polls, and concise messaging.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Customer service,
                brand voice establishment, crisis communication.
              </p>
            </div>
          </div>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Understanding each platform's strengths allows businesses to
                tailor strategies effectively. For example,{" "}
                <span className="font-bold text-red-400">
                  Instagram's visual focus
                </span>{" "}
                suits lifestyle brands, while{" "}
                <span className="font-bold text-red-400">
                  LinkedIn's professional network
                </span>{" "}
                is ideal for B2B companies.{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                optimizes platform selection to maximize reach and engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1516321315098-34e857adf62b?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Platforms",
      sectionId: "smm-platforms",
    },
    {
      id: 3,
      title: "Social Media Marketing Strategy Development",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Developing an effective{" "}
            <span className="font-bold text-red-400">SMM strategy</span>{" "}
            requires meticulous planning and execution.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Set Clear Objectives:
              </span>{" "}
              Define goals like brand awareness, lead generation, or sales.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Know Your Audience:
              </span>{" "}
              Research demographics, interests, and online behavior.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Choose the Right Platforms:
              </span>{" "}
              Focus on platforms where your audience is active.
            </li>
            <li>
              <span className="font-bold text-red-400">Content Planning:</span>{" "}
              Create a diverse content calendar.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Engagement Strategy:
              </span>{" "}
              Plan audience interactions.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                A well-crafted SMM strategy aligns with your marketing goals and
                leverages platform features. At{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>
                , we develop customized strategies that reflect your brand voice
                and deliver measurable results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "SMM Strategy Development",
      reverse: true,
      sectionId: "smm-strategy",
    },
    {
      id: 4,
      title: "Content Creation for Social Media",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Engaging content is the cornerstone of successful{" "}
            <span className="font-bold text-red-400">
              social media marketing
            </span>
            .
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Visual Content:</span>{" "}
              High-quality images, videos, and infographics perform best.
            </li>
            <li>
              <span className="font-bold text-red-400">Storytelling:</span>{" "}
              Create narratives that resonate with your audience.
            </li>
            <li>
              <span className="font-bold text-red-400">Consistency:</span>{" "}
              Maintain a regular posting schedule.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Platform Optimization:
              </span>{" "}
              Tailor content for each platform's unique format.
            </li>
          </ul>
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                At{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>
                , we specialize in creating platform-specific content that
                drives engagement and conversions. Our team develops content
                strategies that align with your brand identity and business
                objectives.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Content Creation",
      sectionId: "smm-content",
    },
    {
      id: 5,
      title: "Social Media Advertising Strategies",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Effective{" "}
            <span className="font-bold text-red-400">
              social media advertising
            </span>{" "}
            requires strategic planning and execution across different
            platforms.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Targeted Campaigns:
              </span>{" "}
              Reach specific demographics with precision.
            </li>
            <li>
              <span className="font-bold text-red-400">Retargeting:</span>{" "}
              Re-engage visitors who didn't convert.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Lookalike Audiences:
              </span>{" "}
              Expand reach to similar users.
            </li>
            <li>
              <span className="font-bold text-red-400">A/B Testing:</span>{" "}
              Optimize ad performance through testing.
            </li>
          </ul>
          {expandedSections[5] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                creates data-driven ad campaigns that maximize ROI. We analyze
                performance metrics to continuously refine targeting and
                messaging for optimal results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Advertising",
      reverse: true,
      sectionId: "smm-advertising",
    },
    {
      id: 6,
      title: "Influencer Marketing on Social Media",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Influencer marketing</span>{" "}
            leverages the power of trusted voices to amplify your brand message.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Micro-Influencers:</span>{" "}
              Higher engagement with niche audiences.
            </li>
            <li>
              <span className="font-bold text-red-400">Brand Alignment:</span>{" "}
              Choosing influencers that match your values.
            </li>
            <li>
              <span className="font-bold text-red-400">Campaign Tracking:</span>{" "}
              Measuring impact and ROI.
            </li>
            <li>
              <span className="font-bold text-red-400">Authentic Content:</span>{" "}
              Maintaining brand voice in collaborations.
            </li>
          </ul>
          {expandedSections[6] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Our team at{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                has established relationships with influencers across
                industries. We develop strategic partnerships that drive
                authentic engagement and measurable conversions.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Influencer Marketing",
      sectionId: "smm-influencer",
    },
    {
      id: 7,
      title: "Social Media Analytics and Reporting",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              Data-driven decisions
            </span>{" "}
            are key to successful social media marketing.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Performance Metrics:
              </span>{" "}
              Track engagement, reach, and conversions.
            </li>
            <li>
              <span className="font-bold text-red-400">Audience Insights:</span>{" "}
              Understand demographics and behavior.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Competitor Analysis:
              </span>{" "}
              Benchmark against industry standards.
            </li>
            <li>
              <span className="font-bold text-red-400">ROI Measurement:</span>{" "}
              Prove the value of your social efforts.
            </li>
          </ul>
          {expandedSections[7] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                provides comprehensive analytics dashboards and regular
                performance reports. We transform raw data into actionable
                insights that drive continuous improvement in your social media
                strategy.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Analytics",
      reverse: true,
      sectionId: "smm-analytics",
    },
    {
      id: 8,
      title: "Community Management Strategies",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Building and nurturing an{" "}
            <span className="font-bold text-red-400">engaged community</span> is
            essential for long-term social media success.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Timely Responses:</span>{" "}
              Maintain active engagement with followers.
            </li>
            <li>
              <span className="font-bold text-red-400">
                User-Generated Content:
              </span>{" "}
              Encourage and showcase customer contributions.
            </li>
            <li>
              <span className="font-bold text-red-400">Crisis Management:</span>{" "}
              Handle negative feedback professionally.
            </li>
            <li>
              <span className="font-bold text-red-400">Brand Advocacy:</span>{" "}
              Develop loyal followers who promote your brand.
            </li>
          </ul>
          {expandedSections[8] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Our community managers at{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                specialize in fostering meaningful connections between brands
                and their audiences. We develop authentic engagement strategies
                that build trust and loyalty over time.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2b6e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Community Management",
      sectionId: "smm-community",
    },
    {
      id: 9,
      title: "Social Media for E-commerce",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Social commerce</span>{" "}
            transforms platforms into powerful sales channels.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Shoppable Posts:</span>{" "}
              Direct product links in social content.
            </li>
            <li>
              <span className="font-bold text-red-400">Live Shopping:</span>{" "}
              Real-time product demonstrations.
            </li>
            <li>
              <span className="font-bold text-red-400">Social Proof:</span>{" "}
              Leverage reviews and testimonials.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Platform Integration:
              </span>{" "}
              Connect social with your e-commerce system.
            </li>
          </ul>
          {expandedSections[9] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                develops comprehensive social commerce strategies that bridge
                the gap between discovery and purchase. We optimize every
                touchpoint to maximize conversions and customer lifetime value.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Commerce",
      reverse: true,
      sectionId: "smm-ecommerce",
    },
    {
      id: 10,
      title: "Video Content Strategy",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Video content</span>{" "}
            dominates social media engagement and should be central to your
            strategy.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Short-form Video:</span>{" "}
              Optimized for platforms like TikTok and Reels.
            </li>
            <li>
              <span className="font-bold text-red-400">Live Streaming:</span>{" "}
              Real-time engagement with your audience.
            </li>
            <li>
              <span className="font-bold text-red-400">Storytelling:</span>{" "}
              Create emotional connections through narrative.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Platform Optimization:
              </span>{" "}
              Tailor content for each network's specifications.
            </li>
          </ul>
          {expandedSections[10] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Our video production team at{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                creates compelling visual content designed specifically for
                social media consumption. From concept to distribution, we
                ensure your videos capture attention and drive meaningful
                engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1574717024453-3545e7cc5e7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Video Content Strategy",
      sectionId: "smm-video",
    },
    {
      id: 11,
      title: "Social Media Trends and Innovations",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Staying ahead of{" "}
            <span className="font-bold text-red-400">emerging trends</span>{" "}
            keeps your social strategy relevant and effective.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Augmented Reality:</span>{" "}
              Interactive filters and try-on experiences.
            </li>
            <li>
              <span className="font-bold text-red-400">Audio Content:</span>{" "}
              Podcasts, Spaces, and voice features.
            </li>
            <li>
              <span className="font-bold text-red-400">AI Integration:</span>{" "}
              Chatbots and personalized content recommendations.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Privacy-First Strategies:
              </span>{" "}
              Adapting to changing data regulations.
            </li>
          </ul>
          {expandedSections[11] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                continuously monitors the social media landscape to identify
                emerging opportunities. We help clients implement innovative
                approaches while maintaining alignment with core business
                objectives.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1516321315098-34e857adf62b?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Trends",
      reverse: true,
      sectionId: "smm-trends",
    },
    {
      id: 12,
      title: "Social Media for B2B Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              B2B social media marketing
            </span>{" "}
            requires specialized approaches to reach professional audiences.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Thought Leadership:
              </span>{" "}
              Establishing industry authority.
            </li>
            <li>
              <span className="font-bold text-red-400">
                LinkedIn Strategies:
              </span>{" "}
              Optimizing for the professional network.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Account-Based Marketing:
              </span>{" "}
              Targeting key decision-makers.
            </li>
            <li>
              <span className="font-bold text-red-400">Lead Nurturing:</span>{" "}
              Moving prospects through the sales funnel.
            </li>
          </ul>
          {expandedSections[12] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Our B2B specialists at{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                understand the unique challenges of professional social
                marketing. We develop content strategies that resonate with
                business audiences and generate qualified leads.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "B2B Social Media",
      sectionId: "smm-b2b",
    },
    {
      id: 13,
      title: "Social Media Challenges",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Managing social media{" "}
            <span className="font-bold text-red-400">challenges</span> requires
            preparation and rapid response protocols.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Monitoring Tools:</span>{" "}
              Early detection of potential issues.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Response Protocols:
              </span>{" "}
              Clear escalation paths and messaging.
            </li>
            <li>
              <span className="font-bold text-red-400">Brand Protection:</span>{" "}
              Safeguarding reputation during challenges.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Post-Crisis Analysis:
              </span>{" "}
              Learning and improving from incidents.
            </li>
          </ul>
          {expandedSections[13] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                helps clients develop comprehensive crisis management plans.
                From prevention to resolution, we ensure brands maintain control
                of their narrative during challenging situations.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Crisis Management",
      reverse: true,
      sectionId: "smm-crisis",
    },
    {
      id: 14,
      title: "Employee Engagement Strategies",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">Employee engagement</span>{" "}
            strategies amplify your reach through authentic staff participation.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Program Development:
              </span>{" "}
              Structured frameworks for participation.
            </li>
            <li>
              <span className="font-bold text-red-400">Content Libraries:</span>{" "}
              Easy-to-share branded materials.
            </li>
            <li>
              <span className="font-bold text-red-400">Training:</span>{" "}
              Educating employees on best practices.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Performance Tracking:
              </span>{" "}
              Measuring impact and participation.
            </li>
          </ul>
          {expandedSections[14] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                We at{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                build turnkey employee advocacy programs that mobilize your
                workforce as brand ambassadors. Our approach increases organic
                reach while maintaining authenticity.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2b6e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=750&q=80",
      alt: "Employee Engagement Strategies",
      sectionId: "employee-engagement-strategies",
    },
    {
      id: 15,
      title: "Social Media Strategy Development",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            A comprehensive{" "}
            <span className="font-bold text-red-400">
              social media strategy
            </span>{" "}
            protects your brand and guides employee participation.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Brand Guidelines:</span>{" "}
              Consistent voice and messaging.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Compliance Standards:
              </span>{" "}
              Meeting legal and regulatory requirements.
            </li>
            <li>
              <span className="font-bold text-red-400">Crisis Protocols:</span>{" "}
              Defined response procedures.
            </li>
            <li>
              <span className="font-bold text-red-400">Employee Training:</span>{" "}
              Ensuring proper implementation.
            </li>
          </ul>
          {expandedSections[15] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaikvik Technology
                </span>{" "}
                develops customized social media strategies that balance brand
                protection with engagement opportunities.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Social Media Strategy Development",
      reverse: true,
      sectionId: "social-media-strategy",
    },
    {
      id: 16,
      title: "The Power of Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              Social Media Marketing
            </span>{" "}
            has transformed digital marketing, becoming essential for connecting
            businesses with audiences, building trust, and driving growth in a
            competitive digital landscape.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Significance of SMM
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Wider Reach:</span>{" "}
              Amplifies brand awareness across global audiences.
            </li>
            <li>
              <span className="font-bold text-red-400">Direct Engagement:</span>{" "}
              Fosters trust and stronger customer relationships.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Cost-Effective Paid Ads:
              </span>{" "}
              Offers high ROI through targeted advertising.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Real-Time Feedback:
              </span>{" "}
              Enables instant insights for strategy adjustments.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Call to Action
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Explore:</span> Start on
              platforms where your audience is active.
            </li>
            <li>
              <span className="font-bold text-red-400">Refine Campaigns:</span>{" "}
              Optimize using performance data and trends.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Maintain Consistency:
              </span>{" "}
              Build trust with regular posting and branding.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Partner with Experts:
              </span>{" "}
              Collaborate with agencies for maximum impact.
            </li>
          </ul>
          {expandedSections[16] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Social media marketing is a transformative tool for modern
                businesses.{" "}
                <span className="font-bold text-red-400">
                  Jaikvik Technology's expertise
                </span>{" "}
                ensures your SMM strategy delivers campaigns that enhance
                visibility, engagement, and measurable growth.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1516321315098-34e857adf62b?ixlib=rb-4.0.3&auto=format",
      alt: "Social Media Marketing Power",
      sectionId: "smm-conclusion",
    },
  ];

  const sectionRefs: SectionRef[] = sections.map(() => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    return { ref, inView };
  });

  return (
    <div className="font-sans text-gray-200 bg-black min-h-screen relative overflow-hidden">
      <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-red-900 rounded-lg opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-red-800 rounded-lg opacity-10 blur-3xl"></div>
      </motion.div>

      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="SMM Hero"
        id="smm-hero"
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
            Social Media Marketing: Strategies for Success
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover how Social Media Marketing can transform your brand's
            online presence with{" "}
            <span className="font-bold">Jaikvik Technology</span>.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("smm-overview")}
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            aria-label="Explore SMM Strategies"
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
        id="smm-overview"
      >
        <div className="max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              ref={sectionRefs[index].ref}
              id={section.sectionId}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300`}
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
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center text-red-400 font-bold text-lg mt-6 transition-colors duration-300 hover:text-red-300"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[section.id] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-3 transition-transform duration-300 ${
                      expandedSections[section.id] ? "rotate-90" : ""
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
            Ready to Elevate Your Brand with SMM?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-medium text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our SMM strategies can boost your brand's{" "}
            <span className="font-bold">
              visibility, engagement, and growth
            </span>
            .
          </motion.p>
          <motion.button
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            aria-label="Get Started with SMM"
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 0.3]),
          }}
        />
      </motion.div>
    </div>
  );
};

export default SocialMediaMarketing;
