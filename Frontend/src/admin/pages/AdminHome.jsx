import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link
          to="/admin/test"
          className="block w-64 py-2 px-4 bg-blue-500 text-white text-center rounded-md font-semibold hover:bg-blue-600"
        >
          Create New Test
        </Link>
        <Link
          to="/admin/viewTest"
          className="block w-64 py-2 px-4 bg-blue-500 text-white text-center rounded-md font-semibold hover:bg-blue-600"
        >
          View Tests
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;