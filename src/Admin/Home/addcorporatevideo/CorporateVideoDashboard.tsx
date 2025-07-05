import React, { useState, useCallback } from "react";
import {
  FaLock,
  FaUnlock,
  FaTrash,
  FaPlus,
  FaCloudUploadAlt,
  FaEdit,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";

type VideoPrivacy = "public" | "private" | "unlisted";
type VideoStatus = "draft" | "published" | "archived";

interface VideoMetadata {
  description?: string;
  tags?: string[];
  category?: string;
  duration?: number; // in seconds
  views?: number;
}

interface VideoData {
  id: string;
  title: string;
  url: string;
  privacy: VideoPrivacy;
  status: VideoStatus;
  metadata: VideoMetadata;
  createdAt: Date;
  updatedAt?: Date;
  thumbnail?: string;
}

const AdminCorporateVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([
    {
      id: "1",
      title: "Addwatt Corporate Video",
      url: "https://jaikvik.in/lab/new-post-video/video/corporate-video/addwatt-sd-version.mp4",
      privacy: "public",
      status: "published",
      metadata: {
        description: "Official corporate video for Addwatt",
        tags: ["corporate", "branding"],
        duration: 120,
        views: 1500,
      },
      createdAt: new Date("2023-01-15"),
      thumbnail:
        "https://via.placeholder.com/300x170/FF0000/000000?text=Addwatt",
    },
    {
      id: "2",
      title: "Regent Hitech Presentation",
      url: "https://jaikvik.in/lab/new-post-video/video/corporate-video/regent-hitech-2.mp4",
      privacy: "private",
      status: "published",
      metadata: {
        description: "Product presentation for Regent Hitech",
        tags: ["presentation", "technology"],
        duration: 180,
        views: 850,
      },
      createdAt: new Date("2023-02-20"),
      updatedAt: new Date("2023-03-10"),
      thumbnail:
        "https://via.placeholder.com/300x170/000000/FF0000?text=Regent",
    },
  ]);

  const [videoForm, setVideoForm] = useState<
    Omit<VideoData, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    url: "",
    privacy: "public",
    status: "draft",
    metadata: {
      description: "",
      tags: [],
      duration: 0,
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | VideoStatus>("all");

  const filteredVideos = videos.filter(
    (video) => activeTab === "all" || video.status === activeTab
  );

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      if (name.startsWith("metadata.")) {
        const metaField = name.split(".")[1];
        setVideoForm((prev) => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [metaField]: metaField === "tags" ? value.split(",") : value,
          },
        }));
      } else {
        setVideoForm((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleAddVideo = useCallback(() => {
    if (!videoForm.title || (!videoForm.url && !file)) {
      alert("Please provide a title and either a video URL or file.");
      return;
    }

    setIsUploading(true);

    const newVideo: VideoData = {
      id: Date.now().toString(),
      title: videoForm.title,
      url: file ? URL.createObjectURL(file) : videoForm.url,
      privacy: videoForm.privacy,
      status: videoForm.status,
      metadata: {
        ...videoForm.metadata,
        duration: file
          ? Math.floor(Math.random() * 300) + 60
          : videoForm.metadata.duration,
      },
      createdAt: new Date(),
      thumbnail: file
        ? "https://via.placeholder.com/300x170/000000/FF0000?text=New+Video"
        : undefined,
    };

    setVideos((prev) => [newVideo, ...prev]);
    resetForm();
    setIsUploading(false);
  }, [videoForm, file]);

  const handleUpdateVideo = useCallback(() => {
    if (!editingId) return;

    setVideos((prev) =>
      prev.map((video) =>
        video.id === editingId
          ? {
              ...video,
              ...videoForm,
              updatedAt: new Date(),
              metadata: {
                ...video.metadata,
                ...videoForm.metadata,
              },
            }
          : video
      )
    );

    resetForm();
  }, [editingId, videoForm]);

  const resetForm = () => {
    setVideoForm({
      title: "",
      url: "",
      privacy: "public",
      status: "draft",
      metadata: {
        description: "",
        tags: [],
        duration: 0,
      },
    });
    setFile(null);
    setEditingId(null);
  };

  const editVideo = useCallback((video: VideoData) => {
    setVideoForm({
      title: video.title,
      url: video.url,
      privacy: video.privacy,
      status: video.status,
      metadata: {
        description: video.metadata.description || "",
        tags: video.metadata.tags || [],
        duration: video.metadata.duration || 0,
      },
    });
    setEditingId(video.id);
  }, []);

  const togglePrivacy = useCallback((id: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id
          ? {
              ...video,
              privacy: video.privacy === "public" ? "private" : "public",
              updatedAt: new Date(),
            }
          : video
      )
    );
  }, []);

  const deleteVideo = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos((prev) => prev.filter((video) => video.id !== id));
    }
  }, []);

  const changeStatus = useCallback((id: string, status: VideoStatus) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id
          ? {
              ...video,
              status,
              updatedAt: new Date(),
            }
          : video
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Video Content Manager
          </h1>
          <p className="text-gray-400">Manage your corporate video library</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Form Section */}
          <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-red-500 mb-6">
              {editingId ? "Edit Video" : "Add New Video"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={videoForm.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  URL
                </label>
                <div className="flex items-center gap-2">
                  <FaLink className="text-red-500" />
                  <input
                    type="text"
                    name="url"
                    value={videoForm.url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Video URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Or Upload File
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-red-400 transition">
                  <FaCloudUploadAlt className="text-red-500" />
                  <span>Select Video File</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                {file && (
                  <p className="mt-1 text-sm text-green-400">{file.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Privacy
                  </label>
                  <select
                    name="privacy"
                    value={videoForm.privacy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={videoForm.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="metadata.description"
                  value={videoForm.metadata.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Video description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="metadata.tags"
                  value={videoForm.metadata.tags?.join(",")}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="tag1,tag2,tag3"
                />
              </div>

              <div className="flex gap-3 pt-2">
                {editingId ? (
                  <>
                    <button
                      onClick={handleUpdateVideo}
                      disabled={isUploading}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Update Video
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddVideo}
                    disabled={isUploading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    <FaPlus /> {isUploading ? "Uploading..." : "Add Video"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Video List Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-red-500">
                  Video Library
                </h2>
                <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "all"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    All ({videos.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("published")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "published"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Published (
                    {videos.filter((v) => v.status === "published").length})
                  </button>
                  <button
                    onClick={() => setActiveTab("draft")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "draft"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Drafts ({videos.filter((v) => v.status === "draft").length})
                  </button>
                  <button
                    onClick={() => setActiveTab("archived")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "archived"
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Archived (
                    {videos.filter((v) => v.status === "archived").length})
                  </button>
                </div>
              </div>

              {filteredVideos.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No videos found. Add a new video to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {video.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  video.privacy === "public"
                                    ? "bg-green-900 text-green-300"
                                    : video.privacy === "private"
                                    ? "bg-red-900 text-red-300"
                                    : "bg-yellow-900 text-yellow-300"
                                }`}
                              >
                                {video.privacy}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="text-gray-500" />
                                {new Date(video.createdAt).toLocaleDateString()}
                              </span>
                              {video.metadata.duration && (
                                <span>
                                  {Math.floor(video.metadata.duration / 60)}:
                                  {(video.metadata.duration % 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                              )}
                              {video.metadata.views && (
                                <span>
                                  {video.metadata.views.toLocaleString()} views
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => togglePrivacy(video.id)}
                              className={`p-2 rounded-lg ${
                                video.privacy === "public"
                                  ? "bg-red-900 hover:bg-red-800"
                                  : "bg-green-900 hover:bg-green-800"
                              }`}
                              title={
                                video.privacy === "public"
                                  ? "Make Private"
                                  : "Make Public"
                              }
                            >
                              {video.privacy === "public" ? (
                                <FaLock />
                              ) : (
                                <FaUnlock />
                              )}
                            </button>
                            <button
                              onClick={() => editVideo(video)}
                              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              className="p-2 rounded-lg bg-red-900 hover:bg-red-800"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        {video.metadata.description && (
                          <p className="mt-2 text-gray-300 text-sm">
                            {video.metadata.description}
                          </p>
                        )}

                        {video.metadata.tags &&
                          video.metadata.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {video.metadata.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-gray-700 text-xs text-gray-300 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>

                      <div className="bg-black p-4 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <video
                            src={video.url}
                            controls
                            className="w-full h-full max-h-48 rounded-lg"
                          />
                        </div>
                        <div className="w-full md:w-48">
                          {video.thumbnail && (
                            <img
                              src={video.thumbnail}
                              alt="Thumbnail"
                              className="w-full h-full object-cover rounded-lg border border-gray-700"
                            />
                          )}
                        </div>
                      </div>

                      <div className="px-4 py-2 bg-gray-900 border-t border-gray-700 flex justify-between items-center">
                        <div className="flex gap-2">
                          <select
                            value={video.status}
                            onChange={(e) =>
                              changeStatus(
                                video.id,
                                e.target.value as VideoStatus
                              )
                            }
                            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-2 py-1 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                        <div className="text-xs text-gray-500">
                          {video.updatedAt &&
                            `Updated: ${new Date(
                              video.updatedAt
                            ).toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCorporateVideos;
