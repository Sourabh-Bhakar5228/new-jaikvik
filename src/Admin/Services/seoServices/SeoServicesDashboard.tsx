import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaImage,
  FaEye,
  FaSave,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
  content: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

const SeoServicesDashboard: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Dashboard state
  const [activeTab, setActiveTab] = useState("sections");
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewSection, setPreviewSection] = useState<Section | null>(null);

  // Form state
  const [currentSection, setCurrentSection] = useState<Partial<Section>>({});
  const [isEditing, setIsEditing] = useState(false);

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    // Simulate API call
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        setIsLoggedIn(true);
        localStorage.setItem("adminAuth", "true");
      } else {
        setAuthError("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminAuth");
  };

  // Load sections (mock data)
  useEffect(() => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      try {
        const mockSections: Section[] = [
          {
            id: "google-seo",
            title: "What Are Google SEO Services?",
            content:
              "<p>Google SEO Services encompass strategies to improve your website's visibility...</p>",
            image:
              "https://img.freepik.com/free-photo/magnifying-glass-with-seo-concepts_1134-81.jpg",
            alt: "SEO Services Overview",
          },
          // Add other sections similarly
        ];
        setSections(mockSections);
      } catch (err) {
        setError("Failed to load sections");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  }, [isLoggedIn]);

  // Check auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle section edit
  const handleEditSection = (section: Section) => {
    setCurrentSection(section);
    setIsEditing(true);
  };

  // Handle section update
  const handleUpdateSection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        if (currentSection.id) {
          setSections(
            sections.map((s) =>
              s.id === currentSection.id
                ? ({ ...s, ...currentSection } as Section)
                : s
            )
          );
        }
        setIsEditing(false);
        setCurrentSection({});
      } catch (err) {
        setError("Failed to update section");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  // Handle image upload (mock)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentSection({
            ...currentSection,
            image: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {authError && (
            <div className="text-red-500 mb-4 text-center">{authError}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
              type="submit"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SEO Services Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "sections"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("sections")}
          >
            Sections
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "settings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog className="inline mr-2" /> Settings
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Sections Tab */}
        {activeTab === "sections" && (
          <div>
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow mb-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {currentSection.id ? "Edit Section" : "Create Section"}
                </h2>
                <form onSubmit={handleUpdateSection}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentSection.title || ""}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Content</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg min-h-[200px]"
                      value={currentSection.content || ""}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          content: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image</label>
                    <div className="flex items-center gap-4">
                      {currentSection.image && (
                        <img
                          src={currentSection.image}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition">
                        <FaImage className="inline mr-2" />
                        Upload Image
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Alt Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentSection.alt || ""}
                      onChange={(e) =>
                        setCurrentSection({
                          ...currentSection,
                          alt: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentSection({});
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                    >
                      <FaSave /> Save
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                    onClick={() => {
                      setCurrentSection({});
                      setIsEditing(true);
                    }}
                  >
                    + Add New Section
                  </button>
                </div>

                <div className="space-y-4">
                  {sections.map((section) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          {section.title}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setPreviewSection(section)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="text-yellow-600 hover:text-yellow-800"
                            onClick={() => handleEditSection(section)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src={section.image}
                          alt={section.alt}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div
                          className="text-gray-700 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Admin Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue="admin@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="New password"
                />
              </div>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{previewSection.title}</h2>
                <button
                  onClick={() => setPreviewSection(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <img
                src={previewSection.image}
                alt={previewSection.alt}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: previewSection.content }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SeoServicesDashboard;
