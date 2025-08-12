import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import SEOManager from "../components/SEOManager";

const AppLayout = () => {
  return (
    <>
      <SEOManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
