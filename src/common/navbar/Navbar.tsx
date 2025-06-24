import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import NavLayerTop from "./NavLayerTop";
import NavLayerBottom from "./NavLayerBottom";
import {
  digitalMarketingItems,
  filmProductionItems,
  seoServiceItems,
  softwareDevelopmentItems,
  websiteDevelopmentItems,
} from "../../configs/navConfigs";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // State for popups and off-canvas menu
  const [isTranslatePopupOpen, setIsTranslatePopupOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});
  const [translateError, setTranslateError] = useState<string | null>(null);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const windowTop = window.scrollY + 1;
      const threshold = window.innerWidth < 768 ? 0 : 250;
      setIsSticky(windowTop > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for translate popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.getElementById("translate_popup");
      const languageLinks = document.querySelectorAll(".language-menu a");
      const isLanguageLink = Array.from(languageLinks).some((link) =>
        link.contains(event.target as Node)
      );
      const isPopup = popup?.contains(event.target as Node);

      if (!isLanguageLink && !isPopup && isTranslatePopupOpen) {
        setIsTranslatePopupOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isTranslatePopupOpen]);

  // Close off-canvas when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOffCanvasOpen) {
        setIsOffCanvasOpen(false);
        document.body.classList.remove("overflow-hidden");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOffCanvasOpen]);

  // Initialize Google Translate
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!window.google?.translate) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onerror = () => {
          setTranslateError("Failed to load Google Translate script");
          console.error("Google Translate script failed to load");
        };
        document.body.appendChild(script);
      } else {
        window.googleTranslateElementInit?.();
      }
    };

    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout: 0, // SIMPLE layout
              autoDisplay: false,
              multilanguagePage: true,
            } as any, // Type assertion to bypass TS2353
            "google_translate_element_popup"
          );
        } else {
          throw new Error("Google TranslateElement not available");
        }
      } catch (error) {
        setTranslateError("Failed to initialize Google Translate");
        console.error("Google Translate initialization error:", error);
      }
    };

    addGoogleTranslateScript();

    return () => {
      const script = document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      );
      if (script) {
        script.remove();
      }
      delete window.googleTranslateElementInit;
    };
  }, []);

  const toggleTranslateDropdown = () => {
    setIsTranslatePopupOpen(!isTranslatePopupOpen);
    if (!isTranslatePopupOpen) {
      setTimeout(() => {
        const select = document.querySelector(
          "#google_translate_element_popup select"
        ) as HTMLSelectElement;
        if (select) {
          select.focus();
        }
      }, 100);
    }
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
    document.body.classList.toggle("overflow-hidden");
  };

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      <style>
        {`
    @keyframes rgbBorder {
      0% { border-color: #ff0000; }
      33% { border-color: #00ff00; }
      66% { border-color: #0000ff; }
      100% { border-color: #ff0000; }
    }

    @keyframes slideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInRight {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes sticky {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(0); }
    }

    .menu-expand::before,
    .menu-expand::after {
      position: absolute;
      top: calc(50% - 1px);
      left: calc(50% - 7px);
      width: 14px;
      height: 2px;
      content: "";
      transition: all 0.5s ease;
      transform: scale(0.75);
      background-color: white;
    }

    .menu-expand::after {
      transform: rotate(90deg) scale(0.75);
    }

    .menu-expand.active::after {
      transform: rotate(0) scale(0.75);
    }

    .offcanvas-close::after,
    .offcanvas-close::before {
      position: absolute;
      top: calc(50% - 1px);
      left: 50%;
      margin-left: -10px;
      width: 20px;
      height: 2px;
      content: "";
      transition: all 0.5s ease;
      background-color: #fff;
    }

    .offcanvas-close::before {
      transform: rotate(45deg);
    }

    .offcanvas-close::after {
      transform: rotate(-45deg);
    }

    .offcanvas-close:hover::before {
      transform: rotate(180deg);
    }

    .offcanvas-close:hover::after {
      transform: rotate(0deg);
    }

    .quote-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid transparent;
      border-radius: 5px;
      animation: rgbBorder 3s linear infinite;
      z-index: 0;
    }

    .customScroll {
      scrollbar-width: thin;
      scrollbar-color: #ef4444 #1f2937;
    }

    .customScroll::-webkit-scrollbar {
      width: 6px;
    }

    .customScroll::-webkit-scrollbar-track {
      background: #1f2937;
    }

    .customScroll::-webkit-scrollbar-thumb {
      background: #ef4444;
      border-radius: 3px;
    }

    .sub-menu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .sub-menu.expanded {
      max-height: 500px;
      transition: max-height 0.3s ease-in;
    }

    .menu-item-with-arrow {
      position: relative;
    }

    .menu-arrow {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.3s ease;
    }

    .menu-arrow.expanded {
      transform: translateY(-50%) rotate(180deg);
    }

    .mobile-sticky-header {
      position: sticky;
      top: 0;
      z-index: 990;
      transition: all 0.3s ease;
      animation: ${isSticky ? "sticky 0.3s ease" : "none"};
      box-shadow: ${isSticky ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none"};
      background: ${isSticky ? "rgba(0, 0, 0, 0.95)" : "black"};
      backdrop-filter: ${isSticky ? "blur(10px)" : "none"};
    }

    @media (max-width: 768px) {
      .offcanvas {
        width: 280px !important;
      }
      
      .translate-popup {
        right: 10px !important;
        top: 60px !important;
        width: calc(100vw - 20px) !important;
        max-width: 280px !important;
      }
    }

    @media (max-width: 480px) {
      .offcanvas {
        width: 100vw !important;
      }
      
      .translate-popup {
        right: 5px !important;
        top: 50px !important;
        width: calc(100vw - 10px) !important;
        max-width: none !important;
      }
    }
  `}
      </style>

      {/* Topbar */}
      <div className="hidden md:block">
        <NavLayerTop />
      </div>

      {/* Mobile Header - Sticky */}
      <div className={`block md:hidden mobile-sticky-header`}>
        <div className="flex justify-between items-center py-2 px-4">
          <Link to="/" className="w-24 h-8">
            <img
              src="https://jaikvik.in/lab/new-post-video/img/logo/logo-1.png"
              alt="logo"
              className="h-full object-contain"
            />
          </Link>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTranslateDropdown}
              className="text-white hover:text-red-500 transition-colors p-1"
              aria-label="Select language"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.5 10l3-3m0 0l-3-3m3 3H3m12 4h6m-3-2v4"
                />
              </svg>
            </button>
            <button
              onClick={toggleOffCanvas}
              className="text-white hover:text-red-500 transition-colors p-1"
              aria-label="Open menu"
            >
              <IoMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavLayerBottom
          isSticky={isSticky}
          isTranslatePopupOpen={isTranslatePopupOpen}
          setIsTranslatePopupOpen={setIsTranslatePopupOpen}
        />
      </div>

      {/* OffCanvas Overlay */}
      <div
        className={`offcanvas-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] ${
          isOffCanvasOpen ? "block" : "hidden"
        } transition-opacity duration-300`}
        onClick={toggleOffCanvas}
      ></div>

      {/* OffCanvas Menu */}
      <div
        id="offcanvas-mobile-menu"
        className={`offcanvas offcanvas-mobile-menu fixed top-0 left-0 w-[350px] sm:w-[320px] md:w-[350px] h-full bg-gradient-to-b from-gray-900 to-black text-white transform ${
          isOffCanvasOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 z-[1000] shadow-2xl overflow-y-auto customScroll`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-red-500">Menu</h2>
          <button
            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            onClick={toggleOffCanvas}
            aria-label="Close menu"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="inner customScroll flex flex-col">
          <div className="offcanvas-menu flex-1 p-4">
            <ul className="list-none m-0 p-0 space-y-1">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  About Us
                </Link>
              </li>

              {/* Services Menu */}
              <li>
                <button
                  onClick={() => toggleSubmenu("services")}
                  className="menu-item-with-arrow w-full text-left px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                >
                  Services
                  <FaChevronDown
                    className={`menu-arrow ${
                      expandedMenus.services ? "expanded" : ""
                    }`}
                    size={12}
                  />
                </button>

                <div
                  className={`sub-menu pl-4 ${
                    expandedMenus.services ? "expanded" : ""
                  } customScroll`}
                  style={{
                    maxHeight: expandedMenus.services ? "300px" : "0",
                    overflowY: "auto",
                  }}
                >
                  <ul>
                    {/* Software Development */}
                    <li>
                      <button
                        onClick={() => toggleSubmenu("software")}
                        className="menu-item-with-arrow w-full text-left px-4 py-2 text-gray-300 text-sm font-medium bg-gray-800/50 rounded-lg my-1 hover:bg-gray-700 hover:text-white transition-all duration-200"
                      >
                        Software Development
                        <FaChevronDown
                          className={`menu-arrow ${
                            expandedMenus.software ? "expanded" : ""
                          }`}
                          size={10}
                        />
                      </button>
                      <ul
                        className={`sub-menu pl-4 ${
                          expandedMenus.software ? "expanded" : ""
                        }`}
                      >
                        {softwareDevelopmentItems?.map((item, index) => (
                          <li key={index} className="my-1">
                            <Link
                              to={item.href}
                              className="block bg-gray-900/70 rounded-lg p-3 hover:bg-gray-800 transition-all duration-200"
                              onClick={toggleOffCanvas}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.img}
                                  alt={item.text}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <span className="text-gray-200 text-sm font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Website Development */}
                    <li>
                      <button
                        onClick={() => toggleSubmenu("website")}
                        className="menu-item-with-arrow w-full text-left px-4 py-2 text-gray-300 text-sm font-medium bg-gray-800/50 rounded-lg my-1 hover:bg-gray-700 hover:text-white transition-all duration-200"
                      >
                        Website Development
                        <FaChevronDown
                          className={`menu-arrow ${
                            expandedMenus.website ? "expanded" : ""
                          }`}
                          size={10}
                        />
                      </button>
                      <ul
                        className={`sub-menu pl-4 ${
                          expandedMenus.website ? "expanded" : ""
                        }`}
                      >
                        {websiteDevelopmentItems?.map((item, index) => (
                          <li key={index} className="my-1">
                            <Link
                              to={item.href}
                              className="block bg-gray-900/70 rounded-lg p-3 hover:bg-gray-800 transition-all duration-200"
                              onClick={toggleOffCanvas}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.img}
                                  alt={item.text}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <span className="text-gray-200 text-sm font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Digital Marketing */}
                    <li>
                      <button
                        onClick={() => toggleSubmenu("digital")}
                        className="menu-item-with-arrow w-full text-left px-4 py-2 text-gray-300 text-sm font-medium bg-gray-800/50 rounded-lg my-1 hover:bg-gray-700 hover:text-white transition-all duration-200"
                      >
                        Digital Marketing
                        <FaChevronDown
                          className={`menu-arrow ${
                            expandedMenus.digital ? "expanded" : ""
                          }`}
                          size={10}
                        />
                      </button>
                      <ul
                        className={`sub-menu ${
                          expandedMenus.digital ? "expanded" : ""
                        } pl-4`}
                      >
                        {digitalMarketingItems?.map((item, index) => (
                          <li key={index} className="my-1">
                            <Link
                              to={item.href}
                              className="block bg-gray-900/70 rounded-lg p-3 hover:bg-gray-800 transition-all duration-200"
                              onClick={toggleOffCanvas}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.img}
                                  alt={item.text}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <span className="text-gray-200 text-sm font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* SEO Services */}
                    <li>
                      <button
                        onClick={() => toggleSubmenu("seo")}
                        className="menu-item-with-arrow w-full text-left px-4 py-2 text-gray-300 text-sm font-medium bg-gray-800/50 rounded-lg my-1 hover:bg-gray-700 hover:text-white transition-all duration-200"
                      >
                        Google SEO Services
                        <FaChevronDown
                          className={`menu-arrow ${
                            expandedMenus.seo ? "expanded" : ""
                          }`}
                          size={10}
                        />
                      </button>
                      <ul
                        className={`sub-menu pl-4 ${
                          expandedMenus.seo ? "expanded" : ""
                        }`}
                      >
                        {seoServiceItems?.map((item, index) => (
                          <li key={index} className="my-1">
                            <Link
                              to={item.href}
                              className="block bg-gray-900/70 rounded-lg p-3 hover:bg-gray-800 transition-all duration-200"
                              onClick={toggleOffCanvas}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.img}
                                  alt={item.text}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <span className="text-gray-200 text-sm font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* Film Production */}
                    <li>
                      <button
                        onClick={() => toggleSubmenu("film")}
                        className="menu-item-with-arrow w-full text-left px-4 py-2 text-gray-300 text-sm font-medium bg-gray-800/50 rounded-lg my-1 hover-bg-gray-700 hover:text-white transition-all duration-200"
                      >
                        Film Production
                        <FaChevronDown
                          className={`menu-arrow ${
                            expandedMenus.film ? "expanded" : ""
                          }`}
                          size={10}
                        />
                      </button>
                      <ul
                        className={`sub-menu pl-4 ${
                          expandedMenus.film ? "expanded" : ""
                        }`}
                      >
                        {filmProductionItems?.map((item, index) => (
                          <li key={index} className="my-1">
                            <Link
                              to={item.href}
                              className="block bg-gray-900/70 rounded-lg p-3 hover:bg-gray-800 transition-all duration-200"
                              onClick={toggleOffCanvas}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.img}
                                  alt={item.text}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <span className="text-gray-200 text-sm font-medium">
                                  {item.text}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Our Blogs */}
              <li>
                <Link
                  to="/blogs"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  Our Blogs
                </Link>
              </li>

              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  Contact
                </Link>
              </li>

              {/* Career */}
              <li>
                <Link
                  to="/career"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  Career
                </Link>
              </li>

              {/* Admin */}
              <li>
                <Link
                  to="/admin"
                  className="block px-4 py-3 text-white text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-red-400 transition-all duration-200"
                  onClick={toggleOffCanvas}
                >
                  Admin
                </Link>
              </li>

              {/* Language Menu */}
              <li className="language-menu">
                <button
                  onClick={toggleTranslateDropdown}
                  className="w-full text-left px-4 py-3 text-red-500 text-base font-medium rounded-lg border-b border-gray-700/50 hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  Language
                </button>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <div className="offcanvas-social p-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 text-center">
                Follow Us
              </h3>
              <ul className="flex space-x-3 justify-center">
                <li>
                  <Link
                    to="https://facebook.com"
                    className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF size={16} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://twitter.com"
                    className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={16} />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://instagram.com"
                    className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={16} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Language Translate Popup */}
      <div
        id="translate_popup"
        className={`translate-popup fixed top-20 right-5 z-[1000] ${
          isTranslatePopupOpen ? "block" : "hidden"
        }`}
      >
        <div className="translate-popup-content bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg p-4 shadow-2xl animate-[slideInRight_0.3s_ease]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">
              Select Language
            </h3>
            <button
              onClick={toggleTranslateDropdown}
              className="text-xl text-gray-200 hover:text-red-400 transition-all duration-200"
              aria-label="Close language selector"
            >
              ×
            </button>
          </div>
          <div id="google_translate_element_popup" className="my-2 p-2 px-2">
            {translateError ? (
              <p className="text-red-400 text-sm mt-2">{translateError}</p>
            ) : (
              <select
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-900 text-gray-200 text-sm font-medium focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400/30"
                defaultValue="en"
                onChange={(e) => {
                  const select = document.querySelector(
                    "#google_translate_element_popup select"
                  ) as HTMLSelectElement;
                  if (select) {
                    select.value = e.target.value;
                    select.dispatchEvent(new Event("change"));
                  }
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh-CN">Chinese</option>
                <option value="zh-TW">Chinese (Traditional)</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="ar">Arabic</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="ml">Malayalam</option>
                <option value="kn">Kannada</option>
                <option value="gu">Gujarati</option>
                <option value="pa">Punjabi</option>
                <option value="bn">Bengali</option>
                <option value="ru">Russian</option>
                <option value="pt">Portuguese</option>
                <option value="it">Italian</option>
                <option value="nl">Dutch</option>
                <option value="sv">Swedish</option>
                <option value="da">Danish</option>
                <option value="fi">Finnish</option>
                <option value="no">Norwegian</option>
                <option value="pl">Polish</option>
                <option value="th">Thai</option>
                <option value="vi">Vietnamese</option>
                <option value="id">Indonesian</option>
                <option value="ms">Malay</option>
                <option value="ur">Urdu</option>
                <option value="fa">Persian</option>
                <option value="he">Hebrew</option>
                <option value="el">Greek</option>
                <option value="uk">Ukrainian</option>
                <option value="cs">Czech</option>
                <option value="hu">Hungarian</option>
                <option value="tr">Turkish</option>
                <option value="ro">Romanian</option>
                <option value="bg">Bulgarian</option>
                <option value="hr">Croatian</option>
                <option value="sr">Serbian</option>
                <option value="sk">Slovak</option>
                <option value="sl">Slovenian</option>
                <option value="lt">Lithuanian</option>
                <option value="lv">Latvian</option>
                <option value="et">Estonian</option>
                <option value="fil">Filipino</option>
                <option value="km">Khmer</option>
                <option value="lo">Lao</option>
                <option value="am">Amharic</option>
                <option value="ka">Georgian</option>
                <option value="hy">Armenian</option>
                <option value="az">Azerbaijani</option>
                <option value="si">Sinhala</option>
                <option value="ne">Nepali</option>
                <option value="bo">Tibetan</option>
                <option value="dz">Dzongkha</option>
                <option value="iu">Inuktitut</option>
                <option value="kk">Kazakh</option>
                <option value="ky">Kyrgyz</option>
                <option value="mg">Malagasy</option>
                <option value="mk">Macedonian</option>
                <option value="mt">Maltese</option>
                <option value="ps">Pashto</option>
                <option value="so">Somali</option>
                <option value="sw">Swahili</option>
                <option value="tk">Turkmen</option>
                <option value="ug">Uyghur</option>
                <option value="uz">Uzbek</option>
                <option value="yi">Yiddish</option>
                <option value="yo">Yoruba</option>
                <option value="zu">Zulu</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
