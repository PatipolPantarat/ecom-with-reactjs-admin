import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/navbar";
import SideNav from "../components/dashboard/sidenav";

// Routes
import Dashboard from "../pages/dashboard";
import Products from "./products/all";
import Detail from "./products/detail";
import AddProducts from "./products/add";
import ErrorPage from "../error-page";

export default function Home() {
  return (
    <div className=" flex flex-col gap-5 max-h-screen pb-5">
      <div className="sticky top-0 w-full z-10">
        <Navbar />
        {/* <Navbar logout={logout} /> */}
      </div>
      <div className="h-full">
        <div className="grid grid-cols-5 max-w-[1440px] mx-auto gap-5 h-full">
          <div className="col-span-1 h-fit">
            <SideNav />
          </div>
          <div className="col-span-4 h-fit">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
