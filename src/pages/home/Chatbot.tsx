import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Define interfaces for type safety
interface Message {
  sender: "user" | "bot";
  message: string;
  category: string;
  intent: string;
  timestamp: string;
}

interface AIResponse {
  keywords?: string[];
  priority: number;
  responses: string[];
  followUp: string;
  followUpThreshold: number;
  intent: string;
  reachMessages?: { [key: string]: string };
}

interface ConversationPattern {
  name: string;
  steps: { type: "user" | "bot"; intent: string }[];
  response: string;
}

interface ServiceGroup {
  group: string;
  options: string[];
}

interface AnalyticsData {
  event: string;
  timestamp: string;
  conversationLength: number;
  [key: string]: any;
}

interface Data {
  inactivityMessages: string[];
  aiResponses: { [key: string]: AIResponse };
  conversationPatterns: ConversationPattern[];
  services: ServiceGroup[];
}

// Static data remains unchanged
const data: Data = {
  inactivityMessages: [
    "Need help with our services?",
    "Any questions about Jaikvik Technology's offerings?",
    "How can I assist you today?",
    "Curious about our software or digital marketing solutions?",
    "Interested in our corporate films or mobile apps?",
    "Got a project in mind? Let's discuss!",
  ],
  aiResponses: {
    greeting: {
      keywords: [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
      ],
      priority: 1,
      responses: [
        "Hello! Welcome to Jaikvik Technology. How can I assist you today?",
        "Hey there! Excited to help with your tech needs!",
        "Hi! Ready to explore our innovative solutions?",
        "Greetings! How can I help you with Jaikvik Technology's services today?",
        "Hello! What brings you to Jaikvik Technology today?",
      ],
      followUp:
        "Interested in software development, mobile apps, or digital marketing?",
      followUpThreshold: 0.3,
      intent: "casual",
    },
    help: {
      keywords: [
        "help",
        "support",
        "issue",
        "problem",
        "maintenance & support",
        "trouble",
        "error",
        "bug",
        "fix",
        "assistance",
      ],
      priority: 2,
      responses: [
        "I'm here to help! Please describe your issue or question.",
        "Need support? Tell me more about what's going on.",
        "Let's solve that! What's the problem you're facing?",
        "I can help with that. Could you provide more details?",
        "Support is my specialty. What do you need help with?",
      ],
      followUp: "Can you provide more details so I can assist better?",
      followUpThreshold: 0.5,
      intent: "support",
    },
    contact: {
      keywords: [
        "contact",
        "phone",
        "email",
        "address",
        "reach",
        "get in touch",
        "call",
        "message",
        "connect",
        "speak to",
        "talk to",
      ],
      priority: 3,
      responses: [
        'For quick assistance, message us on <a href="https://wa.me/+919220826934" target="_blank">WhatsApp (+919220826934)</a> or email <a href="mailto:info@jaikviktechnology.com">info@jaikviktechnology.com</a>. You can also call <a href="tel:+919310907227">+91-9310907227</a>. Visit us at A-82, Sector 63, Noida, UP.',
        'Reach us at <a href="mailto:info@jaikviktechnology.com">info@jaikviktechnology.com</a> or <a href="tel:+919220826934">+91-9220826934</a>. Our office is at A-82, Sector 63, Noida, UP.',
        'Contact us via <a href="https://wa.me/+919220826934" target="_blank">WhatsApp (+919220826934)</a> or call <a href="tel:+911204200970">+91-120-4200970</a>. We\'re here to help!',
        'You can reach our team directly at <a href="tel:+919310907227">+91-9310907227</a> or visit our office at A-82, Sector 63, Noida, UP.',
        'For immediate assistance, please call <a href="tel:+919220826934">+91-9220826934</a> or email <a href="mailto:info@jaikviktechnology.com">info@jaikviktechnology.com</a>',
      ],
      followUp:
        "Would you like to open our contact form for a detailed inquiry?",
      followUpThreshold: 0.4,
      intent: "contact",
    },
    services: {
      keywords: [
        "customised software development",
        "erp systems",
        "crm solutions",
        "hrm systems",
        "custom web development",
        "api integration",
        "mobile application development",
        "ios & android apps",
        "ui/ux design",
        "app optimization",
        "cross-platform development",
        "search engine optimization",
        "content marketing",
        "social media campaigns",
        "ppc advertising",
        "analytics & reporting",
        "promotional videos",
        "corporate films",
        "product demos",
        "animation & motion graphics",
        "event coverage",
        "services",
        "offerings",
        "what do you offer",
        "products",
        "solutions",
        "capabilities",
        "expertise",
      ],
      priority: 2,
      responses: [
        "Our [SERVICE] solutions are designed to elevate your business. Want to learn how?",
        "We specialize in [SERVICE]. Interested in a tailored solution?",
        "Jaikvik Technology's [SERVICE] can transform your operations. Let's discuss!",
        "With our [SERVICE], we help businesses achieve their goals. Would you like details?",
        "[SERVICE] is one of our core strengths. How can we assist you with this?",
      ],
      followUp:
        "Ready to discuss [SERVICE]? Open our contact form or reach out directly!",
      followUpThreshold: 0.5,
      intent: "informational",
      reachMessages: {
        "customised software development":
          "For Customised Software Development, reach our experts via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit us at A-82, Sector 63, Noida, UP.",
        "erp systems":
          "Interested in ERP Systems? Contact us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit our office at A-82, Sector 63, Noida, UP.",
        "crm solutions":
          "For CRM Solutions, get in touch via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or stop by A-82, Sector 63, Noida, UP.",
        "hrm systems":
          "Explore HRM Systems with us! Reach out on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "custom web development":
          "For Custom Web Development, contact our team via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "api integration":
          "Need API Integration? Reach us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "mobile application development":
          "For Mobile Application Development, connect via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "ios & android apps":
          "Interested in iOS & Android Apps? Contact us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "ui/ux design":
          "For UI/UX Design, reach out via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "app optimization":
          "Explore App Optimization with us! Contact <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "cross-platform development":
          "For Cross-Platform Development, reach us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "maintenance & support":
          "Need Maintenance & Support? Contact us via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "search engine optimization":
          "For Search Engine Optimization, reach our experts via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "content marketing":
          "Interested in Content Marketing? Contact us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "social media campaigns":
          "For Social Media Campaigns, get in touch via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or stop by A-82, Sector 63, Noida, UP.",
        "ppc advertising":
          "Explore PPC Advertising with us! Reach out on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "analytics & reporting":
          "For Analytics & Reporting, contact our team via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "promotional videos":
          "For Promotional Videos, reach us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "corporate films":
          "Interested in Corporate Films? Contact us via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "product demos":
          "For Product Demos, reach out via <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
        "animation & motion graphics":
          "Explore Animation & Motion Graphics with us! Contact <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a>, email <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>, or call <a href='tel:+919310907227'>+91-9310907227</a>. Visit A-82, Sector 63, Noida, UP.",
        "event coverage":
          "For Event Coverage, reach us on <a href='https://wa.me/+919220826934' target='_blank'>WhatsApp (+919220826934)</a> or <a href='mailto:info@jaikviktechnology.com'>info@jaikviktechnology.com</a>. Call <a href='tel:+919310907227'>+91-9310907227</a> or visit A-82, Sector 63, Noida, UP.",
      },
    },
    about: {
      keywords: [
        "who are you",
        "about",
        "company",
        "jaikvik",
        "about us",
        "what is jaikvik",
        "tell me about",
        "background",
        "history",
      ],
      priority: 2,
      responses: [
        "Jaikvik Technology Pvt Ltd is a Noida-based leader in software, mobile apps, digital marketing, and corporate film production.",
        "We're Jaikvik Technology, delivering innovative solutions from A-82, Sector 63, Noida, UP.",
        "Jaikvik Technology transforms businesses with cutting-edge tech and creative services.",
        "We are Jaikvik Technology - experts in software development, digital marketing, and media production since 2011.",
        "Jaikvik Technology is your technology partner offering end-to-end digital solutions for businesses.",
      ],
      followUp: "Want to know more about our services or contact us?",
      followUpThreshold: 0.5,
      intent: "informational",
    },
    pricing: {
      keywords: [
        "price",
        "cost",
        "how much",
        "quote",
        "budget",
        "affordable",
        "expensive",
        "pricing",
        "rates",
      ],
      priority: 2,
      responses: [
        "Our pricing varies based on project requirements. Could you share more details about your needs?",
        "We offer competitive pricing tailored to each project. Let's discuss your specific requirements.",
        "Cost depends on the scope and complexity. Would you like a customized quote?",
        "We provide value-based pricing for all our services. What exactly are you looking for?",
        "Our solutions are competitively priced. Tell me more about your project for an accurate estimate.",
      ],
      followUp: "Would you like to discuss pricing for a specific service?",
      followUpThreshold: 0.6,
      intent: "commercial",
    },
    thanks: {
      keywords: ["thank", "thanks", "appreciate", "grateful", "helpful"],
      priority: 1,
      responses: [
        "You're welcome! Is there anything else I can help with?",
        "Happy to help! Let me know if you have other questions.",
        "My pleasure! Feel free to ask if you need more information.",
        "Glad I could assist! What else can I do for you today?",
        "You're very welcome! Don't hesitate to reach out for anything else.",
      ],
      followUp: "Would you like information about any other services?",
      followUpThreshold: 0.4,
      intent: "gratitude",
    },
    goodbye: {
      keywords: ["bye", "goodbye", "see you", "later", "farewell"],
      priority: 1,
      responses: [
        "Goodbye! Feel free to come back if you have more questions.",
        "See you later! We're always here to help.",
        "Have a great day! Don't hesitate to reach out again.",
        "Bye for now! Remember we're just a message away.",
        "Take care! Contact us anytime for assistance.",
      ],
      followUp: "",
      followUpThreshold: 0,
      intent: "farewell",
    },
    default: {
      priority: 0,
      responses: [
        "I'm not sure I understood that. Could you clarify?",
        "Hmm, let's try again. What do you mean?",
        "Could you rephrase? I'm here to help!",
        "I want to make sure I understand. Could you explain differently?",
        "Let me check - did you mean something about our services?",
      ],
      followUp: "Anything else I can assist with?",
      followUpThreshold: 0.6,
      intent: "unknown",
    },
  },
  conversationPatterns: [
    {
      name: "service inquiry",
      steps: [
        { type: "user", intent: "services" },
        { type: "bot", intent: "informational" },
        { type: "user", intent: "commercial" },
        { type: "bot", intent: "commercial" },
      ],
      response:
        "Would you like me to connect you with a specialist for a detailed consultation?",
    },
    {
      name: "support request",
      steps: [
        { type: "user", intent: "help" },
        { type: "bot", intent: "support" },
        { type: "user", intent: "support" },
      ],
      response:
        "I can escalate this to our support team. Would you like me to do that?",
    },
    {
      name: "contact information",
      steps: [
        { type: "user", intent: "contact" },
        { type: "bot", intent: "contact" },
        { type: "user", intent: "contact" },
      ],
      response: "Would you like me to open the contact form for you?",
    },
  ],
  services: [
    {
      group: "Software Development",
      options: [
        "Customised Software Development",
        "ERP Systems",
        "CRM Solutions",
        "HRM Systems",
      ],
    },
    {
      group: "Web Development",
      options: ["Custom Web Development", "API Integration"],
    },
    {
      group: "Mobile Application Development",
      options: [
        "Mobile Application Development",
        "iOS & Android Apps",
        "UI/UX Design",
        "App Optimization",
        "Cross-Platform Development",
        "Maintenance & Support",
      ],
    },
    {
      group: "SEO & Digital Marketing",
      options: [
        "Search Engine Optimization",
        "Content Marketing",
        "Social Media Campaigns",
        "PPC Advertising",
        "Analytics & Reporting",
      ],
    },
    {
      group: "Corporate Film Production",
      options: [
        "Promotional Videos",
        "Corporate Films",
        "Product Demos",
        "Animation & Motion Graphics",
        "Event Coverage",
      ],
    },
  ],
};

const Chatbot: React.FC = () => {
  // Initialize chatbot as closed and toggle icon as visible on page load
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isToggleVisible, setIsToggleVisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      message:
        "Welcome to Jaikvik Technology! How can I assist you today? Select a service or type a message below.",
      category: "greeting",
      intent: "casual",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCareerOpen, setIsCareerOpen] = useState<boolean>(false);
  const [formFeedback, setFormFeedback] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [conversationContext, setConversationContext] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    AnalyticsData[]
  >([]);

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messageIndexRef = useRef<number>(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Summarize conversation history for analytics
  const summarizeConversationHistory = useCallback(() => {
    const summary = conversationHistory.reduce((acc, data) => {
      acc[data.event] = (acc[data.event] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return summary;
  }, [conversationHistory]);

  // Sanitize HTML with a library (e.g., DOMPurify) or custom logic
  const sanitizeHTML = useCallback((str: string): string => {
    const allowedTags = ["a", "b", "i", "strong", "em"];
    const allowedAttributes: { [key: string]: string[] } = {
      a: ["href", "target"],
    };
    const div = document.createElement("div");
    div.innerHTML = str;
    const sanitizeNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as Element).tagName.toLowerCase();
        if (!allowedTags.includes(tag)) {
          if ("replaceWith" in node) {
            (node as ChildNode).replaceWith(...node.childNodes);
          } else {
            const parent = node.parentNode;
            if (parent) {
              while (node.firstChild) {
                parent.insertBefore(node.firstChild, node);
              }
              parent.removeChild(node);
            }
          }
          return;
        }
        Array.from((node as Element).attributes).forEach((attr) => {
          if (!allowedAttributes[tag]?.includes(attr.name)) {
            (node as Element).removeAttribute(attr.name);
          }
        });
        node.childNodes.forEach(sanitizeNode);
      }
    };
    sanitizeNode(div);
    return div.innerHTML;
  }, []);

  // Track interactions for analytics
  const trackInteraction = useCallback(
    (event: string, data: { [key: string]: any } = {}) => {
      const analyticsData: AnalyticsData = {
        event,
        timestamp: new Date().toISOString(),
        conversationLength: conversationContext.filter(
          (m) => m.sender === "user"
        ).length,
        ...data,
      };
      setConversationHistory((prev) => [...prev, analyticsData]);
    },
    [conversationContext]
  );

  // Memoize inactivity timer to prevent unnecessary re-renders
  const startInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      const message = sanitizeHTML(
        data.inactivityMessages[messageIndexRef.current]
      );
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message,
          category: "inactivity",
          intent: "casual",
          timestamp: new Date().toISOString(),
        },
      ]);
      setConversationContext((prev) => [
        ...prev,
        {
          sender: "bot",
          message,
          category: "inactivity",
          intent: "casual",
          timestamp: new Date().toISOString(),
        },
      ]);
      messageIndexRef.current =
        (messageIndexRef.current + 1) % data.inactivityMessages.length;
      trackInteraction("inactivity_message_shown", {
        message: data.inactivityMessages[messageIndexRef.current],
      });
      startInactivityTimer();
    }, 15000);
  }, [sanitizeHTML, trackInteraction]);

  // Debounce function for performance
  const debounce = useCallback(
    <T extends (...args: any[]) => void>(func: T, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    },
    []
  );

  // Memoize AI response logic for performance
  const getAIResponse = useCallback(
    (
      message: string,
      context: Message[]
    ): { response: string; category: string } => {
      const lowerMessage = message.toLowerCase().trim();
      let bestMatch = { category: "default", priority: -1 };
      let responseData: AIResponse;

      // Exact keyword match
      for (const key in data.aiResponses) {
        if (key === "default") continue;
        if (
          data.aiResponses[key].keywords?.some(
            (keyword) => keyword.toLowerCase() === lowerMessage
          )
        ) {
          bestMatch = {
            category: key,
            priority: data.aiResponses[key].priority,
          };
          break;
        }
      }

      // Fallback to partial match
      if (bestMatch.priority === -1) {
        for (const key in data.aiResponses) {
          if (key === "default" || !data.aiResponses[key].keywords) continue;
          if (
            data.aiResponses[key].keywords?.some((keyword) =>
              lowerMessage.includes(keyword.toLowerCase())
            )
          ) {
            if (data.aiResponses[key].priority > bestMatch.priority) {
              bestMatch = {
                category: key,
                priority: data.aiResponses[key].priority,
              };
            }
          }
        }
      }

      responseData = data.aiResponses[bestMatch.category];
      let response =
        responseData.responses[
          Math.floor(Math.random() * responseData.responses.length)
        ];

      if (bestMatch.category === "services") {
        response = response.replace("[SERVICE]", message);
      }

      if (context.length > 0) {
        const lastUserMessage = context
          .filter((m) => m.sender === "user")
          .pop();
        const lastBotMessage = context.filter((m) => m.sender === "bot").pop();
        const conversationLength = context.filter(
          (item) => item.sender === "user"
        ).length;
        const recentIntents = context
          .slice(-3)
          .map((item) => data.aiResponses[item.category]?.intent || "unknown");

        const isCasual =
          recentIntents.includes("casual") &&
          !recentIntents.includes("support") &&
          !recentIntents.includes("contact");
        const isCommercial = recentIntents.includes("commercial");
        const isInformational = recentIntents.includes("informational");

        if (
          lastBotMessage?.category === bestMatch.category &&
          Math.random() < responseData.followUpThreshold
        ) {
          response = responseData.followUp.replace("[SERVICE]", message);
        } else if (isCasual && conversationLength > 2 && Math.random() < 0.2) {
          response = `Loving our chat! Ready to dive into our software, apps, or marketing solutions?`;
        } else if (conversationLength > 4 && Math.random() < 0.2) {
          response = `Thanks for chatting! ${responseData.followUp.replace(
            "[SERVICE]",
            message
          )}`;
        } else if (isCommercial && bestMatch.category === "services") {
          response = `For pricing on ${message}, we'll need to understand your specific requirements. Would you like to discuss this with our sales team?`;
        } else if (
          isInformational &&
          lastUserMessage?.intent === "informational"
        ) {
          response = `To expand on ${
            lastUserMessage.message
          }, ${response.toLowerCase()}`;
        }
      }

      return { response, category: bestMatch.category };
    },
    []
  );

  const getReachMessage = useCallback((service: string): string | null => {
    const lowerService = service.toLowerCase();
    return data.aiResponses.services.reachMessages?.[lowerService] || null;
  }, []);

  const checkConversationPatterns = useCallback(() => {
    if (conversationContext.length < 2) return;

    const recentMessages = conversationContext.slice(-4);
    for (const pattern of data.conversationPatterns) {
      if (pattern.steps.length > recentMessages.length) continue;

      let match = true;
      for (let i = 0; i < pattern.steps.length; i++) {
        const step = pattern.steps[i];
        const msg =
          recentMessages[recentMessages.length - pattern.steps.length + i];
        if (msg.sender !== step.type || msg.intent !== step.intent) {
          match = false;
          break;
        }
      }

      if (match) {
        setTimeout(() => {
          const patternResponse = {
            sender: "bot" as const,
            message: pattern.response,
            category: "followup",
            intent: "followup",
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, patternResponse]);
          setConversationContext((prev) => [...prev, patternResponse]);
          trackInteraction("pattern_response", { pattern: pattern.name });
        }, 1500);
        break;
      }
    }
  }, [conversationContext, trackInteraction]);

  const showTypingIndicator = useCallback(() => {
    if (isTyping) return;
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      trackInteraction("typing_indicator_removed");
    }, 1000 + Math.random() * 2000);
  }, [isTyping, trackInteraction]);

  const handleServiceSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      if (!selectedValue) return;

      setInputMessage(selectedValue);
      inputRef.current?.focus();

      const userMessage = {
        sender: "user" as const,
        message: selectedValue,
        category: "services",
        intent: "informational",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setConversationContext((prev) => [...prev, userMessage]);

      showTypingIndicator();
      setTimeout(() => {
        setIsTyping(false);
        const { response, category } = getAIResponse(
          selectedValue,
          conversationContext
        );
        const botMessage = {
          sender: "bot" as const,
          message: response,
          category,
          intent: data.aiResponses[category]?.intent || "unknown",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setConversationContext((prev) => [...prev, botMessage]);

        const reachMessage = getReachMessage(selectedValue);
        if (reachMessage) {
          const reachBotMessage = {
            sender: "bot" as const,
            message: reachMessage,
            category: "services",
            intent: "informational",
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, reachBotMessage]);
          setConversationContext((prev) => [...prev, reachBotMessage]);
          trackInteraction("reach_message_displayed", {
            service: selectedValue,
          });
        }

        checkConversationPatterns();
        trackInteraction("service_selected", { service: selectedValue });
        e.target.value = "";
      }, 1000 + Math.random() * 500);
    },
    [
      conversationContext,
      getAIResponse,
      getReachMessage,
      showTypingIndicator,
      checkConversationPatterns,
      trackInteraction,
    ]
  );

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim()) {
      inputRef.current?.setAttribute("aria-invalid", "true");
      inputRef.current?.setAttribute("placeholder", "Please enter a message");
      inputRef.current?.focus();
      setTimeout(() => {
        inputRef.current?.setAttribute("aria-invalid", "false");
        inputRef.current?.setAttribute("placeholder", "Type a message...");
      }, 2000);
      return;
    }

    const userMessage = {
      sender: "user" as const,
      message: inputMessage,
      category: analyzeMessage(inputMessage).category,
      intent: analyzeMessage(inputMessage).intent,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setConversationContext((prev) => [...prev, userMessage]);

    showTypingIndicator();
    const processingTime = Math.min(
      2000,
      Math.max(800, inputMessage.length * 20)
    );
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    setIsTyping(false);
    const { response, category } = getAIResponse(
      inputMessage,
      conversationContext
    );
    const botMessage = {
      sender: "bot" as const,
      message: response,
      category,
      intent: data.aiResponses[category]?.intent || "unknown",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setConversationContext((prev) => [...prev, botMessage]);

    if (category === "services") {
      const reachMessage = getReachMessage(inputMessage);
      if (reachMessage) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const reachBotMessage = {
          sender: "bot" as const,
          message: reachMessage,
          category: "services",
          intent: "informational",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, reachBotMessage]);
        setConversationContext((prev) => [...prev, reachBotMessage]);
        trackInteraction("reach_message_displayed", { service: inputMessage });
      }
    }

    trackInteraction("message_sent", {
      message: inputMessage,
      intent: category,
      responseLength: response.length,
    });
    setInputMessage("");
    inputRef.current?.focus();
    startInactivityTimer();
    checkConversationPatterns();
  }, [
    inputMessage,
    conversationContext,
    getAIResponse,
    getReachMessage,
    showTypingIndicator,
    startInactivityTimer,
    checkConversationPatterns,
    trackInteraction,
  ]);

  const analyzeMessage = useCallback(
    (message: string): { category: string; intent: string } => {
      const lowerMessage = message.toLowerCase();
      let category = "default";
      let intent = "unknown";

      for (const [key, responseData] of Object.entries(data.aiResponses)) {
        if (
          responseData.keywords?.some(
            (keyword) => keyword.toLowerCase() === lowerMessage
          )
        ) {
          category = key;
          intent = responseData.intent;
          break;
        }
      }

      if (category === "default") {
        for (const [key, responseData] of Object.entries(data.aiResponses)) {
          if (
            responseData.keywords?.some((keyword) =>
              lowerMessage.includes(keyword.toLowerCase())
            )
          ) {
            if (
              data.aiResponses[key].priority >
              data.aiResponses[category].priority
            ) {
              category = key;
              intent = responseData.intent;
            }
          }
        }
      }

      if (lowerMessage.includes("how much") || lowerMessage.includes("price")) {
        intent = "commercial";
      }
      if (lowerMessage.includes("thank")) {
        intent = "gratitude";
      }
      if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
        intent = "farewell";
      }

      return { category, intent };
    },
    []
  );

  const resetConversation = useCallback(() => {
    setMessages([
      {
        sender: "bot",
        message:
          "Welcome to Jaikvik Technology! How can I assist you today? Select a service or type a message below.",
        category: "greeting",
        intent: "casual",
        timestamp: new Date().toISOString(),
      },
    ]);
    setConversationContext([]);
    setInputMessage("");
    setIsTyping(false);
    trackInteraction("conversation_reset");
    summarizeConversationHistory();
    startInactivityTimer();
  }, [summarizeConversationHistory, startInactivityTimer, trackInteraction]);

  const handleContactFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      // Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,15}$/;

      form.querySelectorAll("input, textarea").forEach((input) => {
        input.setAttribute("aria-invalid", "false");
      });

      if (
        !formValues.fname ||
        !formValues.phone ||
        !phoneRegex.test(formValues.phone as string) ||
        !formValues.email ||
        !emailRegex.test(formValues.email as string) ||
        !formValues.subject ||
        !formValues.msg
      ) {
        const error = !formValues.fname
          ? "Full Name is required."
          : !formValues.phone || !phoneRegex.test(formValues.phone as string)
          ? "Valid phone number is required."
          : !formValues.email || !emailRegex.test(formValues.email as string)
          ? "Valid email address is required."
          : !formValues.subject
          ? "Subject is required."
          : "Message is required.";
        setFormFeedback({ message: error, type: "error" });
        form
          .querySelector(
            `#${
              !formValues.fname
                ? "fname"
                : !formValues.phone
                ? "phone"
                : !formValues.email
                ? "email"
                : !formValues.subject
                ? "subject"
                : "msg"
            }`
          )
          ?.setAttribute("aria-invalid", "true");
        trackInteraction("contact_form_error", { error });
        return;
      }

      setIsSubmitting(true);
      setFormFeedback({ message: "", type: "" });

      try {
        // Submit to FormSubmit
        const response = await fetch(
          "https://formsubmit.co/ajax/info@jaikviktechnology.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formValues.fname,
              phone: formValues.phone,
              email: formValues.email,
              subject: formValues.subject,
              message: formValues.msg,
              _subject: "New Contact Form Submission from Chatbot",
              _template: "table",
              _captcha: "false",
              _autoresponse: `Thank you for contacting Jaikvik Technology! We've received your message regarding "${formValues.subject}" and will get back to you soon.`,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setFormFeedback({
            message: "Message sent successfully! We'll contact you soon.",
            type: "success",
          });
          form.reset();
          trackInteraction("contact_form_submitted");
          setTimeout(() => setIsContactOpen(false), 2000);
        } else {
          throw new Error(data.message || "Failed to send message");
        }
      } catch (error: any) {
        setFormFeedback({
          message:
            "Failed to send message. Please try again or contact us directly.",
          type: "error",
        });
        trackInteraction("contact_form_error", {
          error: error?.message || String(error),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [trackInteraction]
  );

  const handleCareerFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      // Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,15}$/;

      form.querySelectorAll("input, textarea, select").forEach((input) => {
        input.setAttribute("aria-invalid", "false");
      });

      if (
        !formValues.fname ||
        !formValues.phone ||
        !phoneRegex.test(formValues.phone as string) ||
        !formValues.email ||
        !emailRegex.test(formValues.email as string) ||
        !formValues.position ||
        !formValues.msg ||
        !formValues.resume
      ) {
        const error = !formValues.fname
          ? "Full Name is required."
          : !formValues.phone || !phoneRegex.test(formValues.phone as string)
          ? "Valid phone number is required."
          : !formValues.email || !emailRegex.test(formValues.email as string)
          ? "Valid email address is required."
          : !formValues.position
          ? "Position is required."
          : !formValues.msg
          ? "Message is required."
          : "Resume is required.";
        setFormFeedback({ message: error, type: "error" });
        form
          .querySelector(
            `#${
              !formValues.fname
                ? "fname"
                : !formValues.phone
                ? "phone"
                : !formValues.email
                ? "email"
                : !formValues.position
                ? "position"
                : !formValues.msg
                ? "msg"
                : "resume"
            }`
          )
          ?.setAttribute("aria-invalid", "true");
        trackInteraction("career_form_error", { error });
        return;
      }

      setIsSubmitting(true);
      setFormFeedback({ message: "", type: "" });

      try {
        // Create FormData for file upload
        const careerFormData = new FormData();
        careerFormData.append("name", formValues.fname as string);
        careerFormData.append("phone", formValues.phone as string);
        careerFormData.append("email", formValues.email as string);
        careerFormData.append("position", formValues.position as string);
        careerFormData.append("message", formValues.msg as string);
        careerFormData.append("resume", formValues.resume as File);
        careerFormData.append(
          "_subject",
          "New Career Application from Chatbot"
        );
        careerFormData.append("_template", "table");
        careerFormData.append("_captcha", "false");
        careerFormData.append(
          "_autoresponse",
          `Thank you for applying to Jaikvik Technology! We've received your application for the ${formValues.position} position and will review it shortly.`
        );

        // Submit to FormSubmit
        const response = await fetch(
          "https://formsubmit.co/ajax/info@jaikviktechnology.com",
          {
            method: "POST",
            body: careerFormData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          setFormFeedback({
            message:
              "Application submitted successfully! We'll contact you soon.",
            type: "success",
          });
          form.reset();
          trackInteraction("career_form_submitted");
          setTimeout(() => setIsCareerOpen(false), 2000);
        } else {
          throw new Error(data.message || "Failed to submit application");
        }
      } catch (error: any) {
        setFormFeedback({
          message:
            "Failed to submit application. Please try again or contact us directly.",
          type: "error",
        });
        trackInteraction("career_form_error", {
          error: error?.message || String(error),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [trackInteraction]
  );

  const handleKeyPress = useMemo(
    () =>
      debounce((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }, 100),
    [sendMessage]
  );

  const handlePopupEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsContactOpen(false);
        setIsCareerOpen(false);
        setFormFeedback({ message: "", type: "" });
        trackInteraction("popup_closed_escape");
      }
    },
    [trackInteraction]
  );

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
    setIsToggleVisible((prev) => !prev);
    trackInteraction(`chatbot_${isChatOpen ? "closed" : "opened"}`);
    if (!isChatOpen) {
      startInactivityTimer();
    }
  }, [isChatOpen, startInactivityTimer, trackInteraction]);

  // Start inactivity timer on initial load
  useEffect(() => {
    startInactivityTimer();
    trackInteraction("chatbot_opened");
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [startInactivityTimer, trackInteraction]);

  useEffect(() => {
    if (isContactOpen || isCareerOpen) {
      document.addEventListener("keydown", handlePopupEscape);
    } else {
      document.removeEventListener("keydown", handlePopupEscape);
    }
    return () => document.removeEventListener("keydown", handlePopupEscape);
  }, [isContactOpen, isCareerOpen, handlePopupEscape]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Toggle Button */}
      {isToggleVisible && (
        <button
          onClick={toggleChat} // Replace with your WhatsApp functionality
          aria-label="Open WhatsApp"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20b954] hover:shadow-xl transition-all duration-300 z-[999] animate-bounce focus:ring-2 focus:ring-green-300 focus:outline-none"
        >
          <i className="fa-brands fa-whatsapp text-2xl" aria-hidden="true"></i>
        </button>
      )}

      {/* Chatbot Container */}
      <div
        id="jkvChatbot"
        role="dialog"
        aria-hidden={!isChatOpen}
        aria-label="Jaikvik AI Chatbot"
        className={`fixed bottom-6 right-6 w-[clamp(280px,80%,360px)] bg-white p-[clamp(12px,3vw,16px)] rounded-xl shadow-2xl font-sans z-[1000] transition-all duration-300 ${
          isChatOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          id="jkvChatbotHeader"
          className="flex justify-between items-center mb-3"
        >
          <h3 className="text-[clamp(16px,4vw,18px)] font-semibold text-gray-800">
            Jaikvik Technology Chatbot
          </h3>
          <button
            aria-label="Close chatbot"
            className="text-2xl cursor-pointer text-gray-800 hover:text-blue-500 transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={toggleChat}
          >
            ×
          </button>
        </div>
        <div
          id="jkvMessages"
          ref={messagesRef}
          aria-live="polite"
          className="max-h-80 overflow-y-auto mb-3 p-3 border border-indigo-100 rounded-lg bg-gray-50"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender
              } my-2 p-3 rounded-lg text-sm text-gray-800 max-w-[80%] break-words animate-messageAppear ${
                msg.sender === "user"
                  ? "bg-sky-100 ml-auto text-right"
                  : "bg-indigo-100"
              }`}
              dangerouslySetInnerHTML={{
                __html: `${
                  msg.sender === "user" ? "You" : "Bot"
                }: ${sanitizeHTML(
                  msg.message
                )}<span class="block text-xs text-gray-500 mt-1 text-right">${msg.timestamp.slice(
                  11,
                  16
                )}</span>`,
              }}
            />
          ))}
          {isTyping && (
            <div
              className="typing-indicator flex items-center gap-2 my-2 p-3 rounded-lg text-sm text-gray-600 bg-indigo-100 italic animate-typing"
              role="status"
              aria-label="Bot is typing"
            >
              <span className="animate-pulse">Bot is thinking</span>
            </div>
          )}
        </div>
        <div>
          <select
            onChange={handleServiceSelect}
            aria-label="Select a service"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white cursor-pointer mb-3 max-h-40 overflow-y-auto focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onFocus={() => trackInteraction("service_select_focused")}
          >
            <option value="">Select a service...</option>
            {data.services.map((group, index) => (
              <optgroup
                key={index}
                label={group.group}
                className="font-semibold text-gray-800"
              >
                {group.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              aria-label="Type your message"
              maxLength={200}
              disabled={isTyping}
              className="flex-1 p-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50"
              onFocus={() => trackInteraction("input_field_focused")}
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              disabled={isTyping}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
            >
              Send
            </button>
            <button
              onClick={resetConversation}
              aria-label="Clear conversation"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-red-300"
            >
              Clear
            </button>
            <button
              onClick={() => {
                setIsContactOpen(true);
                trackInteraction("contact_popup_opened");
              }}
              aria-label="Open contact form"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-green-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      {isContactOpen && (
        <div
          id="jkvContactPopup"
          aria-hidden={!isContactOpen}
          role="dialog"
          aria-label="Contact form popup"
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1100] animate-fadeIn"
          onClick={() => {
            setIsContactOpen(false);
            setFormFeedback({ message: "", type: "" });
            trackInteraction("contact_popup_closed");
          }}
        >
          <div
            id="jkvContactInner"
            role="dialog"
            aria-label="Contact Form"
            className="relative w-[clamp(280px,90%,600px)] max-h-[80vh] overflow-y-auto bg-white p-[clamp(16px,4vw,24px)] rounded-xl shadow-2xl animate-popUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[clamp(18px,5vw,22px)] font-semibold text-gray-800">
                Get In Touch
              </h4>
              <button
                aria-label="Close contact popup"
                className="text-2xl cursor-pointer text-gray-800 hover:text-blue-500 transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => {
                  setIsContactOpen(false);
                  setFormFeedback({ message: "", type: "" });
                  trackInteraction("contact_popup_closed");
                }}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form id="jkvContactForm" onSubmit={handleContactFormSubmit}>
                {[
                  { id: "fname", label: "Full Name", type: "text" },
                  { id: "phone", label: "Phone Number", type: "tel" },
                  { id: "email", label: "Email Address", type: "email" },
                  { id: "subject", label: "Subject", type: "text" },
                ].map((field) => (
                  <div key={field.id} className="relative mb-4">
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required
                      autoComplete="off"
                      aria-label={field.label}
                      className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 transition-all duration-200"
                    />
                    <label
                      htmlFor={field.id}
                      className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative mb-4">
                  <textarea
                    id="msg"
                    name="msg"
                    rows={5}
                    required
                    autoComplete="off"
                    aria-label="Your Message"
                    className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 transition-all duration-200 resize-y min-h-[100px]"
                  />
                  <label
                    htmlFor="msg"
                    className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500"
                  >
                    Your Message
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {formFeedback.message && (
                  <div
                    className={`mt-2 p-2 rounded-lg text-sm text-center ${
                      formFeedback.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    role="alert"
                  >
                    {formFeedback.message}
                  </div>
                )}
              </form>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="text-base font-semibold text-gray-800 mb-3">
                  Contact Us
                </h5>
                {[
                  {
                    icon: "fa-solid fa-location-dot",
                    text: '<a href="https://www.google.com/maps/place/Jaikvik+Technology+India+Pvt.+Ltd./@28.6208897,77.3799222,17z" target="_blank">A-82, Sector 63, Noida, UP</a>',
                  },
                  {
                    icon: "fa-solid fa-envelope",
                    text: '<a href="mailto:info@jaikviktechnology.com">info@jaikviktechnology.com</a>',
                  },
                  {
                    icon: "fa-solid fa-phone",
                    text: '<a href="tel:+919310907227">+91-9310907227</a>',
                  },
                  {
                    icon: "fa-solid fa-phone",
                    text: '<a href="tel:+911204200970">+91-120-4200970</a>',
                  },
                  {
                    icon: "fa-solid fa-phone",
                    text: '<a href="tel:+919220826934">+91-9220826934</a>',
                  },
                  {
                    icon: "fa-brands fa-whatsapp",
                    text: '<a href="https://wa.me/+919220826934" target="_blank">+91-9220826934</a>',
                  },
                ].map((info, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-600 mb-2 flex items-center gap-2"
                    dangerouslySetInnerHTML={{
                      __html: `<i class="${info.icon} text-blue-500 text-base" aria-hidden="true"></i> ${info.text}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Career Popup */}
      {isCareerOpen && (
        <div
          id="jkvCareerPopup"
          aria-hidden={!isCareerOpen}
          role="dialog"
          aria-label="Career form popup"
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1100] animate-fadeIn"
          onClick={() => {
            setIsCareerOpen(false);
            setFormFeedback({ message: "", type: "" });
            trackInteraction("career_popup_closed");
          }}
        >
          <div
            id="jkvCareerInner"
            role="dialog"
            aria-label="Career Application Form"
            className="relative w-[clamp(280px,90%,600px)] max-h-[80vh] overflow-y-auto bg-white p-[clamp(16px,4vw,24px)] rounded-xl shadow-2xl animate-popUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[clamp(18px,5vw,22px)] font-semibold text-gray-800">
                Career Application
              </h4>
              <button
                aria-label="Close career popup"
                className="text-2xl cursor-pointer text-gray-800 hover:text-blue-500 transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => {
                  setIsCareerOpen(false);
                  setFormFeedback({ message: "", type: "" });
                  trackInteraction("career_popup_closed");
                }}
              >
                ×
              </button>
            </div>
            <form
              id="jkvCareerForm"
              onSubmit={handleCareerFormSubmit}
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 gap-6">
                {[
                  { id: "fname", label: "Full Name", type: "text" },
                  { id: "phone", label: "Phone Number", type: "tel" },
                  { id: "email", label: "Email Address", type: "email" },
                  {
                    id: "position",
                    label: "Position Applied For",
                    type: "text",
                  },
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required
                      autoComplete="off"
                      aria-label={field.label}
                      className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 transition-all duration-200"
                    />
                    <label
                      htmlFor={field.id}
                      className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <label
                    htmlFor="resume"
                    className="block text-sm text-gray-700 mb-1"
                  >
                    Upload Resume (PDF, DOC, DOCX)
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:bg-blue-500 file:border-0 file:text-white file:cursor-pointer"
                  />
                </div>
                <div className="relative">
                  <textarea
                    id="msg"
                    name="msg"
                    rows={5}
                    required
                    autoComplete="off"
                    aria-label="Cover Letter"
                    className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 transition-all duration-200 resize-y min-h-[100px]"
                  />
                  <label
                    htmlFor="msg"
                    className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500"
                  >
                    Cover Letter
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
                {formFeedback.message && (
                  <div
                    className={`mt-2 p-2 rounded-lg text-sm text-center ${
                      formFeedback.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    role="alert"
                  >
                    {formFeedback.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
