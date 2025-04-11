
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import First from "./First";
import UserProtectedRoute from "./user/pages/UserProtectedRoute";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import Home from "./user/pages/Home";
import UserAuthProvider from "./user/context/UserAuthProvider";

import AdminFirst from "./admin/pages/AdminFirst";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import AdminTest from "./admin/pages/CreateNewTest";
import AdminProtectedRoute from "./admin/pages/ProtectedRoute";
import AdminAuth from "./admin/context/Auth";
import AdminRegister from "./admin/pages/AdminRegister"
import ViewTests from "./admin/pages/ViewTests";
import UpdateTest from "./admin/pages/UpdateTest";
import AttemptTest from "./user/pages/AttemptTest";
import Dashboard from "./user/pages/Dashboard";
import Score from "./user/pages/Score"
const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: (
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/attempt-test/:testID",
        element: (
          <UserProtectedRoute>
            <AttemptTest />
          </UserProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/score",
        element: <Score />
      },
      

    ],
  },
  {
    path: "/admin",
    element: <AdminFirst />,
    children: [
      {
        path:"home",
        element: 
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
      {
        path: "test",
        element: (
          <AdminProtectedRoute>
            <AdminTest />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "viewTest",
        element: (
          <AdminProtectedRoute>
            <ViewTests />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "update-test/:id",
        element: (
          <AdminProtectedRoute>
            <UpdateTest />
          </AdminProtectedRoute>
        ),
      },
    
    
      
    ],
  },
]);

function App() {
  return (
    <AdminAuth>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </AdminAuth>
  );
}

export default App;
  