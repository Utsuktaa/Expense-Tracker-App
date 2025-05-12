import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 p-8 ml-[250px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
