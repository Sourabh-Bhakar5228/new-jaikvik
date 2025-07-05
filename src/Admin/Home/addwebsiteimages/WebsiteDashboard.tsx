import { useState } from "react";
import WebsiteTable from "./WebsiteTable";
import WebsiteForm from "./WebsiteForm";
import type { Website, WebsiteFormData } from "./website";
import initialWebsites from "../../../configs/all-websites";

const WebsiteDashboard = () => {
  const [websites, setWebsites] = useState<Website[]>(
    initialWebsites.map((w, i) => ({ ...w, id: `website-${i}` }))
  );
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: WebsiteFormData) => {
    const newWebsite = { ...formData, id: `website-${Date.now()}` };
    setWebsites([newWebsite, ...websites]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: WebsiteFormData) => {
    setWebsites(websites.map((w) => (w.id === id ? { ...w, ...formData } : w)));
    setEditingWebsite(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setWebsites(websites.filter((w) => w.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingWebsite(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Websites</h2>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {websites.length}
          </span>
        </div>
        <button
          onClick={toggleForm}
          className={`px-4 py-2 rounded-md ${
            showForm
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {showForm ? "Cancel" : "Add Website"}
        </button>
      </div>

      {(showForm || editingWebsite) && (
        <div className="bg-gray-900 p-6 rounded-lg border border-green-500 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editingWebsite ? "Edit Website" : "Add New Website"}
          </h3>
          <WebsiteForm
            onSubmit={
              editingWebsite
                ? (data) => handleUpdate(editingWebsite.id, data)
                : handleCreate
            }
            initialData={editingWebsite || undefined}
            onCancel={() => {
              setEditingWebsite(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg border border-green-500">
        <WebsiteTable
          websites={websites}
          onEdit={(website) => {
            setEditingWebsite(website);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default WebsiteDashboard;
