import { Outlet, ScrollRestoration } from "react-router-dom";

// commons
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";

const AppLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
