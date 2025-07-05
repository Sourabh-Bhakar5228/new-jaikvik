import { useState } from "react";
import ReelTable from "./ReelTable";
import ReelForm from "./ReelForm";
import type { Reel, ReelFormData } from "./reel";
import initialReels from "../../../configs/all-reels";

const ReelsDashboard = () => {
  const [reels, setReels] = useState<Reel[]>(
    initialReels.map((reel, index) => ({ ...reel, id: `reel-${index}` }))
  );
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: ReelFormData) => {
    const newReel = { ...formData, id: `reel-${Date.now()}` };
    setReels([newReel, ...reels]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: ReelFormData) => {
    setReels(
      reels.map((reel) => (reel.id === id ? { ...reel, ...formData } : reel))
    );
    setEditingReel(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setReels(reels.filter((reel) => reel.id !== id));
  };

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingReel(null); // Clear editing state when hiding form
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">
          Reels Dashboard
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-xl">
            Total Reels:{" "}
            <span className="text-red-500 font-bold">{reels.length}</span>
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
            {showForm ? "Cancel" : "Add New Reel"}
          </button>
        </div>

        {(showForm || editingReel) && (
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8 border border-red-500">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              {editingReel ? "Edit Reel" : "Add New Reel"}
            </h2>
            <ReelForm
              onSubmit={
                editingReel
                  ? (data) => handleUpdate(editingReel.id, data)
                  : handleCreate
              }
              initialData={editingReel || undefined}
              onCancel={() => {
                setEditingReel(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Manage Reels
          </h2>
          <ReelTable
            reels={reels}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ReelsDashboard;
