import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
  FaPhone,
  FaEdit,
  FaLock,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Define types for our data structures
type SocialLink = {
  platform: string;
  url: string;
};

type LinkItem = {
  name: string;
  url: string;
};

type ContactInfo = {
  offices: string[];
  email: string;
  phones: string[];
};

type FooterData = {
  description: string;
  socialLinks: SocialLink[];
  usefulLinks: LinkItem[];
  services: LinkItem[];
  contactInfo: ContactInfo;
  copyright: string;
};

type EditValues = FooterData;

type EditingState = {
  description: boolean;
  socialLinks: boolean;
  usefulLinks: boolean;
  services: boolean;
  contactInfo: boolean;
  copyright: boolean;
};

// Utility function to get social icon component
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <FaFacebookF />;
    case "instagram":
      return <FaInstagram />;
    case "twitter":
      return <FaXTwitter />;
    case "youtube":
      return <FaYoutube />;
    case "linkedin":
      return <FaLinkedinIn />;
    default:
      return <FaFacebookF />;
  }
};

const AdminFooterPanel = () => {
  // Initial state for footer data
  const [footerData, setFooterData] = useState<FooterData>({
    description:
      "Welcome to Jaikvik Technology India Private Limited, We utilise our experience and world-class knowledge to help businesses reach at their full online and digital potentials also ensure a steady growth. For this, there is a team of highly dedicated and 'self-confessed' digital marketing geeks",
    socialLinks: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/jaikviktechnology",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/jaikviktechnology/",
      },
      {
        platform: "twitter",
        url: "https://twitter.com/jaikvik",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/@jaikviktechnology",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/jaikviktechnology/",
      },
    ],
    usefulLinks: [
      { name: "About Us", url: "/about" },
      { name: "Portfolio", url: "/portfolio" },
      { name: "Our Blogs", url: "/blogs" },
      { name: "Career", url: "/careers" },
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Contact Us", url: "/contact-us" },
    ],
    services: [
      { name: "Digital Marketing", url: "/digital-marketing" },
      { name: "Software Development", url: "/coustmised-software" },
      { name: "Film Making", url: "/film-production" },
      { name: "SEO (Search Engine Optimization)", url: "/seo-services" },
      { name: "E-Commerce", url: "/web-development" },
      { name: "Website Development", url: "/web-development" },
    ],
    contactInfo: {
      offices: [
        "Corporate Office - A 82, Sector 63, Noida, UP",
        "Regional Office - 7/1, Marhatta Ditch Lane Kolkata",
        "Regional Office - 304, Peninsula Spenta-1, Senapati Bapat Marg, Lower Parel Mumbai",
      ],
      email: "info@jaikviktechnology.com",
      phones: ["+91-9220826934", "+91-9718587705", "0120-4200970"],
    },
    copyright: "© 2016 All Rights Reserved Jaikvik Technology India Pvt Ltd",
  });

  // State for editing
  const [editing, setEditing] = useState<EditingState>({
    description: false,
    socialLinks: false,
    usefulLinks: false,
    services: false,
    contactInfo: false,
    copyright: false,
  });

  const [editValues, setEditValues] = useState<EditValues>({
    description: "",
    socialLinks: [],
    usefulLinks: [],
    services: [],
    contactInfo: {
      offices: [],
      email: "",
      phones: [],
    },
    copyright: "",
  });

  // Separate states for new items
  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({
    platform: "",
    url: "",
  });
  const [newUsefulLink, setNewUsefulLink] = useState<LinkItem>({
    name: "",
    url: "",
  });
  const [newService, setNewService] = useState<LinkItem>({ name: "", url: "" });
  const [newOffice, setNewOffice] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");

  // Initialize edit values when component mounts
  useEffect(() => {
    setEditValues({
      description: footerData.description,
      socialLinks: [...footerData.socialLinks],
      usefulLinks: [...footerData.usefulLinks],
      services: [...footerData.services],
      contactInfo: {
        offices: [...footerData.contactInfo.offices],
        email: footerData.contactInfo.email,
        phones: [...footerData.contactInfo.phones],
      },
      copyright: footerData.copyright,
    });
  }, [footerData]);

  // Toggle edit mode for a section
  const toggleEdit = (section: keyof EditingState) => {
    setEditing((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle input changes for editable fields
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section: keyof EditValues,
    index: number | null = null,
    subSection: keyof ContactInfo | null = null
  ) => {
    const { name, value } = e.target;

    setEditValues((prev) => {
      const newState = { ...prev };

      if (index !== null && subSection) {
        // For array items with sub-sections (like contactInfo.offices)
        const contactInfo = { ...newState.contactInfo };
        const subSectionArray = [...contactInfo[subSection]];
        subSectionArray[index] = value;
        newState.contactInfo = {
          ...contactInfo,
          [subSection]: subSectionArray,
        };
      } else if (index !== null) {
        // For array items (like socialLinks, usefulLinks, services)
        const sectionArray = [...(newState[section] as Array<any>)];
        sectionArray[index] = { ...sectionArray[index], [name]: value };
        newState[section] = sectionArray as any;
      } else if (subSection) {
        // For sub-sections that aren't arrays (like contactInfo.email)
        newState.contactInfo = { ...newState.contactInfo, [subSection]: value };
      } else {
        // For simple fields (like description, copyright)
        newState[section] = value as any;
      }

      return newState;
    });
  };

  // Save changes for a section
  const saveChanges = (section: keyof EditValues) => {
    setFooterData((prev) => ({
      ...prev,
      [section]: editValues[section],
    }));
    toggleEdit(section);
  };

  // Cancel editing for a section
  const cancelEditing = (section: keyof EditValues) => {
    setEditValues((prev) => ({
      ...prev,
      [section]: footerData[section],
    }));
    toggleEdit(section);
  };

  // Add new social link
  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setEditValues((prev) => ({
        ...prev,
        socialLinks: [
          ...prev.socialLinks,
          {
            platform: newSocialLink.platform,
            url: newSocialLink.url,
          },
        ],
      }));
      setNewSocialLink({ platform: "", url: "" });
    }
  };

  // Remove social link
  const removeSocialLink = (index: number) => {
    const updatedLinks = [...editValues.socialLinks];
    updatedLinks.splice(index, 1);
    setEditValues((prev) => ({
      ...prev,
      socialLinks: updatedLinks,
    }));
  };

  // Add new useful link
  const addUsefulLink = () => {
    if (newUsefulLink.name && newUsefulLink.url) {
      setEditValues((prev) => ({
        ...prev,
        usefulLinks: [...prev.usefulLinks, { ...newUsefulLink }],
      }));
      setNewUsefulLink({ name: "", url: "" });
    }
  };

  // Add new service
  const addService = () => {
    if (newService.name && newService.url) {
      setEditValues((prev) => ({
        ...prev,
        services: [...prev.services, { ...newService }],
      }));
      setNewService({ name: "", url: "" });
    }
  };

  // Remove useful link or service
  const removeLink = (section: "usefulLinks" | "services", index: number) => {
    const updatedLinks = [...editValues[section]];
    updatedLinks.splice(index, 1);
    setEditValues((prev) => ({
      ...prev,
      [section]: updatedLinks,
    }));
  };

  // Add new office address
  const addOffice = () => {
    if (newOffice) {
      setEditValues((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          offices: [...prev.contactInfo.offices, newOffice],
        },
      }));
      setNewOffice("");
    }
  };

  // Remove office address
  const removeOffice = (index: number) => {
    const updatedOffices = [...editValues.contactInfo.offices];
    updatedOffices.splice(index, 1);
    setEditValues((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        offices: updatedOffices,
      },
    }));
  };

  // Add new phone number
  const addPhone = () => {
    if (newPhone) {
      setEditValues((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          phones: [...prev.contactInfo.phones, newPhone],
        },
      }));
      setNewPhone("");
    }
  };

  // Remove phone number
  const removePhone = (index: number) => {
    const updatedPhones = [...editValues.contactInfo.phones];
    updatedPhones.splice(index, 1);
    setEditValues((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phones: updatedPhones,
      },
    }));
  };

  return (
    <div className="admin-panel bg-black p-6 rounded-lg shadow-lg max-w-6xl mx-auto my-8 border border-red-600">
      <h2 className="text-2xl font-bold mb-6 text-red-600">
        Footer Content Management
      </h2>

      {/* Description Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">
            Company Description
          </h3>
          <button
            onClick={() => toggleEdit("description")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.description ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.description ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.description ? (
          <div>
            <textarea
              value={editValues.description}
              onChange={(e) => handleInputChange(e, "description")}
              className="w-full p-2 border border-gray-700 rounded mb-2 bg-gray-800 text-white"
              rows={5}
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("description")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("description")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300">{footerData.description}</p>
        )}
      </div>

      {/* Social Links Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">
            Social Media Links
          </h3>
          <button
            onClick={() => toggleEdit("socialLinks")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.socialLinks ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.socialLinks ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.socialLinks ? (
          <div>
            <div className="mb-4">
              {editValues.socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-800 rounded"
                >
                  <select
                    name="platform"
                    value={link.platform}
                    onChange={(e) => handleInputChange(e, "socialLinks", index)}
                    className="p-1 border border-gray-700 rounded bg-gray-900 text-white"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                  <input
                    type="text"
                    name="url"
                    value={link.url}
                    onChange={(e) => handleInputChange(e, "socialLinks", index)}
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="URL"
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800 rounded">
              <select
                value={newSocialLink.platform}
                onChange={(e) =>
                  setNewSocialLink({
                    ...newSocialLink,
                    platform: e.target.value,
                  })
                }
                className="p-1 border border-gray-700 rounded bg-gray-900 text-white"
              >
                <option value="">Select Platform</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <input
                type="text"
                value={newSocialLink.url}
                onChange={(e) =>
                  setNewSocialLink({ ...newSocialLink, url: e.target.value })
                }
                className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="URL"
              />
              <button
                onClick={addSocialLink}
                className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                <FaPlus size={12} /> Add
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("socialLinks")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("socialLinks")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            {footerData.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 text-xl"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Useful Links Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Useful Links</h3>
          <button
            onClick={() => toggleEdit("usefulLinks")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.usefulLinks ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.usefulLinks ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.usefulLinks ? (
          <div>
            <div className="mb-4">
              {editValues.usefulLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-800 rounded"
                >
                  <input
                    type="text"
                    name="name"
                    value={link.name}
                    onChange={(e) => handleInputChange(e, "usefulLinks", index)}
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="Link Text"
                  />
                  <input
                    type="text"
                    name="url"
                    value={link.url}
                    onChange={(e) => handleInputChange(e, "usefulLinks", index)}
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="URL"
                  />
                  <button
                    onClick={() => removeLink("usefulLinks", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800 rounded">
              <input
                type="text"
                value={newUsefulLink.name}
                onChange={(e) =>
                  setNewUsefulLink({ ...newUsefulLink, name: e.target.value })
                }
                className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="Link Text"
              />
              <input
                type="text"
                value={newUsefulLink.url}
                onChange={(e) =>
                  setNewUsefulLink({ ...newUsefulLink, url: e.target.value })
                }
                className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="URL"
              />
              <button
                onClick={addUsefulLink}
                className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                <FaPlus size={12} /> Add
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("usefulLinks")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("usefulLinks")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <ul className="list-none p-0 m-0">
            {footerData.usefulLinks.map((link, index) => (
              <li key={index} className="mb-1">
                <a
                  href={link.url}
                  className="text-gray-300 hover:text-red-600 hover:underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Services Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Our Services</h3>
          <button
            onClick={() => toggleEdit("services")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.services ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.services ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.services ? (
          <div>
            <div className="mb-4">
              {editValues.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-800 rounded"
                >
                  <input
                    type="text"
                    name="name"
                    value={service.name}
                    onChange={(e) => handleInputChange(e, "services", index)}
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="Service Name"
                  />
                  <input
                    type="text"
                    name="url"
                    value={service.url}
                    onChange={(e) => handleInputChange(e, "services", index)}
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                    placeholder="URL"
                  />
                  <button
                    onClick={() => removeLink("services", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800 rounded">
              <input
                type="text"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="Service Name"
              />
              <input
                type="text"
                value={newService.url}
                onChange={(e) =>
                  setNewService({ ...newService, url: e.target.value })
                }
                className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                placeholder="URL"
              />
              <button
                onClick={addService}
                className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                <FaPlus size={12} /> Add
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("services")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("services")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <ul className="list-none p-0 m-0">
            {footerData.services.map((service, index) => (
              <li key={index} className="mb-1">
                <a
                  href={service.url}
                  className="text-gray-300 hover:text-red-600 hover:underline"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Contact Info Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">
            Contact Information
          </h3>
          <button
            onClick={() => toggleEdit("contactInfo")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.contactInfo ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.contactInfo ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.contactInfo ? (
          <div>
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-gray-300">
                Office Addresses
              </h4>
              {editValues.contactInfo.offices.map((office, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-800 rounded"
                >
                  <input
                    type="text"
                    value={office}
                    onChange={(e) =>
                      handleInputChange(e, "contactInfo", index, "offices")
                    }
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                  />
                  <button
                    onClick={() => removeOffice(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800 rounded">
                <input
                  type="text"
                  value={newOffice}
                  onChange={(e) => setNewOffice(e.target.value)}
                  className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                  placeholder="New Office Address"
                />
                <button
                  onClick={addOffice}
                  className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  <FaPlus size={12} /> Add
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2 text-gray-300">Email</h4>
              <input
                type="email"
                value={editValues.contactInfo.email}
                onChange={(e) =>
                  handleInputChange(e, "contactInfo", null, "email")
                }
                className="w-full p-1 border border-gray-700 rounded mb-4 bg-gray-900 text-white"
              />
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2 text-gray-300">Phone Numbers</h4>
              {editValues.contactInfo.phones.map((phone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-800 rounded"
                >
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      handleInputChange(e, "contactInfo", index, "phones")
                    }
                    className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                  />
                  <button
                    onClick={() => removePhone(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800 rounded">
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="flex-1 p-1 border border-gray-700 rounded bg-gray-900 text-white"
                  placeholder="New Phone Number"
                />
                <button
                  onClick={addPhone}
                  className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  <FaPlus size={12} /> Add
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("contactInfo")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("contactInfo")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-medium mb-2 text-gray-300">Office Addresses</h4>
            <ul className="list-none p-0 m-0 mb-4">
              {footerData.contactInfo.offices.map((office, index) => (
                <li key={index} className="flex items-start gap-2 mb-2">
                  <FaMapMarkerAlt className="text-red-600 mt-1" />
                  <p className="text-gray-300">{office}</p>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mb-2">
              <FaEnvelopeOpenText className="text-red-600" />
              <a
                href={`mailto:${footerData.contactInfo.email}`}
                className="text-gray-300 hover:text-red-600 hover:underline"
              >
                {footerData.contactInfo.email}
              </a>
            </div>

            <div className="flex items-start gap-2">
              <FaPhone className="text-red-600 mt-1" />
              <div className="flex flex-wrap gap-2">
                {footerData.contactInfo.phones.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="text-gray-300 hover:text-red-600 hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Copyright Section */}
      <div className="p-4 bg-gray-900 rounded-lg shadow border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Copyright Text</h3>
          <button
            onClick={() => toggleEdit("copyright")}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            {editing.copyright ? <FaLock size={14} /> : <FaEdit size={14} />}
            {editing.copyright ? "Lock Editing" : "Edit"}
          </button>
        </div>

        {editing.copyright ? (
          <div>
            <input
              type="text"
              value={editValues.copyright}
              onChange={(e) => handleInputChange(e, "copyright")}
              className="w-full p-1 border border-gray-700 rounded mb-2 bg-gray-900 text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveChanges("copyright")}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                <FaSave size={14} /> Save
              </button>
              <button
                onClick={() => cancelEditing("copyright")}
                className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                <FaTimes size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300">{footerData.copyright}</p>
        )}
      </div>
    </div>
  );
};

export default AdminFooterPanel;
