import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

interface NavItem {
  id: string;
  title: string;
  href: string;
  subItems?: SubItem[];
}

interface SubItem {
  id: string;
  text: string;
  href: string;
  img: string;
}

interface TopLink {
  id: string;
  name: string;
  to: string;
}

interface SocialLink {
  id: string;
  icon: string;
  url: string;
}

interface NavConfig {
  logo: string;
  topLinks: TopLink[];
  socialLinks: SocialLink[];
  mainNav: NavItem[];
  whatsappNumber: string;
}

const NavDashboard: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<NavConfig>({
    logo: "https://jaikvik.in/lab/new-post-video/img/logo/logo-1.png",
    topLinks: [
      { id: "1", name: "Home", to: "/" },
      { id: "2", name: "About", to: "/about" },
      { id: "3", name: "Blog", to: "/blog" },
      { id: "4", name: "Contact", to: "/contact" },
    ],
    socialLinks: [
      { id: "1", icon: "facebook", url: "https://facebook.com" },
      { id: "2", icon: "twitter", url: "https://twitter.com" },
      { id: "3", icon: "instagram", url: "https://instagram.com" },
      { id: "4", icon: "linkedin", url: "https://linkedin.com" },
    ],
    mainNav: [
      {
        id: "1",
        title: "Software Development",
        href: "/software-development",
        subItems: [
          {
            id: "1-1",
            text: "Custom Software",
            href: "/custom-software",
            img: "https://via.placeholder.com/300x200?text=Custom+Software",
          },
          {
            id: "1-2",
            text: "Mobile Apps",
            href: "/mobile-apps",
            img: "https://via.placeholder.com/300x200?text=Mobile+Apps",
          },
        ],
      },
      {
        id: "2",
        title: "Website Development",
        href: "/website-development",
        subItems: [
          {
            id: "2-1",
            text: "E-commerce",
            href: "/ecommerce",
            img: "https://via.placeholder.com/300x200?text=E-commerce",
          },
          {
            id: "2-2",
            text: "Corporate Websites",
            href: "/corporate-websites",
            img: "https://via.placeholder.com/300x200?text=Corporate+Sites",
          },
        ],
      },
    ],
    whatsappNumber: "1234567890",
  });

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const [editingItem, setEditingItem] = useState<{
    type: string;
    id: string;
    parentId?: string;
    field?: string;
    value?: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle("overflow-hidden");
  };

  // Toggle submenu
  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Form validation
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setIsQuotePopupOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Start editing a field
  const startEditing = (
    type: string,
    id: string,
    field?: string,
    value?: string,
    parentId?: string
  ) => {
    if (!isAdmin) return;
    setEditingItem({ type, id, field, value, parentId });
  };

  // Save edited field
  const saveEdit = () => {
    if (!editingItem || !isAdmin) return;

    setConfig((prev) => {
      if (editingItem.type === "mainNav") {
        return {
          ...prev,
          mainNav: prev.mainNav.map((item) =>
            item.id === editingItem.id
              ? { ...item, [editingItem.field!]: editingItem.value }
              : item
          ),
        };
      } else if (editingItem.type === "subItem") {
        return {
          ...prev,
          mainNav: prev.mainNav.map((item) => ({
            ...item,
            subItems: item.subItems?.map((subItem) =>
              subItem.id === editingItem.id
                ? { ...subItem, [editingItem.field!]: editingItem.value }
                : subItem
            ),
          })),
        };
      } else if (editingItem.type === "topLink") {
        return {
          ...prev,
          topLinks: prev.topLinks.map((link) =>
            link.id === editingItem.id
              ? { ...link, [editingItem.field!]: editingItem.value }
              : link
          ),
        };
      } else if (editingItem.type === "socialLink") {
        return {
          ...prev,
          socialLinks: prev.socialLinks.map((link) =>
            link.id === editingItem.id
              ? { ...link, [editingItem.field!]: editingItem.value }
              : link
          ),
        };
      } else if (editingItem.type === "config") {
        return {
          ...prev,
          [editingItem.field!]: editingItem.value,
        };
      } else if (editingItem.type === "whatsapp") {
        return {
          ...prev,
          whatsappNumber: editingItem.value || "",
        };
      }
      return prev;
    });

    setEditingItem(null);
  };

  // Add new navigation item
  const addNewNavItem = () => {
    const newId = Date.now().toString();
    setConfig((prev) => ({
      ...prev,
      mainNav: [
        ...prev.mainNav,
        {
          id: newId,
          title: "New Menu Item",
          href: "#",
          subItems: [],
        },
      ],
    }));
    startEditing("mainNav", newId, "title", "New Menu Item");
  };

  // Add new sub item
  const addNewSubItem = (parentId: string) => {
    const newId = Date.now().toString();
    setConfig((prev) => ({
      ...prev,
      mainNav: prev.mainNav.map((item) =>
        item.id === parentId
          ? {
              ...item,
              subItems: [
                ...(item.subItems || []),
                {
                  id: newId,
                  text: "New Sub Item",
                  href: "#",
                  img: "https://via.placeholder.com/300x200?text=New+Item",
                },
              ],
            }
          : item
      ),
    }));
    startEditing("subItem", newId, "text", "New Sub Item", parentId);
  };

  // Delete item
  const deleteItem = (type: string, id: string, parentId?: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setConfig((prev) => {
        if (type === "mainNav") {
          return {
            ...prev,
            mainNav: prev.mainNav.filter((item) => item.id !== id),
          };
        } else if (type === "subItem" && parentId) {
          return {
            ...prev,
            mainNav: prev.mainNav.map((item) =>
              item.id === parentId
                ? {
                    ...item,
                    subItems: item.subItems?.filter(
                      (subItem) => subItem.id !== id
                    ),
                  }
                : item
            ),
          };
        } else if (type === "topLink") {
          return {
            ...prev,
            topLinks: prev.topLinks.filter((link) => link.id !== id),
          };
        } else if (type === "socialLink") {
          return {
            ...prev,
            socialLinks: prev.socialLinks.filter((link) => link.id !== id),
          };
        }
        return prev;
      });
    }
  };

  // Render social icon based on type
  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <FaFacebookF size={16} />;
      case "twitter":
        return <FaTwitter size={16} />;
      case "instagram":
        return <FaInstagram size={16} />;
      case "linkedin":
        return <FaLinkedinIn size={16} />;
      case "whatsapp":
        return <FaWhatsapp size={16} />;
      default:
        return null;
    }
  };

  // Toggle admin mode
  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      {/* Admin Control Bar */}
      <div
        className={`bg-blue-900 text-white p-2 text-center ${
          isAdmin ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold">ADMIN MODE ACTIVE</span>
          <button
            onClick={toggleAdminMode}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            Exit Admin Mode
          </button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-gray-900 text-white hidden md:block">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Get a Quote
            </button>
            <div className="flex space-x-3">
              {config.socialLinks.map((link) => (
                <div key={link.id} className="relative group">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    {renderSocialIcon(link.icon)}
                  </a>
                  {isAdmin && (
                    <div className="absolute -top-2 -right-2 flex space-x-1">
                      <button
                        onClick={() =>
                          startEditing("socialLink", link.id, "url", link.url)
                        }
                        className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                      >
                        <FaEdit size={10} />
                      </button>
                      <button
                        onClick={() => deleteItem("socialLink", link.id)}
                        className="text-xs bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    const newId = Date.now().toString();
                    setConfig((prev) => ({
                      ...prev,
                      socialLinks: [
                        ...prev.socialLinks,
                        {
                          id: newId,
                          icon: "facebook",
                          url: "https://facebook.com",
                        },
                      ],
                    }));
                    startEditing(
                      "socialLink",
                      newId,
                      "url",
                      "https://facebook.com"
                    );
                  }}
                  className="text-xs bg-green-500 text-white rounded-full p-1"
                >
                  +
                </button>
              )}
            </div>
          </div>
          <div className="flex space-x-6">
            {config.topLinks.map((link) => (
              <div key={link.id} className="relative group">
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-white text-sm"
                >
                  {link.name}
                </Link>
                {isAdmin && (
                  <div className="absolute -top-2 -right-2 flex space-x-1">
                    <button
                      onClick={() =>
                        startEditing("topLink", link.id, "name", link.name)
                      }
                      className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <FaEdit size={10} />
                    </button>
                    <button
                      onClick={() =>
                        startEditing("topLink", link.id, "to", link.to)
                      }
                      className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <FaEdit size={10} />
                    </button>
                    <button
                      onClick={() => deleteItem("topLink", link.id)}
                      className="text-xs bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <button
                onClick={() => {
                  const newId = Date.now().toString();
                  setConfig((prev) => ({
                    ...prev,
                    topLinks: [
                      ...prev.topLinks,
                      { id: newId, name: "New Link", to: "#" },
                    ],
                  }));
                  startEditing("topLink", newId, "name", "New Link");
                }}
                className="text-xs bg-green-500 text-white rounded-full p-1"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-lg z-50" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="relative group">
              <Link to="/" className="w-40">
                <img
                  src={config.logo}
                  alt="Company Logo"
                  className="h-10 object-contain"
                />
              </Link>
              {isAdmin && (
                <button
                  onClick={() =>
                    startEditing("config", "logo", "logo", config.logo)
                  }
                  className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                >
                  <FaEdit size={10} />
                </button>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {config.mainNav.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className="flex items-center py-2 px-3 hover:text-red-400 transition-colors"
                    >
                      {item.title}
                      {item.subItems && (
                        <FaChevronDown className="ml-1 text-xs opacity-70 group-hover:opacity-100" />
                      )}
                    </Link>
                    {isAdmin && (
                      <div className="flex space-x-1 ml-1">
                        <button
                          onClick={() =>
                            startEditing(
                              "mainNav",
                              item.id,
                              "title",
                              item.title
                            )
                          }
                          className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          <FaEdit size={10} />
                        </button>
                        <button
                          onClick={() =>
                            startEditing("mainNav", item.id, "href", item.href)
                          }
                          className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          <FaEdit size={10} />
                        </button>
                        <button
                          onClick={() => addNewSubItem(item.id)}
                          className="text-xs bg-green-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => deleteItem("mainNav", item.id)}
                          className="text-xs bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mega Menu */}
                  {item.subItems && (
                    <div className="absolute left-0 mt-0 w-screen max-w-6xl bg-white/90 backdrop-blur-md shadow-xl rounded-b-lg p-6 grid grid-cols-4 gap-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.id} className="group relative">
                          <Link
                            to={subItem.href}
                            className="group flex flex-col items-center text-center"
                          >
                            <div className="w-full h-32 mb-2 overflow-hidden rounded-lg">
                              <img
                                src={subItem.img}
                                alt={subItem.text}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <span className="text-gray-800 font-medium group-hover:text-red-600">
                              {subItem.text}
                            </span>
                          </Link>
                          {isAdmin && (
                            <div className="absolute top-0 right-0 flex space-x-1">
                              <button
                                onClick={() =>
                                  startEditing(
                                    "subItem",
                                    subItem.id,
                                    "text",
                                    subItem.text,
                                    item.id
                                  )
                                }
                                className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                              >
                                <FaEdit size={10} />
                              </button>
                              <button
                                onClick={() =>
                                  startEditing(
                                    "subItem",
                                    subItem.id,
                                    "href",
                                    subItem.href,
                                    item.id
                                  )
                                }
                                className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                              >
                                <FaEdit size={10} />
                              </button>
                              <button
                                onClick={() =>
                                  startEditing(
                                    "subItem",
                                    subItem.id,
                                    "img",
                                    subItem.img,
                                    item.id
                                  )
                                }
                                className="text-xs bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                              >
                                <FaEdit size={10} />
                              </button>
                              <button
                                onClick={() =>
                                  deleteItem("subItem", subItem.id, item.id)
                                }
                                className="text-xs bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                              >
                                <FaTimes size={10} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {isAdmin && (
                        <button
                          onClick={() => addNewSubItem(item.id)}
                          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-100"
                        >
                          <span className="text-gray-500">
                            + Add New Subitem
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isAdmin && (
                <button
                  onClick={addNewNavItem}
                  className="flex items-center text-white px-3 py-2 border border-dashed border-white rounded-lg"
                >
                  <span>+ Add Menu</span>
                </button>
              )}
            </nav>

            {/* Admin Toggle Button (Mobile) */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={toggleAdminMode}
                className={`text-sm px-2 py-1 rounded ${
                  isAdmin ? "bg-red-600" : "bg-blue-600"
                } text-white`}
              >
                {isAdmin ? "Exit Admin" : "Admin"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <Link to="/" className="w-32">
              <img
                src={config.logo}
                alt="Company Logo"
                className="h-8 object-contain"
              />
            </Link>
            <button onClick={toggleMobileMenu} className="text-white p-1">
              <IoClose size={24} />
            </button>
          </div>

          <div className="h-[calc(100%-60px)] overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {config.mainNav.map((item) => (
                  <li key={item.id}>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleSubmenu(`menu-${item.id}`)}
                          className="flex-1 flex justify-between items-center py-3 px-2 hover:bg-gray-800 rounded-lg"
                        >
                          <span>{item.title}</span>
                          {item.subItems &&
                            (expandedMenus[`menu-${item.id}`] ? (
                              <FaChevronUp size={12} />
                            ) : (
                              <FaChevronDown size={12} />
                            ))}
                        </button>
                        {isAdmin && (
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={() =>
                                startEditing(
                                  "mainNav",
                                  item.id,
                                  "title",
                                  item.title
                                )
                              }
                              className="text-blue-400 p-1"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => addNewSubItem(item.id)}
                              className="text-green-400 p-1"
                            >
                              +
                            </button>
                            <button
                              onClick={() => deleteItem("mainNav", item.id)}
                              className="text-red-400 p-1"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        )}
                      </div>

                      {item.subItems && (
                        <div
                          className={`pl-4 overflow-hidden transition-all duration-300 ${
                            expandedMenus[`menu-${item.id}`]
                              ? "max-h-screen py-2"
                              : "max-h-0"
                          }`}
                        >
                          <ul className="space-y-2">
                            {item.subItems.map((subItem) => (
                              <li
                                key={subItem.id}
                                className="flex items-center"
                              >
                                <Link
                                  to={subItem.href}
                                  onClick={toggleMobileMenu}
                                  className="flex-1 flex items-center py-2 px-2 hover:bg-gray-800 rounded-lg"
                                >
                                  <img
                                    src={subItem.img}
                                    alt={subItem.text}
                                    className="w-8 h-8 rounded mr-3 object-cover"
                                  />
                                  <span>{subItem.text}</span>
                                </Link>
                                {isAdmin && (
                                  <div className="flex space-x-1 ml-2">
                                    <button
                                      onClick={() =>
                                        startEditing(
                                          "subItem",
                                          subItem.id,
                                          "text",
                                          subItem.text,
                                          item.id
                                        )
                                      }
                                      className="text-blue-400 p-1"
                                    >
                                      <FaEdit size={10} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        deleteItem(
                                          "subItem",
                                          subItem.id,
                                          item.id
                                        )
                                      }
                                      className="text-red-400 p-1"
                                    >
                                      <FaTimes size={10} />
                                    </button>
                                  </div>
                                )}
                              </li>
                            ))}
                            {isAdmin && (
                              <li>
                                <button
                                  onClick={() => {
                                    addNewSubItem(item.id);
                                    toggleSubmenu(`menu-${item.id}`);
                                  }}
                                  className="w-full text-left py-2 px-2 text-gray-400 hover:text-white"
                                >
                                  + Add Subitem
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <button
                      onClick={() => {
                        addNewNavItem();
                        toggleMobileMenu();
                      }}
                      className="w-full text-left py-3 px-2 text-gray-400 hover:text-white border-t border-gray-700"
                    >
                      + Add New Menu Item
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                {config.socialLinks.map((link) => (
                  <div key={link.id} className="relative">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600"
                    >
                      {renderSocialIcon(link.icon)}
                    </a>
                    {isAdmin && (
                      <div className="absolute -top-2 -right-2 flex space-x-1">
                        <button
                          onClick={() =>
                            startEditing("socialLink", link.id, "url", link.url)
                          }
                          className="text-xs bg-blue-500 text-white rounded-full p-1"
                        >
                          <FaEdit size={10} />
                        </button>
                        <button
                          onClick={() => deleteItem("socialLink", link.id)}
                          className="text-xs bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {isAdmin && (
                  <button
                    onClick={() => {
                      const newId = Date.now().toString();
                      setConfig((prev) => ({
                        ...prev,
                        socialLinks: [
                          ...prev.socialLinks,
                          {
                            id: newId,
                            icon: "facebook",
                            url: "https://facebook.com",
                          },
                        ],
                      }));
                    }}
                    className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600"
                  >
                    +
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsWhatsAppPopupOpen(true);
                    toggleMobileMenu();
                  }}
                  className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600"
                >
                  <FaWhatsapp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Popup */}
      {isQuotePopupOpen && (
        <div className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Request a Quote
              </h3>
              <button
                onClick={() => setIsQuotePopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <form onSubmit={validateForm}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Company name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Tell us about your project"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Popup */}
      {isWhatsAppPopupOpen && (
        <div className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">WhatsApp Chat</h3>
              <button
                onClick={() => setIsWhatsAppPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Connect with us instantly on WhatsApp for quick assistance.
            </p>

            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              Start Chat
            </a>
            {isAdmin && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={config.whatsappNumber}
                    onChange={(e) => {
                      setConfig((prev) => ({
                        ...prev,
                        whatsappNumber: e.target.value,
                      }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => {
                      // In a real app, you would save this to your backend
                      // For this frontend-only version, it's already saved in state
                    }}
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">
              Edit {editingItem.field}{" "}
              {editingItem.type === "subItem" ? "(Subitem)" : ""}
            </h3>
            <input
              type="text"
              value={editingItem.value || ""}
              onChange={(e) =>
                setEditingItem((prev) => ({
                  ...prev!,
                  value: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <FaSave className="inline mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Toggle Button (Desktop) */}
      {!isAdmin && (
        <button
          onClick={toggleAdminMode}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
          title="Enable Admin Mode"
        >
          <FaEdit size={20} />
        </button>
      )}
    </>
  );
};

export default NavDashboard;
