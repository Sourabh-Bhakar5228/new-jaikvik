import { Link } from "react-router-dom";
import {
  digitalMarketingItems,
  filmProductionItems,
  seoServiceItems,
  softwareDevelopmentItems,
  websiteDevelopmentItems,
} from "../../configs/navConfigs";
import type navmenuInterface from "../../interfaces/navmenuInterface";
import NavMenu from "./NavMenu";

// 🔑 Import your LanguageSelector (flag-based)
import LanguageSelector from "./LanguageSelector"; // <-- apni file ka path sahi karein

const NavLayerBottom: React.FC<{
  isSticky: boolean;
}> = ({ isSticky = false }) => {
  const dropdowns: navmenuInterface[] = [
    {
      title: "Software Development",
      menu: softwareDevelopmentItems,
      href: "/coustmised-software", // typo fixed
    },
    {
      title: "Website Development",
      menu: websiteDevelopmentItems,
      href: "/web-development",
    },
    {
      title: "Digital Marketing",
      menu: digitalMarketingItems,
      href: "/digital-marketing",
    },
    {
      title: "Google SEO Services",
      menu: seoServiceItems,
      href: "/seo-services",
    },
    {
      title: "Film Production",
      menu: filmProductionItems,
      href: "/film-production",
    },
  ];

  return (
    <>
      <div
        className={`header-main transition-all shadow-xs shadow-neutral-950 duration-1000 font-poppins ${
          isSticky
            ? "fixed top-0 left-0 w-full z-[99] shadow-md bg-gray-900 animate-[sticky_1s]"
            : ""
        }`}
      >
        <div className="px-4 py-2 w-full laptop-view flex items-center justify-between">
          {/* Left - Logo + Menus */}
          <div className="main-menu flex gap-2">
            <div className="w-1/12 pt-1">
              <Link to="/">
                <img
                  src="https://jaikvik.com/lab/new-post-video/img/logo/logo-1.png"
                  alt="Logo"
                  className="w-full"
                />
              </Link>
            </div>
            <ul className="flex items-center text-[16px] list-none">
              {dropdowns.map((item, index) => (
                <NavMenu key={index} {...item} />
              ))}
            </ul>
          </div>

          {/* Right - Language Selector with flags */}
          <ul className="flex items-center list-none relative">
            <li className="ml-auto">
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavLayerBottom;
