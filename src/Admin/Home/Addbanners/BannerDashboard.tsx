import { useState } from "react";
import type { ChangeEvent } from "react";

import {
  FiLock,
  FiUnlock,
  FiTrash,
  FiPlus,
  FiUpload,
  FiEdit2,
  FiSave,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Theme = "dark" | "red";
type BannerStatus = "active" | "locked" | "archived";

interface Banner {
  id: string;
  url: string;
  status: BannerStatus;
  title?: string;
  altText?: string;
  createdAt: Date;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const AdminGalleryManager = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: generateId(),
      url: "https://jaikvik.com/lab/new-post-video/banners/accessories-1.jpg",
      status: "active",
      title: "Accessories Banner",
      altText: "Industrial accessories on display",
      createdAt: new Date(),
    },
    {
      id: generateId(),
      url: "https://jaikvik.com/lab/new-post-video/banners/arc-315.jpg",
      status: "active",
      title: "ARC Welder",
      altText: "ARC 315 welding machine",
      createdAt: new Date(),
    },
    {
      id: generateId(),
      url: "https://jaikvik.com/lab/new-post-video/banners/mig-welding-torch-1.jpg",
      status: "active",
      title: "MIG Torch",
      altText: "MIG welding torch closeup",
      createdAt: new Date(),
    },
    {
      id: generateId(),
      url: "https://jaikvik.com/lab/new-post-video/banners/acoustic-nest-banners-5.jpg",
      status: "locked",
      title: "Acoustic Panel",
      altText: "Acoustic sound panels",
      createdAt: new Date(),
    },
  ]);

  const [newBanner, setNewBanner] = useState({
    url: "",
    title: "",
    altText: "",
  });
  const [preview, setPreview] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Banner>>({});

  // Theme styles
  const themes = {
    dark: {
      bg: "bg-black",
      card: "bg-[#1a1a1a]",
      text: "text-white",
      accent: "text-red-500",
      button: "bg-red-600 hover:bg-red-700",
      input: "bg-[#333] focus:outline-red-500",
    },
    red: {
      bg: "bg-red-900",
      card: "bg-red-800",
      text: "text-white",
      accent: "text-yellow-300",
      button: "bg-yellow-500 hover:bg-yellow-600",
      input: "bg-red-700 focus:outline-yellow-500",
    },
  };

  const currentTheme = themes[theme];

  const handleAddBanner = () => {
    if (!newBanner.url) {
      return toast.error("Please enter a valid image URL or upload a file.");
    }

    const banner: Banner = {
      id: generateId(),
      url: newBanner.url,
      status: "active",
      title: newBanner.title,
      altText: newBanner.altText,
      createdAt: new Date(),
    };

    setBanners([...banners, banner]);
    setNewBanner({ url: "", title: "", altText: "" });
    setPreview("");
    toast.success("Banner added successfully");
  };

  const handleToggleStatus = (id: string, status: BannerStatus) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, status } : banner
      )
    );
  };

  const handleRemove = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id));
    toast.info("Banner removed");
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewBanner({ ...newBanner, url: imageUrl });
      setPreview(imageUrl);
    }
  };

  const startEditing = (banner: Banner) => {
    setEditingId(banner.id);
    setEditData({
      title: banner.title,
      altText: banner.altText,
    });
  };

  const saveEdit = () => {
    if (!editingId) return;

    setBanners(
      banners.map((banner) =>
        banner.id === editingId ? { ...banner, ...editData } : banner
      )
    );
    setEditingId(null);
    toast.success("Banner updated");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const getStatusCount = (status: BannerStatus) =>
    banners.filter((banner) => banner.status === status).length;

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-6 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
            Gallery Banners Manager
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 rounded ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-700"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("red")}
              className={`px-3 py-1 rounded ${
                theme === "red" ? "bg-red-800" : "bg-red-700"
              }`}
            >
              Red
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 ${currentTheme.card} p-4 rounded-lg`}
        >
          <div className="text-center p-3 rounded">
            <p className="text-2xl font-bold">{banners.length}</p>
            <p className="text-sm opacity-80">Total Banners</p>
          </div>
          <div className="text-center p-3 rounded">
            <p className="text-2xl font-bold">{getStatusCount("active")}</p>
            <p className="text-sm opacity-80">Active</p>
          </div>
          <div className="text-center p-3 rounded">
            <p className="text-2xl font-bold">{getStatusCount("locked")}</p>
            <p className="text-sm opacity-80">Locked</p>
          </div>
        </div>

        {/* Add New Banner */}
        <div className={`${currentTheme.card} p-4 rounded-xl mb-8`}>
          <h2 className="text-xl font-semibold mb-4">Add New Banner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                placeholder="Enter Image URL"
                value={newBanner.url}
                onChange={(e) => {
                  setNewBanner({ ...newBanner, url: e.target.value });
                  setPreview(e.target.value);
                }}
                className={`w-full p-2 rounded ${currentTheme.input}`}
              />
            </div>
            <div>
              <label className="block mb-2">Upload Image</label>
              <label
                className={`flex items-center gap-2 ${currentTheme.button} px-4 py-2 rounded cursor-pointer justify-center`}
              >
                <FiUpload />
                Select File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Title (Optional)</label>
              <input
                type="text"
                placeholder="Banner title"
                value={newBanner.title}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, title: e.target.value })
                }
                className={`w-full p-2 rounded ${currentTheme.input}`}
              />
            </div>
            <div>
              <label className="block mb-2">Alt Text (Optional)</label>
              <input
                type="text"
                placeholder="Description for accessibility"
                value={newBanner.altText}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, altText: e.target.value })
                }
                className={`w-full p-2 rounded ${currentTheme.input}`}
              />
            </div>
          </div>

          <button
            onClick={handleAddBanner}
            className={`${currentTheme.button} px-4 py-2 rounded flex items-center gap-2 w-full justify-center mt-2`}
          >
            <FiPlus /> Add Banner
          </button>
        </div>

        {/* Preview */}
        {preview && (
          <div className={`mb-8 ${currentTheme.card} p-4 rounded-lg`}>
            <h3 className="text-lg font-medium mb-3">Preview</h3>
            <img
              src={preview}
              alt="Preview"
              className="h-48 w-full object-cover rounded border border-gray-600"
            />
            {newBanner.title && (
              <p className="mt-2 font-medium">{newBanner.title}</p>
            )}
          </div>
        )}

        {/* Banner List */}
        {banners.length === 0 ? (
          <div className={`text-center py-10 ${currentTheme.card} rounded-lg`}>
            <p className="text-xl opacity-70">No banners available.</p>
            <p className="opacity-50">Add your first banner above</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Manage Banners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`relative group rounded-lg overflow-hidden ${currentTheme.card} shadow-lg transition-transform hover:scale-[1.02]`}
                >
                  <img
                    src={banner.url}
                    alt={banner.altText || `Banner ${banner.id}`}
                    className={`w-full h-48 object-cover ${
                      banner.status !== "active" ? "opacity-50 grayscale" : ""
                    }`}
                  />

                  <div className="p-3">
                    {editingId === banner.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editData.title || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className={`w-full p-1 rounded ${currentTheme.input}`}
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={editData.altText || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              altText: e.target.value,
                            })
                          }
                          className={`w-full p-1 rounded ${currentTheme.input}`}
                          placeholder="Alt Text"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className={`${currentTheme.button} px-2 py-1 rounded flex-1 flex items-center justify-center gap-1`}
                          >
                            <FiSave size={14} /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {banner.title && (
                          <h3 className="font-medium truncate">
                            {banner.title}
                          </h3>
                        )}
                        <p className="text-xs opacity-70 truncate">
                          {new Date(banner.createdAt).toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${
                      banner.status === "active"
                        ? "bg-green-600"
                        : banner.status === "locked"
                        ? "bg-yellow-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {banner.status}
                  </div>

                  {/* Controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center gap-3">
                    {editingId !== banner.id && (
                      <>
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              banner.id,
                              banner.status === "active" ? "locked" : "active"
                            )
                          }
                          className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-full"
                          title={banner.status === "active" ? "Lock" : "Unlock"}
                        >
                          {banner.status === "active" ? (
                            <FiLock size={18} />
                          ) : (
                            <FiUnlock size={18} />
                          )}
                        </button>

                        <button
                          onClick={() => startEditing(banner)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleRemove(banner.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
                          title="Delete"
                        >
                          <FiTrash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryManager;
