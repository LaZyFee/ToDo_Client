import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import { useAuth } from "../Store/AuthStore";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiPower } from "react-icons/ci";
import { RiAuctionLine } from "react-icons/ri";
import { GrCompliance } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";

function MainLayout() {
  const menuItems = [
    { name: "My ToDos", icon: <LuListTodo />, path: "." },
    { name: "Active ToDos", icon: <RiAuctionLine />, path: "active" },
    { name: "Completed ToDos", icon: <GrCompliance />, path: "complete" },
  ];

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <Outlet />
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <HiMenuAlt2 className="text-3xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col justify-evenly h-full  bg-slate-900 text-white">
            <div>
              <div className="flex flex-col gap-3 items-center">
                <p className="text-xl font-bold text-red-400">{user?.name}</p>
                <p className="text-center text-violet-400">{user?.email}</p>
              </div>
              <ul className="menu p-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "text-[#F63E7B] text-xl font-semibold" : ""
                      }
                      end={item.path === "."} // Ensure exact matching for the root route
                    >
                      <span className="inline-flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="menu">
                <li>
                  <button className="text-2xl m-3" onClick={handleLogout}>
                    <CiPower />
                    <p className="text-sm">Logout</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
