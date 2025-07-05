import { useState } from "react";
import TeamVideoTable from "./TeamVideoTable";
import TeamVideoForm from "./TeamVideoForm";
import type { TeamVideo, TeamVideoFormData } from "./teamVideo";
import initialTeamVideos from "../../../configs/team-videos";

const TeamVideoDashboard = () => {
  const [videos, setVideos] = useState<TeamVideo[]>(
    initialTeamVideos.map((v, i) => ({ ...v, id: `video-${i}` }))
  );
  const [editingVideo, setEditingVideo] = useState<TeamVideo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: TeamVideoFormData) => {
    const newVideo = { ...formData, id: `video-${Date.now()}` };
    setVideos([newVideo, ...videos]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: TeamVideoFormData) => {
    setVideos(videos.map((v) => (v.id === id ? { ...v, ...formData } : v)));
    setEditingVideo(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingVideo(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Team Videos</h2>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {videos.length}
          </span>
        </div>
        <button
          onClick={toggleForm}
          className={`px-4 py-2 rounded-md ${
            showForm
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {showForm ? "Cancel" : "Add Video"}
        </button>
      </div>

      {(showForm || editingVideo) && (
        <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editingVideo ? "Edit Team Video" : "Add New Team Video"}
          </h3>
          <TeamVideoForm
            onSubmit={
              editingVideo
                ? (data) => handleUpdate(editingVideo.id, data)
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

      <div className="bg-gray-900 p-6 rounded-lg border border-blue-500">
        <TeamVideoTable
          videos={videos}
          onEdit={(video) => {
            setEditingVideo(video);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TeamVideoDashboard;
