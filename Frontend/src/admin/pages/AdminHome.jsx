import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <Link to="/admin/test">Create New Test</Link>
      <Link to="/admin/viewTest">View Tests</Link>
    </div>
    
  );
}

export default AdminHome;
