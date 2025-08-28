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
  // Try to find a matching flag (based on country code)
  const Flag = (Flags as any)[code.toUpperCase()];
  return {
    code: code.toUpperCase(),
    name: ISO6391.getNativeName(code), // Native name
    Flag: Flag || undefined, // Some languages don’t have flags
    langCode: code,
  };
});

const LanguageSelector: React.FC = () => {
  const [selected, setSelected] = useState<Country>(countries[0]);
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-black rounded-md shadow"
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
        <div className="absolute mt-2 max-h-64 overflow-y-auto w-56 bg-black border rounded-md shadow-lg z-50">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => changeLanguage(country)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-500 w-full text-right"
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
