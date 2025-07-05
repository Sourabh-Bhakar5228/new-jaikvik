import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiSave,
  FiEye,
  FiMenu,
} from "react-icons/fi";

interface GalleryImage {
  src: string;
  alt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  badge?: string;
  link: string;
  mainImg: string;
  galleryImgs: GalleryImage[];
}

const ServicesAdminPanel = () => {
  // Sample initial data
  const initialServices: Service[] = [
    {
      id: "1",
      badge: "Popular",
      mainImg:
        "https://images.unsplash.com/photo-1630442923896-244dd3717b35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TW9iaWxlJTIwQXBwJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      galleryImgs: [
        {
          src: "https://plus.unsplash.com/premium_photo-1721080250995-5a83519eb2a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TW9iaWxlJTIwQXBwJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
          alt: "Mobile App Gallery 1",
        },
        {
          src: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1vYmlsZSUyMEFwcCUyMERldmVsb3BtZW50fGVufDB8fDB8fHww",
          alt: "Mobile App Gallery 2",
        },
      ],
      title: "Mobile App Development",
      description:
        "Custom native and cross-platform mobile applications for iOS and Android platforms.",
      link: "mobile-application.php",
    },
    {
      id: "2",
      badge: "Featured",
      mainImg:
        "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2ViJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
      galleryImgs: [
        {
          src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2ViJTIwRGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
          alt: "Web Development Gallery 1",
        },
      ],
      title: "Web Development",
      description:
        "Responsive, high-performance websites and web applications with modern technologies.",
      link: "website-development-page.php",
    },
    {
      id: "3",
      mainImg:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VUklMkZVWCUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      galleryImgs: [],
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive user interfaces that enhance user experience.",
      link: "ui-ux-design.php",
    },
  ];

  const [services, setServices] = useState<Service[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Service>({
    defaultValues: {
      galleryImgs: [],
    },
  });

  // Handle form submission
  const onSubmit = (data: Service) => {
    if (isEditing && currentService) {
      // Update existing service
      setServices(
        services.map((s) =>
          s.id === currentService.id ? { ...data, id: currentService.id } : s
        )
      );
    } else {
      // Create new service
      const newService = {
        ...data,
        id: Date.now().toString(),
        galleryImgs: data.galleryImgs || [],
      };
      setServices([...services, newService]);
    }
    resetForm();
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  // Handle drag over
  const handleDragOver = (index: number) => {
    if (draggedItem === null || draggedItem === index) return;

    const newServices = [...services];
    const [removed] = newServices.splice(draggedItem, 1);
    newServices.splice(index, 0, removed);
    setServices(newServices);
    setDraggedItem(index);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Edit service
  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsEditing(true);
    reset({
      ...service,
      galleryImgs: service.galleryImgs || [],
    });
  };

  // Delete service
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    reset({
      id: "",
      title: "",
      description: "",
      badge: "",
      link: "",
      mainImg: "",
      galleryImgs: [],
    });
    setIsEditing(false);
    setCurrentService(null);
  };

  // Add gallery image
  const addGalleryImage = () => {
    const currentGallery = watch("galleryImgs") || [];
    setValue("galleryImgs", [...currentGallery, { src: "", alt: "" }]);
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    const currentGallery = watch("galleryImgs") || [];
    const newGallery = [...currentGallery];
    newGallery.splice(index, 1);
    setValue("galleryImgs", newGallery);
  };

  // Filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-black py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-500">
            Services Admin Panel
          </h1>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
          >
            <FiEye /> {previewMode ? "Exit Preview" : "Preview Mode"}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {previewMode ? (
          /* Preview Mode - Show the actual carousel */
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.mainImg}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{service.title}</h3>
                      {service.badge && (
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">
                      {service.description}
                    </p>
                    <a
                      href={service.link}
                      className="inline-block mt-3 text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Learn more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search and Add New */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    <FiX />
                  </button>
                )}
              </div>

              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors w-full md:w-auto justify-center"
              >
                <FiPlus /> Add New Service
              </button>
            </div>

            {/* Form and List Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Form */}
              <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                  {isEditing ? "Edit Service" : "Create New Service"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title *
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description *
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={3}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Badge (optional)
                    </label>
                    <input
                      {...register("badge")}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Popular, New, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Link *
                    </label>
                    <input
                      {...register("link", { required: "Link is required" })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., mobile-application.php"
                    />
                    {errors.link && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.link.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Main Image URL *
                    </label>
                    <input
                      {...register("mainImg", {
                        required: "Main image is required",
                      })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.mainImg && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.mainImg.message}
                      </p>
                    )}
                    {watch("mainImg") && (
                      <div className="mt-2">
                        <img
                          src={watch("mainImg")}
                          alt="Main preview"
                          className="h-24 object-cover rounded-md border border-gray-600"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Gallery Images
                    </label>
                    <div className="space-y-2">
                      {(watch("galleryImgs") || []).map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            {...register(`galleryImgs.${index}.src`)}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Image URL"
                          />
                          <input
                            {...register(`galleryImgs.${index}.alt`)}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Alt text"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md p-2 transition-colors"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addGalleryImage}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md py-2 px-3 transition-colors w-full"
                      >
                        <FiPlus /> Add Gallery Image
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    >
                      <FiSave /> {isEditing ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Services List */}
              <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                  Manage Services ({filteredServices.length})
                </h2>

                {filteredServices.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    {searchTerm
                      ? "No services match your search"
                      : "No services found"}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredServices.map((service, index) => (
                      <div
                        key={service.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={() => handleDragOver(index)}
                        onDragEnd={handleDragEnd}
                        className={`bg-gray-700 rounded-md p-4 flex items-start gap-4 hover:bg-gray-600 transition-colors cursor-move ${
                          draggedItem === index
                            ? "opacity-50 border-2 border-red-500"
                            : "border border-transparent"
                        }`}
                      >
                        <div
                          className="text-gray-400 hover:text-white"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <FiMenu size={20} />
                        </div>

                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-600">
                          <img
                            src={service.mainImg}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{service.title}</h3>
                            {service.badge && (
                              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="mt-1 text-xs text-gray-400">
                            {service.galleryImgs.length} gallery images
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-gray-300 hover:text-white hover:bg-red-600 rounded-md transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesAdminPanel;
