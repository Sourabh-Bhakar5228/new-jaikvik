// AdminProfilePage.tsx
import { useState } from "react";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastLogin: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface SettingsTab {
  id: string;
  name: string;
  icon: string;
}

interface ProfileTabProps {
  profile: AdminProfile;
  isEditing: boolean;
  onEditToggle: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
}

interface TabProps {
  profile: AdminProfile;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileTab = ({
  profile,
  isEditing,
  onEditToggle,
  onInputChange,
  onSave,
}: ProfileTabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Profile Information
        </h2>
        {!isEditing ? (
          <button
            onClick={onEditToggle}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={onEditToggle}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profile.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {profile.email}
              </p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={onInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {profile.bio || "No bio provided"}
              </p>
            )}
          </div>

          {isEditing && (
            <>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Twitter
                </label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={profile.socialLinks?.twitter || ""}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={profile.socialLinks?.linkedin || ""}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub
                </label>
                <input
                  type="url"
                  name="socialLinks.github"
                  value={profile.socialLinks?.github || ""}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  placeholder="https://github.com/username"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SecurityTab = ({ profile, isEditing, onInputChange }: TabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Security Settings
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={profile.twoFactorAuth}
              onChange={onInputChange}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Change Password
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">
              Update Password
            </button>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Recent Activity
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Successful login
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  From Chrome on Windows - {profile.lastLogin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = ({ profile, isEditing, onInputChange }: TabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Notification Settings
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={profile.notificationsEnabled}
              onChange={onInputChange}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

const AppearanceTab = ({ profile, isEditing, onInputChange }: TabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Appearance Settings
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Dark Mode
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle between light and dark theme
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="darkMode"
              checked={profile.darkMode}
              onChange={onInputChange}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: "admin-001",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Super Administrator",
    lastLogin: new Date().toLocaleString(),
    notificationsEnabled: true,
    darkMode: false,
    twoFactorAuth: false,
    bio: "Experienced administrator with 5+ years managing systems and users.",
    socialLinks: {
      twitter: "https://twitter.com/admin",
      linkedin: "https://linkedin.com/in/admin",
      github: "https://github.com/admin",
    },
  });

  const tabs: SettingsTab[] = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "appearance", name: "Appearance", icon: "🎨" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name.startsWith("socialLinks.") && {
        socialLinks: {
          ...prev.socialLinks,
          [name.split(".")[1]]: value,
        },
      }),
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", profile);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 animate-fade-in">
          Admin Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0 animate-slide-in-left">
            <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <div className="p-6 flex flex-col items-center border-b border-gray-200 dark:border-gray-800">
                <div className="relative group">
                  <img
                    src={profile.avatar}
                    alt="Admin Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full shadow-md transform translate-y-1/4 hover:bg-red-700 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.role}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Last login: {profile.lastLogin}
                </p>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 animate-slide-in-right">
            {activeTab === "profile" && (
              <ProfileTab
                profile={profile}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(!isEditing)}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            )}

            {activeTab === "security" && (
              <SecurityTab
                profile={profile}
                isEditing={isEditing}
                onInputChange={handleInputChange}
              />
            )}

            {activeTab === "notifications" && (
              <NotificationsTab
                profile={profile}
                isEditing={isEditing}
                onInputChange={handleInputChange}
              />
            )}

            {activeTab === "appearance" && (
              <AppearanceTab
                profile={profile}
                isEditing={isEditing}
                onInputChange={handleInputChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
