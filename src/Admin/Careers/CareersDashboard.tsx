import React, { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaFileDownload,
  FaUserTie,
  FaSave,
  FaEdit,
} from "react-icons/fa";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resumeUrl: string;
  date: string;
  status: "new" | "reviewed" | "rejected" | "shortlisted";
}

const AdminCareerPanel: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      position: "Web Developer",
      message: "I have 5 years of experience in React and Node.js",
      resumeUrl: "/resumes/john-doe.pdf",
      date: "2023-05-15",
      status: "new",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      position: "UI/UX Designer",
      message: "Portfolio available at janesmith.design",
      resumeUrl: "/resumes/jane-smith.pdf",
      date: "2023-05-14",
      status: "reviewed",
    },
    // ... other mock data
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Application>>({});

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (application: Application) => {
    setEditingId(application.id);
    setEditFormData({
      name: application.name,
      email: application.email,
      phone: application.phone,
      position: application.position,
    });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveClick = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, ...editFormData } : app
      )
    );
    setEditingId(null);
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, ...editFormData });
    }
  };

  const updateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
    if (selectedApplication?.id === id) {
      setSelectedApplication(null);
    }
  };

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "reviewed":
        return "bg-purple-500";
      case "shortlisted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="bg-red-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <FaUserTie className="mr-2" />
            Career Applications Admin
          </h1>
          <div className="flex items-center space-x-4">
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
              {applications.filter((a) => a.status === "new").length} New
            </span>
            <button className="bg-black px-4 py-2 rounded hover:bg-gray-800 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Filters */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="flex space-x-2">
              <button className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className={`hover:bg-gray-800 ${
                        selectedApplication?.id === app.id ? "bg-gray-800" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === app.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name || ""}
                            onChange={handleEditFormChange}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-700 flex items-center justify-center">
                              {app.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {app.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {app.email}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === app.id ? (
                          <input
                            type="text"
                            name="position"
                            value={editFormData.position || ""}
                            onChange={handleEditFormChange}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                          />
                        ) : (
                          <div className="text-sm text-white">
                            {app.position}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-400">{app.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            app.status
                          )} text-white`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {editingId === app.id ? (
                            <button
                              className="text-green-500 hover:text-green-400"
                              onClick={() => handleSaveClick(app.id)}
                            >
                              <FaSave />
                            </button>
                          ) : (
                            <button
                              className="text-yellow-500 hover:text-yellow-400"
                              onClick={() => handleEditClick(app)}
                            >
                              <FaEdit />
                            </button>
                          )}
                          <button
                            className="text-red-500 hover:text-red-400"
                            onClick={() => deleteApplication(app.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-gray-900 rounded-lg p-4">
            {selectedApplication ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Application Details
                  </h2>
                  <div className="flex space-x-2">
                    <select
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                      value={selectedApplication.status}
                      onChange={(e) =>
                        updateStatus(
                          selectedApplication.id,
                          e.target.value as Application["status"]
                        )
                      }
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {selectedApplication.name}
                    </h3>
                    <p className="text-gray-400">
                      {selectedApplication.position}
                    </p>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Contact Information
                    </h4>
                    <p className="text-white">{selectedApplication.email}</p>
                    <p className="text-white">{selectedApplication.phone}</p>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Application Message
                    </h4>
                    <p className="text-white whitespace-pre-line">
                      {selectedApplication.message}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${selectedApplication.email}`}
                      className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                    >
                      <FaEnvelope />
                      <span>Email Candidate</span>
                    </a>
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                    >
                      <FaFileDownload />
                      <span>View Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FaUserTie className="mx-auto text-4xl mb-2" />
                <p>Select an application to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCareerPanel;
