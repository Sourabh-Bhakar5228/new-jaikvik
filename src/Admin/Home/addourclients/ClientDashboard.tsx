import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface Client {
  id: string;
  href: string;
  imgSrc: string;
  alt: string;
}

const AdminPanel: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load clients
  useEffect(() => {
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      const defaultClients = [
        {
          id: "1",
          href: "https://bweld.in/",
          imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/1.png",
          alt: "Bweld",
        },
        {
          id: "2",
          href: "https://www.glowgreen.in/",
          imgSrc: "https://jaikvik.in/lab/new-post-video/img/client/2.png",
          alt: "Glowgreen",
        },
      ];
      setClients(defaultClients);
      localStorage.setItem("clients", JSON.stringify(defaultClients));
    }
  }, []);

  // Save clients
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem("clients", JSON.stringify(clients));
    }
  }, [clients]);

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Mock image upload function
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Mock upload - in a real app, you would upload to a server
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (currentClient) {
          setCurrentClient({ ...currentClient, imgSrc: result });
        }
        setIsUploading(false);
        showNotification("Image uploaded successfully", "success");
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Client operations
  const handleAddClient = () => {
    setCurrentClient({
      id: Date.now().toString(),
      href: "",
      imgSrc: "",
      alt: "",
    });
    setIsEditing(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient({ ...client });
    setIsEditing(true);
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
    showNotification("Client deleted successfully", "success");
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClient) return;

    if (
      currentClient.href.trim() === "" ||
      currentClient.imgSrc.trim() === "" ||
      currentClient.alt.trim() === ""
    ) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    const isExisting = clients.some((c) => c.id === currentClient.id);
    setClients(
      isExisting
        ? clients.map((c) => (c.id === currentClient.id ? currentClient : c))
        : [...clients, currentClient]
    );

    showNotification(`Client ${isExisting ? "updated" : "added"}`, "success");
    setIsEditing(false);
    setCurrentClient(null);
  };

  return (
    <div className="min-h-screen bg-red-900 p-4">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-md shadow-lg ${
            notification.type === "error" ? "bg-red-600" : "bg-green-600"
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      {isEditing && currentClient ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-w-2xl mx-auto border border-red-500">
          <h2 className="text-xl font-bold mb-4 text-white">
            {clients.some((c) => c.id === currentClient.id)
              ? "Edit Client"
              : "Add Client"}
          </h2>
          <form onSubmit={handleSaveClient}>
            {/* Website URL */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Website URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                value={currentClient.href}
                onChange={(e) =>
                  setCurrentClient({ ...currentClient, href: e.target.value })
                }
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Client Logo</label>
              <div className="flex items-center space-x-4">
                {currentClient.imgSrc ? (
                  <img
                    src={currentClient.imgSrc}
                    alt="Preview"
                    className="w-16 h-16 object-contain border border-gray-600 rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 border border-gray-600 rounded-md flex items-center justify-center bg-gray-700">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-md ${
                    isUploading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Upload square logo (recommended 300×300px)
              </p>
            </div>

            {/* Alt Text */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Alt Text</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                value={currentClient.alt}
                onChange={(e) =>
                  setCurrentClient({ ...currentClient, alt: e.target.value })
                }
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentClient(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Save Client
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Header and Add Client Button */}
          <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Manage Clients</h2>
            <button
              onClick={handleAddClient}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Add New Client
            </button>
          </div>

          {/* Preview Carousel */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 max-w-6xl mx-auto border border-red-500">
            <h3 className="text-xl font-semibold mb-4 text-white">Preview</h3>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={5}
              slidesPerView={5}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={6000}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 7.5 },
              }}
              className="overflow-hidden mb-6"
            >
              {clients.map((client) => (
                <SwiperSlide key={client.id} className="flex-shrink-0">
                  <a
                    href={client.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={client.imgSrc}
                      alt={client.alt}
                      className="w-[150px] border border-red-500 bg-gray-700 rounded-md"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Client List Table */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto border border-red-500">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Client List
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="py-2 px-4 border border-gray-600 text-white">
                      Logo
                    </th>
                    <th className="py-2 px-4 border border-gray-600 text-white">
                      Name
                    </th>
                    <th className="py-2 px-4 border border-gray-600 text-white">
                      Website
                    </th>
                    <th className="py-2 px-4 border border-gray-600 text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-900">
                      <td className="py-2 px-4 border border-gray-600">
                        <img
                          src={client.imgSrc}
                          alt={client.alt}
                          className="w-16 h-16 object-contain"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-600 text-white">
                        {client.alt}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        <a
                          href={client.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-400 hover:underline"
                        >
                          {client.href}
                        </a>
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
