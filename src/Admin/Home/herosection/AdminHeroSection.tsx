import React, { useState } from "react";
import {
  FiLock,
  FiUnlock,
  FiTrash2,
  FiEye,
  FiEdit,
  FiUpload,
  FiLink,
} from "react-icons/fi";

interface HeroSectionSettings {
  videoUrl: string;
  circleImageUrl: string;
  centerImageUrl: string;
  isLocked: boolean;
}

const AdminHeroSection: React.FC = () => {
  // Initial data - can be modified through the UI
  const [settings, setSettings] = useState<HeroSectionSettings>({
    videoUrl:
      "https://jaikvik.in/lab/new-post-video/img/home-banner/jaikvik-technology-video-5.mp4",
    circleImageUrl:
      "https://jaikvik.in/lab/new-post-video/img/new-cricle-image.png",
    centerImageUrl: "https://jaikvik.in/lab/new-post-video/img/rotate-3.png",
    isLocked: false,
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [circleImageFile, setCircleImageFile] = useState<File | null>(null);
  const [centerImageFile, setCenterImageFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  const [assetHistory, setAssetHistory] = useState<any[]>([]);

  const toggleLock = () => {
    const newLockState = !settings.isLocked;
    setSettings({ ...settings, isLocked: newLockState });
    console.log(`Admin panel ${newLockState ? "locked" : "unlocked"}`);
  };

  const handleUrlUpdate = (
    url: string,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    if (settings.isLocked) {
      console.warn("Cannot update - admin panel is locked");
      return;
    }

    const updatedSettings = {
      ...settings,
      [`${type}Url`]: url,
    };

    setSettings(updatedSettings);
    // console.log(`Updated ${type} URL:`, url);
    // console.log("New settings:", updatedSettings);
  };

  const handleFileUpload = (
    file: File,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    if (settings.isLocked) {
      console.warn("Cannot upload - admin panel is locked");
      return;
    }

    // console.log(`Uploading ${type}:`, {
    //   name: file.name,
    //   type: file.type,
    //   size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    // });

    // Simulate upload by updating the URL after a delay
    setTimeout(() => {
      const objectUrl = URL.createObjectURL(file);
      const updatedSettings = {
        ...settings,
        [`${type}Url`]: objectUrl,
      };

      setSettings(updatedSettings);
      // console.log(`Uploaded ${type} URL:`, objectUrl);

      // Add to history
      setAssetHistory((prev) => [
        ...prev,
        {
          url: objectUrl,
          type,
          timestamp: new Date().toLocaleString(),
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        },
      ]);
    }, 1000);
  };

  const handleSubmit = (
    e: React.FormEvent,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    e.preventDefault();
    const file =
      type === "video"
        ? videoFile
        : type === "circleImage"
        ? circleImageFile
        : centerImageFile;

    if (file) {
      handleFileUpload(file, type);
    }
  };

  const deleteAsset = (url: string) => {
    if (settings.isLocked) {
      console.warn("Cannot delete - admin panel is locked");
      return;
    }
    setAssetHistory((prev) => prev.filter((asset) => asset.url !== url));
    setSettings((prev) => ({
      ...prev,
      videoUrl: prev.videoUrl === url ? "" : prev.videoUrl,
      circleImageUrl: prev.circleImageUrl === url ? "" : prev.circleImageUrl,
      centerImageUrl: prev.centerImageUrl === url ? "" : prev.centerImageUrl,
    }));
    alert(`Asset with URL ${url} deleted`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-500">
            Hero Section Admin
          </h1>
          <button
            onClick={toggleLock}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              settings.isLocked
                ? "bg-red-900 hover:bg-red-800"
                : "bg-green-900 hover:bg-green-800"
            }`}
          >
            {settings.isLocked ? (
              <>
                <FiLock /> Locked
              </>
            ) : (
              <>
                <FiUnlock /> Unlocked
              </>
            )}
          </button>
        </div>

        {settings.isLocked && (
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-8 flex items-center gap-4">
            <FiLock className="text-2xl" />
            <p>Admin panel is locked. Unlock to make changes.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Total Storage</h3>
            <p className="text-2xl">5.42 MB</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Videos</h3>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Images</h3>
            <p className="text-2xl">2</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 ${
                activeTab === "current"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("current")}
            >
              Current Assets
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "history"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Asset History
            </button>
          </div>
        </div>

        {activeTab === "current" ? (
          <>
            {/* Video Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-400">
                  Video Settings
                </h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  <FiEdit /> {editMode ? "Cancel" : "Edit"}
                </button>
              </div>

              {editMode ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Video URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.videoUrl}
                        onChange={(e) =>
                          setSettings({ ...settings, videoUrl: e.target.value })
                        }
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        disabled={settings.isLocked}
                      />
                      <button
                        onClick={() =>
                          handleUrlUpdate(settings.videoUrl, "video")
                        }
                        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center gap-2"
                        disabled={settings.isLocked}
                      >
                        <FiLink /> Update
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="font-medium mb-2 text-gray-300">
                      Upload New Video
                    </h3>
                    <form
                      onSubmit={(e) => handleSubmit(e, "video")}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <label className="block">
                          <span className="sr-only">Choose video file</span>
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            onChange={(e) =>
                              setVideoFile(e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-gray-400
                              file:mr-4 file:py-2 file:px-4
                              file:rounded file:border-0
                              file:text-sm file:font-semibold
                              file:bg-red-600 file:text-white
                              hover:file:bg-red-500"
                            disabled={settings.isLocked}
                          />
                        </label>
                      </div>
                      {videoFile && (
                        <div className="text-sm text-gray-400 flex justify-between items-center">
                          <span>
                            Selected: {videoFile.name} (
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideoFile(null)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={!videoFile || settings.isLocked}
                        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                      >
                        <FiUpload /> Upload Video
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-300 mb-2">
                      Current Video
                    </h3>
                    <p className="text-sm text-gray-400 break-all">
                      {settings.videoUrl}
                    </p>
                  </div>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    {settings.videoUrl ? (
                      <video
                        src={settings.videoUrl}
                        controls
                        muted
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No video selected
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Images Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Circle Image */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Circle Image
                </h2>

                {editMode ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.circleImageUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              circleImageUrl: e.target.value,
                            })
                          }
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          disabled={settings.isLocked}
                        />
                        <button
                          onClick={() =>
                            handleUrlUpdate(
                              settings.circleImageUrl,
                              "circleImage"
                            )
                          }
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center gap-2"
                          disabled={settings.isLocked}
                        >
                          <FiLink /> Update
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2 text-gray-300">
                        Upload New Image
                      </h3>
                      <form
                        onSubmit={(e) => handleSubmit(e, "circleImage")}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <label className="block">
                            <span className="sr-only">Choose image file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setCircleImageFile(e.target.files?.[0] || null)
                              }
                              className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-600 file:text-white
                                hover:file:bg-red-500"
                              disabled={settings.isLocked}
                            />
                          </label>
                        </div>
                        {circleImageFile && (
                          <div className="text-sm text-gray-400 flex justify-between items-center">
                            <span>
                              Selected: {circleImageFile.name} (
                              {(circleImageFile.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB)
                            </span>
                            <button
                              type="button"
                              onClick={() => setCircleImageFile(null)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={!circleImageFile || settings.isLocked}
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          <FiUpload /> Upload Image
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-300 mb-2">
                        Current Image
                      </h3>
                      <p className="text-sm text-gray-400 break-all">
                        {settings.circleImageUrl}
                      </p>
                    </div>
                    <div className="aspect-square bg-black rounded-full overflow-hidden flex items-center justify-center">
                      {settings.circleImageUrl ? (
                        <img
                          src={settings.circleImageUrl}
                          alt="Circle preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Center Image */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Center Image
                </h2>

                {editMode ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.centerImageUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              centerImageUrl: e.target.value,
                            })
                          }
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          disabled={settings.isLocked}
                        />
                        <button
                          onClick={() =>
                            handleUrlUpdate(
                              settings.centerImageUrl,
                              "centerImage"
                            )
                          }
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center gap-2"
                          disabled={settings.isLocked}
                        >
                          <FiLink /> Update
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2 text-gray-300">
                        Upload New Image
                      </h3>
                      <form
                        onSubmit={(e) => handleSubmit(e, "centerImage")}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <label className="block">
                            <span className="sr-only">Choose image file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setCenterImageFile(e.target.files?.[0] || null)
                              }
                              className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-600 file:text-white
                                hover:file:bg-red-500"
                              disabled={settings.isLocked}
                            />
                          </label>
                        </div>
                        {centerImageFile && (
                          <div className="text-sm text-gray-400 flex justify-between items-center">
                            <span>
                              Selected: {centerImageFile.name} (
                              {(centerImageFile.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB)
                            </span>
                            <button
                              type="button"
                              onClick={() => setCenterImageFile(null)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={!centerImageFile || settings.isLocked}
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          <FiUpload /> Upload Image
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-300 mb-2">
                        Current Image
                      </h3>
                      <p className="text-sm text-gray-400 break-all">
                        {settings.centerImageUrl}
                      </p>
                    </div>
                    <div className="aspect-square bg-black rounded overflow-hidden flex items-center justify-center">
                      {settings.centerImageUrl ? (
                        <img
                          src={settings.centerImageUrl}
                          alt="Center preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Asset History
            </h2>

            {assetHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {assetHistory.map((asset, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                          {asset.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 break-all max-w-xs truncate">
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline"
                          >
                            {asset.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {asset.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {asset.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(asset.url, "_blank")}
                              className="text-blue-400 hover:text-blue-300"
                              title="View"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => deleteAsset(asset.url)}
                              disabled={settings.isLocked}
                              className="text-red-400 hover:text-red-300 disabled:text-gray-600"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No asset history yet. Upload files to see them here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeroSection;
