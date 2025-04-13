// import { useEffect } from "react";
import { useAdminAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, AdminLogoutHandle } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    AdminLogoutHandle();
    navigate("/admin/login");
  }

  return (
    <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Test System Admin Dashboard</h1>
      {isAuthenticated ? (
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      ) : (
        <li className="list-none">
          <Link
            to="/admin/login"
            className="text-white hover:text-gray-200 font-semibold"
          >
            Login
          </Link>
        </li>
      )}
    </header>
  );
}

export default Header;