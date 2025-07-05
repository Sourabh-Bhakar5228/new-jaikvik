import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const token = localStorage.getItem("admin-auth");
  const navigate = useNavigate();

  // Agar token nahi hai toh Login page pe redirect
  if (!token) {
    return <Navigate to="/admin" />;
  }

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/admin"); // Login page pe le jao
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
