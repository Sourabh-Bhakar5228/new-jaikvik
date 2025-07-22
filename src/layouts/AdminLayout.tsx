import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Navigation,
  Footprints,
  Image,
  Film,
  Mail,
  List,
  Plus,
  HelpCircle,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href: string;
  badge?: number;
  children?: MenuItem[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "error";
  unread: boolean;
}

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
    },
    {
      id: "website-sections",
      label: "Website Sections",
      icon: <List size={20} />,
      href: "/admin/website-sections",
      children: [
        {
          id: "navbar",
          label: "Navbar",
          icon: <Navigation size={18} />,
          href: "/admin/website-sections/navbar",
        },
        {
          id: "footer",
          label: "Footer",
          icon: <Footprints size={18} />,
          href: "/admin/website-sections/footer",
        },
      ],
    },
    {
      id: "home",
      label: "Home Page",
      icon: <Home size={20} />,
      href: "/admin/home",
      children: [
        {
          id: "hero-section",
          label: "Hero Section",
          href: "/admin/home/hero-section",
          icon: <Image size={18} />,
        },
        {
          id: "banners",
          label: "Banners",
          href: "/admin/home/banners",
          icon: <Image size={18} />,
        },
        {
          id: "corporate-video",
          label: "Corporate Video",
          href: "/admin/home/corporate-video",
          icon: <Film size={18} />,
        },
        {
          id: "services-section",
          label: "Services Section",
          href: "/admin/home/services-section",
          icon: <Settings size={18} />,
        },
        {
          id: "enquiry-section",
          label: "Enquiry Section",
          href: "/admin/home/enquiry-section",
          icon: <Mail size={18} />,
        },
        {
          id: "reels",
          label: "Reels",
          href: "/admin/home/reels",
          icon: <Film size={18} />,
        },
        {
          id: "video",
          label: "Video",
          href: "/admin/home/video",
          icon: <Film size={18} />,
        },
        {
          id: "testimonial-video",
          label: "Testimonial Video",
          href: "/admin/home/testimonial-video",
          icon: <Film size={18} />,
        },
        {
          id: "website",
          label: "Website",
          href: "/admin/home/website",
          icon: <Image size={18} />,
        },
        {
          id: "social-media-post",
          label: "Social Media Post",
          href: "/admin/home/social-media-post",
          icon: <Image size={18} />,
        },
        {
          id: "our-team",
          label: "Our Team",
          href: "/admin/home/our-team",
          icon: <Users size={18} />,
        },
        {
          id: "our-clients",
          label: "Our Clients",
          href: "/admin/home/our-clients",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      id: "about-us",
      label: "About Us",
      icon: <Users size={20} />,
      href: "/admin/about-us",
    },
    {
      id: "blogs",
      label: "Blogs",
      icon: <FileText size={20} />,
      href: "/admin/blogs",
    },
    {
      id: "careers",
      label: "Careers",
      icon: <BarChart3 size={20} />,
      href: "/admin/careers",
    },
    {
      id: "contact-us",
      label: "Contact Us",
      icon: <MessageSquare size={20} />,
      href: "/admin/contact-us",
    },
    {
      id: "services",
      label: "Services",
      icon: <Settings size={20} />,
      href: "/admin/services",
      children: [
        {
          id: "software-development",
          label: "Software Development",
          href: "/admin/services/software-development",
          children: [
            {
              id: "crm-software",
              label: "CRM Software",
              href: "/admin/services/software-development/crm-software",
            },
            {
              id: "mobile-application",
              label: "Mobile Application",
              href: "/admin/services/software-development/mobile-application",
            },
            {
              id: "erp-software",
              label: "ERP Software",
              href: "/admin/services/software-development/erp-software",
            },
            {
              id: "customization-software",
              label: "Customization Software",
              href: "/admin/services/software-development/customization-software",
            },
          ],
        },
        {
          id: "web-development",
          label: "Web Development",
          href: "/admin/services/web-development",
        },
        {
          id: "digital-marketing",
          label: "Digital Marketing",
          href: "/admin/services/digital-marketing",
          children: [
            {
              id: "social-media-marketing",
              label: "Social Media Marketing",
              href: "/admin/services/digital-marketing/social-media-marketing",
            },
            {
              id: "youtube-meta-ads",
              label: "YouTube and Meta Ads",
              href: "/admin/services/digital-marketing/youtube-meta-ads",
            },
            {
              id: "brand-promotion",
              label: "Brand Promotion",
              href: "/admin/services/digital-marketing/brand-promotion",
            },
          ],
        },
        {
          id: "google-seo-services",
          label: "Google SEO Services",
          href: "/admin/services/google-seo-services",
        },
        {
          id: "film-production",
          label: "Film Production",
          href: "/admin/services/film-production",
        },
      ],
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Order",
      message: "Order #1234 has been placed",
      time: "2 min ago",
      type: "success",
      unread: true,
    },
    {
      id: "2",
      title: "Server Alert",
      message: "High CPU usage detected",
      time: "5 min ago",
      type: "warning",
      unread: true,
    },
    {
      id: "3",
      title: "User Registration",
      message: "New user registered",
      time: "10 min ago",
      type: "info",
      unread: false,
    },
    {
      id: "4",
      title: "Maintenance Scheduled",
      message: "System maintenance planned for tomorrow",
      time: "1 hour ago",
      type: "info",
      unread: false,
    },
    {
      id: "5",
      title: "New Feature Added",
      message: "Check out the new analytics dashboard",
      time: "3 hours ago",
      type: "success",
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-600/20 text-green-400";
      case "warning":
        return "bg-yellow-600/20 text-yellow-400";
      case "error":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-blue-600/20 text-blue-400";
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isSubmenuActive = (item: MenuItem): boolean => {
    if (location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some(
        (child) =>
          child.href === location.pathname ||
          (child.children &&
            child.children.some(
              (subChild) => subChild.href === location.pathname
            ))
      );
    }
    return false;
  };

  const isSubmenuOpen = (id: string) => {
    const item = menuItems
      .flatMap((item) => [item, ...(item.children || [])])
      .find((item) => item.id === id);
    return openSubmenus[id] || (item && isSubmenuActive(item)) || false;
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-black text-gray-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-black shadow-2xl border-r border-red-900/50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-16"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div
          className={`flex items-center h-16 px-4 bg-red-900 ${
            sidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <img
                src="https://jaikvik.com/lab/new-post-video/img/rotate-3.png"
                alt="Company Logo"
                className="h-8 w-8 rounded-full border border-red-600"
              />
              <h1 className="text-lg font-semibold text-red-400">
                Jaikvik Technology
              </h1>
            </div>
          ) : (
            <img
              src="https://jaikvik.com/lab/new-post-video/img/rotate-3.png"
              alt="Company Logo"
              className="h-8 w-8 rounded-full border border-red-600"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="text-red-400 hover:bg-red-800/50 p-1 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6 px-2 h-[calc(100%-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div className="relative">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center ${
                        sidebarOpen
                          ? "justify-between px-3 py-2"
                          : "justify-center p-3"
                      } rounded-lg transition-all duration-200 ${
                        isActive || isSubmenuActive(item)
                          ? "bg-red-900/50 text-red-400"
                          : "text-gray-200 hover:bg-red-900/30 hover:text-red-400"
                      }`
                    }
                    onClick={(e) => {
                      if (item.children && sidebarOpen) {
                        toggleSubmenu(item.id, e);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && <span>{item.icon}</span>}
                      {sidebarOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {sidebarOpen && item.children && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isSubmenuOpen(item.id) ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {sidebarOpen && item.badge && (
                      <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>

                  {sidebarOpen && item.children && isSubmenuOpen(item.id) && (
                    <ul className="ml-4 mt-1 pl-4 border-l border-red-900 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <div className="relative">
                            <NavLink
                              to={child.href}
                              className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                                  isActive || isSubmenuActive(child)
                                    ? "bg-red-900/40 text-red-400"
                                    : "text-gray-300 hover:bg-red-900/20 hover:text-red-400"
                                }`
                              }
                              onClick={(e) => {
                                if (child.children && sidebarOpen) {
                                  toggleSubmenu(child.id, e);
                                }
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                {child.icon && <span>{child.icon}</span>}
                                <span>{child.label}</span>
                              </div>
                              {child.children && (
                                <ChevronRight
                                  size={14}
                                  className={`transition-transform duration-200 ${
                                    isSubmenuOpen(child.id) ? "rotate-90" : ""
                                  }`}
                                />
                              )}
                            </NavLink>

                            {child.children && isSubmenuOpen(child.id) && (
                              <ul className="ml-4 pl-4 border-l border-red-900 space-y-1">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    <NavLink
                                      to={subChild.href}
                                      className={({ isActive }) =>
                                        `block px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                                          isActive
                                            ? "bg-red-900/30 text-red-400"
                                            : "text-gray-300 hover:bg-red-900/20 hover:text-red-400"
                                        }`
                                      }
                                    >
                                      {subChild.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile in Sidebar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 ${
            sidebarOpen ? "px-4" : "px-2"
          }`}
        >
          <div
            className={`flex items-center space-x-3 p-3 bg-red-900/50 rounded-lg ${
              sidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border border-red-500">
              <User size={20} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-400 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">
                  admin@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-black shadow-sm border-b border-red-900">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-red-400 lg:hidden"
              >
                <Menu size={24} />
              </button>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-red-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-64 bg-black text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Action Button */}
              <button className="hidden md:flex items-center space-x-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                <Plus size={16} />
                <span>New Content</span>
              </button>

              {/* Help Button */}
              <button className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors duration-200">
                <HelpCircle size={20} />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsOpen(!notificationsOpen);
                  }}
                  className="relative p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-black rounded-lg shadow-xl border border-red-900 z-50">
                    <div className="p-4 border-b border-red-900 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-red-400">
                        Notifications
                      </h3>
                      <button className="text-xs text-red-400 hover:text-red-300">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-red-900 hover:bg-red-900/20 ${
                            notification.unread ? "bg-red-900/10" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getNotificationColor(
                                notification.type
                              )}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-red-400">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 rounded-full bg-red-600 mt-1 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-red-900">
                      <button
                        onClick={() => {
                          // Navigate to full notifications page
                          navigate("/admin/notifications");
                          // setIsOpen(false); // Close dropdown
                        }}
                        className="w-full py-2 text-red-400 hover:text-red-300 text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      >
                        <span>View All Notifications</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                  className="flex items-center space-x-2 p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border border-red-500">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl border border-red-900 z-50">
                    <div className="p-2">
                      <div className="px-4 py-2 text-sm text-gray-300">
                        <p className="font-medium">Admin User</p>
                        <p className="text-xs text-gray-400 truncate">
                          admin@example.com
                        </p>
                      </div>
                      <hr className="my-1 border-red-900" />
                      <NavLink
                        to="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded"
                      >
                        Your Profile
                      </NavLink>
                      <NavLink
                        to="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded"
                      >
                        Settings
                      </NavLink>
                      <hr className="my-1 border-red-900" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Dynamic Page Title */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-red-400">
                  {location.pathname === "/admin"
                    ? "Dashboard"
                    : menuItems
                        .flatMap((item) => [item, ...(item.children || [])])
                        .flatMap((item) => [item, ...(item.children || [])])
                        .find((item) => item.href === location.pathname)
                        ?.label || "Dashboard"}
                </h1>
                <p className="text-gray-400 mt-1 capitalize">
                  {location.pathname === "/admin"
                    ? "Overview of your admin dashboard"
                    : `Manage your ${location.pathname
                        .split("/")
                        .pop()
                        ?.replace(/-/g, " ")}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-lg transition-colors duration-200 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  <span>Help</span>
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center">
                  <Plus size={16} className="mr-2" />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            {/* Page Content */}
            <div className="bg-black/50 border border-red-900/30 rounded-xl p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Click outside handlers */}
      {notificationsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotificationsOpen(false)}
        />
      )}
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
