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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [buttonText, setButtonText] = useState("Send");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleQuotePopup = () => {
    setIsQuotePopupOpen(!isQuotePopupOpen);
    if (!isQuotePopupOpen) {
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setErrors({});
      setButtonText("Send");
    }
  };

  const toggleWhatsAppPopup = () => {
    setIsWhatsAppPopupOpen(!isWhatsAppPopupOpen);
  };

  const validateForm = async (e: React.FormEvent) => {
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
      try {
        setIsSubmitting(true);
        setButtonText("Sending...");

        const response = await fetch(
          "https://formsubmit.co/ajax/info@jaikviktechnology.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ...formData,
              _subject: "New Quote Request",
              _template: "table",
              _captcha: "false",
            }),
          }
        );

        const data = await response.json();

        if (data.success === "true") {
          toast.success("Quote request sent successfully!");
          setButtonText("Sent!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          });
          setTimeout(() => {
            setButtonText("Send");
            toggleQuotePopup();
          }, 2000);
        } else {
          throw new Error(data.message || "Failed to send request");
        }
      } catch (error) {
        console.error("Submission error:", error);
        // Narrow the type of error to safely access message
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.";
        toast.error(errorMessage);
        setButtonText("Error!");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setButtonText("Send"), 2000);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
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
                disabled={isSubmitting}
              >
                <span className="relative z-10">Get a Quote</span>
              </button>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
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
                    <button
                      onClick={toggleWhatsAppPopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-gray-700">Connect with us instantly!</p>
                  <a
                    href="https://wa.me/9220826934"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 text-white text-sm font-medium py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> Start Chat
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
                    <button
                      onClick={toggleQuotePopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={validateForm}>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        name="phone"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.phone ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="company"
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                        id="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        name="message"
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30 resize-y"
                        id="message"
                        placeholder="Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium py-2 rounded-md transition-all ${
                        buttonText === "Sent!"
                          ? "bg-green-500"
                          : buttonText === "Error!"
                          ? "bg-red-500"
                          : "hover:from-gray-900 hover:to-gray-700 hover:-translate-y-0.5"
                      }`}
                      disabled={isSubmitting}
                    >
                      {buttonText}
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default NavLayerTop;
