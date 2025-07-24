import { useState, useRef } from "react";
import "../../styles/enquire-form.css";

interface FormData {
  fname: string;
  phone: string;
  email: string;
  resume: File | null;
  position: string;
  msg: string;
}

const CareerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    phone: "",
    email: "",
    resume: null,
    position: "",
    msg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.resume) {
      setSubmitStatus({
        success: false,
        message: "Please upload your resume",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fname);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("message", formData.msg);
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("_subject", "New Job Application");
      formDataToSend.append("_template", "table");
      formDataToSend.append("_captcha", "false");

      const response = await fetch(
        "https://formsubmit.co/ajax/bhakarsoursbh@gmail.com",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Application submitted successfully!",
        });
        // Reset form
        setFormData({
          fname: "",
          phone: "",
          email: "",
          resume: null,
          position: "",
          msg: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error(data.message || "Failed to submit application");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {submitStatus && (
        <div
          className={`mb-4 p-3 rounded ${
            submitStatus.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="relative">
          <div className="input-contain">
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="fname" className="placeholder-text">
              Full Name
            </label>
          </div>
        </div>

        {/* Phone Field */}
        <div className="relative">
          <div className="input-contain">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="phone" className="placeholder-text">
              Phone Number
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div className="relative sm:col-span-2">
          <div className="input-contain">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="email" className="placeholder-text">
              Email Address
            </label>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="sm:col-span-2">
          <label className="block text-white mb-2">
            Upload Resume (PDF, DOC, JPG, PNG) *
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            required
            className="w-full file:mr-4 file:py-2 file:px-4 file:bg-red-600 file:border-0 file:text-white file:cursor-pointer"
          />
        </div>

        {/* Position Field */}
        <div className="relative sm:col-span-2">
          <div className="input-contain">
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="position" className="placeholder-text">
              Position Applied For
            </label>
          </div>
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2">
          <textarea
            id="msg"
            name="msg"
            rows={4}
            value={formData.msg}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full border border-white px-4 py-2 bg-transparent text-white focus:border-red-600 focus:outline-none placeholder-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-red-600 text-white py-2 px-4 font-semibold hover:scale-90 transition-transform duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CareerForm;
