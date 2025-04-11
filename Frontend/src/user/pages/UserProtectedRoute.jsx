import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { useAuthUser } from "../context/UserAuthProvider";


function UserProtectedRoute({ children }) {
  const { isUserAuthenticated, userloading } = useAuthUser();

  if (userloading) return <div>Loading...</div>;

  return isUserAuthenticated ? children : <Navigate to="/login" replace />;
}

export default UserProtectedRoute;