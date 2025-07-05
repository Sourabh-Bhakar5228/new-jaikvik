import { useState } from "react";
import VideoTable from "./VideoTable";
import VideoForm from "./VideoForm";
import type { Video, VideoFormData } from "./video";
import initialVideos from "../../../configs/all-videos";

const VideosDashboard = () => {
  const [videos, setVideos] = useState<Video[]>(
    initialVideos.map((video, index) => ({ ...video, id: `video-${index}` }))
  );
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: VideoFormData) => {
    const newVideo: Video = { ...formData, id: `video-${Date.now()}` };
    setVideos([newVideo, ...videos]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: VideoFormData) => {
    setVideos(
      videos.map((video) =>
        video.id === id ? { ...video, ...formData, id } : video
      )
    );
    setEditingVideo(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingVideo(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">
          Videos Dashboard
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-xl">
            Total Videos:{" "}
            <span className="text-red-500 font-bold">{videos.length}</span>
          </div>
          <button
            onClick={toggleForm}
            className={`flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
              showForm
                ? "bg-gray-600 hover:bg-gray-700 shadow-gray-900/30"
                : "bg-red-600 hover:bg-red-700 shadow-red-900/30"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {showForm ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            {showForm ? "Cancel" : "Add New Video"}
          </button>
        </div>

        {(showForm || editingVideo) && (
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8 border border-red-500">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              {editingVideo ? "Edit Video" : "Add New Video"}
            </h2>
            <VideoForm
              onSubmit={
                editingVideo
                  ? (data: VideoFormData) => {
                      if (editingVideo.id) {
                        handleUpdate(editingVideo.id, data);
                      }
                    }
                  : handleCreate
              }
              initialData={editingVideo || undefined}
              onCancel={() => {
                setEditingVideo(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Manage Videos
          </h2>
          <VideoTable
            videos={videos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default VideosDashboard;
