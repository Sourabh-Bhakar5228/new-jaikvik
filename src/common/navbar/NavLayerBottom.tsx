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

const NavLayerBottom: React.FC<{
  isSticky: boolean;
  isTranslatePopupOpen: boolean;
  setIsTranslatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isSticky = false,
  setIsTranslatePopupOpen,
  isTranslatePopupOpen = false,
}) => {
  const dropdowns: navmenuInterface[] = [
    {
      title: "Software Development",
      menu: softwareDevelopmentItems,
      href: "/coustmised-software", // Fixed typo from "coustmised" to "customised"
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

  const toggleTranslateDropdown = () => {
    setIsTranslatePopupOpen((prev) => {
      const next = !prev;
      if (!prev) {
        setTimeout(() => {
          const select = document.querySelector(
            "#google_translate_element_popup select"
          ) as HTMLSelectElement;
          if (select) {
            select.focus();
          }
        }, 100);
      }
      return next;
    });
  };

  return (
    <>
      <div
        className={`header-main transition-all shadow-xs  shadow-neutral-950 duration-1000 font-poppins ${
          isSticky
            ? "fixed top-0 left-0 w-full z-[99] shadow-md bg-gray-900 animate-[sticky_1s]"
            : ""
        }`}
      >
        <div className="px-4 py-2 w-full laptop-view flex items-center justify-between">
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
            <ul className="flex items-center  text-[16px] list-none">
              {dropdowns.map((item, index) => (
                <NavMenu key={index} {...item} />
              ))}
            </ul>
          </div>
          <ul className="flex items-center list-none">
            <li className="language-menu ml-auto  ">
              <Link
                to="/"
                onClick={toggleTranslateDropdown}
                className="text-red-500 uppercase px-2.5  text-[15px] py-2.5 hover:text-red-700"
              >
                Language
              </Link>
              {isTranslatePopupOpen && (
                <div
                  id="google_translate_element_popup"
                  className="translate-popup absolute bg-white shadow-md p-4 mt-2 rounded"
                >
                  <select className="border border-gray-300 rounded p-1">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    {/* Add more languages as needed */}
                  </select>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavLayerBottom;
