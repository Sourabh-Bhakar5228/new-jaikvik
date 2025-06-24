import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { navlinks } from "../../configs/navConfigs";
import NavLink from "./NavLink";
// Define interfaces for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const NavLayerTop = () => {
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Toggle functions
  const toggleQuotePopup = () => {
    setIsQuotePopupOpen(!isQuotePopupOpen);
    if (!isQuotePopupOpen) {
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setErrors({});
    }
  };

  const toggleWhatsAppPopup = () => {
    setIsWhatsAppPopupOpen(!isWhatsAppPopupOpen);
  };

  // Form validation
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      toggleQuotePopup();
    }
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div className="bg-main-secondary hidden lg:block font-poppins">
        <div className="mx-auto px-4">
          <div className="flex items-center h-[45px]">
            <div className="flex items-center space-x-1">
              <button
                className="quote-btn relative bg-gray-800 text-white px-2.5 py-1 rounded-md text-xs font-bold transition-transform duration-300 cursor-pointer hover:bg-gray-700 hover:scale-105 uppercase hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                onClick={toggleQuotePopup}
              >
                <span className="relative z-10">Get a Quote</span>
              </button>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://facebook.com"
                target="_blank"
              >
                <FaFacebookF />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://twitter.com"
                target="_blank"
              >
                <FaTwitter />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://instagram.com"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://linkedin.com"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="#"
                onClick={toggleWhatsAppPopup}
              >
                <FaWhatsapp />
              </a>
              <div id="google_translate_element" className="hidden"></div>
              {/* WhatsApp Popup */}
              <div
                id="whatsapp_popup"
                className={`popup fixed inset-0 bg-gray-600/60 backdrop-blur-sm z-[1000] ${
                  isWhatsAppPopupOpen ? "flex" : "hidden"
                } justify-center items-center`}
              >
                <div className="popup-content bg-gradient-to-br from-gray-600 to-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl animate-[slideIn_0.3s_ease-out]">
                  <div className="flex justify-between items-center mb-3">
                    <h6 className="text-lg font-semibold text-gray-900">
                      WhatsApp Chat
                    </h6>
                    <a
                      href="#"
                      onClick={toggleWhatsAppPopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                    >
                      ×
                    </a>
                  </div>
                  <p className="text-gray-700">Connect with us instantly!</p>
                  <a
                    href="https://wa.me/8307802850"
                    target="_blank"
                    className="block w-full bg-green-500 text-white text-sm font-medium py-2 rounded-md hover:bg-green-600"
                  >
                    <FaWhatsapp className="inline mr-1" /> Start Chat
                  </a>
                </div>
              </div>
              {/* Quote Popup */}
              <div
                id="quote_popup"
                className={`popup fixed inset-0 bg-gray-600/60 backdrop-blur-sm z-[1000] ${
                  isQuotePopupOpen ? "flex" : "hidden"
                } justify-center items-center`}
              >
                <div className="popup-content bg-gradient-to-br from-gray-600 to-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl animate-[slideIn_0.3s_ease-out]">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="text-xl font-semibold text-gray-900">
                      Request a Quote
                    </h6>
                    <a
                      href="#"
                      onClick={toggleQuotePopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                    >
                      ×
                    </a>
                  </div>
                  <form id="quoteForm" onSubmit={validateForm}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <div
                        className={`error-message text-red-500 text-xs mt-1 ${
                          errors.name ? "block" : "hidden"
                        }`}
                        id="nameError"
                      >
                        {errors.name}
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <div
                        className={`error-message text-red-500 text-xs mt-1 ${
                          errors.email ? "block" : "hidden"
                        }`}
                        id="emailError"
                      >
                        {errors.email}
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.phone ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <div
                        className={`error-message text-red-500 text-xs mt-1 ${
                          errors.phone ? "block" : "hidden"
                        }`}
                        id="phoneError"
                      >
                        {errors.phone}
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                        id="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30 resize-y"
                        id="message"
                        placeholder="Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      <div
                        className={`error-message text-red-500 text-xs mt-1 ${
                          errors.message ? "block" : "hidden"
                        }`}
                        id="messageError"
                      >
                        {errors.message}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium py-2 rounded-md hover:from-gray-900 hover:to-gray-700 hover:-translate-y-0.5"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-1">
                {navlinks.map((item, index) => (
                  <NavLink key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavLayerTop;
