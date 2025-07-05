import { useState } from "react";
import SocialMediaTable from "./SocialMediaTable";
import SocialMediaForm from "./SocialMediaForm";
import type { SocialMediaPost, SocialMediaFormData } from "./socialMedia";
import initialPostUrls from "../../../configs/all-posts";

const SocialMediaDashboard = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>(
    initialPostUrls.map((url, i) => ({
      id: `post-${i}`,
      content: `Post ${i + 1}`,
      imageUrl: url,
      platform: "instagram",
      scheduledTime: new Date().toISOString(),
      status: "published",
      engagement: { likes: 0, comments: 0, shares: 0 },
    }))
  );

  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (formData: SocialMediaFormData) => {
    const newPost = {
      ...formData,
      id: `post-${Date.now()}`,
      engagement: { likes: 0, comments: 0, shares: 0 },
    };
    setPosts([newPost, ...posts]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, formData: SocialMediaFormData) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...formData } : p)));
    setEditingPost(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingPost(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Social Media Posts</h2>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {posts.length}
          </span>
        </div>
        <button
          onClick={toggleForm}
          className={`px-4 py-2 rounded-md ${
            showForm
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white`}
        >
          {showForm ? "Cancel" : "Add Post"}
        </button>
      </div>

      {(showForm || editingPost) && (
        <div className="bg-gray-900 p-6 rounded-lg border border-purple-500 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editingPost ? "Edit Post" : "Add New Post"}
          </h3>
          <SocialMediaForm
            onSubmit={
              editingPost
                ? (data) => handleUpdate(editingPost.id, data)
                : handleCreate
            }
            initialData={editingPost || undefined}
            onCancel={() => {
              setEditingPost(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg border border-purple-500">
        <SocialMediaTable
          posts={posts}
          onEdit={(post) => {
            setEditingPost(post);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
