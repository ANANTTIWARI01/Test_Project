// import { useEffect } from "react";
import { useAdminAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, AdminLogoutHandle } = useAdminAuth();
  const navigate =useNavigate()

  function handleLogout(){
    AdminLogoutHandle();
navigate("/admin/login")

  }


  return (
    <header>
      <h1>Test System Admin Dashboard</h1>
      {isAuthenticated ? (
        <button onClick={()=>handleLogout()}>Logout</button>
      ) : (
        <li>
          <Link to="/admin/login">Login</Link>
        </li>
      )}
    </header>
  );
}

export default Header;