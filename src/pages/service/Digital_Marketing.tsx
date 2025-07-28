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
  const sections: Section[] = [
    {
      title:
        "Introduction to Digital Marketing: Unlocking the Power of the Online World",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Traditional methods do not work in the digital age. Digital
            marketing promotes businesses, products, or services through online
            mediums, becoming an integral part of businesses on both large and
            small scales. It encompasses strategies like social media marketing,
            search engine optimization (SEO), content creation, and
            pay-per-click (PPC) advertising, leveraging the internet’s vast
            reach to connect brands with consumers in a personalized, measurable
            way.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            A key advantage of digital marketing is real-time performance
            tracking, unlike traditional advertisements where results are hard
            to measure. This allows businesses to adapt strategies for maximum
            impact. It’s also cost-effective, enabling small businesses with
            limited budgets to compete with larger companies. Targeted
            demographics ensure higher returns, making digital marketing
            essential in today’s tech-driven consumer environment for expanding
            brand reach, increasing conversions, and staying competitive.
          </p>
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Digital Marketing Overview",
    },
    {
      title: "Evolution of Digital Marketing: Email to AI",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing began in the 1990s with email campaigns, enabling
            direct customer outreach. By the 2000s, search engines like Google
            popularized SEO and PPC, allowing brands to target audiences
            actively seeking their offerings. The mid-2000s saw social media
            platforms like Facebook and Twitter revolutionize interactive
            brand-customer dynamics.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            In the 2010s, content gained prominence through storytelling on
            platforms like YouTube, while mobile marketing surged with
            smartphone adoption. Today, artificial intelligence, data analytics,
            and automation drive personalized marketing, chatbots, influencer
            partnerships, and voice search optimization, reflecting the dynamic
            nature of digital marketing in sync with technological and consumer
            trends.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Evolution of Digital Marketing",
      reverse: true,
    },
    {
      title: "The Significance of Digital Marketing for Businesses",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing is critical in today’s connected world. Here’s
            why:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Wider Reach:
              </span>{" "}
              Connects businesses globally via social media, email, or search
              engines.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Cost-Effective:
              </span>{" "}
              Offers high ROI with lower costs compared to traditional
              advertising.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Targeted Advertising:
              </span>{" "}
              Reaches specific demographics using tools like Google Ads or
              Facebook Ads.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Measurable Results:
              </span>{" "}
              Provides real-time campaign performance insights.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Increased Engagement:
              </span>{" "}
              Fosters two-way communication through social media and
              personalized content.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Competitive Ground:
              </span>{" "}
              Levels the playing field for small and medium businesses through
              creativity and strategy.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Flexibility with Trends:
              </span>{" "}
              Adapts quickly to market trends and consumer preferences.
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
            Digital marketing advertises products or services through digital
            channels like websites, search engines, social media, email, and
            mobile apps. It combines creativity and data-driven strategies to
            attract, engage, and convert target audiences, forging relationships
            through personalized, measurable, and interactive experiences.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Unlike traditional marketing, which uses offline channels like TV or
            print for mass audiences, digital marketing offers targeted,
            cost-effective campaigns with real-time analytics. It fosters
            two-way communication via comments, reviews, and social media,
            ensuring businesses remain visible in the online spaces where
            customers are active.
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
              Creates valuable content like blogs, videos, and eBooks to attract
              and retain audiences.
            </li>
            <li>
              <span className="font-semibold text-purple-400">SEO:</span>{" "}
              Optimizes websites for higher search engine rankings using
              keywords and technical improvements.
            </li>
            <li>
              <span className="font-semibold text-purple-400">SMM:</span>{" "}
              Engages audiences on platforms like Facebook and Instagram to
              build brand awareness and loyalty.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                PPC Advertising:
              </span>{" "}
              Drives targeted traffic through paid ads on search engines or
              social media.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Email Marketing:
              </span>{" "}
              Nurtures leads with personalized campaigns and newsletters.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Affiliate Marketing:
              </span>{" "}
              Partners with affiliates to promote products for commissions.
            </li>
          </ul>
        </>
      ),
      image:
        "http://img.freepik.com/free-vector/digital-marketing-landing-page_33099-1726.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=350",
      alt: "Components of Digital Marketing",
    },
    {
      title: "LinkedIn Marketing - The Game Card for Digital Marketer",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            LinkedIn, with over 950 million users, is a B2B marketing powerhouse
            for reaching professionals, generating leads, and establishing
            thought leadership. It’s ideal for targeting decision-makers,
            amplifying content, and leveraging tools like LinkedIn Ads and Lead
            Gen Forms.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Tips for success: Optimize your profile to be clear and
            value-driven, post consistently, use targeted LinkedIn Ads, and join
            industry groups for networking and credibility. LinkedIn transforms
            connections into conversions, making it indispensable for digital
            marketers.
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/flat-design-linkedin-mockup_23-2149217511.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=350",
      alt: "LinkedIn Marketing",
      reverse: true,
    },
    {
      title: "The Benefits of Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing offers:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Cost-Effectiveness:
              </span>{" "}
              More affordable than traditional ads, ideal for small businesses.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Global Reach:
              </span>{" "}
              Connects with audiences worldwide without geographic barriers.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Targeted Marketing:
              </span>{" "}
              Focuses on specific demographics for higher conversions.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Measurable Results:
              </span>{" "}
              Tracks performance with real-time analytics.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Better Engagement:
              </span>{" "}
              Builds relationships via social media, email, and chatbots.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Flexibility and Scalability:
              </span>{" "}
              Easily adjusts to changing business needs.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/man-suit-standing-office-with-clipboard-pointing-poster-with-words_1098-17121.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Benefits of Digital Marketing",
    },
    {
      title: "Digital Marketing Trends Today",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Current trends shaping digital marketing:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Personalization:
              </span>{" "}
              Uses AI for dynamic emails, tailored recommendations, and
              customized website content.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Voice Search Optimization:
              </span>{" "}
              Targets conversational long-tail keywords and schema markup for
              local SEO.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Social Commerce:
              </span>{" "}
              Enables in-app purchases via Instagram Shopping, Pinterest, and
              TikTok Shop.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Privacy-Centric Marketing:
              </span>{" "}
              Adopts ethical data practices and first-party data collection for
              GDPR/CCPA compliance.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/creative-monitor-tech_1134-719.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Digital Marketing Trends",
      reverse: true,
    },
    {
      title: "Strategies for Good Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Effective strategies include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Define Your Audience:
              </span>{" "}
              Use market research, buyer personas, and segmentation to
              understand and target customers.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Set Goals and KPIs:
              </span>{" "}
              Define SMART objectives and track metrics like traffic,
              engagement, and ROI.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Content Production:
              </span>{" "}
              Create valuable, SEO-optimized content using a content calendar
              and mixed formats.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Multi-Channel Marketing:
              </span>{" "}
              Use diverse platforms, maintain brand consistency, and analyze
              performance.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-photo/creative-monitor-tech_1134-719.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Digital Marketing Strategies",
    },
    {
      title: "SEO Techniques for Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SEO essentials include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Keyword Research:
              </span>{" "}
              Use tools like Google Keyword Planner to target high-value,
              long-tail keywords.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                On-Page Optimization:
              </span>{" "}
              Optimize titles, meta descriptions, headers, and content with
              keywords.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Off-Page Optimization:
              </span>{" "}
              Build quality backlinks and engage in social media for brand
              mentions.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Mobile-First Indexing:
              </span>{" "}
              Ensure responsive design, fast load times, and simple navigation.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Link Building:
              </span>{" "}
              Use guest blogging, broken link building, and shareable content
              for quality backlinks.
            </li>
            <li>
              <span className="font-semibold text-purple-400">SEO Tools:</span>{" "}
              Leverage Google Analytics, SEMrush, Yoast SEO, and Ahrefs for
              insights.
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
      title: "Social Media Marketing: Successful Strategies",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SMM strategies include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Choose Platforms:
              </span>{" "}
              Select platforms like Instagram or LinkedIn based on audience
              demographics.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Uniform Brand Voice:
              </span>{" "}
              Maintain consistent tone, visuals, and messaging across platforms.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Paid vs. Organic:
              </span>{" "}
              Balance organic posts for loyalty and paid ads for reach and
              targeting.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Trends:</span>{" "}
              Leverage AR filters, live streaming, short-form videos, social
              commerce, and UGC.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/social-media-marketing_773186-810.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "SMM Strategies",
    },
    {
      title: "SEO and SMM: Hitting the Right Balance",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            SEO drives organic traffic, while SMM offers instant engagement.
            Combine them by:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Amplifying Content:
              </span>{" "}
              Share SEO-optimized content on social platforms for visibility.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Keyword Ideas:
              </span>{" "}
              Use social media trends to inform SEO content strategies.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Prioritization:
              </span>{" "}
              Focus on SEO for long-term presence or SMM for immediate
              visibility based on goals.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Metrics:</span>{" "}
              Track SEO (traffic, rankings) and SMM (engagement, conversions)
              for success.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/social-media-marketing_773186-810.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "SEO vs. SMM",
      reverse: true,
    },
    {
      title: "The Role of Data and Analytics in Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Data drives digital marketing with:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Data-Driven Decisions:
              </span>{" "}
              Analyze audience behavior, optimize campaigns, and predict trends.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Tools:</span> Use
              Google Analytics, SEMrush, HubSpot, and social media analytics
              platforms.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Key Metrics:
              </span>{" "}
              Track traffic, engagement, conversions, and ROI for campaign
              success.
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
                Heightened Competition:
              </span>{" "}
              Saturated digital spaces require high-quality, niche content.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Ad Fatigue:</span>{" "}
              Combat declining engagement with fresh, personalized creatives.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Data Privacy:
              </span>{" "}
              Comply with GDPR/CCPA using ethical data practices and first-party
              data.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Algorithm Changes:
              </span>{" "}
              Adapt to platform updates with flexible strategies and evergreen
              content.
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
      title: "Digital Marketing's Future: Adaptation to Innovation",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Future trends include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">AR/VR:</span>{" "}
              Creates immersive experiences like virtual product try-ons and
              events.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Blockchain:</span>{" "}
              Enhances ad transparency, prevents fraud, and improves data
              privacy.
            </li>
            <li>
              <span className="font-semibold text-purple-400">AI/ML:</span>{" "}
              Powers personalized campaigns, chatbots, and predictive analytics.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Voice Search:
              </span>{" "}
              Optimizes for conversational queries and local SEO.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Sustainability:
              </span>{" "}
              Aligns with consumer demand for ethical, eco-friendly practices.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/free-vector/marketing-conversion-flat-background_23-2148002911.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Future Trends",
    },
    {
      title: "Actionable Tips for Beginners in Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Start with:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Minimal Resources:
              </span>{" "}
              Set clear objectives, use free social media platforms, and
              experiment with small projects.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Free Tools:</span>{" "}
              Leverage Canva, Grammarly, Buffer, Google Analytics, Mailchimp,
              and WordPress.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Learning Resources:
              </span>{" "}
              Explore Google Digital Garage, HubSpot Academy, Coursera, and
              SEMrush Academy.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Learning Routine:
              </span>{" "}
              Dedicate weekly hours, apply knowledge, join communities, and
              follow industry blogs.
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
      title: "Conclusion: Open to Future Digital Marketing",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital marketing offers endless opportunities for growth in a
            dynamic, tech-driven world. Stay updated with trends like AR/VR,
            blockchain, and AI, and leverage free tools and continuous learning
            to succeed. Experimentation and innovation are key to transforming
            your business.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Share your thoughts, ask questions, or connect with us to explore
            more about digital marketing!
          </p>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/digital-marketing-illustration_112255-2905.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "Conclusion",
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Common questions about digital marketing:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                What is digital marketing?
              </span>{" "}
              Uses digital channels like search engines, social media, and email
              to promote products or services.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Why is it important?
              </span>{" "}
              Offers global reach, targeted ads, measurable results,
              cost-efficiency, and enhanced brand visibility.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Which industries benefit most?
              </span>{" "}
              E-commerce, healthcare, education, travel, real estate, and
              technology.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Required skills?
              </span>{" "}
              SEO, analytics, copywriting, social media, email marketing, and
              adaptability.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Career benefits?
              </span>{" "}
              Enhances skills, supports entrepreneurship, and offers networking
              opportunities.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Future trends?
              </span>{" "}
              AI, voice search, video marketing, influencer marketing, and
              sustainable practices.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                How to start learning?
              </span>{" "}
              Use online courses, certifications, practical projects, and stay
              updated with blogs.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                How to measure ROI?
              </span>{" "}
              Track conversion rates, cost-per-lead, customer lifetime value,
              and revenue vs. ad spend.
            </li>
          </ul>
        </>
      ),
      image:
        "https://img.freepik.com/premium-vector/digital-marketing-illustration_112255-2905.jpg?uid=R186472209&ga=GA1.2.455755710.1724d8954285&semt=350",
      alt: "FAQ",
      reverse: true,
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
        <div className="max-w-8xl mx-auto px-6 py-16" id="smm-overview">
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
      </div>
    </ErrorBoundary>
  );
};

export default DigitalMarketing;
