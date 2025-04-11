import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function AdminFirst() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminFirst;
