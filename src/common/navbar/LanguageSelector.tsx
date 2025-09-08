import React, { useState, useRef, useEffect } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import ISO6391 from "iso-639-1";

// ✅ Country type
interface Country {
  code: string;
  name: string;
  Flag?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  langCode: string;
}

// ✅ Generate all world languages (ISO 639-1)
const countries: Country[] = ISO6391.getAllCodes().map((code) => {
  const Flag = (Flags as any)[code.toUpperCase()];
  return {
    code: code.toUpperCase(),
    name: ISO6391.getNativeName(code),
    Flag: Flag || undefined,
    langCode: code,
  };
});

// ✅ Default = English
const defaultLang = countries.find((c) => c.langCode === "en") || countries[0];

const LanguageSelector: React.FC = () => {
  const [selected, setSelected] = useState<Country>(defaultLang);
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ Load saved language from localStorage (on mount)
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang) {
      const found = countries.find((c) => c.langCode === savedLang);
      if (found) setSelected(found);
    }
  }, []);

  // ✅ Save language whenever it changes
  useEffect(() => {
    if (selected?.langCode) {
      localStorage.setItem("selectedLang", selected.langCode);
    }
  }, [selected]);

  // ✅ Load Google Translate script
  useEffect(() => {
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Sync with Google Translate dropdown
  useEffect(() => {
    const interval = setInterval(() => {
      const select =
        document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        // Listener for language change
        select.addEventListener("change", () => {
          const newLang = select.value;
          const found = countries.find((c) => c.langCode === newLang);
          if (found) setSelected(found);
        });

        // ✅ On first load, apply saved language
        const savedLang = localStorage.getItem("selectedLang");
        if (savedLang) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }

        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Change Language
  const changeLanguage = (country: Country) => {
    setSelected(country);
    setOpen(false);

    const tryChange = () => {
      const select =
        document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = country.langCode;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }
      return false;
    };

    if (!tryChange()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (tryChange() || attempts > 20) clearInterval(interval);
      }, 500);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden Google Translate */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-black rounded-md shadow text-white"
      >
        {selected.Flag ? (
          <selected.Flag className="w-6 h-4" />
        ) : (
          <span>🌐</span>
        )}
        <span>{selected.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 max-h-64 overflow-y-auto w-56 bg-black text-white border rounded-md shadow-lg z-50">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => changeLanguage(country)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
            >
              {country.Flag ? (
                <country.Flag className="w-6 h-4" />
              ) : (
                <span>🌐</span>
              )}
              {country.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
