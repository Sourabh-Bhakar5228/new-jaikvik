import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiLock,
  FiUnlock,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiEye,
  FiSave,
  FiX,
  FiRefreshCw,
  FiFilter,
  FiSliders,
  FiFileText,
  FiImage,
  FiTag,
} from "react-icons/fi";
import { useDebounce } from "use-debounce";
import { v4 as uuidv4 } from "uuid";

// Types
type BlogStatus = "published" | "draft" | "archived";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: BlogStatus;
  author: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  locked: boolean;
  featuredImage?: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}

// Mock API Service
const useBlogApi = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockBlogs: Blog[] = Array.from({ length: 25 }, (_, i) => ({
        id: uuidv4(),
        title: `Blog Post ${i + 1}`,
        slug: `blog-post-${i + 1}`,
        category: ["Social Media", "SEO", "Development", "Marketing"][
          Math.floor(Math.random() * 4)
        ],
        status: ["published", "draft", "archived"][
          Math.floor(Math.random() * 3)
        ] as BlogStatus,
        author: `Author ${Math.floor(Math.random() * 5) + 1}`,
        publishedAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updatedAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        views: Math.floor(Math.random() * 5000),
        locked: Math.random() > 0.7,
        featuredImage: `https://source.unsplash.com/random/300x200?sig=${i}`,
        excerpt: `This is a sample excerpt for blog post ${i + 1}`,
        content: `<p>Content for blog post ${i + 1}</p>`,
        metaTitle: `Meta Title ${i + 1}`,
        metaDescription: `Meta description for blog post ${i + 1}`,
        tags: ["tag1", "tag2", "tag3"].slice(
          0,
          Math.floor(Math.random() * 3) + 1
        ),
      }));

      setData(mockBlogs);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  }, []);

  const createBlog = useCallback(
    async (blog: Omit<Blog, "id" | "publishedAt" | "updatedAt" | "views">) => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));

        const newBlog: Blog = {
          ...blog,
          id: uuidv4(),
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0,
          locked: false,
        };

        setData((prev) => [...prev, newBlog]);
        setLoading(false);
        return newBlog;
      } catch (err) {
        setError("Failed to create blog");
        setLoading(false);
        throw err;
      }
    },
    []
  );

  const updateBlog = useCallback(async (id: string, updates: Partial<Blog>) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setData((prev) =>
        prev.map((blog) =>
          blog.id === id
            ? { ...blog, ...updates, updatedAt: new Date().toISOString() }
            : blog
        )
      );
      setLoading(false);
    } catch (err) {
      setError("Failed to update blog");
      setLoading(false);
      throw err;
    }
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setData((prev) => prev.filter((blog) => blog.id !== id));
      setLoading(false);
    } catch (err) {
      setError("Failed to delete blog");
      setLoading(false);
      throw err;
    }
  }, []);

  const toggleLock = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      setData((prev) =>
        prev.map((blog) =>
          blog.id === id ? { ...blog, locked: !blog.locked } : blog
        )
      );
      setLoading(false);
    } catch (err) {
      setError("Failed to toggle lock");
      setLoading(false);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    data,
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleLock,
    refetch: fetchBlogs,
  };
};

// Components
const StatusBadge: React.FC<{ status: BlogStatus }> = ({ status }) => {
  const statusMap = {
    published: { color: "bg-green-900 text-green-300", label: "Published" },
    draft: { color: "bg-yellow-900 text-yellow-300", label: "Draft" },
    archived: { color: "bg-gray-700 text-gray-300", label: "Archived" },
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </span>
  );
};

const BlogFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Blog) => Promise<void>;
  initialData?: Blog;
  isLoading: boolean;
}> = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState<Blog>({
    id: "",
    title: "",
    slug: "",
    category: "Marketing",
    status: "draft",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    tags: [],
    author: "Admin",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    locked: false,
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: "",
        title: "",
        slug: "",
        category: "Marketing",
        status: "draft",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        tags: [],
        author: "Admin",
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        locked: false,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof Blog, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className={`fixed inset-0 transition-opacity ${
            isClosing ? "bg-black bg-opacity-0" : "bg-black bg-opacity-80"
          }`}
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div
          className={`inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-red-700 ${
            isClosing ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:items-center sm:justify-between border-b border-red-700">
            <h3 className="text-lg leading-6 font-medium text-white">
              {initialData ? "Edit Blog Post" : "Create New Blog Post"}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-150"
              onClick={handleClose}
              disabled={isLoading}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.title ? "border-red-500" : "border-gray-700"
                      } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors`}
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      disabled={isLoading}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.slug ? "border-red-500" : "border-gray-700"
                      } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors`}
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      disabled={isLoading}
                    />
                    {errors.slug && (
                      <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Excerpt
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                      value={formData.excerpt}
                      onChange={(e) => handleChange("excerpt", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Content *
                    </label>
                    <textarea
                      rows={8}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.content ? "border-red-500" : "border-gray-700"
                      } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white font-mono text-sm transition-colors`}
                      value={formData.content}
                      onChange={(e) => handleChange("content", e.target.value)}
                      disabled={isLoading}
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.content}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiFileText className="mr-2 text-red-500" /> Publish
                      Settings
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Status
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                          value={formData.status}
                          onChange={(e) =>
                            handleChange("status", e.target.value as BlogStatus)
                          }
                          disabled={isLoading}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                          value={formData.category}
                          onChange={(e) =>
                            handleChange("category", e.target.value)
                          }
                          disabled={isLoading}
                        >
                          <option value="Marketing">Marketing</option>
                          <option value="SEO">SEO</option>
                          <option value="Development">Development</option>
                          <option value="Social Media">Social Media</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiImage className="mr-2 text-red-500" /> Featured Image
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                        value={formData.featuredImage || ""}
                        onChange={(e) =>
                          handleChange("featuredImage", e.target.value)
                        }
                        disabled={isLoading}
                      />
                      {formData.featuredImage && (
                        <div className="mt-2">
                          <img
                            src={formData.featuredImage}
                            alt="Featured preview"
                            className="h-32 w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiTag className="mr-2 text-red-500" /> Tags
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Add Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                        value={formData.tags.join(", ")}
                        onChange={(e) =>
                          handleChange(
                            "tags",
                            e.target.value.split(",").map((tag) => tag.trim())
                          )
                        }
                        placeholder="tag1, tag2, tag3"
                        disabled={isLoading}
                      />
                      {formData.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  SEO Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        handleChange("metaTitle", e.target.value)
                      }
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white transition-colors"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        handleChange("metaDescription", e.target.value)
                      }
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center transition-colors disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      {initialData ? "Update Blog" : "Create Blog"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogDashboard: React.FC = () => {
  const {
    data: blogs,
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleLock,
    refetch,
  } = useBlogApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || blog.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, debouncedSearchTerm, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + blogsPerPage);
  }, [filteredBlogs, currentPage, blogsPerPage]);

  const categories = useMemo(() => {
    return ["all", ...new Set(blogs.map((blog) => blog.category))];
  }, [blogs]);

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setCurrentBlog(null);
    setIsFormOpen(true);
  };

  const handleSave = async (formData: Blog) => {
    try {
      if (currentBlog) {
        await updateBlog(currentBlog.id, formData);
      } else {
        await createBlog(formData);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
    }
  };

  const handleToggleLock = async (id: string) => {
    await toggleLock(id);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, selectedStatus]);

  if (loading && !blogs.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <header className="bg-gray-900 shadow-lg border-b border-red-700">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-500">Blog Dashboard</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => refetch()}
                className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </button>
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <FiPlus className="mr-2 h-4 w-4" />
                New Blog
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-gray-900 shadow rounded-lg p-4 mb-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search blogs..."
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  id="category"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md leading-5 text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="sr-only">
                Status
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSliders className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  id="status"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md leading-5 text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-600 rounded-md p-3">
                  <FiEdit2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Total Blogs
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">
                        {blogs.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-600 rounded-md p-3">
                  <FiEye className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Published
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">
                        {blogs.filter((b) => b.status === "published").length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-600 rounded-md p-3">
                  <FiLock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Locked
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">
                        {blogs.filter((b) => b.locked).length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden shadow rounded-lg border border-gray-800">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-600 rounded-md p-3">
                  <FiUser className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Total Views
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">
                        {blogs
                          .reduce((sum, blog) => sum + blog.views, 0)
                          .toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg border border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Views
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {paginatedBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {blog.featuredImage && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={blog.featuredImage}
                              alt=""
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            {blog.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{blog.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={blog.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {blog.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleToggleLock(blog.id)}
                          className={`p-1.5 rounded-md transition-colors ${
                            blog.locked
                              ? "text-green-500 hover:bg-gray-800"
                              : "text-yellow-500 hover:bg-gray-800"
                          }`}
                          title={blog.locked ? "Unlock" : "Lock"}
                        >
                          {blog.locked ? (
                            <FiUnlock className="h-4 w-4" />
                          ) : (
                            <FiLock className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-400 hover:bg-gray-800 p-1.5 rounded-md transition-colors"
                          disabled={blog.locked}
                          title="Edit"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-500 hover:bg-gray-800 p-1.5 rounded-md transition-colors"
                          disabled={blog.locked}
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBlogs.length > blogsPerPage && (
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {(currentPage - 1) * blogsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-white">
                      {Math.min(
                        currentPage * blogsPerPage,
                        filteredBlogs.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {filteredBlogs.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                          currentPage === idx + 1
                            ? "z-10 bg-red-600 border-red-600 text-white"
                            : "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Blog Form Modal */}
        <BlogFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSave}
          initialData={currentBlog || undefined}
          isLoading={loading}
        />
      </main>
    </div>
  );
};

export default BlogDashboard;
